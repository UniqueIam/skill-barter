import { prisma } from "@/db/prisma";
import { sendOTPEmail } from "@/lib/email/mailer";
import { generateOTP } from "@/lib/email/otp";
import { UserSignup } from "@/zodSchemas/signUpSchema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const handleSignup = async (req: NextRequest, data: UserSignup) => {
  try {
    const { username, email, password } = data;

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    const existingEmailUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      if (existingUser.verified) {
        return NextResponse.json(
          { error: "User already exists." },
          { status: 409 }
        );
      }

      if (existingUser.otpExpiry && existingUser.otpExpiry > new Date()) {
        return NextResponse.json(
          { error: "Please verify the OTP sent to your email." },
          { status: 409 }
        );
      } else {
        await prisma.user.delete({ where: { username } });
        return NextResponse.json(
          { message: "OTP expired. Please sign up again." },
          { status: 409 }
        );
      }
    }

    if (existingEmailUser && existingEmailUser.verified) {
      return NextResponse.json(
        { error: "Email is already registered." },
        { status: 409 }
      );
    }

    if (existingEmailUser && !existingEmailUser.verified) {
      await prisma.user.delete({ where: { email } });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: "USER",
        otp,
        otpExpiry,
      },
    });

    try {
      await sendOTPEmail(email, otp);
    } catch (emailError) {
      console.error("Error sending OTP email:", emailError);
      await prisma.user.delete({ where: { id: user.id } });

      return NextResponse.json(
        { error: "Failed to send OTP email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "OTP sent successfully", userId: user.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
