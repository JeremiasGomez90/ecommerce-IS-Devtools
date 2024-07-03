import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export const Navbar = () => {
  const { loggedIn, logout } = useAuth();
  const { productsInCart } = useCart();
  return (
    <nav className="fixed top-0 left-0 z-20 w-full border-b border-gray-200 bg-white py-2.5 px-6 sm:px-4">
      <div className="container mx-auto flex max-w-6xl flex-wrap items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="self-center whitespace-nowrap text-xl font-semibold">
            Ecommerce
          </span>
        </Link>
        <div className="mt-2 sm:mt-0 sm:flex md:order-2">
          {productsInCart.length > 0 && (
            <Link to="/cart">
              <button
                type="button"
                className="rounde ml-3 bg-green-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block rounded-lg"
              >
                Go to Cart
              </button>
            </Link>
          )}
          {loggedIn ? (
            <>
              <Link to="/orders">
                <button
                  type="button"
                  className="rounde ml-3 bg-red-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block rounded-lg"
                >
                  My orders
                </button>
              </Link>
              <button
                type="button"
                className="rounde ml-3 hidden border border-blue-700 py-1.5 px-6 text-center text-sm font-medium text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 md:inline-block rounded-lg"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounde ml-3 border border-blue-700 py-1.5 px-6 text-center text-sm font-medium text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 md:inline-block rounded-lg"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounde ml-3 bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block rounded-lg"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
