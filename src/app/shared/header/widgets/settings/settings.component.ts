import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CartItem } from '../../../../shared/classes/cart-item';
import { CartService } from '../../../../shared/services/cart.service';
import { ProductsService } from '../../../../shared/services/products.service';
import { url_text, token_text, first_api, start_customer_login } from '../../../../variables';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

declare var $: any; 
var base_url = url_text

@Component({
  selector: 'app-header-widgets',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
	
  @Input() shoppingCartItems  :   CartItem[] = [];

  public user_url = url_text;

  public show  :   boolean = false;
  public custom_var:any = 10
//console.log(shoppingCartItems, 'shoppingCartItemsshoppingCartItemsshoppingCartItems');
  constructor(private translate: TranslateService, private cartService: CartService,
   public productsService: ProductsService,private activeRoute: Router) { }

  ngOnInit() {
	var save_cart_items_total_cs = JSON.parse(localStorage.getItem("cartItem"));
	//var test_session = localStorage.setItem("test_session","TestValue");
	var test_session = localStorage.getItem("test_session");
	this.custom_var = test_session;
	console.log("shopping cart itemsss");
	console.log(save_cart_items_total_cs);
	
}

  public updateCurrency(curr) {
    this.productsService.currency = curr;
  }

  public changeLanguage(lang){
    this.translate.use(lang)
  }

  public openSearch() {
    this.show = true;
  }

  public closeSearch() {
    this.show = false;
  }

  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }

  public removeItem(item: CartItem) {
    this.cartService.removeFromCart(item);
  }
  
	public cart_redirect() {
		console.log(base_url);
		this.activeRoute.navigate([base_url+'/cart' ]);
	}
	
	public checkout_redirect() {
		console.log(base_url);
		this.activeRoute.navigate([base_url+'/checkout' ]);
	}

}
