import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { trigger, transition, style, animate } from "@angular/animations";
import { Product, ColorFilter, TagFilter } from '../../../../shared/classes/product';
import { ProductsService } from '../../../../shared/services/products.service';
import * as _ from 'lodash'
import * as $ from 'jquery';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { url_text, token_text, first_api, productlisting, a_token } from '../../../../variables';

var url_code = url_text
var base_url = productlisting
var token = token_text
var check_account = first_api
var authtoken = a_token

@Component({
  selector: 'app-collection-left-sidebar',
  templateUrl: './collection-left-sidebar.component.html',
  styleUrls: ['./collection-left-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [  // angular animation
    trigger('Animation', [
      transition('* => fadeOut', [
        style({ opacity: 0.1 }),
        animate(1000, style({ opacity: 0.1 }))
      ]),
      transition('* => fadeIn', [
         style({ opacity: 0.1 }),
         animate(1000, style({ opacity: 0.1 }))
      ])
    ])
  ]
})
export class CollectionLeftSidebarComponent implements OnInit {

  public products     :   Product[] = [];
  public items        :   Product[] = [];
  public allItems     :   Product[] = [];
  //public colorFilters :   ColorFilter[] = [];
  public fabricFilters  :   any[] = [];
  public sizeFilters  :   any[] = [];
  public categoryFilters  :   any[] = [];
  public tags         :   any[] = [];
  public sizes         :   any[] = [];
  public compress         :   any[] = [];
  public colors       :   any[] = [];
  public sortByOrder  :   string = '';   // sorting
  public animation    :   any;   // Animation
  
  
  public filter_category;
  public filter_size;
 
