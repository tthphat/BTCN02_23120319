import { Pencil, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";


const API_URL = import.meta.env.VITE_API_URL;
const APP_TOKEN = import.meta.env.VITE_APP_TOKEN;

function EditUserInfo({ initialData, getUser }) {
    const { setUser, token } = useAuth();
    const [open, setOpen] = useState(false); // Trạng thái đóng/mở
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const [error, setError] = useState(null); // Trạng thái error

    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        dob: "",
    });

    // Cập nhật khi có dữ liệu ban đầu thay đổi hoặc khi mở dialog
    useEffect(() => {
        if (initialData) {
            setFormData({
                email: initialData.email || "",
                phone: initialData.phone || "",
                dob: initialData.dob || "",
            });
        }
    }, [initialData, open]);

    // Xử lý thay đổi input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/users/profile`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "x-app-token": APP_TOKEN,
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || "Failed to update profile");
            }

            const updatedUser = await response.json();

            // Cập nhật lại authContext và localStorage
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));

            // Đóng dialog
            setOpen(false);

            // fetch lại thông tin user vừa được cập nhật
            getUser();

        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Pencil />
        </div>
    );
}

export default EditUserInfo;
