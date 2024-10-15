import { Component, EventEmitter, Input, Output } from '@angular/core'
import { cn } from '../../../libs/utils'
import { NgClass } from '@angular/common'

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Input() error: string = '';
  @Input() className?: string;

  @Output() onClose: EventEmitter<boolean> = new EventEmitter
  protected readonly cn = cn

  onCloseModal(): void {
    this.onClose.emit(false)
  }
}
