import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ShopComponent } from './shop/shop.component';
import { ProductComponent } from './shop/product/product.component';
import { SingleProductComponent } from './shop/single-product/single-product.component';
import { CartComponent } from './shop/cart/cart.component';
import { RouterModule, Routes } from '@angular/router';
import { componentFactoryName } from '@angular/compiler';
import { NotFoundComponent } from './not-found/not-found.component';
import { ModalAddToCartComponent } from './shop/modal-add-to-cart/modal-add-to-cart.component';
import { ModalQuickViewComponent } from './shop/modal-quick-view/modal-quick-view.component';
import { CategoryComponent } from './category/category.component';
import { CategoryService } from './services/category.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './shop/checkout/checkout.component';
import { AuthGuard } from './services/auth.guard';
import { ButtonPaypalComponent } from './shop/button-paypal/button-paypal.component';
import { NgxPayPalModule } from 'ngx-paypal';

const routes:Routes=[
  {path:'home',component:HomeComponent},
  {path:'shop',component:ShopComponent},
  {path:'cart',component:CartComponent},
  {path:'single-product/:id',component:SingleProductComponent},
  {path:'contact',component:ContactComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'checkout',/*canActivate:[AuthGuard],*/component:CheckoutComponent},
  {path:'',component:ShopComponent},
  {path:'notfound',component:NotFoundComponent},
  {path:'cart',component:CartComponent},
  {path:'category/:id',component:CategoryComponent},
  {path:'**',redirectTo:'notfound', pathMatch:'full'},
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    ShopComponent,
    ProductComponent,
    SingleProductComponent,
    CartComponent,
    NotFoundComponent,
    ModalAddToCartComponent,
    ModalQuickViewComponent,
    CategoryComponent,
    CheckoutComponent,
    ButtonPaypalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    NgxPayPalModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
