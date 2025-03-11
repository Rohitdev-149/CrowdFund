const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    razorpay_payment_id: {
        type: String,
        required: true
    },
    razorpayOrderId: {
        type: String,
        required: true
    },
    projectTitle: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'completed'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Drop all indexes and recreate them
paymentSchema.statics.resetIndexes = async function() {
    try {
        await this.collection.dropIndexes();
        console.log('Dropped all indexes');
        
        // Create new indexes
        await this.collection.createIndex({ user: 1, createdAt: -1 });
        await this.collection.createIndex({ razorpayOrderId: 1 }, { unique: true });
        console.log('Created new indexes');
    } catch (error) {
        console.error('Error resetting indexes:', error);
        throw error;
    }
};

const Payment = mongoose.model('Payment', paymentSchema);

// Reset indexes on model initialization
Payment.resetIndexes().catch(console.error);

module.exports = Payment; 