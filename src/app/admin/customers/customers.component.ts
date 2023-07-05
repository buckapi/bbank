import { Component, OnInit } from '@angular/core';
// import { UsercardInterface } from '../../models/usercard-interface'; 
import { DataApiService } from '../../data-api.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
public waiting = true;
// public cards:UsercardInterface;
  constructor(
public dataApi:DataApiService
    ) { }

 ngOnInit(): void {
    // this.getActiveCards();
  }
    // getActiveCards(){
    //     this.dataApi.getActiveCardsReturn().subscribe((res:any) => {
    //   if (res[0] === undefined){
    //     console.log("hey");
    //    }else{
    //     this.cards=res;            
    //     }
    //  });  
    // }
  
  checkUncheckAll(event) {
     var checkboxes = document.getElementsByTagName('input');
     if (event.target.checked) {
         for (var i = 0; i < checkboxes.length; i++) {
             if (checkboxes[i].type == 'checkbox') {
                 checkboxes[i].checked = true;
             }
         }
     } else {
         for (var i = 0; i < checkboxes.length; i++) {
             // console.log(i)
             if (checkboxes[i].type == 'checkbox') {
                 checkboxes[i].checked = false;
             }
         }
     }
 }
  
  
  

}
