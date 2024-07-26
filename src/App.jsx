import React from 'react';
import QuranEditions from './actions/QuranEditions';
import Navigation from './components/Navigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SurahPage from './pages/SurahPage';
import SearchPage from './pages/SearchPage';
import Nav from './components/Nav';
import Footer from './components/Footer';
import AudioEditions from './components/AudioEditions';
import SurahAudio from './components/SurahAudio';
import BukhariPage from './pages/Bukhari';
import BukhariSection from './components/Bukhari/BukhariSection';
import AllHadithPage from './pages/AllHadithPage';
import HadithMuslim from './components/Muslim/MuslimSection';
import DawudPage from './pages/Dawud';
import HadithAbuDawud from './components/AbuDawud/AbuDawudSection';
import AbuDawudSection from './components/AbuDawud/AbuDawudSection';
import MuslimPage from './pages/MuslimPage';
import MuslimSection from './components/Muslim/MuslimSection';
import PageNotFound from './pages/PageNotFound';

const App = () => {
  return (
    <div className='w-full'>
      <BrowserRouter>
        <div className='flex flex-col justify-between h-[100vh]'>
          <Nav />
          <Routes>
            <Route path="/" element={<QuranEditions />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/audio" element={<AudioEditions />} />
            <Route path="/surah/:surahNumber" element={<SurahPage />} />
            <Route path="/audio/surah/:surahNumber" element={<SurahAudio />} />
            {/* <Route path="/hadith-muslim" element={<HadithMuslim />} /> */}
            {/* <Route path="/hadith/:id" element={<Hadith />} /> */}
            {/* <Route path="/allhadith" element={<AllHadithPage />} /> */}


            <Route path="/hadith-bukhari" element={<BukhariPage />} />
            <Route path="/bukhari/:sectionId" element={<BukhariSection />} />

            <Route path="*" element={<PageNotFound />}/>
{/* 
            <Route path="/hadith-abudawud" element={<DawudPage/>} />
            <Route path="/abudawud/:sectionId" element={<AbuDawudSection />} />

            <Route path="/hadith-muslim" element={<MuslimPage/>} />
            <Route path="/muslim/:sectionId" element={<MuslimSection />} /> */}



          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;














