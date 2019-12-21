import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/classes/product';
import { CartItem } from '../../../shared/classes/cart-item';
import { ProductsService } from '../../../shared/services/products.service';
import { CartService } from '../../../shared/services/cart.service';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router} from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { a_token, save_order, url_text, token_text, first_api, start_customer_login,currency_symbol } from '../../../variables';


var base_url = url_text
var token = token_text
var check_account = first_api
var authtoken = a_token
var save_ord = save_order

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
}) 

export class CartComponent implements OnInit {

  public cartItems          :   Observable<CartItem[]> = of([]);
  public shoppingCartItems  :   CartItem[] = [];
  public getTotalCartPrice:number = 0;
  public price_count:number = 0;
  
  public user_url = url_text;
  public curr_symbol = currency_symbol;
  
  constructor(private route: ActivatedRoute, private router: Router, private productsService: ProductsService,
    private cartService: CartService, private httpClient: HttpClient, private http: Http) { }

  ngOnInit() {
  	this.cartItems = this.cartService.getItems();
	var save_cart_items_total_cs = JSON.parse(localStorage.getItem("cartItem"));
	console.log("here");
	console.log(save_cart_items_total_cs);
	var ar = []; // empty array
	//var colorary = []; 
	var colorary = new Array()
	//var elementss = [];
	var sub_array = [];
    var super_array = [];

    this.cartItems.subscribe(shoppingCartItems => this.shoppingCartItems = save_cart_items_total_cs);
	var total:number = parseFloat(localStorage.getItem("totalPriceCustom"));
	console.log(total, 'totaltotaltotaltotaltotaltotal');
	this.getTotalCartPrice = total;
	var idd = JSON.parse(localStorage.getItem("cartItem"));
	var id =  idd[0]['prd_id'];
	//this.checkApiFIrst(id);
	
  }
 
  // Increase Product Quantity
  public increment(product: any, quantity: number = 1) {
    this.cartService.updateCartQuantity(product,quantity);
  }
  
  // Decrease Product Quantity
  public decrement(product: any, quantity: number = -1) {
    this.cartService.updateCartQuantity(product,quantity);
  }
  
  // Get Total
  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }
  
  // Remove cart items
  public removeItem(item: CartItem) {
    this.cartService.removeFromCart(item);
  }
  /*****remove item from cart custom******/
  public removeItemCustom(removeItemCustom){
	  
	if(confirm("Are you sure to delete "+name)) {
		
		var save_cart_items_total = JSON.parse(localStorage.getItem("cartItem"));
		var val = 1;
		var cart_pri = [];
		if(save_cart_items_total!=null){
			if(save_cart_items_total.length >= 1){
				for (var i = 0; i < save_cart_items_total.length; i++) {
					var cart_id_c = save_cart_items_total[i]['prd_id'];
					
					if(cart_id_c==removeItemCustom){
						/****item key to remove*****/
						val = i;
					}
				}
			}
		}
		/****calculate total****/
		var fpri:number = 0;
		var qtypri:number = 0;
		for(var k=0; k<1; k++){
			var fval = save_cart_items_total[val].products[0];
			var fval_length = save_cart_items_total[val].products[0];
			for(var finlop = 0; finlop<fval_length.length; finlop++){
				var rpid = fval_length[finlop].prd_id;
				var pri_rep = fval_length[finlop].price;
				var qty_rep = fval_length[finlop].custom_quantity;
				
				if(rpid==removeItemCustom){
					qtypri = qtypri+pri_rep
					//fpri = fpri+qtypri;					
				}
			}
		}

		var gettot: number = parseFloat(localStorage.getItem("totalPriceCustom"));
		console.log(qtypri, 'qtypriqtypriqtypriqtypri');
		var fin: number = gettot-qtypri;
		console.log(fin,'finfinfinfinfinfinfin');
		/****delete item from cart****/
		delete save_cart_items_total[val]
		
		var filtered = save_cart_items_total.filter(function (el) {
		  return el != null;
		});
		/****create localstorage again after remove from cart****/
		localStorage.setItem("cartItem", JSON.stringify(filtered));
		localStorage.setItem("totalPriceCustom", JSON.stringify(fin));
		console.log("sdfsdgggggggggggggggggggggggggg");
		 setTimeout(()=>{    //<<<---    using ()=> syntax
			window.location.href=this.user_url+'/cart';
		}, 500); 
	}
		
  }

