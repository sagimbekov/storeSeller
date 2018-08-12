import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import {SellerService} from '../services/seller.service';
import {User} from '../_models/user.model';
import { Ng4AlertService } from 'ng4-alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	showL = true;
	public user: User;

	options = {
        text:"Success !",
        type:"fail",
        autoDismis:true,
        timeout:4000
    }

	constructor(private route: ActivatedRoute,
	      		public app: SellerService,
	      		public router: Router,
	      		private ng4:Ng4AlertService
	      		) {
		this.user = new User;
	}

	ngOnInit() {
	}

	activate(){
        this.ng4.ng4Activate(this.options);
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
  		}, error => {
  			if(error.non_field_errors[0].message){
  				this.options.text = error.non_field_errors[0].message;
  				this.activate();
  			}
  		})
  	}
}