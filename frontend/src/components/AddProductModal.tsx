import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { createProduct } from '../helpers/requestApi';
import IProduct from '../interfaces/IProduct';
import axios from 'axios';
import styles from '../styles/AddProductModal.module.css';

const API_URL = 'http://localhost:3001/produtos';

interface AddProductModalProps {
  setProducts: (newState: IProduct[] | []) => void;
}

// Utilização do React - Bootstrap para criação do modal de criaçõa de novo Produto
// juntamente com o vídeo do Caleb Curry no youtube
// source: https://react-bootstrap.github.io/components/modal/
// source video: https://m.youtube.com/watch?v=aeQa9U0fLCI&autoplay=1
export default function AddProductModal({ setProducts }: AddProductModalProps) {
  const [show, setShow] = useState(false);
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
      const getAllProducts = async () => {
        const { data } = await axios.get(API_URL);
        setProducts(data);
      };
      getAllProducts();
      setShow(false);
    } catch (error) {
      alert('Não foi possível criar o produto!');
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className={styles.modalButton} onClick={handleShow}>
        <span className='material-symbols-outlined'>add</span>
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Novo Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={styles.createNewForm}>
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
                onChange={({ target: { value } }) =>
                  setProductDescription(value)
                }
              />
            </label>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className={styles.newProductButton} onClick={handleClose}>
            Fechar
          </button>
          <button
            className={styles.newProductButton}
            disabled={addDisabled}
            onClick={handleSubmit}
          >
            Salvar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
