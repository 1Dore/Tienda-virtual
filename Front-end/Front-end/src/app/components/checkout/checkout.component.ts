import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  user = 'PlaceHolder';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  irA(ruta: string) {
    this.router.navigateByUrl(ruta);
  }
}
