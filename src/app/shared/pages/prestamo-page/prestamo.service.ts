import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPrestamoFiltro, IPrestamoState } from './prestamo.helpers';

@Injectable({
    providedIn: 'root'
})
export class PrestamoService {

    private apiUrl = 'http://192.168.0.119:7500/loan'

    constructor(private http: HttpClient) { }

    estados: IPrestamoState[] = [
        {
            code: '0',
            denomination: 'Devuelto'
        },
        {
            code: '1',
            denomination: 'Prestado'
        },
    ]

    public getData(params: IPrestamoFiltro): Promise<any> {
        return new Promise((resolve, reject) => {
            return this.http.get<any>(`${this.apiUrl}/list`, {
                params: {
                    estudiante_idestudiante: params.estudiante_idestudiante ?? "",
                    libro_idlibro: params.libro_idlibro ?? "",
                    texto: params.texto ?? ""
                }
            }).subscribe({
                next: result => {
                    resolve(result)
                },
                error: (error) => {
                    reject(error)
                }
            })
        })
    }


    eliminarLoan(idprestamo: number): Promise<any> {
        return new Promise((resolve, reject) => {
            return this.http.delete(`${this.apiUrl}/delete/${idprestamo}`, {
                body: {
                    idprestamo: idprestamo
                }
            }).subscribe({
                next: result => {
                    resolve(result)
                },
                error: (error) => {
                    reject(error)
                }
            })
        })
    }

    agregarLoan(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            return this.http.post<any>(`${this.apiUrl}/create`, data).subscribe({
                next: result => {
                    resolve(result)
                },
                error: (error) => {
                    reject(error)
                }
            })
        })
    }

    editarLoan(idprestamo: number, nuevo_loan: any): Promise<any> {
        return new Promise((resolve, reject) => {
            return this.http.put<any>(`${this.apiUrl}/update/${idprestamo}`, nuevo_loan).subscribe({
                next: result => {
                    resolve(result)
                },
                error: (error) => {
                    reject(error)
                }
            })
        })
    }

}
