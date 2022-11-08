import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IProduct } from '../interfaces/IProduct';
import MongoModel from './MongoModel';

const productMongooseSchema = new Schema<IProduct>(
  {
    produto: String,
    valor: Number,
    descricao: String,
  },
  { versionKey: false,
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
},
);

export default class ProductModel extends MongoModel<IProduct> {
  constructor(model = mongooseCreateModel('Product', productMongooseSchema)) {
    super(model);
  }
}