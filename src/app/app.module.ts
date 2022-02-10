import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticulosComponent } from './articulos/articulos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { HeaderComponent } from './header/header.component';
import { AgregarArticulosComponent } from './articulos/agregar-articulos/agregar-articulos.component';
import { AgregarCategoriasComponent } from './categorias/agregar-categorias/agregar-categorias.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticulosComponent,
    CategoriasComponent,
    HeaderComponent,
    AgregarArticulosComponent,
    AgregarCategoriasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
