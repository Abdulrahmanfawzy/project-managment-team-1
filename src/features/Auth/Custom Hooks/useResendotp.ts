import { useMutation } from "@tanstack/react-query";
import { resendOtp } from "../API/auth.api";

export const useResendOtp = () => {
  return useMutation({
    mutationFn: resendOtp,
  });
};