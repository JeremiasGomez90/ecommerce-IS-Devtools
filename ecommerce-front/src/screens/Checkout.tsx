import { useCart } from "../hooks/useCart";

export const CheckoutPage = () => {
  const { productsInCart } = useCart();
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 pt-24">
      <div className="w-full max-w-5xl mx-auto py-12 px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="p-4 border rounded-md border-red-50">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            <div>
              <div>
                <div className="grid gap-4">
                  {productsInCart.map((p) => (
                    <div
                      className="flex items-center justify-between"
                      key={p.id}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={p.imgSrc}
                          alt={p.description}
                          width={64}
                          height={64}
                          className="rounded-md"
                        />
                        <div>
                          <h3 className="font-medium">{p.brand}</h3>
                          <p className="text-muted-foreground text-sm">
                            {p.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-lg font-medium">
                        ${(p.price * p.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-4 flex items-center justify-between mt-8">
                <div className="text-lg font-medium">Subtotal</div>
                <div className="text-lg font-medium">
                  $
                  {productsInCart
                    .reduce((acc, item) => acc + item.quantity * item.price, 0)
                    .toFixed(2)}
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-2 rounded-md border-red-50 bg-white">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            <div>
              <div>
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="phone">Phone</label>
                    <input
                      id="phone"
                      placeholder="Enter your phone"
                      className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="address">Address</label>
                    <input
                      id="address"
                      placeholder="Enter your address"
                      className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="card-number">Card Number</label>
                    <input
                      id="card-number"
                      type="text"
                      placeholder="Enter your card number"
                      className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="expiry">Expiry</label>
                      <input
                        className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                        id="expiry"
                        type="text"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="cvc">CVC</label>
                      <input
                        id="cvc"
                        type="text"
                        placeholder="CVC"
                        className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="zip">Zip</label>
                      <input
                        id="zip"
                        type="text"
                        placeholder="Zip code"
                        className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div>
                <button className="mt-4 w-full rounde mr-3 bg-green-700 py-1.5 px-6 h-10 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block rounded-lg">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
