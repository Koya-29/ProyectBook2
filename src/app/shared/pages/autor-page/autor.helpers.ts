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
export interface IAutorUpdate {
    idautor: number;
    nombre: string;
    apellidos: string;
    nacionalidad: string;
    sexo: string;
    fecha_nacimiento: string;
    estado?: string;
}

export interface IAutorFilter {
    texto?: string
}

export interface IAutorState {
    code: string;
    denomination: string;
}