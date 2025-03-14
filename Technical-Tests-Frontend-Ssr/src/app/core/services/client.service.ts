import { client } from '../../features/usuarios/models/client.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class clientService {
  private apiUrl = 'https://localhost:7242/api/Client';

  constructor(private http: HttpClient) {}

  getclients(): Observable<client[]> {
    console.log('[clientService] Llamando al backend...');
    return this.http.get<client[]>(this.apiUrl).pipe(
      tap(response => console.log('[clientService] Respuesta del backend:', response)),
      catchError(this.handleError)
    );
  }

  addclient(client: client): Observable<client> {
    console.log('[clientService] Enviando usuario al backend:', client);
    return this.http.post<client>(this.apiUrl, client).pipe(
      tap(response => console.log('[clientService] Respuesta al agregar usuario:', response)),
      catchError(this.handleError)
    );
  }

  deleteclient(id: number, isPermanentDelete: boolean = false): Observable<void> {
    console.log(`[clientService] Eliminando usuario con ID: ${id} (Permanent: ${isPermanentDelete})`);
    
    return this.http.delete<void>(`${this.apiUrl}/${id}?isPermanentDelete=${isPermanentDelete}`)
        .pipe(
            tap(() => console.log(`[clientService] Usuario ${id} eliminado`)),
            catchError(this.handleError)
        );
}

  private handleError(error: HttpErrorResponse) {
    console.error('[clientService] Error en la solicitud:', error);
    return throwError(() => new Error('Error en la solicitud, intenta nuevamente.'));
  }

  updateclient(client: client, id: number): Observable<client> {
    console.log('[clientService] Actualizando usuario:', client);
    return this.http.put<client>(`${this.apiUrl}/${id}`, client).pipe(
      catchError(this.handleError)
    );
  }
}