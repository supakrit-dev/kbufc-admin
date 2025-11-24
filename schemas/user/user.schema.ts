import { z } from "zod";

export const userSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
    role: z.string(),
    status: z.string()
})

export type UserSchema = z.infer<typeof userSchema>;