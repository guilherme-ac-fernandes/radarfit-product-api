import { useEffect, useState } from 'react';
import Header from './components/Header';
import DisplayProducts from './components/DisplayProducts';
import DetailsProduct from './components/DetailsProduct';
import IProduct from './interfaces/IProduct';
import axios from 'axios';

import styles from './styles/App.module.css';
import AddProductModal from './components/AddProductModal';
import { API_URL } from './helpers/requestApi';

export default function App() {
  const [detailsProduct, setDetailsProduct] = useState<IProduct | {}>({});
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<IProduct[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const storageFavorites: string | null = localStorage.getItem('favorite');
    if (storageFavorites !== null) {
      const parsedFavorites = JSON.parse(storageFavorites);
      setFavoriteProducts(parsedFavorites);
    }

    const getAllProducts = async () => {
      setLoading(true);
      const { data } = await axios.get(API_URL);
      setProducts(data);
      setLoading(false);
    };
    getAllProducts();
  }, []);

  useEffect(() => {
    if (search.length === 0) {
      const getAllProducts = async () => {
        setLoading(true);
        const { data } = await axios.get(API_URL);
        setProducts(data);
        setLoading(false);
      };
      getAllProducts();
    }
    const getProductsBySearch = async () => {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/find?q=${search}`);
      setProducts(data);
      setLoading(false);
    };
    getProductsBySearch();
  }, [search]);

  return (
    <main className={styles.main}>
      <Header search={search} setSearch={setSearch} />
      <div className={styles.addProducts}>
        <h2>Produtos</h2>
        <AddProductModal setProducts={setProducts} />
      </div>

      <section className={styles.productsListAndDetails}>
        <DisplayProducts
          products={products}
          loading={loading}
          favoriteProducts={favoriteProducts}
          setDetailsProduct={setDetailsProduct}
          detailsProduct={detailsProduct}
        />
        {'produto' in detailsProduct ? (
          <DetailsProduct
            product={detailsProduct}
            favoriteProducts={favoriteProducts}
            setFavoriteProducts={setFavoriteProducts}
            setProducts={setProducts}
            setDetailsProduct={setDetailsProduct}
          />
        ) : (
          <div className={styles.textPlaceholder}>
            <p>
              Clique em um produto para visualizar mais detalhes e mais op????es.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
