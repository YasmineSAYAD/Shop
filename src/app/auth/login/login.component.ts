import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/model/users';
import { CartService } from 'src/app/services/cart.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  errorMessage;

  constructor(private userService:UsersService,
              private formBuilder:FormBuilder,
              private router:Router,
              private cartService:CartService) {

  }

  ngOnInit(): void {
    this.initFormLogin();
  }
  initFormLogin(){
    this.loginForm=this.formBuilder.group(
      {
        email:this.formBuilder.control('',Validators.email),
        password:this.formBuilder.control('',Validators.minLength(6)),

      }
    )
  }
  onSubmit():void{
    const email=this.loginForm.get('email').value;
    const password=this.loginForm.get('password').value;
    const newUser:Users={email:email,password:password};
    this.userService.authentifier(newUser).then(
     (data)=>{
      const cart=this.cartService.cart;
       if(cart.length){
        this.router.navigate(['/checkout']);
       }else{
        this.router.navigate(['/shop']);
       }

     }
    ).catch(
      (error)=>{
        this.errorMessage=error;
        setTimeout(()=>{
          this.errorMessage=null;
        },3000)
        console.log('Error '+error)
      }
      )
    //console.log({email:email,password:password});
  }

}
