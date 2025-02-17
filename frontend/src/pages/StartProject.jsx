import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StartProject = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    target: "",
    daysLeft: "",
    image: null,
  });

  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];

      if (file && file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB.");
        return;
      }

      setFormData({ ...formData, image: file }); 
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, category, target, daysLeft } = formData;

    
    if (!name || !description || !category || !target || !daysLeft) {
      alert("Please fill out all required fields.");
      return;
    }

    const targetAmount = parseFloat(target);
    const daysLeftAmount = parseInt(daysLeft);

    if (isNaN(targetAmount) || isNaN(daysLeftAmount)) {
      alert("Target and Days Left should be valid numbers.");
      return;
    }

    const token = localStorage.getItem("token"); 

    if (!token) {
      return navigate("/login"); 
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("target", targetAmount);
    formDataToSend.append("daysLeft", daysLeftAmount);

    if (formData.image) {
      formDataToSend.append("image", formData.image); 
    }

    setIsLoading(true); 

    try {
      const response = await fetch("http://localhost:5001/api/projects", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
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
      alert("An error occurred while creating the project.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="max-w-xl mx-auto p-16 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Start a Campaign</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Project Name"
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <textarea
          name="description"
          placeholder="Project Description"
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="number"
          name="target"
          placeholder="Funding Target (₹)"
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="number"
          name="daysLeft"
          placeholder="Days Left"
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isLoading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
};

export default StartProject;
