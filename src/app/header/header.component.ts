import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from '../model/cart';
import { Category } from '../model/category';
import { Products } from '../model/products';
import { CartService } from '../services/cart.service';
import { CategoryService } from '../services/category.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cart:Cart[]=[];
  cartData;
  categories:Category[];
  categorySub:Subscription;
  isAuth=false;
  constructor(private carteSerice:CartService,
              private categoryService: CategoryService,
              private userService:UsersService) {

  }

  ngOnInit(): void {
    this.cart=this.carteSerice.cart;
    this.cartData=this.carteSerice.cartData;
    this.isAuth=this.userService.isAuth;
    this.categorySub=this.categoryService.categorySubject.subscribe(
      (data:Category[])=>{
        this.categories=data;
      }
    );
    this.categoryService.emitCategory();
  }
  logout(){
    this.userService.logout();
    this.isAuth=this.userService.isAuth;

  }

}
