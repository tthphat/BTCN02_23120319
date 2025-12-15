import { Link, Outlet } from "react-router-dom";

function User() {
    return (
        <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8 text-foreground">
            <nav className="border-r pr-4 h-full">
                <div className="mb-6">
                    <h3 className="font-bold text-lg mb-2">Account</h3>
                    <p className="text-sm text-muted-foreground">Welcome, user!</p>
                </div>
                <ul className="space-y-2">
                    <li>
                        <Link to="/user/profile" className="block p-2 hover:bg-accent rounded transition-colors">
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/user/favorites" className="block p-2 hover:bg-accent rounded transition-colors">
                            Favorites
                        </Link>
                    </li>
                </ul>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default User;