showMsg: boolean = false;

 public checkorder(id){
	 
		//console.log(this.final_url);
		//console.log("chk api firttttttttssssssssss");
		let data= {"request":{
			"name": base_url
			},
			  "header":{
				"token":token
			  }	
			}
			this.httpClient.post(check_account,data).subscribe(data  => {
				//this.data = data.name;
				 //console.log("wewertttttttttt");
				//console.log(data["api_token"], 'pooja')
				if(data["name"]==base_url){
					this.saveorder(id,data["api_token"]);
					//this.startFirstLogin(email,password,data.api_token);
				} else{
					$(".invalid_request").show();
				}
			});
	}
	
	public saveorder(id,api){
		
		var cartitemm  =  JSON.parse(localStorage.getItem("cartItem"));
		var orderdataa = [];
		var orderdata; 
		var order; 		
		var finalsave;
			Object.keys(cartitemm).forEach(function(key) {
				
				
				console.log(cartitemm[key], 'hiiiiiiiiiiiiiiii');
				order = cartitemm[key]['products']["0"]["0"]["size_n"];
                var saveord_det = [];
				order.forEach(function(value, key) {
					finalsave = {
						n_size: order[key]['n_size'],
						color:order[key]['color'],
						qty: order[key]['qty'],
						sku_id: order[key]['sku']
					}
		
					saveord_det.push(finalsave);	

					//console.log(finalsave, 'finaldataaaaaaaaasssss'); 
				});

			console.log(order, 'finaldata'); 
				orderdata =  {
				Product_id: cartitemm[key]['prd_id'], 
				Style_number: cartitemm[key]['products']["0"]["0"]["size_n"]["0"]['style_number'], 
				price:  String(cartitemm[key]['products']["0"]["0"]["price"]),
				//total_quantity : cartitemm[key]['products']["0"]["0"]["custom_quantity"],
				//image_img : cartitemm[key]['image'],
				sub : saveord_det
				

				}  
		
				//var custom = JSON.stringify(orderdata);
				//orderdataa += custom;
				//console.log(JSON.stringify(orderdata), 'ffffffffffgggggggggggg');
				//console.log(key, cartitemm[key]['prd_id']);
				/* orderdata = {
					"Product_id": cartitemm[key]['prd_id'],
					"Style_number": "fssd32423",
					"price": "1255.33",
					"sub": [{
						"n_size": "Large",
						"color": "Purp/Grey",
						"qty": 3,
						"sku_id": "12321"
						},
						{
						"n_size": "Large",
						"color": "Purp/Grey",
						"qty": 3,
						"sku_id": "12321"
						}
						{ 
					
				},
				[{
					n_size: cartitemm[key]['products']["0"]["0"]["size_n"]["0"]['n_size'],
					color:cartitemm[key]['products']["0"]["0"]["size_n"]["0"]['color'],
					qty: cartitemm[key]['products']["0"]["0"]["size_n"]["0"]['qty'],
					sku_id: cartitemm[key]['products']["0"]["0"]["size_n"]["0"]['sku']
				}
					]
				} */
				orderdataa.push(orderdata);
			});
			
			console.log(orderdataa, 'gggggggg');
		console.log(JSON.stringify(orderdataa), 'ffffffffff');
		var finaldata = orderdataa;
		var respons;
		console.log(finaldata, 'sssssssss');
		//var finaldata = JSON.stringify(orderdataa);		
 		let data = {
			"request": 
			{
				"products": finaldata
			},
			"header":{
				"token":token,
				"apiToken":api,
				"authToken":authtoken
			}
		}
		
		this.httpClient.post(save_ord, data).subscribe(data  => {
			console.log(data, "anvi");
			respons = data['response'];
			
			if(respons == "success")
			{
				//this.savedetails(data);
				//console.log("Your Order Details Saved Successfully!!");
				localStorage.setItem("saveorderdata", JSON.stringify(data));
				var emptyaar = [];
				localStorage.setItem("cartItem",JSON.stringify(emptyaar));
				window.location.href = "/vimvigr/pages/order-success";
				//var saveorderdata  =  JSON.parse(localStorage.getItem("saveorderdata"));
				
				//alert("Your Order Details Saved Successfully!!");
				//this.showMsg= true;
				
				
				
			}else{
				
				//alert("Something Went Wrong!");
				
			}	
			
		}); 
		//console.log(respons, 'uuuuuuuyyyyyyyyy');


  }
}  
