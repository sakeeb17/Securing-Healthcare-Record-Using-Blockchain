import React, { useState } from 'react';
import Reseacherreportfetcher from './Reseacherreportfetcher';
import Reseacherupdatereport from './Reseacherupdatereport';

const App = () => {
    const [reseacherReportData, setReseacherReportData] = useState(null);

    // This function handles the fetched Reseacher history data
    const handleReseacherreportFetch = (data) => {
        setReseacherReportData(data);
    };

    return (
        <div className="app-container">
            {!reseacherReportData ? (
                // If no Reseacher history data is present, show the fetcher
                <Reseacherreportfetcher onFetch={handleReseacherreportFetch} />
            ) : (
                // Once the data is fetched, show the form with the fetched data
                <Reseacherupdatereport existingData={Reseacherupdatereport} />
            )}
        </div>
    );
};

export default App;
