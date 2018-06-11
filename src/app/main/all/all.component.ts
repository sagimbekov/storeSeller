import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import {SellerService} from '../../services/seller.service';
import {Product} from '../../_models/product.model';


@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  public allProducts: Product;
	constructor(private route: ActivatedRoute,
            public app: SellerService) {
  }

  ngOnInit() {
     this.app.getProductsList().subscribe(res=>{
       this.allProducts = res;
     })
	}

}