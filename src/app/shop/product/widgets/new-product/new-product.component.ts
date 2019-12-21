import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../../shared/classes/product';
import { ProductsService } from '../../../../shared/services/products.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { url_text, token_text, first_api, productlisting, a_token } from '../../../../variables';

var url_code = url_text
var base_url = productlisting
var token = token_text
var check_account = first_api
var authtoken = a_token

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  
  public products : Product[] = [];	
	
  constructor(private httpClient: HttpClient, private productsService: ProductsService) { }

  ngOnInit() {
  	this.productsService.getProducts().subscribe(product => this.products = product);
	this.checkAPIFirst_sidebar();
  }
  displaydata(data) {this.products = data;}
  
	public checkAPIFirst_sidebar(){
		//console.log(this.final_url);
		console.log("chk api fir");
		let data= {"request":{
			"name": url_code
			},
			  "header":{
				"token":token
			  }	
			}
			this.httpClient.post(check_account,data).subscribe(data  => {
				//this.data = data.name;
				
				console.log(data["api_token"])
				if(data["name"]==url_code){
					this.getCustomProducts_sidebar(data["api_token"]);
					//this.startFirstLogin(email,password,data.api_token);
				} else{
					$(".invalid_request").show();
				}
			});
	}
  
	public getCustomProducts_sidebar(api){

		let data= {
			"request":{
			},
				"header":{
				"token":token,
				"apiToken":api,
				"authToken":authtoken
			}
		}

		this.httpClient.post(base_url,data).subscribe(data  => {
			//console.log(data['products'], 'ffffffffffffffffffffffffffff');
			this.displaydata(data['products'])
		});
	}

}
