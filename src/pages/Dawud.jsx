import React from 'react';
import { Link } from 'react-router-dom';
// import data from '../abudawud.json';

function DawudPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-center text-2xl py-5">
        <h1 className="text-3xl font-extrabold text-gray-900 title-page">Абу Дауд</h1>
      </div>
      <ul className="space-y-6 p-8">
        {Object.entries(data.metadata.sections).map(([key, value]) => (
          <li key={key} className="p-4 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-transform duration-200 ease-in-out transform lora">
            <Link to={`/abudawud/${key}`} className="text-gray-800 hover:text-blue-800 font-medium ">
            {value}
            </Link>
          </li> 
        ))}
      </ul>
    </div>
  );
}

export default DawudPage;
