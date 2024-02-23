import React, { useState } from 'react';

const TeamStats = ({ partners }) => {
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState(null);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  if (!Array.isArray(partners) || partners.length === 0) {
    setError('No hay datos de socios disponibles.');
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  const statsByTeam = {};

  // Calcular las estadísticas por equipo
  partners.forEach(partner => {
    const team = partner[2];
    const age = parseInt(partner[1]);

    if (!statsByTeam[team]) {
      statsByTeam[team] = {
        totalPartners: 0,
        totalAges: 0,
        youngestAge: Infinity,
        oldestAge: -Infinity
      };
    }

    // Actualizar las estadísticas del equipo
    const stats = statsByTeam[team];
    stats.totalPartners++;
    stats.totalAges += age;
    stats.youngestAge = Math.min(stats.youngestAge, age);
    stats.oldestAge = Math.max(stats.oldestAge, age);
  });

  const statsArray = Object.entries(statsByTeam);
  statsArray.sort((a, b) => b[1].totalPartners - a[1].totalPartners);

  return (
    <div>
      <button onClick={toggleExpanded}>
        {expanded ? 'Ocultar estadísticas por equipo' : 'Mostrar estadísticas por equipo'}
      </button>
      {expanded && (
        <table className='partners-table'>
          <thead>
            <tr>
              <th>Equipo</th>
              <th>Promedio de Edad</th>
              <th>Menor Edad Registrada</th>
              <th>Mayor Edad Registrada</th>
              <th>Cantidad de Socios</th>
            </tr>
          </thead>
          <tbody>
            {statsArray.map(([team, stats]) => {
              // Omitir equipos vacíos o sin nombre
              if (!team || team.trim() === '') {
                return null;
              }

              // Calcular el promedio de edad del equipo
              const averageAge = stats.totalAges / stats.totalPartners;
              return (
                <tr key={team}>
                  <td>{team}</td>
                  <td>{averageAge.toFixed(2)}</td>
                  <td>{stats.youngestAge}</td>
                  <td>{stats.oldestAge}</td>
                  <td>{stats.totalPartners}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TeamStats;