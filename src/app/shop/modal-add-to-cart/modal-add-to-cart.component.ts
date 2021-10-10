import { Component, Input, OnInit } from '@angular/core';
import { Products } from 'src/app/model/products';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-add-to-cart',
  templateUrl: './modal-add-to-cart.component.html',
  styleUrls: ['./modal-add-to-cart.component.css']
})
export class ModalAddToCartComponent implements OnInit {
  @Input() products:Products[]; //c'est à dire pour que ce component marche il faut lui donner un tab de produits cela evite d'utiliser le modal qd il n'y a pas de produits
  urlImage=`${environment.api_image}`;
  constructor() { }

  ngOnInit(): void {
  }

}