  lastKey = ''      // key to offset next query from
  finished = false  // boolean when end of data is reached
   public checkedTagsArray: any[] = [];
   public checkedsizeArray: any[] = [];
  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router,
    private productsService: ProductsService) { 
/*         this.route.params.subscribe(params => {
          const category = params['category'];
          this.productsService.getProductByCategory(category).subscribe(products => {
             this.allItems = products  // all products
             this.products = products.slice(0,8)
             this.getTags(products)
             this.getColors(products)
          })
       });  */
	   
	   this.filter_category = JSON.parse(localStorage.getItem("checkedcategory"));
	   this.filter_size = JSON.parse(localStorage.getItem("checkedsize"));
	  
  }

  ngOnInit() {  
  	
	
         //this.productsService.getProducts().subscribe(product => this.products = product);
		this.checkAPIFirst_sidebar(); 
  }
 		displaydata(data) {
		  this.products = data;
		  this.items = data;
		  this.getFabric(data);
		  this.getSize(data);
		  this.getCompressionlevel(data);
		}	

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
			//console.log(fiterdata, 'datadatadatadata	');
			//var fiterdata = data['products'];
			this.displaydata(data['products']);
			//dataarry.push(data);
		});
		
	} 

  // Get current product Fabric
  public getFabric(products) {
     var uniqueBrands = []
     var itemBrand = Array();
	 console.log(products, 'productsproductsproductsproducts');
     products.map((product, index) => {   
	 //console.log(product, 'successsuccesssuccesssuccesssuccess');
        if(product.Collection) {
			// Check if a value exists in the fruits array
			if(uniqueBrands.indexOf(product.Collection) !== -1){
				//alert("Value exists!")
				
			} else{
				uniqueBrands.push(product.Collection);
			}
			
		}
     });
	 
	 
	for (var i = 0; i < uniqueBrands.length; i++) {
         itemBrand.push({brand:uniqueBrands[i]})
     } 
     this.tags = itemBrand
  }
  public getCompressionlevel(products)
  {
	    var uniqueCompress = []
     var itemBrand = Array();
	 //console.log(products, 'productsproductsproductsproducts');
     products.map((product, index) => {   
	 //console.log(product, 'successsuccesssuccesssuccesssuccess');
        if(product.Category) {
			// Check if a value exists in the fruits array
			if(uniqueCompress.indexOf(product.Category) !== -1){
				//alert("Value exists!")
				
			} else{
				uniqueCompress.push(product.Category);
			}
			
		}
     });

	for (var i = 0; i < uniqueCompress.length; i++) {
         itemBrand.push({brand:uniqueCompress[i]})
    } 
     this.compress = itemBrand  
	 //console.log(itemBrand, 'itemBrand');
  }
    checkedFilter(event){  
      let index = this.compress.indexOf(event.target.value);  // checked and unchecked value
	  console.log(index, 'checked and unchecked value');
       if (event.target.checked) {  
	   console.log(event.target.value);
           this.checkedTagsArray.push(event.target.value); // push in array cheked value
		   //$(".infinite-scrolling").show();
		    $(".collection-product-wrapper").load(".collection-product-wrapper");
	     console.log('push in array cheked value');
		}
        else 
		{
           this.checkedTagsArray.splice(index,1);  // removed in array unchecked value   
		    //console.log('removed in array unchecked value');
		}	
			var checkedarray = this.checkedTagsArray;
			console.log(this.checkedTagsArray, 'this.checkedTagsArray');
			localStorage.removeItem('checkeddata');
			localStorage.removeItem('checkedsize');
			var locat = localStorage.setItem("checkedcategory", JSON.stringify(checkedarray));
   
	}
		checkedFilters(event){  
		let index = this.sizes.indexOf(event.target.value);  // checked and unchecked value
		console.log(index, 'checked and unchecked value');
		if (event.target.checked) {  
		console.log(event.target.value);
			this.checkedsizeArray.push(event.target.value); // push in array cheked value
		   //$(".infinite-scrolling").show();
		    $(".collection-product-wrapper").load(".collection-product-wrapper");
			console.log('push in array cheked value');
		}
        else 
		{
           this.checkedsizeArray.splice(index,1);  // removed in array unchecked value   

		}	
			var checkedarray = this.checkedsizeArray;
			console.log(this.checkedsizeArray, 'this.checkedsizeArray');
			localStorage.removeItem('checkeddata');
			localStorage.removeItem('checkedcategory');
			var locat = localStorage.setItem("checkedsize", JSON.stringify(checkedarray));
   
  }
  
  //Get Currnt product Size
	public getSize(products){
		var uniqueSize = []
		var itemSize = Array();
		products.map((product, index) => {
			if(product.size_ranges) {
				var check_filters = product.size_ranges;
				for(var j=0 ;j< check_filters.length; j++  ){
					var k = check_filters[j];
					const index = uniqueSize.indexOf(k);
					if(index === -1)  uniqueSize.push(k);
				}
			}
		});
		for (var i = 0; i < uniqueSize.length; i++) {
			itemSize.push({size:uniqueSize[i]})
		}       
		 this.sizes = itemSize 
 
	}
    //Get Currnt product Size
