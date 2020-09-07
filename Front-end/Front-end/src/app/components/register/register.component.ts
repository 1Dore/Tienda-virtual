import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import CryptoJS from 'crypto-js';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  
  register:FormGroup;

  constructor(private router: Router, private fb:FormBuilder, private auth:AuthService ) { }

  ngOnInit(): void {
    this.register = this.fb.group({
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      Correo: ['', Validators.required],
      Contraseña: ['', Validators.required],
    })
  }

  irA(ruta: string) {
    this.router.navigateByUrl(ruta);
  }

  onSubmit(ruta:string){
    let formulario = this.register.value;
    formulario.password = CryptoJS.SHA1(formulario.password);
    this.auth.login(formulario).subscribe(data => {

      if( data.status == 1) this.router.navigateByUrl(ruta);
      else alert("Error al ejecutarse");

    });
    this.register.reset();
  }
}


