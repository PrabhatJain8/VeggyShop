import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { VegetablesComponent } from './Components/vegetables/vegetables.component';
import { FruitsComponent } from './Components/fruits/fruits.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { FormsModule } from '@angular/forms';
import { ValidateEqualModule } from 'ng-validate-equal';
import { MycartComponent } from './Components/mycart/mycart.component';
import { AddVegetablesComponent } from './Components/add-vegetables/add-vegetables.component';
import { EditVegetablesComponent } from './Components/edit-vegetables/edit-vegetables.component';
import { AddFruitsComponent } from './Components/add-fruits/add-fruits.component';
import { EditFruitsComponent } from './Components/edit-fruits/edit-fruits.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VegetablesComponent,
    FruitsComponent,
    LoginComponent,
    RegisterComponent,
    MycartComponent,
    AddVegetablesComponent,
    EditVegetablesComponent,
    AddFruitsComponent,
    EditFruitsComponent,
    CheckoutComponent,
    
  
  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ValidateEqualModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
