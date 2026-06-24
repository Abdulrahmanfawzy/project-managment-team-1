import React from 'react'
import { useLocation } from 'react-router-dom';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../components/ui/input-otp"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
export default function VerifyEmail() {
  const location = useLocation();
  const email = location.state?.email;  
  const navigate = useNavigate();
  return (
    <div>
      <div className="">
        <div className="text-center ">
            <h1 className=" font-bold text-black text-3xl pt-5">Check Your Email</h1>
            <p className="font-thin text-xs py-3 text-gray">We have send a 6-digit code to : <br /> <span className="font-medium">{email}</span></p>
            <div className="px-5 mb-1 mt-1">
            </div>
        </div>
      </div>
      <div className=" flex justify-center ">  
        <InputOTP maxLength={6}  className='text-white'>
            <InputOTPGroup className='gap-2'>
            <InputOTPSlot className='w-10 h-10 bg-white border rounded-md' index={0} />
            <InputOTPSlot className='w-10 h-10 bg-white border rounded-md' index={1}  />
            <InputOTPSlot className='w-10 h-10 bg-white border rounded-md' index={2} />
            <InputOTPSlot className='w-10 h-10 bg-white border rounded-md' index={3} />
            <InputOTPSlot className='w-10 h-10 bg-white border rounded-md' index={4} />
            <InputOTPSlot className='w-10 h-10 bg-white border rounded-md' index={5} />
            </InputOTPGroup>
        </InputOTP>
      </div>
      <div className=" text-center my-5 ">
        <p className='text-[10px] sm:text-sm md:text-md font-medium'>Didn't receive a code? <span className=""><Link to="#" className="text-blue-600 hover:underline text-[10px] sm:text-sm md:text-md font-medium ">Resend Code</Link></span></p>
      </div>
      <div>
        <button
          type="submit"
          className=" w-[90%] mx-auto block rounded-4xl bg-blue-600 text-white p-[6px] text-[11px] sm:text-sm md:text-md pt-1 "
        >
          <Link to="/reset-password">
          Verify
          </Link>
        </button>
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
