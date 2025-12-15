import { Pencil, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    {error && <div className="text-red-500 text-sm">{error}</div>}

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="col-span-3"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">
                            Phone
                        </Label>
                        <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="dob" className="text-right">
                            Date of Birth
                        </Label>
                        <Input
                            id="dob"
                            name="dob"
                            type="date"
                            value={formData.dob}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default EditUserInfo;
