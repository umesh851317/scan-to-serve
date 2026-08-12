import { useEffect, useState } from "react";
import MenuCard from "../../Ui/menu/MenuCard";
import FilterDropdown from "../../Ui/menu/FilterDropdown";
import axios from "axios";
import DeleteMenu from "../../Ui/menu/DeleteMenu";
import MenuForm from "../../Ui/menu/menuForm";

const Menu = () => {
       const [menuItemes, setMenuItemes] = useState([])
       const [selectedCategory, setSelectedCategory] = useState("All");
       const [selectedType, setSelectedType] = useState("All");
       const [selectedPrice, setSelectedPrice] = useState("All");
       const [menuID, setMenuID] = useState(null)
       const [showDelete, setShowDelete] = useState(false)
       const [showMenuForm, setShowMenuForm] = useState(false)
       const GetMenuItme = async () => {
              try {
                     const { data } = await axios.get(
                            `${import.meta.env.VITE_API}/api/menu`,
                            {
                                   withCredentials: true,
                            }
                     )
                     if (data.success) {
                            setMenuItemes(data.menuItemes)
                            console.log(data.menuItemes)
                     }
              } catch (error) {
                     console.log("error", error);
              }
       }

       useEffect(() => {
              GetMenuItme();
       }, [])
       return (
              <div className="flex h-full overflow-hidden pb-26">
                     {/* LEFT SIDEBAR */}
                     <aside className="w-64 shrink-0 border-r border-gray-700 p-4 overflow-y-auto flex flex-col gap-3">
                            <div className="flex justify-center">
                                   <button
                                          onClick={() => setShowMenuForm(true)}
                                          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-95 w-[70%] "
                                   >
                                          <span className="text-lg leading-none">+</span>
                                          <span>Add menu itme</span>
                                   </button>
                            </div>
                            {/* <div className=" space-y-4">

                                   <FilterDropdown
                                          title="Category"
                                          value={selectedCategory}
                                          options={[
                                                 "All",
                                                 "Starters",
                                                 "Main Course",
                                                 "Pizza",
                                                 "Burger",
                                                 "Drinks",
                                                 "Desserts"
                                          ]}
                                          onChange={setSelectedCategory}
                                   />

                                   <FilterDropdown
                                          title="Food Type"
                                          value={selectedType}
                                          options={[
                                                 "All",
                                                 "Veg",
                                                 "Non-Veg"
                                          ]}
                                          onChange={setSelectedType}
                                   />

                                   <FilterDropdown
                                          title="Price"
                                          value={selectedPrice}
                                          options={[
                                                 "All",
                                                 "Under ₹100",
                                                 "₹100 - ₹200",
                                                 "₹200 - ₹500",
                                                 "Above ₹500"
                                          ]}
                                          onChange={setSelectedPrice}
                                   />

                            </div> */}
                     </aside>


                     {/* RIGHT CONTENT */}
                     <div className="flex-1 min-w-0 overflow-y-auto p-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                                   {
                                          menuItemes.length > 0 ? (
                                                 menuItemes?.map((menu, index) => {
                                                        return (
                                                               <MenuCard
                                                                      key={menu?._id || index}
                                                                      menuData={{
                                                                             menu,
                                                                             setMenuID,
                                                                             menuItemes,
                                                                             setShowDelete,
                                                                             setShowMenuForm
                                                                      }}
                                                               />
                                                        )
                                                 })) : (
                                                        <div className="text-white ">menu is empty</div>
                                                 )
                                   }

                            </div>
                            {showMenuForm && (
                                   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                                          {/* One fixed modal */}
                                          <div className="relative w-full max-w-3xl h-[85vh] bg-[#202020] rounded-2xl overflow-hidden">
                                                 {/* Only this area scrolls */}
                                                 <div className="h-full overflow-y-auto custom-scrollbar">
                                                        <MenuForm menuData={{ setShowMenuForm, menuID, setMenuID, menuItemes, setMenuItemes }} />
                                                 </div>
                                          </div>
                                   </div>
                            )}

                     </div>

                     {/* DELETE MODAL */}
                     {showDelete && (
                            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                                   <DeleteMenu
                                          menuData={{
                                                 menuID,
                                                 setMenuID,
                                                 setMenuItemes,
                                                 setShowDelete
                                          }}
                                   />
                            </div>
                     )}
              </div>
       )
}

export default Menu
