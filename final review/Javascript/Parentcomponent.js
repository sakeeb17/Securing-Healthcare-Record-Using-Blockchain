import React, { useState } from 'react';
import MedicalHistoryFetcher from './MedicalHistoryFetcher';
import MedicalHistoryForm from './MedicalHistoryForm';

const App = () => {
    const [medicalHistoryData, setMedicalHistoryData] = useState(null);

    // This function handles the fetched medical history data
    const handleMedicalHistoryFetch = (data) => {
        setMedicalHistoryData(data);
    };

    return (
        <div className="app-container">
            {!medicalHistoryData ? (
                // If no medical history data is present, show the fetcher
                <MedicalHistoryFetcher onFetch={handleMedicalHistoryFetch} />
            ) : (
                // Once the data is fetched, show the form with the fetched data
                <MedicalHistoryForm existingData={medicalHistoryData} />
            )}
        </div>
    );
};

export default App;
