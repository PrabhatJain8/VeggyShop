import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VegetableService {
  baseUrl:any = "https://localhost:7108/Item/";
  constructor(private http : HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':  `Bearer ${localStorage.getItem('jwt')}`
    }),
  };

  GetAllItems(){
    return   this.http.get(this.baseUrl);
  }

  AddItem(data:any){
    return this.http.post(this.baseUrl,JSON.stringify(data),this.httpOptions);
  }

  DeleteItem(id:any){
    return this.http.delete(this.baseUrl+id,this.httpOptions);
  }

  GetByID(id:any){
    return this.http.get(this.baseUrl+id,this.httpOptions);
  }

  UpdateItem(id:any,data:any){
    return this.http.put(this.baseUrl+id,JSON.stringify(data), this.httpOptions);
  }

}
