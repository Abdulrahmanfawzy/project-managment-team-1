import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
export default function ResetPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    navigate("/home");
  }; return (
    <div>
      <div>
        <div className="text-center pt-5 pb-10 ">
                    <h1 className=" font-bold text-black text-3xl pt-2">Reset Password</h1>
                    <p className="font-thin text-xs py-3 text-gray">Enter your new Password below.</p>
        </div>
        <div>
          <form  onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-5">
            <div className="h-15">
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className="w-full border rounded-md p-2"
              />
              {errors.password && (
                <p className="text-red-500 items-center text-[10px] sm:text-sm md:text-md ">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="h-15">
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  minLength: {
                    value: 8,
                    message: "Confirm Password must be at least 8 characters",
                  },
                })}
                className="w-full border rounded-md p-2"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 items-center text-[10px] sm:text-sm md:text-md ">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full rounded-4xl bg-blue-600 text-white p-[6px] text-[11px] sm:text-sm md:text-md"
            >
              Reset Password
            </Button>
          </form>
          <div className="items-center text-center">
            <p className="font-light text-[11px] py-2 text-gray ">Return to Sign In? <Link to="/signin" className="text-blue-600 hover:underline text-[14px] font-medium">Sign In</Link> </p>
          </div>
        </div>
      </div>
    </div>
  )
}
