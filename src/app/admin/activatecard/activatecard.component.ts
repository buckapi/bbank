import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../data-api.service';
import { UserWService } from "../../user-w.service";
import { CreditcardInterface } from '../../models/creditcard-interface'; 
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { isError } from "util";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-activatecard',
  templateUrl: './activatecard.component.html',
  styleUrls: ['./activatecard.component.css']
})
export class ActivatecardComponent implements OnInit {
  ngFormActivateCreditCard: FormGroup;
  submitted = false;

  constructor(
    public _uw:UserWService,
    public router: Router,
    private formBuilder: FormBuilder,
    public dataApi:DataApiService
  ) { }
  public isError = false;
  public isLogged =false;
  public creditcard : CreditcardInterface ={
    number:"",
    name:"",
    cvv:"",
    caduca:"",
    address:"",
    status:"active"
  };
  message = "";  

  get fval() {
    return this.ngFormActivateCreditCard.controls;
    }

    public activate (){
      this.submitted = true;
      if (this.ngFormActivateCreditCard.invalid) {
        return;
        } 
      this._uw.creditcardToEdit.number=this.creditcard.number;
      this._uw.creditcardToEdit.cvv=this.creditcard.cvv;
      this._uw.creditcardToEdit.name=this.creditcard.name;
      this._uw.creditcardToEdit.caduca=this.creditcard.caduca;
      this._uw.creditcardToEdit.address=this.creditcard.address;
      let id = this._uw.creditcardToEdit.id;
      // this._uw.creditcardToEdit.fullProfile=false;
      this._uw.creditcardToEdit.status="complete";
      this._uw.alerts.push({
            type: "info",
            message: "Tarjeta asociada con exito"
        });
      this.dataApi.updateCreditcard(this._uw.creditcardToEdit,id)
        .subscribe(
           creditcard => this.router.navigate(['/admin/index'])
        );
    }

    public negative (){   
      let id = this._uw.creditcardToEdit.id;
      // this._uw.creditcardToEdit.fullProfile=false;
      this._uw.creditcardToEdit.status="negative";
      this._uw.alerts.push({
            type: "danger",
            message: "La solicitud de tajeta ha sido denegada"
        });
      this.dataApi.updateCreditcard(this._uw.creditcardToEdit,id)
        .subscribe(
           creditcard => this.router.navigate(['/admin/index'])
        );
    }

  onIsError(): void {
       
      this.isError = true;
      setTimeout(() => {
      this.isError = true;
        //this.isError = false;
      }, 4000);
    }

  ngOnInit(): void {
    this.ngFormActivateCreditCard = this.formBuilder.group({
      number: ['', [Validators.required]],
      name: ['', [Validators.required]],
      cvv: ['', [Validators.required]],
      caduca: ['', [Validators.required]],
      address: ['', [Validators.required]]
      });
  }

}
