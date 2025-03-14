import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7242/api/auth'; // Ajusta la URL de tu backend

  constructor(private http: HttpClient) {}

  login(clientname: string, password: string): Observable<{ clientname: string; role: string }> {
    const body = { clientname, password };
    return this.http.post<{ clientname: string; role: string }>(`${this.apiUrl}/login`, body).pipe(
      map(response => {
        localStorage.setItem('client', JSON.stringify(response)); // Guardar sesión en localStorage
        return response;
      })
    );
  }

  logout() {
    localStorage.removeItem('client'); // Borrar sesión
  }

  getclient(): { clientname: string; role: string } | null {
    const client = localStorage.getItem('client');
    return client ? JSON.parse(client) : null;
  }
}