export interface IModel<T> {
  getAll(): Promise<T[]>;
  // getByParams(_id: string): Promise<T[] | null>;
  getOne(_id: string): Promise<T | null>;
  create(obj: T): Promise<T>;
  update(_id: string, obj: T): Promise<T | null>;
  updatePartial(_id: string, obj: Partial<T>): Promise<T | null>;
  delete(_id: string): Promise<T | null>;
}