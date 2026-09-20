import { usePopup } from "../../context/Popup";

const CustomerPopUp = () => {
       const { popUpMsg } = usePopup();
       return (
              <div
                     className={`${popUpMsg.bgColor} fixed top-[10vh] w-[80%] text-center left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-lg px-5 py-3 text-white shadow-xl`}
              >
                     <div>
                            <p className="font-medium">{popUpMsg.msg}</p>
                     </div>
              </div>
       )
}

export default CustomerPopUp

