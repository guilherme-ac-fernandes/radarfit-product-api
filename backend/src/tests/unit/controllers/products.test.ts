import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import ProductModel from '../../../models/ProductModel';
import ProductService from '../../../services/ProductService';
import ProductController from '../../../controllers/ProductController';
import {
  productId,
  productMock,
  productMockMongo,
  productMockUpdate,
  productMockMongoUpdate,
} from '../../mocks/productsMock';

describe('Product Controller', () => {
  const productModel = new ProductModel();
  const productService = new ProductService(productModel);
  const productController = new ProductController(productService);

  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(productService, 'create').resolves(productMockMongo);
    sinon.stub(productService, 'getOne').resolves(productMockMongo);
    sinon.stub(productService, 'getAll').resolves([productMockMongo]);
    sinon.stub(productService, 'delete').resolves(productMockMongo);
    sinon.stub(productService, 'update').resolves(productMockMongoUpdate);
    sinon.stub(productService, 'updatePartial').resolves({
      ...productMockMongoUpdate,
      produto: 'Nova Alexa 3.0',
    });
    sinon.stub(productService, 'getByParams').resolves([productMockMongo]);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => sinon.restore());

  describe('Create product', () => {
    it('Success', async () => {
      req.body = productMock;
      await productController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(productMockMongo)).to.be.true;
    });
  });

  describe('GetOne product', () => {
    it('Success', async () => {
      req.params = { id: productId };
      await productController.getOne(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(productMockMongo)).to.be.true;
    });
  });

  describe('GetAll product', () => {
    it('Success', async () => {
      await productController.getAll(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([productMockMongo])).to.be.true;
    });
  });

  describe('Delete Car', () => {
    it('Success', async () => {
      req.params = { id: productId };
      await productController.delete(req, res);
      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(productMockMongo)).to.be.true;
    });
  });

  describe('Update put product', () => {
    it('Success', async () => {
      req.params = { id: productId };
      req.body = { ...productMockUpdate };
      await productController.update(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(productMockMongoUpdate)).to.be.true;
    });
  });

  describe('Update patch product', () => {
    it('Success', async () => {
      req.params = { id: productId };
      req.body = { produto: 'Nova Alexa 3.0' };
      await productController.updatePartial(req, res);     
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith({
        ...productMockMongoUpdate,
        produto: 'Nova Alexa 3.0',
      })).to.be.true;
    });
  });

  describe('Search product', () => {
    it('Success', async () => {
      req.query = { q: 'Alexa' };
      await productController.getByParams(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([productMockMongo])).to.be.true;
    });
  });
});