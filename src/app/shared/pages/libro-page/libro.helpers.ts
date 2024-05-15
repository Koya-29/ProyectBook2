import { IAutor } from "../autor-page/autor.helpers";

export interface ILibro {
  autor_idautor?: number;
  cantidad: number;
  cantidad_disponible: number;
  cantidad_prestado: number;
  createAt?: string;
  createBy?: string;
  editorial: string;
  estado?: string;
  idlibro: number;
  titulo: string;
  autor?: IAutor;
}


export interface ILibroAdd {
  autor_idautor?: number;
  cantidad: number;
  cantidad_disponible: number;
  cantidad_prestado: number;
  editorial: string;
  titulo: string;
  createBy?: string;
  estado: string;
  autor?: IAutor
}

export interface ILibroFilter{
    texto?: string,
    autor_idautor?: string
}

// export interface Autor {
//   idautor:          number;
//   nombre:           string;
//   apellidos:        string;
//   nacionalidad:     string;
//   sexo:             string;
//   fecha_nacimiento: Date;
//   createBy:         string;
//   createAt:         null;
//   estado:           string;
// }
