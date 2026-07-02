import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useResendOtp } from "../Custom Hooks/useResendotp";

const OTP_EXPIRE_TIME = 30; // ثانية
const RESEND_AFTER = 15; // ثانية

interface OTPTimeProps {
  email: string;
}

export default function OTPTime({ email }: OTPTimeProps) {
  const [timeLeft, setTimeLeft] = useState(OTP_EXPIRE_TIME);
  const { mutate: resendOtp, isPending } = useResendOtp();

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const canResend = timeLeft <= OTP_EXPIRE_TIME - RESEND_AFTER;

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const handleResend = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!canResend || isPending) return;

    resendOtp(email, {
      onSuccess: () => {
        // إعادة تشغيل التايمر
        setTimeLeft(OTP_EXPIRE_TIME);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <div>
      <p>Resend Code in {formatTime(timeLeft)}</p>
      <Link
        to=""
        onClick={handleResend}
        className={`text-blue-600 hover:underline text-[10px] sm:text-sm md:text-md font-medium ${
          !canResend || isPending ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
        }`}
      >
        {isPending ? "Sending..." : "Resend Code"}
      </Link>
    </div>
  );
}