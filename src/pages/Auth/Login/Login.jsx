import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Link } from "react-router";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((userCredential) => {
        // Login successful
        const user = userCredential.user;
        console.log("User logged in:", user);
      })
      .catch((error) => {
        // Handle login errors
        console.error("Login error:", error);
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
            Forget Password?
          </p>
          <button className="btn btn-primary mt-2">Log In</button>
        </fieldset>
      </form>

      <p className="text-gray-500 mt-4 text-sm">
        Don't have any account?{" "}
        <Link to="/register" className="text-[#8fa748]">
          Sign up
        </Link>
      </p>
      <SocialLogin signInMethod="Login" />
    </div>
  );
};

export default Login;
