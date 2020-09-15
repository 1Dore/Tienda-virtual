import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth/auth.service';
import { AdminComponent } from '../admin/admin.component';

class emisor{
  ip:String
  nombre:String
}

@Component({
  selector: 'app-emisores',
  templateUrl: './emisores.component.html',
  styleUrls: ['./emisores.component.scss']
})
export class EmisoresComponent implements OnInit {

  newEmisor:FormGroup

  constructor(private auth:AuthService, private fb:FormBuilder, public dialogRef:MatDialogRef<AdminComponent>) { }

  ngOnInit(): void {
    this.newEmisor = this.fb.group({

      ip: ['', Validators.required],
      nombre: ['', Validators.required]

    })
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
