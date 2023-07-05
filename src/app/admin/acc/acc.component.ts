import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../data-api.service';
import { UserWService } from "../../user-w.service";
import { AccountInterface } from '../../models/account-interface';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { isError } from "util";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-acc',
  templateUrl: './acc.component.html',
  styleUrls: ['./acc.component.css']
})
export class AccComponent implements OnInit {
  ngFormCompleteAccount: FormGroup;
  submitted = false;
  constructor(  public _uw:UserWService,
    public router: Router,
    private formBuilder: FormBuilder,
    public dataApi:DataApiService) { }
  public isError = false;
  public fullProfile = false;
  public accountId = "";
  public isLogged =false;
  public accounts : AccountInterface ;
  public account : AccountInterface ={
    name:"",
    fullname:"",
    identity:"",
    cnumber:"",
    birthday:"",
    numberBankAccount:"",
    bankEntity:"",
    address:"",
    phone:""
  };
  ngOnInit(): void {
      this.loadAccount();
      this.ngFormCompleteAccount = this.formBuilder.group({
      name: [+this._uw.name, [Validators.required]],
      fullname: [+this._uw.fullname, [Validators.required]],
      identity: ['', [Validators.required]],
      cnumber: ['', ],
      birthday: ['', [Validators.required]],
      numberBankAccount: ['', [Validators.required]],
      address: ['', [Validators.required]],
      bankEntity: ['', [Validators.required]],
      phone: ['', [Validators.required]]
      });
  }
    
     public complete(){
      this.submitted = true;
      if (this.ngFormCompleteAccount.invalid) {
      return;
        } 
      this.account.fullProfile=true;
      this.fullProfile=true;
      this.dataApi.updateAccount(this.account, this.accountId)
      .subscribe((account)=>(
        this._uw.alerts.push({
            type: "info",
            message: "Los datos de la cuenta han sido actualizados con éxito"
          }),
        this.router.navigate(['/admin/index'])
        )
      );
  }
   get fval() {
    return this.ngFormCompleteAccount.controls;
    }
  onIsError(): void {
       
      this.isError = true;
      setTimeout(() => {
      this.isError = true;
        //this.isError = false;
      }, 4000);
    }
  public newRequest(type){
    let t = type;
    this._uw.transactionType=t;
     this.router.navigate(['/admin/newrequest'])

  }
  
 public loadAccount(){
  if (!!this._uw.userActiveId&&  this._uw.usertype=='customer' ){
      this.dataApi.getAccountByUserd2(this._uw.userActiveId)
      .subscribe(
        (account: AccountInterface) => (
          this.accounts=account,
           // console.log(""+this.accounts[0].fullProfile),
           this.accountId=this.accounts[0].id,
          this.fullProfile=this.accounts[0].fullProfile,
          this.account=this.accounts[0]
          )
        );
    }
  }
  
  
  

}
