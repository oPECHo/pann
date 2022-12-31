export interface IRepository<T> { 
    getAll(filter: any|undefined): Promise<T[] | null>;
    get(id: string|number): Promise<T | null>;
    create(entity: Partial<T>): Promise<T | null>;
    update(entity: Partial<T>): Promise<T | null>;
    delete(id: string|number): Promise<void>; 
}
 