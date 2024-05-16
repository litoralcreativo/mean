import { BSON, Collection, Db, DeleteResult, UpdateResult } from "mongodb";
import { Observable } from "rxjs";
import { ObjectIdType } from "./objectid.model";
import { PaginatedType } from "./pagination.model";

export abstract class Crud<T> {
  protected collection: Collection<BSON.Document>;

  constructor(db: Db, collectionName: string) {
    this.collection = db.collection(collectionName);
  }
  abstract getAll(pagination: {
    page: number;
    pageSize: number;
  }): Observable<PaginatedType<T>>;
  abstract getById(id: ObjectIdType): Observable<T | null>;
  abstract createOne(obj: Partial<T>): Observable<ObjectIdType | null>;
  abstract updateOne(
    id: ObjectIdType,
    obj: Partial<T>
  ): Observable<UpdateResult<T extends BSON.Document ? T : BSON.Document>>;
  abstract deleteOne(id: ObjectIdType): Observable<DeleteResult>;
}
