import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StartProject = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    target: "",
    daysLeft: "",
    image: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Get token

    if (!token) {
      return navigate("/login"); // Redirect if not logged in
    }

    try {
      const response = await fetch("http://localhost:5001/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Project Created Successfully!");
        navigate("/projects");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Start a Campaign</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Project Name" onChange={handleChange} className="w-full p-2 mb-3 border rounded"/>
        <textarea name="description" placeholder="Project Description" onChange={handleChange} className="w-full p-2 mb-3 border rounded"></textarea>
        <input type="text" name="category" placeholder="Category" onChange={handleChange} className="w-full p-2 mb-3 border rounded"/>
        <input type="number" name="target" placeholder="Funding Target (₹)" onChange={handleChange} className="w-full p-2 mb-3 border rounded"/>
        <input type="number" name="daysLeft" placeholder="Days Left" onChange={handleChange} className="w-full p-2 mb-3 border rounded"/>
        <input type="text" name="image" placeholder="Image URL (optional)" onChange={handleChange} className="w-full p-2 mb-3 border rounded"/>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Project</button>
      </form>
    </div>
  );
};

export default StartProject;
