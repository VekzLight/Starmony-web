import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { SeekerComponent } from './components/seeker/seeker.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { CollectionComponent } from './components/collection/collection.component';
import { SelectElementsComponent } from './components/select-elements/select-elements.component';
import { AnalizerComponent } from './components/analizer/analizer.component';
import { GeneratorComponent } from './components/generator/generator.component';
import { ElementDetailComponent } from './components/element-detail/element-detail.component';
import { GeneratorGuiComponent } from './components/generator-gui/generator-gui.component';

const routes: Routes = [
  { path: 'home',         component: HomeComponent,
    children:[
      { path: 'seeker',             component: SeekerComponent},
      { path: 'collection',         component: CollectionComponent},
      { path: 'elements_selector',  component: SelectElementsComponent},
      { path: 'analizer',           component: AnalizerComponent},
      { path: 'generator',          component: GeneratorComponent},
      { path: 'element_detail',     component: ElementDetailComponent},
      { path: 'generator_gui',     component: GeneratorGuiComponent},
    ]},
  { path: 'login/:type',  component: LoginComponent},
  { path: 'main',         component: MainComponent},
  { path: 'contact',      component: ContactoComponent},   
  { path: '', redirectTo: '/main', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'}),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
