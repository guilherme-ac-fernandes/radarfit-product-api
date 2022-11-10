import { useEffect, useState } from 'react';
import { updateProduct } from '../helpers/requestApi';
import IProduct from '../interfaces/IProduct';
import styles from '../styles/EditFormProduct.module.css';

interface EditFormProductProps {
  product: IProduct;
  setEdit: (newState: boolean) => void;
}

export default function EditFormProduct({
  product,
  setEdit,
}: EditFormProductProps) {
  const [productName, setProductName] = useState(product.produto);
  const [productPrice, setProductPrice] = useState(String(product.valor));
  const [productDescription, setProductDescription] = useState(
    product.descricao
  );
  const [addDisabled, setAddDisabled] = useState(true);

  const handleUpdate = async () => {
    try {
      await updateProduct(product._id, {
        produto: productName,
        valor: Number(productPrice),
        descricao: productDescription,
      });
    } catch (error) {
      // console.log(error);
      // alert('Não foi possível atualizar o produto!');
    }
  };

  useEffect(() => {
    if (
      productName.length > 0 &&
      productPrice.length > 0 &&
      productDescription.length > 0
    ) {
      return setAddDisabled(false);
    }
  }, [productName, productPrice, productDescription]);

  return (
    <form className={styles.editForm}>
      <label htmlFor='form-product-name'>
        Produto
        <input
          type='text'
          data-testid='form-product-name'
          value={productName}
          id='form-product-name'
          onChange={({ target: { value } }) => setProductName(value)}
        />
      </label>

      <label htmlFor='form-product-price'>
        Valor
        <input
          type='number'
          data-testid='form-product-price'
          value={productPrice}
          id='form-product-price'
          onChange={({ target: { value } }) => setProductPrice(value)}
        />
      </label>

      <label htmlFor='form-product-description'>
        Descrição
        <input
          type='text'
          data-testid='form-product-description'
          value={productDescription}
          id='form-product-description'
          onChange={({ target: { value } }) => setProductDescription(value)}
        />
      </label>
      <aside className={styles.editFormButtonSection}>
        <button disabled={addDisabled} onClick={handleUpdate}>
          Atualizar
        </button>
        <button onClick={() => setEdit(false)}>Fechar</button>
      </aside>
    </form>
  );
}
