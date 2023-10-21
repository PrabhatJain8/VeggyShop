import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { VegetableService } from 'src/app/vegetable.service';

@Component({
  selector: 'app-edit-vegetables',
  templateUrl: './edit-vegetables.component.html',
  styleUrls: ['./edit-vegetables.component.css']
})
export class EditVegetablesComponent {
  vegid:any;
  constructor(private router:Router,private veggyService: VegetableService,public cartService:CartService){
    this.vegid= this.router.getCurrentNavigation()?.extras.state;
    this.vegid=this.vegid.id;
  }
  veggy:any={
   id: 0,
   image: "",
   name: "",
   price: 0,
   type: "vegetable"
  }

  ngOnInit()
  {

    
  
    if(this.cartService.getUserRole()!="Admin"){
      this.router.navigateByUrl('home');
    }

    this.veggyService.GetByID(this.vegid).subscribe({
      next: (res)=>{
        this.veggy=res;
      },
      error:(err)=>{console.log(err);}
    })
  }

  onSubmit()
  {
   this.veggyService.UpdateItem(this.veggy.id,this.veggy).subscribe({
    next:(res)=>{
      console.log("Update Successfully!");
      this.router.navigateByUrl('vegetables');

    },
    error:(err)=>{console.log(err);}
   }) 
  }



}
