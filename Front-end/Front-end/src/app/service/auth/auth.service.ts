import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { formulario } from '../../components/pago-producto/formularioTarjeta';
//import { runInThisContext } from 'vm';

class ContenidoCarrito {
  pr_id: Number;
  pr_cantidad: Number;
}
const httpHeader = {
  headers: new HttpHeaders({ 'Content-type': 'application/json' })
  
}

const dominio = environment.dominio;

@Injectable({
  providedIn: 'root'

})
export class AuthService {


  categoria: String;
  private items: Array<ContenidoCarrito> = new Array<ContenidoCarrito>();
  private categoriaDeLaLsita_productos = new Subject<String>();
  enviarcategoria = this.categoriaDeLaLsita_productos.asObservable();


  constructor(private http: HttpClient, private router: Router) { }

  login(loginData): Observable<any> {

    let url = dominio + "LoginUsuarios";
    return this.http.post(url, loginData, httpHeader);
  }
  //ADMIN LOGIN
  loginAdmin(loginAdminData): Observable<any> {
    let url = dominio + "LoginAdmin";
    return this.http.post(url, loginAdminData, httpHeader);
  }

  register(regData): Observable<any> {

    let url = dominio + "newUsuario";
    return this.http.post(url, regData, httpHeader);

  }

  addCourrier(data): Observable<any> {
    let url = dominio + "newCourrier";
    return this.http.post(url, data, httpHeader);
  }

  editCourier(data): Observable<any> {
    let url = dominio + "editCourrier";
    return this.http.post(url, data, httpHeader);
  }

  eliminarCourier(data): Observable<any> {
    let url = dominio + "deleteCourier";
    return this.http.post(url, data, httpHeader);
  }

  addEmisor(data): Observable<any> {
    let url = dominio + "newEmisor";
    return this.http.post(url, data, httpHeader);
  }

  getEmisor(data): Observable<any> {
    let url = dominio + "gerEmisor";
    return this.http.post(url, data, httpHeader);
  }

  editEmisor(data): Observable<any> {
    console.log(data);
    let url = dominio + "editEmisor";
    return this.http.post(url, data, httpHeader);
  }

  eliminaEmisor(data): Observable<any> {
    let url = dominio + "deleteEmisor";
    return this.http.post(url, data, httpHeader);
  }

  getAllEmisores(): Observable<any> {

    let url = dominio + "getAllEmisores";
    return this.http.get(url, httpHeader);
  }


  //CODIGO PARA TOMAR LOS COURIER DE LA BASE DE DATOS

  getAllCourriers(): Observable<any> {

    let url = dominio + "getAllCourriers";
    return this.http.get(url, httpHeader);
  }




  // Codigo para enviar el categoria de producto de Menu Principal a Lista de Producto
  enviarCategoria(categoria: String) {

    this.categoria = categoria;
    localStorage.setItem('Categoria', "" + categoria);
    this.categoriaDeLaLsita_productos.next(categoria);

  }

  getCategoria() {
    this.categoria = localStorage.getItem('Categoria');
    return this.categoria;
  }

  categoriaService(dato): Observable<any> {
    let url = dominio + "getProductsBy";
    return this.http.post(url, dato, httpHeader);
  }

  getProductosById(dato): Observable<any> {
    let url = dominio + "getProductoById";
    return this.http.post(url, dato, httpHeader);
  }

  //CODIGO PARA INSERTAR PRODUCTOS

  insertProduct(data): Observable<any> {

    let url = dominio + "newProduct";
    return this.http.post(url, data, httpHeader);

  }

  isLogin() {
    let islog = localStorage.getItem("isLogin") === "valido";
    return islog;
  }
  isAdminLogin() {
    let adminislog = localStorage.getItem("isAdminLogin") === "valido";
    return adminislog;
  }
  guardarSenal() {
    localStorage.setItem("isLogin", "valido");
  }
  guardarSenalAdmin() {
    localStorage.setItem("isAdminLogin", "valido");
  }
  logout() {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("isAdminLogin");
    this.eliminarListaCarrito();
    localStorage.removeItem('UserID');
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('total');
    this.router.navigateByUrl("/menu-principal");
  }

  //Funciones pertinentes al Carrito

  modificarCantidadCarrito(item: Number, tipo: boolean) {
    let temp: ContenidoCarrito = new ContenidoCarrito();
    this.traerListaCarrito();
    let existente = undefined != this.items.find((producto) => item == producto.pr_id);

    if (tipo) {
      if (!existente) {
        temp.pr_id = item;
        temp.pr_cantidad = 1;
        this.items.push(temp);

      }
      else {
        this.items.forEach(element => {
          if (element.pr_id == item) {
            let index = this.items.indexOf(element);
            this.items[index].pr_cantidad = Number(this.items[index].pr_cantidad) + 1;
          }
        });
      }
    } else {
      if (existente) {
        this.items.forEach(element => {
          if (element.pr_id == item) {
            let index = this.items.indexOf(element);
            temp.pr_id = item;
            temp.pr_cantidad = Number(this.items[index].pr_cantidad) - 1;
            this.items[index] = temp;
            if (Number(this.items[index].pr_cantidad) < 1) {
              this.eliminardeCarrito(item);
            }
          }
        });
      }
    }
    this.guardarListaCarrito();
  }


  eliminardeCarrito(item: Number) {
    let x: number;
    let index;
    this.traerListaCarrito();
    let producto: ContenidoCarrito = this.items.find((producto) => producto.pr_id === item);

    if (producto != undefined) {
      index = this.items.indexOf(producto);
      for (let i = 0; i < this.items.length; i++) {
        let temp = JSON.parse(localStorage.getItem('item' + i));
        if (Number(temp.pr_id) === item) {
          localStorage.removeItem('item' + i);
        }
      }

    }
    this.items.splice(index, 1);
    x = Number(localStorage.getItem('carritoLength'));
    localStorage.setItem('carritoLength', (x - 1) + "");
    this.guardarListaCarrito();

  }


