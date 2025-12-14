import Footer from "@/components/common/Footer.jsx"
import Header from "@/components/common/Header.jsx"
import { Outlet } from "react-router-dom";
import Navbar from "@/components/common/Navbar.jsx";


function AppLayout() {
    return (
        <>
            <Header />
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default AppLayout
