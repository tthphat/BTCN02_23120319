import { House } from "lucide-react"
import { Link } from "react-router-dom"
import ComboBox from "@/components/common/ComboBox"


function Navbar() {
    return (
        <nav>
            <div className="w-full flex items-center px-5 py-2 mt-2 bg-[var(--navbar-background)] text-[var(--foreground)]">
                <div className="w-full flex justify-between items-center gap-2">
                    <Link to="/">
                        <House size={32} />
                    </Link>
                    <div className="flex items-center gap-2">
                        <ComboBox />
                        <input type="text" placeholder="Search" className="p-2 border border-border rounded-md bg-[var(--background)]" />
                        <button className="p-2 border border-gray-500 rounded-md cursor-pointer hover:bg-gray-500 hover:text-white transition">Search</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
