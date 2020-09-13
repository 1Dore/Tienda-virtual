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
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.required],
      contraseña: ['', Validators.required],
    })
  }

  irA(ruta: string) {
    this.router.navigateByUrl(ruta);
  }

  onSubmit(ruta:string){
    let formulario = this.register.value;

    //---------------------------------------encriptacion-------------------------------
    var passwordBytes = CryptoJS.enc.Utf16LE.parse(formulario.contraseña);
    var sha1Hash = CryptoJS.SHA1(passwordBytes);
    var sha1HashToBase64 = sha1Hash.toString(CryptoJS.enc.Base64);
    formulario.contraseña = CryptoJS.enc.Utf16.parse(sha1HashToBase64);
    formulario.contraseña = CryptoJS.SHA1(formulario.contraseña).toString();
    //---------------------------------------encriptacion---------------------------------


    this.auth.register(formulario).subscribe(data => {

      if( data.status == 1) this.router.navigateByUrl(ruta);
      else alert("Error al ejecutarse");

    });
    this.register.reset();
  }
}


