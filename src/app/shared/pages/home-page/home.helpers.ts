export interface IHome {
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

export interface IHomeAdd{
  nombre: string;
  apellidos: string;
  nacionalidad: string;
  sexo: string;
  fecha_nacimiento: string;
  createAt?: string;
  estado?: string;
}
