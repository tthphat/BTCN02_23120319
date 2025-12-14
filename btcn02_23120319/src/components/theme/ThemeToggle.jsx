import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";

export function DarkModeToggle() {
    const [dark, setDark] = useState(false);

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

        </div>
    )
}
