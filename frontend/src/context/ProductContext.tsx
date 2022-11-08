import { createContext } from 'react';
import { IProduct } from './ProductProvider';

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
