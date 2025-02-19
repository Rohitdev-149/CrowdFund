import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket, Upload, AlertCircle } from "lucide-react";

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
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];

      if (file && file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB.");
        return;
      }

      setFormData({ ...formData, image: file });
      // Create preview URL for the image
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-30 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-8 text-white">
            <div className="flex items-center justify-center mb-4">
              <Rocket className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold text-center">Start Your Campaign</h2>
            <p className="text-blue-100 text-center mt-2">
              Share your vision and start making a difference today
            </p>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your project name"
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Describe your project in detail"
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select a category</option>
                    <option value="technology">Technology</option>
                    <option value="education">Education</option>
                    <option value="environment">Environment</option>
                    <option value="community">Community</option>
                    <option value="health">Health</option>
                    <option value="arts">Arts & Culture</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Funding Target (₹)
                  </label>
                  <input
                    type="number"
                    name="target"
                    placeholder="Enter target amount"
                    onChange={handleChange}
                    min="1000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Duration (Days)
                </label>
                <input
                  type="number"
                  name="daysLeft"
                  placeholder="Number of days"
                  onChange={handleChange}
                  min="1"
                  max="90"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
                  <div className="space-y-1 text-center">
                    {previewUrl ? (
                      <div className="relative">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="mx-auto h-48 w-auto rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewUrl(null);
                            setFormData({ ...formData, image: null });
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                        >
                          <AlertCircle className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="image"
                              type="file"
                              accept="image/*"
                              onChange={handleChange}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                disabled={isLoading}
              >
                <Rocket className="w-5 h-5" />
                <span>{isLoading ? "Creating Project..." : "Launch Campaign"}</span>
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StartProject;