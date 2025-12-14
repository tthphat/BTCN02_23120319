import { DarkModeToggle } from "../theme/ThemeToggle"
import { CircleUserRound } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

function Header() {
    const { user } = useAuth();
    return (
        <header>
            <div className="w-full flex justify-between items-center px-5 py-3 bg-[var(--header-background)] text-[var(--header-foreground)]">
                <div>
                    <h1 className="h1">23120319</h1>
                </div>
                <div>
                    <h1 className="h1 text-2xl font-semibold">Movies info</h1>
                </div>
                <div className="flex items-center gap-2">
                    <CircleUserRound size={28} className={`${user && "text-green-500"} cursor-pointer`} />
                    <DarkModeToggle />
                </div>
            </div>
        </header>
    );
}

export default Header;
