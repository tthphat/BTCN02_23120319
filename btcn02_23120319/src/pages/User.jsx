import { useAuth } from "@/contexts/AuthContext";
import Profile from "@/components/user/Profile";

function User() {
    const { user } = useAuth();
    return (
        <div>
            <Profile />
        </div>
    );
}

export default User;
