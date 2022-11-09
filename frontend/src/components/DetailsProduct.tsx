import { useState } from 'react';
import { deleteProduct, getAllProducts } from '../helpers/requestApi';
import IProduct from '../interfaces/IProduct';
import EditFormProduct from './EditFormProduct';
import styles from '../styles/DetailsProduct.module.css';

interface DetailsProductProps {
  product: IProduct;
  favoriteProducts: IProduct[] | [];
  setFavoriteProducts: (newState: IProduct[]) => void;
  setProducts: (newState: IProduct[]) => void;
  setDetailsProduct: (newState: IProduct | object) => void;
}

export default function DetailsProduct({
  product,
  favoriteProducts,
  setFavoriteProducts,
  setProducts,
  setDetailsProduct,
}: DetailsProductProps) {
  const [edit, setEdit] = useState(false);

  const handleFavorite = () => {
    const findProduct = favoriteProducts?.findIndex(
      ({ _id }) => _id === product._id
    );
    if (findProduct >= 0) {
      const filterFavorites = favoriteProducts.filter(
        ({ _id }) => _id !== product._id
      );
      localStorage.setItem('favorite', JSON.stringify(filterFavorites));
      return setFavoriteProducts(filterFavorites);
    }
    localStorage.setItem(
      'favorite',
      JSON.stringify([...favoriteProducts, product])
    );
    return setFavoriteProducts([...favoriteProducts, product]);
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(product._id);
      const allProduct = await getAllProducts();
      setProducts(allProduct);
    } catch (error) {
      alert('Não foi possível deletar o produto!');
    }
  };

  return (
    <section className={styles.detailsProductSection}>
      <h3>{!edit ? 'Detalhes' : 'Editar Produto'}</h3>
      <span
        onClick={() => setDetailsProduct({})}
        className={`${styles.closeDetailsProduct} material-symbols-outlined`}
      >
        close
      </span>
      {!edit ? (
        <div className={styles.detailsProduct}>
          <h3>{product.produto}</h3>
          <div className={styles.detailsProductValue}>
            <p>Valor</p>
            <p>
              R$ <span>{product.valor.toFixed(2)}</span>
            </p>
          </div>
          <p>{product.descricao}</p>
          <aside className={styles.detailsButtonSection}>
            <button className={styles.iconButton} onClick={() => setEdit(true)}>
              <span className='material-symbols-outlined'>edit</span>
              Editar
            </button>
            <button className={styles.iconButton} onClick={handleFavorite}>
            <span className='material-symbols-outlined'>sell</span>
              {favoriteProducts?.find(({ _id }) => _id === product._id)
                ? 'Desfavoritar'
                : 'Favoritar'}
            </button>
            <button onClick={handleDelete}>Deletar</button>
          </aside>
        </div>
      ) : (
        <EditFormProduct product={product} setEdit={setEdit} />
      )}
    </section>
  );
}
