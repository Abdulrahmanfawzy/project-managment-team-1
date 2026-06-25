import React from 'react'
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
export default function ForgotPassword() {
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const onSubmit = (data) => {
      navigate("/verify-email",
        { state: {
            email: data.email
          },
        });
    };
  return (
    <div className=' rounded-xl '>
      <div className='text-center my-5'>
        <h1 className='font-bold text-black text-3xl pt-5'>Forgot Password</h1>
        <p className='font-thin text-xs py-3 text-gray px-10'>No worries! Enter your email and we'll send
you a code to reset vour nassword</p>
      </div>
      <div className='mt-10'>
        <form  onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-5">
            {/* Email */}
            <div className="h-15" >
                <input
                    type="email"
                    placeholder="Your Email"
                    {...register("email", {
                    required: "Email is required",
                    pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                    },
                    })}
                    className="w-full border rounded-md p-2"
                />
                {errors.email && (
                <p className="text-red-500 h-10 text-[11px] sm:text-sm md:text-md pt-1">
                    {errors.email.message}
                </p>
                )}
            </div>

      <button
        type="submit"
        className="w-full rounded-4xl bg-blue-600 text-white p-[6px] text-[11px] sm:text-sm md:text-md pt-1"
      >
        Send code
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
