import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DireccionUsuarioComponent } from '../direccion-usuario/direccion-usuario.component';
import { TarjetaUsuarioComponent } from '../tarjeta-usuario/tarjeta-usuario.component';

class tarjeta{
  numeroTarjeta: Number;
}

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  numero_tarjeta: Number;
  mes_vencimiento: Number;
  anio_vencimiento: Number;
  codigo: Number;
  nombre: String;

  zona: String;
  direccion: String;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  


  openTarjeta(): void {
    const dialogRef = this.dialog.open(TarjetaUsuarioComponent, {
      width: '500px',
      data: { numero_tarjeta: this.numero_tarjeta, mes_vencimiento: this.mes_vencimiento, anio_vencimiento: this.anio_vencimiento, codigo: this.codigo }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.nombre = result;
    });
  }
  openDireccion(): void {
    const dialogRef = this.dialog.open(DireccionUsuarioComponent, {
      width: '500px',
      data: { zona: this.zona, direccion: this.direccion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.direccion = result;
    });
  }
}
