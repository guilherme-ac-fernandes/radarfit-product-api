import { Request, Response } from 'express';
import { IProduct } from '../interfaces/IProduct';
import { IService } from '../interfaces/IService';

export default class ProductController {
  constructor(private _service: IService<IProduct>) {}

  public async getAll(_req: Request, res: Response<IProduct[]>) {
    const result = await this._service.getAll();
    return res.status(200).json(result);
  }

  public async getByParams(req: Request, res: Response<IProduct[]>) {
    const result = await this._service.getByParams(String(req.query.q));
    return res.status(200).json(result);
  }

  public async getOne(req: Request, res: Response<IProduct>) {
    const result = await this._service.getOne(req.params.id);
    return res.status(200).json(result);
  }

  public async create(req: Request, res: Response<IProduct>) {
    const results = await this._service.create(req.body);
    return res.status(201).json(results);
  }

  public async update(req: Request, res: Response<IProduct>) {
    const result = await this._service.update(req.params.id, req.body);
    return res.status(200).json(result);
  }

  public async updatePartial(req: Request, res: Response<IProduct>) {
    const result = await this._service.updatePartial(req.params.id, req.body);
    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response<IProduct>) {
    const result = await this._service.delete(req.params.id);
    return res.status(204).json(result);
  }
}