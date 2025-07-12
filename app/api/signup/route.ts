import { UserSignup, userSignupSchema } from "@/zodSchemas/signUpSchema";
import { withValidation } from "@/lib/validator/validateInput";
import { handleSignup } from "@/controllers/authController";
export const POST = withValidation<UserSignup>(userSignupSchema, handleSignup);
