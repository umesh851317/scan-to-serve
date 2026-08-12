import { useEffect, useState } from "react";
import { Link, Upload, X } from "lucide-react";
import { usePopup } from "../../context/Popup";
import axios from "axios";

interface FormData {
       name: string;
       description: string;
       price: number | "";
       category: string;
       image: string;
       isVeg: boolean;
}

const MenuForm = ({ menuData }: any) => {
       const { setShowMenuForm, menuID, setMenuItemes } = menuData;
       const { setPopup, setShowPopUp } = usePopup();
       const [imageType, setImageType] = useState<"url" | "upload">("url");

       const [formData, setFormData] = useState<FormData>({
              name: "",
              description: "",
              price: "",
              category: "",
              image: "",
              isVeg: true,
       });

       const [preview, setPreview] = useState("");

       const handleChange = (e: any) => {
              const { name, value } = e.target;

              setFormData((prev) => ({
                     ...prev,
                     [name]:
                            name === "isveg"
                                   ? value === "true"
                                   : name === "price"
                                          ? value === ""
                                                 ? ""
                                                 : Number(value)
                                          : value,
              }));

              if (name === "image") {
                     setPreview(value);
              }
       };

       const removeImage = () => {
              setFormData((prev) => ({
                     ...prev,
                     image: "",
              }));

              setPreview("");
       };

       const handleSubmit = async (e: any) => {
              e.preventDefault();
              try {
                     // ADD TABLE
                     if (!menuID) {
                            const { data } = await axios.post(
                                   `http://localhost:8000/api/menu/`,
                                   formData,
                                   {
                                          withCredentials: true
                                   }
                            );
                            console.log("54", data);

                            if (data.success) {
                                   setPopup({
                                          msg: data.message,
                                          bgColor: data.success ? ("bg-green-500") : ("bg-red-500")
                                   })
                                   setShowPopUp(true)
                                   setShowMenuForm(false)
                                   setMenuItemes((prev: any) => [...prev, data.menuItem])
                            }
                     }
                     // EDIT TABLE
                     else {
                            const { data } = await axios.patch(
                                   `http://localhost:8000/api/menu/${menuID._id}`,
                                   formData,
                                   {
                                          withCredentials: true,
                                   }
                            );

                            console.log("EDIT response:", data);

                            if (data.success) {
                                   setPopup({
                                          msg: data.message,
                                          bgColor: "bg-green-500",
                                   });

                                   setShowPopUp(true);
                                   setShowMenuForm(false);

                                   // Update edited menu in UI
                                   setMenuItemes((prev: any[]) =>
                                          prev.map((menu: any) =>
                                                 menu._id === menuID._id
                                                        ? data.updateMenu
                                                        : menu
                                          )
                                   );
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
              if (menuID) {
                     setFormData({
                            name: menuID.name,
                            description: menuID.description,
                            price: menuID.price,
                            category: menuID.category,
                            image: menuID.image,
                            isVeg: menuID.isVeg
                     });
              }
              console.log(formData);

       }, [menuID])
       return (
              <div className="w-full bg-[#171717] text-white p-6">
                     {/* Form Card */}
                     <div className="max-w-5xl mx-auto bg-[#202020] border border-[#303030] rounded-2xl p-6">
                            <form onSubmit={handleSubmit}>
                                   {/* Basic Information */}
                                   <div className="mb-8">
                                          <h1 className="text-2xl font-semibold">
                                                 Add Menu Item
                                          </h1>

                                          <p className="text-sm text-gray-400 mt-1">
                                                 Add a new food item to your restaurant menu
                                          </p>

                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

                                                 {/* Name */}
                                                 <div className="md:col-span-2">
                                                        <label className="block text-sm text-gray-300 mb-2">
                                                               Menu Name
                                                               <span className="text-red-400 ml-1">*</span>
                                                        </label>

                                                        <input
                                                               type="text"
                                                               name="name"
                                                               value={formData.name}
                                                               onChange={handleChange}
                                                               placeholder="e.g. Paneer Tikka Pizza"
                                                               required
                                                               className="w-full bg-[#292929] border border-[#3a3a3a] rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-500 placeholder:text-gray-500"
                                                        />
                                                 </div>

                                                 {/* Description */}
                                                 <div className="md:col-span-2">
                                                        <label className="block text-sm text-gray-300 mb-2">
                                                               Description
                                                               <span className="text-red-400 ml-1">*</span>
                                                        </label>

                                                        <textarea
                                                               name="description"
                                                               value={formData.description}
                                                               onChange={handleChange}
                                                               placeholder="Describe your menu item..."
                                                               rows={4}
                                                               required
                                                               className="w-full bg-[#292929] border border-[#3a3a3a] rounded-lg px-4 py-3 text-sm outline-none resize-none focus:border-orange-500 placeholder:text-gray-500"
                                                        />
                                                 </div>

                                                 {/* Price */}
                                                 <div>
                                                        <label className="block text-sm text-gray-300 mb-2">
                                                               Price
                                                               <span className="text-red-400 ml-1">*</span>
                                                        </label>

                                                        <div className="relative">
                                                               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                                      ₹
                                                               </span>

                                                               <input
                                                                      type="number"
                                                                      name="price"
                                                                      value={formData.price}
                                                                      onChange={handleChange}
                                                                      placeholder="0"
                                                                      min="0"
                                                                      required
                                                                      className="w-full bg-[#292929] border border-[#3a3a3a] rounded-lg pl-9 pr-4 py-3 text-sm outline-none focus:border-orange-500 placeholder:text-gray-500"
                                                               />
                                                        </div>
                                                 </div>

                                                 {/* Is Veg */}
                                                 <div>
                                                        <label className="block text-sm text-gray-300 mb-2">
                                                               Menu Type
                                                               <span className="text-red-400 ml-1">*</span>
                                                        </label>

                                                        <select
                                                               name="isveg"
                                                               value={String(formData.isVeg)}
                                                               onChange={handleChange}
                                                               required
                                                               className="w-full bg-[#292929] border border-[#3a3a3a] rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
                                                        >
                                                               <option value="">Select menu type</option>
                                                               <option value="true">Veg</option>
                                                               <option value="false">Non-Veg</option>
                                                        </select>
                                                 </div>

                                                 {/* Category */}
                                                 <div>
                                                        <label className="block text-sm text-gray-300 mb-2">
                                                               Category
                                                               <span className="text-red-400 ml-1">*</span>
                                                        </label>

                                                        <select
                                                               name="category"
                                                               value={formData.category}
                                                               onChange={handleChange}
                                                               required
                                                               className="w-full bg-[#292929] border border-[#3a3a3a] rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-500"
                                                        >
                                                               <option value="">Select Category</option>

                                                               <option value="Pizza">Pizza</option>
                                                               <option value="Burger">Burger</option>
                                                               <option value="Starter">Starter</option>
                                                               <option value="Main Course">Main Course</option>
                                                               <option value="Beverages">Beverages</option>
                                                               <option value="Dessert">Dessert</option>
                                                        </select>
                                                 </div>
                                          </div>
                                   </div>

                                   {/* Image Section */}
                                   <div className="border-t border-[#303030] pt-7 mb-8">
                                          <h2 className="text-lg font-medium mb-2">
                                                 Menu Image
                                          </h2>

                                          <p className="text-sm text-gray-400 mb-5">
                                                 Add your food image using a URL or upload an image.
                                          </p>

                                          {/* Image Type */}
                                          <div className="grid grid-cols-2 gap-3 mb-5">

                                                 {/* URL */}
                                                 <button
                                                        type="button"
                                                        onClick={() => {
                                                               setImageType("url");
                                                               setPreview("");
                                                        }}
                                                        className={`flex items-center justify-center gap-2 py-3 rounded-lg border transition ${imageType === "url"
                                                               ? "border-orange-500 bg-orange-500/10 text-orange-400"
                                                               : "border-[#3a3a3a] bg-[#292929] text-gray-400 hover:border-gray-500"
                                                               }`}
                                                 >
                                                        <Link size={18} />
                                                        Image URL
                                                 </button>

                                                 {/* Upload */}
                                                 <button
                                                        type="button"
                                                        disabled={true}
                                                        onClick={() => {
                                                               setImageType("upload");
                                                               setPreview("");
                                                        }}
                                                        className={`flex items-center justify-center gap-2 py-3 rounded-lg border transition ${imageType === "upload"
                                                               ? "border-orange-500 bg-orange-500/10 text-orange-400"
                                                               : "border-[#3a3a3a] bg-[#292929] text-gray-400 hover:border-gray-500"
                                                               }`}
                                                 >
                                                        <Upload size={18} />
                                                        Upload Image
                                                 </button>
                                          </div>

                                          {/* URL Input */}
                                          {imageType === "url" && (
                                                 <div>
                                                        <label className="block text-sm text-gray-300 mb-2">
                                                               Image URL
                                                               <span className="text-red-400 ml-1">*</span>
                                                        </label>

                                                        <input
                                                               type="url"
                                                               name="image"
                                                               value={formData.image}
                                                               onChange={handleChange}
                                                               placeholder="https://example.com/food-image.jpg"
                                                               required
                                                               className="w-full bg-[#292929] border border-[#3a3a3a] rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-500 placeholder:text-gray-500"
                                                        />
                                                 </div>
                                          )}

                                          {/* Image Preview */}
                                          {preview && (
                                                 <div className="mt-5">
                                                        <div className="flex items-center justify-between mb-2">
                                                               <p className="text-sm text-gray-300">
                                                                      Image Preview
                                                               </p>

                                                               <button
                                                                      type="button"
                                                                      onClick={removeImage}
                                                                      className="text-gray-400 hover:text-red-400"
                                                               >
                                                                      <X size={18} />
                                                               </button>
                                                        </div>

                                                        <div className="relative w-full h-64 rounded-xl overflow-hidden bg-[#292929] border border-[#3a3a3a]">
                                                               <img
                                                                      src={preview}
                                                                      alt="Menu preview"
                                                                      className="w-full h-full object-cover"
                                                                      onError={() => setPreview("")}
                                                               />
                                                        </div>
                                                 </div>
                                          )}
                                   </div>

                                   {/* Required Fields Note */}
                                   <div className="border-t border-[#303030] pt-5">
                                          <p className="text-xs text-gray-500">
                                                 <span className="text-red-400">*</span>{" "}
                                                 Required fields
                                          </p>
                                   </div>

                                   {/* Buttons */}
                                   <div className="flex justify-end gap-3 mt-6">
                                          <button
                                                 onClick={() => setShowMenuForm(false)}
                                                 type="button"
                                                 className="px-5 py-3 rounded-lg border border-[#3a3a3a] text-gray-300 hover:bg-[#292929] transition"
                                          >
                                                 Cancel
                                          </button>

                                          <button
                                                 type="submit"
                                                 className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium transition"
                                          >
                                                 Add Menu
                                          </button>
                                   </div>
                            </form>
                     </div>
              </div>
       );
};

export default MenuForm;
