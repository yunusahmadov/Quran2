// AudioEditions.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AudioEditions() {
  const [editions, setEditions] = useState([]);
  const [selectedEdition, setSelectedEdition] = useState('');
  const [surahNumber, setSurahNumber] = useState('1'); // Default to Surah 1 for simplicity

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://api.alquran.cloud/v1/edition?format=audio')
      .then(response => {
        setEditions(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching audio editions:', error);
      });
  }, []);

  const handleEditionChange = (e) => {
    setSelectedEdition(e.target.value);
  };

  const handlePlaySurah = () => {
    navigate(`/audio/surah/${surahNumber}`, { state: { selectedEdition } });
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Select an Audio Edition</h1>
      <select className="border rounded p-2 mb-4" onChange={handleEditionChange}>
        <option value="">Select Edition</option>
        {editions.map(edition => (
          <option key={edition.identifier} value={edition.identifier}>
            {edition.englishName} ({edition.format})
          </option>
        ))}
      </select>
      <button 
        className="bg-lime-500 text-white rounded p-2" 
        onClick={handlePlaySurah}
        disabled={!selectedEdition}
      >
        Play Surah
      </button>
    </div>
  );
}

export default AudioEditions;
