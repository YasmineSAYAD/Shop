import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { Products } from 'src/app/model/products';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart:Cart[]=[];
  urlImage=`${environment.api_image}`;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.cart=this.cartService.cart;
  }
  addProduct(product:Products):void{
    this.cartService.addProductToCart(product);

  }
  deleteProduct(product:Products):void{
   // console.log("down")//verifier si on arrive bien à détecter le click
    this.cartService.deleteFromCart(product);
  }

}
