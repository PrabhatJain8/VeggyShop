import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { window } from 'rxjs';
import { CartService } from 'src/app/cart.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService : UserService,private router: Router,public cartService:CartService){

  }

  login: any ={
    email:"",
    password:"",
    role:""
  };

  ngOnInit()
  {
    if(this.cartService.getUserName()!=''){
      this.router.navigateByUrl('home');
    }
  }
  onSubmit()
  { 
    
    this.userService.LoginUser(this.login).subscribe({
      next:(res:any)=>{
        // console.log("login success!");
        localStorage.setItem('jwt',res.token);
        location.reload();
      },
      error:(err)=>{
        alert("Wrong Email or Password");
      }

    });
    
  }

}
