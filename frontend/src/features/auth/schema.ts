import { z } from "zod";

// schema for login form request
export const LoginRequestSchema = z.object({
    username: z.string(),
    password: z.string()
});

export type LoginRequestType = z.infer<typeof LoginRequestSchema>;


// schema for login form response
export const LoginResponseSchema = z.object({
    access: z.string(),
    user: z.object({
        id: z.number(),
        username: z.string(),
        email: z.email(),
        roles: z.array(z.string()).default([]),
    })
})

export type LoginResponseType = z.infer<typeof LoginResponseSchema>;