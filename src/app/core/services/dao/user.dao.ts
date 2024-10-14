import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { IHTTPResponse } from '../../../interfaces/IHTTPResponse'

@Injectable({
  providedIn: 'root'
})

export class UserDAO {

  private readonly http = inject(HttpClient)

  private apiUrl = 'https://api.github.com/search/users?q=';
  private userApiUrl = 'https://api.github.com/users/';

  searchUsers<T>(query: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${query}`);
  }

  // Método para obtener detalles de un usuario por login
  getUserProfile(login: string): Observable<any> {
    return this.http.get(`${this.userApiUrl}${login}`);
  }
}
