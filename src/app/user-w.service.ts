import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserWService {
	admin:boolean=false;
	adminName:string;
	accountActive:any={};
	accountDestin:any={};
	accountForTransfer:any={};
	allLoaded:boolean=false;
	buttonDisabled:boolean=false;
	card:any={};
	accountToEdit:any={};
	creditcardToEdit:any={};
	transactionToEdit:any={};
	account:any={};
	usercard:any={};
	cardsResult:any[]=[];
	alerts:any[]=[];
	errorFormUpdateUsercard:boolean;
	file:any[]=[];st
	filter:boolean=false;
	foredit:any={};
	idCard:string;
	images:any[]=[];
	info:any={};
	isLogged:boolean=false;
	fullProfile:boolean=false;
	loginError:boolean=false;
	loaded:boolean=false;
	method:string;
	name:string;
	fullname:string;
	email:string;
	total:number=0;
	transactionsSize:number=0;
	type:string;
	usertype:string;
	user:any={};
	userActive:any={};
	userActiveId:string;
	transactionType:string;
	userId:string;
	userW:any={};
	appointmentUsercard:string;
  constructor() { }
}


