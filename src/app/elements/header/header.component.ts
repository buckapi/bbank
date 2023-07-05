import { Component, OnInit } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {UserWService} from '../../user-w.service';
import { AuthService } from '../../auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	
	toggleChat: boolean = true;
	toggleSingle: boolean = true;
	
	constructor(
public _uw:UserWService,
   public router: Router,
    private authService: AuthService,
     private location: Location
		) { }
	
	ngOnInit(): void {
		if(this._uw.email==undefined){
    this.router.navigate(['/page-login']);
		}
	}
	
	 onlogoutUser():void{
    this.authService.logoutUser();
    this._uw.isLogged=false;
    this.router.navigate(['/page-login']);
  }
	togglechatbar() {
		this.toggleChat = !this.toggleChat;
	}
	singleChatWindow() {
		this.toggleSingle = !this.toggleSingle;
	}

}
