import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';

declare var Razorpay: any; 
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  total:any;
  detail:any={
    fullName:'',
    address:'',
    city:'',
    state:'',
    zipCode:'',
  }

  constructor(private router:Router,private cartService:CartService){
  
    this.total=this.router.getCurrentNavigation()?.extras.state;
    this.total=this.total.totalamount;
    // console.log(`total==== ${this.total}`);
  }

  initPay() {
  var options = {
    "key": 'rzp_test_EGpCjewXtNTfti', // Enter the Key ID generated from the Dashboard
    "amount": this.total*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
    "currency": "INR",
    "name": "Veggy Shop",
    "description": "Fresh Vegetables/fruits that you need.",
    // "image": "https://example.com/your_logo",
    "handler":(res:any)=>{this.success();},
    "prefill": {
        "name": "prabhat jain",
        "email": "jyash651@gmail.com",
        "contact": "9610101383"
    },
    "notes": {
        "address": this.detail.address
    },
    "theme": {
        "color": "#660066"
    }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();

  }
  success()
  { var username=this.cartService.getUserName();
    this.cartService.ConfirmOrder(username).subscribe({
      next: (res)=>{this.router.navigateByUrl('home');},
      error:(err)=>{console.log(err);}
    })  
  }

}
