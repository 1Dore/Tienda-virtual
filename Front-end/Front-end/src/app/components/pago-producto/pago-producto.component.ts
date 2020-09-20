import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { PagoCourierComponent } from '../pago-courier/pago-courier.component';
import { formulario } from './formularioTarjeta';
import { formCourrier } from './formularioCourrier';
import { info } from 'console';
//import { info } from 'console';

class Emisor {
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
  estats: String;
  u_id: number;
  total: number;

  info_Pedido: formCourrier = new formCourrier();


  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.u_id = Number(localStorage.getItem('UserID'));
    let temp_emisores = new Array<Emisor>();


    this.pago = this.fb.group({
      tarjeta: ['', Validators.required],
      fecha_vencM: ['', Validators.required],
      fecha_vencY: ['', Validators.required],
      num_seguridad: ['', Validators.required],
      nombre: ['', Validators.required],
      emisor: ['', Validators.required]
    });

    this.auth.getAllEmisores().subscribe((res) => {
      res.formularios.rows.forEach((element) => {
        this.emisores = [{ value: element.compañia }];
        temp_emisores.push(this.emisores[0]);

      });
      this.emisores = temp_emisores;
      console.log(JSON.parse(localStorage.getItem('datos_Courrier')));
    });

    this.auth.newPedido({ u_id: this.u_id }).subscribe();
  }

  irA(ruta: string) {
    this.router.navigateByUrl(ruta);
  }

  onSubmit(ruta: string) {

    let pago: formulario = new formulario();
    pago.tarjeta = this.pago.value.tarjeta;
    pago.ip = " ";
    pago.extension = " ";
    pago.emisor = this.pago.value.emisor

    //este ifelse es para cercioroarnos de mandar los meses tip YYYY0M cuando M < 10
    if (this.pago.value.fecha_vencM < 10) {
      pago.fecha_venc = "0" + this.pago.value.fecha_vencM;
      pago.fecha_venc = String(this.pago.value.fecha_vencY +""+ pago.fecha_venc);
    }
    else {
      //esto manda YYYYMM cuando M > 10
      pago.fecha_venc = this.pago.value.fecha_vencY+ "" + this.pago.value.fecha_vencM;
    }

    pago.num_seguridad = this.pago.value.num_seguridad;
    pago.nombre = this.pago.value.nombre;

    if(pago.nombre.indexOf(' ') >= 0){
     pago.nombre =  pago.nombre.replace(" ", "%20");
    }

    //pedir ip
    pago.monto = Number (localStorage.getItem('total'));
    this.total = Number(localStorage.getItem('total'));
    console.log(pago);
    this.auth.getEmisorIP(pago).subscribe(data => {
      console.log(data.formularios.rows[0]);
      pago.ip = data.formularios.rows[0].e_ip;
      pago.extension = data.formularios.rows[0].extencion;
      this.despuesConsultaIP(pago);

    });

  }


  despuesConsultaIP(pago: formulario) {
    let datos_tarjeta: formulario = pago;
    this.auth.solicitarAutorizacion(datos_tarjeta).subscribe(data => {
      console.log(data);  
      if (data.autorización.numero > 0) {
        alert("Pago aceptado")
        this.info_Pedido.emisor = pago.emisor;
        this.terminarPedido()
      }
      else {
        alert("Pago rechazado, porfavor utilize otro metodo de pago");
      }

    });
    //Codigo para evitar la tarjeta
    this.info_Pedido.emisor = pago.emisor;
    this.terminarPedido()
  }

  terminarPedido() {
    let temp = JSON.parse(localStorage.getItem('datos_Courrier'));
    this.info_Pedido.nombre = this.pago.value.nombre;
    this.info_Pedido.codigo_postal = temp.postal;
    this.info_Pedido.direccion = temp.direccion;
    this.info_Pedido.ip = temp.ip;
    this.info_Pedido.total = this.total;
    this.auth.getPedidoIDNulls({ u_id: this.u_id }).subscribe((res) => {
      
      if (res.formularios.rows.length > 0) {
        this.info_Pedido.p_id = res.formularios.rows[0].p_id;
        this.statusPedido();
      }
    });
  }

  statusPedido() {
    let temp = JSON.parse(localStorage.getItem('datos_Courrier'));
    this.info_Pedido.direccion = temp.direccion;
    console.log(temp);
    this.info_Pedido.codigo_postal = temp.postal;
    this.info_Pedido.estatus = "PENDIENTE";
    this.info_Pedido.courrier = temp.courrier;
    this.info_Pedido.nombre = this.pago.value.nombre;
    this.auth.terminarPedido(this.info_Pedido).subscribe((res) => {
      if (res.status == 1) {
        alert("Pedido terminado.")
        console.log("IMPRIMIRE EL STATUS");
        console.log(res.status);
        this.enviarPedidoFinal(this.info_Pedido);
      }
      else {
        alert("Error");
        console.log(this.info_Pedido);
        console.log("IMPRIMIRE EL STATUS");
        console.log(res.status);
      }
    });
  }


  
  enviarPedidoFinal(info_Pedido: formCourrier) {
    this.auth.askCourrierEnvio(info_Pedido).subscribe(x => alert("Se envio el pedido"));
  }

}

