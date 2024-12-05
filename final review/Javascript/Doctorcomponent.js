import React, { useState } from 'react';
import Doctordatafetcher from './Doctordatafetcher';
import Doctordataform from './Doctordataform';

const App = () => {
    const [DoctorData, setDoctorData] = useState(null);

    // This function handles the fetched Doctors data
    const handleDoctorFetch = (data) => {
        setDoctorData(data);
    };

    return (
        <div className="app-container">
            {!DoctorData ? (
                // If no medical history data is present, show the fetcher
                <Doctordatafetcher onFetch={handleDoctorFetch} />
            ) : (
                // Once the data is fetched, show the form with the fetched data
                <Doctordataform existingData={DoctorData} />
            )}
        </div>
    );
};

export default App;
