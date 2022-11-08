import { ReactNode, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import ProductContext from './ProductContext';
import axios from 'axios';

const API_URL = 'http://localhost:3001/produtos';

interface Props {
  children?: ReactNode,
}

export interface IProduct {
  _id: string,
  produto: string,
  valor: number,
  descricao: string,
  created: string,
  updated: string,
}

function ProductProvider({ children }: Props) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const getAllProducts = async () => {
      setLoading(true);
      const { data } = await axios.get(API_URL);
      setProducts(data);
      setLoading(false);
    };
    getAllProducts();
  }, [])

  const contextValue = useMemo(() => ({
    products,
    setProducts,
    loading,
    setLoading,
  }), [products, setProducts, loading, setLoading]);

  return (
    <ProductContext.Provider value={ contextValue }>
      {children}
    </ProductContext.Provider>
  );
}

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductProvider;