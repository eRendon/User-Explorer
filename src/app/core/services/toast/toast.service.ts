import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { IToast } from '../../../interfaces/IToast'

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new BehaviorSubject<IToast | null>(null);
  toastState$ = this.toastSubject.asObservable();

  showToast(message: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 3000) {
    this.toastSubject.next({ message, type, duration });

    setTimeout(() => {
      this.toastSubject.next(null); // Close the toast after duration
    }, duration);
  }
}
