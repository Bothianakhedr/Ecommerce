import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
   <div className="flex items-center justify-center h-screen ">
     <div className="text-center">
      <h3 className="text-pink-600 text-8xl font-semibold">404</h3>
      <h5 className="text-4xl font-semibold my-2">
        <span className="text-red-500">Oops!</span> Page Not Found
      </h5>
      <p className="mt-2 mb-3">The page you are looking for doesn't exist</p>
      <Link className="px-3 text-sm font-semibold py-2 rounded bg-pink-600 text-white" to="/">
        Home
      </Link>
    </div>
   </div>
  );
};
