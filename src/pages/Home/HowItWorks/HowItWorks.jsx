import { FaTruck, FaWallet, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

const data = [
  {
    icon: FaTruck,
    title: "Booking Pick & Drop",
    description:
      "Schedule parcel pickup and drop-off easily from your doorstep with timely delivery.",
  },
  {
    icon: FaWallet,
    title: "Cash On Delivery",
    description:
      "Provide cash on delivery service with secure collection and faster settlements.",
  },
  {
    icon: FaMapMarkerAlt,
    title: "Delivery Hub",
    description:
      "Our delivery hubs ensure efficient sorting and faster shipment movement.",
  },
  {
    icon: FaBriefcase,
    title: "Booking SME & Corporate",
    description:
      "Tailored logistics solutions for SMEs and corporate business needs.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-gray-100 py-16 rounded-3xl">
      <div className="container mx-auto px-4 ">
        {/* Title */}
        <h3 className="text-secondary text-3xl font-extrabold mb-10">
          How it Works
        </h3>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 mb-4">
                  <Icon className="text-secondary text-xl" />
                </div>

                {/* Content */}
                <h4 className="text-lg text-secondary font-bold mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-secondary-content leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
