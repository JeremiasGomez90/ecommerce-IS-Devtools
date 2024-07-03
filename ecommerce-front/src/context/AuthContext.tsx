import axios from "axios";
import { createContext, useState, useEffect, PropsWithChildren } from "react";
import { useCart } from "../hooks/useCart";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const { clearCart } = useCart();
  const [token, setToken_] = useState<string | null>(
    localStorage.getItem("token")
  );

  // Function to set the authentication token
  const setToken = (newToken: string | null) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );
      setToken(response.data.token);
      return { success: true };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return { error: error.response.data.message || "Login failed" };
      } else {
        return { error: "Login failed" };
      }
    }
  };

  const register = async ({
    email,
    password,
    confirmPassword,
  }: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (confirmPassword !== password) {
      return { error: "Passwords must match" };
    }
    try {
      await axios.post("http://localhost:5000/api/users/register", {
        email,
        password,
      });
      return { success: true };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return { error: error.response.data.message || "Login failed" };
      } else {
        return { error: "Login failed" };
      }
    }
  };

  const logout = () => {
    setToken(null);
    clearCart();
  };

  return (
    <AuthContext.Provider
      value={{ token, loggedIn: !!token, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
