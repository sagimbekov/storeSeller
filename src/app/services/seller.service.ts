import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../_models/user.model';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SellerService {

	API_URL = 'http://139.59.155.219:8000';

	constructor(private http: Http,
              	private httpClient: HttpClient) {
  	}

  	register(user: any): Observable<any> {
	    const headers = new Headers();
    	headers.append('Content-Type', 'application/json');
	    return this.http
	      	.post(this.API_URL+'/cabinet/sellers/', user, 
	        	{headers: headers})
	      	.map(res => {
	      		const resp = res.json();
	        	if (resp.data.token && resp.data.user) {
		          window.localStorage.setItem('auth_key', resp.data.token);
		          window.localStorage.setItem('user', JSON.stringify(resp.data.user));
		        }
		        return resp;
	      	})
	      	.catch(this.handleError);
	}

	authenticate(user: User): Observable<User[]> {
	    const headers = new Headers();
    	headers.append('Content-Type', 'application/json');
	    return this.http
	      	.post(this.API_URL+'/cabinet/sellers/authenticate/', user, 
	        	{headers: headers})
	      	.map((res: Response) => {
	      		const resp = res.json();
	        	if (resp.data.token && resp.data.user) {
		          window.localStorage.setItem('auth_key', resp.data.token);
		          window.localStorage.setItem('user', JSON.stringify(resp.data.user));
		        }
		        return resp;
	      	})
	      	.catch(this.handleError);
	}

	changePassword(oldPassword, newPassword): Observable<any> {
	    const headers = new Headers();
    	headers.append('Content-Type', 'application/json');
    	headers.append('Authorization', "SellerToken " + this.getToken());
	    return this.http
	      	.post(this.API_URL+'/cabinet/sellers/set_password/', {old_password:oldPassword , new_password:newPassword }, 
	        	{headers: headers})
	      	.map(res => {
	      		return res;
	      	})
	      	.catch(this.handleError);
	}

	
	getProfile(): Observable<any> {
	    const headers = new Headers();
    	headers.append('Content-Type', 'application/json');
    	headers.append('Authorization', "SellerToken " + this.getToken());
	    return this.http
	      	.get(this.API_URL+'/cabinet/sellers/'+this.getUser().id, 
	        	{headers: headers})
	      	.map(res => {
	      		return res.json().data;
	      	})
	      	.catch(this.handleError);
	}

	getProductsList():Observable<any>{
	 	const headers = new Headers();
    		  headers.append('Content-Type', 'application/json');
    		  headers.append('Authorization', "SellerToken " + this.getToken());
	    return this.http
	      	.get(this.API_URL+'/store/products/?seller='+this.getUser().id, 
	        	{headers: headers})
	      	.map(res => {
	      		return res.json().data;
	      	})
	      	.catch(this.handleError);
	}

	getProduct(id):Observable<any>{
	 	const headers = new Headers();
    		  headers.append('Content-Type', 'application/json');
    		  headers.append('Authorization', "SellerToken " + this.getToken());
	    return this.http
	      	.get(this.API_URL+'/store/products/' + id, 
	        	{headers: headers})
	      	.map(res => {
	      		return res.json().data;
	      	})
	      	.catch(this.handleError);
	}

	getCategories():Observable<any>{
	 	const headers = new Headers();
    		  headers.append('Content-Type', 'application/json');
    		  headers.append('Authorization', "SellerToken " + this.getToken());
	    return this.http
	      	.get(this.API_URL+'/store/categories/', 
	        	{headers: headers})
	      	.map(res => {
	      		return res.json().data;
	      	})
	      	.catch(this.handleError);
	}

	getOrderedItems():Observable<any>{
	 	const headers = new Headers();
    		  headers.append('Content-Type', 'application/json');
    		  headers.append('Authorization', "SellerToken " + this.getToken());
	    return this.http
	      	.get(this.API_URL+'/store/orders/seller/', 
	        	{headers: headers})
	      	.map(res => {
	      		return res.json().data;
	      	})
	      	.catch(this.handleError);
	}

	addProduct(product):Observable<any>{
	    const headers = new Headers();
	    	headers.append('Content-Type', 'application/json');
	    	headers.append('Authorization', "SellerToken " + this.getToken());
	    return this.http
	      	.post(this.API_URL+'/store/products/', product, 
	        	{headers: headers})
	      	.map(res => {
	      		return res.json().data;
	      	})
	      	.catch(this.handleError);
	}

	changeProduct(product):Observable<any>{
	    const headers = new Headers();
	    	headers.append('Content-Type', 'application/json');
	    	headers.append('Authorization', "SellerToken " + this.getToken());
	    return this.http
	      	.patch(this.API_URL+'/store/products/'+product.id, product, 
	        	{headers: headers})
	      	.map(res => {
	      		return res.json().data;
	      	})
	      	.catch(this.handleError);
	}

	deleteProduct(id):Observable<any>{
		const headers = new Headers();
	    	headers.append('Content-Type', 'application/json');
	    	headers.append('Authorization', "SellerToken " + this.getToken());
	    return this.http
	      	.delete(this.API_URL+'/store/products/'+id, 
	        	{headers: headers})
	      	.map(res => {
	      		return res.json().data;
	      	})
	      	.catch(this.handleError);
	}

	saveProfile(profile): Observable<any> {
	    const headers = new Headers();
    	headers.append('Content-Type', 'application/json');
    	headers.append('Authorization', "SellerToken " + this.getToken());
	    return this.http
	      	.patch(this.API_URL+'/cabinet/sellers/'+this.getUser().id, profile, 
	        	{headers: headers})
	      	.map(res => {
	      		const resp = res.json();
	      		window.localStorage.setItem('user', JSON.stringify(resp.data));
	      		return res;
	      	})
	      	.catch(this.handleError);
	}


	checkAuth() {
	    return window.localStorage.getItem('auth_key') && window.localStorage.getItem('user');
	}

	getUser(){
		const parsedUser = JSON.parse(window.localStorage.getItem('user'));
	    if (parsedUser) {
	      return parsedUser;
	    }
	    return null;
	}

	logout() {
	    window.localStorage.removeItem('auth_key');
	    window.localStorage.removeItem('user');
	    return true;
  	}


	getToken() {
	    if (window.localStorage.getItem('auth_key')) {
	      return window.localStorage.getItem('auth_key');
	    }
	    return null;
  	}


	private handleError(error: any): Promise<any> {
	    return Promise.reject(JSON.parse(error._body));
  	}



}