import axios from 'axios';

const API_KEY = '919c1ff649msh57d36aa0e446497p1edbb4jsnde284dfee3be';
const API_HOST = 'al-quran1.p.rapidapi.com';

const fetchResults = async (inputValue) => {
  const options = {
    method: 'GET',
    url: `https://${API_HOST}/corpus/${inputValue}`,
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchResults;