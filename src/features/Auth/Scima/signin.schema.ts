import { z } from "zod"
export const signInSchema = z.object({
    email: z.string()
    .min(4, "validation.email_too_short")
    .email("validation.invalid_email"),
    password: z.string()
    .min(8, "validation.password_too_short")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "validation.password_invalid_format"),
    rememberMe: z.boolean().default(false).optional()
})
export type signInFormData = z.infer<typeof signInSchema>;
 