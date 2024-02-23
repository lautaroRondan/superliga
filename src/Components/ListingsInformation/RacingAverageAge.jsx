import React, { useState } from 'react';

const RacingAverageAge = ({ partners }) => {
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

  // Filtrar los socios que son del club Racing
  const racingPartners = partners.filter(partner => partner[2] === 'Racing');
  if (racingPartners.length === 0) {
    setError('No hay datos de socios para el club Racing.');
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  // Calcular la suma de las edades de los socios de Racing
  const sumAges = racingPartners.reduce((total, partner) => {
    return total + parseInt(partner[1]);
  }, 0);
  const averageAge = sumAges / racingPartners.length;

  return (
    <div>
      <button onClick={toggleExpanded}>
        {expanded ? 'Ocultar Promedio de edad de Racing' : 'Mostrar Promedio de edad de Racing'}
      </button>
      {expanded && (
        <p>{averageAge.toFixed(2)}</p>
      )}
    </div>
  );
};

export default RacingAverageAge;