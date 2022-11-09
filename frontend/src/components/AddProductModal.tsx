import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createProduct } from '../helpers/requestApi';
import IProduct from '../interfaces/IProduct';
import axios from 'axios';

const API_URL = 'http://localhost:3001/produtos';

interface AddProductModalProps {
  setProducts: (newState: IProduct[] | []) => void;
}

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
      setShow(false)
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
      <Button variant='primary' onClick={handleShow}>
        +
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Novo Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
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
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            disabled={addDisabled}
            onClick={handleSubmit}
            variant='primary'
          >
            Salvar mudanças
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
