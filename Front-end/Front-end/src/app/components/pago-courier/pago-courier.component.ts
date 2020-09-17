import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { formulario } from '../pago-producto/formularioTarjeta';
class Courier {
  value: String;
}
@Component({
  selector: 'app-pago-courier',
  templateUrl: './pago-courier.component.html',
  styleUrls: ['./pago-courier.component.scss']
})
export class PagoCourierComponent implements OnInit {
  couriers: Courier[] = [];

  pago: FormGroup;
  courier: String;
  orden: String;
  direccion: String;
  codigo: String;
  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.pago = this.fb.group({

      courier: ['', Validators.required],
      direccion: ['', Validators.required],
      codigo_postal: ['', Validators.required],

    });

    let temp_couriers = new Array<Courier>();

    this.auth.getAllCourriers().subscribe((res) => {
      console.log(res);
      res.formularios.rows.forEach((element) => {
        console.log(element.c_nombre);
        this.couriers = [{ value: element.c_nombre }];
        temp_couriers.push(this.couriers[0]);

      });
      this.couriers = temp_couriers;

    });
  }


  irA(ruta: string) {

    this.router.navigateByUrl(ruta);
    this.dialog.closeAll();
    
  }

  onConsulta() {
    
  }


}
