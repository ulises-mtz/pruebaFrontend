import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar} from '@angular/material/snack-bar';
import { CategoriasService } from '../services/categorias.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-agregar-categorias',
  templateUrl: './agregar-categorias.component.html',
  styleUrls: ['./agregar-categorias.component.css']
})
export class AgregarCategoriasComponent implements OnInit {


  complexForm: FormGroup;

  categoria:any = {
    clave: '',
    fechaCreado: '',
    nombre: '',
    activa: true
  };
  

  constructor(
    private categoriaService: CategoriasService,
    private router: Router,
    public fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialoRef: MatDialogRef<AgregarCategoriasComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
    ) { 
      this.complexForm = fb.group({
        'clave': [null, Validators.compose([Validators.required])],
        'name': [null, Validators.compose([Validators.required])],
        'fecha': [null, Validators.compose([Validators.required])]    
      });
      
    }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data !== 'new'){
      this.categoria = this.data
      const time = new Date().getTime();
      const date = new Date(time);
      this.categoria.fechaCreado = date
    }
  }


  addCategoria(){
    console.log(this.categoria)
    if (this.data !== 'new'){
      this.categoriaService.updateCategoria(this.categoria.id, this.categoria).subscribe(
        res => {
         console.log('ulises',res);
         this.snackBar.open('Categoria actualizada con exito', '', {
          duration: 1000
        });
         this.close(true);
        },
        err => console.log(err)
      )
    }else{
      const tmpDate = new Date(this.categoria.fechaCreado)
      const now = tmpDate.getTime();
      this.categoria.fechaCreado = now
  
       this.categoriaService.createCategoria(this.categoria).subscribe(
         res => {
          console.log('ulises',res);
          this.snackBar.open('Categoria Agregada con exito', '', {
            duration: 1000
          });
          this.close(true);
         },
         err => console.log(err)
       )
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
      object.object = this.categoria;
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
