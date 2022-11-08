import mongoose, { model as mongooseCreateModel, Schema } from 'mongoose';
import { IProduct } from '../interfaces/IProduct';
import MongoModel from './MongoModel';

const productMongooseSchema = new Schema<IProduct>(
  {
    produto: String,
    valor: Number,
    descricao: String,
    created: Date,
    updated: Date,
  },
  { versionKey: false },
);

export default class ProductModel extends MongoModel<IProduct> {
  constructor(model = mongooseCreateModel('Product', productMongooseSchema)) {
    super(model);
  }
}