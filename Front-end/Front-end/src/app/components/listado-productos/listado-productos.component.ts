import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

interface producto{
  tipo: String;
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

  user = 'PlaceHolder';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  irA(ruta: string) {
    this.router.navigateByUrl(ruta);
  }
}
