import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import {SellerService} from '../services/seller.service';
import {User} from '../_models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	showL = true;
	public user: User;

	constructor(private route: ActivatedRoute,
	      		public app: SellerService,
	      		public router: Router,
	      		) {
		this.user = new User;
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
  			if(res){
  				this.router.navigate(['/main']);
  			}
  		})
  	}
}