import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import agentPending from "../../assets/agent-pending.png";

const Rider = () => {
  const {
    register,
    resetField,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const warehouses = useLoaderData();
  const regionsDuplicate = warehouses.map((warehouse) => warehouse.region);
  const regions = [...new Set(regionsDuplicate)];

  const region = useWatch({ control, name: "region" });

  const districtByRegion = (region) => {
    const regionWarehouses = warehouses.filter(
      (warehouse) => warehouse.region === region,
    );
    return regionWarehouses.map((warehouse) => warehouse.district);
  };

  const handleRiderRequest = async (data) => {
    console.log(data);
    const res = await axiosSecure.post("/rider", data);
    if (res.data?.success) {
      Swal.fire({
        title: "Application Submitted",
        html: `<div class="mt-2 text-slate-700">Your rider application has been submitted successfully. We will review your application and get back to you soon. </div>`,
        icon: "success",
        confirmButtonText: "Great",
        buttonsStyling: false,
        customClass: {
          popup: "rounded-2xl border border-slate-200 px-5 py-6",
          title: "font-extrabold text-secondary",
          confirmButton:
            "rounded-xl border-0 bg-secondary px-4 py-2.5 font-bold text-white transition hover:brightness-110",
        },
      }).then(() => navigate("/"));
    }
  };

  return (
    <section className="container mx-auto my-10 bg-white p-5 sm:p-10 rounded-3xl shadow-lg">
      <h2 className="text-3xl sm:text-5xl text-secondary font-bold">
        Be A Rider
      </h2>
      <div className="flex flex-row ">
        <p className="mt-4 sm:mt-10 sm:w-1/2 text-sm ">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
        <div></div>
      </div>

      <form onSubmit={handleSubmit(handleRiderRequest)}>
        <fieldset className="fieldset flex flex-row w-full">
          <fieldset className="fieldset my-4 border-t border-gray-200 py-4 w-full sm:w-1/2">
            <fieldset className="fieldset ">
              <h4 className="text-lg sm:text-xl font-bold">
                Tell us about yourself
              </h4>

              <label className="label">Your Name *</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Your Name"
                defaultValue={user?.displayName || ""}
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-red-500">Your Name is required</p>
              )}

              <label className="label">Driving License Number *</label>
              <input
                type="number"
                step="1"
                className="input w-full"
                placeholder="Driving License Number"
                {...register("drivingLicenseNumber", { required: true })}
              />
              {errors.drivingLicenseNumber && (
                <p className="text-red-500">
                  Driving License Number is required
                </p>
              )}

              <label className="label">Your Email *</label>
              <input
                disabled
                type="email"
                className="input w-full"
                placeholder="Your Email"
                defaultValue={user?.email || ""}
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors.email && (
                <p className="text-red-500">Valid Your Email is required</p>
              )}

              <label className="label">Region *</label>
              <select
                className="select select-bordered w-full"
                {...register("region", {
                  required: true,
                  onChange: () => resetField("district", { defaultValue: "" }),
                })}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Region
                </option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {errors.region && (
                <p className="text-red-500">Region is required</p>
              )}

              <label className="label">District *</label>
              <select
                className="select select-bordered w-full"
                {...register("district", { required: true })}
                defaultValue=""
              >
                <option value="" disabled>
                  Select District
                </option>
                {region &&
                  districtByRegion(region).map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
              </select>
              {errors.district && (
                <p className="text-red-500">District is required</p>
              )}

              <label className="label">NID No *</label>
              <input
                type="number"
                step="1"
                className="input w-full"
                placeholder="Your NID No"
                {...register("nid", { required: true })}
              />
              {errors.nid && <p className="text-red-500">NID No is required</p>}

              <label className="label">Phone Number *</label>
              <input
                type="tel"
                className="input w-full"
                placeholder="Your Phone"
                {...register("phone", {
                  required: true,
                  pattern: /^[0-9]+$/,
                })}
              />
              {errors.phone && (
                <p className="text-red-500">Valid Your Phone is required</p>
              )}

              <label className="label">Bike Brand Model and Year *</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Bike Brand Model and Year"
                {...register("bikeInfo", { required: true })}
              />
              {errors.bikeInfo && (
                <p className="text-red-500">
                  Bike Brand Model and Year is required
                </p>
              )}

              <label className="label">Bike Registration Number *</label>
              <input
                type="number"
                step="1"
                className="input w-full"
                placeholder="Bike Registration Number"
                {...register("bikeRegistrationNumber", { required: true })}
              />
              {errors.bikeRegistrationNumber && (
                <p className="text-red-500">
                  Bike Registration Number is required
                </p>
              )}

              <label className="label">Tell us about yourself *</label>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Tell us about yourself"
                {...register("aboutYourself", { required: true })}
              />
              {errors.aboutYourself && (
                <p className="text-red-500">
                  This field is required to know you better
                </p>
              )}
            </fieldset>
          </fieldset>
          <div className="sm:w-1/2 hidden sm:block">
            <img src={agentPending} alt="Agent Pending" className="w-full" />
          </div>
        </fieldset>

        <button className="btn btn-primary w-full sm:w-1/2" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default Rider;
