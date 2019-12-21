import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Product } from '../../../../shared/classes/product';
import { ProductsService } from '../../../../shared/services/products.service';
import { WishlistService } from '../../../../shared/services/wishlist.service';
import { CartService } from '../../../../shared/services/cart.service';
import { Observable, of } from 'rxjs';
import { Location } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { url_text, token_text, first_api, product_sing, a_token, currency_symbol } from '../../../../variables';
import * as $ from 'jquery';

var base_url = url_text
var product_single = product_sing 
var token = token_text
var check_account = first_api
var authtoken = a_token

@Component({
  selector: 'app-product-left-sidebar',
  templateUrl: './product-left-sidebar.component.html',
  styleUrls: ['./product-left-sidebar.component.scss']
})
export class ProductLeftSidebarComponent implements OnInit {

	public product            :   Product = {};
	public products           :   Product[] = [];
	public counter            :   number = 1; 
	public selectedSize       :   any = '';
	public iStyle               = "width:100%; height:100%;"
	public curr_symbol = currency_symbol;
	
  //Get Product By Id
  constructor(private toastrService: ToastrService, private location: Location, private httpClient: HttpClient, private route: ActivatedRoute, private router: Router,
    public productsService: ProductsService, private wishlistService: WishlistService,
    private cartService: CartService) {
      this.route.params.subscribe(params => {
        const id = +params['id'];
		
		console.log(id, 'helloooo');
		this.checkAPIFirst(id); 
       //this.productsService.getProduct(id).subscribe(product => this.product = product)
      });
  }
  displaydata(data) {this.product = data;}

  ngOnInit() {
	  var check_login_first = localStorage.getItem("isLoggedIn");
	  if(check_login_first==="true"){
		  console.log('login succ');
	  } else{
		  console.log(base_url);
		  //this.router.navigate([base_url+'/pages/login']);
		  window.location.href=base_url+"/pages/login";
	  }
    this.productsService.getProducts().subscribe(product => this.products = product);

  }
  
  // product zoom 
  onMouseOver(): void {
    document.getElementById("p-zoom").classList.add('product-zoom');
  }

  onMouseOut(): void {
    document.getElementById("p-zoom").classList.remove('product-zoom');
  }

