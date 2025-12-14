import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import registerSchema from "@/lib/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";


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
}