import Footer from "@/components/common/Footer.jsx"
import Header from "@/components/common/Header.jsx"
import { Outlet } from "react-router-dom";
import Navbar from "@/components/common/Navbar.jsx";


function AppLayout() {
    return (
        <div className="min-h-screen grid grid-rows-[auto_auto_1fr_auto]">
            <Header />
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default AppLayout
