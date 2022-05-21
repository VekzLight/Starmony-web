import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { GeneratorComponent } from './pages/generator/generator.component';
import { RecognizerComponent } from './pages/recognizer/recognizer.component';
import { CreatorComponent } from './pages/creator/creator.component';

import { RecognizerChordComponent } from './components/recognizer-chord/recognizer-chord.component';
import { RecognizerScaleComponent } from './components/recognizer-scale/recognizer-scale.component';
import { RecognizerIntervalComponent } from './components/recognizer-interval/recognizer-interval.component';
import { RecognizerProgressionComponent } from './components/recognizer-progression/recognizer-progression.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { CreatorScaleComponent } from './components/creator-scale/creator-scale.component';
import { CreatorProgressionComponent } from './components/creator-progression/creator-progression.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'generator', component: GeneratorComponent},
  { path: 'recognizer', component: RecognizerComponent,
      children:[
        { path: 'chord', component: RecognizerChordComponent},
        { path: 'scale', component: RecognizerScaleComponent},
        { path: 'interval', component: RecognizerIntervalComponent},
        { path: 'progression', component: RecognizerProgressionComponent},
      ]},
  { path: 'creator', component: CreatorComponent,
      children:[
        { path: 'scale', component: CreatorScaleComponent},
        { path: 'progression', component: CreatorProgressionComponent},
      ]},
  { path: 'profile', component: ProfileComponent},
  { path: 'collection', component: CollectionComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'}),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
