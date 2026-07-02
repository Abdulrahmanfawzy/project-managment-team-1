import { useLogin } from "../Custom Hooks/useLogin";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/features/Auth/Scima/signin.schema";
import type { signInFormData } from "@/features/Auth/Scima/signin.schema";
import { useTranslation } from "react-i18next";

function SignIn() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInFormData>({
    resolver: zodResolver(signInSchema),
  });
  const { mutate, isPending } = useLogin();
  const onSubmit = (data: signInFormData) => {
    mutate(data, {
      onSuccess: (response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      },

      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <div className=" pt-4">
      <div className="text-center ">
        <h1 className=" font-bold text-black text-3xl pt-2">{t("signin.title")}</h1>
        <p className="font-thin text-xs py-3 text-gray">{t("signin.welcome_message")}</p>
        <div className="px-5 mb-1 mt-1">
          <Button variant="outline" className="w-full flex items-center gap-2 border border-black/20 p-5">
            <FcGoogle size={20} />
            {t("signin.google_sign_in")}
          </Button>
        </div>
        <div className="Divider">
          <div className="flex items-center my-2  ">
            <div className="flex-1 h-px bg-gray-300 ml-5" />
            <span className="px-3 text-gray-500 text-xs">{t("common.or")}</span>
            <div className="flex-1 h-px bg-gray-300 mr-5" />
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-5">
        {/* Email */}
        <div className="h-15" >
          <input
            type="email"
            placeholder={t("common.email_placeholder")}
            {...register("email")}
            className="w-full border rounded-md p-2"
          />

          {errors.email && (
            <p className="text-red-500 h-10 text-[10px] sm:text-sm md:text-md">
              {t(errors.email.message as string)}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="h-12">
          <input
            type="password"
            placeholder={t("common.password_placeholder")}
            {...register("password")}
            className="w-full border rounded-md p-2"
          />

          {errors.password && (
            <p className="text-red-500 items-center text-[10px] sm:text-sm md:text-sm ">
              {t(errors.password.message as string)}
            </p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between m-1 h-12">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("rememberMe")}
            />
            <label className="text-[12px] sm:text-sm">
              {t("common.remember_me")}
            </label>
          </div>

          <Link
            to="/forgot-password"
            className="text-[11px] sm:text-sm text-blue-600 hover:underline"
          >
            {t("signin.forgot_password_link")}
          </Link>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-4xl bg-blue-600 text-white p-[6px] text-[11px] sm:text-sm md:text-md"
        >
          {isPending ? t("signin.button_loading") : t("signin.button")}
        </button>
      </form>
      <div className=" items-center text-center ">
        <p className="font-light text-[11px] py-2 text-gray ">
          {t("signin.no_account")}{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline text[14px] font-medium"
          >
            {t("signin.signup_link")}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;