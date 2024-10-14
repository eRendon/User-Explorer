import { Component } from '@angular/core';
import { IconComponent } from '../icon/icon.component'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    IconComponent
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  loadingIcon = faSpinner
}