/* 	public getSize(products){
		var itemBrand = Array();
		var count = 0;
		var products_count = products.length;
		for(var i=0 ;i<= products_count; i++  ){
			var check_product = products[i];
			var check_filters = check_product.size_ranges;
			if(check_product.size_ranges)
			{
				const check_productArray = Object.keys(check_filters).map(i => check_filters[i]);
				console.log(check_productArray, 'check_productArray');
				for(var j=0 ;j<= check_filters.length; j++  ){
					var check_string = check_filters[j];
					console.log(check_string, 'check_string');
					if(check_productArray.indexOf(check_string) !== -1)
					{  
						console.log(check_filters, 'check_string')
					} 
				}
/* 				for (var i = 0; i < check_string.length; i++) {
					itemBrand.push({brand:check_string[i]})
				} */ 
				//console.log(itemBrand, 'itemBrand');


			//}  

		//}
	//} */
   
  // Animation Effect fadeIn
  public fadeIn() {
      this.animation = 'fadeIn';
  }

  // Animation Effect fadeOut
  public fadeOut() {
      this.animation = 'fadeOut';
  }

 
  // Initialize filetr Items
  public filterItems(): Product[] {
      return this.products.filter((item: Product) => {
		 // console.log(item.Collection, 'fabric data !!!!!');    
/*           const Colors: boolean = this.colorFilters.reduce((prev, curr) => { // Match Color
            if(item.colors){
              if (item.colors.includes(curr.color)) {
                return prev && true;
              } 
            }
          }, true); */
          const Tags: boolean = this.fabricFilters.reduce((prev, curr) => { // Match Tags
			console.log(prev, 'prevprevprev');
             if(item.collection) {
				console.log(item, 'ssssssssssssssss')
              if (item.collection.includes(curr)) {
                return prev && true;
              } 
            } 
          }, true);
          return Tags; // return true
		  console.log(Tags, 'TagsTagsTagsTags')
      });
  } 
  
  // Update tags filter
   public updateFabricFilters(tags: any[]) {
	   //console.log('updateFabricFilters');
      this.fabricFilters = tags;
      this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
	} 
	
  // Update Size filters
     public updateSizeFilters(sizes: any[]) {
	   //console.log('updateFabricFilters');
      this.sizeFilters = sizes;
      this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
	} 
	
	// Update category filters
     public updateCategoryFilters(compress: any[]) {
	   //console.log('updateFabricFilters');
      this.categoryFilters = compress;
      this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
	} 
	

/*   // Update color filter  
  public updateColorFilters(colors: ColorFilter[]) {
      this.colorFilters = colors;
      this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  } */
  
  // Update price filter
   public updatePriceFilters(price: any) {
      let items: any[] = [];
	  //console.log(products, 'productsproduc');
      this.products.filter((item: Product) => {
		  //console.log(item.price, 'itemitemitemitemitemmmmmmmm');
          if (item.price >= price[0] && item.price <= price[1] )  {            
             items.push(item); // push in array
			  //console.log(item, 'kkkkkkkkkkkkkkkkkkkk')
          }   
      });
      this.items = items;
	 
  }

  public twoCol() {
    if ($('.product-wrapper-grid').hasClass("list-view")) {} else {
      $(".product-wrapper-grid").children().children().children().removeClass();
      $(".product-wrapper-grid").children().children().children().addClass("col-lg-6");
    }
  }

  public threeCol() {
    if ($('.product-wrapper-grid').hasClass("list-view")) {} else {
      $(".product-wrapper-grid").children().children().children().removeClass();
      $(".product-wrapper-grid").children().children().children().addClass("col-lg-4");
    }
  }

  public fourCol() {
    if ($('.product-wrapper-grid').hasClass("list-view")) {} else {
      $(".product-wrapper-grid").children().children().children().removeClass();
      $(".product-wrapper-grid").children().children().children().addClass("col-lg-3");
    }
  }

  public sixCol() {
    if ($('.product-wrapper-grid').hasClass("list-view")) {} else {
      $(".product-wrapper-grid").children().children().children().removeClass();
      $(".product-wrapper-grid").children().children().children().addClass("col-lg-2");
    }
  }

  // For mobile filter view
  public mobileFilter() {
    $('.collection-filter').css("left", "-15px");
  }

  // Infinite scroll
  public onScroll() {
      this.lastKey = _.last(this.allItems)['id'];
      if (this.lastKey != _.last(this.items)['id']) {
         this.finished = false
      }   
      // If data is identical, stop making queries
      if (this.lastKey == _.last(this.items)['id']) {
         this.finished = true
      }
      if(this.products.length < this.allItems.length){  
         let len = this.products.length;
         for(var i = len; i < len+4; i++){
           if(this.allItems[i] == undefined) return true
             this.products.push(this.allItems[i]);
         }
      }
  }
  
  // sorting type ASC / DESC / A-Z / Z-A etc.
  public onChangeSorting(val) {
     this.sortByOrder = val;
     this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }
  
  /************get custom products*******************/


}
