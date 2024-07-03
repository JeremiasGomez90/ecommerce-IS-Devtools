import { Link } from "react-router-dom";

export const CheckoutSuccessPage = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 pt-24">
      <h1 className="text-4xl text-center text-green-700">Order success</h1>
      <Link
        to="/orders"
        className="mt-4 w-full rounde mr-3 bg-green-700 py-1.5 px-6 h-10 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block rounded-lg"
      >
        Go to my orders
      </Link>
    </div>
  );
};
