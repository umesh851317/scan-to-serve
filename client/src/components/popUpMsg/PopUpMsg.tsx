import { usePopup } from "../../context/Popup";

const PopUpMsg = () => {
       const { popUpMsg } = usePopup();
       return (
              <div
                     className={`${popUpMsg.bgColor} absolute top-[10vh] left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-lg px-5 py-3 text-white shadow-xl`}
              >
                     <div>
                            <p className="font-semibold">{popUpMsg.msg}</p>
                     </div>
              </div>
       )
}

export default PopUpMsg

