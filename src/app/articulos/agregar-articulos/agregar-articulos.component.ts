import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticulosService } from '../services/articulos.service';
import { CategoriasService } from '../../categorias/services/categorias.service';
import { MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-agregar-articulos',
  templateUrl: './agregar-articulos.component.html',
  styleUrls: ['./agregar-articulos.component.css']
})
export class AgregarArticulosComponent implements OnInit {

  categorias: any[] = [];
  precioParaPushear = 0;

  articulo = {
    id: '',
    clave: '',
    nombre: '',
    activo: true,
    precios: [
      {
        precio: 1
      }
    ],
    categoria: 0
  };
  precios: any=[{}];

  constructor(
    private articulosService: ArticulosService,
    private categoriaService: CategoriasService,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    public dialoRef: MatDialogRef<AgregarArticulosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

 
    ngOnInit(): void {
      this.getCategorias();
      if (this.data !== 'new'){
       this.articulo = this.data
       this.articulo.categoria = this.data.categoria.id
      }
    }

    addArticulo(){  
      console.log(this.articulo);
      if (this.data !== 'new'){
        this.articulosService.updateArticulo(this.articulo.id, this.articulo).subscribe(
          res => {
           console.log('ulises',res);
           this.close(true);
           this.snackBar.open('Articulo actualizado con exito', '', {
            duration: 1000
          });
          },
          err => console.log(err)
        )

      }else{
        this.articulosService.createArticulo(this.articulo).subscribe(
          res => {
           console.log('ulises',res);
           this.close(true);
           this.snackBar.open('Articulo creado con exito', '', {
            duration: 1000
          });
          },
          err => console.log(err)
        )
      }
       
    }

    getCategorias() {
      this.categoriaService.getCategoria().subscribe(
        data => {
          this.categorias = data.data;
          console.log('uli',data)
        },
        err => {
          console.log(err);
        }
      );
    }

    addPrecio(){
      // this.precios.push(this.articulo.precios);
      // console.log(this.precios)
      // this.articulo.precios = this.precios;
      this.articulo.precios.push({precio: this.precioParaPushear});
      console.log(this.articulo)

    }
    deletePrecio(){
      // for (let i = 0; i < this.articulo.precios.length; i++){
      //   this.articulo.precios.splice(i, 1);
      // }

      for (let i = 0; i < this.articulo.precios.length; i++){
        if (this.articulo.precios[i].precio){
          this.articulo.precios.splice(i, 1);
          break;
        }
      }
    }

  close(status: any){
    const object = {
      transaction:'',
      code:'',
      object:{}
    };
    if(status){
      object.transaction = 'ok';
      object.object = this.articulo;
    }else{
      object.transaction = 'bad';
      object.code = 'characteristic:001';
    }
    this.dialoRef.close(object);
  }

  cancelar() {
    this.close(true);
  }

}
