import { Component } from '@angular/core';
import { CartService } from './cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Veggy';
  constructor(public cartService:CartService,private router:Router){

  }
  username:any;
  total:any;
  ngOnInit(){
    this.username=this.cartService.getUserName();
    if(this.username!=''){
       this.getTotalItem();
    }
    // console.log(`Bearer ${localStorage.getItem('jwt')}`);
    
  }
  getTotalItem()
  {
    return this.cartService.TotalItems(this.username).subscribe({
      next:(res)=>{
      this.total=res;
      this.ngOnInit();}
    });
    
  }

  goToCart()
  {
    if(localStorage.getItem('jwt')==null){
      this.router.navigateByUrl('login');
    }
    else{
      this.router.navigateByUrl('mycart');
    }
  }

  logout()
  {
    localStorage.removeItem('jwt');
    this.ngOnInit();
    this.router.navigateByUrl('home');
  }


}
