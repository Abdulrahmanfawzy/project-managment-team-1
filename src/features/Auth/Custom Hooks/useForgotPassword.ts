import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../API/auth.api";
import { AxiosError } from "axios";
import type { forgotPasswordFormData } from "../Scima/forgotPassword.schema";

export const useForgotPassword = () => {
  return useMutation<
    any,
    AxiosError<{ message?: string; errors?: Record<string, string[]> }>,
    forgotPasswordFormData
  >({
    mutationFn: forgotPassword,

    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
      console.log(JSON.stringify(error, null, 2));
    }
  });
};