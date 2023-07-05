import { Component, OnInit } from '@angular/core';
import { CreditcardInterface } from '../../models/creditcard-interface'; 
import { DataApiService } from '../../data-api.service';
import { UserWService } from "../../user-w.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-mycards',
  templateUrl: './mycards.component.html',
  styleUrls: ['./mycards.component.css']
})
export class MycardsComponent implements OnInit {
public clear = true;
public waiting=false ;        
public creditcards:CreditcardInterface;
public creditcard:CreditcardInterface;
  constructor(
    public _uw:UserWService,
    public router: Router,
    public dataApi:DataApiService
    ) { }

 ngOnInit(): void {
      this.getMyCreditcards();
  }
     
  public getMyCreditcards(){
    if (this._uw.userActiveId!==undefined &&  this._uw.usertype=='customer' ){
      this.waiting=true;         
      this.dataApi.getCreditcardsByUserId(this._uw.userActiveId)
      .subscribe(
        (creditcards: CreditcardInterface) => (
          this.creditcards=creditcards ,
          this.clear=false,         
          this.waiting=false         
        )
      );
    }
  }
  
}

