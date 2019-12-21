import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ReplacePipe } from '../../../replace.pipe';
import { url_text, token_text, first_api, productlisting, a_token, currency_symbol } from '../../../variables';
import { ActivatedRoute, Router} from '@angular/router';

var url_code = url_text
var base_url = productlisting
var token = token_text
var check_account = first_api
var authtoken = a_token
//var testhtml;

@Component({
  selector: 'app-product-page-kbiz-new',
  templateUrl: './product-page-kbiz-new.component.html',
  styleUrls: ['./product-page-kbiz-new.component.scss']
})
export class ProductPageKbizNewComponent implements OnInit {
	httpdata;
	products;
	tags;
	tagsd;
	tagsf;

	public data_cs: string ; 
	public user_url = url_text;
	public curr_symbol = currency_symbol;
	
	//private productsObservable : Observable<any[]> ; 

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {

	  var check_login_first = localStorage.getItem("isLoggedIn");
	  
	  
	  if(check_login_first==="true"){
		  console.log('login succ');
	  } else{
		  console.log(base_url);
		  this.router.navigate([url_code+'/pages/login']);
	  }
	  
	  this.checkAPIFirst();
  }
  displaydata(data) {this.httpdata = data;
	this.checkdatasave(data);
  }
  checkdata(data){this.products = data;
	//this.checkdatasave(data);
  }
  //filtersdata(product){this.filterss = data;}
  
    public checkAPIFirst(){
		console.log("chk api fir");
		let data= {"request":{
			"name": url_code
			},
			  "header":{
				"token":token
			  }	
			}
			this.httpClient.post(check_account,data).subscribe(data  => {
				
				if(data["name"]==url_code){
					this.getCustomProducts(data["api_token"]);
				} else{
					$(".invalid_request").show();
				}
			});
	}
   
	public getCustomProducts(api){

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
			//console.log(data['products'], 'datannnnnnnnnnn');
			this.checkdata(data['products']);
			var check_login = localStorage.getItem("isLoggedIn");
			
			var respro = data['products'];
			
			var for_already = [];
			for(var e=0; e<respro.length; e++){
				var vari = respro[e].varient;
				var webtitvari = respro[e]["Web Title"];
				var web_price = respro[e]["Price"];
				var web_retailprice = respro[e]["Retails Price"];
				var web_productid = respro[e]["Product ID"];
				var web_images = respro[e]["Images"];
				var web_collection = respro[e]["Collection"];
				var web_category = respro[e]["Category"];
				var web_size_ranges = respro[e]["size_ranges"];
				//console.log(web_size_ranges, 'web_size_ranges');
/*  				var final_size_fiter = [];
				for(var j=0; j<respro.length; j++){
					var size_vari = web_size_ranges;
					final_size_fiter.push(size_vari);
					//console.log(size_vari, 'size_vari');
				} 
				console.log(final_size_fiter, 'final_size_fiter'); */
				var lookup = {};
				var result = [];
				for(var k=0; k<vari.length; k++){
					var vari_color = vari[k].attr_2;
					//console.log(vari_color);
					if (!(vari_color in lookup)) {
						lookup[vari_color] = 1;
						result.push({"color":vari_color});
					}
				}
				for_already.push({ 'total_colors':result,"Images":web_images ,"web_title": webtitvari,"price":web_price,"retail_price":web_retailprice, "product_id":web_productid, 'collection': web_collection, 'category' : web_category, 'sizes': web_size_ranges});	
				
			} 
			
			if(check_login=="true") {
				$(".product-infinitescroll").hide();
				this.displaydata(for_already);
				//console.log("fff777");
				//$(".purp_grey + .purp_grey").remove();
			} else {
				//console.log("fff");
				$(".product-wrapper-grid").append("<p class='login_first'>Please Login first to view products.</p>");
				//this.router.navigate([base_url+'/pages/login']);
				$(".product-infinitescroll").hide();
			}
			console.log(for_already, 'for_alreadyfor_alreadyfor_already');
		});
	}
	
	
	/*********Fabric filters************/
	//var filters_data;
	public checkdatasave(httpdata)
	{
		console.log("sad");
		var filterproduct= [];
		var filtercategory = [];
		var filtersize = [];
		console.log(httpdata, 'httpdata');
	
		var checked_data = JSON.parse(localStorage.getItem("checkeddata")); 
		var checked_dataa = JSON.parse(localStorage.getItem("checkedcategory"));
		var checked_size = JSON.parse(localStorage.getItem("checkedsize"));
		console.log(checked_data, 'checked_datachecked_data');
		console.log(checked_dataa, 'checked_dataachecked_dataaooo');
		console.log(checked_size, 'checked_sizechecked_sizechecked_size');
		
/* 		if((checked_data  != null) || (checked_dataa  != null)  || (checked_size  != null)) {
			$(".httpdata_classes").addClass("hidden");
		} */
		if(checked_dataa == null) {
			checked_dataa = [];
		}
		if(checked_data == null) {
			checked_data = [];
		}
		if(checked_size == null) {
			checked_size = [];
		}
//alert("Helklo ");		
		//console.log(checked_dataa, 'checked_dataa')
		 
			//console.log(checked_data, 'checked_data');
			var count = 0;
			var products_count = httpdata.length;
			for(var i=0 ;i<= products_count; i++  ){
					var check_product = httpdata[i];
					//console.log(httpdata[i], 'check_product');
					if(check_product){
					const check_productArray = Object.keys(check_product).map(i => check_product[i]);
					//console.log(check_productArray, 'check_productArray');
					
					for(var j=0 ;j<= checked_dataa.length; j++  ){
						var check_string = checked_dataa[j];
						//console.log(check_string, 'check_string');
							if(check_productArray.indexOf(check_string) != -1)
							{  
							  filtercategory.push(check_product);
							  //console.log(j, 'found');
							}
					}
					for(var j=0 ;j<= checked_data.length; j++  ){
						var check_string = checked_data[j];
						console.log(check_string, 'check_string');
							if(check_productArray.indexOf(check_string) != -1)
							{  
							  filterproduct.push(check_product);
							  //console.log(j, 'found');
							}
					}

						console.log(check_product.sizes, 'check_productArray');	
					const check_sizeArray = Object.keys(check_product.sizes).map(i => check_product.sizes[i]);
					for(var j=0 ;j<= checked_size.length; j++  ){
						var check_string = checked_size[j];
						//console.log(check_string, 'check_string');
							if(check_sizeArray.indexOf(check_string) != -1)
							{  
							  filtersize.push(check_product);
							  //console.log(j, 'found');
							}
					}

					
				}
	
			}
/* 			console.log(filterproduct, 'filterproduct');
			console.log(filtercategory, 'filtercategory');
			console.log(filtersize, 'filtersize');
			 this.tags = filterproduct
			 this.tagsd = filtercategory
			 this.tagsf = filtersize */
			 if(filterproduct){
				this.tags = filterproduct; 
			 }else if(filtercategory){
				this.tags = filtercategory;
			 }else{
				this.tags = filtersize; 
			 }
			 
			 //console.log(this.tags, 'dddddddddddd');
	}   
	/***************************************/	
}
