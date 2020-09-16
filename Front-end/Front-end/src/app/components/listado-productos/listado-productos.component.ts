import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Categoria } from './categoria';

class Producto {
  id: Number;
  categoria: String;
  nombre: String;
  descripcion: String;
  autor: String;
  precio: Number;
  foto: String;
}

interface categoria{
  categoria:String;
}

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.scss']
})
export class ListadoProductosComponent implements OnInit {


  lista_de_productos: Array<Producto>;


  categoria:String;
  user = 'PlaceHolder';

  constructor(private router: Router, private servicio: AuthService) { }

  ngOnInit(): void {

    //igualo a la interfaz y mando json {"categoria": "cosa"}
    this.categoria = this.servicio.getCategoria();
    let data:Categoria = new Categoria();
    data.categoria = this.categoria;

    this.servicio.categoriaService(data).subscribe((rows) => {

      //variables que inicializo para el foreach

      this.lista_de_productos = new Array<Producto>();  //array de productoss


      if (rows.formularios.rows.length > 0) {
        rows.formularios.rows.forEach((element) => {
          //meto las cosas al temp
          let temp:Producto = new Producto();    //uso la interfaz producto
          temp.id = element.pr_id;
          temp.autor = element.pr_autor;
          temp.categoria = element.pr_categoria;
          temp.descripcion = element.pr_descripcion;
          temp.foto = element.pr_foto;
          temp.nombre = element.pr_nombre;
          temp.precio = element.pr_precio;
          //meto el temp a la lista
          this.lista_de_productos.push(temp);

        });
      }
      else {
        alert("Producto no encontrado");
        console.log(rows.message);
      }

    });
  }

  agregarCarrito(id: Number){
    this.servicio.modificarCantidadCarrito(id, true);
  }

  irA(ruta: string) {
    this.router.navigateByUrl(ruta);
  }

}




