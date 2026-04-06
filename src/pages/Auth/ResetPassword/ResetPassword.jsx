import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import useAuth from "../../../hooks/useAuth";

const ResetPassword = () => {
  const { verifyResetCode, confirmNewPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [searchParams] = useSearchParams();
  const [codeValid, setCodeValid] = useState(null); // null=checking, true=valid, false=invalid
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const oobCode = searchParams.get("oobCode");

  // Verify the code is still valid when the page loads
  useEffect(() => {
    if (!oobCode) {
      setCodeValid(false);
      return;
    }
    verifyResetCode(oobCode)
      .then(() => setCodeValid(true))
      .catch(() => setCodeValid(false));
  }, [oobCode, verifyResetCode]);

  const handleResetPassword = (data) => {
    confirmNewPassword(oobCode, data.newPassword)
      .then(() => {
        setIsSuccess(true);
        toast.success("Password reset successful!");
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch((error) => {
        if (error.code === "auth/expired-action-code") {
          toast.error("Reset link expired. Please request a new one.");
        } else if (error.code === "auth/invalid-action-code") {
          toast.error("Invalid reset link. Please request a new one.");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      });
  };

  if (codeValid === null) {
    return (
      <div className="container mx-auto px-8 sm:px-16 py-20 sm:py-40 bg-white rounded-lg shadow-md text-center">
        <p className="text-gray-500">Verifying reset link...</p>
      </div>
    );
  }

  if (codeValid === false) {
    return (
      <div className="container mx-auto px-8 sm:px-16 py-20 sm:py-40 bg-white rounded-lg shadow-md text-center">
        <h3 className="text-3xl font-extrabold text-secondary mb-2">
          Invalid Link
        </h3>
        <p className="text-gray-500">
          This reset link is invalid or has expired.{" "}
          <Link to="/forgot-password" className="text-[#8fa748]">
            Request a new one
          </Link>
        </p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto px-8 sm:px-16 py-20 sm:py-40 bg-white rounded-lg shadow-md text-center">
        <h3 className="text-3xl font-extrabold text-secondary mb-2">
          Password Updated!
        </h3>
        <p className="text-gray-500">
          Redirecting to login...{" "}
          <Link to="/login" className="text-[#8fa748]">
            Go now
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 sm:px-16 py-20 sm:py-40 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h3 className="text-3xl sm:text-5xl font-extrabold text-secondary mb-4">
          Reset Password
        </h3>
        <p className="text-gray-500 text-xl">Set your new password</p>
      </div>
      <form onSubmit={handleSubmit(handleResetPassword)}>
        <fieldset className="fieldset text-sm">
          <>
            <label className="label">New Password</label>
            <input
              type="password"
              className="input w-full"
              placeholder="New password"
              {...register("newPassword", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
            />
            {errors.newPassword && (
              <p className="text-red-500">{errors.newPassword.message}</p>
            )}
          </>
          <>
            <label className="label mt-2">Confirm Password</label>
            <input
              type="password"
              className="input w-full"
              placeholder="Confirm password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (val) =>
                  val === watch("newPassword") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </>
          <button className="btn btn-primary mt-4">Reset Password</button>
        </fieldset>
      </form>
    </div>
  );
};

export default ResetPassword;
