import axios from 'axios';

const API_URL = 'http://localhost:3001/produtos';

export const getAllProducts = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

