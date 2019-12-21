import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../classes/product';
import { WishlistService } from '../../../../services/wishlist.service';
import { ProductsService } from '../../../../../shared/services/products.service';
import { Observable, of } from 'rxjs';
import { url_text } from '../../../../../variables';
import { ActivatedRoute, Router} from '@angular/router';

var urlcode = url_text

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar-one.component.html',
  styleUrls: ['./topbar-one.component.scss']
})
export class TopbarOneComponent implements OnInit {
	
	isLoggedIn = localStorage.getItem('isLoggedIn');
	
	public user_url = url_text;
  
  constructor(public productsService: ProductsService, private router: Router) {  }

  ngOnInit() { }
  
	checkLogout(){
		localStorage.removeItem("isLoggedIn");
		//localStorage.removeItem("user_url");
		localStorage.removeItem("email");
		window.location.href="/vimvigr/pages/login";
		//this.router.navigate(['/pages/login' ]);
		//this.router.navigate(['/pages/login', '']);
	}
	
}
