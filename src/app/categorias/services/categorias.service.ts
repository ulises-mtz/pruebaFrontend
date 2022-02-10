import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Categoria } from '../../interfaces/interfaces';
@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCategoria():Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/categoria`);
  }

    // función para obtener una categoria mediante su id
  getCategoriaById(id: number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/categoria/${id}`);
  }

   // función para crear una categoria
   createCategoria(categoria: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/categoria`, categoria);
  }

  // función para editar una categoria mediante su id
  updateCategoria(id: any, categoria: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/categoria/${id}`, categoria);
  }

   // función para eliminar una categoria mediante su id
   deleteCategoria(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/categoria/${id}`);
   }
}
