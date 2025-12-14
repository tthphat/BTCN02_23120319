import { useNavigate } from "react-router-dom";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function LoginForm({ form, onSubmit }) {
    const navigate = useNavigate();

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="sm:w-md sm:min-w-sm flex flex-col gap-8 p-6 border border-[#5293D6] rounded-lg shadow">
                <div className="heading flex justify-between items-center text-xl font-semibold mb-6">
                    <h2>Login</h2>
                    <h2
                        className="text-[#5293D6] hover:text-blue-500 cursor-pointer"
                        onClick={() => navigate("/register")}
                    >
                        Sign up
                    </h2>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            name="username"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Input username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Input your password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full bg-[#5293D6] hover:bg-blue-500"
                        >
                            Login
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default LoginForm;