import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAutorFilter } from './autor.helpers';

@Injectable({
    providedIn: 'root'
})
export class AutorService {

    private apiUrl = 'http://192.168.0.128:7500/author';

    constructor(private http: HttpClient) { }

    public getData(params: IAutorFilter): Promise<any> {
        return new Promise((resolve, reject) => {
            return this.http.get<any>(`${this.apiUrl}/list`, {
                params: {
                    texto: params.texto ?? ""
                }
            }).subscribe({
                next: result => {
                    resolve(result)
                },
                error: error => {
                    reject(error)
                }
            })
        })
    }


    eliminarAuthor(idautor: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.delete(`${this.apiUrl}/delete/${idautor}`, {

                body: {
                    idautor: idautor
                }
            }).subscribe({
                next: result => {
                    resolve(result)
                },
                error: error => {
                    reject(error)
                }
            })
        })
    }




    agregarAuthor(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            return this.http.post<any>(`${this.apiUrl}/create`, data).subscribe({
                next: result => {
                    resolve(result)
                },
                error: error => {
                    reject(error)
                }
            })
        })
    }



    editarAuthor(idautor: number, nuevo_autor: any): Promise<any> {
        return new Promise((resolve, reject) => {
            return this.http.put<any>(`${this.apiUrl}/update/${idautor}`, nuevo_autor).subscribe({
                next: result => {
                    resolve(result)
                },
                error: error => {
                    reject(error)
                }
            })
        })
    }

}




