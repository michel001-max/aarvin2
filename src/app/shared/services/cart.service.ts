import { Injectable } from '@angular/core';
import { Product } from '../classes/product';
import { CartItem } from '../classes/cart-item';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { map, filter } from 'rxjs/operators';

// Get product from Localstorage
let products = JSON.parse(localStorage.getItem("cartItem")) || [];
console.log(products, 'uuuuuuuuuuuuuuuu');

@Injectable({
  providedIn: 'root'
})

export class CartService {
  
  // Array
  public cartItems  :  BehaviorSubject<CartItem[]> = new BehaviorSubject([]);
  public observer   :  Subscriber<{}>;
  
  constructor(private toastrService: ToastrService) { 
      this.cartItems.subscribe(products => products = products);
  }
  
  // Get Products
  public getItems(): Observable<CartItem[]> {
    const itemsStream = new Observable(observer => {
      observer.next(products);
      observer.complete();
    });
    return <Observable<CartItem[]>>itemsStream;
  }
  
  // Add to cart
  public addToCart_custom(product: Product, cart_pu, added_productid): CartItem | boolean {
    var item: CartItem | boolean = false;
	//localStorage.setItem("cartItem", JSON.stringify(cart_pu));
	console.log(cart_pu);
	var save_cart_items_total = JSON.parse(localStorage.getItem("cartItem"));
	//console.log(save_cart_items_total, "gggggggggggg")
	if(save_cart_items_total.products.length >= 1){
	
		for (var i = 0; i < save_cart_items_total.products.length; i++) {
			var subArray = save_cart_items_total.products;
			var nm = save_cart_items_total.products;
			var subArray2 = nm[i];
			/* console.log("subArraysapm");
			console.log(subArray2); */
			//subArray2 
			for(var j = 0; j < subArray2.length; j++){
				var cart_pid = subArray2[j]['prd_id'];
				if(added_productid==cart_pid){
				/* 	console.log('save_cart_items_totl');
					console.log(i);
					console.log(nm); */
					//subArray2.splice(j);
					/* console.log('subArray2');
					console.log(subArray2); */
					//localStorage.setItem('session', JSON.stringify(a));
					//localStorage.setItem("cartItem", JSON.stringify(cart_pu));
				}
			}
		}
	}
	//var student2 = { s: 2 };
	save_cart_items_total.push(cart_pu);
	localStorage.setItem("cartItem", JSON.stringify(save_cart_items_total));
	
	//localStorage.removeItem('cartItem');
	//localStorage.setItem("cartItem", JSON.stringify(cart_pu));
	
    // If Products exist
	
	//console.log('cart_pu');
	//console.log(products);
	console.log('cart_pu');
	
	//console.log(cart_pu.products);
	//console.log(cart_pu.prd_id);
	
	//var productlength = cart_pu.length; 
	//console.log(CartItem);
	//var save_cart_items = JSON.parse(localStorage.getItem("cartItem"));
	//var cart_items_length = save_cart_items.length;
	//console.log(cart_items_length);
	//if(cart_items_length >= 1){
		/*for (var i = 0; i < cart_items_length; i++) {
			var saved_product_id = save_cart_items[i]['variant_sel']; 
			var cart_id = cart_pu[i]['variant_sel']; 
			
			if(saved_product_id == cart_id) {
				
			}
			
		}*/
		
	//}
	//if(productlength)
	//localStorage.setItem("cartItem", JSON.stringify(cart_pu));
	//for (var i = 0; i < productlength; i++) {
		//var pid = cart_pu[i]['variant_sel']; 
	//}
	
	//if()
	
	
    /*let hasItem = products.find((items, index) => {
		
      if(items.product.id == product.id) {
		  console.log("firrr");
		  console.log('product.id');
			console.log(items);

		  console.log(products[index].quantity);
		  console.log(quantity);
        let qty = parseInt(products[index].quantity) + parseInt(quantity);
		console.log("plus");
		console.log(qty);
        let stock = this.calculateStockCounts(products[index], quantity);
        if (qty != 0 && stock) {
          products[index]['quantity'] = qty;
          this.toastrService.success('This product has been added.');
        }
        return true;
      }
    }); 
    // If Products does not exist (Add New Products)
    if(!hasItem) {
		console.log("22223333");
        item = { product: product, quantity: quantity };
        products.push(item);
        this.toastrService.success('This product has been added.');
    }
	console.log("getitem");
	console.log(products);
    localStorage.setItem("cartItem", JSON.stringify(products));*/
    return cart_pu;
  }
 
  
  // Add to cart
  public addToCart(product: Product, cart_pu): CartItem | boolean {
    var item: CartItem | boolean = false;
	
	var productlength = cart_pu.products.length; 
	var save_cart_items_total = JSON.parse(localStorage.getItem("cartItem"));
	var save_cart_items_length = save_cart_items_total.products.length; 
	var save_cart_items_totl = save_cart_items_total.products; 
	//var save_cart_items = save_cart_items; 
	//console.log(save_cart_items_total);
	//console.log(save_cart_items_length);
	//console.log(productlength);
	if(save_cart_items_length >= 1){
		console.log(save_cart_items_length.length);
		console.log(save_cart_items_length);
		for (var i = 0; i <= save_cart_items_totl.length; i++) {
			var subArray = save_cart_items_totl[i].length;
			
			//console.log('subArray');
			//console.log(subArray);
			/*for(var j = 0; j < subArray.length; j++){
				console.log(subArray[j]);
			if(subArray[j]['prd_id']==added_productid){
				save_cart_items_total
			} 
			} */
		}
	}
	
	//localStorage.removeItem('cartItem');
	//localStorage.setItem("cartItem", JSON.stringify(cart_pu));
	
    // If Products exist
	
	//console.log('cart_pu');
	//console.log(products);
	console.log('cart_pu');
	
	//console.log(cart_pu.products);
	//console.log(cart_pu.prd_id);
	
	//var productlength = cart_pu.length; 
	//console.log(CartItem);
	//var save_cart_items = JSON.parse(localStorage.getItem("cartItem"));
	//var cart_items_length = save_cart_items.length;
	//console.log(cart_items_length);
	//if(cart_items_length >= 1){
		/*for (var i = 0; i < cart_items_length; i++) {
			var saved_product_id = save_cart_items[i]['variant_sel']; 
			var cart_id = cart_pu[i]['variant_sel']; 
			
			if(saved_product_id == cart_id) {
				
			}
			
		}*/
		
	//}
	//if(productlength)
	//localStorage.setItem("cartItem", JSON.stringify(cart_pu));
	//for (var i = 0; i < productlength; i++) {
		//var pid = cart_pu[i]['variant_sel']; 
	//}
	
	//if()
	
	
    /*let hasItem = products.find((items, index) => {
		
      if(items.product.id == product.id) {
		  console.log("firrr");
		  console.log('product.id');
			console.log(items);

		  console.log(products[index].quantity);
		  console.log(quantity);
        let qty = parseInt(products[index].quantity) + parseInt(quantity);
		console.log("plus");
		console.log(qty);
        let stock = this.calculateStockCounts(products[index], quantity);
        if (qty != 0 && stock) {
          products[index]['quantity'] = qty;
          this.toastrService.success('This product has been added.');
        }
        return true;
      }
    }); 
    // If Products does not exist (Add New Products)
    if(!hasItem) {
		console.log("22223333");
        item = { product: product, quantity: quantity };
        products.push(item);
        this.toastrService.success('This product has been added.');
    }
	console.log("getitem");
	console.log(products);
    localStorage.setItem("cartItem", JSON.stringify(products));*/
    return cart_pu;
	  console.log(products, 'gggggggggrrrrrrrrrrrrrttttttttttt');
  }
  
