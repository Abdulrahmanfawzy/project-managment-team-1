import { z } from "zod";

export const verifyOtpSchema = z.object({
  otp: z
    .string()
    .length(6, "validation.otp_length")
    .regex(/^\d+$/, "validation.otp_digits_only"),
});

export type verifyOtpFormData = z.infer<typeof verifyOtpSchema>;
