import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

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
  getUserProfile<T>(login: string): Observable<T> {
    return this.http.get<T>(`${this.userApiUrl}${login}`);
  }
}
