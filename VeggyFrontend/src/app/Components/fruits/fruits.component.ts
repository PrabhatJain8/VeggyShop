import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/cart.service';
import { VegetableService } from 'src/app/vegetable.service';

@Component({
  selector: 'app-fruits',
  templateUrl: './fruits.component.html',
  styleUrls: ['./fruits.component.css']
})
export class FruitsComponent {
    allFruits:any=[];
    role:any;
    searchText:any;
    constructor(private veggyService: VegetableService,private router:Router,private cartService :CartService,private toastr:ToastrService){

    }

    myCart:any={
      id:0,
      userName:"",
      itemName:"",
      price:0,
      quantity:1,
    }

    ngOnInit()
    {
      this.role = this.cartService.getUserRole();
      this.veggyService.GetAllItems().subscribe({
          next: res => {
            this.allFruits = res;
            this.allFruits =this.allFruits.filter( (x:any) => x.type=="fruit");
            console.log(this.allFruits);
          }
      });
    }

    AddCart(data:any){
      if(localStorage.getItem('jwt')==null){
          this.router.navigateByUrl('login');
      }
      else{
        this.myCart.userName=this.cartService.getUserName();
        this.myCart.itemName=data.name;
        this.myCart.price=data.price;
        // console.log(this.myCart);
        this.cartService.AddToCart(this.myCart).subscribe({
          next: (res)=> {this.toastr.success('Item added to your cart!', 'Item Added');
        }
        });
      }
    }

    goToAddFruit() {
      this.router.navigateByUrl('addfruit');
    }
  
  
    Delete(id: any) {
      if ( confirm("You really want to delete?")) {
        this.veggyService.DeleteItem(id).subscribe({
          next: () => {
            console.log("Deleted Successfully!");
            window.location.reload();
          },
          error: (err) => { console.log(err); }
        });
      }
    }
  
    goToEditFruit(vegid :any)
    {
      this.router.navigateByUrl('editfruit',{state: {id: vegid} });
    }
  

}
