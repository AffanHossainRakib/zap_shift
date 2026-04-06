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
      <form onSubmit={handleSubmit(handleParcelSubmit)}>
        <fieldset className="fieldset my-4 border-y border-gray-200 py-4 ">
          {/* Parcel Type Radio Buttons */}
          <fieldset className="fieldset flex justify-start gap-6 ">
            <label className="radio-label">
              <input
                type="radio"
                className="radio radio-secondary"
                value="Document"
                {...register("parcelType", { required: true })}
                defaultChecked
              />
              <span className="ml-2 text-sm">Document</span>
            </label>

            <label className="radio-label">
              <input
                type="radio"
                className="radio radio-secondary"
                value="Non-Document"
                {...register("parcelType", { required: true })}
              />
              <span className="ml-2 text-sm">Non-Document</span>
            </label>
          </fieldset>

          {/* Parcel Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Parcel Name */}
            <fieldset className="fieldset">
              <label className="label">Parcel Name</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Parcel Name"
                {...register("parcelName", {
                  required: true,
                })}
              />
              {errors.parcelName && (
                <p className="text-red-500 ">Parcel Name is required</p>
              )}
            </fieldset>

            {/* Parcel Weight */}
            <fieldset className="fieldset">
              <label className="label">Parcel Weight (kg)</label>
              <input
                type="number"
                step="any"
                className="input w-full"
                placeholder="Parcel Weight"
                {...register("parcelWeight", {
                  required: true,
                  min: 0,
                })}
              />
              {errors.parcelWeight && (
                <p className="text-red-500 ">Parcel Weight is required</p>
              )}
            </fieldset>
          </div>
        </fieldset>

        <button className="btn btn-primary" type="submit">
          Proceed to Confirm Booking
        </button>
      </form>
    </section>
  );
};

export default SendParcel;
