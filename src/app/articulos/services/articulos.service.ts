import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getArticulo():Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/articulo`);
  }

    // función para obtener un articulo mediante su id
  getArticuloById(id: any): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/articulo/${id}`);
  }

   // función para crear un articulo
   createArticulo(articulo: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/articulo`, articulo);
  }

  // función para editar un articulo mediante su id
  updateArticulo(id: any, articulo: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/articulo/${id}`, articulo);
  }

   // función para eliminar un articulo mediante su id
   deleteArticulo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/articulo/${id}`);
   }
}
