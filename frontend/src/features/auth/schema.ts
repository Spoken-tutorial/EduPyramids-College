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


export const RegisterRequestSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long"),

    first_name: z
      .string()
      .min(1, "First name is required"),

    last_name: z
      .string()
      .min(1, "Last name is required"),

    email: z
      .string()
      .email("Enter a valid email address"),

    phone: z
      .string()
      .regex(/^[0-9+\-() ]{8,20}$/, "Enter a valid phone number"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirm_password: z
      .string()
      .min(6, "Please retype your password"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type RegisterRequestType = z.infer<typeof RegisterRequestSchema>;



export const RegisterResponseSchema = z.object({
  access: z.string(),
  user: z.object({
    id: z.number(),
    username: z.string(),
    email: z.string().email(),
    roles: z.array(z.string()).default([]),
  }),
});

export type RegisterResponseType = z.infer<typeof RegisterResponseSchema>;
