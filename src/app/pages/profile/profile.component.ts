import { Component, inject, OnInit } from '@angular/core'
import { IProfile } from '../../interfaces/IProfile'
import { UserRepository } from '../../core/services/user.repository'
import { ActivatedRoute } from '@angular/router'
import { ProfileUserComponent } from '../../components/profile/profile-user.component'

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ProfileUserComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profile!: IProfile
  private readonly userRepository = inject(UserRepository)
  private readonly activatedRoute = inject(ActivatedRoute);
  ngOnInit (): void {
    this.getProfile()
  }

  getProfile(): void {
    const login = this.activatedRoute.snapshot.params['login']
    console.log(login)
    this.userRepository.getUserProfile<IProfile>(login).subscribe({
      next: (response) => {
        console.log('respusta', response);
        this.profile = response;
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      }
    })
  }
}
