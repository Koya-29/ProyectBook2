import { Injectable, inject } from '@angular/core';
import { IPrestamo, IPrestamoAdd, IPrestamoFiltro, IPrestamoState } from './prestamo.helpers';
import { Environment } from '../../../../environmets/environment';
import { ApiService, ResponseCustom, ResponseGeneral } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
    providedIn: 'root'
})
export class PrestamoService {

    private api = `${Environment.biblioteca}/loan`
    private apiService = inject(ApiService)
    private toastrServicio = inject(ToastrService)

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

    async list(params: IPrestamoFiltro) {
        let result = await this.apiService.getDataPrivate<IPrestamo[]>(`${this.api}/list`, params)
        return result ?? []
    }

    async add(prestamo: IPrestamoAdd) {
        let result = await this.apiService.postPrivate<ResponseCustom<IPrestamo>>(`${this.api}/create`, prestamo);
        if (result.state == "success" && result.data) {
            this.toastrServicio.success('con exito', 'Se Inicio')
        }
        return result
    }

    async update(prestamo: IPrestamo) {
        let result = await this.apiService.putPrivate<ResponseGeneral>(`${this.api}/update/${prestamo.idprestamo}`, prestamo);
        if (result.state == "success") {
            this.toastrServicio.success(result.message)
        }
        return result
    }

    async delete(prestamo: Partial<IPrestamo>): Promise<ResponseGeneral> {
        if (!prestamo.idprestamo) {
            return {
                state: "failure",
                message: "No se pudo eliminar el prestamo"
            }
        }
        let result = await this.apiService.deletePrivate<ResponseGeneral>(`${this.api}/delete/${prestamo.idprestamo}`, { idprestamo: prestamo.idprestamo });
        if (result.state == "success") {
            this.toastrServicio.success("Se elimino el prestamo")
        }
        return result
    }
}

// private apiUrl = 'http://192.168.0.119:7500/loan'

// constructor(private http: HttpClient) { }

// public getData(params: IPrestamoFiltro): Promise<any> {
//     return new Promise((resolve, reject) => {
//         return this.http.get<any>(`${this.apiUrl}/list`, {
//             params: {
//                 estudiante_idestudiante: params.estudiante_idestudiante ?? "",
//                 libro_idlibro: params.libro_idlibro ?? "",
//                 texto: params.texto ?? ""
//             }
//         }).subscribe({
//             next: result => {
//                 resolve(result)
//             },
//             error: (error) => {
//                 reject(error)
//             }
//         })
//     })
// }

// eliminarLoan(idprestamo: number): Promise<any> {
//     return new Promise((resolve, reject) => {
//         return this.http.delete(`${this.apiUrl}/delete/${idprestamo}`, {
//             body: {
//                 idprestamo: idprestamo
//             }
//         }).subscribe({
//             next: result => {
//                 resolve(result)
//             },
//             error: (error) => {
//                 reject(error)
//             }
//         })
//     })
// }

// agregarLoan(data: any): Promise<any> {
//     return new Promise((resolve, reject) => {
//         return this.http.post<any>(`${this.apiUrl}/create`, data).subscribe({
//             next: result => {
//                 resolve(result)
//             },
//             error: (error) => {
//                 reject(error)
//             }
//         })
//     })
// }

// editarLoan(idprestamo: number, nuevo_loan: any): Promise<any> {
//     return new Promise((resolve, reject) => {
//         return this.http.put<any>(`${this.apiUrl}/update/${idprestamo}`, nuevo_loan).subscribe({
//             next: result => {
//                 resolve(result)
//             },
//             error: (error) => {
//                 reject(error)
//             }
//         })
//     })
// }
