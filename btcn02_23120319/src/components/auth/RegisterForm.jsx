import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldError,
} from "@/components/ui/field";
import { Navigate } from "react-router-dom";


function RegisterForm({ form, onSubmit, showAlert }) {
    const navigate = Navigate();

    return (
        <div className="w-full min-h-screen flex justify-center items-center relative py-10">
            <div className="sm:w-md sm:min-w-sm p-6 rounded-lg shadow border border-[#5293D6]">
                <div className="heading mb-6 flex flex-col gap-2">
                    <h2 className="font-semibold text-xl">Sign up</h2>
                    <p className="text-gray-500">
                        Create an account to access all feaures
                    </p>
                </div>
                <form onSubmit={form.handleSubmit(onSubmit)}>

                    <Button
                        type="submit"
                        className="w-full mt-6 bg-[#5293D6] hover:bg-blue-500"
                    >
                        Register
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm
