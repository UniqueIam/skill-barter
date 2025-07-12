import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email({
    message: "invalid email address",
  }),
  password: z.string(),
});

export type SignInInput = z.infer<typeof signInSchema>;
