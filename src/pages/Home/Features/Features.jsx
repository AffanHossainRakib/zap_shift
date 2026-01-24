import liveTracking from "../../../assets/live-tracking.png";
import safeDelivary from "../../../assets/safe-delivery.png";

const featureData = [
  {
    title: "100% Safe Delivery",
    image: safeDelivary,
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
  },
  {
    title: "Live Parcel Tracking",
    image: liveTracking,
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
  },
  {
    title: "24/7 Call Center Support",
    image: safeDelivary,
    description:
      "Our dedicated support team is available 24/7 to assist you with tracking, delivery updates, and any service-related queries.",
  },
];

const Features = () => {
  return (
    <section className="bg-gray-100 py-10 sm:py-16 rounded-3xl">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="space-y-6">
          {featureData.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6"
            >
              {/* Image */}
              <div className="w-40 shrink-0">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-auto"
                />
              </div>

              {/* Dashed divider */}
              <div className="hidden sm:block h-24 border-l-2 border-dashed border-secondary" />

              {/* Content */}
              <div className="flex-1 text-center sm:text-left">
                <h4 className="text-lg font-bold text-secondary mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
