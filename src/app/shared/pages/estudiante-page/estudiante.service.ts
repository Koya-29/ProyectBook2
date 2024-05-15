import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEstudianteFilter } from './estudiante.helpers';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private apiUrl = 'http://192.168.0.128:7500/student'

  constructor(private http: HttpClient) { }

  public getData(params: IEstudianteFilter): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.http.get<any>(`${this.apiUrl}/list`, {
        params: {
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

  eliminarStudent(idestudiante: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.apiUrl}/delete/${idestudiante}`, {
        body: {
          idestudiante: idestudiante
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

  agregarStudent(data: any): Promise<any> {
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

  editarStudent(idestudiante: number, nuevo_estudiante: any): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.http.put<any>(`${this.apiUrl}/update/${idestudiante}`, nuevo_estudiante).subscribe({
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
