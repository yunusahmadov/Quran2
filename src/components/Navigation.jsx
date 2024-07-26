import React, { useState } from 'react'
import fetchResults from '../actions/GetWord';


function Navigation() {

    
const [inputValue, setInputValue] = useState('');
const [results, setResults] = useState([]);

const handleInputChange = (event) => {
  setInputValue(event.target.value);
};

const handleSearch = async () => {
    const apiResults = await fetchResults(inputValue); // Используем функцию из api.js
    setResults(apiResults);
  };
  return (
    <div >
        <div className='bg-lime-800 p-2 flex justify-center'>
        <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleSearch}>Поиск</button>
        </div>

      <div>
        {results.map((result, index) => (
          <div key={index}>
            <p>
              Сура {result.surah_no}, аят {result.verse_no}
            </p>
            <p>{result.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Navigation