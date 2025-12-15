import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

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
                        <NavLink
                            to="/user/profile"
                            className={({ isActive }) =>
                                cn(
                                    "block w-full px-4 py-2 rounded-lg transition-all duration-200 font-medium",
                                    isActive
                                        ? "bg-blue-500 text-white shadow-md"
                                        : "text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400"
                                )
                            }
                        >
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/user/favorites"
                            className={({ isActive }) =>
                                cn(
                                    "block w-full px-4 py-2 rounded-lg transition-all duration-200 font-medium",
                                    isActive
                                        ? "bg-blue-500 text-white shadow-md"
                                        : "text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400"
                                )
                            }
                        >
                            Favorites
                        </NavLink>
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
