import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

interface producto {
  categoria: String;
  nombre: String;
  descripcion: String;
  autor: String;
  precio: Number;
  foto: String;
}

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.scss']
})
export class ListadoProductosComponent implements OnInit {


  lista_de_productos: Array<producto>;


  categoria: String;
  user = 'PlaceHolder';

  constructor(private router: Router, private servicio: AuthService) { }

  ngOnInit(): void {
    this.categoria = this.servicio.getCategoria();

    this.servicio.categoriaService(this.categoria).subscribe((rows) => {

      //variables que inicializo para el foreach
      let temp: producto;    //uso la interfaz producto
      this.lista_de_productos = new Array<producto>();  //array de productoss

      console.log("entre");
      if (rows.formularios.length > 0) {
        console.log("entre al if");
        rows.formularios.forEach((element) => {
          //meto las cosas al temp
          temp.autor = element.autor;
          temp.categoria = element.categoria;
          temp.descripcion = element.descripcion;
          temp.foto = element.foto;
          temp.nombre = element.nombre;
          temp.precio = element.precio;
          //meto el temp a la lista
          this.lista_de_productos.push(temp);

        });

        console.log(this.lista_de_productos);
      }
      else {
        alert("Producto no encontrado");
        console.log(rows.message);
      }

    });
  }


  irA(ruta: string) {
    this.router.navigateByUrl(ruta);
  }

}




