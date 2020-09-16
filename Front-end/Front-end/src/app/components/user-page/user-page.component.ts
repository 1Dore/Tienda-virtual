import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth/auth.service';
import { DireccionUsuarioComponent } from '../direccion-usuario/direccion-usuario.component';
import { TarjetaUsuarioComponent } from '../tarjeta-usuario/tarjeta-usuario.component';

class Tarjeta{
  u_id: Number;
  t_id: Number;
  num_tar: Number;
}

class Direccion{
  u_id: Number;
  dir_id: Number;
  direccion: string;
  codigo_postal: string;
}

class User{
  u_id:Number;
}

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  
  direcciones: Array<Direccion> = new Array<Direccion>();
  tarjetas: Array<Tarjeta> = new Array<Tarjeta>();

  u_id: Number;

  numero_tarjeta: Number;
  mes_vencimiento: Number;
  anio_vencimiento: Number;
  codigo: Number;
  nombre: String;

  zona: string;
  direccion: string;

  constructor(public dialog: MatDialog, private servicio: AuthService) { }

  ngOnInit(): void {
    this.u_id = Number(localStorage.getItem('UserID'));
    this.getDirecciones();
  }

   


  openTarjeta(): void {
    const dialogRef = this.dialog.open(TarjetaUsuarioComponent, {
      width: '500px',
      data: { numero_tarjeta: this.numero_tarjeta, nombre: this.nombre }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.nombre = result;
    });

  }

  openDireccion(): void {
    const dialogRef = this.dialog.open(DireccionUsuarioComponent, {
      width: '500px',
      data: { zona: this.zona, direccion: this.direccion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed'); 
      let y;
      this.servicio.getDireccionId( {u_id: this.u_id, direccion: result.direccion}).subscribe((result) => {
        y = result.formulario.rows[0];
      });
      let x = {u_id: this.u_id, dir_id: y, direccion: result.direccion, codigo_postal: result.zona};
      this.agregarDireccion(x);
    });
  }


  //modificar
  modificarDireccion(direccion:string, codigo_postal:string, dir_id:Number){
    const dialogRef = this.dialog.open(DireccionUsuarioComponent, {
      width: '500px',
      data: { zona: codigo_postal, direccion: direccion, dir_id: dir_id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.direccion = result;
    });
  }


  agregarDireccion(direccion){
    this.direcciones.push(direccion);
    this.servicio.agregarDireccion(direccion);
  }







  //Traer las Tarjetas
  getTarjetas(){
    let user: User = new User();
    user.u_id = this.u_id;
    this.servicio.getTarjetaByUser(user).subscribe((rows) => {

      //variables que inicializo para el foreach
      if (rows.formularios.rows.length > 0) {
        rows.formularios.rows.forEach((element) => {
          //meto las cosas al temp
          let temp:Tarjeta = new Tarjeta();    //uso la interfaz Tarjeta
          temp.u_id = this.u_id;
          temp.num_tar = element.num_tar;
          temp.t_id = element.t_id;
          //meto el temp a la lista
          this.tarjetas.push(temp);
        });
      }
      else {
        alert("Tarjeta no encontrada");
        console.log(rows.message);
      }

    });
  }  

  //Traer las Direcciones
  getDirecciones(){
    let user: User = new User();
    user.u_id = this.u_id;
    console.log(user);
    this.servicio.getDireccionesByUser(user).subscribe((rows) => {
      //variables que inicializo para el foreach
      if (rows.formularios.rows.length > 0) {
        rows.formularios.rows.forEach((element) => {
          //meto las cosas al temp
          
          let temp:Direccion = new Direccion();    //uso la interfaz Direccion
          temp.u_id = this.u_id;
          temp.direccion = element.direccion;
          temp.codigo_postal = element.codigo_postal;
          temp.dir_id = element.dir_id;
          //meto el temp a la lista
          this.direcciones.push(temp);
        });
      }
      else {
        alert("Sin direcciones guardadas");
        console.log(rows.message);
      }

    });
  }
}
