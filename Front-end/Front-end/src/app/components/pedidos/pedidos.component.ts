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
  compañia:number;
  c_name:string;
  total:number;
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
          temp.compañia = element.compañia;
          temp.c_name = element.c_nombre;
          temp.total = element.total;

          //Nombre del Usuario
          this.servico.getU_name({u_id: element.u_id}).subscribe((rows) => {
            if (rows.formularios.rows.length > 0) {
              temp.u_name =  rows.formularios.rows[0].nombre + rows.formularios.rows[0].apellido;
            }
            else {
              temp.u_name =  'no Encontrado';
            }
          });

          this.servico.getCourrierIP({courrier: element.c_nombre}).subscribe((rows) => {
            let ip = rows.formularios.rows[0].c_ip;
            this.servico.askCourrierStatus(ip, {pedido_id: temp.p_id}).subscribe((x) => {
              temp.estatus = x.orden.status;
            });
          });
          
          //meto el temp a la lista
          this.listaPedidos.push(temp);
        });
      }
      else {
        alert("Pedido no encontrado");
        console.log(rows.message);
      }
    });
    console.log(this.listaPedidos);
  }

  getIpCurier(nombre: string){
    let ip: string;
    this.servico.getCourrierIP({courrier: nombre}).subscribe((rows) => {
      ip = rows.formularios.rows[0].c_ip;
    });
    return ip;
  }

}
