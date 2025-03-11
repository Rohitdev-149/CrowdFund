import React, { useState } from 'react';
import axios from 'axios';

function TestPayments() {
    const [results, setResults] = useState('');
    const [error, setError] = useState('');

    const runTests = async () => {
        try {
            setResults('Running tests...\n');
            setError(''); // Clear any previous errors
            const token = localStorage.getItem('token');
            
            if (!token) {
                throw new Error('No token found. Please log in first.');
            }

            // First check if there are any projects
            setResults(prev => prev + '\nChecking for projects...');
            const projectsResponse = await axios.get(
                'http://localhost:5001/api/projects',
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            if (!projectsResponse.data || projectsResponse.data.length === 0) {
                throw new Error('No projects found in database. Please create a project first.');
            }

            setResults(prev => prev + `\nFound ${projectsResponse.data.length} projects.`);

            // Test creating a payment
            setResults(prev => prev + '\nCreating test payment...');
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
            setResults(prev => prev + '\nCreate payment response: ' + JSON.stringify(createResponse.data, null, 2));

            // Check all payments
            setResults(prev => prev + '\n\nFetching all payments...');
            const allPaymentsResponse = await axios.get(
                'http://localhost:5001/api/payments/debug-all-payments',
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            setResults(prev => prev + '\nAll payments: ' + JSON.stringify(allPaymentsResponse.data, null, 2));

            // Check user's payment history
            setResults(prev => prev + '\n\nFetching user payment history...');
            const historyResponse = await axios.get(
                'http://localhost:5001/api/payments/user-history',
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            setResults(prev => prev + '\nUser payment history: ' + JSON.stringify(historyResponse.data, null, 2));

        } catch (error) {
            console.error('Error:', error);
            const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;
            const errorDetails = error.response?.data?.details;
            
            setError(`Error: ${errorMessage}\n\nDetails: ${JSON.stringify(errorDetails, null, 2)}`);
            setResults(prev => prev + '\n\nERROR: ' + errorMessage);
        }
    };

    return (
        <div className="p-4 mt-24">
            <h1 className="text-2xl font-bold mb-4">Payment Tests</h1>
            <div className="mb-4">
                <p className="text-gray-600">This page will help test the payment functionality:</p>
                <ul className="list-disc ml-6 mt-2">
                    <li>Creates a test payment</li>
                    <li>Checks all payments in the database</li>
                    <li>Verifies your payment history</li>
                </ul>
            </div>
            <button
                onClick={runTests}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Run Tests
            </button>
            {error && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
                    <pre className="whitespace-pre-wrap">{error}</pre>
                </div>
            )}
            {results && (
                <pre className="mt-4 p-4 bg-gray-100 rounded whitespace-pre-wrap">
                    {results}
                </pre>
            )}
        </div>
    );
}

export default TestPayments; 