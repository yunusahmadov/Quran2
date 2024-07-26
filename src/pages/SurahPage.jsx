import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import ico from '../images/ayah.png';

import norepeat from '../images/no-repeat.png'
import repeat from '../images/repeat.png'


function SurahPage() {
  const { surahNumber } = useParams();

  const [ayahs, setAyahs] = useState([]);
  const [surahName, setSurahName] = useState('');
  const [arabText, setArabText] = useState([]);
  const [arabTextVisible, setArabTextVisible] = useState(true);
  const [selectedAyah, setSelectedAyah] = useState(null);
  const [audioEdition, setAudioEdition] = useState('ar.alafasy'); // Default audio edition identifier
  const [audioEditions, setAudioEditions] = useState([]);
  const [isLooping, setIsLooping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const audioRef = useRef(null);

  useEffect(() => {
    axios.get(`https://api.alquran.cloud/v1/surah/${surahNumber}/ru.kuliev`)
      .then(response => {
        setAyahs(response.data.data.ayahs);
        setSurahName(response.data.data.englishName);
      })
      .catch(error => {
        console.error('Error fetching Surah ayahs:', error);
      });
  }, [surahNumber]);

  useEffect(() => {
    const fetchQuranText = async () => {
      try {
        const response = await axios.get('  ');
        setArabText(response.data.data.surahs[Number(surahNumber) - 1].ayahs);
      } catch (error) {
        console.error('Error fetching Quran text:', error);
      }
    };
    fetchQuranText();
  }, [surahNumber]);

  useEffect(() => {
    const fetchAudioEditions = async () => {
      try {
        const response = await axios.get('https://api.alquran.cloud/v1/edition?format=audio&type=versebyverse');
        setAudioEditions(response.data.data.map(edition => ({
          value: edition.identifier,
          label: edition.englishName,
        })));
      } catch (error) {
        console.error('Error fetching audio editions:', error);
      }
    };
    fetchAudioEditions();
  }, []);

  const fetchAyahAudio = async (ayahNumber) => {
    try {
      const response = await axios.get(`https://api.alquran.cloud/v1/ayah/${surahNumber}:${ayahNumber}/${audioEdition}`);
      console.log(response.data.data.audio);

      return response.data.data.audio;
    } catch (error) {
      console.error('Error fetching Ayah audio:', error);
      return null;
    }
  };

  const handleAyahClick = async (ayah, index) => {
    const audioUrl = await fetchAyahAudio(ayah.numberInSurah);
    setSelectedAyah({ text: ayah.text, arabicText: arabText[index]?.text, audio: audioUrl });
  };

  const handleReaderChange = (selectedOption) => {
    setAudioEdition(selectedOption.value);
  };

  const toggleLoop = () => {
    if (audioRef.current) {
      audioRef.current.loop = !audioRef.current.loop;
      setIsLooping(audioRef.current.loop);
    }
  };

  // Filter ayahs based on search query
  const filteredAyahs = ayahs.filter(ayah =>
    ayah.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-5">
      <div className='flex items-center justify-center text-2xl py-5'>
        <h1 className='surah-name'>Сура- </h1>
        <h2 className='text-2xl surah-name'>{surahName}</h2>
      </div>
      <div className='flex flex-col gap-5 p-8'>
        <div className="flex items-center justify-between gap-4 sm:flex-col ">
          <button className='btn-toggle text-md' onClick={() => setArabTextVisible(!arabTextVisible)}>
            {arabTextVisible ? 'Скрыть Арабский текст' : 'Показать Арабский текст'}
          </button>
          <div className="flex justify-center items-center gap-2">
            <p className='choose text-lg'>Выберите чтеца:</p>
          <Select
            className="select-reader w-[210px]"
            value={audioEditions.find(option => option.value === audioEdition)}
            onChange={handleReaderChange}
            options={audioEditions}
          />
          </div>
        </div>
        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Поиск по аяту"
            className="w-full p-2 border border-gray-300 rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {filteredAyahs.map((ayah, index) => (
          <div
            key={ayah.number}
            className='ayah-card cursor-pointer p-4 mb-4 bg-white rounded-lg shadow-lg transition-transform duration-200 ease-in-out transform '
            onClick={() => handleAyahClick(ayah, index)}
          >
            <div className='flex p-5 md:flex-col justify-center items-center '>
              <div className='relative flex items-center justify-center'>
                <img src={ico} alt="" className='ayah-icon' />
                <p className='absolute top-[9px] text-xl font-bold text-gray-700'>{ayah.numberInSurah}</p>
              </div>
              <div className='flex flex-col w-full ml-5 md:justify-center items-center'>
                <div className='ayah-text text-lg'>{ayah.text}</div>
                {arabTextVisible && <div className='arabic-text text-lg'>{arabText[index]?.text}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedAyah && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="text-xl font-semibold mb-4">Детали</h2>
            <p className="mb-2">{selectedAyah.text}</p>
            <p className='arab-text'>{selectedAyah.arabicText}</p>
            {selectedAyah.audio && (
              <div className="audio-player">
                <audio ref={audioRef} src={selectedAyah.audio} className="w-full mt-4" controls />
                <button onClick={toggleLoop} className="loop-button">
                <img className="w-6 ml-4 mt-2" src={isLooping ? norepeat : repeat} alt="Loop Toggle" />
                </button>
              </div>
            )}
            <button className="modal-button mt-4" onClick={() => setSelectedAyah(null)}>
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SurahPage;
