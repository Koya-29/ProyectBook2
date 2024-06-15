import { IEstudiante } from "../estudiante-page/estudiante.helpers";
import { ILibro } from "../libro-page/libro.helpers";

export interface IPrestamo {
    idprestamo: number;
    fecha_prestamo: string;
    fecha_devolucion: string;
    createBy?: string;
    createAt?: string;
    libro_idlibro?: number;
    estudiante_idestudiante?: number;
    estado?: string;
    book?: ILibro;
    student?: IEstudiante;
}

export interface IPrestamoAdd {
    fecha_prestamo: string;
    fecha_devolucion: string;
    libro_idlibro?: number;
    estudiante_idestudiante?: number;
    createBy?: string;
    estado: string;
    book?: ILibro;
    student?: IEstudiante;
}

export interface IPrestamoFiltro {
    estudiante_idestudiante?: string;
    libro_idlibro?: string;
    texto?: string;
}

export interface IPrestamoState {
    code: string,
    denomination: string,
}

export enum EPrestamoState {

    DEVUELTO = '0',
    PRESTADO = '1',
}

export const PrestamoStateDictionary = {
    [EPrestamoState.PRESTADO.toString()]: 'Prestado',
    [EPrestamoState.DEVUELTO.toString()]: 'Devuelto'
}

export const PrestamoStateColor = {
    [EPrestamoState.PRESTADO.toString()]: 'warning',
    [EPrestamoState.DEVUELTO.toString()]: 'success',

}
