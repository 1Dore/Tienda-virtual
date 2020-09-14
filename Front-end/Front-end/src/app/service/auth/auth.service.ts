import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const httpHeader = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
  
})
export class AuthService {


  categoria: String;
  private categoriaDeLaLsita_productos = new Subject<String>();
  enviarcategoria = this.categoriaDeLaLsita_productos.asObservable();


  constructor(private http:HttpClient) { }

  login(loginData): Observable<any>{

    let url = "http://localhost:3000/LoginUsuarios";
    return this.http.post(url, loginData, httpHeader);
  }

  register(regData): Observable<any>{

    let url = "http://localhost:3000/newUsuario";
    return this.http.post(url, regData, httpHeader);

  }

  isLogin(){
    return false;
  }

  // Codigo para enviar el categoria de producto de Menu Principal a Lista de Producto
  enviarCategoria(categoria: String): Observable<any>{

    this.categoria = categoria;
    this.categoriaDeLaLsita_productos.next(categoria);
    let url = "http://localhost:3000/getProductsBy";
    return this.http.post(url, categoria, httpHeader); 

  }


}
