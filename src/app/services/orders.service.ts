import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../model/cart';
import { Users } from '../model/users';
import { CartService } from './cart.service';
import { environment } from 'src/environments/environment';
import { Result } from '../model/result';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient:HttpClient, private cartService:CartService) {

  }
  createOrders(user:Users, cart:Cart[]){
    return new Promise(
      (resolve,reject)=>{
        cart.forEach(
          (data)=>{
          //passer la commande
          const price=data.number*data.product.price;
          const url=`${environment.API+'createOrders.php?'+environment.API_KEY}`
          +'&idUser='+user.idUser+'&idProduct='+data.product.idProduct
          +'&quantity='+data.number+'&price='+price;
          this.httpClient.get(url).subscribe(
            (response:Result)=>{
              if(response.status==200){
                //si la commande est bien passée, on supprime le produit du panier
                this.cartService.removeElementOfCart(0);
                if(cart.length==0){
                  resolve(true);
                }
              }else{
                reject(response.message);
              }
            },
            (error)=>{
              reject("Error "+error);
            }
          )
          }
        );//end foreach
      }
    )
  }
}
