import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { AdminComponent } from '../admin/admin.component';
import { ExistenciasComponent } from '../existencias/existencias.component';

interface Categoria {
  value: String;
  viewValue: String;
}
@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.component.html',
  styleUrls: ['./agregar-productos.component.scss']
})
export class AgregarProductosComponent implements OnInit {
  categorias: Categoria[] = [
    { value: 'P', viewValue: 'Pintura' },
    { value: 'F', viewValue: 'Fotografía' },
    { value: 'E', viewValue: 'Escutltura' }
  ];
  constructor(public dialogRef: MatDialogRef<AdminComponent>, private router: Router, private auth: AuthService, private fb: FormBuilder) { }
  agregarProducto: FormGroup;

  ngOnInit(): void {
    this.agregarProducto = this.fb.group({
      nombre: ['', Validators.required],
      existencia: ['', Validators.required],
      autor: ['', Validators.required],
      descripcion: ['', Validators.required],
      foto: 'test',
      precio: ['', Validators.required],
      categoria: ['', Validators.required]
    })
  }
  irA(ruta: string) {
    this.router.navigateByUrl(ruta);
    this.dialogRef.close();
  }

  onSubmit(ruta: string) {
    let agregarProducto = this.agregarProducto.value;

    this.auth.insertProduct(agregarProducto).subscribe((data) => {
      if (data.status == 1) {
        alert("Producto insertado con exito");
        this.router.navigateByUrl(ruta);

      }
      else {
        alert("Fallido");
      }
    });
    this.agregarProducto.reset();

  }
}




