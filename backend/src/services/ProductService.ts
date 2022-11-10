import { ErrorTypes } from '../errors/catalog';
import { IModel } from '../interfaces/IModel';
import { IProduct, ProductZodSchema } from '../interfaces/IProduct';
import { IService } from '../interfaces/IService';

export default class ProductService implements IService<IProduct> {
  private _product: IModel<IProduct>;

  constructor(model: IModel<IProduct>) {
    this._product = model;
  }

  public async getAll(): Promise<IProduct[]> {
    return this._product.getAll();
  }

  public async getByParams(search: string): Promise<IProduct[]> {
    const products = await this._product.getByParams(search);
    return products as unknown as IProduct[];
  }

  public async getOne(_id: string): Promise<IProduct> {
    const product = await this._product.getOne(_id);
    if (!product) throw new Error(ErrorTypes.EntityNotFound);
    return product;
  }

  public async create(obj: unknown): Promise<IProduct> {
    const parsed = ProductZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    return this._product.create(parsed.data);
  }

  public async update(_id: string, obj: unknown): Promise<IProduct> {
    const parsed = ProductZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    const productUpdate = await this._product.update(_id, parsed.data);
    if (!productUpdate) throw new Error(ErrorTypes.EntityNotFound);
    return productUpdate;
  }

  public async updatePartial(_id: string, obj: unknown): Promise<IProduct> {
    const parsed = ProductZodSchema.partial().safeParse(obj);
    if (!parsed.success) throw parsed.error;
    const productUpdate = await this._product.updatePartial(_id, parsed.data);
    if (!productUpdate) throw new Error(ErrorTypes.EntityNotFound);
    return productUpdate;
  }

  public async delete(_id: string): Promise<IProduct> {
    const product = await this._product.delete(_id);
    if (!product) throw new Error(ErrorTypes.EntityNotFound);
    return product;
  }
}