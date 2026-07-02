import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/features/Auth/Scima/signup.schema";
import type { signupFormData } from "@/features/Auth/Scima/signup.schema";
import { useSignUp } from "../Custom Hooks/useSignUp";

function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const { mutate, isPending } = useSignUp();

  const onSubmit = (data: signupFormData) => {
    console.log("Submitted", data);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { rememberMe, ...apiPayload } = data;

    mutate(apiPayload, {
      onSuccess: (response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      },
    });
  };

  return (
    <div>
      <div className="text-center">
        <h1 className="font-bold text-black text-3xl pt-5">Sign Up</h1>
        <p className="font-thin text-xs py-3 text-gray">
          Welcome back, you’ve been missed!
        </p>

        <div className="px-5 mb-1 mt-1">
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 border border-black/20 p-5"
          >
            <FcGoogle size={20} />
            Sign with Google
          </Button>
        </div>

        <div className="flex items-center my-2">
          <div className="flex-1 h-px bg-gray-300 ml-5" />
          <span className="px-3 text-gray-500 text-xs">OR</span>
          <div className="flex-1 h-px bg-gray-300 mr-5" />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-5">
        {/* Full Name */}
        <div>
          <input
            type="text"
            placeholder="Full Name"
            {...register("name")}
            className="w-full border rounded-md p-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Your Email"
            {...register("email")}
            className="w-full border rounded-md p-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full border rounded-md p-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password (🔴 مهم جداً) */}
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("password_confirmation")}
            className="w-full border rounded-md p-2"
          />
          {errors.password_confirmation && (
            <p className="text-red-500 text-sm">
              {errors.password_confirmation.message}
            </p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("rememberMe")} />
          <label className="text-sm">Remember Me</label>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-4xl bg-blue-600 text-white p-2"
        >
          {isPending ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <div className="text-center mt-3">
        <p className="text-sm text-gray">
          Do you have an account?{" "}
          <Link to="/signin" className="text-blue-600">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;