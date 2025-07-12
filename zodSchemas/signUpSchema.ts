import { z } from "zod";

const userSignupSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long." })
      .max(20, { message: "Username cannot be longer than 20 characters." }),

    email: z.string().email({ message: "Please enter a valid email address." }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." }),

    confirmPassword: z.string().min(6, {
      message: "Password confirmation must be at least 6 characters long.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

type UserSignup = z.infer<typeof userSignupSchema>;
