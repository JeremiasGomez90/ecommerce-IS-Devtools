import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export const ProductPage = () => {
  const {
    state: { product },
  } = useLocation();
  const navigate = useNavigate();
  const { addToCart, productsInCart } = useCart();

  const itemInCart = !!productsInCart.find((p) => p.id === product.id);

  const [quantity, setQuantity] = useState(1);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setQuantity(Number(e.target.value));
  }

  function handleAddToCart() {
    addToCart({ ...product, quantity });
    navigate("/cart");
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4 md:gap-8">
        <div className="flex items-center gap-4">
          <button className="h-7 w-7" onClick={() => navigate(-1)}>
            <span className="text-xl">←</span>
          </button>
          <h1 className="text-2xl font-bold tracking-tight">{product.brand}</h1>
        </div>
        <img
          src={product.imgSrc}
          alt="Product Image"
          width={600}
          height={600}
          className="aspect-square object-cover border w-full rounded-lg overflow-hidden"
        />
      </div>
      <div className="grid gap-4 md:gap-10 pt-16">
        <div className="grid gap-2">
          <p className="text-muted-foreground">{product.description}</p>
        </div>
        <div className="grid gap-4">
          {!itemInCart && (
            <div className="grid gap-2">
              <label htmlFor="countries" className="block text-sm font-bold">
                Quantity
              </label>
              <select
                id="countries"
                onChange={handleChange}
                value={quantity}
                disabled={itemInCart}
                className="bg-gray-50 border w-24 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          )}
          <div className="flex flex-col gap-2">
            {itemInCart ? (
              <>
                <div className="text-sm">
                  This item already exists in the cart
                </div>
                <Link
                  to="/cart"
                  className="rounde mr-3 hidden bg-blue-700 py-2.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block rounded-lg"
                >
                  Go to Cart
                </Link>
              </>
            ) : (
              <button
                onClick={handleAddToCart}
                className="rounde mr-3 hidden bg-blue-700 py-2.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block rounded-lg"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
