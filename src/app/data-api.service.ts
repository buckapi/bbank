import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { EmailmInterface } from './models/emailm-interface';
import { UserWService } from "./user-w.service";
import { InfoInterface } from './models/info-interface';
import { CreditcardInterface } from './models/creditcard-interface';
import { AccountInterface } from './models/account-interface';
import { TransactionInterface } from './models/transaction-interface';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {	

	emailm: Observable<any>;
	transaction: Observable<any>;
	transactions: Observable<any>;
	usercards: Observable<any>;
	creditcards: Observable<any>;
	creditcard: Observable<any>;
	accounts: Observable<any>;
	account: Observable<any>;
	info: Observable<any>;
  constructor(
  	public _uw:UserWService,
  	private http: HttpClient, 
  	private authService:AuthService
  	) {} 
  	headers : HttpHeaders = new HttpHeaders({
  		"Content-Type":"application/json"
  		});


  getTotalTransactions(userId: string){
  		let indice = userId;
  		const url_api =  "https://db.bbevolutionbank.com:3025/api/transaction?filter[where][userId]=p"+indice;
		return (this.transactions = this.http.get(url_api));
	}
	getInfo(){
		const url_api=`https://db.bbevolutionbank.com:3025/api/infos/`;
		this.info = this.http.get(url_api);
		return (this.info);
	}
	getNewCreditcardsReturn(){
		const url_api = 'https://db.bbevolutionbank.com:3025/api/creditcard?filter[where][status]=new';
		return (this.creditcards = this.http.get(url_api));
	}
	getActiveCreditcardsReturn(){
		const url_api = 'https://db.bbevolutionbank.com:3025/api/creditcard?filter[where][status]=complete';
		return (this.creditcards = this.http.get(url_api));
	}	
	getActiveAccountsReturn(){
		const url_api = 'https://db.bbevolutionbank.com:3025/api/account?filter[where][status]=active';
		return (this.accounts = this.http.get(url_api));
	}	
	getTransationsReturn(){
		const url_api = 'https://db.bbevolutionbank.com:3025/api/transaction';
		return (this.transactions = this.http.get(url_api));
	}	
	getNewAccountsReturn(){
		const url_api = 'https://db.bbevolutionbank.com:3025/api/account?filter[where][status]=new';
		return (this.accounts = this.http.get(url_api));
	}	
	sendMailNewCustomer(emailm){
		const url_api='https://zqqvy9pk23.execute-api.us-east-1.amazonaws.com/production/newcustomer';
		return this.http
		.post(url_api, emailm)
		.pipe(map(data => data));
	}
	saveAccount(account :AccountInterface){
		const url_api='https://db.bbevolutionbank.com:3025/api/account';
		return this.http
		.post<AccountInterface>(url_api, account)
		.pipe(map(data => data));
	}
	newCreditcard(creditcard :CreditcardInterface){
		const url_api='https://db.bbevolutionbank.com:3025/api/creditcard';
		return this.http
		.post<CreditcardInterface>(url_api, creditcard)
		.pipe(map(data => data));
	}
	updateAccount(account :AccountInterface, id: string){
		const url_api=`https://db.bbevolutionbank.com:3025/api/account/${id}`;
		return this.http
		.put<AccountInterface>(url_api, account)
		.pipe(map(data => data));
	}
	updateCreditcard(creditcard :CreditcardInterface, id: string){
		const url_api=`https://db.bbevolutionbank.com:3025/api/creditcard/${id}`;
		return this.http
		.put<CreditcardInterface>(url_api, creditcard)
		.pipe(map(data => data));
	}
	updateTransaction(transaction :TransactionInterface, id: string){
		const url_api=`https://db.bbevolutionbank.com:3025/api/transaction/${id}`;
		return this.http
		.put<TransactionInterface>(url_api, transaction)
		.pipe(map(data => data));
	}
	getAccountByUserd2(userId: string){
		let indice = userId;
		const url_api =  "https://db.bbevolutionbank.com:3025/api/account?filter[where][userId]=p"+indice;
		this.account = this.http.get(url_api);
		return (this.account);
	}
	getAccountByUserID(userId: string){
		let indice = userId;
		const url_api =  "https://db.bbevolutionbank.com:3025/api/account?filter[where][userId]="+indice;
		this.account = this.http.get(url_api);
		return (this.account);
	}
	settingsUpdate(info :InfoInterface, id: string){
		// let token = this.authService.getToken();
		const url_api=`https://db.bbevolutionbank.com:3025/api/infos/${id}`;
		return this.http
		.put<InfoInterface>(url_api, info)
		.pipe(map(data => data));
	}
	saveTransaction(transaction :TransactionInterface){
		const url_api='https://db.bbevolutionbank.com:3025/api/transaction';
		return this.http
		.post<TransactionInterface>(url_api, transaction)
		.pipe(map(data => data));
	}
	getTransactionsByUserId(userId: string){
		let indice = userId;
		const url_api =  "https://db.bbevolutionbank.com:3025/api/transaction?filter[where][userId]=p"+indice;
		this.transaction = this.http.get(url_api);
		return (this.transaction);
	}
	getCreditcardsByUserId(userId: string){
		let indice = userId;
		const url_api =  "https://db.bbevolutionbank.com:3025/api/creditcard?filter[where][userId]=p"+indice;
		this.creditcard = this.http.get(url_api);
		return (this.creditcard);
	}
	getAccountByEmail(userEmail: string){
		let email = userEmail;
		const url_api =  "https://db.bbevolutionbank.com:3025/api/account?filter[where][email]="+email;
		this.account = this.http.get(url_api);
		return (this.account);
	}
}