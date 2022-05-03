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

import { MatResponsiveNavComponent } from './components/mat-responsive-nav/mat-responsive-nav.component';
import { MatResponsiveNavHeaderComponent } from './components/mat-responsive-nav-header/mat-responsive-nav-header.component';
import { MatResponsiveNavSideComponent } from './components/mat-responsive-nav-side/mat-responsive-nav-side.component';
import { RecognizerComponent } from './pages/recognizer/recognizer.component';
import { CreatorComponent } from './pages/creator/creator.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MatTableIntervalComponent } from './components/mat-table-interval/mat-table-interval.component';
import { MatTableChordsComponent } from './components/mat-table-chords/mat-table-chords.component';
import { MatTableConcreteChordsComponent } from './components/mat-table-concrete-chords/mat-table-concrete-chords.component';

@NgModule({
  declarations: [
    AppComponent,
    MatResponsiveNavComponent,
    HomeComponent,
    MatResponsiveNavHeaderComponent,
    MatResponsiveNavSideComponent,
    LoginComponent,
    RecognizerComponent,
    CreatorComponent,
    ProfileComponent,
    MatTableIntervalComponent,
    MatTableChordsComponent,
    MatTableConcreteChordsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
