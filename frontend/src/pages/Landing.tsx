import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div className="flex justify-center pt-10">
      <Link to={"/signup"}>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:ring-none"
        >
          Sign up
        </button>
      </Link>
      <Link to={"/signin"}>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:ring-none"
        >
          Login
        </button>
      </Link>
    </div>
  );
};
