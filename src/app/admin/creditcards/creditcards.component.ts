import { Component, OnInit } from '@angular/core';
import { CreditcardInterface } from '../../models/creditcard-interface'; 
import { DataApiService } from '../../data-api.service';
import { UserWService } from "../../user-w.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-creditcards',
  templateUrl: './creditcards.component.html',
  styleUrls: ['./creditcards.component.css']
})
export class CreditcardsComponent implements OnInit {
public creditcards:CreditcardInterface;
public creditcard:CreditcardInterface;
public newCreditcards:CreditcardInterface;
public waiting = true;
public clear = true;
public clear2 = true;
  constructor(
  public _uw:UserWService,
    public router: Router,
    public dataApi:DataApiService
    ) { }

  ngOnInit(): void {
     this.getActiveCreditcards();
    this.getNewCreditcards();
  }
    public view(creditcard,i){
        this._uw.creditcardToEdit=creditcard;      
         //console.log("id creditcard: "+this.creditcards[i].id);
     this.router.navigate(['/admin/activatecard']);

    }
   getActiveCreditcards(){
        this.waiting=true;
        this.dataApi.getActiveCreditcardsReturn().subscribe((res:any) => {
      if (res[0] === undefined){
        // console.log("hey");
        this.clear = true;
       }else{
        this.clear = false;
        this.creditcards=res;            
        this.waiting=false;
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
    

  
  
  

}
