import { Component, OnInit } from '@angular/core';
import { url_text, token_text, first_api, start_customer_login } from '../../../variables'; 
import { HttpClient, HttpResponse } from '@angular/common/http';

var url_code = url_text
var token = token_text
var check_account = first_api

@Component({
  selector: 'app-footer-one',
  templateUrl: './footer-one.component.html',
  styleUrls: ['./footer-one.component.scss']
})
export class FooterOneComponent implements OnInit {
	
	logoimg;
	address_footer;
	phonenumber_footer;
	email_footer;
	fax_footer;

  constructor(private httpClient: HttpClient) { this.forLogo(); }

  ngOnInit() {
  }
	logoData(logo,address,phonenumber,email,fax) {
		this.logoimg = logo;
		this.address_footer = address;
		this.phonenumber_footer = phonenumber;
		this.email_footer = email;
		this.fax_footer = fax;
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
					this.logoData(data['logo'],data['address'],data['phonenumber'],data['email'],data['fax'])
				} else{
					$(".invalid_request").show();
				}
			});
  }
	
}
