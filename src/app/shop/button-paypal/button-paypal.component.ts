import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-button-paypal',
  templateUrl: './button-paypal.component.html',
  styleUrls: ['./button-paypal.component.css']
})
export class ButtonPaypalComponent implements OnInit {
@Input() price;
paypalConfig:IPayPalConfig;
currency=`${environment.CURRENCY}`;
id_client=`${environment. ID_CLIENT_PAYPAL}`;
  constructor(private ordersService:OrdersService,
              private userService:UsersService,
              private cartService:CartService,
              private router:Router) { }

  ngOnInit(): void {
    this.initConfig();
  }
  initConfig(): void {

    const price = this.price;
    const currency = this.currency;
    const id_client = this.id_client;

    this.paypalConfig = {
        currency:currency,
        clientId: id_client,
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: currency,
                    value: price,
                    breakdown: {
                        item_total: {
                            currency_code: currency,
                            value: price
                        },
                    }
                },
                items: [{
                    name: 'PAIEMENT ELEGANCE SHOP',
                    quantity: '1',
                    category: 'PHYSICAL_GOODS',
                    unit_amount: {
                        currency_code: currency,
                        value: price,
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
               //recuperer l'utilisateur connecté
               const user=this.userService.user;
              //recuperer le panier
                const cart=this.cartService.cart;
               //utiliser then prsk ça retourne une promesse
                this.ordersService.createOrders(user,cart).then(
                    ()=>{
                          console.log("Commande créée avec succès");
                        }
                  ).catch(
                     (error)=>{
                        console.log("Error "+error)
                    }
                  );
            actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });
        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);

        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
        },
        onError: err => {
            console.log('OnError', err);
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
        },
    };
}
}
