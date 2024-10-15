import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { LoaderComponent } from '../../components/ui/loader/loader.component'
import { IconComponent } from '../../components/ui/icon/icon.component'
import { library } from '@fortawesome/fontawesome-svg-core';
import { GitHubIcon } from '../../components/ui/icon/GitHubIcon'
import { animate, style, transition, trigger } from '@angular/animations'

library.add(GitHubIcon)

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    LoaderComponent,
    IconComponent,
  ],
  animations: [
    trigger('routerTransition', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('0.5s ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent implements OnInit {
  private readonly cdr = inject(ChangeDetectorRef)
  gitHubIcon = GitHubIcon

  ngOnInit (): void {
    this.cdr.detectChanges()
  }
}
