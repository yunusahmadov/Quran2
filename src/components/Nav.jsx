import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import logo from '../images/logo.avif';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  const goToMain = () => {
    navigate('/');
  };

  return (
    <nav className="bg-green-800 text-white  shadow-md ">
      <div className=" mx-auto flex items-center justify-between mt-3 w-[92%] ml-auto mr-auto">
        <div className="flex items-center">
          <img onClick={goToMain} src={logo} alt="logo" className="h-10 w-10 mr-3 cursor-pointer" />
          <h1 className="text-3xl font-bold md:text-lg sm:text-base">﷽</h1>
        </div>
        <div className="md:hidden space-x-4 ">
          <Link to="/" className="px-2 py-2 rounded hover:bg-green-700 transition duration-300 nav-link lg:text-lg lg:p-1">
            Все Суры
          </Link>
          <Link to="/search" className="px-3 py-2 rounded hover:bg-green-700 transition duration-300 nav-link lg:text-lg lg:p-1">
            Искать в Коране
          </Link>
          <Link to="/hadith-bukhari" className="px-3 py-2 rounded hover:bg-green-700 transition duration-300 nav-link lg:text-lg lg:p-1">
            Хадисы
          </Link>
        </div>
        <div className="hidden md:flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      <div className={`nav-container mt-5 ${isOpen ? 'open' : ''}`}>
        <Link to="/" className="block px-4 py-2  hover:bg-green-700 transition duration-300 nav-link border-b-2 " onClick={toggleMenu}>
          Все Суры
        </Link>
        <Link to="/search" className="block px-4 py-2  hover:bg-green-700 transition duration-300 nav-link border-b-2" onClick={toggleMenu}>
          Искать в Коране
        </Link>
        <Link to="/hadith-bukhari" className="block px-4 py-2  hover:bg-green-700 transition duration-300 nav-link" onClick={toggleMenu}>
            Хадисы
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
