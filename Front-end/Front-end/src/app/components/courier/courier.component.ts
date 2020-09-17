import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { AdminComponent } from '../admin/admin.component';

class courrier{
  ip:String;
  nombre:String;
  id:number;
}

@Component({
  selector: 'app-courier',
  templateUrl: './courier.component.html',
  styleUrls: ['./courier.component.scss']
})
export class CourierComponent implements OnInit {

  newCourrier:FormGroup
  edit: FormGroup;
  mod: boolean;
  url: string;

  constructor(private auth:AuthService, private fb:FormBuilder, public dialogRef:MatDialogRef<AdminComponent>,
              @Inject(MAT_DIALOG_DATA) public datos:courrier) { }
  ngOnInit(): void {
    this.newCourrier = this.fb.group({
      ip: ['', Validators.required],
      nombre: ['', Validators.required]
    })

    this.edit = this.fb.group({
      ip: ['', Validators.required],
    })

    this.url = this.datos.ip + "";
    this.mod = this.datos.id == undefined;
  }

  editarCourier(){
    let data:courrier = new courrier();
    data.ip = this.newCourrier.value.ip;
    data.nombre = this.datos.nombre;
    data.id = this.datos.id;
    this.auth.editCourier(data).subscribe((x) => {
      if(x.status == 1) alert("Courier editado existosamente");
      else alert("Ha ocurriodo un error");
    })
  }

  agregarCourrier(){
    let formulario:courrier;
    formulario = new courrier();
    formulario.ip = this.edit.value.ip;
    formulario.nombre = this.newCourrier.value.nombre;
    this.auth.addCourrier(formulario).subscribe(x => {

      if (x.status == 1){
        alert("Se incerto el Courrier exitosamente");
      }

      else{
        alert("Ocurrio un error" +formulario.ip);
      }

    })
    this.newCourrier.reset();
    this.dialogRef.close();
  }

}
