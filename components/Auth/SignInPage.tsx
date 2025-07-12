"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInInput, signInSchema } from "@/zodSchemas/signInSchema";
import { signIn, getSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const roleRouteMap: Record<string, string> = {
  USER: "/user/dashboard",
  ADMIN: "/admin/dashboard",
};

export default function SignInPage() {
  const router = useRouter();
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SignInInput) => {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!res?.ok) {
        throw new Error(res?.error ?? "Invalid email or password");
      }

      const session = await getSession();
      const role = session?.user?.role || "UNKNOWN";

      router.push(roleRouteMap[role] || "/unauthorized");
    },
    onError: (err: any) => {
      setFormError(err.message);
    },
  });

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-primary px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-primary to-black opacity-80 backdrop-blur-sm z-0" />
      <div className="relative z-10 w-full max-w-md bg-gray-900/80 p-8 rounded-2xl shadow-2xl backdrop-blur-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-heading-col font-saira">
            Welcome Back
          </h2>
          <p className="text-body-col font-roboto">Sign in to continue</p>
        </div>

        {formError && (
          <p className="text-sm text-red-500 text-center mt-4">{formError}</p>
        )}

        <form
          onSubmit={handleSubmit((data) => mutate(data))}
          className="space-y-6 mt-6"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-body-col font-roboto"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-primary"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm text-body-col font-roboto"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-primary"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 bg-orange-primary text-white rounded-full font-semibold hover:bg-opacity-90 transition duration-300"
          >
            {isPending ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-body-col text-center mt-6 font-roboto">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="text-orange-primary underline">
            Sign Up
          </Link>
        </p>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-orange-primary underline font-roboto"
          >
            ← Go back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
