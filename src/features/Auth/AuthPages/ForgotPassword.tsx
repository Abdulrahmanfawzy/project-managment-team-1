import React from 'react'
import { useForm } from "react-hook-form";
import {useLocation, useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
import {forgotPasswordSchema} from "../Scima/forgotPassword.schema";
import type {forgotPasswordFormData} from "../Scima/forgotPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgotPassword } from '../Custom Hooks/useForgotPassword';
export default function ForgotPassword() {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    React.useEffect(() => {
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }, []);

    const {
      register,
      handleSubmit,
      setError,
      formState: { errors },
    } = useForm<forgotPasswordFormData>({
      resolver: zodResolver(forgotPasswordSchema),
    });
    const {mutate, isPending}= useForgotPassword();
    const onSubmit = (data:forgotPasswordFormData) => {
      mutate(data, {
        onSuccess: (responseData) => {
          const apiMessage = responseData?.message || "A code has been sent to your email to reset your password.";
          setSuccessMessage(apiMessage);
          
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
          
          timerRef.current = setTimeout(() => {
            navigate("/verify-email", {
              state: {
                email: data.email
              },
            });
          }, 3000);
        },
        onError: (error) => {
          const apiMessage =
            error.response?.data?.errors?.email?.[0] ||
            error.response?.data?.message ||
            "Something went wrong";
          setError("email", {
            type: "server",
            message: apiMessage
          });
        }
      });
    };
  return (
    <div className=' rounded-xl '>
      <div className='text-center my-5'>
        <h1 className='font-bold text-black text-3xl pt-5'>Forgot Password</h1>
        <p className='font-thin text-xs py-3 text-gray px-10'>No worries! Enter your email and we'll send
you a code to reset vour nassword</p>
      </div>

      {successMessage && (
        <div className="mx-5 my-2 p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg text-xs md:text-sm flex items-start gap-2.5 shadow-sm">
          <svg
            className="w-5 h-5 text-green-600 shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-left">
            <p className="font-semibold text-green-900">Success</p>
            <p className="font-medium text-green-700 text-[11px] sm:text-xs">{successMessage}</p>
          </div>
        </div>
      )}

      <div className='mt-10'>
        <form  onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-5">
            {/* Email */}
            <div className="h-15" >
                <input
                    type="email"
                    placeholder="Your Email"
                    {...register("email")}
                    className="w-full border rounded-md p-2"
                    disabled={isPending || !!successMessage}
                />
                {errors.email && (
                <p className="text-red-500 h-10 text-[11px] sm:text-sm md:text-md pt-1">
                  {errors.email.message}
                </p>
                )}
            </div>

      <button
        type="submit"
        disabled={isPending || !!successMessage}
        className="w-full rounded-4xl bg-blue-600 disabled:opacity-50 text-white p-[6px] text-[11px] sm:text-sm md:text-md pt-1 cursor-pointer disabled:cursor-not-allowed"
      >
        {isPending ? "Sending..." : "Send code"}
      </button>
    </form>
    <div className=" items-center text-center ">
        <p className="font-light text-[11px] py-2 text-gray ">Remeber Your Password?<Link
      to="/signin"
      className="text-blue-600 hover:underline text[14px] font-medium"
    >
      Sign In
    </Link> </p>
    </div>
      </div>
    </div>
  )
}
