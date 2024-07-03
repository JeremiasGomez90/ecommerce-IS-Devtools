import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";

export const CartPage = () => {
  const navigate = useNavigate();
  const {
    productsInCart,
    decrementQuantity,
    incrementQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const { loggedIn } = useAuth();

  function handleCheckout() {
    if (!loggedIn) {
      window.alert("You must be logged in");
    } else {
      navigate("/checkout");
    }
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 pt-24">
      <div className="grid md:grid-cols-[1fr_300px] gap-8">
        <div className="grid gap-6">
          <Link className="flex items-center gap-4" to="/">
            <span className="text-xl">←</span>
            <h1 className="text-2xl font-bold tracking-tight">
              Continue to shopping
            </h1>
          </Link>
          <div className="flex justify-between items-center">
            {productsInCart.length > 0 ? (
              <h1 className="text-2xl font-bold">Your Cart</h1>
            ) : (
              <h1 className="text-2xl font-bold">Your Cart is empty</h1>
            )}
            {productsInCart.length > 0 && (
              <button
                onClick={clearCart}
                className="rounded-md bg-red-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block"
              >
                Clear Cart
              </button>
            )}
          </div>
          <div className="grid gap-4">
            {productsInCart.map((item) => (
              <div key={item.id}>
                <div className="grid grid-cols-[100px_1fr_100px] items-center gap-4">
                  <img
                    src={item.imgSrc}
                    alt={item.description}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                  <div className="grid gap-1">
                    <h3 className="font-semibold">{item.brand}</h3>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={item.quantity === 1}
                        onClick={() => decrementQuantity(item)}
                        className="rounded-md bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block"
                      >
                        <span>-</span>
                      </button>
                      <span className="rounded-md	border-2 border-slate-800 px-6">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => incrementQuantity(item)}
                        className="rounded-md bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block"
                      >
                        <span>+</span>
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="rounded-md bg-red-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
                <hr className="h-[3px] mt-4 bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-6 bg-white rounded-lg p-6">
          <div className="grid gap-2">
            <h2 className="text-lg font-bold">Purchase Summary</h2>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                $
                {productsInCart
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>
                $
                {productsInCart
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
              </span>
            </div>
          </div>
          {productsInCart.length > 0 && (
            <button
              onClick={handleCheckout}
              className="mr-3 bg-green-700 py-1.5 px-6 h-10 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block rounded-lg"
            >
              Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
