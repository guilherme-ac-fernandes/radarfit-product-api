import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ProductModel from '../../../models/ProductModel';
import {
  productId,
  productMock,
  productMockMongo,
  productMockUpdate,
  productMockMongoUpdate,
} from '../../mocks/productsMock';
import { ErrorTypes } from '../../../errors/catalog';

describe('Car Model', () => {
  const productModel = new ProductModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(productMockMongo);
    sinon.stub(Model, 'findOne').resolves(productMockMongo);
    sinon.stub(Model, 'find').resolves([productMockMongo]);
    sinon.stub(Model, 'findByIdAndDelete').resolves(productMockMongo);
    sinon
      .stub(Model, 'findByIdAndUpdate')
      .onFirstCall()
      .resolves(productMockMongoUpdate)
      .onSecondCall()
      .resolves({ ...productMockMongoUpdate, produto: 'Nova Alexa 3.0' });
  });

  after(() => sinon.restore());

  describe('creating a new product', () => {
    it('successfully created', async () => {
      const newProduct = await productModel.create(productMock);
      expect(newProduct).to.be.deep.equal(productMockMongo);
    });
  });

  describe('searching a product', () => {
    it('successfully found', async () => {
      const productFound = await productModel.getOne(productId);
      expect(productFound).to.be.deep.equal(productMockMongo);
    });

    it('_id not found', async () => {
      try {
        await productModel.getOne('123ERRADO');
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe('searching all products', () => {
    it('successfully found', async () => {
      const productsFound = await productModel.getAll();
      expect(productsFound).to.be.deep.equal([productMockMongo]);
    });
  });

  describe('deleteting a product', () => {
    it('successfully delete', async () => {
      const productDelete = await productModel.delete(productId);
      expect(productDelete).to.be.deep.equal(productMockMongo);
    });

    it('_id not found', async () => {
      try {
        await productModel.delete('123ERRADO');
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe('updating put a product', () => {
    it('successfully update', async () => {
      const productUpdate = await productModel.update(
        productId,
        productMockUpdate
      );
      expect(productUpdate).to.be.deep.equal(productMockMongoUpdate);
    });

    it('_id not found', async () => {
      try {
        await productModel.update('123ERRADO', productMockUpdate);
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe('updating patch a product', () => {
    it('successfully update', async () => {
      const productUpdate = await productModel.updatePartial(productId, {
        produto: 'Nova Alexa 3.0',
      });
      expect(productUpdate).to.be.deep.equal({
        ...productMockMongoUpdate,
        produto: 'Nova Alexa 3.0',
      });
    });

    it('_id not found', async () => {
      try {
        await productModel.update('123ERRADO', productMockUpdate);
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe('searching product by string', () => {
    it('successfully found', async () => {
      const productsFound = await productModel.getByParams('Alexa');
      expect(productsFound).to.be.deep.equal([productMockMongo]);
    });
  });
});
