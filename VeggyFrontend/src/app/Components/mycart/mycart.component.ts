import { state } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent {
  myCart:any=[];
  total:any;
  constructor(private  cartService:CartService,private router: Router){
    // console.log("hello from c00");
    
  }
  ngOnInit(){
    // console.log("hellooooo");
    if(this.cartService.getUserName()==''){
      this.router.navigateByUrl('login');
    }
    this.cartService.GetUserCart(this.cartService.getUserName()).subscribe({
      next: (res)=>{
        this.myCart=res;
      }
    });
    this.cartService.SubTotal(this.cartService.getUserName()).subscribe({
      next:(res)=>{
        this.total=res;
      },
      error: (err)=>{console.log(err);}
    });
  }

  deleteItem(id:any)
  {
      this.cartService.RemoveFromCart(id).subscribe({
        next:()=>
        { console.log("delete successfully!");
          // window.location.reload();
          this.ngOnInit();
        }
      })
  }

  callme(cart:any)
  {
    this.cartService.UpdateQuantity(cart).subscribe({
      next:(res)=>
      { console.log("done");
        this.ngOnInit();
      },
      error:(err)=>{
        console.log(err);
        //window.location.reload();
        this.ngOnInit();
      }
    });
  }

  goToCheck(total:any){
    this.router.navigateByUrl('checkout',{state: {totalamount:total}});
  }

  
}
