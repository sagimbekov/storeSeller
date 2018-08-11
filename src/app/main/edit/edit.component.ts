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

  selectedParent;
  selectedChild;


	constructor(private route: ActivatedRoute,
            public app: SellerService,
            public router: Router,) {
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

  onChange(id){
    this.app.getCategoriesById(id).subscribe(res => {
      this.selectedParent = res;
    })
  }

  onChangeParent(id){
    this.app.getCategoriesById(id).subscribe(res => {
      this.selectedChild = res;
    })
  }
  
  deleteProduct(){
    this.app.deleteProduct(this.productId).subscribe(res => {
      this.router.navigate(['/main']);
    })
  }

}