import IProduct from '../interfaces/IProduct';
import styles from '../styles/DisplayProducts.module.css';

interface DisplayProductsProps {
  products: IProduct[] | [];
  loading: boolean;
  setDetailsProduct: (newState: IProduct) => void;
  favoriteProducts: IProduct[] | [];
  detailsProduct: IProduct | {};
}

export default function DisplayProducts({
  products,
  loading,
  setDetailsProduct,
  favoriteProducts,
  detailsProduct,
}: DisplayProductsProps) {
  return (
    <section className={styles.displayProducts}>
      <h3>Lista de Produtos</h3>
      {loading ? (
        <h4 className={styles.loading}>Carregando...</h4>
      ) : (
        <ul className={styles.productList}>
          {products.map((product: IProduct) => {
            return (
              <li
                className={`${styles.productItem} ${
                  detailsProduct === product ? styles.selectedProduct : ''
                }`}
                key={product._id}
                onClick={() => setDetailsProduct(product)}
              >
                <div>
                  <h5>{product.produto}</h5>
                  <p>{product.descricao}</p>
                  <p>
                    R$ <span>{product.valor.toFixed(2)}</span>
                  </p>
                </div>
                <aside>
                  {favoriteProducts?.find(({ _id }) => _id === product._id) ? (
                    <span
                      className={`${styles.favorite} material-symbols-outlined`}
                    >
                      sell
                    </span>
                  ) : (
                    <span
                      className={`${styles.notFavorite} material-symbols-outlined`}
                    >
                      sell
                    </span>
                  )}
                </aside>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
