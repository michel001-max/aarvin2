import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-save-order-details',
  templateUrl: './save-order-details.component.html',
  styleUrls: ['./save-order-details.component.scss']
})
export class SaveOrderDetailsComponent implements OnInit {
	testhtml = JSON.parse(localStorage.getItem("saveorderdata"));
	
  constructor() { }
showMsg: boolean = false;
showerrMsg: boolean = false;
  ngOnInit() {

	  var saveorderdata  =  JSON.parse(localStorage.getItem("saveorderdata"));
	  console.log(saveorderdata, "saveorderdata");
	  if(saveorderdata['response'] == "success")
	  {
		  //alert("Successfully!!");
		  this.showMsg= true;
		  
	  }
	  else{
		 //alert("Sorry!!"); 
		 this.showerrMsg= true;
	  }
  
  }


}
