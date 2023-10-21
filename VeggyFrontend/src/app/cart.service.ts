import { HttpClient, HttpHeaders, JsonpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl:any = "https://localhost:7108/Cart/";
  constructor(private http : HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':  `Bearer ${localStorage.getItem('jwt')}`
      
    }),
  };

  AddToCart(data:any){
    return this.http.post(this.baseUrl+"Add",JSON.stringify(data),this.httpOptions);
  }

  GetUserCart(username:any){
    return this.http.get(this.baseUrl+username,this.httpOptions);
  }

  RemoveFromCart(id:any){
    return this.http.delete(this.baseUrl+id,this.httpOptions);
  }

  TotalItems(user:any){
    return this.http.get(this.baseUrl+user+'/TotalItems',this.httpOptions);
  }

  SubTotal(user:any){
    return this.http.get(this.baseUrl+user+'/SubTotal',this.httpOptions);
  }

  UpdateQuantity(cart:any){
    return this.http.put(this.baseUrl+cart.id,JSON.stringify(cart),this.httpOptions);
  }

  ConfirmOrder(username:any){
    return this.http.get(this.baseUrl+username+'/ConfirmOrder',this.httpOptions);
  }

  getUserName()
  {
    const info = localStorage.getItem('jwt');
    var data:any;
    if(info!=null){
        data = this.getDecodedAccessToken(info);
    }
    
    const userName = data==null? '': data.UserName;
    return userName;
   
  }

  getUserRole()
  {
    const info = localStorage.getItem('jwt');
    var data:any;
    if(info!=null){
        data = this.getDecodedAccessToken(info);
    }
    
    const userRole = data==null? '': data["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    return userRole;

  }
  getDecodedAccessToken(token: string) {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }



}

