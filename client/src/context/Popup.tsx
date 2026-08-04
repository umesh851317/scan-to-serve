import { createContext, useContext, useState } from "react";

const PopUpContext = createContext(null);
export function Popup({ children }) {
  const [showPopUp, setShowPopUp] = useState(false)
  const [popUpMsg, setPopup] = useState({
    msg: "",
    bgColor: ""
  })

  return (
    <PopUpContext.Provider
      value={{ popUpMsg, setPopup, showPopUp, setShowPopUp }}
    >
      {children}
    </PopUpContext.Provider>
  )
}

export const usePopup = () => useContext(PopUpContext);   // create custome hook for reused 
