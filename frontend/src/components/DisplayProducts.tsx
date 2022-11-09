import IProduct from '../interfaces/IProduct';

interface DisplayProductsProps {
  products: IProduct[] | [];
  loading: boolean;
  setDetailsProduct: (newState: IProduct) => void;
  favoriteProducts: IProduct[] | [];
}

export default function DisplayProducts({
  products,
  loading,
  setDetailsProduct,
  favoriteProducts,
}: DisplayProductsProps) {

  return (
    <section>
      <h3>Lista de Produtos</h3>
      {loading ? (
        <h4>Carregando...</h4>
      ) : (
        <ul>
          {products.map((product: IProduct) => {
            return (
              <li key={product._id} onClick={() => setDetailsProduct(product)}>
                <p>{product.produto}</p>
                <p>{product.descricao}</p>
                <p>
                  R$ <span>{product.valor.toFixed(2)}</span>
                </p>
                {favoriteProducts?.find(({ _id }) => _id === product._id) && <p>Favorito</p>}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
