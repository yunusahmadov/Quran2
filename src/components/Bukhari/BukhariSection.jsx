import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import hadithsData from '../../bukhari.json';

const BukhariSection = () => {
  const { sectionId } = useParams();
  const [searchText, setSearchText] = useState(''); // Состояние для строки поиска

  useEffect(() => {
    window.scrollTo(0, 0); // Скролл к верхней части страницы
  }, [sectionId]);

  // Фильтруем хадисы, чтобы выбрать только те, которые относятся к текущему разделу
  const sectionHadiths = hadithsData.hadiths.filter(hadith => hadith.reference.book === parseInt(sectionId));

  // Фильтруем хадисы по строке поиска
  const filteredHadiths = sectionHadiths.filter(hadith => hadith.text.toLowerCase().includes(searchText.toLowerCase()));

  // Проверяю, существуют ли хадисы для данного sectionId
  if (sectionHadiths.length === 0) {
    return <div>Раздел не найден или хадисы не найдены.</div>;
  }

  // Преобразую объект в массив
  const sectionsArray = Object.entries(hadithsData.metadata.sections);

  // Использую filter для поиска нужного раздела
  const filteredSections = sectionsArray.filter(([id, name]) => id === sectionId.toString());

  // Получаю название раздела из первого элемента массива
  const sectionName = filteredSections.length > 0 ? filteredSections[0][1] : 'Раздел не найден';

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-center text-2xl py-5">
        <h2 className="text-2xl text-green-900 ml-2 lora sm:text-xl md:text-lg lg:text-base xl:text-lg">
          {sectionName}
        </h2>
      </div>
 

      <div className="flex items-center bg-gray-100 p-5 rounded-lg shadow-md mb-6">
      <input
          type="text"
          placeholder="Поиск по тексту хадиса"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
              className="input-search"
        />
      </div>
      
      <div className="space-y-6 p-0 sm:p-3">
        {filteredHadiths.map((hadith) => (
          <div
            key={hadith.hadithnumber}
            className="ayah-card p-4 mb-4 bg-white rounded-lg shadow-lg border border-gray-200"
          >
            <div className="flex p-5 md:flex-col gap-2 justify-center items-center sm:p-0">
              <div className="relative flex items-center justify-center">
                <p className="text-xl font-bold text-gray-700 text-center border-b-0 lora sm:text-lg md:text-base  xl:text-base md:border-gray-500 md:border-b-2">
                  Хадис № {hadith.hadithnumber}
                </p>
              </div>
              <div className="flex flex-col w-full ml-5 md:justify-center items-center raleway">
                <div className="ayah-text text-lg md:text-base sm:text-sm">
                  {hadith.text === "" ? "Перевода нет" : hadith.text}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BukhariSection;
