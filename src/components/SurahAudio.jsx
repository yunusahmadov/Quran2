// SurahAudio.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';

function SurahAudio() {
  const { surahNumber } = useParams();
  const { state } = useLocation();
  const { selectedEdition } = state || {};

  const [ayahs, setAyahs] = useState([]);

  useEffect(() => {
    if (selectedEdition && surahNumber) {
      axios.get(`https://api.alquran.cloud/v1/surah/${surahNumber}/${selectedEdition}`)
        .then(response => {
          setAyahs(response.data.data.ayahs);
        })
        .catch(error => {
          console.error('Error fetching Surah audio:', error);
        });
    }
  }, [selectedEdition, surahNumber]);

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-3">Surah Audio</h2>
      <div className="audio-container space-y-4">
        {ayahs.map(ayah => (
          <div key={ayah.number} className="audio-ayah p-3 bg-gray-100 rounded-md flex items-center space-x-4">
            <p className="text-lg font-semibold">Ayah {ayah.numberInSurah}</p>
            <audio controls src={ayah.audio} className="flex-1"></audio>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SurahAudio;
