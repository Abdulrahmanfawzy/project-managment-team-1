import {z} from "zod";
export const forgotPasswordSchema = z.object({
    email: z.string()
    .min(4, "validation.email_too_short")
    .email("validation.invalid_email")
});
export type forgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
