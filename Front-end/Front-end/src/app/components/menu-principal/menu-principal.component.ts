import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss']
})
export class MenuPrincipalComponent implements OnInit {
  email: string;
  password: string;
  formulario: FormGroup;

  constructor(private router: Router, public dialog: MatDialog, private fb:FormBuilder, private servicio: AuthService) { }


  ngOnInit(): void {
    
    this.formulario = this.fb.group({
      buscador: ['']
    })
  }
      

  enviarTipoF(){
    this.servicio.enviarCategoria("F");
    this.irA('/lista_de_productos');
  }
  enviarTipoP(){
    this.servicio.enviarCategoria("P");
    this.irA('/lista_de_productos');
  }
  enviarTipoE(){
    this.servicio.enviarCategoria("E");
    this.irA('/lista_de_productos');
  }
  

  irA(ruta: string) {
    this.router.navigateByUrl(ruta);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
      data: { name: this.email, animal: this.password }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.email = result;
    });
  }

  onSubmit(){
    
  }
  
}
