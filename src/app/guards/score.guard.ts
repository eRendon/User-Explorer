import { CanActivateFn, Router } from '@angular/router'
import { UserRepository } from '../core/services/user.repository'
import { inject } from '@angular/core'

export const ScoreGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const userRepository = inject(UserRepository)
  const username = route.paramMap.get('login')
  console.log(username)
  console.log(userRepository.getAllUsers())
  const user = userRepository.getAllUsers().find(u => u.login === username)
  console.log(user)
  return !!(user && user.score >= 0.1);
};
