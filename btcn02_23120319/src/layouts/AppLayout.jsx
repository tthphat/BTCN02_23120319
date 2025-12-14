import Footer from "@/components/common/Footer.jsx"
import Header from "@/components/common/Header.jsx"
import { Outlet } from "react-router-dom";


function AppLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default AppLayout
