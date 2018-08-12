import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import {SellerService} from '../../services/seller.service';
import {Http, Headers, Response, RequestOptions, ResponseContentType} from '@angular/http';
import {Subject, Observable, Subscription} from 'rxjs/Rx';

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
    available: null,
    attributes: [],
    images: []
  }

  selectedParent;
  selectedChild;
  attributes;

  imgsSrc = [];

	constructor(private route: ActivatedRoute,
            public app: SellerService,
            public router: Router,
             private http: Http,) {
  }


  ngOnInit() {
    this.app.getCategories().subscribe(res =>{
       this.categories = res;
    })
    this.productId = this.route.snapshot.params['id'];
    this.app.getProduct(this.productId).subscribe(res=>{
      this.productAdd = res;

      for(let img of this.productAdd.images){
          this.imgsSrc.push({'fileName': img.id, url : img.image})
      }

      this.app.getCategoriesById(res.category.id).subscribe(res => {
        this.attributes = res.attributes;
      })
     })
	}

  toggleAttr(id){
    var index = this.productAdd.attributes.indexOf(id);
    if(index === -1){
      this.productAdd.attributes.push(id);
    }else{
      this.productAdd.attributes.splice(index,1);
    }
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

  fileChange(event) {
      let fileList: FileList = event.target.files;
      if(fileList.length > 0) {
          let file: File = fileList[0];
          let formData:FormData = new FormData();
          formData.append('image', file, file.name);
          let headers = new Headers();
          /** No need to include Content-Type in Angular 4 */
          // {'Auth-Token': this.auth.getToken()}
          headers.append('Authorization', "SellerToken " + this.app.getToken());
          headers.append('Accept', 'application/json');
          let options = new RequestOptions({ headers: headers });
          this.http.post(`https://api.khorex.kz/store/products/` + this.productId +  '/upload/' , formData, options)
              .map(res => res.json())
              .catch(error => Observable.throw(error))
              .subscribe(
                  data => console.log('success'),
                  error => console.log(error)
              )
      }
  }


}