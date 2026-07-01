import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import OTPTime from "./OTPTime";
import { useVerifyOtp } from "../Custom Hooks/UseVerifyEmail";

export default function VerifyEmail() {
  const location = useLocation();
  console.log(location.state);
  const email = location.state?.email;
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const { mutate, isPending } = useVerifyOtp();

  const handleVerify = () => {
    if (otp.length !== 6) return;
    console.log(email);
    mutate(
      {
        otp,
        email,
        purpose: "forgot-password",
      },
      {
        onSuccess: () => {
          navigate("/reset-password", {
            state: { email, otp },
          });
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };
console.log(otp);
  return (
    <div>
      <div className="text-center">
        <h1 className="font-bold text-black text-3xl pt-5">
          Check Your Email
        </h1>

        <p className="font-thin text-xs py-3 text-gray">
          We have sent a 6-digit code to:
          <br />
          <span className="font-medium">{email}</span>
        </p>
      </div>

      <div className="flex justify-center">
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={(value) => setOtp(value)}
        >
          <InputOTPGroup className="gap-2">
            <InputOTPSlot
              index={0}
              className="w-10 h-10 bg-white border rounded-md"
            />
            <InputOTPSlot
              index={1}
              className="w-10 h-10 bg-white border rounded-md"
            />
            <InputOTPSlot
              index={2}
              className="w-10 h-10 bg-white border rounded-md"
            />
            <InputOTPSlot
              index={3}
              className="w-10 h-10 bg-white border rounded-md"
            />
            <InputOTPSlot
              index={4}
              className="w-10 h-10 bg-white border rounded-md"
            />
            <InputOTPSlot
              index={5}
              className="w-10 h-10 bg-white border rounded-md"
            />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div className="text-center my-5">
        <p className="text-[10px] sm:text-sm md:text-md font-medium">
          Didn't receive a code?
        </p>

        <OTPTime email={email} />
      </div>

      <button
        type="button"
        onClick={handleVerify}
        disabled={otp.length !== 6 || isPending}
        className="w-[90%] mx-auto block rounded-4xl bg-blue-600 text-white p-[6px] text-[11px] sm:text-sm md:text-md disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isPending ? "Verifying..." : "Verify"}
      </button>

      <div className="items-center text-center">
        <p className="font-light text-[11px] py-2 text-gray">
          Remember Your Password?
          <Link
            to="/signin"
            className="text-blue-600 hover:underline text-[14px] font-medium ml-1"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}