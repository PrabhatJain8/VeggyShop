import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl:any = "https://localhost:7108/Authenticate";
  constructor(private http : HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      
    }),
  };

  RegisterUser(data:any){
    return this.http.post(this.baseUrl+'/RegisterUser',JSON.stringify(data),this.httpOptions);
  }

  LoginUser(data:any){
    return this.http.post(this.baseUrl+'/Login',JSON.stringify(data),this.httpOptions);
  }

}
