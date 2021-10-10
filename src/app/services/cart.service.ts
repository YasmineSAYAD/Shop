import { Injectable } from '@angular/core';
import { element } from 'protractor';
import { Cart } from '../model/cart';
import { Products } from '../model/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
cart:Cart[];
cartData={len:0,cost:0}
  constructor() {
    this.initCart();
  }
  initCart():void{
  if(typeof(localStorage)!=='undefined'){
    const cart=JSON.parse(localStorage.getItem('cart'));
    //JSON.parse() c'est l'inverse de JSON.stringify() elle nous permet de convertir la chaine de caractere obtenue en un tableau
    const cartData=JSON.parse(localStorage.getItem('cartData'));
    this.cart=cart ? cart :[];
    this.cartData=cartData ? cartData :{len:0,cost:0};
  }else{
    this.cart=[];
    this.cartData={len:0,cost:0};
  }
  }
  updateDataCart(){
    let len=0;//nombre d'élément
    let cost=0;//prix total
    this.cart.forEach(element=>{
      len+=element.number;
      cost+=element.product.price*element.number;
    });
    this.cartData.cost=cost;
    this.cartData.len=len;
    //stocker les données dans le navigateur de l'utilisateur
    //verifier si le navigateur de l'utilisateur supporte local storage
    if(typeof(localStorage)!=="undefined"){
       localStorage.setItem('cart',JSON.stringify(this.cart) ); //local storage prends uniquement des chaines de caractères
       //JSON.stringify(this.cart): convertir le tableau en string
       localStorage.setItem('cartData',JSON.stringify(this.cartData) );
    }
  }
  addProductToCart(newProduct:Products):void{
    //si on a déja le produit dans le panier on incrémente le nombre de produit dans le panier
    const checkedProduct=this.cart.find(element=>element.product==newProduct);
    if (checkedProduct){
      checkedProduct.number++;
    }else{
      const newProductToAdd={
        number:1,
        product:newProduct,
      };
      this.cart.push(newProductToAdd);
    }
    this.updateDataCart();
  }
  deleteFromCart(productToDelete:Products):void{
   const indexProduct=this.cart.findIndex(element=>element.product==productToDelete);
   //console.log(indexProduct);
   if(indexProduct!==-1){//prsk findIndex(...) commence à partir de 0/ -1 cest à dire ya aucun elt
      if(this.cart[indexProduct].number>1){
        this.cart[indexProduct].number --;
      }else{
        this.cart.splice(indexProduct,1);//1 c'est le nombre de produits qu'on veut supprimer
      }
   }
   this.updateDataCart();
  }
  removeElementOfCart(index:number):void{
    //index sert à supprimer
    this.cart.splice(index,1);//1 c'est le nombre d'element qu'on veut supprimer
    //mettre à jour le panier
    this.updateDataCart();
  }
}
