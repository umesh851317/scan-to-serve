import axios from 'axios';
import { usePopup } from '../../context/Popup';
const DeleteMenu = ({ menuData }) => {
       const { setPopup, setShowPopUp } = usePopup();
       const { menuID, setMenuID, setMenuItemes, setShowDelete } = menuData

       const handleDelete = async () => {
              try {
                     const { data } = await axios.delete(
                            `http://localhost:8000/api/menu/${menuID}`,
                            {
                                   withCredentials: true
                            }
                     );
                     setShowPopUp(true)
                     setPopup({
                            msg: data.message,
                            bgColor: data.success ? ("bg-green-500") : ("bg-red-500")
                     })
                     if (data.success) {
                            setMenuItemes((prev: any[]) =>
                                   prev.filter((menu) => menu._id !== menuID)
                            )
                            setMenuID(null)
                            setShowDelete(false)
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
       return (
              <div className="bg-[#262626] w-full max-w-md rounded-3xl p-8 border border-[#333]">

                     <h1 className="text-2xl font-bold text-white">
                            Delete Menu
                     </h1>

                     <p className="text-[#ababab] mt-3">
                            Are you sure you want to delete this menu item?
                     </p>

                     <div className="flex justify-end gap-4 mt-8">

                            <button onClick={() => {
                                   setMenuID(null)
                                   setShowDelete(false)
                            }}
                                   className="bg-[#1f1f1f] hover:bg-[#333] transition text-white px-5 py-3 rounded-xl"
                            >
                                   Cancel
                            </button>

                            <button
                                   onClick={handleDelete}
                                   className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-3 rounded-xl"
                            >
                                   Delete
                            </button>

                     </div>

              </div>
       )
}

export default DeleteMenu
