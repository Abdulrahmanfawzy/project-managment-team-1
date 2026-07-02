import { useMutation } from "@tanstack/react-query";
import { verifyOtp } from "../API/auth.api";

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: verifyOtp,
  });
};