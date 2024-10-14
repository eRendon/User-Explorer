import { Component, Input } from '@angular/core'
import { NgClass } from '@angular/common'
import { cn } from '../../../libs/utils'
import { IconComponent } from '../icon/icon.component'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    NgClass,
    IconComponent
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' = 'default'
  @Input() size: 'default' | 'sm' | 'lg' | 'icon' = 'default';
  @Input() class: string = ''
  @Input() disabled: boolean = false;

  @Input() icon?: IconDefinition
  getClasses() {
    return cn(
      "inline-flex gap-3 rounded items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      {
        'bg-primary text-primary-foreground hover:bg-primary/90': this.variant === 'default',
        'bg-destructive text-destructive-foreground hover:bg-destructive/90': this.variant === 'destructive',
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground': this.variant === 'outline',
        'bg-secondary text-secondary-foreground hover:bg-secondary/80': this.variant === 'secondary',
        'hover:bg-accent hover:text-accent-foreground': this.variant === 'ghost',
        'text-primary underline-offset-4 hover:underline': this.variant === 'link',
      },
      {
        'h-10 px-4 py-2': this.size === 'default',
        'h-9 rounded-md px-3': this.size === 'sm',
        'h-11 rounded-md px-8': this.size === 'lg',
        'h-10 w-10': this.size === 'icon',
      },
      this.class
    );
  }

  handleClick(event: Event): void {
    // Manejo del evento de clic si se desea
    console.log('Button clicked:', event);
  }
}
