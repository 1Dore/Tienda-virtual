import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

class Pedido{
  p_id:number;
  dir_entrega:string;
  codigo_postal:string;
  estatus:string;
  u_id:number;
  u_name:string;
  e_id:number;
  e_name:string
  c_id:number;
  c_name:string;
}

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  u_id:number = Number(localStorage.getItem('UserID'));

  listaPedidos: Array<Pedido> = new Array<Pedido>();

  constructor(private servico:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.getPedidos();
  }


  getPedidos(){
    this.servico.getPedidos({u_id: this.u_id}).subscribe((rows) => {
      if (rows.formularios.rows.length > 0) {
        rows.formularios.rows.forEach((element) => {
          //meto las cosas al temp
          let temp:Pedido= new Pedido();    //uso la interfaz Pedido
          temp.p_id = element.p_id;
          temp.dir_entrega = element.dir_entrega;
          temp.codigo_postal = element.codigo_postal;
          temp.estatus = element.estatus;
          temp.u_id = this.u_id;
          temp.e_id = element.e_id;
          temp.c_id = element.c_id;

          // Nombre del Emisor
          this.servico.getE_name({e_id: element.e_id}).subscribe((rows) => {
            if (rows.formularios.rows.length > 0) {
              temp.e_name =  rows.formularios.rows[0].compañia;
            }
            else {
              temp.e_name =  'No Encontrado';
            }
          })

          //Nombre del Courier
          this.servico.getC_name({c_id: element.c_id}).subscribe((rows) => {
            if (rows.formularios.rows.length > 0) {
              temp.c_name =  rows.formularios.rows[0].c_nombre;
            }
            else {
              temp.c_name =  'No Encontrado';
            }
          })
          

          //Nombre del Usuario
          this.servico.getU_name({u_id: element.u_id}).subscribe((rows) => {
            if (rows.formularios.rows.length > 0) {
              temp.u_name =  rows.formularios.rows[0].nombre + rows.formularios.rows[0].apellido;
            }
            else {
              temp.u_name =  'no Encontrado';
            }
          })
          //meto el temp a la lista
          this.listaPedidos.push(temp);
        });
      }
      else {
        alert("Pedido no encontrado");
        console.log(rows.message);
      }
    });
  }

}
