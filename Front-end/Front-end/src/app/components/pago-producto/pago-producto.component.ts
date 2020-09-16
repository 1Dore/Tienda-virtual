import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

interface Emisor {
  value: String;
  viewValue: String;
}
@Component({
  selector: 'app-pago-producto',
  templateUrl: './pago-producto.component.html',
  styleUrls: ['./pago-producto.component.scss']
})
export class PagoProductoComponent implements OnInit {

  emisores: Emisor[] = [
    { value: 'banrural', viewValue: 'Banrural' },
    { value: 'gyt', viewValue: 'G&T' },
    { value: 'bac', viewValue: 'BAC' }
  ];

  pago: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this.pago = this.fb.group({
      emisor: ['', Validators.required],
      numero: ['', Validators.required],
      mes: ['', Validators.required],
      anio: ['', Validators.required],
      codigo: ['', Validators.required]
    })
  }

  irA(ruta: string) {
    this.router.navigateByUrl(ruta);
  }

  onSubmit(ruta: string) {
    let formulario = this.pago.value;

    //---------------------------------------encriptacion-------------------------------
    /*var passwordBytes = CryptoJS.enc.Utf16LE.parse(formulario.contraseña);
    var sha1Hash = CryptoJS.SHA1(passwordBytes);
    var sha1HashToBase64 = sha1Hash.toString(CryptoJS.enc.Base64);
    formulario.contraseña = CryptoJS.enc.Utf16.parse(sha1HashToBase64);
    formulario.contraseña = CryptoJS.SHA1(formulario.contraseña).toString();*/
    //---------------------------------------encriptacion---------------------------------


    /*this.auth.register(formulario).subscribe(data => {

      if (data.status == 1) this.router.navigateByUrl(ruta);
      else alert("Error al ejecutarse");

    });

    this.pago.reset();*/

  }

}
