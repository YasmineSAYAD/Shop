import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/model/users';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
registerForm:FormGroup;
errorMessage;
successMessage;
  constructor(private userService:UsersService,
              private formBuilder:FormBuilder,
              private router:Router)
    {

    }

  ngOnInit(): void {
    this.initRegisterForm();
  }
  initRegisterForm():void{
    this.registerForm=this.formBuilder.group(
      {
        sexe:this.formBuilder.control('',[Validators.required]),
        pseudo:this.formBuilder.control('',[Validators.required]),
        lastname:this.formBuilder.control('',[Validators.required]),
        firstname:this.formBuilder.control('',[Validators.required,Validators.minLength(5)]),
        email:this.formBuilder.control('',[Validators.required, Validators.email]),
        password:this.formBuilder.control('',[Validators.required,Validators.minLength(6)]),
        dateBirth:this.formBuilder.control('',[Validators.required]),
      }
    )
  }
  onSubmit():void{
    const sexeUser=this.registerForm.get('sexe').value;
    const pseudoUser=this.registerForm.get('pseudo').value;
    const lastnameUser=this.registerForm.get('lastname').value;
    const firstnameUser=this.registerForm.get('firstname').value;
    const emailUser=this.registerForm.get('email').value;
    const passwordUser=this.registerForm.get('password').value;
    const dateBirthUser=this.registerForm.get('dateBirth').value;
    const newUser:Users={
       sexe:sexeUser,
       pseudo:pseudoUser,
       lastname:lastnameUser,
       firstname:firstnameUser,
       email:emailUser,
       password:passwordUser,
       dateBirth:dateBirthUser,
    };

    this.userService.createUser(newUser).then(
      (data)=>{
        this.errorMessage=null;
        this.successMessage=data;
        setTimeout(()=>{
          this.successMessage=null;
        },2000)
        this.router.navigate(['/shop']);
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
  }


}
