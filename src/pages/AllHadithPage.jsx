import { Link } from 'react-router-dom';


function AllHadithPage() {
  return (
    <div>
        <Link to="/hadith-bukhari ">
        Сахих Аль-Бухари
        </Link>
        <Link to="/hadith-muslim ">
        Сахих Муслим
        </Link>
                <Link to="/hadith-abudawud ">
        Абу Дауд
        </Link>

       
    </div>
  )
}

export default AllHadithPage