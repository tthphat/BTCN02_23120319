import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "@/lib/auth.schema";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";

function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(authSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = (data) => {
        try {
            console.log("Login with:", data);
            login(data);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return <LoginForm form={form} onSubmit={onSubmit} />;
}

export default LoginPage;


