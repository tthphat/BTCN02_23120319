import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import RegisterForm from "@/components/auth/RegisterForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";


function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);

    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            dob: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            const { confirmPassword, ...registerData } = data;
            console.log("Register with:", registerData);
            await register(registerData);

            // Hiển thị alert thành công
            setShowSuccess(true);

            // Chuyển trang sau 2 giây
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            console.log(error);
            form.setError("username", {
                message: error || "Register failed",
            });
        }
    };

    return (
        <div className="relative">
            {showSuccess && (
                <Alert className="border-green-500 bg-green-50 text-green-700 absolute right-2 top-5 w-80 sm:w-100">
                    <CheckCircle2Icon className="h-5 w-5 text-green-600" />
                    <AlertTitle>Registration successful</AlertTitle>
                    <AlertDescription>
                        Your account has been created. Welcome to MyShop!
                    </AlertDescription>
                </Alert>
            )}
            <RegisterForm form={form} onSubmit={onSubmit} />
        </div>
    );
}

export default RegisterPage;
