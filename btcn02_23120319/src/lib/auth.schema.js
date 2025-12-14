import { z } from "zod";

export const authSchema = z.object({
    username: z.string().min(1, "username is not valid"),
    password: z.string().min(1, "password is not valid"),
});
