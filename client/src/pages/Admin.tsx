import { useState } from "react";
import Headers from "../components/shared/headers";
import Footer from "../components/shared/footer";
import Profile from "../components/admin/profile";
import PopUpMsg from "../components/popUpMsg/PopUpMsg";
import { usePopup } from "../context/Popup";

const Admin = () => {
       const {showPopUp} = usePopup();
       // console.log("vbnvi..", showPopUp)
       const [adminCompo, setAdminCompo] = useState("Profile");

       // const checkAuth = async () => {    // function for get user data
       //        try {
       //               const respo = await axios.get("http://localhost:8000/api/admin", {
       //                      withCredentials: true,
       //               });
       //               console.log(respo.data);

       //        } catch (err) {
       //               console.log(err)
       //        } finally {
       //        }
       // };

       // useEffect(() => {
       //        checkAuth()
       // })

       return (
              <main className="h-screen relative">

                     {/* Header */}
                     <header className="h-[8vh] w-full fixed top-0 left-0 z-50 bg-white">
                            <Headers />
                     </header>

                     {/* Content */}
                     <section className="h-full w-full fixed top-[7vh] bg-[#1f1f1f]">
                            {/* {adminCompo === "Dashboard" && <Dashboard />}
    {adminCompo === "Orders" && <Orders />}
    {adminCompo === "Tables" && <Tables />}
    {adminCompo === "Menu" && <RestaurentMenu />} */}
                            {adminCompo === "Profile" && <Profile />}
                     </section>

                     {/* Footer */}
                     <footer className="h-[7vh] w-full fixed bottom-0 left-0 z-50 bg-[#1f1f1f]">
                            <Footer
                                   homeCompo={{
                                          adminCompo,
                                          setAdminCompo,
                                   }}
                            />
                     </footer>

                     {showPopUp && <PopUpMsg />}
              </main>
       )
}

export default Admin
