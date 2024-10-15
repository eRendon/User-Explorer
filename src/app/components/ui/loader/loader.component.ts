import { Component, inject, OnInit } from '@angular/core'
import { IconComponent } from '../icon/icon.component'
import { faSpinner, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { LoadingService } from '../../../core/services/loading-service/loading.service'

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    IconComponent
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit {
  isLoading$: boolean = false
  private readonly loadingService = inject(LoadingService)
  loadingIcon: IconDefinition = faSpinner

  ngOnInit (): void {
    this.loadingService.getIsLoading().subscribe({
      next: isLoading => {
        this.isLoading$ = isLoading
      }
    })
  }
}
