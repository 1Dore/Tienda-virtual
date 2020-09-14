import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

const httpHeader = {
  headers: new HttpHeaders({ 'Content-type': 'application/json' })
}

@Injectable({
  providedIn: 'root'

})
export class AuthService {


  categoria: String;
  private categoriaDeLaLsita_productos = new Subject<String>();
  enviarcategoria = this.categoriaDeLaLsita_productos.asObservable();


  constructor(private http: HttpClient, private router: Router) { }

  login(loginData): Observable<any> {

    let url = "http://localhost:3000/LoginUsuarios";
    return this.http.post(url, loginData, httpHeader);
  }

  register(regData): Observable<any> {

    let url = "http://localhost:3000/newUsuario";
    return this.http.post(url, regData, httpHeader);

  }


  // Codigo para enviar el categoria de producto de Menu Principal a Lista de Producto
  enviarCategoria(categoria:String){
    
    this.categoria = categoria;
    localStorage.setItem('Categoria', "" + categoria);
    this.categoriaDeLaLsita_productos.next(categoria);

  }

  categoriaService(dato): Observable<any> {
    let url = "http://localhost:3000/getProductsBy";
    return this.http.post(url, dato, httpHeader);
  }

  getCategoria() {
    return localStorage.getItem('Categoria');
  }

  isLogin() {
    let islog = localStorage.getItem("isLogin") === "valido";
    return islog;
  }

  guardarSenal() {
    localStorage.setItem("isLogin", "valido");
  }

  logout() {
    localStorage.removeItem("isLogin");
    this.router.navigateByUrl("/menu-principal");
  }
}
