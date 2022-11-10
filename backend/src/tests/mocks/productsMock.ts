import { IProduct } from '../../interfaces/IProduct';

const productMock: IProduct = {
  produto: 'Alexa',
  valor: 340,
  descricao: 'Vendido pela Amazon',
};

const productId = '636ccde8d3788c864c65d41f';

const productMockMongo: IProduct & {
  _id: string;
  created: string;
  updated: string;
} = {
  _id: '636ccde8d3788c864c65d41f',
  produto: 'Alexa',
  valor: 340,
  descricao: 'Vendido pela Amazon',
  created: '2022-11-10T14:09:44.786Z',
  updated: '2022-11-10T14:09:44.786Z',
};

const productMockUpdate: IProduct = {
  produto: 'Nova Alexa',
  valor: 640,
  descricao: 'Vendido pela Amazon',
};

const productMockMongoUpdate: IProduct & {
  _id: string;
  created: string;
  updated: string;
} = {
  _id: '636ccde8d3788c864c65d41f',
  produto: 'Nova Alexa',
  valor: 640,
  descricao: 'Vendido pela Amazon',
  created: '2022-11-10T14:09:44.786Z',
  updated: '2022-11-10T18:09:44.786Z',
};

export {
  productId,
  productMock,
  productMockMongo,
  productMockUpdate,
  productMockMongoUpdate,
};
