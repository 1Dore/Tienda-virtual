import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import {formulario } from './formularioTarjeta';

interface Emisor {
  value: String;
  viewValue: String;
}

@Component({
  selector: 'app-pago-producto',
  templateUrl: './pago-producto.component.html',
  styleUrls: ['./pago-producto.component.scss']
})
export class PagoProductoComponent implements OnInit {

  emisores: Emisor[] = [
    { value: 'banrural', viewValue: 'Banrural' },
    { value: 'gyt', viewValue: 'G&T' },
    { value: 'bac', viewValue: 'BAC' }
  ];

  pago: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this.pago = this.fb.group({
      nombre: ['', Validators.required],
      tarjeta: ['', Validators.required],
      fecha_vencM: ['', Validators.required],
      fecha_vencY: ['', Validators.required],
      num_seguridad: ['', Validators.required],
      monto: ['', Validators.required],
      emisor: ['', Validators.required]
    });
  }

  irA(ruta: string) {
    this.router.navigateByUrl(ruta);
  }

  onSubmit(ruta: string) {
    let form:formulario;
    form = new formulario();
    //todo lo que selecciona y agrega el usuario en frontend se agrega a un formato prehecho
    form.nombre = this.pago.value.nombre;
    form.tarjeta = this.pago.value.tarjeta;
    form.fecha_venc = this.pago.value.fecha_vencY + " "+ this.pago.value.fecha_vencM;
    form.num_seguridad = this.pago.value.num_seguridad;
    form.monto = this.pago.value.monto;

    let emisor = this.pago.value.emisor;

    this.auth.getEmisor(emisor).subscribe(data => {
      emisor = data.formularios.e_ip;
    });

    this.auth.solicitarAutorizacion(emisor, form).subscribe(data => {
        console.log("aqui deberia de haber algo");
    });
  }

}
