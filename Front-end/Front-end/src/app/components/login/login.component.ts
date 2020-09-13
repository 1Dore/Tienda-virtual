import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuPrincipalComponent } from '../menu-principal/menu-principal.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: FormGroup

  constructor(public dialogRef: MatDialogRef<MenuPrincipalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private fb: FormBuilder,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.login = this.fb.group({
      correo: ['', Validators.required],
      contraseña: ['', Validators.required]
    })
  }


  irA(ruta: string) {
    this.router.navigateByUrl(ruta);
    this.dialogRef.close();
  }

  onSubmit() {
    let params = this.login.value;
    console.log("Hola :v");
  }

}

