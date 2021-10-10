import { Component, Input, OnInit } from '@angular/core';
import { Products } from 'src/app/model/products';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-quick-view',
  templateUrl: './modal-quick-view.component.html',
  styleUrls: ['./modal-quick-view.component.css']
})
export class ModalQuickViewComponent implements OnInit {
@Input() products:Products[]; //c'est à dire pour que ce component marche il faut lui donner un tab de produits cela evite d'utiliser le modal qd il n'y a pas de produits
urlImage=`${environment.api_image}`;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
  }
  addToCart(product:Products):void{
    this.cartService.addProductToCart(product);
  }

}
