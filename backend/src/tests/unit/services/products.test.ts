import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ProductModel from '../../../models/ProductModel';
import ProductService from '../../../services/ProductService';
import {
  productId,
  productMock,
  productMockMongo,
  productMockUpdate,
  productMockMongoUpdate,
  invalidProduct,
} from '../../mocks/productsMock';
import { ErrorTypes } from '../../../errors/catalog';
import { ZodError, ZodNull } from 'zod';

describe('Product Service', () => {
  const productModel = new ProductModel();
  const productService = new ProductService(productModel);

  before(() => {
    sinon.stub(productModel, 'create').resolves(productMockMongo);
    sinon
      .stub(productModel, 'getOne')
      .onFirstCall()
      .resolves(productMockMongo)
      .onSecondCall()
      .resolves(productMockMongo)
      .onThirdCall()
      .resolves(null);
    sinon.stub(productModel, 'getAll').resolves([productMockMongo]);
    sinon
      .stub(productModel, 'delete')
      .onFirstCall()
      .resolves(productMockMongo)
      .onSecondCall()
      .resolves(productMockMongo)
      .onThirdCall()
      .resolves(null);
    sinon
      .stub(productModel, 'update')
      .onFirstCall()
      .resolves(productMockMongoUpdate)
      .onSecondCall()
      .resolves(productMockMongoUpdate)
      .onThirdCall()
      .resolves(null);
    sinon
      .stub(productModel, 'updatePartial')
      .onFirstCall()
      .resolves({ ...productMockMongoUpdate, produto: 'Nova Alexa 3.0' })
      .onSecondCall()
      .resolves({ ...productMockMongoUpdate, produto: 'Nova Alexa 3.0' })
      .onThirdCall()
      .resolves(null);
    sinon.stub(productModel, 'getByParams').resolves([productMockMongo]);
  });

  after(() => sinon.restore());

  describe('creating a new product', () => {
    it('successfully created', async () => {
      const newProduct = await productService.create(productMock);
      expect(newProduct).to.be.deep.equal(productMockMongo);
    });

    it('invalid product', async () => {
      try {
        await productService.create(invalidProduct);
      } catch (error: any) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });
  });

  describe('searching a product', () => {
    it('successfully found', async () => {
      const productFound = await productService.getOne(productId);
      expect(productFound).to.be.deep.equal(productMockMongo);
    });

    it('_id not found', async () => {
      try {
        await productService.getOne('123ERRADO');
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });

    it('db return error', async () => {
      try {
        await productService.getOne(productId);
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.EntityNotFound);
      }
    });
  });

  describe('searching all products', () => {
    it('successfully found', async () => {
      const productsFound = await productService.getAll();
      expect(productsFound).to.be.deep.equal([productMockMongo]);
    });
  });

  describe('deleteting a product', () => {
    it('successfully delete', async () => {
      const productDelete = await productService.delete(productId);
      expect(productDelete).to.be.deep.equal(productMockMongo);
    });

    it('_id not found', async () => {
      try {
        await productService.delete('123ERRADO');
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });

    it('db return error', async () => {
      try {
        await productService.delete(productId);
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.EntityNotFound);
      }
    });
  });

  describe('updating put a product', () => {
    it('successfully update', async () => {
      const productUpdate = await productService.update(
        productId,
        productMockUpdate
      );
      expect(productUpdate).to.be.deep.equal(productMockMongoUpdate);
    });

    it('_id not found', async () => {
      try {
        await productService.update('123ERRADO', productMockUpdate);
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });

    it('invalid product', async () => {
      try {
        await productService.update(productId, invalidProduct);
      } catch (error: any) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });

    it('db return error', async () => {
      try {
        await productService.update(productId, productMockUpdate);
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.EntityNotFound);
      }
    });
  });

  describe('updating patch a product', () => {
    it('successfully update', async () => {
      const productUpdate = await productService.updatePartial(productId, {
        produto: 'Nova Alexa 3.0',
      });
      expect(productUpdate).to.be.deep.equal({
        ...productMockMongoUpdate,
        produto: 'Nova Alexa 3.0',
      });
    });

    it('_id not found', async () => {
      try {
        await productService.updatePartial('123ERRADO', productMockUpdate);
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });

    it('invalid product', async () => {
      try {
        await productService.updatePartial(productId, invalidProduct);
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.EntityNotFound);
      }
    });

    it('db return error', async () => {
      try {
        await productService.updatePartial(productId, productMockUpdate);
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.EntityNotFound);
      }
    });
  });

  describe('searching product by string', () => {
    it('successfully found', async () => {
      const productsFound = await productService.getByParams('Alexa');
      expect(productsFound).to.be.deep.equal([productMockMongo]);
    });
  });
});
