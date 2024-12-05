import React, { useState } from 'react';
import Hospitaldatafetcher from './Hospitaldatafetcher';
import Hospitaldataform from './Hospitaldataform';

const App = () => {
    const [HospitalData, setHospitalData] = useState(null);

    // This function handles the fetched Hospital data
    const handleHospitalFetch = (data) => {
        setHospitalData(data);
    };

    return (
        <div className="app-container">
            {!HospitalData ? (
                // If no medical history data is present, show the fetcher
                <Hospitaldatafetcher onFetch={handleHospitalFetch} />
            ) : (
                // Once the data is fetched, show the form with the fetched data
                <Hospitaldataform existingData={HospitalData} />
            )}
        </div>
    );
};

export default App;
