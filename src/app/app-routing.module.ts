import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { SeekerComponent } from './components/seeker/seeker.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent,
      children:[
        { path: 'seeker', component: SeekerComponent}
      ]},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'}),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
