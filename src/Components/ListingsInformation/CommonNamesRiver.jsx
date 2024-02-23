import React, { useState } from 'react';

const CommonNamesRiver = ({ partners }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (!Array.isArray(partners) || partners.length === 0) {
    return <div>No hay datos de socios disponibles.</div>;
  }

  // Filtrar los socios que son hinchas de River
  const riverPartners = partners.filter(partner => partner && partner.length >= 3 && partner[2] === 'River');

  // Manejar el caso en que no haya hinchas de River en los datos proporcionados
  if (riverPartners.length === 0) {
    return (
      <div>No hay hinchas de River en los datos proporcionados.</div>
    );
  }

  // Obtener los nombres de los hinchas de River
  const riverNames = riverPartners.map(partner => partner[0]);

  // Calcular la frecuencia de cada nombre
  const nameFrequency = {};
  riverNames.forEach(name => {
    nameFrequency[name] = (nameFrequency[name] || 0) + 1;
  });

  // Ordenar los nombres por frecuencia
  const sortedNames = Object.keys(nameFrequency).sort((a, b) => nameFrequency[b] - nameFrequency[a]);

  // Obtener los 5 nombres más comunes
  const commonNames = sortedNames.slice(0, 5);

  return (
    <div>
      <button onClick={toggleDropdown}>
        {isOpen ? 'Ocultar Nombres comunes del hincha de River' : 'Mostrar Nombres comunes del hincha de River'}
      </button>
      {isOpen && (
        <table className="partners-table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {commonNames.map((name, index) => (
              <tr key={index}>
                <td>{name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CommonNamesRiver;