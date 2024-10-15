import { Component, inject, OnInit } from '@angular/core'
import { ToastService } from '../../../core/services/toast/toast.service'
import { IToast } from '../../../interfaces/IToast'
import { NgClass } from '@angular/common'
import { animate, state, style, transition, trigger } from '@angular/animations'

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    NgClass
  ],
  animations: [
    trigger('toastAnimation', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(100%)' }), // Comienza fuera de la vista a la derecha
        animate('0.5s ease-in-out', style({ opacity: 1, transform: 'translateX(0)' })) // Desliza a la vista
      ]),
      transition('* => void', [
        animate('0.5s ease-in-out', style({ opacity: 0, transform: 'translateX(100%)' })) // Desliza fuera de la vista a la derecha
      ])
    ])
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit {
  toastMessage: IToast | null = null;
  private readonly toastService = inject(ToastService)


  ngOnInit() {
    this.toastService.toastState$.subscribe((message) => {
      this.toastMessage = message;
      if (message) {
        setTimeout(() => this.closeToast(), message.duration || 3000); // Auto-close after duration
      }
    });
  }

  getToastClasses() {
    if (!this.toastMessage) return '';

    const baseClasses = "transition-all duration-300 ease-in-out";
    const typeClasses = {
      success: "bg-green-500 text-white",
      error: "bg-red-500 text-white",
      info: "bg-blue-500 text-white"
    };

    return `${baseClasses} ${typeClasses[this.toastMessage.type || 'info']}`;
  }

  closeToast() {
    this.toastMessage = null;
  }
}
