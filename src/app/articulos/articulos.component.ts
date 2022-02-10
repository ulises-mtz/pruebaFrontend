import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar} from '@angular/material/snack-bar';
import { AgregarArticulosComponent } from './agregar-articulos/agregar-articulos.component';
import { ArticulosService } from './services/articulos.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  articulos: any[] = [];

  constructor(
    // instanciamos el servicio y los archivos que vamos a utilizar dentro del componente
    private articulosService: ArticulosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getArticulos();
  }

  getArticulos() {
    this.articulosService.getArticulo().subscribe(
      data => {
        this.articulos = data.data;
        console.log(data)
      },
      err => {
        console.log(err);
      }
    );
  }

   // Abrimos modal para agregar o actualizar productos
   updateArticulo(id: any) {
    this.dialog.open(AgregarArticulosComponent,{
      data: id
    }).afterClosed().subscribe(result => {
      if(result != undefined ){
        if(result.transaction == 'ok'){
          // El modal se cerro con objeto
          this.getArticulos();
        }else{
          // El modal se cerro sin objeto
          this.snackBar.open('No se guardo ningun registro', '', {
            duration: 1000
          });
        }
      }else{
        // El modal se cerro sin seleccionar algo, dandole click fuera
        this.snackBar.open('No se guardo ningun registro', '', {
          duration: 1000
        });
      }
    });
  }

  deleteProduct(id: any) {
    this.articulosService.deleteArticulo(id).subscribe(
      res => {
        this.snackBar.open('Articulo eliminado con exito', '', {
          duration: 1000
        });
        this.getArticulos()
      },
      err => {
        console.log(err);
      }
    )
  }

}
