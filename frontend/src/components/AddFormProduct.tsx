import { useEffect, useState } from 'react';
import { createProduct } from '../helpers/requestApi';

interface Props {
  handleClose?: () => void;
}

export default function AddFormProduct({handleClose }: Props) {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [addDisabled, setAddDisabled] = useState(true);

  const handleSubmit = async () => {
    try {
      await createProduct({
        produto: productName,
        valor: Number(productPrice),
        descricao: productDescription,
      });
    } catch (error) {
      alert('Não foi possível criar o produto!');
    }
  };

  useEffect(() => {
    if(productName.length > 0 && productPrice.length > 0 && productDescription.length > 0){
      return setAddDisabled(false);
    }
  }, [productName, productPrice, productDescription])

  return (
    <form>
      <h2>Novo Produto</h2>
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
      <aside>
        <button disabled={ addDisabled } onClick={handleSubmit}>Adicionar</button>
        <button onClick={handleClose}>Fechar</button>
      </aside>
    </form>
  );
}
