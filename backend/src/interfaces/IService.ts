export interface IService<T> {
  getAll(): Promise<T[]>;
  // getByParams(_id: string): Promise<T[]>;
  getOne(_id: string): Promise<T>;
  create(obj: unknown): Promise<T>;
  update(_id: string, obj: unknown): Promise<T>;
  updatePartial(_id: string, obj: unknown): Promise<T>;
  delete(_id: string): Promise<T>;
}