  public slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
  };

  public slideNavConfig = {
    vertical: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.product-slick',
    arrows: false,
    dots: false,
    focusOnSelect: true
  }

  public increment() { 
      this.counter += 1;
  }

  public decrement() {
      if(this.counter >1){
         this.counter -= 1;
      }
  }

  // For mobile filter view
  public mobileSidebar() {
    $('.collection-filter').css("left", "-15px");
  }

  // Add to cart
  public addToCart(product: Product, pro_id, web_title) {
	  
		$(".infinite-scrolling").show();
		$('.add_to_cartbtn').prop('disabled', true);
		
	var cart_pu = [];
	var cart_pri = [];
	var for_already = [];
	var size_nchrt = [];
	var size_nchrt_km = [];
	var index_color_loop;
	var jsons = new Array();
	
	var save_cart_items_total = JSON.parse(localStorage.getItem("cartItem"));
	console.log('save_cart_items_total');
	console.log(save_cart_items_total, 'hhhhhhhhhhhhh');
	/****get all cart items previous items push****/
	var sumprice:number = 0;
	
	/******new items push*****/
	 var j=1;
	 var jk=1;
	 var getimg = $(".hidvl").val();
	 
	 var val_rep_vl=0;
	 var price_fl=0;
	 var lastval:any = 0;
	 var repelat_color = [];
		var uniquesData_cs = [];
		var index_color;
		var elem = new Object();
		var nanValue = NaN;
		/****get each value from input fields from product page*****/
		$(".cstim_txtq").each(function(e) {
			var cid = $(this).attr('id');
			var all_qty_new:number = parseFloat($(this).val().toString());
			all_qty_new = all_qty_new || 0
			console.log(all_qty_new);
			/* if(nanValue === all_qty_new) {
				all_qty_new = 0;
				console.log("inn");
			} */
			if(all_qty_new !== 0) {
				console.log('all_qty_new');
				console.log(all_qty_new);
				var fin_qty:number = all_qty_new;
				var color_size_new = $(".coln_"+cid).val();
				var sizen_new = $(".sizen_"+cid).val();
				var sku_new = $(".cs_sku_"+cid).val();
				var style_num = $(".cs_style_"+cid).val();
				getimg = $(".cs_img_"+cid).val();
				//var getimg = $(".hidvl").val();	
				var cs_price:number = parseFloat($(".cs_price_"+cid).val().toString());
				var finlpri = cs_price*all_qty_new;
				sumprice = sumprice+finlpri;
				
				if( typeof all_qty_new !== 'undefined') {
					cart_pri.push({"cart_price":finlpri})
					var nqty:number = 0;
					if(lastval==color_size_new){
					val_rep_vl = val_rep_vl+fin_qty;
					price_fl = price_fl+finlpri;
					} else {
						var cstm_error = 0;
						val_rep_vl = fin_qty;
						price_fl = finlpri;
					}
					lastval = color_size_new;
					size_nchrt.push({"n_size":sizen_new,'color':color_size_new,'qty':fin_qty, "sku": sku_new, "style_number": style_num, "prod_id": pro_id})
					cart_pu.push({ "prd_id": pro_id,"pro_title":web_title,"custom_quantity": val_rep_vl,"variant_sel":color_size_new,"price":price_fl,"size_n":size_nchrt});
					 
					jk++;
				}
			}
			
		});
		
		if (typeof cart_pu !== 'undefined' && cart_pu.length < 1) {
			//console.log("empty values");
			//$(".error_msg_new").show();
			this.toastrService.error('All quantities of product can not be blank');
			$(".infinite-scrolling").hide();
			$('.add_to_cartbtn').prop('disabled', false);
		} else {
		$(".error_msg_new").hide();
		var tot_product_price:number = 0;
		var tot_product_price_cart:number = 0;
		/****reverse items in cart******/
		var revele = cart_pu.reverse();
		for (var e = 0; e < revele.length; e++) {
			index_color = repelat_color.lastIndexOf(revele[e].variant_sel);
			if(index_color == -1){
				repelat_color.push(revele[e].variant_sel);
				
				tot_product_price = tot_product_price+revele[e].price
				uniquesData_cs.push(revele[e]);
			} else {
			} 
		}
		 
	   j++; 
	    //console.log('save_cart_items_total.length');
	   //console.log(revele, 'kkkkkkkkkkkkkkkkkkggggggggggggg');
	   /******check if items already in cart*******/
	if(save_cart_items_total!=null && save_cart_items_total.length >= 1){

		if(save_cart_items_total.length >= 1){
			var cst =
				{ 'products':[uniquesData_cs],'pro_title':web_title,'prd_id':pro_id ,"image":getimg,"total_price":tot_product_price };
			jsons.push(cst);
			console.log(cst, 'hhhhhtuuuuu');
			for (var i = 0; i < save_cart_items_total.length; i++) {
				var cart_title_c = save_cart_items_total[i]['pro_title'];
				var cart_id_c = save_cart_items_total[i]['prd_id'];
				var cart_img = save_cart_items_total[i]['image'];
				var total_price = save_cart_items_total[i]['total_price'];
				var total_savecartlen = save_cart_items_total[i];
				//console.log(cst, "My Custommmmmmmmmmmmmmmmmmm");
				/*return false; */
				if(pro_id!=cart_id_c) {
					for (var m = 0; m < total_savecartlen.products.length; m++) {
						var subArray = total_savecartlen.products;
						var nm = total_savecartlen.products;
						var subArray2 = nm[m];
						for_already = [];
						
						//size_chrt = [];
						tot_product_price_cart = 0;
						for(var o = 0; o < subArray2.length; o++) {
							var cart_pid = subArray2[o]['prd_id'];
							var cart_title = subArray2[o]['pro_title'];
							var cart_quantity = parseFloat(subArray2[o]['custom_quantity']);
							var cart_sel = subArray2[o]['variant_sel'];
							var cart_size_n = subArray2[o]['size_n'];
							size_nchrt_km = [];
							for(var km=0; km<cart_size_n.length; km++){
								var km_size = cart_size_n[km]['n_size'];
								var km_color = cart_size_n[km]['color'];
								var km_qty = cart_size_n[km]['qty'];
								var sku_id_new = cart_size_n[km]['sku'];
								var style_num = cart_size_n[km]['style_number'];
								//var productid = cart_size_n[km]['prd_id'];
								size_nchrt_km.push({"n_size":km_size,'color':km_color,'qty':km_qty, "sku": sku_id_new, "style_number": style_num, "prod_id": cart_pid});
							}
							//console.log(size_nchrt_km, 'successfully!!');
							//console.log(cart_size_n, 'successfullyyyyy!!');
							var price = parseFloat(subArray2[o]['price']);
							tot_product_price_cart = tot_product_price_cart + price;
							var finlpri = price*cart_quantity;
							
							if(cart_id_c===cart_pid){
								
								for_already.push({ "prd_id": cart_pid,"pro_title":cart_title,"custom_quantity": cart_quantity,"variant_sel":cart_sel,"price":price,"size_n":size_nchrt_km});	
								//console.log('Hiiiiiiiiiiiiiiiiiiiiiiiiiiiii')								
							}
						}
					}
					j++; 
					var already_have_incart = { 'products':[for_already],'pro_title':cart_title_c,'prd_id':cart_id_c,"image":cart_img,"total_price":tot_product_price_cart}	
					jsons.push(already_have_incart);
				} else{
					sumprice = sumprice-total_price;
				}
			}
			 //console.log("My Custom", cart_title_c);
		}
	} else {
		var final_send = {'products':[uniquesData_cs],'pro_title':web_title,'prd_id':pro_id, "image":getimg,"total_price":tot_product_price
	};
		jsons.push(final_send);
		
	}
//console.log(uniquesData_cs, 'hhhhhhhhhhhhhhhhhhhhhhs');
	var repelat_pid = [];
	var repelat_pid_cstm = [];
	var indexes = [];
	var uniquesData = [];
	var index;
	var index_rep;
	
	for (var e = 0; e < jsons.length; e++) {
		index = repelat_pid.indexOf(jsons[e].prd_id);
		var pid = jsons[e].prd_id;
		/*****check if not repeating value then remove*****/
		if(index == -1){
			repelat_pid.push(jsons[e].prd_id);
			uniquesData.push(jsons[e]);
		} 
	}
	
	jsons = uniquesData;
	var gettotal:number = JSON.parse(localStorage.getItem("totalPriceCustom"));
	//console.log(gettotal);
	if(save_cart_items_total!=null){
		if(save_cart_items_total.length >= 1){
			sumprice = sumprice+gettotal;
		}
	}
	/****set items in localstorage******/
	//console.log(jsons, 'kkkkkkkkkkkkkk');
	//console.log(uniquesData, 'kkkkkkkkyyyyyyyyyyyykkkkkk');
	var locat = localStorage.setItem("cartItem", JSON.stringify(jsons));
	localStorage.setItem("totalPriceCustom", JSON.stringify(sumprice));

	console.log(JSON.stringify(jsons), "dxcvxcv");
	/****redirect url*****/
	setTimeout(()=>{    //<<<---    using ()=> syntax
		//this.router.navigate([base_url+'/cart' ]);
		var getitem_cart = localStorage.getItem("cartItem");
		var getitem_total = localStorage.getItem("totalPriceCustom");
		console.log(getitem_cart);
		if(getitem_cart!=''){
			
			//window.location.href=base_url+"/cart";
			//window.location.reload()
			this.toastrService.success('This product has been added.');
			
			
			$(".infinite-scrolling").hide();
			//this.router.navigate([base_url+'/product/1653']);
		}
	}, 7000);
			$(".refresh_ncart").load(".refresh_ncart");
				
		}
		$('.add_to_cartbtn').prop('disabled', false);
  }

	
  // Add to cart
	public buyNow(product: Product, quantity) {
		if (quantity > 0) 
		this.cartService.addToCart(product,parseInt(quantity));
		this.router.navigate(['/home/checkout']);
	}

  // Add to wishlist
	public addToWishlist(product: Product) {
		this.wishlistService.addToWishlist(product);
	}
  
	public singleProductDisplay(id,api){
	  
		let data= {
			"request":{
			"product_id":id
		},
			"header":{
				"token":token,
				"apiToken":api,
				"authToken":authtoken
			}
		}
		//var finaldata = [];

		this.httpClient.post(product_single,data).subscribe(data  => {
			console.log(data, 'datavariants');
			
			if(data["varient"]){
				var result = Object.values(data["varient"].reduce((r,o) => {
				r[o.attr_2] = r[o.attr_2] || {'color': o.attr_2, 'size' : [], 'date' : []};
				var datevl = o.ats_data[0].date_due;
				var date_type = o.ats_data[0].sku_id;
				var imm_qty = o.ats_data[0].imm_qty;
				var qty_ats = o.ats_data[0].qty;
				var type_ats = o.ats_data[0].type;
				var final_val
				if(type_ats=='PO'){
					 final_val = datevl;
				}else{
					var findate = datevl.split(" ")[0];
					var month = findate.split("-")[1];
					var date = findate.split("-")[2];
					var year = findate.split("-")[0];
					final_val = month+'-'+date+'-'+year;
				}
				var img_var = o.image;
				var ats_data = o.ats_data;
				var size = o.size;
				console.log(size, 'yyyyyyyyyyyyzzzzzz');
				  
				/* for(var at=0; at<ats_data.length; at++){
					var ats_size = ats_data[at].
				} */
				 
				  if(img_var == ""){
					  
					  if(data['images'][0]){
						img_var = data['images'][0];
					  } else{
						img_var = "assets/images/default-image.png";  
					  }
				  }
				  var getcart_cart = JSON.parse(localStorage.getItem("cartItem"));
					var tot_qty
				  if(getcart_cart != null){
					  
					  	Object.keys(getcart_cart).forEach(function(key) {
						if(getcart_cart[key]['prd_id'] == data['product_id']){
							//console.log(data['custom_attributes'], 'jjjjjjjjjjj');
							var chk_size = getcart_cart[key]['products'][0][0]['size_n'];
							//console.log(chk_size, 'kkkkkkkkk');
							Object.keys(chk_size).forEach(function(key) {
								//console.log(chk_size[key]);
							if(chk_size[key]['n_size'] == size)
							{
								tot_qty = chk_size[key]['qty'];
							}
							});

							
						}
						});
				  }else{
					tot_qty = [];
				  }
				  console.log(getcart_cart, 'getcart_cartgetcart_cart');
				  r[o.attr_2]['size'].push({"type":type_ats, "date_type":date_type, "qty_ats":qty_ats,"imm_qty":imm_qty, "size":o.size, 'price' : o.price,'retail_price': o.retail_price, 'style_number':o.style_number,"image":img_var, "product_id": o.product_id, "date_due":final_val,'qty':o.ats_data[0].qty, "quantity" : tot_qty});
				  
				  r[o.attr_2]['date'].push({"size":o.size,"date_due":final_val,'qty':o.ats_data[0].qty});
				  
				  return r;
				}, {}));
				data['custom_attributes'] = result;
				console.log(result, 'yyyyyyyyyyyyzzzzzz');
			}
			console.log(data);
			var check_login = localStorage.getItem("isLoggedIn");
			if(check_login=="true"){
				this.displaydata(data);
			} else{
				$(".collection-wrapper").append("<p class='login_first'>Please Login first to view products.</p>");
				$(".productpage").hide();
			}
			
			
		});
		
	}
	
	public checkAPIFirst(id){
		//console.log(this.final_url);
		console.log("chk api fir");
		let data= {"request":{
			"name": base_url
			},
			  "header":{
				"token":token
			  }	
			}
			this.httpClient.post(check_account,data).subscribe(data  => {
				//this.data = data.name;
				 console.log("wewer");
				console.log(data["api_token"])
				if(data["name"]==base_url){
					this.singleProductDisplay(id,data["api_token"]);
					//this.startFirstLogin(email,password,data.api_token);
				} else{
					$(".invalid_request").show();
				}
			});
	}

  
  // Change size variant
  public changeSizeVariant(variant) {
     this.selectedSize = variant;
  }

}
