import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  constructor(public dialogRef: MatDialogRef<AdminComponent>, private router: Router) { }
  agregarProducto: FormGroup;

  ngOnInit(): void {
  }
  irA(ruta: string) {
    this.router.navigateByUrl(ruta);
    this.dialogRef.close();
  }

  onSubmit(){

  }
}




