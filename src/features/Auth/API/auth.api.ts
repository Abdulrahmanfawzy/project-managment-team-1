import api from "@/lib/axios";
import type { signInFormData } from "../Scima/signin.schema";
import type {signupFormData} from "../Scima/signup.schema";
import type { forgotPasswordFormData } from "../Scima/forgotPassword.schema";
//API Call for Log In
export const login = async (data: signInFormData) => {
    const response = await api.post("/login", data);
    return response.data;
}

//API Call for Sign UP
export const signup = async (data: Omit<signupFormData, "rememberMe">) => {
    const response = await api.post("/register", data);
    return response.data;
}
//API Call For Forgot Password
export const forgotPassword = async (data: forgotPasswordFormData) =>{
    const response = await api.post("/forgot-password",data);
    return response.data;
}
// Verify OTP
type VerifyOtpData = {
  otp: string;
  email: string;
  purpose: string;
};

export const verifyOtp = async ({
  otp,
  email,
  purpose,
}: VerifyOtpData) => {
  const response = await api.post(
    "/verify-otp",
    {
      email,
      purpose,
    },
    {
      params: {
        otp,
      },
    }
  );

  return response.data;
};

// Resend OTP
export const resendOtp = async (email: string) => {
  const response = await api.post("/resend-otp", {
    email,
  });

  return response.data;
};
