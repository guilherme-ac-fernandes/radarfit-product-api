import { useState } from 'react';
import { deleteProduct, getAllProducts } from '../helpers/requestApi';
import IProduct from '../interfaces/IProduct';
import EditFormProduct from './EditFormProduct';

interface DetailsProductProps {
  product: IProduct;
  favoriteProducts: IProduct[] | [];
  setFavoriteProducts: (newState: IProduct[]) => void;
  setProducts: (newState: IProduct[]) => void;
}

export default function DetailsProduct({
  product,
  favoriteProducts,
  setFavoriteProducts,
  setProducts,
}: DetailsProductProps) {
  const [edit, setEdit] = useState(false);

  const handleFavorite = () => {
    const findProduct = favoriteProducts?.findIndex(({ _id }) => _id === product._id)
    if (findProduct >= 0) {
      const filterFavorites = favoriteProducts.filter(({ _id }) => _id !== product._id);
      localStorage.setItem('favoriteProducts', JSON.stringify(filterFavorites));
      return setFavoriteProducts(filterFavorites);
    }
    localStorage.setItem('favoriteProducts', JSON.stringify([...favoriteProducts, product]));
    return setFavoriteProducts([...favoriteProducts, product]);
  }

  const handleDelete = async () => {
    try {
      await deleteProduct(product._id);
      const allProduct = await getAllProducts();
      setProducts(allProduct);
    } catch (error) {
      alert('Não foi possível deletar o produto!');
    }
  }

  return (
    <section>
      {!edit ? (
        <div>
          <h2>Detalhes</h2>
          <h3>{product.produto}</h3>
          <p>
            R$ <span>{product.valor.toFixed(2)}</span>
          </p>
          <p>{product.descricao}</p>
          <aside>
            <button onClick={ () => setEdit(true) }>Editar</button>
            <button onClick={ handleFavorite }>Favoritar</button>
            <button onClick={ handleDelete }>Deletar</button>
          </aside>
        </div>
      ) : (
        <EditFormProduct product={ product } setEdit={ setEdit } />
      )}      
    </section>
  );
}
