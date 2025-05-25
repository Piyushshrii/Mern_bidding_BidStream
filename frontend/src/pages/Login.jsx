import { login } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, isAuthenticated, loading]);

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-[#0e0f1a] px-4 py-16">
      <div className="w-full max-w-2xl bg-[#151623] text-white rounded-2xl shadow-lg p-10 md:p-14">
        <h1 className="text-center text-[#d6482b] font-bold text-4xl mb-10">
          Login
        </h1>
        <form onSubmit={handleLogin} className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-[#1f2130] border border-gray-600 rounded-md text-white focus:outline-none focus:border-[#d6482b]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-[#1f2130] border border-gray-600 rounded-md text-white focus:outline-none focus:border-[#d6482b]"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#d6482b] hover:bg-[#b8381e] text-white font-semibold text-lg px-10 py-2 rounded-xl transition-all duration-300"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
