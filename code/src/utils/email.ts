import nodemailer from "nodemailer";

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  BACKEND_URL,
  FRONTEND_URL
} = process.env;

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !BACKEND_URL) {
  throw new Error("Missing required environment variables for email transport");
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: SMTP_SECURE === "true", 
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export const sendVerificationEmail = async (
  email: string,
  token: string
): Promise<void> => {
  const verificationLink = `${BACKEND_URL}/api/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: `"V Code" <${SMTP_USER}>`,
    to: email,
    subject: "Verify Your Email",
    html: `
      <h2>Welcome to V Code!</h2>
      <p>Click the link below to verify your email:</p>
      <a href="${verificationLink}" target="_blank">Verify Email</a>
      <p>This link will expire in 24 hours.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Verification email sent to ${email}`);
  } catch (err) {
    console.error(`❌ Error sending verification email to ${email}:`, err);
    throw new Error("Email sending failed");
  }
};

export const sendResetPasswordEmail = async (
  email: string,
  token: string
): Promise<void> => {
  const resetUrl = `${FRONTEND_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: `"V Code" <${SMTP_USER}>`,
    to: email,
    subject: "Password Reset Request",
    html: `
  <div style="font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 30px; border: 1px solid #e0e0e0; border-radius: 12px; background: #ffffff;">
    <h2 style="color: #111827; font-size: 24px; margin-bottom: 20px;">🔐 Reset Your Password</h2>
    <p style="color: #4B5563; font-size: 16px; line-height: 1.6;">
      Hey there,<br><br>
      We received a request to reset your password for your <strong>V Code</strong> account. No worries — it happens.
    </p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${resetUrl}" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #3B82F6; color: #ffffff; text-decoration: none; font-size: 16px; border-radius: 8px; font-weight: 600;">
        Reset Password
      </a>
    </div>
    <p style="color: #4B5563; font-size: 14px; line-height: 1.6;">
      This link will expire in <strong>1 hour</strong> for security reasons.<br>
      If you didn’t request this, you can safely ignore this email. No changes will be made.
    </p>
    <hr style="margin: 40px 0; border: none; border-top: 1px solid #E5E7EB;" />
    <p style="color: #9CA3AF; font-size: 12px; text-align: center;">
      &copy; ${new Date().getFullYear()} V Code. All rights reserved.
    </p>
  </div>
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Password reset email sent to ${email}`);
  } catch (err) {
    console.error(`❌ Error sending reset email to ${email}:`, err);
    throw new Error("Failed to send password reset email");
  }
};
