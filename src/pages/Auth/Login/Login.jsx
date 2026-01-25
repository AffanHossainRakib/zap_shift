import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const { signInUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
            {errors.email && (
              <p className="text-red-500 ">This field is required</p>
            )}
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
            {errors.password?.type === "required" && (
              <p className="text-red-500">This field is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be at least 6 characters
              </p>
            )}
          </>
          <button className="btn btn-primary mt-4">Log In</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
