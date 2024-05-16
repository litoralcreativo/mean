import { ObjectIdType } from "./objectid.model";

export type Category = {
  _id: ObjectIdType;
  nombre: string;
  descripcion: string;
};

export type CategoryRequestDTO = {
  nombre: string;
  descripcion: string;
};
