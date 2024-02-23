import React, { useState } from 'react';
import Papa from 'papaparse';

const ImportCSV = ({ onDataLoaded }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Manejar la lectura y análisis de un archivo CSV seleccionado por el usuario
  const handleFileRead = async () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const csvBlob = new Blob([event.target.result]);
        const decoder = new TextDecoder('ISO-8859-1');
        const csv = decoder.decode(await csvBlob.arrayBuffer());
        const { data } = Papa.parse(csv, { header: false });
        const filteredData = data.filter(row => row.some(cell => cell.trim() !== ''));

        onDataLoaded(filteredData);
      } catch (error) {
        // Manejar cualquier error que ocurra durante el análisis del archivo
        setError('Error al analizar el archivo CSV');
      }
    };

    reader.readAsArrayBuffer(selectedFile);
  };


  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError(null);
  };

  const handleLoadCSV = () => {
    if (selectedFile) {
      handleFileRead();
    }
  };

  return (
    <div className="file-upload-container">
      {error && <div className="error-message">{error}</div>}
      {selectedFile && (
        <div className="file-info">
          <span>{selectedFile.name}</span>
          <button className="delete-button" onClick={handleRemoveFile}>X</button>
        </div>
      )}
      <div className="file-upload-header">
        <input type="file" id="file-input" accept=".csv" onChange={handleFileChange} className="file-input" />
        <label htmlFor="file-input" className="file-upload-button">
          <span className="file-upload-icon">+</span>
        </label>
        <h2>Cargar Archivo</h2>
      </div>
      <button onClick={handleLoadCSV} disabled={!selectedFile} className={selectedFile ? '' : 'disabled-button'}>Cargar CSV</button>
    </div>
  );
};

export default ImportCSV;
