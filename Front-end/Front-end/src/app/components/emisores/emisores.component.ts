import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth/auth.service';
import { AdminComponent } from '../admin/admin.component';

class emisor{
  ip:String;
  nombre:String;
  id: number;
  extencion: string;
}

@Component({
  selector: 'app-emisores',
  templateUrl: './emisores.component.html',
  styleUrls: ['./emisores.component.scss']
})
export class EmisoresComponent implements OnInit {

  newEmisor:FormGroup;
  edit:FormGroup;
  mod: boolean;
  url: string;

  constructor(private auth:AuthService, private fb:FormBuilder, public dialogRef:MatDialogRef<AdminComponent>,
              @Inject(MAT_DIALOG_DATA) public datos:emisor) { }

  ngOnInit(): void {
    this.newEmisor = this.fb.group({

      ip: ['', Validators.required],
      nombre: ['', Validators.required],

    });

    this.edit = this.fb.group({

      ip: ['', Validators.required],
      extencion: ['', Validators.required]

    });
    this.url = this.datos.ip + "";
    this.mod = this.datos.id == undefined;
  }

  editarEmisor(){
    let data:emisor = new emisor();
    data.ip = this.edit.value.ip;
    data.extencion = this.edit.value.extencion;
    if(data.extencion === " "){
      data.extencion = "";
    }
    data.nombre = this.datos.nombre;
    data.id = this.datos.id
    this.auth.editEmisor(data).subscribe((x) => {
      if(x.status == 1) alert("Emisor editado existosamente");
      else alert("Ha ocurriodo un error");
    });
    this.edit.reset();
    this.dialogRef.close();
  }
  
  agregarEmisor(){
    let data:emisor;
    data = new emisor();
    data.nombre = this.newEmisor.value.nombre;
    data.ip = this.newEmisor.value.ip;
    this.auth.addEmisor(data).subscribe(x => {
      if(x.status == 1) alert("Emisor insertado correctamente");
      else alert("Ha ocurrido un error");
    });

    this.newEmisor.reset();
    this.dialogRef.close();
  }


}
