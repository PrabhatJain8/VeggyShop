import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/cart.service';
import { UserService } from 'src/app/user.service';
import { VegetableService } from 'src/app/vegetable.service';

@Component({
  selector: 'app-vegetables',
  templateUrl: './vegetables.component.html',
  styleUrls: ['./vegetables.component.css']
})
export class VegetablesComponent {
  allVegetables: any = [];
  role: any;
  searchText:any;
  constructor(private veggyService: VegetableService, private cartService: CartService, private router: Router,private toastr: ToastrService) {

  }
  myCart: any = {
    id: 0,
    userName: "",
    itemName: "",
    price: 0,
    quantity: 1,
  }

  ngOnInit() {
    this.role = this.cartService.getUserRole();
    console.log(this.role);
    this.veggyService.GetAllItems().subscribe({
      next: res => {
        this.allVegetables = res;
        this.allVegetables = this.allVegetables.filter((x: any) => x.type == "vegetable");
        console.log(this.allVegetables);
      }
    });
  }

  AddCart(data: any) {
    if (localStorage.getItem('jwt') == null) {
      this.router.navigateByUrl('login');
    }
    else {
      this.myCart.userName = this.cartService.getUserName();
      this.myCart.itemName = data.name;
      this.myCart.price = data.price;
      // console.log(this.myCart);
      this.cartService.AddToCart(this.myCart).subscribe({
        next: (res) => { this.toastr.success('Item added to your cart!', 'Item Added'); }
      });
    }
  }

  goToAddVeggy() {
    this.router.navigateByUrl('addveggy');
  }


  Delete(id: any) {
    if ( confirm("You really want to delete?")) {
      this.veggyService.DeleteItem(id).subscribe({
        next: () => {
          console.log("Deleted Successfully!");
          this.ngOnInit();
        },
        error: (err) => { console.log(err); }
      });
    }
  }

  goToEditVeggy(vegid :any)
  {
    this.router.navigateByUrl('editveggy',{state: {id: vegid} });
  }


}
