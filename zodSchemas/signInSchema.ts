import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email format").endsWith("@nist.edu", {
    message: "Email must end with @nist.edu",
  }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignInInput = z.infer<typeof signInSchema>;
