import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../styles/LoadingSpinner"
import secureApiFetch from "../services/apiFetch";
import { toast } from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginUser = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    await secureApiFetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        company_name: companyName,
        user_name: username,
        password: password,
      }),
    })
      .then((response) => {
        setLoading(false);
        if (response.status === 401) {
          setError("Invalid username or password");
          toast("Wrong username or password");
          setUsername("");
          setPassword("");
          setCompanyName("");
          return null;
        }
        return response.json();
      })
      .then((loginData) => {
        if (!loginData || !loginData.token) {
          console.error("Invalid username or password");
          return;
        }
        sessionStorage.setItem("access_role", loginData.access_role);
        sessionStorage.setItem("token", loginData.token);
        sessionStorage.setItem("permissions", JSON.stringify(loginData.permissions));
        navigate("/",{ state: { permissions: loginData.permissions } });
      })
      .catch((error) => {
        console.error("Login error:", error);
        setError("Something went wrong. Please try again.");
        setLoading(false);
      });
  };
  // const handleLoginUser = async (e) => {
  //   e.preventDefault();
  //   sessionStorage.setItem("access_role", "loginData.access_role");
  //   sessionStorage.setItem("token", "loginData.token");
  //   sessionStorage.setItem("permissions", "JSON.stringify(loginData.permissions)");
  //   navigate("/");
  // };

  return (
    <section>
      {loading && <LoadingSpinner />}
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-sm md:max-w-md lg:max-w-md xl:max-w-md 2xl:max-w-md p-10 bg-gray-50 shadow-blue-200 shadow-xl">
          <div className="mb-5 p-5 flex justify-center"></div>
          <div>
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              Sign in to your account
            </h2>

            <form onSubmit={handleLoginUser} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="company_name"
                    className="text-base font-medium text-gray-900"
                  >
                    Company Name
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="company_name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="text-base font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                {error && (
                  <div>
                    <p className="text-red-600 text-sm mt-2">{error}</p>
                  </div>
                )}
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    style={{ backgroundColor: "#282560" }}
                  >
                    Log In
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;