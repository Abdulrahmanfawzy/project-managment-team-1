import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "@/features/Auth/Api/auth.api";
import { toast } from "sonner";

function SignIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await login(data);
      const payload = res.data;
      if (payload?.success || res.status === 200) {
        const token = payload?.data?.token || payload?.token;
        if (token) {
          localStorage.setItem("token", token);
        }
        toast.success("Login Successful");
        navigate("/dashboard");
      } else {
        toast.error(payload?.message || "Login Failed");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Login Failed";
      toast.error(errorMessage);
    }
  };

  return (
    <div className=" pt-4">
      <div className="text-center ">
        <h1 className=" font-bold text-black text-3xl pt-2">Sign In</h1>
        <p className="font-thin text-xs py-3 text-gray">Welcome back, you’ve been missed!</p>
        <div className="px-5 mb-1 mt-1">
          <Button variant="outline" className="w-full flex items-center gap-2 border border-black/20 p-5">
            <FcGoogle size={20} />
            Sign with Google
          </Button>
        </div>
        <div className="Divider">
          <div className="flex items-center my-2  ">
            <div className="flex-1 h-px bg-gray-300 ml-5" />
            <span className="px-3 text-gray-500 text-xs">OR</span>
            <div className="flex-1 h-px bg-gray-300 mr-5" />
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-5">
        {/* Email */}
        <div className="h-12" >
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
            <p className="text-red-500 h-10 text-[10px] sm:text-sm md:text-md">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="h-12">
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

        {/* Remember Me */}
        <div className="flex items-center justify-between m-1">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("rememberMe")}
            />
            <label className="text-[12px] sm:text-sm">
              Remember Me
            </label>
          </div>

          <Link
            to="/forgot-password"
            className="text-[11px] sm:text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          spinner={formState.isSubmitting}
          disabled={formState.isSubmitting}
          className="w-full rounded-4xl bg-blue-600 text-white p-[6px] text-[11px] sm:text-sm md:text-md"
        >
          Sign In
        </Button>
      </form>
      <div className=" items-center text-center ">
        <p className="font-light text-[11px] py-2 text-gray ">Don’t have an account yet?    <Link
          to="/signup"
          className="text-blue-600 hover:underline text[14px] font-medium"
        >
          Sign Up
        </Link> </p>
      </div>
    </div>
  );
}

export default SignIn;