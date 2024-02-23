import React, { useState } from 'react';
import ImportCSV from './Components/Import/ImportCSV';
import TotalMembers from './Components/ListingsInformation/TotalMembers';
import RacingAverageAge from './Components/ListingsInformation/RacingAverageAge';
import MarriedCollegeStudents from './Components/ListingsInformation/MarriedCollegeStudents';
import CommonNamesRiver from './Components/ListingsInformation/CommonNamesRiver';
import TeamInfo from './Components/ListingsInformation/TeamInfo';

function App() {
  const [partners, setPartners] = useState([]);

  const handleDataLoaded = (data) => {
    setPartners(data);
  };

  return (
    <div className="app-container ">
      <div className="left-section">
        <ImportCSV onDataLoaded={handleDataLoaded} />
      </div>

      {partners.length > 0 && (
        <div className="right-section">
          <div>
            <TotalMembers total={partners.length} />
            <RacingAverageAge partners={partners} />
            <MarriedCollegeStudents partners={partners} />
            <CommonNamesRiver partners={partners} />
            <TeamInfo partners={partners} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;