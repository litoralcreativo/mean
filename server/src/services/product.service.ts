import {
  BSON,
  Collection,
  Db,
  DeleteResult,
  ObjectId,
  UpdateResult,
  WithId,
} from "mongodb";
import { forkJoin, from, map, Observable } from "rxjs";
import { Crud } from "../models/crud.model";
import { ObjectIdType } from "../models/objectid.model";
import { PaginatedType } from "../models/pagination.model";
import { Product, ProductRequestDTO } from "../models/product.model";

export class ProductService extends Crud<Product> {
  /* private main_agregate: BSON.Document[] = [
    {
      $lookup: {
        from: "categories",
        localField: "categoria_id",
        foreignField: "_id",
        as: "categoria",
      },
    },
    {
      $unwind: {
        path: "$categoria",
      },
    },
    {
      $project: {
        _id: 1,
        nombre: 1,
        descripcion: 1,
        precio: 1,
        categoria: 1,
      },
    },
  ]; */
  constructor(db: Db) {
    super(db, "products");
  }

  getAll(
    pagination: {
      page: number;
      pageSize: number;
    } = { page: 0, pageSize: 10 }
  ): Observable<PaginatedType<Product>> {
    const skip = pagination.page * pagination.pageSize;

    const aggregationPipeline = [
      { $skip: skip },
      { $limit: pagination.pageSize },
    ];

    const countPipeline = [{ $count: "total" }];

    const getElements$ = from(
      this.collection.aggregate<Product>(aggregationPipeline).toArray()
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

  getById(id: ObjectIdType): Observable<Product | null> {
    const filter = { _id: new ObjectId(id) };
    return from(this.collection.findOne<Product>(filter));
  }

  createOne(obj: ProductRequestDTO): Observable<ObjectIdType | null> {
    return from(this.collection.insertOne(obj as any)).pipe(
      map((x) => {
        return x.acknowledged ? x.insertedId.toHexString() : null;
      })
    );
  }

  updateOne(
    id: ObjectIdType,
    obj: ProductRequestDTO
  ): Observable<UpdateResult<Product>> {
    const filter = { _id: new ObjectId(id) };
    const update = { $set: obj };
    return from(this.collection.updateOne(filter, update));
  }

  deleteOne(id: ObjectIdType): Observable<DeleteResult> {
    const filter = { _id: new ObjectId(id) };
    return from(this.collection.deleteOne(filter));
  }
}
