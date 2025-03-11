const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Payment = require('../models/Payment');
const Project = require('../models/Project');

// Test database connection
router.get('/test-db', auth, async (req, res) => {
    try {
        // Test Payment collection
        const paymentCount = await Payment.estimatedDocumentCount();
        const samplePayment = await Payment.findOne();
        
        // Test Project collection
        const projectCount = await Project.estimatedDocumentCount();
        const sampleProject = await Project.findOne();

        res.json({
            status: 'Database connection successful',
            collections: {
                payments: {
                    count: paymentCount,
                    sample: samplePayment ? {
                        id: samplePayment._id,
                        amount: samplePayment.amount,
                        projectTitle: samplePayment.projectTitle
                    } : null
                },
                projects: {
                    count: projectCount,
                    sample: sampleProject ? {
                        id: sampleProject._id,
                        name: sampleProject.name,
                        target: sampleProject.target
                    } : null
                }
            }
        });
    } catch (error) {
        console.error('Database test failed:', error);
        res.status(500).json({
            status: 'Database connection failed',
            error: error.message
        });
    }
});

// Test route to create a sample payment (FOR TESTING ONLY)
router.post('/test-payment', auth, async (req, res) => {
    try {
        console.log('Creating test payment for user:', req.user.id);
        console.log('Request body:', req.body);
        
        let { amount = 100, projectId } = req.body;
        const paymentAmount = Number(amount);

        // If no projectId is provided, find a suitable project
        if (!projectId) {
            const availableProject = await Project.findOne({
                user: { $ne: req.user.id },  // Find a project not created by current user
                status: 'active'
            });

            if (!availableProject) {
                return res.status(404).json({
                    message: 'No suitable project found',
                    error: 'Could not find an active project for testing payment'
                });
            }
            projectId = availableProject._id;
            console.log('Selected project for testing:', projectId);
        }

        if (paymentAmount <= 0) {
            return res.status(400).json({
                message: 'Invalid amount',
                error: 'Amount must be greater than 0',
                received: paymentAmount
            });
        }

        if (paymentAmount > 1000000) {
            return res.status(400).json({
                message: 'Invalid amount',
                error: 'Amount exceeds maximum limit',
                received: paymentAmount,
                limit: 1000000
            });
        }

        const User = require('../models/User');
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                error: 'Unable to find user in database',
                userId: req.user.id
            });
        }

        // Find the specific project
        const project = await Project.findById(projectId).populate('user');
        if (!project) {
            return res.status(404).json({
                message: 'Project not found',
                error: 'Unable to find specified project',
                projectId
            });
        }

        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(7);
        const razorpay_payment_id = `test_pay_${timestamp}_${randomStr}`;
        const razorpayOrderId = `test_order_${timestamp}_${randomStr}`;

        const testPayment = new Payment({
            user: user._id,
            project: project._id,
            projectTitle: project.name,
            amount: paymentAmount,
            razorpay_payment_id,
            razorpayOrderId,
            status: 'completed',
            createdAt: new Date()
        });

        await testPayment.save();

        // Update project's raised amount
        const updatedProject = await Project.findOneAndUpdate(
            { _id: project._id },
            { $inc: { raised: paymentAmount } },
            { new: true }
        );

        if (!updatedProject) {
            await Payment.findByIdAndDelete(testPayment._id);
            return res.status(500).json({
                message: 'Failed to update project',
                error: 'Project update failed after payment'
            });
        }

        const savedPayment = await Payment.findById(testPayment._id)
            .populate('project', 'name target raised status')
            .populate('user', 'name email');

        res.json({ 
            message: 'Test payment created successfully',
            payment: {
                id: savedPayment._id,
                amount: savedPayment.amount,
                projectTitle: savedPayment.projectTitle,
                razorpay_payment_id: savedPayment.razorpay_payment_id,
                createdAt: savedPayment.createdAt,
                project: {
                    id: updatedProject._id,
                    name: updatedProject.name,
                    raised: updatedProject.raised,
                    target: updatedProject.target,
                    status: updatedProject.status
                }
            }
        });
    } catch (error) {
        console.error('Error in test payment route:', error);
        res.status(500).json({ 
            message: 'Error creating test payment', 
            error: error.message
        });
    }
});

// Get user's payment history
router.get('/user-history', auth, async (req, res) => {
    try {
        console.log('Fetching payment history for user:', req.user.id);
        
        // Find all payments for the user
        const payments = await Payment.find({ user: req.user.id })
            .select('projectTitle amount razorpay_payment_id createdAt status')
            .sort({ createdAt: -1 });

        console.log('Found payments:', payments.length);
        console.log('Sample payment:', payments[0]);

        res.json(payments);
    } catch (error) {
        console.error('Error fetching payment history:', error);
        res.status(500).json({ 
            message: 'Error fetching payment history'
        });
    }
});

// Create new payment record
router.post('/create', auth, async (req, res) => {
    try {
        console.log('Creating payment record. User:', req.user.id);
        console.log('Request body:', req.body);

        const { projectId, amount, razorpay_payment_id, razorpay_order_id } = req.body;

        if (!projectId || !amount || !razorpay_payment_id || !razorpay_order_id) {
            return res.status(400).json({ 
                message: 'Missing required fields',
                received: { projectId, amount, razorpay_payment_id, razorpay_order_id }
            });
        }

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const existingPayment = await Payment.findOne({
            $or: [
                { razorpay_payment_id },
                { razorpayOrderId: razorpay_order_id }
            ]
        });

        if (existingPayment) {
            return res.status(400).json({ message: 'Payment already recorded' });
        }

        const paymentAmount = Number(amount);
        const payment = new Payment({
            user: req.user.id,
            project: projectId,
            projectTitle: project.name,
            amount: paymentAmount,
            razorpay_payment_id,
            razorpayOrderId: razorpay_order_id,
            status: 'completed'
        });

        await payment.save();

        const updatedProject = await Project.findOneAndUpdate(
            { _id: projectId },
            { $inc: { raised: paymentAmount } },
            { new: true }
        );

        if (!updatedProject) {
            await Payment.findByIdAndDelete(payment._id);
            return res.status(500).json({
                message: 'Failed to update project',
                error: 'Project update failed after payment'
            });
        }

        const savedPayment = await Payment.findById(payment._id)
            .populate('project', 'name target raised');

        res.json({ 
            message: 'Payment recorded successfully', 
            payment: savedPayment,
            project: {
                id: updatedProject._id,
                name: updatedProject.name,
                raised: updatedProject.raised
            }
        });
    } catch (error) {
        console.error('Error recording payment:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message
        });
    }
});

// Debug route to check all payments (FOR TESTING ONLY)
router.get('/debug-all-payments', auth, async (req, res) => {
    try {
        const allPayments = await Payment.find()
            .populate('user', 'name email')
            .populate('project', 'name target raised');
        
        console.log('All payments in database:', allPayments);
        
        res.json({
            count: allPayments.length,
            payments: allPayments
        });
    } catch (error) {
        console.error('Error fetching all payments:', error);
        res.status(500).json({ message: 'Error fetching payments', error: error.message });
    }
});

module.exports = router; 