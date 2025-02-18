import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); 

  const handleSignup = async (e) => {
    e.preventDefault(); 

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post("http://localhost:5001/api/auth/register", {
        name,
        email,
        password,
      });

      console.log("Signup Success:", response.data);
      alert("Signup Successful! Please Login.");
      navigate("/"); // Login page pe redirect

    } catch (err) {
      console.error("Signup Error:", err.response?.data);
      setError(err.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-28">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Signup"}
          </button>
        </div>
      </form>

      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Signup;
