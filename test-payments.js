const axios = require('axios');

async function testPayments() {
    try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No token found. Please log in first.');
            return;
        }

        // Test creating a payment
        console.log('Creating test payment...');
        const createResponse = await axios.post(
            'http://localhost:5001/api/payments/test-payment',
            {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('Create payment response:', createResponse.data);

        // Check all payments
        console.log('\nFetching all payments...');
        const allPaymentsResponse = await axios.get(
            'http://localhost:5001/api/payments/debug-all-payments',
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('All payments:', allPaymentsResponse.data);

        // Check user's payment history
        console.log('\nFetching user payment history...');
        const historyResponse = await axios.get(
            'http://localhost:5001/api/payments/user-history',
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('User payment history:', historyResponse.data);

    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
}

testPayments(); 