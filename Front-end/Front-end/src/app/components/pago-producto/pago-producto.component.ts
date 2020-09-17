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
    let form: formulario;
    let cobertura: Boolean = true;
    let pagado: Boolean = false;
    form = new formulario();

    //para pedir courrier
    let direccion;
    let direccionip = this.pago.value.courier; //busco el courrier por nombre
    this.auth.getCourrier(direccionip).subscribe(data => {  //adquiero la ip del courrier buscado por nombre
      direccionip = data.formularios.rows.ip;
    });

    this.auth.askCourrierCosto(direccionip, direccion).subscribe(x => {
      if (x.consultaprecio.costo > 0) {
        alert("El courrier tiene cobertura");
        this.pago.value.monto = this.pago.value.monto + x.consultaprecio.costo;
      }
      else {
        cobertura = false;    //si es false no hace cobro alguno
      }

    });

    //le doy al formulario los valores que fueron ingresados en el html
    form.nombre = this.pago.value.nombre;
    form.tarjeta = this.pago.value.tarjeta;
    form.fecha_venc = this.pago.value.fecha_vencY + " " + this.pago.value.fecha_vencM;
    form.num_seguridad = this.pago.value.num_seguridad;
    form.monto = Number(localStorage.getItem('total'));
    form.courrier = this.pago.value.courrier;

    let emisor = this.pago.value.emisor;
    form.compañia = emisor;
    //todo lo que selecciona y agrega el usuario en frontend se agrega a un formato prehecho
    //para pagar con tarjeta
    if (cobertura) {  //si no hay cobertura no se hace ningun cobro

      this.auth.getEmisor(emisor).subscribe(data => {
        emisor = data.formularios.rows.e_ip;
      });

      this.auth.solicitarAutorizacion(emisor, form).subscribe(data => {
        form.numero = data.autorizacion.numero
        pagado = true;
      });
      this.pago.reset();
    }

    else {
      alert("Este courrier no tiene cobertura, por favor seleccione otro");
    }
    if (pagado) {
      //inicializo el pedido con todos los campos
      form.u_id = Number(localStorage.getItem('UserID'));
      this.auth.createNewPedido(form).subscribe(x => {
        if (x.status == 1) console.log("pedido creado");
        else console.log(x);
      });
      //hago el pedido al courrier
      this.auth.askCourrierEnvio(direccionip, form).subscribe(data => {
        console.log("pedido solicitado");
      });

    }
    else {
      alert("pago rechazado");
    }

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

