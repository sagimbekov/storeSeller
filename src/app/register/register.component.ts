import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import {SellerService} from '../services/seller.service';
import { Ng4AlertService } from 'ng4-alert';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	user = {
		email: '', password: '', name: '', code: '789'
	};

	errors = {
		email: '',
		password: '',
		name: ''
	}

	options = {
        text:"Success !",
        type:"fail",
        autoDismis:true,
        timeout:4000
    }

    objectKeys = Object.keys;

	constructor(private route: ActivatedRoute,
	      		public app: SellerService,
	      		public router: Router,
	      		private ng4:Ng4AlertService) {
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
		    }, error => {
		    	for(let key of this.objectKeys(error)){
		    		this.errors[key] = error[key];
		    	}
		    })
		}else{
	    	  
  		}
	}

	activate(){
        this.ng4.ng4Activate(this.options);
    }
}