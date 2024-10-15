import { CanActivateFn, Router } from '@angular/router'
import { UserRepository } from '../core/repository/user.repository'
import { inject } from '@angular/core'
import { ToastService } from '../core/services/toast/toast.service'

export const ScoreGuard: CanActivateFn = (route) => {
  const score = 30.0
  const router = inject(Router)
  const userRepository = inject(UserRepository)
  const username = route.paramMap.get('login')
  const toastService = inject(ToastService)
  const user = userRepository.getAllUsers().find(u => u.login === username)

  if (user && user.score >= score) {
    return true
  } else {
    if (user) {
      toastService.showToast(`Este usuario tiene puntuación menor a ${score} no puedes acceder a su perfil`, 'error')
    }
    router.navigate(['/'])
    return false
  }
};
