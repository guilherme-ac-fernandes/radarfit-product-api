import axios from 'axios';
import IProduct from '../interfaces/IProduct';

export const API_URL = 'http://localhost:3001/produtos';

export const getAllProducts = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const createProduct = async (payload: Partial<IProduct>) => {
  const { data } = await axios.post(API_URL, payload);
  return data;
};

export const updateProduct = async (id: string, payload: Partial<IProduct>) => {
  console.log(payload, `${API_URL}/${id}`);
  const { data } = await axios.put(`${API_URL}/${id}`, payload);
  return data;
};

export const deleteProduct = async (id: string) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};

export const getProductsBySearch = async (q: string) => {
  const { data } = await axios.get(`${API_URL}/find?q=${q}`);
  return data;
};
