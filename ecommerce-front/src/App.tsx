import { PropsWithChildren } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Screens
import { LoginPage } from "./screens/Login";
import { RegisterPage } from "./screens/Register";
import { HomePage } from "./screens/Home";
import { ProductPage } from "./screens/Product";
import { CheckoutPage } from "./screens/Checkout";
import { CheckoutSuccessPage } from "./screens/CheckoutSuccess";
import { Layout } from "./layouts/Layout";
import { CartPage } from "./screens/Cart";
import { OrdersPage } from "./screens/Orders";

// Context
import AuthProvider from "./context/AuthContext.tsx";
import { CartProvider } from "./context/CartContext.tsx";

import "./index.css";

// Hooks
import { useAuth } from "./hooks/useAuth.ts";

const PrivateRoute = ({ children }: PropsWithChildren) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route index element={<HomePage />} />
              <Route path="/products/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/checkout"
                element={
                  <PrivateRoute>
                    <CheckoutPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/checkout/success"
                element={
                  <PrivateRoute>
                    <CheckoutSuccessPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <PrivateRoute>
                    <OrdersPage />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
