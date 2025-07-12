
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (email: string, otp: string) => {
  await transporter.sendMail({
    from: `"NIST Complaints" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP for NIST Complaint Portal",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 24px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 32px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <h2 style="color: #333333; text-align: center;">🔐 Email Verification</h2>
          <p style="font-size: 16px; color: #555555;">
            Hello,
          </p>
          <p style="font-size: 16px; color: #555555;">
            Your One-Time Password (OTP) for verifying your email on the <strong>NIST Complaint Portal</strong> is:
          </p>
          <p style="font-size: 32px; font-weight: bold; text-align: center; letter-spacing: 4px; color: #e74c3c; margin: 24px 0;">
            ${otp}
          </p>
          <p style="font-size: 16px; color: #555555;">
            This OTP will expire in <strong>5 minutes</strong>. Please enter it promptly to complete your verification.
          </p>
          <hr style="margin: 32px 0; border: none; border-top: 1px solid #ddd;" />
          <p style="font-size: 14px; color: #999999; text-align: center;">
            If you did not request this, you can safely ignore this email.
          </p>
        </div>
      </div>
    `,
  });
};