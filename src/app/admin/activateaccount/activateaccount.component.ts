import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../data-api.service';
import { UserWService } from "../../user-w.service";
import { AccountInterface } from '../../models/account-interface'; 
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { isError } from "util";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-activateaccount',
  templateUrl: './activateaccount.component.html',
  styleUrls: ['./activateaccount.component.css']
})
export class ActivateaccountComponent implements OnInit {
  ngFormActivateAccount: FormGroup;
  submitted = false;

  constructor(
    public _uw:UserWService,
    public router: Router,
    private formBuilder: FormBuilder,
    public dataApi:DataApiService
  ) { }
  public account : AccountInterface={
    naccount:"",
    status:"active"
  };
  public isError = false;
  public isLogged =false;
  message = "";  

  get fval() {
    return this.ngFormActivateAccount.controls;
    }

    public activate (){
      this.submitted = true;
      if (this.ngFormActivateAccount.invalid) {
        return;
        } 
      let id = this._uw.accountToEdit.id;
      // this._uw.accountToEdit.fullProfile=false;
      this._uw.accountToEdit.naccount=this.account.naccount;
      this._uw.accountToEdit.status="active";
      this._uw.accountToEdit.two=true;
      this._uw.accountToEdit.three=true;
      this._uw.accountToEdit.four=true;
      this._uw.accountToEdit.five=true;
      this._uw.alerts.push({
            type: "info",
            message: "Cuenta activada con exito"
        });
      this.dataApi.updateAccount(this._uw.accountToEdit,id)
        .subscribe(
           account => this.router.navigate(['/admin/index'])
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
    this.ngFormActivateAccount = this.formBuilder.group({
      naccount: ['', [Validators.required]]
      });
  }

}
