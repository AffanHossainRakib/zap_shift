import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useLocation } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { toast } from "sonner";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const { passwordResetEmail } = useAuth();
  const prefilledEmail = location.state?.email || "";
  const emailValue = useWatch({ control, name: "email" });

  const handleForgotPassword = (data) => {
    passwordResetEmail(data.email)
      .then((res) => toast("Password reset email sent:", res))
      .catch((error) => {
        toast.error("Password reset error:", error);
      });
  };

  return (
    <div className="container mx-auto px-8 sm:px-16 py-20 sm:py-40 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h3 className="text-3xl sm:text-5xl font-extrabold text-secondary mb-4">
          Welcome Back!
        </h3>
        <p className="text-gray-500 text-xl">Login to ZapShift</p>
      </div>
      <form onSubmit={handleSubmit(handleForgotPassword)}>
        <fieldset className="fieldset text-sm">
          {/* Email Field */}
          <>
            <label className="label">Email</label>
            <input
              defaultValue={prefilledEmail}
              type="email"
              className="input w-full"
              placeholder="Email"
              {...register("email", {
                required: true,
              })}
            />
            {errors.email && <p className="text-red-500 ">Email is required</p>}
          </>

          <button className="btn btn-primary mt-2">Send</button>
        </fieldset>
      </form>

      <p className="text-gray-500 mt-4 text-sm">
        Remeber your password?{" "}
        <Link
          to="/login"
          state={{ ...location.state, email: emailValue }}
          className="text-[#8fa748]"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
