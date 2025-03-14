import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarModule } from 'primeng/toolbar';
import { AuthModule } from './features/auth/auth.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { clientModule } from './features/usuarios/client.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    clientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ToolbarModule,
    AuthModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
