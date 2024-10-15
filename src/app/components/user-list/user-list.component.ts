import { Component, inject, Input } from '@angular/core'
import { Router } from '@angular/router'
import { IUser } from '../../interfaces/IUser'

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  @Input() users: IUser[] = []

  private readonly router = inject(Router)
  navigateToUser(login: string): void {
    console.log(login)
    this.router.navigate(['/profile', login]);
  }
}
