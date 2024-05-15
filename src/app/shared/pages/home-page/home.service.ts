import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = 'http://192.168.0.128:7500/author'

  constructor(private http: HttpClient) { }

  public getdataauthor(): Promise<any>{
    return new Promise((resolve, reject) => {
      return this.http.get<any>(`${this.apiUrl}/list`).subscribe({
        next: result => {
          resolve(result)
        },
        error: (error) => {
          reject(error)
        }
      })
    })
  }

  eliminarauthor(idautor: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.apiUrl}/delete/${idautor}`, {
        body: {
          idautor: idautor
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


  editarauthor(idautor: number, nueva_data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put<any>(`${this.apiUrl}/update/${idautor}`, nueva_data).subscribe({
        next: result => {
          resolve(result)
        },
        error: (error) => {
          reject(error)
        }
      })
    })
  }

  agregarauthor(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<any>(`${this.apiUrl}/create`, data).subscribe({
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
