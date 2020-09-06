import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss']
})
export class MenuPrincipalComponent implements OnInit {
  email: string;
  password: string;
  formulario: FormGroup;
 

  constructor(private router: Router, public dialog: MatDialog, private fb:FormBuilder) { }


  ngOnInit(): void {
    this.formulario = this.fb.group({
      buscador: ['']
    })
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
