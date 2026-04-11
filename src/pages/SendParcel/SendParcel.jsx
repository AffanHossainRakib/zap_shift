import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SendParcel = () => {
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

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtByRegion = (region) => {
    const regionWarehouses = warehouses.filter(
      (warehouse) => warehouse.region === region,
    );
    return regionWarehouses.map((warehouse) => warehouse.district);
  };

  const handleParcelSubmit = (data) => {
    const parcelType = data.parcelType;
    const parcelWeight = parseFloat(data.parcelWeight);
    const senderDistrict = data.senderDistrict;
    const receiverDistrict = data.receiverDistrict;

    let cost = 0;

    if (parcelType === "Document") {
      if (senderDistrict === receiverDistrict) {
        cost += 60;
      } else {
        cost += 80;
      }
    } else {
      if (parcelWeight <= 3) {
        if (senderDistrict === receiverDistrict) {
          cost += 110;
        } else {
          cost += 150;
        }
      } else {
        if (senderDistrict === receiverDistrict) {
          cost += 110 + (parcelWeight - 3) * 40;
        } else {
          cost += 150 + (parcelWeight - 3) * 40 + 40;
        }
      }
    }

    const formattedCost = new Intl.NumberFormat("en-BD").format(cost);

    Swal.fire({
      title: "Confirm Your Booking",
      html: `
        <div class="mt-2 grid gap-1.5 text-left text-slate-700">
          <p><strong>Type:</strong> ${parcelType}</p>
          <p><strong>Route:</strong> ${senderDistrict} to ${receiverDistrict}</p>
          <p><strong>Weight:</strong> ${parcelWeight} kg</p>
          <div class="mt-2 rounded-xl bg-primary px-4 py-2 font-bold text-secondary">Estimated Cost: BDT ${formattedCost}</div>
        </div>  
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm Booking",
      cancelButtonText: "Edit Details",
      reverseButtons: true,
      buttonsStyling: false,
      customClass: {
        popup: "rounded-2xl border border-slate-200 px-5 py-6",
        title: "font-extrabold text-secondary",
        htmlContainer: "text-slate-700",
        confirmButton:
          "rounded-xl border-0 bg-secondary px-4 py-2.5 font-bold text-white transition hover:brightness-110 ml-2",
        cancelButton:
          "rounded-xl border-0 bg-slate-200 px-4 py-2.5 font-bold text-secondary",
      },
    }).then((result) => {
      if (result.isConfirmed)
        axiosSecure.post("/parcels", { ...data, cost }).then(() => {
          navigate("/dashboard/my-parcels").then(
            Swal.fire({
              title: "Booking Confirmed",
              html: `<div class="mt-2 text-slate-700">Your parcel request has been placed successfully. You can make the payment now. </div>`,
              icon: "success",
              confirmButtonText: "Great",
              buttonsStyling: false,
              customClass: {
                popup: "rounded-2xl border border-slate-200 px-5 py-6",
                title: "font-extrabold text-secondary",
                confirmButton:
                  "rounded-xl border-0 bg-secondary px-4 py-2.5 font-bold text-white transition hover:brightness-110",
              },
            }),
          );
        });
    });
  };

  return (
    <section className="container mx-auto my-10 bg-white p-5 sm:p-10 rounded-3xl shadow-lg">
      <h2 className="text-3xl sm:text-5xl text-secondary font-bold">
        Send A Parcel
      </h2>
      <p className="mt-4 sm:mt-10 text-lg sm:text-xl font-bold">
        Enter your parcel details
      </p>

      <form onSubmit={handleSubmit(handleParcelSubmit)}>
        <fieldset className="fieldset my-4 border-y border-gray-200 py-4">
          {/* Parcel Type Radio Buttons */}
          <fieldset className="fieldset flex justify-start gap-6">
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
            <fieldset className="fieldset">
              <label className="label">Parcel Name *</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Parcel Name"
                {...register("parcelName", { required: true })}
              />
              {errors.parcelName && (
                <p className="text-red-500">Parcel Name is required</p>
              )}
            </fieldset>

            <fieldset className="fieldset">
              <label className="label">Parcel Weight (kg) *</label>
              <input
                type="number"
                step="any"
                className="input w-full"
                placeholder="Parcel Weight"
                {...register("parcelWeight", { required: true, min: 0 })}
              />
              {errors.parcelWeight && (
                <p className="text-red-500">Parcel Weight is required</p>
              )}
            </fieldset>
          </div>
        </fieldset>

        <fieldset className="fieldset grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {/* Sender Details */}
          <fieldset className="fieldset ">
            <h4 className="text-lg sm:text-xl font-bold">Sender Details</h4>
            <label className="label">Sender Name *</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Sender Name"
              defaultValue={user?.displayName || ""}
              {...register("senderName", { required: true })}
            />
            {errors.senderName && (
              <p className="text-red-500">Sender Name is required</p>
            )}

            <label className="label">Sender Email *</label>
            <input
              disabled
              type="email"
              className="input w-full"
              placeholder="Sender Email"
              defaultValue={user?.email || ""}
              {...register("senderEmail", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
            {errors.senderEmail && (
              <p className="text-red-500">Valid Sender Email is required</p>
            )}

            <label className="label">Sender Address *</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Sender Address"
              {...register("senderAddress", { required: true })}
            />
            {errors.senderAddress && (
              <p className="text-red-500">Sender Address is required</p>
            )}

            <label className="label">Sender Phone *</label>
            <input
              type="tel"
              className="input w-full"
              placeholder="Sender Phone"
              {...register("senderPhone", {
                required: true,
                pattern: /^[0-9]+$/,
              })}
            />
            {errors.senderPhone && (
              <p className="text-red-500">Valid Sender Phone is required</p>
            )}

            <label className="label">Sender Region *</label>
            <select
              className="select select-bordered w-full"
              {...register("senderRegion", {
                required: true,
                onChange: () =>
                  resetField("senderDistrict", { defaultValue: "" }),
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
            {errors.senderRegion && (
              <p className="text-red-500">Sender Region is required</p>
            )}

            <label className="label">Sender District *</label>
            <select
              className="select select-bordered w-full"
              {...register("senderDistrict", { required: true })}
              defaultValue=""
            >
              <option value="" disabled>
                Select District
              </option>
              {senderRegion &&
                districtByRegion(senderRegion).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
            </select>
            {errors.senderDistrict && (
              <p className="text-red-500">Sender District is required</p>
            )}

            <label className="label">Pickup Instructions (Optional)</label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Pickup Instructions"
              {...register("pickupInstructions")}
            />
          </fieldset>

          {/* Receiver Details */}
          <fieldset className="fieldset">
            <h4 className="text-lg sm:text-xl font-bold">Receiver Details</h4>

            <label className="label">Receiver Name *</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Receiver Name"
              {...register("receiverName", { required: true })}
            />
            {errors.receiverName && (
              <p className="text-red-500">Receiver Name is required</p>
            )}

            <label className="label">Receiver Email *</label>
            <input
              type="email"
              className="input w-full"
              placeholder="Receiver Email"
              {...register("receiverEmail", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
            {errors.receiverEmail && (
              <p className="text-red-500">Valid Receiver Email is required</p>
            )}

            <label className="label">Receiver Address *</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Receiver Address"
              {...register("receiverAddress", { required: true })}
            />
            {errors.receiverAddress && (
              <p className="text-red-500">Receiver Address is required</p>
            )}

            <label className="label">Receiver Phone *</label>
            <input
              type="tel"
              className="input w-full"
              placeholder="Receiver Phone"
              {...register("receiverPhone", {
                required: true,
                pattern: /^[0-9]+$/,
              })}
            />
            {errors.receiverPhone && (
              <p className="text-red-500">Valid Receiver Phone is required</p>
            )}

            <label className="label">Receiver Region *</label>
            <select
              className="select select-bordered w-full"
              {...register("receiverRegion", {
                required: true,
                onChange: () =>
                  resetField("receiverDistrict", { defaultValue: "" }),
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
            {errors.receiverRegion && (
              <p className="text-red-500">Receiver Region is required</p>
            )}

            <label className="label">Receiver District *</label>
            <select
              className="select select-bordered w-full"
              {...register("receiverDistrict", { required: true })}
              defaultValue=""
            >
              <option value="" disabled>
                Select District
              </option>
              {receiverRegion &&
                districtByRegion(receiverRegion).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
            </select>
            {errors.receiverDistrict && (
              <p className="text-red-500">Receiver District is required</p>
            )}

            <label className="label">Delivery Instructions (Optional)</label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Delivery Instructions"
              {...register("deliveryInstructions")}
            />
          </fieldset>
        </fieldset>
        <p className="my-4 text-sm">* PickUp Time 4pm-7pm Approx.</p>
        <button className="btn btn-primary" type="submit">
          Proceed to Confirm Booking
        </button>
      </form>
    </section>
  );
};

export default SendParcel;
