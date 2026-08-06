import { useEffect, useState } from "react";
import {
       UserCog,
       User,
       Mail,
       Phone,
       UserPlus,
       Save,
       X,
} from "lucide-react";
import axios from "axios";
import { usePopup } from "../../context/Popup";


const StaffDetails = ({ staffData }: any) => {
       const { setIsAddModalOpen, setStaffs, editingStaffId, setEditingStaffId } = staffData
       const { setPopup, setShowPopUp } = usePopup();

       const [formData, setFormData] = useState<any>({
              name: "",
              email: "",
              phone: "",
              role: "Waiter",
       });

       const handleChange = (e: any) => {
              const { name, value } = e.target;
              setFormData((prev: any) => ({
                     ...prev,
                     [name]: name === "isActive" ? value === "true" : value,
              }));
       };

       const resetForm = () => {
              setFormData({
                     name: "",
                     email: "",
                     phone: "",
                     role: "Staff",
              });
              setEditingStaffId(null);
       };

       const handleCloseModal = () => {
              setIsAddModalOpen(false)
              resetForm();
       };
       useEffect(() => {
              if (editingStaffId) {
                     setFormData({
                            name: editingStaffId.name,
                            email: editingStaffId.email,
                            phone: editingStaffId.phone,
                            role: editingStaffId.role,
                     });
              }
       }, [editingStaffId]);
       const handleSubmit = async (e: any) => {
              e.preventDefault();
              try {
                     if (editingStaffId) {
                            // UPDATE API
                            const staffId = editingStaffId._id
                            const { data } = await axios.patch(
                                   `${import.meta.env.VITE_API}/api/user/${staffId}`,
                                   formData,
                                   {
                                          withCredentials: true,
                                   }
                            );
                            setPopup({
                                   msg: data.message,
                                   bgColor: data.success ? ("bg-green-500") : ("bg-red-500")
                            })
                            setShowPopUp(true)
                            if (data.success) {
                                   setTimeout(() => {
                                          handleCloseModal();
                                   }, 1000)
                                   setStaffs((prev: any) =>    // for ui
                                          prev.map((staff: any) =>
                                                 staff._id === staffId
                                                        ? { ...staff, ...data.updatedUser }
                                                        : staff
                                          )
                                   );
                            }
                     } else {
                            // ADD API
                            const { data } = await axios.post(
                                   `${import.meta.env.VITE_API}/api/user/createStaff`,
                                   formData,
                                   {
                                          withCredentials: true,
                                   }
                            );
                            setPopup({
                                   msg: data.message,
                                   bgColor: data.success ? ("bg-green-500") : ("bg-red-500")
                            })
                            setShowPopUp(true)
                            if (data.success) {
                                   setTimeout(() => {
                                          handleCloseModal();
                                   }, 1000)
                                   setStaffs((prev: any) => [...prev, data.user]);
                            }

                     }
              } catch (error) {
                     console.log(error);
              }
              finally {
                     setTimeout(() => {
                            setPopup({
                                   msg: "",
                                   bgColor: ""
                            })
                            setShowPopUp(false)
                     }, 2500)
              }

       };


       return (
              <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                     <div className="  bg-[#1f1f1f]  border border-[#333333]  w-full max-w-[650px]  rounded-2xl  shadow-2xl  overflow-hidden" >
                            <div className="flex items-center justify-between px-6 py-5 border-b border-[#333333]">
                                   <div className="flex items-center gap-4">
                                          <div className="bg-yellow-400 p-3 rounded-xl text-black">
                                                 <UserCog size={24} />
                                          </div>
                                          <div>
                                                 <h1 className="text-xl font-bold text-[#f5f5f5]">
                                                        {editingStaffId
                                                               ? "Edit Staff"
                                                               : "Add New Staff"}
                                                 </h1>
                                                 <p className="text-[#8f8f8f] text-sm mt-1">
                                                        {editingStaffId
                                                               ? "Update staff account information"
                                                               : "Create a new staff account"}
                                                 </p>
                                          </div>
                                   </div>
                                   {/* CLOSE BUTTON */}
                                   <button type="button"
                                          onClick={handleCloseModal}
                                          className=" w-10 h-10 flex items-center justify-center rounded-xl bg-[#292929]       text-[#ababab] hover:bg-[#333333] hover:text-white transition cursor-pointer"
                                   >
                                          <X size={20} />
                                   </button>
                            </div>
                            {/* form */}
                            <form onSubmit={handleSubmit}>
                                   <div className="p-6">
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                 {/* NAME */}
                                                 <div>
                                                        <label className="block text-[#ababab] text-sm mb-2">
                                                               Full Name
                                                        </label>

                                                        <div className="relative">
                                                               <User size={18}
                                                                      className="  absolute left-4 top-1/2  -translate-y-1/2  text-[#777]"
                                                               />
                                                               <input
                                                                      type="text"
                                                                      name="name"
                                                                      value={formData.name}
                                                                      onChange={handleChange}
                                                                      placeholder="Enter full name"
                                                                      required
                                                                      className=" w-full bg-[#292929] text-white pl-11 pr-4 py-3.5 rounded-xl border border-transparent focus:border-yellow-400 outline-none transition placeholder:text-[#666]"
                                                               />
                                                        </div>
                                                 </div>
                                                 {/* EMAIL */}
                                                 <div>

                                                        <label className="block text-[#ababab] text-sm mb-2">
                                                               Email Address
                                                        </label>

                                                        <div className="relative">
                                                               <Mail
                                                                      size={18}
                                                                      className=" absolute left-4 top-1/2 -translate-y-1/2 text-[#777]"
                                                               />

                                                               <input
                                                                      type="email"
                                                                      name="email"
                                                                      value={formData.email}
                                                                      onChange={handleChange}
                                                                      placeholder="staff@example.com"
                                                                      required
                                                                      className=" w-full bg-[#292929] text-white pl-11 pr-4 py-3.5 rounded-xl border border-transparent focus:border-yellow-400 outline-none transition placeholder:text-[#666]"
                                                               />
                                                        </div>
                                                 </div>
                                                 {/* PHONE */}
                                                 <div>

                                                        <label className="block text-[#ababab] text-sm mb-2">
                                                               Phone Number
                                                        </label>

                                                        <div className="relative">

                                                               <Phone
                                                                      size={18}
                                                                      className=" absolute left-4 top-1/2 -translate-y-1/2 text-[#777] "
                                                               />

                                                               <input
                                                                      type="tel"
                                                                      name="phone"
                                                                      value={formData.phone}
                                                                      onChange={handleChange}
                                                                      placeholder="Enter phone number"
                                                                      required
                                                                      className=" w-full bg-[#292929] text-white pl-11 pr-4 py-3.5 rounded-xl border border-transparent focus:border-yellow-400 outline-none transition placeholder:text-[#666] "
                                                               />
                                                        </div>
                                                 </div>
                                                 {/* ROLE */}
                                                 <div>

                                                        <label className="block text-[#ababab] text-sm mb-2">
                                                               Staff Role
                                                        </label>

                                                        <select
                                                               name="role"
                                                               value={formData.role}
                                                               onChange={handleChange}
                                                               className=" w-full bg-[#292929] text-white px-4 py-3.5 rounded-xl border border-transparent focus:border-yellow-400 outline-none transition cursor-pointer "
                                                        >

                                                               <option value="Waiter">
                                                                      Waiter
                                                               </option>

                                                               <option value="Kitchen">
                                                                      Kitchen
                                                               </option>

                                                        </select>

                                                 </div>

                                          </div>

                                   </div>
                                   <div
                                          className=" flex items-center justify-end px-6 py-5 border-t border-[#333333] ">
                                          <div className="flex items-center gap-3">
                                                 {/* CANCEL */}
                                                 <button
                                                        type="button"
                                                        onClick={handleCloseModal}
                                                        className=" px-5 py-3 rounded-xl bg-[#292929] text-[#cccccc] hover:bg-[#333333] hover:text-white transition cursor-pointer "
                                                 >
                                                        Cancel
                                                 </button>
                                                 {/* SUBMIT */}
                                                 <button
                                                        type="submit"
                                                        className=" flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-500 active:scale-[0.98] transition cursor-pointer "
                                                 >
                                                        {editingStaffId ? (
                                                               <>
                                                                      <Save size={18} />
                                                                      Update Staff
                                                               </>
                                                        ) : (
                                                               <>
                                                                      <UserPlus size={18} />
                                                                      Add Staff
                                                               </>
                                                        )}
                                                 </button>
                                          </div>
                                   </div>
                            </form>
                     </div>
              </div>
       );
};

export default StaffDetails
