import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldError,
} from "@/components/ui/field";
import { Navigate } from "react-router-dom";


function RegisterForm({ form, onSubmit }) {
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
                    <FieldGroup>
                        <Controller
                            name="username"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Username</FieldLabel>
                                    <Input {...field} placeholder="username" />
                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Email</FieldLabel>
                                    <Input {...field} placeholder="example@gmail.com" />
                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="phone"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Phone</FieldLabel>
                                    <Input {...field} placeholder="phone" />
                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="dob"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Date of Birth</FieldLabel>
                                    <Input {...field} type="date" placeholder="dob" />
                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Password</FieldLabel>
                                    <Input {...field} type="password" placeholder="password" />
                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="confirmPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Confirm Password</FieldLabel>
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder="confirm password"
                                    />
                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                    </FieldGroup>

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
