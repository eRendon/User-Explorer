import { Component, Input } from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [
    FontAwesomeModule
  ],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  @Input() icon!: IconDefinition
}
