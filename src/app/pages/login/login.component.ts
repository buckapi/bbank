import { Component, OnInit } from '@angular/core';
import { UserWService } from "../../user-w.service";
import { DataApiService } from '../../data-api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { UserInterface } from '../../models/user-interface'; 
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngFormLogin: FormGroup;
  submitted = false;
  constructor(
    public _uw:UserWService,
    public formBuilder: FormBuilder, 
    private dataApi: DataApiService,
    private authService: AuthService, 
    public router: Router
  ) 
  { }
  message = "";  
  public user : UserInterface ={
    name:"",
    fullname:"",
    email:"",
    password:"",
    usertype:""
  };
  public isError = false;
  public isLogged =false;

 loadAPI = null; 
 url = "";
 public loadScript() {
  let node = document.createElement("script");
  node.src = this.url;
  node.type = "text/javascript";
  node.async = true;
  node.charset = "utf-8";
  document.getElementsByTagName("head")[0].appendChild(node);
}
get fval() {
  return this.ngFormLogin.controls;
  }
    onIsError(): void {
       
    this.isError = true;
    setTimeout(() => {
    this.isError = true;
      //this.isError = false;
    }, 4000);
  }
     onCheckUser(): void {
    if (this.authService.getCurrentUser() === null) {
         this.isLogged = false;
      this._uw.isLogged=false;
    } else {
      this.isLogged = true;
      this._uw.isLogged = true;
      this.router.navigate(['']);
    }
  }
     onLogin(){
     this.submitted = true;
      if (this.ngFormLogin.invalid) {
      return;
        } 
//      alert('form fields are validated successfully!');
      return this.authService.loginUser(
        this.user.email, 
        this.user.password
        )
      .subscribe( 
        data => {
          //console.log(data);
              this._uw.userActive=data.user;
              this.authService.setUser(data.user);
              const token = data.id;
              this.authService.setToken(token);
              this._uw.userId=data.id;
              this._uw.appointmentUsercard=data.user.id;
              this._uw.name=data.user.name;
              this._uw.fullname=data.user.fullname;
              this._uw.email=data.user.email;
              this._uw.usertype=data.user.usertype;
              this._uw.userActiveId=data.user.id;
              this._uw.fullProfile=data.user.fullProfile;
        //   console.log("id : "+this._uw.userActiveId);
              this._uw.userW=data.user;
              this._uw.isLogged=true;
              this._uw.appointmentUsercard= "p"+this._uw.appointmentUsercard;
              this.router.navigate(['/admin/index']);
              this.isError = false;
           
        },
         error => {
                if(error.status==401){
                this.isError = true;
                this.message="Usuario o contraseña inválidos";
              }//
         this.onIsError();
         }

        ); 
  }   
  ngOnInit(): void {
    this.ngFormLogin = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]]
      });

         if (this._uw.loaded==true){
      this.loadAPI = new Promise(resolve => {
        // this.loadScript();
 
        });
      }
    this._uw.loaded=true;
  }

  

}
