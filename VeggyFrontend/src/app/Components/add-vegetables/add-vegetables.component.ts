import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/cart.service';
import { VegetableService } from 'src/app/vegetable.service';

@Component({
  selector: 'app-add-vegetables',
  templateUrl: './add-vegetables.component.html',
  styleUrls: ['./add-vegetables.component.css']
})
export class AddVegetablesComponent {

  constructor(private router:Router,private veggyService: VegetableService,private cartService:CartService,private toastr: ToastrService){}
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
  }

  onSubmit()
  {
    this.veggyService.AddItem(this.veggy).subscribe({
      next: (res)=>{
        
        this.router.navigateByUrl('vegetables');
      },

      error:(err)=>{console.log(err);}
    });
  }



}
