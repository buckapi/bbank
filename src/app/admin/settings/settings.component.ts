import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../data-api.service';
import { UserWService } from "../../user-w.service";
import { InfoInterface } from '../../models/info-interface'; 
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { isError } from "util";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  ngFormSettingsUpdate: FormGroup;
  submitted = false;
  public waiting = true;

  constructor(
    public _uw:UserWService,
    public router: Router,
    private formBuilder: FormBuilder,
    public dataApi:DataApiService
  ) { }
    public isError = false;
    public isLogged =false;
    public info : InfoInterface;
    public getInfo(){
      this.dataApi.getInfo()
        .subscribe((info: InfoInterface) => (
          this.info=info[0],
          this.waiting=false
        ) 
      );
    }
 
    message = ""; 
    
    get fval() {
      return this.ngFormSettingsUpdate.controls;
    }

    onIsError(): void {
      this.isError = true;
      setTimeout(() => {
      this.isError = true;
      }, 4000);
    }

    activate(){
      let id = this.info.id;
      this.dataApi.settingsUpdate(this.info, id)
        .subscribe(
           info => this.router.navigate(['/admin/index']
        )
      );
    }
  ngOnInit(): void {
    this.getInfo();  
    this.ngFormSettingsUpdate = this.formBuilder.group({
      adminEmail: ['', [Validators.required]]
      });
  }
}
