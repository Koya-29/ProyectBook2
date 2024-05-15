import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILibroFilter } from './libro.helpers';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private apiUrl = 'http://192.168.0.128:7500/book'

  constructor(private http: HttpClient) { }


  public getData(params: ILibroFilter): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.http.get<any>(`${this.apiUrl}/list`, {
        params: {
          autor_idautor: params.autor_idautor ?? "",
          texto: params.texto??""
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


  eliminarBook(idlibro: number): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.http.delete(`${this.apiUrl}/delete/${idlibro}`, {
        body: {
          idlibro: idlibro
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


  agregarBook(data: any): Promise<any> {
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

  editarBook(idlibro: number, nuevo_libro: any): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.http.put<any>(`${this.apiUrl}/update/${idlibro}`, nuevo_libro).subscribe({
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
