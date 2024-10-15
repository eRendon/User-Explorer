import { Component, inject, OnInit } from '@angular/core'
import { IProfile } from '../../interfaces/IProfile'
import { UserRepository } from '../../core/repository/user.repository'
import { ActivatedRoute } from '@angular/router'
import { ProfileUserComponent } from '../../components/profile/profile-user.component'
import { LoadingService } from '../../core/services/loading-service/loading.service'
import { FollowerChartComponent } from '../../components/follower-chart/follower-chart.component'

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ProfileUserComponent,
    FollowerChartComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profile!: IProfile
  private readonly userRepository = inject(UserRepository)
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly loadingService = inject(LoadingService)
  ngOnInit (): void {
    this.getProfile()
  }

  getProfile(): void {
    this.loadingService.setIsLoading(true)
    const login = this.activatedRoute.snapshot.params['login']
    this.userRepository.getUserProfile<IProfile>(login).subscribe({
      next: (response) => {
        this.profile = response;
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      },
      complete: () => {
        this.loadingService.setIsLoading(false)
      }
    })
  }
}
