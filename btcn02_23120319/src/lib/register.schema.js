import { z } from "zod";

export const registerSchema = z.object({
    username: z
        .string()
        .min(3, "username must have at least 3 char"),

    email: z
        .string()
        .email("Email is not valid"),

    password: z
        .string()
        .min(6, "Password must have at least 6 char"),

    confirmPassword: z.string(),

    phone: z
        .string()
        .min(10, "Phone number must have at least 10 char")
        .max(11, "Phone number must have at most 11 char")
        .regex(/^[0-9]+$/, "Phone number must be a number"),

    dob: z
        .string()
        .regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, "Date of birth must be in the format YYYY-MM-DD"),

})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
