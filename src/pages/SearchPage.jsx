import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [empty, setEmpty] = useState(false);

  const handleSearch = async () => {
    if (searchTerm) {
      try {
        const response = await axios.get('https://api.alquran.cloud/v1/quran/ru.kuliev');

        const allAyahs = response.data.data.surahs.flatMap((surah, surahIndex) =>
          surah.ayahs.map(ayah => ({
            ...ayah,
            surahNumber: surahIndex + 1,
            surahEnglishName: surah.englishName,
          }))
        );

        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        
        const filteredAyahs = allAyahs.filter(ayah =>
          ayah.text.toLowerCase().includes(lowerCaseSearchTerm)
        );

        setSearchResults(filteredAyahs);
        setEmpty(filteredAyahs.length === 0);
      } catch (error) {
        console.error('Error searching ayahs:', error);
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="text-center title-page">Искать в Коране</h1>
      </div>
      <div className="p-5 md:p-3 text-center">
        <p className="text-lg font-medium text-gray-700 mt-4 raleway">
          Здесь вы можете искать слова и аяты из Корана.
        </p>
        <div className="flex items-center bg-gray-100 p-5 rounded-lg shadow-md mb-6">
          <input
            className="input-search"
            type="text"
            placeholder="Введите текст"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch} className="btn-search ml-1">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="flex flex-col gap-5">
          {searchResults.length > 0 ? (
            searchResults.map((result) => (
              <div key={result.number} className="card">
                <div className='flex flex-col md:flex-row md:justify-between'>
                  <Link to={`/surah/${result.surahNumber}`} className="text-blue-600 hover:underline">
                    <p>Surah {result.surahNumber} - {result.surahEnglishName}</p>
                  </Link>
                  <p className="text-gray-500">Аят {result.numberInSurah}</p>
                </div>
                <p className="mt-2 raleway">{result.text}</p>
              </div>
            ))
          ) : (
            <div className='flex justify-center items-center'>
              {empty && <p className="no-results">Ничего не найдено</p>}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchPage;
