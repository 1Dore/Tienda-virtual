import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { formulario } from '../pago-producto/formularioTarjeta';
class Courier {
  value: String;
}
@Component({
  selector: 'app-pago-courier',
  templateUrl: './pago-courier.component.html',
  styleUrls: ['./pago-courier.component.scss']
})
export class PagoCourierComponent implements OnInit {
  couriers: Courier[] = [];

  pago: FormGroup;
  courier: String;
  orden: String;
  direccion: String;
  codigo: String;
  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    let temp_couriers = new Array<Courier>();

    this.auth.getAllCourriers().subscribe((res) => {
      console.log(res);
      res.formularios.rows.forEach((element) => {
        console.log(element.c_nombre);
        this.couriers = [{ value: element.c_nombre }];
        temp_couriers.push(this.couriers[0]);

      });
      this.couriers = temp_couriers;

    });
  }
  irA(ruta: string) {
    this.router.navigateByUrl(ruta);
    this.dialog.closeAll();
  }

  onSubmit(ruta: string) {
    /*let form: formulario;
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


    form.courrier = this.pago.value.courrier;*/

    //todo lo que selecciona y agrega el usuario en frontend se agrega a un formato prehecho
    //para pagar con tarjeta
    /*if (cobertura) {  //si no hay cobertura no se hace ningun cobro

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
    }*/
  }
}
