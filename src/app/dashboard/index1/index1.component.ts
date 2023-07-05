import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../data-api.service';
import { UserWService } from "../../user-w.service";
import { AccountInterface } from '../../models/account-interface';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { isError } from "util";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionInterface } from '../../models/transaction-interface';
import { CreditcardInterface } from '../../models/creditcard-interface'; 

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [{
    type: 'info',
    message: 'example text',
  }
];


@Component({
  selector: 'app-index1',
  templateUrl: './index1.component.html',
  styleUrls: ['./index1.component.css']
})
export class Index1Component implements OnInit {
  ngFormCompleteAccount: FormGroup;
  submitted = false;
  alerts: Alert[];
  public waiting = true;
  public clear = true;
  public clear2 = true;
  
  constructor(    
    public _uw:UserWService,
    public router: Router,
    private formBuilder: FormBuilder,
    public dataApi:DataApiService
  ) { 
  this.reset();
  }
  public size=0;
  public saldo=0;
  public isError = false;
  public fullProfile = false;
  public zero = false;
  public one = false;
  public two = false;
  public three = false;
  public four = false;
  public accountId = "";
  public isLogged =false;
  public creditcards:CreditcardInterface;
  public creditcard:CreditcardInterface;
  public newCreditcards:CreditcardInterface; 
  public newAccounts:AccountInterface;
  public transactions:TransactionInterface;
  public transaction:TransactionInterface;
  public accounts : AccountInterface  ;
  public account : AccountInterface ={
    numberBankAccount:"",
    bankEntity:"",
    address:"",
    phone:""
  };
 
  public getTotalTansactions(){
    if (this._uw.userActiveId!==undefined &&  this._uw.usertype=='customer' ){
      this.dataApi.getTotalTransactions(this._uw.userActiveId)
      .subscribe((res:any)=>{ 
          if(res[0] === undefined ){ 
            return
          }
          else
            { 
            this._uw.transactionsSize=res.length;
            this.transactions=res;
            this.sumaryAmount();
          }
        });
    }
  }
  public sumaryAmount(){
    this.saldo=0;
    if(!!this.transactions){
      for(let i=0 ;i <=this._uw.transactionsSize; i++){
        if(this.transactions[i]!=undefined ){  
          if(this.transactions[i].type==='one' && this.transactions[i].status==='complete' ){ 
            this.saldo=this.saldo+this.transactions[i].ammount;
          }
          if(this.transactions[i].type==='four' && this.transactions[i].status==='complete' ){ 
            this.saldo=this.saldo-this.transactions[i].ammount;
          } 
          if(this.transactions[i].type==='two' && this.transactions[i].status==='complete' ){ 
            this.saldo=this.saldo-this.transactions[i].ammount;
          } 
          if(this.transactions[i].type==='three' && this.transactions[i].status==='complete' ){ 
            this.saldo=this.saldo-this.transactions[i].ammount;
          }
          if(this.transactions[i].type==='five' && this.transactions[i].status==='complete' ){ 
            this.saldo=this.saldo+this.transactions[i].ammount;
          }
        }
      }
    }
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
    this._uw.alerts=this.alerts;
  }

  reset() {
    this.alerts = Array.from(this._uw.alerts);
  }

 public loadAccount(){
  if (this._uw.userActiveId!==undefined &&  this._uw.usertype=='customer' ){
      this.dataApi.getAccountByUserd2(this._uw.userActiveId)
      .subscribe(
        (account: AccountInterface) => (
          this.accounts=account,
           // console.log(""+this.accounts[0].fullProfile),
           this.accountId=this.accounts[0].id,
          this.fullProfile=this.accounts[0].fullProfile,
          this.zero=this.accounts[0].zero,
          this.one=this.accounts[0].one,
          this.two=this.accounts[0].two,
          this.three=this.accounts[0].three,
          this.four=this.accounts[0].four,
          this.account=this.accounts[0]
          )
        );
    }
    setTimeout(() => {
        if(!this.fullProfile && this._uw.usertype=='customer'){this.router.navigate(['/admin/acc'])}
      }, 4000);

  }
  getNewAccounts(){
        this.waiting=true;
        this.dataApi.getNewAccountsReturn().subscribe((res:any) => {
      if (res[0] === undefined){
        this.clear = true;
        // console.log("hey");
       }else{
        this.clear = false;
        this.waiting=false;
        this.newAccounts=res;            
        }
     });  
    }
    getNewCreditcards(){
        this.waiting=true;
        this.dataApi.getNewCreditcardsReturn().subscribe((res:any) => {
      if (res[0] === undefined){
        this.clear2 = true;
        // console.log("hey");
       }else{
        this.clear2 = false;
        this.waiting=false;
        this.newCreditcards=res;            
        }
     });  
    }
    

  ngOnInit(): void {
    this.getNewAccounts();
    this.getTotalTansactions();
    this.loadAccount();
    this.getNewCreditcards();
    this.ngFormCompleteAccount = this.formBuilder.group({
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
      this.account.zero=true;
      this.account.one=true;
      this.account.two=false;
      this.account.three=true;
      this.account.four=true;
      this.fullProfile=true;
      this.dataApi.updateAccount(this.account, this.accountId)
      .subscribe((account)=>(
        // this.router.navigate(['/admin/index']),
         this.reset(),
          this._uw.alerts.push({
            type: "info",
            message: "Los datos de la cuenta han sido actualizados con éxito"
          })
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
  quickTransfer = [
        {
          name: "Samuel",
          username: "@sam224",
          image: "assets/images/contacts/1.jpg",
        },
        {
          name: "Cindy",
          username: "@cindyss",
          image: "assets/images/contacts/2.jpg",
        },
        {
          name: "David",
          username: "@davidxc",
          image: "assets/images/contacts/3.jpg",
        },
        {
          name: "Martha",
          username: "@marthaa",
          image: "assets/images/contacts/4.jpg",
        },
        {
          name: "Olivia",
          username: "@oliv62",
          image: "assets/images/contacts/5.jpg",
        },
  ];

}
