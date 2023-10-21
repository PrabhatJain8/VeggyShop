import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private userService : UserService,private router: Router){

  }
  register:any={
    userName:"",
    email:"",
    password:"",
    confirm_password:""
  }

  onSubmit()
  {
    this.userService.RegisterUser(this.register).subscribe({
      next: (res) =>{
        console.log("User Register Successfully!");
        this.router.navigateByUrl('login');
      },
      error: (err) =>{console.log(err.error);}
    });
  }



}
