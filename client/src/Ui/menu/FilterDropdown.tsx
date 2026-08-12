import { useState } from "react";

const FilterDropdown = ({ title, value, options, onChange }) => {
       const [open, setOpen] = useState(false);

       return (
              <div className="relative w-full">

                     <button
                            onClick={() => setOpen(!open)}
                            className="w-full flex items-center justify-between
                           px-4 py-3 rounded-lg
                           bg-[#262626] text-white"
                     >
                            <span>{value || title}</span>

                            <span className={`
                    transition-transform
                    ${open ? "rotate-180" : ""}
                `}>
                                   ▼
                            </span>
                     </button>

                     {open && (
                            <div className=" top-full left-0 w-full mt-2
                                bg-[#262626] border border-[#333]
                                rounded-lg p-2 z-30">

                                   {options.map((option) => (
                                          <button
                                                 key={option}
                                                 onClick={() => {
                                                        onChange(option);
                                                        setOpen(false);
                                                 }}
                                                 className={`w-full text-left px-4 py-3 rounded-lg
                                ${value === option
                                                               ? "bg-yellow-400 text-black"
                                                               : "text-gray-300 hover:bg-[#333]"
                                                        }`}
                                          >
                                                 {option}
                                          </button>
                                   ))}

                            </div>
                     )}
              </div>
       );
};

export default FilterDropdown;