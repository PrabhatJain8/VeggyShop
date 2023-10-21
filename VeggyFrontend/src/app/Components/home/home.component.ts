import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  role:any;
  constructor(private cartService: CartService){
    this.role=cartService.getUserRole();
  }
  // ngOnInit()
  // {
    
  // }


}
