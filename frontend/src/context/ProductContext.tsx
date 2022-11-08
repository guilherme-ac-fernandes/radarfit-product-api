import { createContext } from 'react';
import { IProduct } from './ProductProvider';

// Tipagem do contexto proveniente do vídeo presente no Youtube (autor: Huriel)
// source: https://www.youtube.com/watch?v=fPR-Z56BDyg
interface IContextValue {
  products: IProduct[],
  loading: boolean,
}

const inicialValue = {
  products: [],
  loading: true,
}

const ProductContext = createContext<IContextValue>(inicialValue);

export default ProductContext;
