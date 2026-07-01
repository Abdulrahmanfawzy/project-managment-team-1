import {z} from "zod";
export const signupSchema = z.object({
    name:z.string()
    .min(3, "validation.name_too_short")
    .max(30, "validation.name_too_long")
    .trim()
    .regex(/^[A-Za-z\s]+$/, "validation.name_invalid"),
    email:z.string()
    .min(4, "validation.email_too_short")
    .max(100, "validation.email_too_long")
    .email("validation.invalid_email")
    .trim(),
    password:z.string()
    .min(8, "validation.password_too_short")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "validation.password_invalid_format"),
    password_confirmation:z.string()
    .min(8, "validation.password_too_short")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "validation.password_invalid_format")
    .trim(),
    rememberMe:z.boolean().optional(),
})
export type signupFormData = z.infer<typeof signupSchema>;