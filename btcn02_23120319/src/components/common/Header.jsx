import { DarkModeToggle } from "../theme/ThemeToggle"

function Header() {
    return (
        <header>
            <div className="w-full flex justify-between items-center px-5 py-3 bg-[var(--header-background)] text-[var(--header-foreground)]">
                <div>
                    <h1 className="h1">23120319</h1>
                </div>
                <div>
                    <h1 className="h1 text-2xl font-semibold">Movies info</h1>
                </div>
                <div>
                    <DarkModeToggle />
                </div>
            </div>
        </header>
    );
}

export default Header;
