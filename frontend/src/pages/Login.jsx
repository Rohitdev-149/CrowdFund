import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Coins, ArrowRight } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post("http://localhost:5001/api/auth/login", {
        email,
        password,
      });

      console.log("Login Success:", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      console.error("Login Error:", err.response?.data);
      setError(err.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel - Background Image */}
      <div className="hidden md:flex md:w-1/2 bg-cover bg-center relative"
           style={{
             backgroundImage: "url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')"
           }}>
        <div className="absolute inset-0 bg-blue-900/70 backdrop-blur-sm">
          <div className="flex flex-col justify-center items-center h-full text-white p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <Coins size={48} className="mb-6 mx-auto" />
              <h1 className="text-4xl font-bold mb-4">CrowdFund Platform</h1>
              <p className="text-lg text-blue-100">Join our community of changemakers and bring your ideas to life.</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-gray-100">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Welcome Back</h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-[1.02] disabled:bg-gray-400 disabled:transform-none"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">Don't have an account?</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={goToSignup}
                className="mt-2 text-blue-600 font-semibold inline-flex items-center group"
              >
                Create an account
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;