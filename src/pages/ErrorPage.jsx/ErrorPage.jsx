import PrimaryBtn from "../../components/PrimaryBtn/PrimaryBtn";

const ErrorPage = () => {
  return (
    <div className="container mx-auto p-4 rounded-3xl mt-5 bg-white">
      <div className="flex flex-col text-center items-center justify-center gap-8 py-20">
        <h2 className="text-3xl sm:text-5xl">Error 404</h2>
        <p className="text-lg text-primary-content">
          The page you are looking for does not exist.
        </p>
        <PrimaryBtn to="/" message="Go to Home"></PrimaryBtn>
      </div>
    </div>
  );
};

export default ErrorPage;
