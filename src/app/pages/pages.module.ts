import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { ProfileComponent } from './profile/profile.component'
import { ScoreGuard } from '../guards/score.guard'

const routesPages: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'profile/:login', component: ProfileComponent, canActivate: [ScoreGuard]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routesPages)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesModule { }
