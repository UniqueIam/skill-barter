"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSignupSchema, UserSignup } from "@/zodSchemas/signUpSchema";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { API_ROUTES } from "@/lib/routes";

type SignupResponse = {
  message: string;
  userId: string;
};

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignup>({
    resolver: zodResolver(userSignupSchema),
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: UserSignup) =>
      axios.post<SignupResponse>(API_ROUTES.AUTH.SIGNUP, {
        ...data,
        role: "USER",
      }),
    onSuccess: (res) => {
      const userId = res.data.userId;
      router.push(`/auth/verify-otp?userId=${userId}`);
    },
  });

  const onSubmit = (data: UserSignup) => {
    mutate(data);
  };

  useEffect(() => {
    setShowPassword(false);
  }, []);

  if (showPassword === null) {
    return null;
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-primary">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-primary to-gray-900 backdrop-blur-xl opacity-80 z-0" />

      <div className="relative z-10 w-full max-w-md space-y-8 bg-gray-900/80 backdrop-blur-lg p-8 rounded-lg shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-heading-col font-saira">
            Create Your Account
          </h2>
          <p className="text-body-col font-roboto">
            Sign up to start skill swapping
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm text-body-col font-roboto">
              Username
            </label>
            <input
              type="text"
              {...register("username")}
              className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              placeholder="johndoe"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-body-col font-roboto">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-body-col font-roboto">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              placeholder="••••••••"
            />
            <div
              onClick={() => setShowPassword((prev) => !prev)}
              className="flex items-center gap-1 mt-1 w-fit cursor-pointer text-sm text-body-col"
            >
              {showPassword ? (
                <>
                  <span>Hide</span>
                  <FaEyeSlash />
                </>
              ) : (
                <>
                  <span>Show</span>
                  <FaEye />
                </>
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-body-col font-roboto">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              placeholder="Re-enter password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm font-roboto">
              {(error as any)?.response?.data?.error || "Something went wrong"}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 bg-orange-primary cursor-pointer text-white rounded-full text-lg font-bold hover:bg-opacity-90 transition-all duration-300"
          >
            {isPending ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-body-col text-center font-roboto">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-orange-primary underline">
            Sign In
          </Link>
        </p>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-orange-primary underline font-roboto"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
