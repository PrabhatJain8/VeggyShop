import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { VegetableService } from 'src/app/vegetable.service';

@Component({
  selector: 'app-add-fruits',
  templateUrl: './add-fruits.component.html',
  styleUrls: ['./add-fruits.component.css']
})
export class AddFruitsComponent {
  constructor(private router:Router,private veggyService: VegetableService,private cartService:CartService){}
  veggy:any={
   id: 0,
   image: "",
   name: "",
   price: 0,
   type: "fruit"
  }

  ngOnInit()
  {
    if(this.cartService.getUserRole()!="Admin"){
      this.router.navigateByUrl('home');
    }
  }

  onSubmit()
  {
    this.veggyService.AddItem(this.veggy).subscribe({
      next: (res)=>{
        console.log("Item Added successfully!");
        this.router.navigateByUrl('fruits');
      },

      error:(err)=>{console.log(err);}
    });
  }
}
