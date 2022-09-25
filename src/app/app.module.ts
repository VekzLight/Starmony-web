import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';

import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { OrderSelectElementComponent } from './components/order-select-element/order-select-element.component';
import { OrderSelectorDirective } from './directives/order-selector.directive';

import { SeekerComponent } from './components/seeker/seeker.component';
import { OverlayComponent } from './components/overlay/overlay.component';
import { TabConfigElementComponent } from './components/tab-config-element/tab-config-element.component';
import { ConfigNotesComponent } from './components/config-notes/config-notes.component';
import { NotesSelectorComponent } from './components/notes-selector/notes-selector.component';
import { SeekerResultTableComponent } from './components/seeker-result-table/seeker-result-table.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AwaitingComponent } from './pages/awaiting/awaiting.component';
import { CollectionComponent } from './components/collection/collection.component';
import { AnalizerComponent } from './components/analizer/analizer.component';
import { GeneratorComponent } from './components/generator/generator.component';
import { SelectElementsComponent } from './components/select-elements/select-elements.component';
import { StarmonyHeaderComponent } from './components/starmony-header/starmony-header.component';
import { UniqueElementPipe } from './pipes/unique-element.pipe';
import { ElementDetailComponent } from './components/element-detail/element-detail.component';
import { InterceptorLoaderService } from './services/interceptor-loader.service';
import { AnalizerChordComponent } from './components/analizer-chord/analizer-chord.component';
import { AnalizerIntervalComponent } from './components/analizer-interval/analizer-interval.component';
import { AnalizerProgressionComponent } from './components/analizer-progression/analizer-progression.component';
import { AnalizerScaleComponent } from './components/analizer-scale/analizer-scale.component';
import { GeneratorGuiComponent } from './components/generator-gui/generator-gui.component';
import { IntervalsSelectorComponent } from './components/intervals-selector/intervals-selector.component';
import { GeneratorScaleComponent } from './components/generator-scale/generator-scale.component';
import { GradeSelectorComponent } from './components/grade-selector/grade-selector.component';
import { GeneratorProgressionComponent } from './components/generator-progression/generator-progression.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SeekerComponent,
    OrderSelectElementComponent,
    OrderSelectorDirective,
    OverlayComponent,
    TabConfigElementComponent,
    ConfigNotesComponent,
    NotesSelectorComponent,
    SeekerResultTableComponent,
    MainComponent,
    LoginComponent,
    ContactoComponent,
    AwaitingComponent,
    CollectionComponent,
    AnalizerComponent,
    GeneratorComponent,
    SelectElementsComponent,
    StarmonyHeaderComponent,
    UniqueElementPipe,
    ElementDetailComponent,
    AnalizerChordComponent,
    AnalizerIntervalComponent,
    AnalizerProgressionComponent,
    AnalizerScaleComponent,
    GeneratorGuiComponent,
    IntervalsSelectorComponent,
    GeneratorScaleComponent,
    GradeSelectorComponent,
    GeneratorProgressionComponent
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
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:InterceptorLoaderService, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
