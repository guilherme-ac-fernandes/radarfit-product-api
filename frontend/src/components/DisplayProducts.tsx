import { useContext } from 'react';
import ProductContext from '../context/ProductContext';
import { IProduct } from '../context/ProductProvider';

export default function DisplayProducts() {
  const { products, loading } = useContext(ProductContext);

  return (
    <section>
      <h3>Lista de Produtos</h3>
      {loading ? (
        <h4>Carregando...</h4>
      ) : (
        <ul>
          {products.map((product: IProduct) => {
            return (
              <li key={product._id}>
                <p>{product._id}</p>
                <p>{product.produto}</p>
                <p>{product.valor}</p>
                <p>{product.descricao}</p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
