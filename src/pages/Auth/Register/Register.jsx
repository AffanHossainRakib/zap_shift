import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "sonner";
import LoadingPage from "../../Shared/LoadingPage/LoadingPage";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
  const emailValue = watch("email");

  const { registerUser, updateUserProfile, user } = useAuth();

  const handleRegistration = (data) => {
    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", data.picture[0]);
        const image_upload_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
        axios
          .post(image_upload_url, formData)
          .then((resposne) => {
            const imageURL = resposne.data.data.display_url;
            updateUserProfile({ image: imageURL, name: data.name });
          })
          .catch((error) => {
            toast.error("Image upload error:", error);
          });

        // After successful registration and profile update, navigate to the intended page
        navigate(location?.state?.from || "/", { replace: true });
      })
      .catch((error) => {
        toast.error("Registration error:", error);
      });
  };

  if (user) {
    return <Navigate to={location.state?.from || "/"} replace />;
  }

  return (
    <div className="container mx-auto px-8 sm:px-16 py-20 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h3 className="text-3xl sm:text-5xl font-extrabold text-secondary mb-4">
          Create an Account
        </h3>
        <p className="text-gray-500 text-xl">Register with ZapShift</p>
      </div>

      <form onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset text-sm">
          {/* Name Field */}
          <>
            <label className="label">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="input w-full"
              placeholder="Name"
              {...register("name", {
                required: true,
              })}
            />
            {errors.name && <p className="text-red-500 ">Name is required</p>}
          </>

          {/* Picture Field */}
          <>
            <label className="label">
              Profile Picture{" "}
              <span className="text-gray-500 text-xs">(Optional)</span>
            </label>
            <input
              type="file"
              className="file-input w-full"
              placeholder="Picture URL"
              {...register("picture")}
            />
          </>

          {/* Email Field */}
          <>
            <label className="label">
              Email<span className="text-red-500">*</span>
            </label>
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

          {/* Password Field */}
          <>
            <label className="label">
              Password<span className="text-red-500">*</span>
            </label>
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
          <button className="btn btn-primary mt-4">Register</button>
        </fieldset>
      </form>
      <p className="text-gray-500 mt-4 text-sm">
        Already have an account?{" "}
        <Link
          to="/login"
          state={{ ...location.state, email: emailValue }}
          className="text-[#8fa748]"
        >
          Log in
        </Link>
      </p>
      <SocialLogin signInMethod="Register" />
    </div>
  );
};

export default Register;
