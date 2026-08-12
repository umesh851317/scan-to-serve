
const MenuCard = ({ menuData }) => {
       const { menu, setMenuID, setShowMenuForm, setShowDelete } = menuData
       
       return (
              <div className="bg-[#262626] rounded-xl overflow-hidden flex flex-col h-full">
                     {/* Image */}
                     <div className="relative">
                            <img
                                   src={menu.image}
                                   alt={menu.name}
                                   className="w-full h-48 object-cover"
                            />
                            <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/70 text-xs">
                                   {menu.isVeg ? "🟢" : "🔴"}
                            </span>
                     </div>
                     {/* Content */}
                     <div className="p-4 flex flex-col gap-3 flex-1">

                            <div className="flex justify-between">
                                   <h2 className="text-lg font-semibold text-white">
                                          {menu.name}
                                   </h2>

                                   <span
                                          className={`px-2 py-1 rounded-md text-xs ${menu.isAvailable
                                                 ? "bg-green-500/20 text-green-400"
                                                 : "bg-red-500/20 text-red-400"
                                                 }`}
                                   >
                                          {menu.isAvailable ? "Available" : "Out-of-Stock"}
                                   </span>
                            </div>
                            <div className="flex justify-between">
                                   <p className="text-sm text-gray-400 mt-1 line-clamp-2 flex-2">
                                          {menu.description}
                                   </p>

                                   <span className="text-white font-semibold flex-1 text-end">
                                          ₹{menu.price}
                                   </span>
                            </div>
                            {/* Actions */}
                            <div className="flex gap-3 mt-auto">

                                   <button onClick={() => {
                                          setMenuID(menu),
                                          setShowMenuForm(true)
                                   }}
                                          className="flex-1 py-2 rounded-lg bg-blue-500/20 text-blue-400">
                                          Edit
                                   </button>

                                   <button onClick={() => {
                                          setMenuID(menu._id)
                                          setShowDelete(true)
                                   }}
                                          className="flex-1 py-2 rounded-lg bg-red-500/20 text-red-400">
                                          Delete
                                   </button>
                            </div>
                     </div>
              </div>
       )
}

export default MenuCard
