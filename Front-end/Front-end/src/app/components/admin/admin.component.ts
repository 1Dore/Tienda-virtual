import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarProductosComponent } from '../agregar-productos/agregar-productos.component';
import { CourierComponent } from '../courier/courier.component';
import { EmisoresComponent } from '../emisores/emisores.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  ip_emisor: String;
  name_emisor: String;

  ip_courier: String;
  name_courier: String;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {


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
