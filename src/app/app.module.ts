import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';

import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

import { RecognizerComponent } from './pages/recognizer/recognizer.component';
import { CreatorComponent } from './pages/creator/creator.component';
import { GeneratorComponent } from './pages/generator/generator.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecognizerChordComponent } from './components/recognizer-chord/recognizer-chord.component';
import { RecognizerScaleComponent } from './components/recognizer-scale/recognizer-scale.component';
import { RecognizerIntervalComponent } from './components/recognizer-interval/recognizer-interval.component';
import { RecognizerProgressionComponent } from './components/recognizer-progression/recognizer-progression.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollectionComponent } from './pages/collection/collection.component';
import { CreatorScaleComponent } from './components/creator-scale/creator-scale.component';
import { CreatorProgressionComponent } from './components/creator-progression/creator-progression.component';
import { SeekerComponent } from './components/seeker/seeker.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { OrderSelectElementComponent } from './components/order-select-element/order-select-element.component';
import { OrderSelectorDirective } from './directives/order-selector.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RecognizerComponent,
    CreatorComponent,
    GeneratorComponent,
    ProfileComponent,
    RecognizerChordComponent,
    RecognizerScaleComponent,
    RecognizerIntervalComponent,
    RecognizerProgressionComponent,
    CollectionComponent,
    CreatorScaleComponent,
    CreatorProgressionComponent,
    SeekerComponent,
    OrderSelectElementComponent,
    OrderSelectorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
