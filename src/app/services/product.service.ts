import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { element } from 'protractor';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Products } from '../model/products';
import { Result } from '../model/result';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
products: Products[]=[];
prodSubject=new Subject <Products[]>();//observable
numberOfProductByPage=6;
  constructor(private httpClient:HttpClient) {
   //mettre à jour les données après l'appel au service
   this.getProductFromServer();
  }
  emitProducts(){
    this.prodSubject.next(this.products);
  }
  getProductFromServer(){
    const url=`${environment.API+'products?'+environment.API_KEY}`;
    this.httpClient.get(url).subscribe(
      (dataProduct:Result)=>{
        if(dataProduct.status==200){
          this.products=dataProduct.result;
          this.emitProducts();//mettre les données dans l'observable
        }else{
          console.log("Error"+dataProduct.message)
        }
      }
    )
  }
  getProductById(id:number):Products{
    const product=this.products.find(element=>element.idProduct==id);
    if(product){
      return product;
    }
    return null;
  }
  getProductByPage(numberPage:number):Products[]{
    const numberOfPage=this.products.length/this.numberOfProductByPage;
   if(numberPage>0 || numberPage<=numberOfPage){
     const prodResult=this.products.slice(numberPage*this.numberOfProductByPage,(numberPage+1)*this.numberOfProductByPage);
     return prodResult;
    }
    return null;
  }
}
