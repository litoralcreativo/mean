import { UpdateResult, DeleteResult, Db, ObjectId } from "mongodb";
import { forkJoin, from, map, Observable } from "rxjs";
import { Category, CategoryRequestDTO } from "../models/category.model";
import { Crud } from "../models/crud.model";
import { ObjectIdType } from "../models/objectid.model";
import { PaginatedType } from "../models/pagination.model";

export class CategoryService extends Crud<Category> {
  constructor(db: Db) {
    super(db, "categories");
  }

  getAll(
    pagination: {
      page: number;
      pageSize: number;
    } = { page: 0, pageSize: 10 }
  ): Observable<PaginatedType<Category>> {
    const skip = pagination.page * pagination.pageSize;

    const aggregationPipeline = [
      { $skip: skip },
      { $limit: pagination.pageSize },
    ];

    const countPipeline = [{ $count: "total" }];

    const getElements$ = from(
      this.collection.aggregate<Category>(aggregationPipeline).toArray()
    );

    const getCount$ = from(this.collection.countDocuments());

    return forkJoin([getElements$, getCount$]).pipe(
      map(([elements, total]) => ({
        page: pagination.page,
        pageSize: pagination.pageSize,
        total,
        elements,
      }))
    );
  }

  getById(id: string): Observable<Category | null> {
    const filter = { _id: new ObjectId(id) };
    return from(this.collection.findOne<Category>(filter));
  }

  createOne(obj: CategoryRequestDTO): Observable<ObjectIdType | null> {
    return from(this.collection.insertOne(obj as any)).pipe(
      map((x) => {
        return x.acknowledged ? x.insertedId.toHexString() : null;
      })
    );
  }

  updateOne(
    id: string,
    obj: Partial<Category>
  ): Observable<UpdateResult<Category>> {
    const filter = { _id: new ObjectId(id) };
    const update = { $set: obj };
    return from(this.collection.updateOne(filter, update));
  }

  deleteOne(id: string): Observable<DeleteResult> {
    const filter = { _id: new ObjectId(id) };
    return from(this.collection.deleteOne(filter));
  }
}
