import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import RegisterForm from "@/components/auth/RegisterForm";


function RegisterPage() {
    const { register } = useAuth();

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
