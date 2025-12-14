import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";


function RegisterPage() {
    const { login } = useAuth();

    const form = useForm({
        resolver: zodResolver(),
        defaultValues: {
            email: "",
            username: "",
            name: "",
            password: "",
            confirmPassword: "",
        },
    });
}