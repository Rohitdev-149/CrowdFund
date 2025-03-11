import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FiLogOut, FiActivity, FiFlag, FiCalendar, FiClock, FiTrendingUp, FiRefreshCw, FiAlertCircle, FiUser, FiTarget, FiCamera } from "react-icons/fi";
import { Button, Card, Badge, Container, PageHeader, LoadingSpinner, EmptyState } from "../components/common/index.jsx";
import { motion, AnimatePresence } from "framer-motion";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const fetchData = async (showRefresh = false) => {
    if (showRefresh) {
      setRefreshing(true);
    }
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const userRes = await axios.get("http://localhost:5001/api/users/me", config);
      setUserData(userRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError(error.response?.data?.message || "Failed to load profile data");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  const handleRefresh = () => fetchData(true);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPG or PNG)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('profileImage', file);

      const token = localStorage.getItem("token");
      if (!token) {
        alert('You must be logged in to upload a profile image');
        return;
      }

      console.log('Uploading image...', {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
      });

      const response = await axios.post(
        "http://localhost:5001/api/users/update-profile-image",
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log('Upload response:', response.data);

      if (response.data.profileImage) {
        setUserData(prev => ({
          ...prev,
          profileImage: response.data.profileImage
        }));
        // Force a refresh of the profile data
        fetchData();
      } else {
        throw new Error('No profile image URL in response');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data
      });
      alert(error.response?.data?.message || 'Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const calculateProgress = (raised, target) => {
    const percentage = (raised / target) * 100;
    return Math.min(100, percentage);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" className="text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-red-500 mb-4 flex items-center gap-2 bg-red-50 px-6 py-3 rounded-lg">
          <FiAlertCircle size={24} />
          <span>{error}</span>
        </div>
        <Button variant="primary" onClick={handleRefresh}>
          <FiRefreshCw className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Try Again
        </Button>
      </div>
    );
  }

  // Calculate total amount raised across all campaigns
  const totalRaised = userData?.campaigns?.reduce((total, campaign) => {
    return total + (campaign.amountRaised || campaign.raised || 0);
  }, 0) || 0;

  // Calculate total target amount across all campaigns
  const totalTarget = userData?.campaigns?.reduce((total, campaign) => {
    return total + (campaign.targetAmount || campaign.target || 0);
  }, 0) || 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 pt-24"
    >
      <Container className="max-w-5xl py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6">
              <div className="relative group">
                {userData?.profileImage ? (
                  <img
                    src={`http://localhost:5001${userData.profileImage}`}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-gray-100"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center ring-4 ring-gray-100">
                    <FiUser size={40} className="text-blue-500" />
                  </div>
                )}
                
                {/* Upload Overlay */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  disabled={uploading}
                >
                  {uploading ? (
                    <LoadingSpinner size="sm" className="text-white" />
                  ) : (
                    <div className="text-white flex flex-col items-center">
                      <FiCamera size={20} />
                      <span className="text-xs mt-1">Change Photo</span>
                    </div>
                  )}
                </button>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />

                {/* Online Status Indicator */}
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-400 rounded-full border-4 border-white shadow-lg"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {userData?.name}
                </h1>
                <p className="text-gray-500 text-sm">{userData?.email}</p>
                <p className="text-gray-400 text-xs mt-1">Member since {formatDate(userData?.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="secondary" 
                onClick={handleRefresh} 
                disabled={refreshing}
                className="text-gray-700 hover:bg-gray-100"
              >
                <FiRefreshCw className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button 
                variant="danger" 
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <FiLogOut className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Campaign Statistics */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <FiActivity className="text-blue-500" />
                <h2 className="text-lg font-semibold text-gray-900">Campaign Statistics</h2>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FiFlag className="text-blue-500" />
                    <span className="text-sm font-medium text-gray-600">Total Campaigns</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{userData?.campaigns?.length || 0}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FiTarget className="text-green-500" />
                    <span className="text-sm font-medium text-gray-600">Total Raised</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRaised)}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Overall Progress</span>
                  <span className="text-sm text-gray-500">{Math.round((totalRaised / totalTarget) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((totalRaised / totalTarget) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>Raised: {formatCurrency(totalRaised)}</span>
                  <span>Target: {formatCurrency(totalTarget)}</span>
                </div>
              </div>

              <Button 
                variant="primary" 
                as={Link} 
                to="/start-project"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Start New Campaign
              </Button>
            </div>
          </div>

          {/* My Campaigns */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <FiFlag className="text-blue-500" />
                <h2 className="text-lg font-semibold text-gray-900">My Campaigns</h2>
              </div>
            </div>

            <div className="space-y-4">
              {userData?.campaigns?.length > 0 ? (
                userData.campaigns.map((campaign) => (
                  <div
                    key={campaign._id}
                    className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                          {campaign.title || campaign.name}
                        </h3>
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">
                              Target: {formatCurrency(campaign.targetAmount || campaign.target)}
                            </span>
                            <span className="text-gray-500">
                              Raised: {formatCurrency(campaign.amountRaised || campaign.raised)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div
                              className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
                              style={{
                                width: `${calculateProgress(
                                  campaign.amountRaised || campaign.raised,
                                  campaign.targetAmount || campaign.target
                                )}%`
                              }}
                            />
                          </div>
                          <p className="text-gray-500 text-sm flex items-center gap-2">
                            <FiClock className="text-gray-400" />
                            Created {formatDate(campaign.createdAt)}
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ml-4 ${
                        campaign.status === "active"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}>
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FiFlag className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                  <p className="text-gray-600 font-medium">No campaigns yet</p>
                  <p className="text-gray-400 text-sm mt-1">Start your first campaign today</p>
                  <Button 
                    variant="primary" 
                    as={Link} 
                    to="/start-project"
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white text-sm"
                  >
                    Create Campaign
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default Profile; 