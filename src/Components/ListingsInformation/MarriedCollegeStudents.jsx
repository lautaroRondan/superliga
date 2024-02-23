import React, { useState } from 'react';

const MarriedUniGradsList = ({ partners }) => {
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState(null);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  if (!Array.isArray(partners)) {
    setError('Los datos de socios no son válidos.');
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  // Contador para limitar la lista a los primeros 100 socios casados y universitarios
  let count = 0;
  const first100Partners = partners.reduce((accumulator, partner) => {
    if (count < 100 && partner[3] === 'Casado' && partner[4] === 'Universitario') {
      count++;
      accumulator.push(partner);
    }
    return accumulator;
  }, []);

  // Objeto para almacenar socios unicos
  const uniquePartners = {};
  first100Partners.forEach(partner => {
    const [name, age, team] = partner;
    if (!uniquePartners[name]) {
      uniquePartners[name] = { age, team };
    }
  });

  // Convertir el objeto de socios unicos a un array para facilitar el mapeo
  const partnersArray = Object.entries(uniquePartners);

  return (
    <div>
      <button onClick={toggleExpanded}>
        {expanded ? 'Ocultar Casados y Universitarios' : 'Mostrar Casados y Universitarios'}
      </button>
      {expanded && (
        <table className="partners-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {partnersArray.map(([name, { age, team }], index) => (
              <tr key={index}>
                <td>{name}</td>
                <td>{age}</td>
                <td>{team}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MarriedUniGradsList;