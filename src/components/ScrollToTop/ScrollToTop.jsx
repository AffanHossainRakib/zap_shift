import { useEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-4 bg-primary/80 rounded-full w-10 h-10 shadow-lg cursor-pointer flex items-center justify-center text-2xl hover:bg-primary transition"
        aria-label="Scroll to top"
      >
        <FaArrowCircleUp className="w-10 h-10" />
      </button>
    )
  );
};

export default ScrollToTop;
