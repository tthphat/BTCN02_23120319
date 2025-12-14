import { DarkModeToggle } from "../theme/ThemeToggle"

function Header() {
    return (
        <header>
            <div className="container">
                <div>
                    <h1 className="h1">23120319</h1>
                </div>
                <div>
                    <h1 className="h1">Movies info</h1>
                </div>
                <div>
                    <DarkModeToggle />
                </div>
            </div>
        </header>
    );
}

export default Header;
