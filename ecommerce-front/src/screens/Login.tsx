import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setErrorMessage("");
    const { id, value } = e.target as HTMLInputElement;
    setLoginInfo({ ...loginInfo, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await login(loginInfo);
    if (response.error) {
      return setErrorMessage(response.error);
    }

    setErrorMessage("");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Or{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:text-primary-foreground"
            >
              register for a new account
            </Link>
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit} method="POST">
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email address"
              className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              onChange={handleChange}
              value={loginInfo.email}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="off"
              placeholder="Password"
              className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              value={loginInfo.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <button className="w-full rounde mr-3 bg-black py-1.5 px-6 h-10 text-center text-sm font-medium text-white hover:bg--800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block rounded-lg">
              Sign in
            </button>
          </div>
          {errorMessage && (
            <div className="text-red-500 text-center w-full font-bold">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
