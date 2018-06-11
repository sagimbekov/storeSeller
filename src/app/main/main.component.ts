import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import {SellerService} from '../services/seller.service';
import {User} from '../_models/user.model'


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  mobNav = false;
  private user: User;

	constructor(private route: ActivatedRoute,
            private router: Router,
            public app: SellerService) {
    this.user = new User;
    this.user = this.app.getUser();
  }

	ngOnInit() {
    // this.app.getProfile().subscribe(res => {
    //   console.log(res)
    // })
	}

  logout(){
    this.app.logout();
    this.router.navigate(["/login"])
  }

}