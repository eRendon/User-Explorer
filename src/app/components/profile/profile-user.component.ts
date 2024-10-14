import { Component, Input } from '@angular/core'
import { IProfile } from '../../interfaces/IProfile'
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-profile-user',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.scss'
})
export class ProfileUserComponent {
  @Input() profile!: IProfile
}
