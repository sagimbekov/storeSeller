import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import {SellerService} from '../../services/seller.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  categories;
  selectedParent;
  selectedChild;
  
  productAdd = {
    name: "",
    category: 0
  }

	constructor(private route: ActivatedRoute,
              private router: Router,
            public app: SellerService) {
  }

	ngOnInit() {
   this.app.getCategories().subscribe(res =>{
     this.categories = res;
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

  addProduct(){
    if(this.productAdd.name && this.productAdd.category !== 0){
      this.app.addProduct(this.productAdd).subscribe(res =>{
          console.log(res)
          this.router.navigate(['/main/edit/'+res.id]);
      })
    }
  }

}