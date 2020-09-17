import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth/auth.service';
import { AgregarProductosComponent } from '../agregar-productos/agregar-productos.component';
import { CourierComponent } from '../courier/courier.component';
import { EmisoresComponent } from '../emisores/emisores.component';


class Courier{
  c_id: number;
  c_ip: string;
  c_nombre: string;
}

class Emisor{
  e_id: number;
  e_ip: string;
  compania: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  couriers: Array<Courier> = new Array<Courier>();
  emisores: Array<Emisor> = new Array<Emisor>();

  ip_emisor: String;
  name_emisor: String;
  id_emisor:number;

  ip_courier: String;
  name_courier: String;
  id_courier: number;

  constructor(public dialog: MatDialog, private servicio: AuthService) { }

  ngOnInit(): void {
    this.servicio.getAllCourriers().subscribe((rows) => {
      if (rows.formularios.rows.length > 0) {
        rows.formularios.rows.forEach(courier => {
          let temp: Courier = new Courier();
          temp.c_id = courier.c_id;
          temp.c_ip = courier.c_ip;
          temp.c_nombre = courier.c_nombre;
          this.couriers.push(temp);
        });
      }else {
        alert("Courier no encontrado");
        console.log(rows.message);
      }
    });

    this.servicio.getAllEmisores().subscribe((rows) => {
      if (rows.formularios.rows.length > 0) {
        rows.formularios.rows.forEach(emisor => {
          let temp: Emisor = new Emisor();
          temp.e_id = emisor.e_id;
          temp.e_ip = emisor.e_ip;
          temp.compania = emisor.compañia;
          this.emisores.push(temp);
        });
      }else {
        alert("Courier no encontrado");
        console.log(rows.message);
      }
    });
  }


  changeEmisor(id:number, url:string, nombre:string): void{
    const dialogRef = this.dialog.open(EmisoresComponent, {
      width: '500px',
      data: { ip: url, nombre: nombre, id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ip_emisor = result;
    });
  }

  eliminarEmisor(id:number){
    this.servicio.eliminaEmisor({id: id});
  }


  openEmisor(): void {
    const dialogRef = this.dialog.open(EmisoresComponent, {
      width: '500px',
      data: { ip_emisor: this.ip_emisor, name_emisor: this.name_emisor }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ip_emisor = result;
    });
  }
  openCourier(): void {
    const dialogRef = this.dialog.open(CourierComponent, {
      width: '500px',
      data: { ip_courier: this.ip_courier, name_courier: this.name_courier }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ip_courier = result;
    });
  }

  changeCourier(id:number, url:string, nombre:string): void{
    const dialogRef = this.dialog.open(CourierComponent, {
      width: '500px',
      data: { ip: url, nombre: nombre, id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ip_emisor = result;
    });
  }

  eliminarCourier(id:number){
    this.servicio.eliminarCourier({id: id});
  }



  openProducto(): void {
    const dialogRef = this.dialog.open(AgregarProductosComponent, {
      width: '500px',
      data: { name: this.ip_courier, animal: this.name_courier }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ip_courier = result;
    });
  }
}
