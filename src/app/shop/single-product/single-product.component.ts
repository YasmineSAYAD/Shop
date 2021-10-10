import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Products } from 'src/app/model/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
product:Products;
urlImage=`${environment.api_image}`;
productSub:Subscription;
  constructor(private prodService:ProductService,
              private route:ActivatedRoute,
              private cartService:CartService) {

  }

  ngOnInit(): void {
    window.scrollTo(0,0); //afficher la page depuis le haut
    //recuperer l'id dans l'url
    const id=+this.route.snapshot.params['id'];// + c'est pr convertir l'id recu sous forme de string en number

    this.productSub=this.prodService.prodSubject.subscribe(
      (data:Products[])=>{
        //recuperer le produit qui a l'id recu en param de l'url
        this.product=this.prodService.getProductById(id);
      }
    );
    this.prodService.emitProducts();

  }
  addProduct(product:Products){
    this.cartService.addProductToCart(product);
  }

}
