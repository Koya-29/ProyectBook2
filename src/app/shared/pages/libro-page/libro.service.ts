import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ILibro, ILibroAdd, ILibroFilter, ILibroState } from './libro.helpers';
import { Environment } from '../../../../environmets/environment';
import { ApiService, ResponseCustom, ResponseGeneral } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class LibroService {

    private api = `${Environment.biblioteca}/book`

    private apiService = inject(ApiService)
    private toastrService = inject(ToastrService)

    estados: ILibroState[] = [
        {
            code: '1',
            denomination: 'Activo'
        },
        {
            code: '0',
            denomination: 'Inactivo'
        }
    ]

    async list(params: ILibroFilter) {
        let result = await this.apiService.getDataPrivate<ILibro[]>(`${this.api}/list`, params)
        return result ?? []
    }

    async add(libro: ILibroAdd) {
        let result = await this.apiService.postPrivate<ResponseCustom<ILibro>>(`${this.api}/create`, libro);
        if (result.state == "success" && result.data) {
            this.toastrService.success('con exito', 'Se Inicio')
        }
        return result;
    }

    async update(libro: ILibro) {
        let result = await this.apiService.putPrivate<ResponseGeneral>(`${this.api}/update/${libro.idlibro}`, libro);
        if (await result.state == "success") {
            this.toastrService.success(result.message)
        }
        return result
    }

    async delete(libro: Partial<ILibro>): Promise<ResponseGeneral> {
        if (!libro.idlibro) {
            return {
                state: "failure",
                message: "No se pudo eliminar el libro"
            }
        }
        let result = this.apiService.deletePrivate<ResponseGeneral>(`${this.api}/delete`);
        if ((await result).state == "success") {
            this.toastrService.success("Se elimino el libro")
        }
        return result
    }

}

//   private apiUrl = 'http://192.168.0.119:7500/book'
//   constructor(private http: HttpClient) { }
// public getData(params: ILibroFilter): Promise<any> {
//     return new Promise((resolve, reject) => {
//       return this.http.get<any>(`${this.apiUrl}/list`, {
//         params: {
//           autor_idautor: params.autor_idautor ?? "",
//           texto: params.texto??""
//         }
//       }).subscribe({
//         next: result => {
//           resolve(result)
//         },
//         error: (error) => {
//           reject(error)
//         }
//       })
//     })
//   }


//   eliminarBook(idlibro: number): Promise<any> {
//     return new Promise((resolve, reject) => {
//       return this.http.delete(`${this.apiUrl}/delete/${idlibro}`, {
//         body: {
//           idlibro: idlibro
//         }
//       }).subscribe({
//         next: result => {
//           resolve(result)
//         },
//         error: (error) => {
//           reject(error)
//         }
//       })
//     })
//   }


//   agregarBook(data: any): Promise<any> {
//     return new Promise((resolve, reject) => {
//       return this.http.post<any>(`${this.apiUrl}/create`, data).subscribe({
//         next: result => {
//           resolve(result)
//         },
//         error: (error) => {
//           reject(error)
//         }
//       })
//     })
//   }

//   editarBook(idlibro: number, nuevo_libro: any): Promise<any> {
//     return new Promise((resolve, reject) => {
//       return this.http.put<any>(`${this.apiUrl}/update/${idlibro}`, nuevo_libro).subscribe({
//         next: result => {
//           resolve(result)
//         },
//         error: (error) => {
//           reject(error)
//         }
//       })
//     })
//   }

