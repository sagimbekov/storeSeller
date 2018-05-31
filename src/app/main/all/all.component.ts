import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import {SellerService} from '../../services/seller.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  allProducts;

	constructor(private route: ActivatedRoute,
            public app: SellerService) {
  }

	ngOnInit() {
   this.app.getProductsList().subscribe(res=>{
     this.allProducts = res;
   })
	}

}