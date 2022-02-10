import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar} from '@angular/material/snack-bar';
import { CategoriasService } from './services/categorias.service';
import { AgregarCategoriasComponent } from './agregar-categorias/agregar-categorias.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias: any[] = [];

  constructor(
    // instanciamos el servicio y los archivos que vamos a utilizar dentro del componente
    private categoriasService: CategoriasService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriasService.getCategoria().subscribe(
      data => {
        this.categorias = data.data;
        console.log(data)
      },
      err => {
        console.log(err);
      }
    );
  }

  // Abrimos modal para agregar o actualizar categorias
  updateCategoria(id: any) {
    this.dialog.open(AgregarCategoriasComponent,{
      data: id
    }).afterClosed().subscribe(result => {
      if(result != undefined ){
        if(result.transaction == 'ok'){
          // El modal se cerro con objeto
          this.getCategorias();
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
    this.categoriasService.deleteCategoria(id).subscribe(
      res => {
        this.snackBar.open('Categoría eliminada con exito ', '', {
          duration: 1000
        });
        this.getCategorias();
      },
      err => {
        console.log(err);
      }
    )
  }

}
