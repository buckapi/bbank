import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AccountInterface } from '../../../models/account-interface'; 
import { TransactionInterface } from '../../../models/transaction-interface'; 
import { DataApiService } from '../../../data-api.service';
import { UserWService } from "../../../user-w.service";
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
@Component({
  selector: 'app-stepper-vertical',
  templateUrl: './stepper-vertical.component.html',
  styleUrls: ['./stepper-vertical.component.css']
})
export class StepperVerticalComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
public _uw:UserWService,
    public router: Router,
    public dataApi:DataApiService
    ) {}
  public fail=false;
public waiting = false;
public waiting2 = false;
public clear = true;
public message = "";
public firstCtrl="";
public secondCtrl=0;
public clear2 = true;
public accounts:AccountInterface;
public account:AccountInterface;
public transaction:TransactionInterface={};
public goAmount(stepper: MatStepper){
  if (this._uw.userActiveId!==undefined &&  this._uw.usertype=='customer' ){
        this.waiting=true;
      this.dataApi.getAccountByEmail(this.firstCtrl)
      .subscribe((res:any) => {
      if (res[0] === undefined){
        this.clear = true;
        this.message="Email no registrado!";
        this.fail=true;
        this.waiting=false;
        // console.log("hey");
       }else{
        this.fail=false;
        this.clear = false;
        this.waiting=false;
        this._uw.accountDestin=res[0];
         stepper.next();            
        }
     });  
    }
  }
  public ok(stepper: MatStepper){
  if (this._uw.userActiveId!==undefined &&  this._uw.usertype=='customer' ){
        this.waiting2=true;
        this.transaction.userId="p"+this._uw.userActiveId ;
        this.transaction.ammount=this.secondCtrl;
        this.transaction.type="three";
        this.transaction.status="new";
        this.transaction.beneficiaryId=this._uw.accountDestin.userId;
        this.transaction.remitId=this._uw.userActiveId;
        this.transaction.email=this._uw.email;
        this.transaction.remitEmail=this._uw.email;
        this.transaction.receptEmail=this._uw.accountDestin.email;
      this.dataApi.saveTransaction(this.transaction)
      .subscribe((transaction) => (
          this.router.navigate(['/admin/index']),
          this._uw.alerts.push({
              type: "info",
              message: "Su solicitud de transaferencia fue registrada con éxito"
          })
        )
      );
    }
  }

  ngOnInit() {
    this.isLinear = !this.isLinear;
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [0, Validators.required]
    });
  }

}
