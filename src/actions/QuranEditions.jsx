import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { surahNamesRu } from '../surahnames';

function QuranEditions() {
  const [quranText, setQuranText] = useState([]);
  const [filteredQuranText, setFilteredQuranText] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://api.alquran.cloud/v1/quran/ru.kuliev')
      .then(response => {
        setQuranText(response.data.data.surahs);
        setFilteredQuranText(response.data.data.surahs);
      })
      .catch(error => {
        console.error('Error fetching Quran text:', error);
      });
  }, []);

  useEffect(() => {
    const filtered = quranText.filter(surah => {
      const isMatchName = surah.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          surah.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          surahNamesRu[surah.number - 1].toLowerCase().includes(searchTerm.toLowerCase());
      
      const isMatchNumber = searchTerm === '' || surah.number === parseInt(searchTerm, 10);
      
      return isMatchName || isMatchNumber;
    });
    setFilteredQuranText(filtered);
  }, [searchTerm, quranText]);

  const handleReadClick = (surahNumber) => {
    navigate(`/surah/${surahNumber}`);
  };

  return (
    <div className="p-5">
      <div className="flex items-center bg-gray-100 p-5 rounded-lg shadow-md mb-6">
        <input
          className="input-search"
          type="text"
          placeholder="Поиск по названию или номеру суры"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex justify-center items-center">
        <h1 className="text-center title-page">Все суры</h1>
      </div>
      <div className="flex flex-col gap-5">
        {filteredQuranText.map((text) => (
          <div
            key={text.number}
            className="btn-card"
            onClick={() => handleReadClick(text.number)}
          >
            <div className="card-content">
              <h1 className="surah-number">{text.number}</h1>
              <div className="flex flex-col text-center">
                <h2 className="surah-title">{text.name}</h2>
                <h2 className="surah-title lora">{surahNamesRu[text.number - 1]}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuranEditions;
