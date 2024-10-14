import { inject, Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { UserDAO } from './dao/user.dao'

@Injectable({
  providedIn: 'root'
})
export class UserRepository {

  private readonly userDAO = inject(UserDAO)


  searchUsers(query: string): Observable<any> {
    return this.userDAO.searchUsers(query).pipe(
      map(data => {
        return data.items.slice(0, 10);  // Retorna los primeros 10 usuarios
      })
    );
  }

  // Método para obtener detalles del perfil de un usuario
  getUserProfile(login: string): Observable<any> {
    return this.userDAO.getUserProfile(login).pipe(
      map(profile => {
        // Puedes realizar algún procesamiento adicional aquí si es necesario
        return {
          login: profile.login,
          id: profile.id,
          avatar_url: profile.avatar_url,
          followers: profile.followers,
          public_repos: profile.public_repos
        };
      })
    );
  }
}
