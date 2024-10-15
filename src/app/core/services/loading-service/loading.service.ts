import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false)

  setIsLoading(payload: boolean): void {
    this.isLoading.next(payload)
  }

  getIsLoading(): Observable<boolean> {
    return this.isLoading.asObservable()
  }
}
