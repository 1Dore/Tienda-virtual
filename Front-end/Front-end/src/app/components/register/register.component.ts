import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import CryptoJS from 'crypto-js';
import { AuthService } from 'src/app/service/auth/auth.service';
//import { group } from 'console';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  register: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this.register = this.fb.group({
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      Correo: ['', Validators.required],
      Contrasenia: ['', Validators.required],
      RContrasenia: ['', Validators.required],
    })
  }

  irA(ruta: string) {
    this.router.navigateByUrl(ruta);
  }

  onSubmit(ruta: string) {
    let formulario = this.register.value;
    let contrasenia = this.register.get('Contrasenia').value;
    let rcontrasenia = this.register.get('RContrasenia').value;

    if (contrasenia != rcontrasenia) {
      alert("Porfavor valide correctamente la contraseña");
    }
    formulario.password = CryptoJS.SHA1(formulario.password);
    this.auth.login(formulario).subscribe(data => {


      if (data.status == 1) this.router.navigateByUrl(ruta);
      else alert("Error al ejecutarse");

    });
    this.register.reset();
  }
}


