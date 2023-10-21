import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { VegetablesComponent } from './Components/vegetables/vegetables.component';
import { FruitsComponent } from './Components/fruits/fruits.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { MycartComponent } from './Components/mycart/mycart.component';
import { AddVegetablesComponent } from './Components/add-vegetables/add-vegetables.component';
import { EditVegetablesComponent } from './Components/edit-vegetables/edit-vegetables.component';
import { AddFruitsComponent } from './Components/add-fruits/add-fruits.component';
import { EditFruitsComponent } from './Components/edit-fruits/edit-fruits.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';


const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full' },
  {path:'home', component:HomeComponent},
  {path:'vegetables',component:VegetablesComponent},
  {path:'fruits',component:FruitsComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'mycart',component:MycartComponent},
  {path:'addveggy',component:AddVegetablesComponent},
  {path:'editveggy',component:EditVegetablesComponent},
  {path:'addfruit',component:AddFruitsComponent},
  {path:'editfruit',component:EditFruitsComponent},
  {path:'checkout',component:CheckoutComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
