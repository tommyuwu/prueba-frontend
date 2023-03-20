import { Injectable } from '@angular/core';
import { Usuario } from './models/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UsuarioDTO } from './models/usuarioDTO';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient) { }

  private url = 'http://localhost:8080/usuarios';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T>(_operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      alert(error.error);
      return of(result as T);
    };
  }

  getUsuariosFromDb(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url)
      .pipe(
        catchError(this.handleError<Usuario[]>('getUsuariosFromDb', []))
      );
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/${id}`)
      .pipe(
        catchError(this.handleError<Usuario>(`getUsuario id=${id}`))
      );
  }

  updateUsuario(usuario: Usuario): Observable<any> {
    return this.http.put(`${this.url}/${usuario.id}`, usuario, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateUsuario'))
      );
  }

  addUsuario(usuario: UsuarioDTO): Observable<Usuario> {
    return this.http.post<Usuario>(this.url, usuario, this.httpOptions)
      .pipe(
        catchError(this.handleError<Usuario>('addUsuario'))
      );
  }

  deleteUsuario(id: Number): any {
    return this.http.delete<Usuario>(`${this.url}/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError<Usuario>('deleteUsuario'))
      );
  }
}
