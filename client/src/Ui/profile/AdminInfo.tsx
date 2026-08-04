import { useState } from "react";

import {
       Camera,
       ShieldCheck,
       CalendarDays,
       Pencil,
} from "lucide-react";
import axios from "axios";
import { usePopup } from "../../context/Popup";

const AdminInfo = ({ userDetails }: any) => {
       const { setPopup, setShowPopUp } = usePopup();
       const [isEditing, setIsEditing] = useState(false);
       const [isEditPass, setIsEditPass] = useState(false);

       // Temporary UI data
       const [formData, setFormData] = useState({
              name: userDetails.user.name,
              email: userDetails.user.email,
              phone: userDetails.user.phone,
              role: userDetails.user.role
       });
       const [passwordData, setPasswordData] = useState({
              oldPassword: "",
              newPassword: ""
       });

       const handleSubmit = async (e: any) => {
              e.preventDefault();
              const success = await userDetails.handleSave(formData);
              if (success) {
                     setIsEditing(false);
              } else {
                     setFormData({
                            name: userDetails.user.name,
                            email: userDetails.user.email,
                            phone: userDetails.user.phone,
                            role: userDetails.user.role
                     });
              }
       };
       const handlePasswordSubmit = async (e: any) => {
              e.preventDefault();
              try {
                     const response = await axios.patch(
                            `${import.meta.env.VITE_API}/api/user/changePassword`,
                            passwordData,
                            {
                                   withCredentials: true,
                            }
                     );
                     setPopup({
                            msg: response.data.message,
                            bgColor: response.data.success ? ("bg-green-500") : ("bg-red-500")
                     })
                     setShowPopUp(true)
                     if (response?.data?.success) {
                            setPasswordData({
                                   oldPassword: "",
                                   newPassword: ""
                            })
                     }
              } catch (error) {
                     console.error(error);
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

       const handleChange = (e: any) => {
              setFormData({
                     ...formData,
                     [e.target.name]: e.target.value,
              });
       };

       const handlePasswordChange = (e: any) => {
              setPasswordData({
                     ...passwordData,
                     [e.target.name]: e.target.value,
              });
       };



       return (
              <div className='h-full flex flex-col gap-4 overflow-y-scroll overflow-hidden p-2 '>
                     {/* HEADER */}
                     <div className="flex items-center justify-between">
                            <div>
                                   <h1 className="text-3xl font-bold text-[#f5f5f5]">
                                          Admin Profile
                                   </h1>

                                   <p className="text-[#ababab] mt-2">
                                          Manage your personal account details
                                   </p>
                            </div>
                     </div>

                     {/* PROFILE CARD */}
                     <div className="bg-[#1f1f1f] rounded-2xl p-6 flex items-center gap-6">
                            {/* IMAGE */}
                            <div className="relative">
                                   <div className="h-28 w-28 rounded-full bg-yellow-400 flex items-center justify-center text-black text-4xl font-bold">
                                          {formData?.name?.charAt(0) || "A"}
                                   </div>

                                   <button
                                          type="button"
                                          className="absolute bottom-0 right-0 bg-[#262626] p-2 rounded-full border border-[#3a3a3a] text-yellow-400"
                                   >
                                          <Camera size={18} />
                                   </button>
                            </div>

                            {/* INFO */}
                            <div>
                                   <h1 className="text-[#f5f5f5] text-2xl font-semibold">
                                          {formData.name}
                                   </h1>

                                   <p className="text-[#ababab] mt-1">
                                          {formData.email}
                                   </p>

                                   <div className="flex items-center gap-3 mt-4">
                                          <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                                                 <ShieldCheck size={16} />
                                                 {formData.role}
                                          </span>

                                          <span className="bg-[#262626] text-[#ababab] px-4 py-1 rounded-full text-sm flex items-center gap-2">
                                                 <CalendarDays size={16} />
                                                 Joined May 2026
                                          </span>
                                   </div>
                            </div>
                     </div>

                     {/* ================= PROFILE FORM ================= */}
                     <div className="bg-[#1f1f1f] rounded-2xl p-6">
                            {/* TOP BAR */}
                            <div className="flex items-center justify-between mb-6">
                                   <h1 className="text-2xl font-bold text-[#f5f5f5]">
                                          Personal Details
                                   </h1>

                                   {!isEditing ? (
                                          <button
                                                 type="button"
                                                 onClick={() => {
                                                        isEditPass ? (setIsEditing(true), setIsEditPass(false)) : (
                                                               setIsEditing(true))
                                                 }}
                                                 className="bg-[#262626] hover:bg-[#333333] transition text-white px-5 py-3 rounded-xl flex items-center gap-2"
                                          >
                                                 <Pencil size={18} />
                                                 Edit Details
                                          </button>
                                   ) : null}
                            </div>

                            {/* FORM */}
                            <form onSubmit={handleSubmit}>
                                   <div className="grid grid-cols-2 gap-6">
                                          {/* FULL NAME */}
                                          <div>
                                                 <label className="text-[#ababab] text-sm">
                                                        Full Name
                                                 </label>

                                                 <input
                                                        type="text"
                                                        name="name"
                                                        required={true}
                                                        autoComplete="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        disabled={!isEditing}
                                                        className={`w-full mt-2 px-4 py-4 rounded-xl outline-none border transition ${isEditing
                                                               ? "bg-[#121212] text-white border-transparent focus:border-yellow-400"
                                                               : "bg-[#2a2a2a] text-[#ababab] border-[#2a2a2a] cursor-not-allowed"
                                                               }`}
                                                 />
                                          </div>

                                          {/* EMAIL */}
                                          <div>
                                                 <label className="text-[#ababab] text-sm">
                                                        Email Address
                                                 </label>

                                                 <input
                                                        type="email"
                                                        name="email"
                                                        required={true}
                                                        autoComplete="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        disabled={!isEditing}
                                                        className={`w-full mt-2 px-4 py-4 rounded-xl outline-none border transition ${isEditing
                                                               ? "bg-[#121212] text-white border-transparent focus:border-yellow-400"
                                                               : "bg-[#2a2a2a] text-[#ababab] border-[#2a2a2a] cursor-not-allowed"
                                                               }`}
                                                 />
                                          </div>

                                          {/* PHONE */}
                                          <div>
                                                 <label className="text-[#ababab] text-sm">
                                                        Phone Number
                                                 </label>

                                                 <input
                                                        type="text"
                                                        name="phone"
                                                        required={true}
                                                        autoComplete="tel"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        disabled={!isEditing}
                                                        className={`w-full mt-2 px-4 py-4 rounded-xl outline-none border transition ${isEditing
                                                               ? "bg-[#121212] text-white border-transparent focus:border-yellow-400"
                                                               : "bg-[#2a2a2a] text-[#ababab] border-[#2a2a2a] cursor-not-allowed"
                                                               }`}
                                                 />
                                          </div>

                                          {/* ROLE */}
                                          <div>
                                                 <label className="text-[#ababab] text-sm">
                                                        Role
                                                 </label>

                                                 <input
                                                        type="text"
                                                        value={formData.role}
                                                        readOnly
                                                        className="w-full mt-2 bg-[#2a2a2a] text-[#ababab] px-4 py-4 rounded-xl outline-none"
                                                 />
                                          </div>
                                   </div>

                                   {/* SAVE BUTTON */}
                                   {isEditing && (
                                          <div className="flex justify-end mt-8">
                                                 <div className="flex gap-3">
                                                        <button className="bg-[#262626] hover:bg-[#333333] transition text-white px-5 py-3 rounded-xl flex items-center gap-2"
                                                               onClick={() => {
                                                                      setFormData({
                                                                             name: userDetails.user.name,
                                                                             email: userDetails.user.email,
                                                                             phone: userDetails.user.phone,
                                                                             role: userDetails.user.role
                                                                      })
                                                                      setIsEditing(false)
                                                               }}>
                                                               cancel
                                                        </button>
                                                        <button
                                                               type="submit"
                                                               className="bg-yellow-400 hover:bg-yellow-500 transition text-black px-6 py-3 rounded-xl font-semibold"
                                                        >
                                                               Save Changes
                                                        </button>
                                                 </div>

                                          </div>
                                   )}
                            </form>
                     </div>

                     {/* ================= PASSWORD FORM ================= */}
                     <div className="bg-[#1f1f1f] rounded-2xl p-6">
                            {/* TOP BAR */}
                            <div className="flex items-center justify-between mb-6">
                                   <h1 className="text-2xl font-bold text-[#f5f5f5]">
                                          Change Password
                                   </h1>

                                   {!isEditPass ? (
                                          <button
                                                 type="button"
                                                 onClick={() => {
                                                        isEditing ? (setIsEditing(false), setIsEditPass(true)) : (
                                                               setIsEditPass(true))
                                                 }}
                                                 className="bg-[#262626] hover:bg-[#333333] transition text-white px-5 py-3 rounded-xl flex items-center gap-2"
                                          >
                                                 <Pencil size={18} />
                                                 Edit Password
                                          </button>
                                   ) : null}
                            </div>

                            {/* PASSWORD FORM */}
                            <form onSubmit={handlePasswordSubmit}>
                                   <div className="grid grid-cols-2 gap-6">
                                          {/* CURRENT PASSWORD */}
                                          <div>
                                                 <label className="text-[#ababab] text-sm">
                                                        Current Password
                                                 </label>

                                                 <input
                                                        type="password"
                                                        name="oldPassword"
                                                        required={true}
                                                        value={passwordData.oldPassword}
                                                        onChange={handlePasswordChange}
                                                        autoComplete="current-password"
                                                        disabled={!isEditPass}
                                                        placeholder="Enter current password"
                                                        className={`w-full mt-2 px-4 py-4 rounded-xl outline-none border transition ${isEditPass
                                                               ? "bg-[#121212] text-white border-transparent focus:border-yellow-400"
                                                               : "bg-[#2a2a2a] text-[#ababab] border-[#2a2a2a] cursor-not-allowed"
                                                               }`}
                                                 />
                                          </div>

                                          {/* NEW PASSWORD */}
                                          <div>
                                                 <label className="text-[#ababab] text-sm">
                                                        New Password
                                                 </label>

                                                 <input
                                                        type="password"
                                                        name="newPassword"
                                                        required={true}
                                                        value={passwordData.newPassword}
                                                        onChange={handlePasswordChange}
                                                        autoComplete="new-password"
                                                        disabled={!isEditPass}
                                                        placeholder="Enter new password"
                                                        className={`w-full mt-2 px-4 py-4 rounded-xl outline-none border transition ${isEditPass
                                                               ? "bg-[#121212] text-white border-transparent focus:border-yellow-400"
                                                               : "bg-[#2a2a2a] text-[#ababab] border-[#2a2a2a] cursor-not-allowed"
                                                               }`}
                                                 />
                                          </div>
                                   </div>

                                   {/* PASSWORD SAVE BUTTON */}
                                   {isEditPass && (
                                          <div className="flex justify-end mt-8">
                                                 <div className="flex gap-3">
                                                        <button className="bg-[#262626] hover:bg-[#333333] transition text-white px-5 py-3 rounded-xl flex items-center gap-2"
                                                               onClick={() => {
                                                                      setPasswordData({
                                                                             oldPassword: "",
                                                                             newPassword: ""
                                                                      })
                                                                      setIsEditPass(false)
                                                               }}>
                                                               cancel
                                                        </button>
                                                        <button
                                                               type="submit"
                                                               className="bg-yellow-400 hover:bg-yellow-500 transition text-black px-6 py-3 rounded-xl font-semibold"
                                                        >
                                                               Change Password
                                                        </button>
                                                 </div>
                                          </div>
                                   )}
                            </form>
                     </div>
              </div>
       )
};

export default AdminInfo;