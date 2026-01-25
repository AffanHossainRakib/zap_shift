import React from "react";

const aboutData = [
  {
    title: "Story",
    description:
      "We started with a simple promise — to make parcel delivery fast, reliable, and completely stress-free. What began as a focused effort to solve everyday delivery challenges has grown into a service trusted by individuals and businesses alike. From the very beginning, our goal has been clear: remove uncertainty from logistics and replace it with confidence, transparency, and consistency. Over the years, our continued investment in real-time tracking technology, streamlined operations, and efficient logistics networks has allowed us to deliver more than just parcels — we deliver peace of mind. Every shipment is handled with care, monitored at every stage, and supported by systems designed to minimize delays and maximize reliability. Our customer-first approach ensures that support is always within reach, and every concern is treated with urgency and responsibility. Whether it is a personal gift meant to arrive on a special day, an important document, or a time-sensitive business delivery, we understand the value of what you are sending. That is why we focus on precision, punctuality, and accountability in every delivery we make. With a growing network, dedicated professionals, and a commitment to continuous improvement, we ensure your parcels reach their destination safely — on time, every time.",
  },
  {
    title: "Mission",
    description:
      "Our mission is to redefine parcel delivery by combining speed, reliability, and simplicity into one seamless experience. We aim to eliminate the common frustrations associated with logistics by leveraging innovative technology, optimized processes, and a customer-centric mindset. Every service we design is built around the real needs of our customers, ensuring transparency, timely communication, and dependable outcomes. By continuously improving our operational efficiency and investing in smart logistics solutions, we strive to deliver parcels faster while maintaining the highest standards of care and security. Our mission goes beyond transportation — it is about building trust, reducing uncertainty, and ensuring that every customer feels confident when choosing us for their delivery needs.",
  },
  {
    title: "Vision",
    description:
      "Our vision is to become a globally recognized leader in parcel delivery, setting industry benchmarks for speed, reliability, and customer satisfaction. We envision a future where logistics is no longer a source of stress, but a seamless extension of everyday life and business operations. By embracing innovation, automation, and data-driven decision-making, we aim to adapt to the evolving demands of modern commerce and global connectivity. Our long-term vision focuses on sustainable growth, operational excellence, and continuous innovation, enabling us to expand our reach while maintaining the quality and trust our customers expect. Through these efforts, we seek to shape the future of logistics and create meaningful value for individuals and businesses worldwide.",
  },
  {
    title: "Success",
    description:
      "Our success is measured not only by numbers, but by the trust and satisfaction of our customers. Since our inception, we have delivered over one million parcels, consistently achieving an on-time delivery rate of 98 percent. These milestones reflect our dedication to precision, accountability, and operational discipline. Each successful delivery represents a commitment fulfilled and a promise kept. Our high customer satisfaction rating of 4.9 out of 5 highlights the effectiveness of our customer-first approach, responsive support systems, and reliable service standards. As we continue to grow, we remain focused on maintaining these benchmarks while pushing ourselves to achieve even higher levels of performance and reliability.",
  },
  {
    title: "Team & Others",
    description:
      "Behind every successful delivery is a dedicated team working in perfect coordination. Our organization is powered by over 200 skilled professionals, including logistics specialists, customer service representatives, operations managers, and technology experts. Each team member plays a vital role in ensuring that parcels move efficiently through our network, from pickup to final delivery. We foster a culture of collaboration, responsibility, and continuous learning, empowering our people to adapt to challenges and deliver consistent results. Supported by strong partnerships, modern infrastructure, and advanced technology, our team works tirelessly to create smooth, dependable, and customer-focused delivery experiences across all service areas.",
  },
];

const About = () => {
  return (
    <div className="container mx-auto p-4 rounded-3xl mt-5 bg-white">
      <div
        className="
        mx-auto sm:ml-10
        flex flex-col gap-3
        items-center justify-center
        sm:items-start sm:justify-start
        w-full sm:w-1/2
        px-5 py-10
        text-center sm:text-left"
      >
        <h3 className="text-3xl font-bold text-secondary">About Us</h3>
        <p>
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      <div role="tablist" className="tabs tabs-lifted">
        {aboutData.map((item) => {
          return (
            <React.Fragment key={item.title}>
              <input
                type="radio"
                name="my_tabs_7"
                className="tab"
                aria-label={item.title}
                defaultChecked={item.title === "Story"}
              />
              <div className="tab-content bg-base-100 border-base-300 p-6 text-justify">
                {item.description}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default About;
