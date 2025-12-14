import { useAuth } from "@/contexts/AuthContext";

function User() {
    const { user } = useAuth();
    return (
        <div>

        </div>
    );
}

export default User;
