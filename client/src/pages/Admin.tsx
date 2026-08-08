import { useEffect, useState } from "react";
import Headers from "../components/shared/headers";
import Footer from "../components/shared/footer";
import Profile from "../components/admin/profile";
import PopUpMsg from "../components/popUpMsg/PopUpMsg";
import { usePopup } from "../context/Popup";
import Table from "../components/admin/table";

const Admin = () => {
       const { showPopUp } = usePopup();
       const [adminCompo, setAdminCompo] = useState("Profile");

       useEffect(() => {
              const currCompo = sessionStorage.getItem("adminCompo")
              if (currCompo) {
                     setAdminCompo(currCompo)
              } else {
                     setAdminCompo("Profile")
              }
       }, [])

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
    {adminCompo === "Menu" && <RestaurentMenu />} */}
                            {adminCompo === "Tables" && <Table />}
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
