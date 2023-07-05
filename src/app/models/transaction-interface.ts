export interface TransactionInterface {
	id?:string;
	userId?:string;
	type?:string;
	beneficiaryId?:string;
	remitId?:string;
	ammount?:number;
	status?:string;
	email?:string;
	remitEmail?:string;
	receptEmail?:string;
	ref?:string;

}