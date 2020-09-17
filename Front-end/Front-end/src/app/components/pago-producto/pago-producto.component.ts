import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { PagoCourierComponent } from '../pago-courier/pago-courier.component';
import { formulario } from './formularioTarjeta';

class Emisor {
  value: String;
}

class Courier {
  value: String;
}

@Component({
  selector: 'app-pago-producto',
  templateUrl: './pago-producto.component.html',
  styleUrls: ['./pago-producto.component.scss']
})

export class PagoProductoComponent implements OnInit {

  emisores: Emisor[] = [];

  pago: FormGroup;
  courier: String;
  orden: String;
  direccion: String;
  codigo: String;

  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    let temp_couriers = new Array<Courier>();
    let temp_emisores = new Array<Emisor>();


    this.pago = this.fb.group({
      nombre: ['', Validators.required],
      tarjeta: ['', Validators.required],
      fecha_vencM: ['', Validators.required],
      fecha_vencY: ['', Validators.required],
      num_seguridad: ['', Validators.required],
      emisor: ['', Validators.required],
      courier: ['', Validators.required],
      direccion: ['', Validators.required],
      codigo_postal: ['', Validators.required],

    });

    this.auth.getAllEmisores().subscribe((res) => {
      console.log(res);
      res.formularios.rows.forEach((element) => {
        console.log(element.compañia);
        this.emisores = [{ value: element.compañia }];
        temp_emisores.push(this.emisores[0]);

      });
      this.emisores = temp_emisores;

    });
  }

  irA(ruta: string) {
    this.router.navigateByUrl(ruta);
  }

  onSubmit(ruta: string) {
    
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(PagoCourierComponent, {
      width: '500px',
      data: { courier: this.courier, direccion: this.direccion, codigo: this.codigo }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.courier = result;
    });
  }
}

