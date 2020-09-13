import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

interface producto {
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
  //INPUT OUTPUT PRODUCTO
  @Input() product: any;
  @Output() productAdded = new EventEmitter();

  lista_de_productos: Array<producto>;
  tipo: String;
  user = 'PlaceHolder';
  cartProductList = [];

  constructor(private router: Router, private servicio: AuthService) { }

  ngOnInit(): void {
    this.servicio.enviarTipo.subscribe(tipo => {
      this.tipo = tipo + "";
      this.tipo = this.servicio.getCategoria() + "";
    })
  }


  irA(ruta: string) {
    this.router.navigateByUrl(ruta);
  }
  //METODO QUE AÑADE PRODUCTOS DE LA LISTA DE PRODUCTOS AL CARRITO
  addProductToCart(product) {
    const productExistInCart = this.cartProductList.find(({ name }) => name === product.name); // find product by name
    if (!productExistInCart) {
      this.cartProductList.push({ ...product, num: 1 }); // enhance "porduct" opject with "num" property
      this.productAdded.emit(product);
      return;
    }
    productExistInCart.num += 1;
  }
  //METODO QUE REMUEVE LOS PRODUCTOS DEL CARRITO
  removeProduct(product) {
    this.cartProductList = this.cartProductList.filter(({ name }) => name !== product.name)
  }

}
