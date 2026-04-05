import React from "react";
import { useForm } from "react-hook-form";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleParcelSubmit = (data) => {
    console.log("Parcel details submitted:", data);
    // Here you would typically send the data to your backend API
  };

  return (
    <section className="container mx-auto my-10 bg-white p-5 sm:p-10 rounded-3xl shadow-lg">
      <h2 className="text-3xl sm:text-5xl text-secondary font-bold">
        Send A Parcel
      </h2>
      <p className="mt-4 sm:mt-10 text-lg sm:text-xl font-bold">
        Enter your parcel details
      </p>

      {/* Parcel details form */}
      <div>
        <form onSubmit={handleSubmit(handleParcelSubmit)}>
          <fieldset className="fieldset text-sm">
            {/* Radio Buttons */}

            <div className="flex gap-4">
              <span>
                <input
                  type="radio"
                  name="parcelType"
                  className="radio mr-1"
                  id="document"
                  value="document"
                  {...register("parcelType", { required: true })}
                />
                <label className="label" htmlFor="document">
                  Document
                </label>
              </span>

              <span>
                <input
                  type="radio"
                  name="parcelType"
                  className="radio mr-1"
                  id="non-document"
                  value="non-document"
                  {...register("parcelType", { required: true })}
                />
                <label className="label" htmlFor="non-document">
                  Non-Document
                </label>
              </span>
            </div>

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
                <p className="text-red-500 ">Email is required</p>
              )}
            </>

            <button className="btn btn-primary mt-2">Send Parcel</button>
          </fieldset>
        </form>
      </div>
    </section>
  );
};

export default SendParcel;
