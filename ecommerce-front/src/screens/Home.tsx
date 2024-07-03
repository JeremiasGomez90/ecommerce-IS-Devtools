import { Link } from "react-router-dom";
import { ReactComponent as CartIcon } from "../assets/cart.svg";
import { PRODUCTS } from "../data";
import { useCart } from "../hooks/useCart";

export const HomePage = () => {
  const { addToCart, productsInCart, removeFromCart } = useCart();
  return (
    <div className="pt-24 mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {PRODUCTS.map((product) => (
        <article
          className="flex rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300"
          key={product.id}
        >
          <div className="flex flex-col flex-1">
            <Link
              to={`/products/${product.id}`}
              state={{ product }}
              className="cursor-pointer"
            >
              <div className="relative flex items-end overflow-hidden rounded-xl">
                <img src={product.imgSrc} alt={product.description} />
              </div>

              <div className="mt-1 p-2 flex flex-col flex-1">
                <h2 className="text-slate-700">{product.brand}</h2>
                <p className="mt-1 text-sm text-slate-400">
                  {product.description}
                </p>
              </div>
            </Link>
            <div className="mt-3 flex items-end justify-between flex-1">
              <p className="text-lg font-bold text-blue-500">
                ${product.price}
              </p>

              {productsInCart.find((p: Product) => p.id === product.id) ? (
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="flex items-center space-x-1.5 rounded-lg bg-red-500 px-4 py-1.5 text-white duration-100 hover:bg-red-600"
                >
                  <CartIcon />
                  <span className="text-sm">Remove</span>
                </button>
              ) : (
                <button
                  onClick={() => addToCart({ ...product, quantity: 1 })}
                  className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600"
                >
                  <span className="text-sm">Add to cart</span>
                </button>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};
