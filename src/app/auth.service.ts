import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse }  from '@angular/common/http';
import {  throwError } from 'rxjs';
import { Observable }  from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
//import { isNullOrUnderfined } from 'util';
import { isNullOrUndefined } from "util";
// import { AuthService } from './auth.service
import { UserInterface } from './models/user-interface';
import { UserWService } from "./user-w.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
  	private http: HttpClient,
 	public _uw:UserWService

  	) { }
 handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';

 			 if(error.status==401){
 			 	
             // this._uw.loginError=true;
             //   console.log("datos erroneos");
              }// console.log("fallo:" +errorMessage);
      

    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(error);
  }

	headers : HttpHeaders = new HttpHeaders({
		"Content-Type":"application/json"
		});

	registerUser(name :string, fullname :string, email: string, password: string, usertype: string, status: string){
		const url_api ='https://db.buckapi.us:9999/api/Users/';
		return this.http
		.post<UserInterface>(url_api,{name,fullname,email,password,usertype,status},{headers:this.headers})
		.pipe(map(data => data,error => error),catchError(this.handleError));
	}

	loginUser(email:string, password:string):Observable<any>{
		const url_api ='https://db.buckapi.us:9999/api/Users/login?include=user';
		return this.http
		.post<UserInterface>(url_api,{email,password},{headers:this.headers})
		.pipe(map(data => data,error => error),catchError(this.handleError));
	}

  	setUser(user:UserInterface):void{
  		let user_string = JSON.stringify(user);
  		localStorage.setItem("currentUser",user_string);
  	}	
  	setToken(token): void{
  		localStorage.setItem("accessToken",token);
  	}

	getToken(){
	 	return localStorage.getItem("accessToken");
	  }
	getCurrentUser(): UserInterface {
    let user_string = localStorage.getItem("currentUser");
	    if (!isNullOrUndefined(user_string)) {
		      let user: UserInterface = JSON.parse(user_string);
		      return user;
		    } else {
		      return null;
			}
  		}
	 logoutUser(){
	  	let accessToken = localStorage.getItem('accessToken');
		  	const url_api = 'https://db.buckapi.us:9999/api/users/logout?access_token=${accessToken}';
		   	localStorage.removeItem('accessToken');
		  	localStorage.removeItem('currentUser');
		  	return this.http.post<UserInterface>(url_api,{headers: this.headers});
	 	}
}
