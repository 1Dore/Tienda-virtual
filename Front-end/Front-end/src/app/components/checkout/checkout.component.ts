import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

class ContenidoCarrito {
  pr_id: Number;
  pr_cantidad: Number;
}

class Producto {
  id: Number;
  categoria: String;
  nombre: String;
  descripcion: String;
  autor: String;
  precio: Number;
  foto: String;
  cantidad: Number;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {

  carrito_IDs:Array<ContenidoCarrito> = new Array<ContenidoCarrito>();

  carrito:Array<Producto> = new Array<Producto>();

  user = 'PlaceHolder';
  quantity = 1;
  total = 0;
  pr_id = 0;
  pr_nombre = "";
  pr_existencia = 0;
  pr_categoria = "";
  pr_autor = "";
  pr_descipcion = "";
  pr_fot = "";

  cards = [
    {
      img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      title: 'Montañas',
      numero: this.pr_id,
      description: 'Paisaje de montañas',
      category: 'Fotografía',
      author: 'Jhon Smith',
      available: 10,
      price: 5
    },
    {
      img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      title: 'Montañas',
      numero: this.pr_id,
      description: 'Paisaje de montañas',
      category: 'Fotografía',
      author: 'Jhon Smith',
      available: 12,
      price: 6
    }
  ];

  constructor(private router: Router, private servico:AuthService) { }

  ngOnInit(): void {
    this.getCarritoIDs();
  }


  irA(ruta: string) {
    this.router.navigateByUrl(ruta);
    this.getCarritoIDs();
  }
  
  plus_one(id:Number) {
    this.servico.modificarCantidadCarrito(id, true);
    this.getCarritoIDs();
  }

  minus_one(id:Number) {
    this.servico.modificarCantidadCarrito(id, false);
    this.getCarritoIDs();
  }

  delete_card(id:Number) {
    this.servico.eliminardeCarrito(id);
    this.getCarritoIDs();
  }

  getCarritoIDs(){
    this.carrito_IDs = this.servico.getCarrito();
  }

}
