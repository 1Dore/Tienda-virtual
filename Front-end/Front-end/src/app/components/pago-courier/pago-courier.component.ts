import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { formulario } from '../pago-producto/formularioTarjeta';
class Courier {
  value: String;
}

class sendCourrier{
    direccion:String
    postal:String
    courrier:String
    ip:String
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
  total:Number = 0;
  costoCourrier = 0;
  cobertura: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.pago = this.fb.group({

      courier: ['', Validators.required],
      direccion: ['', Validators.required],
      codigo_postal: ['', Validators.required],

    });

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

  onConsulta() {

    let datos_courrier = new sendCourrier();
    datos_courrier.courrier = this.pago.value.courier;
    datos_courrier.direccion = this.pago.value.direccion;
    datos_courrier.postal = this.pago.value.codigo_postal;
    datos_courrier.ip = " ";
    //obtengo la ip de courrier
    this.auth.getCourrierIP(datos_courrier).subscribe(data => {
        datos_courrier.ip = data.formularios.rows[0].c_ip;
        this.despuesConsulta(datos_courrier);
    });


  }

  despuesConsulta(data:sendCourrier){
    let datos_courrier = new sendCourrier();
    datos_courrier = data;

    let subtotal =Number (localStorage.getItem('total'));

    //cuanto me cobra?
    this.auth.askCourrierCosto(datos_courrier).subscribe(data => {
      if (Number(data.consultarprecio[3].costo) > 0){
        this.costoCourrier = Number(data.consultaprecio.costo);
        this.total = subtotal + this.costoCourrier;
        this.cobertura = true;
      }
      else{
        alert("No hay cobertura en tu zona, prueba con otro courrier");
      }

    });

  }



}
