import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import data from '../bukhari.json';

function BukhariPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredSections = Object.entries(data.metadata.sections).filter(([key, value]) => 
    value.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-center text-2xl py-5">
        <h1 className="text-3xl font-extrabold text-gray-900 title-page">Сахих аль-Бухари</h1>
      </div>
      <div className="flex items-center bg-gray-100 p-5 rounded-lg shadow-md mb-6">
        <input 
          type="text" 
          className="input-search" 
          placeholder="Поиск хадисов..." 
          value={searchQuery} 
          onChange={handleSearch}
        />
      </div>
      <ul className="space-y-6 ">
        {filteredSections.map(([key, value]) => (
          <li key={key} className="p-4 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-transform duration-200 ease-in-out transform lora">
            <Link to={`/bukhari/${key}`} className="text-gray-800 hover:text-blue-800 font-medium">
              {value}
            </Link>
          </li> 
        ))}
      </ul>
    </div>
  );
}

export default BukhariPage;
