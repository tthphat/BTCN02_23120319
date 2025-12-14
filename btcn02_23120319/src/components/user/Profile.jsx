import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";


export default function Profile() {
    const { user, logout } = useAuth();

    return (
        <div className="flex justify-center items-center py-10">
            <Card className="w-md lg:w-xl ">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-3">
                        <div className="w-full flex flex-col gap-2">
                            <h1 className="text-lg font-semibold">Username</h1>
                            <input type="text" readOnly placeholder={user.username} className="border rounded-md px-5 py-1 text-lg" />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <h1 className="text-lg font-semibold">Fullname</h1>
                            <input type="text" readOnly placeholder={user.name} className="border rounded-md px-5 py-1 text-lg" />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <h1 className="text-lg font-semibold">Email</h1>
                            <input type="text" readOnly placeholder={user.email} className="border rounded-md px-5 py-1 text-lg" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col justify-center">
                    <Button className="bg-orange-700 w-70 rounded-lg hover:bg-orange-600 transition-all"
                        onClick={logout}
                    >
                        Logout
                    </Button>
                    <p className="mt-4 text-sm text-gray-500">Only you can see it.</p>
                </CardFooter>
            </Card>
        </div>
    );
}

