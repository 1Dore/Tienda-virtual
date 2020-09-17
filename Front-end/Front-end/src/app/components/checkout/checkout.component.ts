import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { PagoCourierComponent } from '../pago-courier/pago-courier.component';

class ContenidoCarrito {
  pr_id: Number;
  pr_cantidad: Number;
}

class ID_producto {
  id: Number;
}

class Producto {
  id: Number;
  categoria: String;
  nombre: String;
  descripcion: String;
  autor: String;
  precio: Number;
  foto: String;
  cantidad: Number;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
  pago: FormGroup;
  courier: String;
  orden: String;
  direccion: String;
  codigo: String;
  carrito_IDs: Array<ContenidoCarrito> = new Array<ContenidoCarrito>();

  carrito: Array<Producto> = new Array<Producto>();

  total: Number = 0;

  constructor(private router: Router, private servicio: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {


    this.carrito_IDs = this.servicio.getCarrito();
    this.carrito_IDs.forEach(element => {
      let temp: ID_producto = new ID_producto();
      temp.id = element.pr_id;
      this.getProductos(temp);
    });
    this.total = Number(this.total.toFixed(2));
  }

  getProductos(id) {
    this.servicio.getProductosById(id).subscribe((rows) => {

      //variables que inicializo para el foreach
      if (rows.formularios.rows.length > 0) {
        rows.formularios.rows.forEach((element) => {
          //meto las cosas al temp
          let temp: Producto = new Producto();    //uso la interfaz producto
          temp.id = element.pr_id;
          temp.autor = element.pr_autor;
          temp.categoria = element.pr_categoria;
          temp.descripcion = element.pr_descripcion;
          temp.foto = element.pr_foto;
          temp.nombre = element.pr_nombre;
          temp.precio = element.pr_precio;
          temp.cantidad = this.carrito_IDs.find((producto) => producto.pr_id == id.id).pr_cantidad;
          //meto el temp a la lista
          this.carrito.push(temp);

          this.total = Number(temp.cantidad) * Number(temp.precio) + Number(this.total);
        });
      }
      else {
        alert("Producto no encontrado");
        console.log(rows.message);
      }

    });
  }

  //codgigo de modificacion del cada producto en el carrito
  irA(ruta: string) {
    this.router.navigateByUrl(ruta);
    this.getCarritoIDs();
  }

  plus_one(id: Number) {
    this.servicio.modificarCantidadCarrito(id, true);
    let x = Number(this.carrito.find((producto) => producto.id == id).cantidad);
    this.carrito.find((producto) => producto.id == id).cantidad = Number(x) + 1;
    this.total = Number(this.total) + Number(this.carrito.find((producto) => producto.id == id).precio);
    this.total = Number(this.total.toFixed(2));
    this.getCarritoIDs();
  }

  minus_one(id: Number) {
    this.servicio.modificarCantidadCarrito(id, false);
    let x = Number(this.carrito.find((producto) => producto.id == id).cantidad);
    this.carrito.find((producto) => producto.id == id).cantidad = Number(x) - 1;
    this.total = Number(this.total) - Number(this.carrito.find((producto) => producto.id == id).precio);
    this.total = Number(this.total.toFixed(2));
    if (x == 1) {
      this.delete_card(id);
    }
    this.getCarritoIDs();
  }

  delete_card(id: Number) {
    this.servicio.eliminardeCarrito(id);
    let index = this.carrito.indexOf(this.carrito.find((producto) => producto.id == id));
    this.carrito.splice(index, 1);
    this.getCarritoIDs();
  }

  getCarritoIDs() {
    this.carrito_IDs = this.servicio.getCarrito();
  }

  guardarMontoTotal(ruta: string) {
    localStorage.setItem('total', this.total + '');
    this.irA(ruta);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(PagoCourierComponent, {
      width: '500px',
      data: { courier: this.courier, direccion: this.direccion, codigo: this.codigo }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.courier = result;
    });
  }
}
