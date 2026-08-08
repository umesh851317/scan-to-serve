import axios from "axios";
import { useEffect, useState } from "react";
import { usePopup } from "../../context/Popup";

const TableDataForm = ({ tableData }) => {
       const { setPopup, setShowPopUp } = usePopup();
       const { setTables, setShowTableForm, editTable, setEditTable } = tableData;

       const [formData, setFormData] = useState({
              tableNumber: "",
              seats: "",
       });
       const handleChange = (e: any) => {
              setFormData({
                     ...formData,
                     [e.target.name]: e.target.value,
              });

       };
       const handleSubmit = async (e: any) => {
              e.preventDefault();
              try {
                     // ADD TABLE
                     if (!editTable) {
                            console.log(formData);
                            const { data } = await axios.post(
                                   `http://localhost:8000/api/table`,
                                   formData,
                                   {
                                          withCredentials: true
                                   }
                            );
                            if (data.success) {
                                   setPopup({
                                          msg: data.message,
                                          bgColor: data.success ? ("bg-green-500") : ("bg-red-500")
                                   })
                                   setShowPopUp(true)
                                   setShowTableForm(false)
                                   setTables((prev: any) => [...prev, data.newTable])
                            }
                     }
                     // EDIT TABLE
                     else {
                            const { data } = await axios.patch(
                                   `http://localhost:8000/api/table/${editTable._id}`,
                                   formData,
                                   {
                                          withCredentials: true
                                   }
                            );
                            if (data.success) {
                                   setPopup({
                                          msg: data.message,
                                          bgColor: data.success ? ("bg-green-500") : ("bg-red-500")
                                   })
                                   setShowPopUp(true)
                                   setShowTableForm(false)
                                   setTables((prev: any) =>
                                          prev.map((table: any) =>
                                                 table._id === editTable._id
                                                        ? {
                                                               ...table,
                                                               tableNumber: 'T' + formData.tableNumber,
                                                               seats: formData.seats
                                                        }
                                                        : table
                                          )
                                   )
                            } else {
                                   setPopup({
                                          msg: data.message,
                                          bgColor: data.success ? ("bg-green-500") : ("bg-red-500")
                                   })
                                   setShowPopUp(true)
                            }
                     }
              } catch (error) {
                     console.log(error);
              } finally {
                     setTimeout(() => {
                            setPopup({
                                   msg: "",
                                   bgColor: ""
                            })
                            setShowPopUp(false)
                     }, 2500)
              }
       };
       useEffect(() => {
              if (editTable) {
                     const tableNum = (editTable.tableNumber.slice(1));
                     setFormData({
                            tableNumber: tableNum,
                            seats: editTable.seats || "",
                     });
              }
       }, [editTable])
       return (
              <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">

                     <div className="bg-[#262626] w-full max-w-lg rounded-3xl border border-[#333] p-8">

                            {/* HEADER */}
                            <div className="flex items-center justify-between mb-8">

                                   <div>

                                          <h1 className="text-3xl font-bold text-white">

                                                 {editTable ? "Edit Table" : "Add Table"}

                                          </h1>

                                          <p className="text-[#ababab] mt-1">

                                                 {editTable
                                                        ? `Update table ${editTable.tableNumber}`
                                                        : "Create a new restaurant table"}

                                          </p>

                                   </div>

                                   <button
                                          onClick={() => {
                                                 setShowTableForm(false)
                                                 setEditTable(null)
                                          }}
                                          className="text-white text-3xl hover:text-red-400 transition"
                                   >
                                          ×
                                   </button>

                            </div>

                            {/* FORM */}
                            <form
                                   onSubmit={handleSubmit}
                                   className="space-y-6"
                            >

                                   {/* TABLE NUMBER */}
                                   <div>

                                          <label className="text-white font-medium block mb-3">
                                                 Table Number
                                          </label>

                                          <input
                                                 type="number"
                                                 name="tableNumber"
                                                 value={formData.tableNumber}
                                                 onChange={handleChange}
                                                 placeholder="Enter table number"
                                                 className="w-full bg-[#1f1f1f] border border-[#333] rounded-2xl px-4 py-4 text-white outline-none focus:border-yellow-400"
                                          />

                                   </div>

                                   {/* SEATS */}
                                   <div>

                                          <label className="text-white font-medium block mb-3">
                                                 Total Seats
                                          </label>

                                          <input
                                                 type="number"
                                                 name="seats"
                                                 value={formData.seats}
                                                 onChange={handleChange}
                                                 placeholder="Enter seats"
                                                 className="w-full bg-[#1f1f1f] border border-[#333] rounded-2xl px-4 py-4 text-white outline-none focus:border-yellow-400"
                                          />

                                   </div>

                                   {/* BUTTONS */}
                                   <div className="flex gap-4 pt-4">

                                          <button
                                                 type="button"
                                                 onClick={() => {
                                                        setShowTableForm(false)
                                                        setEditTable(null)
                                                 }}
                                                 className="flex-1 bg-[#1f1f1f] hover:bg-[#333] transition text-white py-4 rounded-2xl font-semibold"
                                          >
                                                 Cancel
                                          </button>

                                          <button
                                                 type="submit"
                                                 className="flex-1 bg-yellow-400 hover:bg-yellow-500 transition text-black py-4 rounded-2xl font-bold"
                                          >
                                                 {editTable ? "Update Table" : "Add Table"}
                                          </button>

                                   </div>

                            </form>

                     </div>

              </div>
       )
}

export default TableDataForm
