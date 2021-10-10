import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products=[];
  prodSub:Subscription;
  constructor(private prodService:ProductService) {

  }

  ngOnInit(): void {
    this.prodSub=this.prodService.prodSubject.subscribe(
      (data)=>{this.products=this.prodService.getProductByPage(0)/*data*/;}
    );
    this.prodService.emitProducts();

  }

}