  getCarrito() {
    this.traerListaCarrito();
    return this.items;
  }


  eliminarListaCarrito() {
    for (let i = 0; i < Number(localStorage.getItem('carritoLength')); i++) {
      localStorage.removeItem('item' + i);
    }
    localStorage.removeItem('carritoLength');
  }

  guardarListaCarrito() {
    let i = 0;
    this.items.forEach(element => {

      localStorage.setItem('item' + i, JSON.stringify(element));
      i++;
    });


    localStorage.setItem('carritoLength', this.items.length + "");

  }

  traerListaCarrito() {
    let listaTemp = new Array<ContenidoCarrito>();
    for (let i = 0; i < Number(localStorage.getItem('carritoLength')); i++) {
      let temp: ContenidoCarrito = new ContenidoCarrito();
      let temp2;
      temp2 = JSON.parse(localStorage.getItem('item' + i));
      temp.pr_cantidad = Number(temp2.pr_cantidad);
      temp.pr_id = Number(temp2.pr_id);
      listaTemp.push(temp);
    }
    this.items = listaTemp;
  }


  // Codigo para las direcciones segun usuario
  getDireccionesByUser(dato): Observable<any> {
    let url = dominio + "getDireccionesByUser";
    return this.http.post(url, dato, httpHeader);
  }

  agregarDireccion(dato): Observable<any> {
    let url = dominio + "newDireccionForUser";
    console.log(dato);
    console.log(url);
    return this.http.post(url, dato, httpHeader);
  }

  editarDireccion(dato): Observable<any> {
    let url = dominio + "editDireccion";
    return this.http.post(url, dato, httpHeader);
  }

  editarCodigoPostal(dato): Observable<any> {
    let url = dominio + "editCodigoPostal";
    return this.http.post(url, dato, httpHeader);
  }

  eliminarDireccion(dato): Observable<any> {
    let url = dominio + "eliminarDireccionByUser";
    return this.http.post(url, dato, httpHeader);
  }

  getDireccionId(dato): Observable<any> {
    let url = dominio + 'getDireccionID';
    return this.http.post(url, dato, httpHeader);
  }

  // Codigo para las Tarjetas segun usuario
  getTarjetaByUser(dato): Observable<any> {
    let url = dominio + "getTarjetasByUser";
    return this.http.post(url, dato, httpHeader);
  }

  agregarTarjeta(dato): Observable<any> {
    let url = dominio + "newTarjetaForUser";
    return this.http.post(url, dato, httpHeader);
  }

  eliminarTarjeta(dato): Observable<any> {
    let url = dominio + "eliminarTarjetaByUser";
    return this.http.post(url, dato, httpHeader);
  }


  // Codigo pertinente a ver los pedidos
  getPedidos(dato): Observable<any> {
    let url = dominio + "getPedidos";
    return this.http.post(url, dato, httpHeader);
  }

  getC_name(dato): Observable<any> {
    let url = dominio + "getC_name";
    return this.http.post(url, dato, httpHeader);
  }

  getU_name(dato): Observable<any> {
    let url = dominio + "getU_name";
    return this.http.post(url, dato, httpHeader);
  }

  getE_name(dato): Observable<any> {
    let url = dominio + "getE_name";
    return this.http.post(url, dato, httpHeader);
  }

  //Codigo pertinente a crear y obtener informacion de un Pedido

  newPedido(data): Observable<any> {
    let url = dominio + "newPedido";

    return this.http.post(url, data, httpHeader);
  }

  getPedidoIDNulls(data): Observable<any> {
    let url = dominio + "getPedidoNulls";
    return this.http.post(url, data, httpHeader);
  }






  //Codigo para pedir tarjetas o Courrier estan en orden de uso
  //el inicio de pago de un carrito



  getCourrierIP(data): Observable<any> {
    let url = dominio + "getCourrierIP";
    return this.http.post(url, data, httpHeader);
  }

  askCourrierCosto(data): Observable<any> {
    let ip = data.ip;
    console.log(data);
    let url = ip + `consulta.php?destino=${data.postal}&formato=JSON`;
    console.log(url);
    return this.http.get(url, httpHeader);
  }

  //Empiezo a pedir tarjetas
  getEmisorIP(data): Observable<any> {  //ip de tarjetas
    let url = dominio + "getEmisorIP";
    return this.http.post(url, data, httpHeader);
  }

  solicitarAutorizacion(data: formulario): Observable<any> {  //pagar con tarjeta
    console.log(data.nombre);
    let url = data.ip + `autorizacion${data.extension}?tarjeta=${data.tarjeta}&nombre=${data.nombre}&fecha_venc=${data.fecha_venc}&num_seguridad=${data.num_seguridad}&monto=${data.monto}&tienda=DIA&formato=JSON`;
    console.log(url);
    //url = encodeURI(url)
    return this.http.get(url);
  }

  terminarPedido(data): Observable<any> {
    let url = dominio + `completarPedido`;
    return this.http.post(url, data, httpHeader);
  }

  askCourrierEnvio(data): Observable<any> {
    let url = data.ip + `envio.php?orden=${data.p_id}&destinatario=${data.nombre}&destino=${data.codigo_postal}&direccion=${data.direccion}&tienda=DIA`;
    console.log(url);
    return this.http.get(url, httpHeader);
  }

  askCourrierStatus(ip, data): Observable<any> {
    let url = ip + `status.php?orden=${data.pedido_id}&tienda=DIA&formato=JSON`;
    console.log(url);
    return this.http.get(url, httpHeader);
  }




}
