import axios from 'axios';
import { Camera, Clock3, MapPin, Pencil, Store } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePopup } from '../../context/Popup';

const ResaurentSetting = () => {
       const { setPopup, setShowPopUp } = usePopup();
       const [isEditing, setIsEditing] = useState(false);
       const [restaurentData,setRestaurentData]= useState<any>({})
       const [formData, setFormData] = useState({
              ownerName: "",
              restaurantName: "",
              gstNumber: "",
              phone: "",
              email: "",
              address: "",
              zipCode: "",
              openTime: "",
              closeTime: "",
       });

       const getRestaurentData = async () => {
              try {
                     const { data } = await axios.get(
                            `${import.meta.env.VITE_API}/api/restaurent`,
                            {
                                   withCredentials: true,
                            }
                     );
                     setRestaurentData(data.restaurent)
                     setFormData({
                            ownerName: data.restaurent.ownerName,
                            restaurantName: data.restaurent.restaurantName,
                            gstNumber: data.restaurent.gstNumber,
                            phone: data.restaurent.phone,
                            email: data.restaurent.email,
                            address: data.restaurent.address,
                            zipCode: data.restaurent.zipCode,
                            openTime: data.restaurent.openTime,
                            closeTime: data.restaurent.closeTime,
                     })
              } catch (error) {
                     console.log(error);

              }
       }

       const handleSave = async (e: any) => {
              e.preventDefault();
              console.log(formData);
              try {
                     const { data } = await axios.patch(
                            `${import.meta.env.VITE_API}/api/restaurent`,
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
                     setIsEditing(false);
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
       }


       const handleChange = (e: any) => {
              setFormData({
                     ...formData,
                     [e.target.name]: e.target.value,
              });
       };
       const cancelBtn = () => {
              setFormData({
                     ownerName: restaurentData.ownerName,
                     restaurantName: restaurentData.restaurantName,
                     gstNumber: restaurentData.gstNumber,
                     phone: restaurentData.phone,
                     email: restaurentData.email,
                     address: restaurentData.address,
                     zipCode: restaurentData.zipCode,
                     openTime: restaurentData.openTime,
                     closeTime: restaurentData.closeTime,
              })
              setIsEditing(false)
       }
       useEffect(() => {
              getRestaurentData()
       }, [])
       return (
              <form onSubmit={handleSave} className="h-full flex flex-col overflow-hidden p-2">

                     {/* FIXED / NON-SCROLLING HEADER */}
                     <div className="shrink-0 flex items-center justify-between pb-4">
                            <div>
                                   <h1 className="text-3xl font-bold text-[#f5f5f5]">
                                          Restaurant Details
                                   </h1>

                                   <p className="text-[#ababab] mt-2">
                                          Manage your Restaurant account
                                   </p>
                            </div>

                            <div className="flex items-center gap-4">

                                   {/* CANCEL BUTTON */}
                                   <button type='button'
                                          onClick={() => cancelBtn()}
                                          className={`bg-[#1f1f1f] hover:bg-[#2a2a2a] transition 
                text-white px-5 py-3 rounded-xl flex items-center gap-2
                ${!isEditing ? "hidden" : ""}`}
                                   >
                                          <Pencil size={18} />
                                          Cancel
                                   </button>

                                   {/* EDIT BUTTON */}
                                   <button type='button'
                                          onClick={() => setIsEditing(true)}
                                          className={`bg-[#1f1f1f] hover:bg-[#2a2a2a] transition 
                text-white px-5 py-3 rounded-xl flex items-center gap-2
                ${isEditing ? "hidden" : ""}`}
                                   >
                                          <Pencil size={18} />
                                          Edit Details
                                   </button>

                                   {/* SAVE BUTTON */}
                                   <button
                                          type='submit'
                                          disabled={!isEditing}
                                          className={`px-6 py-3 rounded-xl font-semibold transition ${isEditing
                                                 ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                                                 : "hidden"
                                                 }`}
                                   >
                                          Save Changes
                                   </button>

                            </div>
                     </div>


                     {/* ONLY THIS SECTION SCROLLS */}
                     <div className="flex-1 overflow-y-auto flex flex-col gap-4">

                            {/* RESTAURANT CARD */}
                            <div className="bg-[#1f1f1f] rounded-2xl p-6 flex items-center gap-6 ">

                                   <div className="relative">
                                          <div className="h-28 w-28 rounded-2xl bg-yellow-400 flex items-center justify-center text-black">
                                                 <Store size={50} />
                                          </div>

                                          <button type='button'
                                                 className="absolute bottom-0 right-0 bg-[#262626] p-2 rounded-full border border-[#3a3a3a] text-yellow-400">
                                                 <Camera size={18} />
                                          </button>
                                   </div>

                                   <div>
                                          <h1 className="text-[#f5f5f5] text-3xl font-bold">
                                                 {formData.restaurantName}
                                          </h1>

                                          <p className="text-[#ababab] mt-2 flex items-center gap-2">
                                                 <MapPin size={16} />
                                                 {formData.address}
                                          </p>

                                          <div className="flex items-center gap-3 mt-4">
                                                 <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold">
                                                        GST: {formData.gstNumber}
                                                 </span>

                                                 <span className="bg-[#262626] text-[#ababab] px-4 py-1 rounded-full text-sm flex items-center gap-2">
                                                        <Clock3 size={16} />
                                                        {formData.openTime} - {formData.closeTime}
                                                 </span>
                                          </div>
                                   </div>

                            </div>


                            {/* YOUR FORM */}
                            <div className={`${!isEditing ? "bg-[#1f1f1f]" : "bg-[#2d2d2d]"} rounded-2xl p-4 grid grid-cols-2 gap-6`}>

                                   {/* RESTAURANT NAME */}
                                   <div>

                                          <label className="text-[#ababab] text-sm">
                                                 Restaurant Name
                                          </label>

                                          <input
                                                 type="text"
                                                 name="restaurantName"
                                                 value={formData.restaurantName}
                                                 onChange={handleChange}
                                                 disabled={!isEditing}
                                                 className={`w-full mt-2 px-4 py-4 rounded-xl outline-none border transition ${isEditing
                                                        ? "bg-[#1f1f1f] text-white border-transparent focus:border-yellow-400"
                                                        : "bg-[#2a2a2a] text-[#ababab] border-[#2a2a2a] cursor-not-allowed"
                                                        }`}
                                          />

                                   </div>


                                   {/* PHONE */}
                                   <div>

                                          <label className="text-[#ababab] text-sm">
                                                 Restaurant Phone
                                          </label>

                                          <input
                                                 type="text"
                                                 name="phone"
                                                 value={formData.phone}
                                                 onChange={handleChange}
                                                 disabled={!isEditing}
                                                 className={`w-full mt-2 px-4 py-4 rounded-xl outline-none border transition ${isEditing
                                                        ? "bg-[#1f1f1f] text-white border-transparent focus:border-yellow-400"
                                                        : "bg-[#2a2a2a] text-[#ababab] border-[#2a2a2a] cursor-not-allowed"
                                                        }`}
                                          />

                                   </div>

                                   {/* EMAIL */}
                                   <div>

                                          <label className="text-[#ababab] text-sm">
                                                 Restaurant Email
                                          </label>

                                          <input
                                                 type="email"
                                                 name="email"
                                                 value={formData.email}
                                                 onChange={handleChange}
                                                 disabled={!isEditing}
                                                 className={`w-full mt-2 px-4 py-4 rounded-xl outline-none border transition ${isEditing
                                                        ? "bg-[#1f1f1f] text-white border-transparent focus:border-yellow-400"
                                                        : "bg-[#2a2a2a] text-[#ababab] border-[#2a2a2a] cursor-not-allowed"
                                                        }`}
                                          />

                                   </div>

                                   {/* Owner name */}
                                   <div>

                                          <label className="text-[#ababab] text-sm">
                                                 Owner name
                                          </label>

                                          <input
                                                 type="text"
                                                 name="ownerName"
                                                 value={formData.ownerName}
                                                 onChange={handleChange}
                                                 disabled={!isEditing}
                                                 className={`w-full mt-2 px-4 py-4 rounded-xl outline-none border transition ${isEditing
                                                        ? "bg-[#1f1f1f] text-white border-transparent focus:border-yellow-400"
                                                        : "bg-[#2a2a2a] text-[#ababab] border-[#2a2a2a] cursor-not-allowed"
                                                        }`}
                                          />

                                   </div>

                                   {/* ADDRESS */}
                                   <div className="col-span-2">

                                          <label className="text-[#ababab] text-sm">
                                                 Address
                                          </label>

                                          <textarea
                                                 name="address"
                                                 value={formData.address}
                                                 onChange={handleChange}
                                                 disabled={!isEditing}
                                                 className={`w-full mt-2 px-4 py-4 rounded-xl outline-none border transition h-32 resize-none ${isEditing
                                                        ? "bg-[#1f1f1f] text-white border-transparent focus:border-yellow-400"
                                                        : "bg-[#2a2a2a] text-[#ababab] border-[#2a2a2a] cursor-not-allowed"
                                                        }`}
                                          />

                                   </div>

                                   {/* CITY */}
                                   <div>

                                          <label className="text-[#ababab] text-sm">
                                                 City
                                          </label>

                                          <input
                                                 type="text"
                                                 name="city" placeholder='not clickable...'
                                                 // value={formData.city}
                                                 onChange={handleChange}
                                                 disabled={true}
                                                 className={`w-full mt-2 px-4 py-4 rounded-xl outline-none border transition ${isEditing
                                                        ? "bg-[#1f1f1f] text-white border-transparent focus:border-yellow-400"
                                                        : "bg-[#2a2a2a] text-[#ababab] border-[#2a2a2a] cursor-not-allowed"
                                                        }`}
                                          />

                                   </div>

                                   {/* STATE */}
                                   <div>

                                          <label className="text-[#ababab] text-sm">
                                                 State
                                          </label>

                                          <input
                                                 type="text"
                                                 name="state"
                                                 placeholder='not clickable...'
                                                 // value={formData.state}
                                                 onChange={handleChange}
                                                 disabled={true}
                                                 className={`w-full mt-2 px-4 py-4 rounded-xl outline-none border transition ${isEditing
                                                        ? "bg-[#1f1f1f] text-white border-transparent focus:border-yellow-400"
                                                        : "bg-[#2a2a2a] text-[#ababab] border-[#2a2a2a] cursor-not-allowed"
                                                        }`}
                                          />

                                   </div>

                                   {/* ZIP CODE */}
                                   <div>

                                          <label className="text-[#ababab] text-sm">
                                                 Zip Code
                                          </label>

                                          <input
                                                 type="text"
                                                 name="zipCode"
                                                 value={formData.zipCode}
                                                 onChange={handleChange}
                                                 disabled={!isEditing}
                                                 className={`w-full mt-2 px-4 py-4 rounded-xl outline-none border transition ${isEditing
                                                        ? "bg-[#1f1f1f] text-white border-transparent focus:border-yellow-400"
                                                        : "bg-[#2a2a2a] text-[#ababab] border-[#2a2a2a] cursor-not-allowed"
                                                        }`}
                                          />

                                   </div>

                                   {/* GST NUMBER */}
                                   <div>

                                          <label className="text-[#ababab] text-sm">
                                                 GST Number
                                          </label>

                                          <input
                                                 type="text"
                                                 name="gstNumber"
                                                 value={formData.gstNumber}
                                                 onChange={handleChange}
                                                 disabled={!isEditing}
                                                 className={`w-full mt-2 px-4 py-4 rounded-xl outline-none border transition ${isEditing
                                                        ? "bg-[#1f1f1f] text-white border-transparent focus:border-yellow-400"
                                                        : "bg-[#2a2a2a] text-[#ababab] border-[#2a2a2a] cursor-not-allowed"
                                                        }`}
                                          />

                                   </div>

                                   {/* OPEN TIME */}
                                   <div>

                                          <label className="text-[#ababab] text-sm">
                                                 Opening Time
                                          </label>

                                          <input
                                                 type="time"
                                                 name="openTime"
                                                 value={formData.openTime}
                                                 onChange={handleChange}
                                                 disabled={!isEditing}
                                                 className={`w-full mt-2 px-4 py-4 rounded-xl outline-none border transition ${isEditing
                                                        ? "bg-[#1f1f1f] text-white border-transparent focus:border-yellow-400"
                                                        : "bg-[#2a2a2a] text-[#ababab] border-[#2a2a2a] cursor-not-allowed"
                                                        }`}
                                          />

                                   </div>

                                   {/* CLOSE TIME */}
                                   <div>

                                          <label className="text-[#ababab] text-sm">
                                                 Closing Time
                                          </label>

                                          <input
                                                 type="time"
                                                 name="closeTime"
                                                 value={formData.closeTime}
                                                 onChange={handleChange}
                                                 disabled={!isEditing}
                                                 className={`w-full mt-2 px-4 py-4 rounded-xl outline-none border transition ${isEditing
                                                        ? "bg-[#1f1f1f] text-white border-transparent focus:border-yellow-400"
                                                        : "bg-[#2a2a2a] text-[#ababab] border-[#2a2a2a] cursor-not-allowed"
                                                        }`}
                                          />

                                   </div>

                            </div>

                     </div>

              </form >
       )
}

export default ResaurentSetting
