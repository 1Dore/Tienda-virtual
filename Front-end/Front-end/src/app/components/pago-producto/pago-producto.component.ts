import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import {formulario } from './formularioTarjeta';



@Component({
  selector: 'app-pago-producto',
  templateUrl: './pago-producto.component.html',
  styleUrls: ['./pago-producto.component.scss']
})
export class PagoProductoComponent implements OnInit {



  register: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this.register = this.fb.group({
      nombre: ['', Validators.required],
      tarjeta: ['', Validators.required],
      fecha_venc: ['', Validators.required],
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
    form.nombre = this.register.value.nombre;
    form.tarjeta = this.register.value.tarjeta;
    form.fecha_venc = this.register.value.fecha_venc;
    form.num_seguridad = this.register.value.num_seguridad;
    form.monto = this.register.value.monto;
    let emisor = this.register.value.emisor;
    this.auth.getEmisor(emisor).subscribe(data => {
      emisor = data.formularios.e_ip;
    });

    this.auth.solicitarAutorizacion(emisor, form).subscribe(data => {
      
    });
  }

}
