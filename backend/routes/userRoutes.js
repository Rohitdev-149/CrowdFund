const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');
const Project = require('../models/Project');
const multer = require('multer');
const path = require('path');

// Configure multer for profile image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (validTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPG and PNG are allowed.'));
        }
    }
});

// Get user profile data
const getUserProfile = async (req, res) => {
    try {
        console.log('Fetching profile for user:', req.user.id);
        
        const user = await User.findById(req.user.id)
            .select('-password')
            .populate({
                path: 'campaigns',
                model: Project,
                select: 'name description target raised status createdAt'
            });

        if (!user) {
            console.log('User not found:', req.user.id);
            return res.status(404).json({ message: 'User not found' });
        }

        // Transform the campaigns data
        const transformedUser = {
            id: user._id,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,
            createdAt: user.createdAt,
            campaigns: user.campaigns.map(campaign => ({
                _id: campaign._id,
                title: campaign.name,
                description: campaign.description,
                status: campaign.raised >= campaign.target ? "Completed" : "Active",
                targetAmount: campaign.target,
                amountRaised: campaign.raised || 0,
                createdAt: campaign.createdAt
            }))
        };

        console.log('Sending user data:', transformedUser);
        res.json(transformedUser);
    } catch (error) {
        console.error('Error in getting user profile:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
};

// Update profile image
router.post('/update-profile-image', auth, upload.single('profileImage'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const imageUrl = `/uploads/${req.file.filename}`;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { profileImage: imageUrl },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ 
            message: 'Profile image updated successfully',
            profileImage: imageUrl
        });
    } catch (error) {
        console.error('Error updating profile image:', error);
        res.status(500).json({ 
            message: 'Failed to update profile image',
            error: error.message
        });
    }
});

// Both /me and /profile endpoints use the same handler
router.get('/me', auth, getUserProfile);
router.get('/profile', auth, getUserProfile);

module.exports = router; 