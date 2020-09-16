import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { formulario } from './formularioTarjeta';

interface Emisor {
  value: String;
  viewValue: String;
}

interface Courier {
  value: String;
  viewValue: String;
}

class CourierC {
  nombre: String;
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
  couriers: Array<CourierC>[] = [];

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
      emisor: ['', Validators.required],
      courier: ['', Validators.required],
    });
  }

  irA(ruta: string) {
    this.router.navigateByUrl(ruta);
  }

  onSubmit(ruta: string) {
    let form: formulario;
    let cobertura:Boolean = true;
    form = new formulario();

    //para pedir courrier
    let direccion = this.pago.value.courier
    this.auth.getCourrier(direccion).subscribe(data => {

      if (data.consultaprecio.costo > 0){
        alert("El courrier tiene cobertura");
        this.pago.value.monto = this.pago.value.monto + data.consultaprecio.costo;
      }
      else {
        cobertura = false;    //si es false no hace cobro alguno
      }

    });


    form.nombre = this.pago.value.nombre;
    form.tarjeta = this.pago.value.tarjeta;
    form.fecha_venc = this.pago.value.fecha_vencY + " " + this.pago.value.fecha_vencM;
    form.num_seguridad = this.pago.value.num_seguridad;
    form.monto = this.pago.value.monto;

    let emisor = this.pago.value.emisor;

    //todo lo que selecciona y agrega el usuario en frontend se agrega a un formato prehecho
    //para pagar con tarjeta
    if(cobertura){  //si no hay cobertura no se hace ningun cobro

      this.auth.getEmisor(emisor).subscribe(data => {
        emisor = data.formularios.e_ip;
      });
  
      this.auth.solicitarAutorizacion(emisor, form).subscribe(data => {
        console.log("aqui deberia de haber algo");
      });
      this.pago.reset();
    }

    else{
      alert("Este courrier no tiene cobertura, por favor seleccione otro");
    }

  }

}
