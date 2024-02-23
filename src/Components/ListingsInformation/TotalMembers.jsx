import React, { useState } from 'react';

const TotalMembers = ({ total }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  if (total === undefined || total === null || isNaN(total)) {
    return (
      <div>
        <p>Error: Los datos de cantidad de personas son incorrectos o no están disponibles.</p>
      </div>
    );
  }

  return (
    <div>
      <button onClick={toggleExpanded}>
        {expanded ? 'Ocultar cantidad de personas registradas' : 'Mostrar cantidad de personas registradas'}
      </button>
      {expanded && (
        <p>{total}</p>
      )}
    </div>
  );
};

export default TotalMembers;
