import React, { useState } from 'react';

const MedicalHistoryFetcher = ({ onFetch }) => {
    const [ipfsHash, setIpfsHash] = useState('');
    const [error, setError] = useState('');

    const fetchMedicalHistory = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors

        try {
            const response = await fetch(`https://ipfs.io/ipfs/${ipfsHash}`);

            // Check if the response is ok
            if (!response.ok) {
                throw new Error('Failed to fetch from IPFS. Please check the hash or network.');
            }

            // Try parsing the response as JSON
            const contentType = response.headers.get('Content-Type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Fetched data is not in JSON format.');
            }

            const data = await response.json();
            onFetch(data); // Call the parent callback with fetched data

        } catch (err) {
            console.error('Error fetching or parsing data:', err);
            setError(err.message); // Set error message based on caught error
        }
    };

    return (
        <div className="container">
            <h2>Fetch Medical History</h2>
            <form onSubmit={fetchMedicalHistory}>
                <input
                    type="text"
                    placeholder="Enter IPFS Hash"
                    value={ipfsHash}
                    onChange={(e) => setIpfsHash(e.target.value)}
                    required
                />
                <button type="submit">Fetch Data</button>
            </form>

            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default MedicalHistoryFetcher;
