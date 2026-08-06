import { ChefHat, Pencil, ShieldCheck, Trash2, User } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import StaffDetails from "../form/staffDetails";
import { usePopup } from "../../context/Popup";

const StaffManagement = () => {
       const { setPopup, setShowPopUp } = usePopup();
       const [isAddModalOpen, setIsAddModalOpen] = useState(false);
       const [staffs, setStaffs] = useState<any>([])
       const [editingStaffId, setEditingStaffId] = useState<string | null>(null);
       const getStaffs = async () => {
              try {
                     const { data } = await axios.get(`${import.meta.env.VITE_API}/api/user/getAllStaff`,
                            {
                                   withCredentials: true,
                            })
                     setStaffs(data.user);
                     // console.log(data.user);
              } catch (error) {
                     console.log(error);
              }
       }
       const deleteStaff = async (id: any) => {
              try {
                     const { data } = await axios.delete(
                            `http://localhost:8000/api/user/${id}`,
                            {
                                   withCredentials: true,
                            }
                     );
                     setPopup({
                            msg: data.message,
                            bgColor: data.success ? ("bg-green-500") : ("bg-red-500")
                     })
                     setShowPopUp(true)
                     setStaffs((prev: any[]) =>         // update ui
                            prev.filter((staff) => staff._id !== id)
                     );

              } catch (err) {
                     console.log(err);
              } finally {
                     setTimeout(() => {
                            setPopup({
                                   msg: "",
                                   bgColor: ""
                            })
                            setShowPopUp(false)
                     }, 2500)
              }
       }
       // ROLE ICON
       const getRoleIcon = (role) => {
              if (role === "Admin") {
                     return <ShieldCheck size={16} />;
              }
              if (role === "Kitchen") {
                     return <ChefHat size={16} />;
              }
              return <User size={16} />;

       };
       useEffect(() => {
              getStaffs();
       }, [])
       return (
              <div className="h-full flex flex-col overflow-hidden p-2">
                     {/* FIXED / NON-SCROLLING HEADER */}
                     <div className="shrink-0 flex items-center justify-between pb-4">
                            <div>
                                   <h1 className="text-3xl font-bold text-[#f5f5f5]">
                                          Staff mangment
                                   </h1>

                                   <p className="text-[#ababab] mt-2">
                                          Manage your staff accounts
                                   </p>
                            </div>

                            <div className="flex items-center gap-4">
                                   {/* EDIT BUTTON */}
                                   <button type='button'
                                          onClick={() => setIsAddModalOpen(true)}
                                          className={`bg-[#1f1f1f] hover:bg-[#2a2a2a] transition text-white px-5 py-3 rounded-xl flex items-center gap-2`}>
                                          <Pencil size={18} />
                                          Add staff
                                   </button>
                            </div>
                     </div>


                     {/* ONLY THIS SECTION SCROLLS */}
                     <div className="flex-1 overflow-y-auto flex flex-col gap-4">
                            {
                                   staffs.length > 0 ? (
                                          staffs.map((staf: any) => (
                                                 <div key={staf._id}
                                                        className="bg-[#1f1f1f] rounded-2xl p-5 flex items-center justify-between"
                                                 >
                                                        {/* LEFT */}
                                                        <div className="flex items-center gap-5">
                                                               {/* AVATAR */}
                                                               <div className="h-16 w-16 rounded-full bg-yellow-400 flex items-center justify-center text-black text-2xl font-bold">

                                                                      {staf.name.charAt(0)}

                                                               </div>

                                                               {/* INFO */}
                                                               <div>

                                                                      <h1 className="text-[#f5f5f5] text-xl font-semibold">
                                                                             {staf.name}
                                                                      </h1>

                                                                      <p className="text-[#ababab] mt-1">
                                                                             {staf.email}
                                                                      </p>

                                                                      <p className="text-[#ababab] text-sm mt-1">
                                                                             {staf.phone}
                                                                      </p>

                                                               </div>

                                                        </div>

                                                        {/* RIGHT */}
                                                        <div className="flex items-center gap-4">

                                                               {/* ROLE */}
                                                               <div className="bg-[#262626] px-4 py-2 rounded-xl text-yellow-400 flex items-center gap-2 font-semibold">

                                                                      {getRoleIcon(staf.role)}

                                                                      {staf.role}

                                                               </div>


                                                               {/* EDIT */}
                                                               <button
                                                                      onClick={() => {
                                                                             setEditingStaffId(staf)
                                                                             setIsAddModalOpen(true)
                                                                      }}
                                                                      className="bg-[#262626] hover:bg-[#333333] transition p-3 rounded-xl text-yellow-400"
                                                               >
                                                                      <Pencil size={18} />
                                                               </button>

                                                               {/* DELETE */}
                                                               <button
                                                                      onClick={() => deleteStaff(staf._id)}
                                                                      className="bg-[#262626] hover:bg-[#333333] transition p-3 rounded-xl text-red-500"
                                                               >
                                                                      <Trash2 size={18} />
                                                               </button>

                                                        </div>

                                                 </div>
                                          ))
                                   ) : (
                                          <div className="flex items-center justify-center py-10 text-gray-500">
                                                 <p className="text-sm font-medium">No staff added yet.</p>
                                          </div>
                                   )
                            }
                     </div>
                     {
                            isAddModalOpen && <StaffDetails staffData={{ setIsAddModalOpen, setStaffs, editingStaffId, setEditingStaffId }} />
                     }
              </ div>
       )
}

export default StaffManagement
