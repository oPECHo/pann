export interface IRepository<T> { 
    getAll(filter: any|undefined): Promise<T[] | null>; 
}
 