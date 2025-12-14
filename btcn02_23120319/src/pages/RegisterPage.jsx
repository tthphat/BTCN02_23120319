import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import RegisterForm from "@/components/auth/RegisterForm";
import { useNavigate } from "react-router-dom";


function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();

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
            navigate("/");
        } catch (error) {
            console.log(error);
            form.setError("username", {
                message: error || "Register failed",
            });
        }
    };

    return (
        <RegisterForm form={form} onSubmit={onSubmit} />
    );
}

export default RegisterPage;
