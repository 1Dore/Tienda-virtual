import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { AdminComponent } from '../admin/admin.component';

class courrier{
  ip:String
  nombre:String
}

@Component({
  selector: 'app-courier',
  templateUrl: './courier.component.html',
  styleUrls: ['./courier.component.scss']
})
export class CourierComponent implements OnInit {

  newCourrier:FormGroup

  constructor(private auth:AuthService, private fb:FormBuilder, public dialogRef:MatDialogRef<AdminComponent>) { }
  ngOnInit(): void {
    this.newCourrier = this.fb.group({
      ip: ['', Validators.required],
      nombre: ['', Validators.required]
    })
  }

  agregarCourrier(){
    let formulario:courrier;
    formulario = new courrier();
    formulario.ip = this.newCourrier.value.ip;
    formulario.nombre = this.newCourrier.value.nombre;
    this.auth.addCourrier(formulario).subscribe(x => {

      if (x.status == 1){
        alert("Se incerto el Courrier exitosamente");
      }

      else{
        alert("Ocurrio un error");
      }

    })
    this.newCourrier.reset();
    this.dialogRef.close();
  }

}
