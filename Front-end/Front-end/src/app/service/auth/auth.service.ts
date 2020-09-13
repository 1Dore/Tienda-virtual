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

  tipo: String;
  private tipoDeLaLsita_productos = new Subject<String>();
  enviarTipo = this.tipoDeLaLsita_productos.asObservable();

  constructor(private http:HttpClient) { }

  login(loginData): Observable<any>{

    let url = "http://localhost:3000/LoginUsuarios";
    return this.http.post(url, loginData, httpHeader);
  }

  register(regData): Observable<any>{

    let url = "http://localhost:3000/newUsuario";
    return this.http.post(url, regData, httpHeader);

  }




  // Codigo para enviar el tipo de producto de Menu Principal a Lista de Producto

  

  enviarCategoria(tipo: String){
    this.tipo = tipo;
    localStorage.setItem('Categoria', "" + tipo);
    this.tipoDeLaLsita_productos.next(tipo);
  }

  getCategoria(){
    return localStorage.getItem('Categoria');
  }
  

}
