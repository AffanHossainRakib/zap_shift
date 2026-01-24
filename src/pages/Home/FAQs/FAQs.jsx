import React from "react";
import PrimaryBtn from "../../../components/PrimaryBtn/PrimaryBtn";

const faqs = [
  {
    question: "How do I create an account?",
    answer:
      "Click the 'Sign Up' button in the top right corner and follow the registration process.",
  },
  {
    question: "I forgot my password. What should I do?",
    answer:
      "Click on 'Forgot Password' on the login page and follow the instructions sent to your email.",
  },
  {
    question: "How do I update my profile information?",
    answer:
      "Go to 'My Account' settings and select 'Edit Profile' to make changes.",
  },
  {
    question: "How do I delete my account?",
    answer:
      "Go to 'My Account' settings and select 'Delete Account' to permanently remove your account.",
  },
  {
    question: "How long does it take delivery?",
    answer:
      "Delivery times vary based on location, but typically take 5-7 business days.",
  },
];

const FAQs = () => {
  return (
    <section className="container mx-auto p-4 my-10 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-2xl sm:text-4xl font-extrabold mb-6 text-secondary">
          Frequently Asked Question (FAQ)
        </h3>
        <p className="text-gray-600 sm:text-sm text-xs">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>
      <div className="mt-10">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="collapse collapse-arrow bg-base-100 border border-base-300 mb-4"
          >
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">{faq.question}</div>
            <div className="collapse-content text-sm">{faq.answer}</div>
          </div>
        ))}
        <div className="flex justify-center items-center mt-10">
          <PrimaryBtn message="See More FAQs" />
        </div>
      </div>
    </section>
  );
};

export default FAQs;
