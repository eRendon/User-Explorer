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

  searchUsers(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${query}`);
  }

  // Método para obtener detalles de un usuario por login
  getUserProfile(login: string): Observable<any> {
    return this.http.get(`${this.userApiUrl}${login}`);
  }
}
