import { Component, Inject, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { LandingFixService } from '../../services/landing-fix.service';
import { DOCUMENT } from "@angular/common";
import { WINDOW } from '../../services/windows.service';
import { CartItem } from '../../classes/cart-item';
import { CartService } from '../../services/cart.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { url_text, token_text, first_api, start_customer_login } from '../../../variables'; 
import { Observable, of } from 'rxjs';
declare var $: any;
var url_code = url_text
var token = token_text
var check_account = first_api

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderOneComponent implements OnInit {
  
  public shoppingCartItems  :   CartItem[] = [];
	logoimg;
  
  constructor(@Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window,private fix: LandingFixService, private cartService: CartService, private httpClient: HttpClient) { 
    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
	this.forLogo();
  }

  ngOnInit() { 
	console.log("eeeeee");
    $.getScript('assets/js/menu.js');
  }
  logoData(data) {this.logoimg = data;}

  openNav() {
  	this.fix.addNavFix();
  }

  closeNav() {
     this.fix.removeNavFix();
  }
  
  public forLogo(){
	  console.log("forlogo");
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
					this.logoData(data['logo'])
				} else{
					$(".invalid_request").show();
				}
			});
  }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
      if (number >= 300) { 
        this.document.getElementById("sticky").classList.add('fixed');
      } else {
        this.document.getElementById("sticky").classList.remove('fixed');
      }
  }

}
