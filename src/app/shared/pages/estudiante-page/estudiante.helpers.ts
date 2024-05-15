export interface IEstudiante {
  idestudiante: number;
  numero_documento: string;
  tipo_documento: string;
  nombre: string;
  apellidos: string;
  codigo: string;
  fecha_nacimiento: string;
  createBy?: string;
  createAt?: string;
  estado?: string;
}

export interface IEstudianteAdd {
  numero_documento: string;
  tipo_documento: string;
  nombre: string;
  apellidos: string;
  codigo: string;
  fecha_nacimiento: string;
  createBy?: string;
  estado: string;
}

export interface IEstudianteFilter {
  texto?: string
}

// export interface IEstudianteOmitirUpdat {
//   createBy?: string;
//   createAt?: string;
// }

// export interface IEstudianteUpdate extends Omit<IEstudiante, keyof IEstudianteOmitirUpdat> { }
