import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegistration = (data) => {
    console.log("Registration Data:", data);
  };

  return (
    <div className="container mx-auto px-8 sm:px-16 py-20 sm:py-40 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h3 className="text-3xl sm:text-5xl font-extrabold text-secondary mb-4">
          Create an Account
        </h3>
        <p className="text-gray-500 text-xl">Register with ZapShift</p>
      </div>
      <form onSubmit={handleSubmit(handleRegistration)}>
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
          <button className="btn btn-primary mt-4">Register</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
