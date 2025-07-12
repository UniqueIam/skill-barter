import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { verifyOtpSchema } from "@/zodSchemas/verifyOtpSchema";

export const handlerOTPVerification = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = verifyOtpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { email, otp } = parsed.data;

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    if (user.verified) {
      return NextResponse.json({ message: "User is already verified." }, { status: 200 });
    }

    if (!user.otp || !user.otpExpiry || user.otp !== otp) {
      return NextResponse.json({ error: "Invalid or expired OTP." }, { status: 400 });
    }

    if (user.otpExpiry < new Date()) {
      return NextResponse.json({ error: "OTP has expired." }, { status: 410 });
    }

    // Mark user as verified and clear OTP
    await prisma.user.update({
      where: { email },
      data: {
        verified: true,
        otp: null,
        otpExpiry: null,
      },
    });

    return NextResponse.json({ message: "Account successfully verified." }, { status: 200 });

  } catch (error) {
    console.error("[VERIFY_OTP_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
