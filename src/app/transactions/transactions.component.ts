import { Component, OnInit } from '@angular/core';
import { AccountInterface } from '../models/account-interface'; 
import { DataApiService } from '../data-api.service';
import { UserWService } from "../user-w.service";
import {  throwError } from 'rxjs';
import { Observable }  from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

interface transaction {
  id?:number;
  type?:string;
  ref?:string;
  beneficiaryId?:string;
  ammount?:number;
  status?:string;
}

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

public collectionSize = 0;
public transactions:  transaction[] ;
  constructor(
    public _uw:UserWService,
    public router: Router,
    public dataApi:DataApiService
  	) {
		this.updateTransactionListing();
  }
  public account : AccountInterface  ;
  public accounts : AccountInterface  ;
  public transactionview(transaction){
    this._uw.transactionToEdit=transaction;
    this.dataApi.getAccountByUserID(this._uw.transactionToEdit.beneficiaryId)
      .subscribe(
        (account: AccountInterface) => (
          this._uw.accountForTransfer=account[0],
            this.router.navigate(['/admin/transactionview'])  
          )
        );
  }
  ngOnInit(): void {
  	this.getTransactions();
  }

 public getTransactions(){
	 	this.dataApi.getTransationsReturn().subscribe(
	 		  (transactions: any[])=>(
	 			this.transactions = transactions, 
	 			this.collectionSize = this.transactions.length)
	 	);
 }    
    
  page = 1;
  pageSize = 10;
  
  updateTransactionListing() {
      if (!!(this.transactions)){
        this.transactions = this.transactions
          .map((customer, i) => ({id: i + 1, ...customer}))
          .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
      }  
  }
}
