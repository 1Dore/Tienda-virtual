import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserPageComponent } from '../user-page/user-page.component';

interface Direccion{
  direccion:string;
  zona:string;
}

@Component({
  selector: 'app-direccion-usuario',
  templateUrl: './direccion-usuario.component.html',
  styleUrls: ['./direccion-usuario.component.scss']
})
export class DireccionUsuarioComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UserPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Direccion) { }

  ngOnInit(): void {
  }

}
