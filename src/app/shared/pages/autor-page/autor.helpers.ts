import { ILibro } from "../libro-page/libro.helpers";

export interface IAutor {
  idautor: number;
  nombre: string;
  apellidos: string;
  nacionalidad: string;
  sexo: string;
  fecha_nacimiento: string;
  createBy?: string;
  createAt?: string;
  estado?: string;
}

export interface IAutorAdd {
  nombre: string;
  apellidos: string;
  nacionalidad: string;
  sexo: string;
  fecha_nacimiento: string;
  createBy?: string;
  estado: string;
}

export interface IAutorFilter{
  texto?: string
}