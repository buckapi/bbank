import { Component, OnInit } from '@angular/core';
import { TransactionInterface } from '../../models/transaction-interface'; 
import { DataApiService } from '../../data-api.service';
import { UserWService } from "../../user-w.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-mytrans',
  templateUrl: './mytrans.component.html',
  styleUrls: ['./mytrans.component.css']
})

export class MytransComponent implements OnInit {
public clear = true;
public waiting=false ;        
public transactions:TransactionInterface;
public transaction:TransactionInterface;
  constructor(
    public _uw:UserWService,
    public router: Router,
    public dataApi:DataApiService
    ) { }

  ngOnInit(): void {
      this.getMyTransactions();
  }
     

  public getMyTransactions(){
    if (this._uw.userActiveId!==undefined &&  this._uw.usertype=='customer' ){
      this.waiting=true;         
      this.dataApi.getTransactionsByUserId(this._uw.userActiveId)
      .subscribe(
        (transactions: TransactionInterface) => (
          this.transactions=transactions ,
          this.clear=false,         
          this.waiting=false         
        )
      );
    }
  }

}

