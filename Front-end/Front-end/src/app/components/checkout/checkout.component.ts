import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  user = 'PlaceHolder';
  cards = [
    {
      img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      title: 'Montañas',
      description: 'Paisaje de montañas',
      category: 'Categoría: Fotografía',
      author: 'Jhon Smith',
      available: 'Cantidad Disponible: 10',
      price: 'Precio: Q 100.00'
    }
  ];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  irA(ruta: string) {
    this.router.navigateByUrl(ruta);
  }
}
