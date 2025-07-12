"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema, OtpInput } from "@/zodSchemas/OtpSchema";
import { useMutation } from "@tanstack/react-query";
import { API_ROUTES } from "@/lib/routes";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyOtp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") ?? "";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpInput>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      userId,
    },
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: OtpInput) =>
      axios.post(API_ROUTES.AUTH.VERIFY_OTP, data),
    onSuccess: () => router.push("/auth/signin"),
  });

  const onSubmit = (data: OtpInput) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-sm bg-gray-800 p-6 rounded-md shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center">Verify Your Email</h2>

        <input type="hidden" {...register("userId")} />

        <div>
          <label htmlFor="otp" className="block text-sm">
            Enter OTP
          </label>
          <input
            id="otp"
            type="text"
            maxLength={6}
            {...register("otp")}
            className="w-full mt-1 p-2 rounded bg-gray-700 border border-gray-600"
            placeholder="6-digit OTP"
          />
          {errors.otp && (
            <p className="text-red-500 text-sm">{errors.otp.message}</p>
          )}
        </div>

        {error && (
          <p className="text-red-500 text-sm">
            {(error as any)?.response?.data?.error || "Verification failed"}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-orange-primary py-2 rounded hover:bg-opacity-90 cursor-pointer"
        >
          {isPending ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}
