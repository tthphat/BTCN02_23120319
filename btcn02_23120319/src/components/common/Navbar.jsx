import { House } from "lucide-react"
import { Link } from "react-router-dom"

function Navbar() {
    return (
        <nav>
            <div className="w-full flex items-center px-5 py-3 mt-2 bg-[var(--header-background)] text-[var(--header-foreground)]">
                <div className="flex justify-between items-center gap-2">
                    <Link to="/">
                        <House size={24} />
                    </Link>
                    <div className="flex items-center gap-2">
                        <input type="text" placeholder="Search" className="p-2 border border-border rounded-md" />
                        <button className="p-2 border border-border rounded-md">Search</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

