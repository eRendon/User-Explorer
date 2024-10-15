import { inject, Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { UserDAO } from '../dao/user.dao'
import { IUser } from '../../interfaces/IUser'
import { IHTTPResponse } from '../../interfaces/IHTTPResponse'

@Injectable({
  providedIn: 'root'
})
export class UserRepository {

  private readonly userDAO = inject(UserDAO)
  users: IUser[] = []

  searchUsers(query: string): Observable<IUser[]> {
    return this.userDAO.searchUsers<IHTTPResponse<IUser[]>>(query).pipe(
      map((data) => {
        return data.items.slice(0, 10);  // Retorna los primeros 10 usuarios
      })
    );
  }

  // Método para obtener detalles del perfil de un usuario
  getUserProfile<T>(login: string): Observable<T> {
    return this.userDAO.getUserProfile(login)
  }

  getAllUsers(): IUser[] {
    return this.users;
  }

  setAllUsers(users: IUser[]): void {
    console.log(users)
    this.users = users
  }
}
