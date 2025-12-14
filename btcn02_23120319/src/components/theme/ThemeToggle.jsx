import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export function DarkModeToggle() {
    const [dark, setDark] = useState(false); // true:Dark, false:Light

    // load theme từ localStorage
    useEffect(() => {
        const saved = localStorage.getItem("theme")
        if (saved === "dark") {
            setDark(true)
            document.documentElement.classList.add("dark")
        }
    }, [])

    const toggleTheme = (checked) => {
        setDark(checked)
        document.documentElement.classList.toggle("dark", checked)
        localStorage.setItem("theme", checked ? "dark" : "light")
    }

    return (
        <div className="flex items-center gap-3">
            <Switch
                checked={dark}
                onCheckedChange={toggleTheme}
            />
            {dark ? (
                <Moon className="h-5 w-5 text-gray-300" />
            ) : (
                <Sun className="h-5 w-5 text-gray-500" />
            )}
        </div>
    )
}
