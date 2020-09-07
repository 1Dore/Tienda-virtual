import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpHeader = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(loginData): Observable<any>{

    let url = "localhost:3000/LoginUsuarios";
    return this.http.post(url, loginData, httpHeader);
  }

  register(regData): Observable<any>{

    let url = "localhost:3000/newUsuario";
    return this.http.post(url, regData, httpHeader);

  }


}
