import { Injectable, inject } from '@angular/core';
import { IEstudiante, IEstudianteAdd, IEstudianteFilter, IEstudianteState } from './estudiante.helpers';
import { Environment } from '../../../../environmets/environment';
import { ApiService, ResponseCustom, ResponseGeneral } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
    providedIn: 'root'
})
export class EstudianteService {

    private api = `${Environment.biblioteca}/student`

    private apiService = inject(ApiService)
    private toastrService = inject(ToastrService)

    estados: IEstudianteState[] = [
        {
            code: '1',
            denomination: 'Activo'
        },
        {
            code: '0',
            denomination: 'Inactivo'
        }
    ]

    async list(params: IEstudianteFilter) {
        let result = await this.apiService.getDataPrivate<IEstudiante[]>(`${this.api}/list`, params)
        return result ?? []
    }

    async add(estudiante: IEstudianteAdd) {
        let result = await this.apiService.postPrivate<ResponseCustom<IEstudiante>>(`${this.api}/create`, estudiante);
        if (result.state == "success" && result.data) {
            this.toastrService.success('con exito', 'Se Inicio')
        }
        return result;
    }

    async update(estudiante: IEstudiante) {
        let result = await this.apiService.putPrivate<ResponseGeneral>(`${this.api}/update/${estudiante.idestudiante}`, estudiante);
        if (result.state == "success") {
            this.toastrService.success(result.message)
        }
        return result
    }

    async delete(estudiante: Partial<IEstudiante>): Promise<ResponseGeneral> {
        if (!estudiante.idestudiante) {
            return {
                state: "failure",
                message: "No se pudo eliminar el autor"
            }
        }
        let result = await this.apiService.deletePrivate<ResponseGeneral>(`${this.api}/delete/${estudiante.idestudiante}`, { idestudiante: estudiante.idestudiante });
        if (result.state == "success") {
            this.toastrService.success("se elimino el estudiante")
        }
        return result
    }
}








// private apiUrl = 'http://192.168.0.119:7500/student'
// constructor(private http: HttpClient) { }
// public getData(params: IEstudianteFilter): Promise<any> {
//     return new Promise((resolve, reject) => {
//         return this.http.get<any>(`${this.apiUrl}/list`, {
//             params: {
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

// eliminarStudent(idestudiante: number): Promise<any> {
//     return new Promise((resolve, reject) => {
//         this.http.delete(`${this.apiUrl}/delete/${idestudiante}`, {
//             body: {
//                 idestudiante: idestudiante
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

// agregarStudent(data: any): Promise<any> {
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

// editarStudent(idestudiante: number, nuevo_estudiante: any): Promise<any> {
//     return new Promise((resolve, reject) => {
//         return this.http.put<any>(`${this.apiUrl}/update/${idestudiante}`, nuevo_estudiante).subscribe({
//             next: result => {
//                 resolve(result)
//             },
//             error: (error) => {
//                 reject(error)
//             }
//         })
//     })
// }
