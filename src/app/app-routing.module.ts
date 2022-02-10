import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticulosComponent } from './articulos/articulos.component';
import { HomeComponent } from './home/home.component';
import { AgregarArticulosComponent } from './articulos/agregar-articulos/agregar-articulos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { AgregarCategoriasComponent } from './categorias/agregar-categorias/agregar-categorias.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full'},
  { path: 'articulos', component: ArticulosComponent},
  { path: 'agregarArticulos/update', component: AgregarArticulosComponent},
  { path: 'categorias', component: CategoriasComponent},
  { path: 'agregarCategorias/update', component: AgregarCategoriasComponent},
  { path: 'home', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
