import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import RegisterForm from "@/components/auth/RegisterForm";


function RegisterPage() {
    const { login } = useAuth();

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

    const onSubmit = (data) => {
        try {
            console.log("Register with:", data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <RegisterForm form={form} onSubmit={onSubmit} />
    );
}

export default RegisterPage;
