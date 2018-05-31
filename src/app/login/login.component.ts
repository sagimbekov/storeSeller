import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import {SellerService} from '../services/seller.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	user = {
		username: '', password: '',
	};
	showL = true;
	constructor(private route: ActivatedRoute,
	      		public app: SellerService,
	      		public router: Router) {
	}

	ngOnInit() {

	}

	onRegisterForm() {
	    this.app.register(this.user).subscribe(res => {
	    	console.log(res)
	    })
	      
  	}

  	onLoginForm(){
  		this.app.authenticate(this.user).subscribe(res => {
  			if(res.data.token){
  				this.router.navigate(['/main']);
  			}
  		})
  	}
}