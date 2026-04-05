import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prefilledEmail = location.state?.email || "";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: prefilledEmail,
    },
  });
  const { signInUser, user } = useAuth();
  const emailValue = watch("email");

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then(() => {
        navigate(location.state?.from || "/", { replace: true });
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          toast.error("Your email or password is incorrect. Please try again.");
        } else {
          toast.error(error.message);
        }
      });
  };

  if (user) {
    return <Navigate to={location.state?.from || "/"} replace />;
  }

  return (
    <div className="container mx-auto px-8 sm:px-16 py-20 sm:py-40 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h3 className="text-3xl sm:text-5xl font-extrabold text-secondary mb-4">
          Welcome Back!
        </h3>
        <p className="text-gray-500 text-xl">Login to ZapShift</p>
      </div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset text-sm">
          {/* Email Field */}
          <>
            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full"
              placeholder="Email"
              {...register("email", {
                required: true,
              })}
            />
            {errors.email && <p className="text-red-500 ">Email is required</p>}
          </>

          {/* Password Field */}
          <>
            <label className="label">Password</label>
            <input
              type="password"
              className="input w-full "
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
            />
            <>
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be at least 6 characters
                </p>
              )}
            </>
          </>
          <p className="underline text-gray-500 hover:text-gray-700 cursor-pointer mt-2">
            <Link
              to="/forgot-password"
              state={{ ...location.state, email: emailValue }}
            >
              Forget Password?
            </Link>
          </p>
          <button className="btn btn-primary mt-2">Log In</button>
        </fieldset>
      </form>

      <p className="text-gray-500 mt-4 text-sm">
        Don't have any account?{" "}
        <Link
          to="/register"
          state={{ ...location.state, email: emailValue }}
          className="text-[#8fa748]"
        >
          Register
        </Link>
      </p>
      <SocialLogin signInMethod="Login" />
    </div>
  );
};

export default Login;
