import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const APP_TOKEN = import.meta.env.VITE_APP_TOKEN;

export default function Profile() {
    const { token, logout } = useAuth();
    const [userInfo, setUserInfo] = useState(null);

    const getUser = async () => {
        try {
            const response = await fetch(`${API_URL}/users/profile`, {
                headers: {
                    "x-app-token": APP_TOKEN,
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch user profile");
            }
            const data = await response.json();
            setUserInfo(data);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            {userInfo ? (
                <div className="flex justify-center items-center py-10">
                    <Card className="w-md lg:w-xl ">
                        <CardHeader>
                            <CardTitle className="text-2xl text-center">Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-3">
                                <div className="w-full flex flex-col gap-2">
                                    <h1 className="text-lg font-semibold">Username</h1>
                                    <input type="text" readOnly placeholder={userInfo.username} className="border rounded-md px-5 py-1 text-lg" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <h1 className="text-lg font-semibold">Role</h1>
                                    <input type="text" readOnly placeholder={userInfo.role} className="border rounded-md px-5 py-1 text-lg" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <h1 className="text-lg font-semibold">Email</h1>
                                    <input type="text" readOnly placeholder={userInfo.email} className="border rounded-md px-5 py-1 text-lg" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <h1 className="text-lg font-semibold">Phone</h1>
                                    <input type="text" readOnly placeholder={userInfo.phone} className="border rounded-md px-5 py-1 text-lg" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <h1 className="text-lg font-semibold">Date of Birth</h1>
                                    <input type="text" readOnly placeholder={new Date(userInfo.dob).toLocaleDateString("vi-VN")} className="border rounded-md px-5 py-1 text-lg" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col justify-center">
                            <Button className="text-foreground bg-orange-700 w-70 rounded-lg hover:bg-orange-600 transition-all"
                                onClick={logout}
                            >
                                Logout
                            </Button>
                            <p className="mt-4 text-sm text-gray-500">Only you can see it.</p>
                        </CardFooter>
                    </Card>
                </div>
            ) : (
                <div className="flex justify-center items-center py-10">
                    <p className="text-2xl font-bold">Please login to view your profile</p>
                </div>
            )}
        </>
    );
}

