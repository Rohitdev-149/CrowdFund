require('dotenv').config();
const mongoose = require('mongoose');
const Payment = require('../models/Payment');

async function resetIndexes() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crowdfund');
        console.log('Connected to MongoDB');

        // Drop all indexes
        console.log('Dropping all indexes from payments collection...');
        await Payment.collection.dropIndexes();
        console.log('All indexes dropped');

        // Create new indexes
        console.log('Creating new indexes...');
        await Payment.syncIndexes();
        console.log('New indexes created');

        // List current indexes
        const indexes = await Payment.collection.getIndexes();
        console.log('Current indexes:', indexes);

        console.log('Index reset completed successfully');
    } catch (error) {
        console.error('Error resetting indexes:', error);
    } finally {
        await mongoose.disconnect();
    }
}

resetIndexes(); 