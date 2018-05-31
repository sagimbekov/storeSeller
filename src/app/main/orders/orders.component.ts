import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import {SellerService} from '../../services/seller.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders;

	constructor(private route: ActivatedRoute,
            public app: SellerService) {
  }

	ngOnInit() {
   this.app.getOrderedItems().subscribe(res => {
     this.orders = res;
   })
	}

}