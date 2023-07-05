import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../data-api.service';
import { UserWService } from "../../user-w.service";
import { AccountInterface } from '../../models/account-interface'; 
import { TransactionInterface } from '../../models/transaction-interface'; 
import { CreditcardInterface } from '../../models/creditcard-interface'; 
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { isError } from "util";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-newrequest',
  templateUrl: './newrequest.component.html',
  styleUrls: ['./newrequest.component.css']
})

export class NewrequestComponent implements OnInit {
  submitted = false;
  submitted2 = false;
  submitted4 = false;
  public waiting = false;
  title = 'bbev';
  ref = 0;
  navSidebarClass: boolean = true;
  hamburgerClass: boolean = false;

  constructor(
      public _uw:UserWService,
      public router: Router,
      private formBuilder: FormBuilder,
      public dataApi:DataApiService
  ) { }
 public aleatorio(a,b) {
    return Math.round(Math.random()*(b-a)+parseInt(a));
  }
  public creditcard : CreditcardInterface={
    status:"new",
    name:''
  }; 
  public transaction : TransactionInterface={
    type:"one",
    ref:"",
    beneficiaryId:"",
    status:"new",
    ammount: 0
  }; 
  public isError = false;
  public isLogged =false;
  ngFormOne: FormGroup;
  ngFormTwo: FormGroup;
  ngFormThree: FormGroup;
  ngFormFour: FormGroup;
  message = ""; 
  
  get fval() {
    return this.ngFormOne.controls;
  }

 get fval2() {
    return this.ngFormTwo.controls;
  }
 get fval3() {
    return this.ngFormTwo.controls;
  }


  public saveTransaction(transaction){
    return this.dataApi.saveTransaction(this.transaction)
      .subscribe((transaction) => (
          this.router.navigate(['/admin/index']),
          this._uw.alerts.push({
              type: "info",
              message: "Su solicitud fue registrada con éxito"
          })
        )
      );
  }
  public saveTransactionE(transaction){
    return this.dataApi.saveTransaction(this.transaction)
      .subscribe((transaction) => (
          this.router.navigate(['/admin/index']),
          this._uw.alerts.push({
              type: "info",
              message: "Su solicitud 'retiro de fondos' fue registrada con éxito"
          })
        )
      );
  }
  public newCreditcard(creditcard){
    return this.dataApi.newCreditcard(this.creditcard)
       .subscribe((creditcard) => (
        this.router.navigate(['/admin/index']),
        this._uw.alerts.push({
              type: "info",
              message: "Su solicitud de tarjeta fue registrada con éxito"
          })
        )
      );
  }

  
  public go(){
    this.submitted = true;
    if (this.ngFormOne.valid){
      this.transaction.ammount=this.transaction.ammount;
      this.transaction.email=this._uw.email;
      this.transaction.type="one";
      this.transaction.ref="";
      this.transaction.beneficiaryId="p"+this._uw.userActive.id;
      this.transaction.userId="p"+this._uw.userActive.id;
      this.ref=this.aleatorio(10000,99999);
      let refString = this.ref.toString();
      this.transaction.ref=refString;
      this.saveTransaction(this.transaction);
    }
  } 
  public goRetiro(){
    this.submitted4 = true;
    if (this.ngFormFour.valid){
      this.transaction.ammount=this.transaction.ammount;
      this.transaction.email=this._uw.email;
      this.transaction.type="four";
      this.transaction.beneficiaryId="p"+this._uw.userActive.id;
      this.transaction.userId="p"+this._uw.userActive.id;
        this.ref=this.aleatorio(10000,99999);
      let refString = this.ref.toString();
      this.transaction.ref=refString;
      this.saveTransactionE(this.transaction);
    }
  } 
  public goDepositToCard(){
    this.submitted2 = true;
    if (this.ngFormTwo.valid){
      this.transaction.ammount=this.transaction.ammount;
       this.transaction.email=this._uw.email;
      this.transaction.type="two";
      this.transaction.beneficiaryId="p"+this._uw.userActive.id;
      this.transaction.userId="p"+this._uw.userActive.id;
        this.ref=this.aleatorio(10000,99999);
      let refString = this.ref.toString();
      this.transaction.ref=refString;
      this.saveTransaction(this.transaction);
    }
  }
  public goNewCard(){
    this.creditcard.userId="p"+this._uw.userActive.id;
    this.creditcard.email=this._uw.email;
    this.creditcard.name=this._uw.name;
    this.newCreditcard(this.creditcard);    
  }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
    this.isError = true;
    }, 4000);
  }

  ngOnInit(): void {
    this.ngFormOne = this.formBuilder.group({
      ammount: [0, [Validators.required]]
      });
    this.ngFormTwo = this.formBuilder.group({
      ammount: [0, [Validators.required]]
      });
    this.ngFormFour = this.formBuilder.group({
      ammount: [0, [Validators.required]]
      });
  }

}
