import { ObjectIdType } from "./objectid.model";

export type Product = {
  _id: ObjectIdType;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria_id: string;
};

export type ProductRequestDTO = {
  nombre: string;
  descripcion: string;
  precio: number;
};
