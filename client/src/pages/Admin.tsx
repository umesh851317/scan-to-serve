import { useEffect, useState } from "react";
import Headers from "../components/shared/headers";
import Footer from "../components/shared/footer";
import Profile from "../components/admin/profile";
import PopUpMsg from "../components/popUpMsg/PopUpMsg";
import { usePopup } from "../context/Popup";
import Table from "../components/admin/table";
import Menu from "../components/admin/menu";
import axios from "axios";
import PaymentANDorders from "../components/admin/Payment&Orders";

const Admin = () => {
       const { showPopUp } = usePopup();
       const [adminCompo, setAdminCompo] = useState("Profile");
       const [tables, setTables] = useState([])
       const fetchTables = async () => {
              try {
                     const { data } = await axios.get(
                            `${import.meta.env.VITE_API}/api/table`,
                            {
                                   withCredentials: true,
                            }
                     )
                     const sortedTables = [...data.tables].sort((a, b) => {
                            return (
                                   Number(a.tableNumber.slice(1)) -
                                   Number(b.tableNumber.slice(1))
                            );
                     });
                     setTables(sortedTables)
              } catch (error) {
                     console.log("error", error);
              }
       }

       useEffect(() => {
              fetchTables();
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
                            {adminCompo === "Menu" && <Menu />}
                            {adminCompo === "Tables" && <Table tableProps={{ tables, setTables }} />}
                            {adminCompo === "Profile" && <Profile />}
                            {adminCompo === "Payments" && <PaymentANDorders paymentProps={{ tables }} />}
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
