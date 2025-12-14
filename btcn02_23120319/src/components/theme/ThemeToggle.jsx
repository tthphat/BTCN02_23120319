"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"

const THEME_KEY = "theme" // 'dark' | 'light'

export function DarkModeToggle() {
    const [dark, setDark] = useState(false)

    // Load theme từ localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem(THEME_KEY)
        if (savedTheme === "dark") {
            setDark(true)
            document.documentElement.classList.add("dark")
        }
    }, [])

    // Sync state → DOM + localStorage
    useEffect(() => {
        const html = document.documentElement

        if (dark) {
            html.classList.add("dark")
            localStorage.setItem(THEME_KEY, "dark")
        } else {
            html.classList.remove("dark")
            localStorage.setItem(THEME_KEY, "light")
        }
    }, [dark])

    return (
        <Toggle
            pressed={dark}
            onPressedChange={setDark}
            aria-label="Toggle dark mode"
            variant="outline"
            size="sm"
        >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Toggle>
    )
}