  // Update Cart Value
  public updateCartQuantity(product: Product, quantity: number): CartItem | boolean {
    return products.find((items, index) => {
      if(items.product.id == product.id) {
        let qty = products[index].quantity + quantity;
        let stock = this.calculateStockCounts(products[index], quantity);
        if (qty != 0 && stock) 
          products[index]['quantity'] = qty;
        localStorage.setItem("cartItem", JSON.stringify(products));
        return true;
      }
    });
  }
  
  // Calculate Product stock Counts
  public calculateStockCounts(product: CartItem, quantity): CartItem | Boolean {
    let qty   = product.quantity + quantity;
    let stock = product.product.stock;
    if(stock < qty) {
      this.toastrService.error('You can not add more items than available. In stock '+ stock +' items.');
      return false
    }
    return true
  }
  
  // Removed in cart
  public removeFromCart(item: CartItem) {
    if (item === undefined) return false; 
      const index = products.indexOf(item);
      products.splice(index, 1);
      localStorage.setItem("cartItem", JSON.stringify(products));
  }

  // Total amount 
  public getTotalAmount(): Observable<number> {
    return this.cartItems.pipe(map((product: CartItem[]) => {
      return products.reduce((prev, curr: CartItem) => {
        return prev + products.price * curr.quantity;
        //return prev + curr.product["price"] * curr.quantity;
      }, 0);
    })); 
  }


}