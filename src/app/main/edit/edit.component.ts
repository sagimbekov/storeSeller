import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import {SellerService} from '../../services/seller.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  categories; 
  productId;
  productAdd = {
    name: null,
    category: null,
    weight: null,
    price: null,
    tags: null,
    content: null,
    seller: null,
    available: null
  }


	constructor(private route: ActivatedRoute,
            public app: SellerService) {
  }


  ngOnInit() {
    this.app.getCategories().subscribe(res =>{
       this.categories = res;
    })
    this.productId = this.route.snapshot.params['id'];
    this.app.getProduct(this.productId).subscribe(res=>{
      this.productAdd = res;
     })
	}

  changeProduct(){
    this.app.changeProduct(this.productAdd).subscribe(res => {
      // console.log(res)
    })
  }

  deleteProduct(){
    this.app.deleteProduct(this.productId).subscribe(res => {
      console.log(res)
    })
  }

}