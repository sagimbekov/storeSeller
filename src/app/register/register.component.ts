import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import {SellerService} from '../services/seller.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	user = {
		email: '', password: '', name: '', code: '789'
	};

	constructor(private route: ActivatedRoute,
	      		public app: SellerService,
	      		public router: Router) {
	}

	ngOnInit() {
		if(this.app.checkAuth()){
			this.router.navigate(['/main']);
		}
	}

	onRegisterForm() {
		if(this.user.code === "789"){
		    this.app.register(this.user).subscribe(res => {
		    	this.router.navigate(['/main']);
		    })
		}else{
	    	  
  		}
	}
}