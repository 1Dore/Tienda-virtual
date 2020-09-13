import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

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
    }
  ];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  irA(ruta: string) {
    this.router.navigateByUrl(ruta);
  }
  minus_one() {
    let price = (this.cards.map(i => i.price));
    this.quantity--;
    if (this.quantity < 0) {
      this.quantity = 1;
    }
    this.total = Number(price) * this.quantity;

  }
  plus_one() {
    let available = (this.cards.map(i => i.available));
    let price = (this.cards.map(i => i.price));

    this.quantity++;

    if (this.quantity > Number(available)) {
      this.quantity = Number(available);

    }
    this.total = Number(price) * Number(this.quantity);
    this.total = Number(this.total);
  }
}
