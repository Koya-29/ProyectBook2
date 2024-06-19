import { Injectable, inject } from '@angular/core';
import { IAutor, IAutorAdd, IAutorFilter, IAutorState, IAutorUpdate } from './autor.helpers';
import { ApiService, ResponseCustom, ResponseGeneral } from '../../services/api.service';
import { Environment } from '../../../../environmets/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class AutorService {
    // private apiUrl = 'http://192.168.0.119:7500/author';
    // constructor(private http: HttpClient) { }

    private api = `${Environment.biblioteca}/author`

    private apiService = inject(ApiService)
    private toastrServicio = inject(ToastrService)

    estados: IAutorState[] = [
        {
            code: '1',
            denomination: 'Activo'
        },
        {
            code: '0',
            denomination: 'Inactivo'
        }
    ]

    async list(params: IAutorFilter) {
        let result = await this.apiService.getDataPrivate<IAutor[]>(`${this.api}/list`, params)
        return result ?? []
    }

    async add(autor: IAutorAdd) {
        let result = await this.apiService.postPrivate<ResponseCustom<IAutor>>(`${this.api}/create`, autor);
        if (result.state == "success" && result.data) {
            this.toastrServicio.success('con exito', 'Se Inicio')
        }
        return result;
    }

    async update(autor: IAutorUpdate) {
        let result = await this.apiService.putPrivate<ResponseGeneral>(`${this.api}/update/${autor.idautor}`, autor);
        if (result.state == "success") {
            this.toastrServicio.success(result.message)
        }
        return result
    }

    async delete(autor: Partial<IAutor>): Promise<ResponseGeneral> {
        if (!autor.idautor) {
            return {
                state: "failure",
                message: "No se pudo eliminar el autor"
            }
        }
        let result = await this.apiService.deletePrivate<ResponseGeneral>(`${this.api}/delete/${autor.idautor}`, { idautor: autor.idautor });
        if (result.state == "success") {
            this.toastrServicio.success("Se elimino el autor")
        }
        return result
    }
}

// editarAuthor(idautor: number, nuevo_autor: any): Promise<any> {
//     return new Promise((resolve, reject) => {
//         return this.http.put<any>(`${this.apiUrl}/update/${idautor}`, nuevo_autor).subscribe({
//             next: result => {
//                 resolve(result)
//             },
//             error: error => {
//                 reject(error)
//             }
//         })
//     })
// }


// agregarAuthor(data: any): Promise<any> {
//     return new Promise((resolve, reject) => {
//         return this.http.post<any>(`${this.apiUrl}/create`, data).subscribe({
//             next: result => {
//                 resolve(result)
//             },
//             error: error => {
//                 reject(error)
//             }
//         })
//     })
// }


// eliminarAuthor(idautor: number): Promise<any> {
//     return new Promise((resolve, reject) => {
//         this.http.delete(`${this.apiUrl}/delete/${idautor}`, {

//             body: {
//                 idautor: idautor
//             }
//         }).subscribe({
//             next: result => {
//                 resolve(result)
//             },
//             error: error => {
//                 reject(error)
//             }
//         })
//     })
// }

// public getData(params: IAutorFilter): Promise<any> {
//     return new Promise((resolve, reject) => {
//         return this.http.get<any>(`${this.apiUrl}/list`, {
//             params: {
//                 texto: params.texto ?? ""
//             }
//         }).subscribe({
//             next: result => {
//                 resolve(result)
//             },
//             error: error => {
//                 reject(error)
//             }
//         })
//     })
// }