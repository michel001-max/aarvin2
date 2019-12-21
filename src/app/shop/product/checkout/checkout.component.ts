import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
// import {  IPayPalConfig,  ICreateOrderRequest } from 'ngx-paypal';
import { CartItem } from '../../../shared/classes/cart-item';
import { ProductsService } from '../../../shared/services/products.service';
import { CartService } from '../../../shared/services/cart.service';
import { OrderService } from '../../../shared/services/order.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { url_text, token_text, first_api, a_token, save_order, start_customer_login,currency_symbol } from '../../../variables';
import { Observable, of } from 'rxjs';


var base_url = url_text
var token = token_text
var check_account = first_api
var authtoken = a_token
var save_ord = save_order
//var id = 1168


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  
  // form group
  jsonFormObject: any;
  public checkoutForm   :  FormGroup;
  public cartItems      :  Observable<CartItem[]> = of([]);
  public checkOutItems  :  CartItem[] = [];
  public orderDetails   :  any[] = [];
  public amount         :  number;
  public payPalConfig ? : PayPalConfig;
  public getTotalCartPrice:number = 0;
  public curr_symbol = currency_symbol;

  // Form Validator
  constructor(private fb: FormBuilder, private http: HttpClient, private httpClient: HttpClient, private cartService: CartService, 
    public productsService: ProductsService, private orderService: OrderService) {
    this.checkoutForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      country: ['', Validators.required],
      town: ['', Validators.required],
      state: ['', Validators.required],
      postalcode: ['', Validators.required]
    })    
  }

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.cartItems.subscribe(products => this.checkOutItems = products);
    this.getTotal().subscribe(amount => this.amount = amount);
    this.initConfig();
	var total:number = parseFloat(localStorage.getItem("totalPriceCustom"));
	this.getTotalCartPrice = total;
	var idd = JSON.parse(localStorage.getItem("cartItem"));
	var id =  idd[0]['prd_id'];

  }
  
  // Get sub Total
  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }
 
  // stripe payment gateway
  stripeCheckout() {
      var handler = (<any>window).StripeCheckout.configure({
        key: 'PUBLISHBLE_KEY', // publishble key
        locale: 'auto',
        token: (token: any) => {
          // You can access the token ID with `token.id`.
          // Get the token ID to your server-side code for use.
          this.orderService.createOrder(this.checkOutItems, this.checkoutForm.value, token.id, this.amount);
        }
      });
      handler.open({
        name: 'Multikart',
        description: 'Online Fashion Store',
        amount: this.amount * 100
      }) 
  }

  // Paypal payment gateway
  private initConfig(): void {
      this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
        commit: true,
        client: {
          sandbox: 'CLIENT_ID', // client Id
        },
        button: {
          label: 'paypal',
          size:  'small',    // small | medium | large | responsive
          shape: 'rect',     // pill | rect
          //color: 'blue',   // gold | blue | silver | black
          //tagline: false  
        },
        onPaymentComplete: (data, actions) => {
          this.orderService.createOrder(this.checkOutItems, this.checkoutForm.value, data.orderID, this.amount);
        },
        onCancel: (data, actions) => {
          console.log('OnCancel');
        },
        onError: (err) => {
          console.log('OnError');
        },
        transactions: [{
          amount: {
            currency: this.productsService.currency,
            total: this.amount
          }
        }]
      });
  }
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
			Object.keys(cartitemm).forEach(function(key) {
				console.log(cartitemm[key], 'hiiiiiiiiiiiiiiii');

				orderdata =  {
				Product_id: cartitemm[key]['prd_id'], 
				Style_number: cartitemm[key]['products']["0"]["0"]["size_n"]["0"]['style_number'], 
				price:  String(cartitemm[key]['products']["0"]["0"]["price"]),	
				sub : [{ 
					n_size: cartitemm[key]['products']["0"]["0"]["size_n"]["0"]['n_size'],
					color:cartitemm[key]['products']["0"]["0"]["size_n"]["0"]['color'],
					qty: cartitemm[key]['products']["0"]["0"]["size_n"]["0"]['qty'],
					sku_id: cartitemm[key]['products']["0"]["0"]["size_n"]["0"]['sku']
				},
				{
					n_size: cartitemm[key]['products']["0"]["0"]["size_n"]["0"]['n_size'],
					color:cartitemm[key]['products']["0"]["0"]["size_n"]["0"]['color'],
					qty: cartitemm[key]['products']["0"]["0"]["size_n"]["0"]['qty'],
					sku_id: cartitemm[key]['products']["0"]["0"]["size_n"]["0"]['sku']
				}
				]
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
					]
				} */
				orderdataa.push(orderdata);
			});
			console.log(orderdataa, 'gggggggg');
		console.log(JSON.stringify(orderdataa), 'ffffffffff');
		var finaldata = orderdataa;
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
			
		}); 
	} 
  
}
