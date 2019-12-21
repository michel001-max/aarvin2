import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {
saveorder = JSON.parse(localStorage.getItem("saveorderdata"));
public getTotalCartPrice:number = 0;

 // Price : number ;	
//cartproduct = JSON.parse(localStorage.getItem("cartItem"));
//console.log(cartproduct, 'cartproduct_detailscartproduct_details');
  constructor() { }
showMsg: boolean = false;
showerrMsg: boolean = false;
  ngOnInit() {
		var total:number = parseFloat(localStorage.getItem("totalPriceCustom"));
		console.log(total, 'totaltotaltotaltotaltotaltotal');
		this.getTotalCartPrice = total;
	  console.log("cxvxcvsfsdf");
	  var saveorderdata  =  JSON.parse(localStorage.getItem("saveorderdata"));
	  var save_cart_items_total = JSON.parse(localStorage.getItem("cartItem"));
	  var testbnn  =  JSON.parse(localStorage.getItem("testbnn"));
	  console.log(saveorderdata, "saveorderdata");
	  console.log(save_cart_items_total);
	  console.log('testbnn');
/* 		let sum = 0;
		 for (let i = 0; i < saveorderdata['cartdetails']['products'].length; i++){
		  sum += saveorderdata['cartdetails']['products'][i];
		  console.log(sum, 'sumsumsumsum');
		}
		this.Price = sum; */
	  if(saveorderdata['response'] == "success")
	  {
		  //alert("Successfully!!");
		  this.showMsg= true;
		  
	  }
	  else{
		 //alert("Sorry!!"); 
		 this.showerrMsg= true;
	  }
	  console.log("cxvxcv");
  }

}
