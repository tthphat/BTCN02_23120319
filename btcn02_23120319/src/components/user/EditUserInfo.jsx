import { Pencil } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

function EditUserInfo() {
    const { setUser, token } = useAuth();
    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        phone: "",
        dob: "",
        password: "",
    });

    const getUser = async () => {
        try {
            const response = await fetch(`${API_URL}/users/profile`, {
                method: "PATCH",
                headers: {
                    "x-app-token": APP_TOKEN,
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(userInfo),
            });

            if (!response.ok) {
                throw new Error("Failed to update user profile");
            }
            const data = await response.json();
            setUser(data);

            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);


    return (
        <div>
            <Pencil />
        </div>
    );
}

export default EditUserInfo;
