import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { url_text, token_text, first_api, second_customer_login, start_customer_login, for_pass, changepass_otp } from '../../variables';
import * as $ from 'jquery';// import Jquery here 
/*****get variables from variables.ts**********/
var base_url = url_text
var token = token_text
var startCLogin = start_customer_login
var cLogin = second_customer_login
var cLogin = second_customer_login
var check_account = first_api
var customerFPassword = for_pass
var cPasswordOTP = changepass_otp

@Injectable({
  providedIn: 'root'
})
export class LoginService {

	constructor(private httpClient: HttpClient,private activeRoute: Router) { }
	
	/******check email******/
	
	checkEmailFirst(email){
		//console.log(this.final_url);
		$(".infinite-scrolling").show();
		let data= {"request":{
			"name": base_url
			},
			  "header":{
				"token":token
			  }	
			}
			this.httpClient.post(check_account,data).subscribe(data  => {
				console.log("Workin fine448888");
				if(data["name"]==base_url){
					console.log("Workin fine44");
					
					this.checkifemail(email,data["api_token"]);
					
				} else{
					$(".invalid_request").show();
					//$(".infinite-scrolling").hide();
				}
			});
	}
	
	/****main fun to call on component request to check email*****/
		startCustomerLogin(email,password,account){
			
			$('.infinite-scrolling').show();
			
			let data = {"request":{
				"name": base_url
			},
			  "header":{
				"token":token
			  }	
			}
			this.httpClient.post(check_account,data).subscribe(data  => {
				if(data["name"]==base_url){
					this.startFirstLogin(email,password,data["api_token"],account);
				} else{
					$(".invalid_request").show();
				}
			});
			
	}
	
	/******check email exist*******/
	
	checkifemail(email,api){
		
		let data= {
			"request":{"username":email},
			"header":{"token":token,"apiToken":api}
		}
	  
		return this.httpClient.post(startCLogin,data).subscribe(data  => {
			/* console.log('data');
			console.log(data); */
			//$(".infinite-scrolling").show();
			if(data["status"]=="success") {
				$(".second_password").show();
				$(".conemail").hide();
				$(".loginbtn").show();
				$(".error_msg .email_invalid").hide();
				$(".infinite-scrolling").hide();
				if(data["multiple"] === true) {
					$(".third_accountid").show();
				}
			} else{
				$(".error_msg .email_invalid").text(data["status"]);
				$(".error_msg .email_invalid").show();
				//localStorage.removeItem("user_url");
				//setTimeout(()=>)
				/*setTimeout(()=>{    //<<<---    using ()=> syntax
					this.activeRoute.navigate(['/' ]);
				}, 500);*/ 
				$(".infinite-scrolling").hide();
				
			}
		}
		,error  => {console.log("Error", error);});
	}
	
	/*****first login to check email******/
	
	startFirstLogin(email,password,api_token,account) {
		let data= {
			"request":{"username":email},
			"header":{"token":token,"apiToken":api_token}
		}
	  
		return this.httpClient.post(startCLogin,data).subscribe(data  => {
			if(data["status"]=="success") {
				this.customerLogin1(email,password,api_token,account)
				console.log("welcome");		
				$(".second_password").show();
				$('.infinite-scrolling').hide();
				if(data["multiple"] === true) {
					$(".third_accountid").show();
				}
			} else{
				$('.infinite-scrolling').hide();
				$(".error_msg .password_failed").hide();
				$(".error_msg .email_invalid").show();
			}
		}
		,error  => {console.log("Error", error);});
	}
	
	/******second request to check password email and pass*******/
	customerLogin1(email,password,api_token,account){
		let data= {
			"request":{
				"username":email,
				"password":password,
				"accountid":account
			},
			"header":{
				"token":token,
				"apiToken":api_token
			}
		}
		
		/*****Login check if success or not*******/
		  
		return this.httpClient.post(cLogin,data).subscribe(data  => {
			
				console.log(data);
				if(data["login"]=="success"){	
					$(".login_success").show();
					$(".error_msg .email_invalid").hide();
					$(".error_msg .password_failed").hide();
					
					localStorage.setItem('isLoggedIn', "true");  
					localStorage.setItem('auth_token', data["token"]); 
					localStorage.setItem('email', data["username"]); 
					var eml = localStorage.getItem('isLoggedIn');
					window.location.href=base_url+"/collection/all";
					//this.activeRoute.navigate([base_url+'/collection/all' ]);
				}
				if(data["login"]=="failed"){
					$(".error_msg .email_invalid").hide();
					$(".error_msg .password_failed").text(data["error"]);
					$(".error_msg .password_failed").show();	
				}
			}
			,error  => {console.log("Error", error);});
	}
	
	forgetPassword(email){
		
		let data= {"request":{
		"name": base_url
		},
		  "header":{
			"token":token
		  }	
		}
		
		this.httpClient.post(check_account,data).subscribe(data  => {
			if(data["name"]==base_url){
				this.forgotcheckemail(email,data["api_token"]);
				
			} else{
				$(".invalid_request").show();
			}
		});
		
	}
	
	forgotcheckemail(email,api){
		
		console.log(api);
		let data= {"request":{
				"username":email
			},
			"header":{
				"token":token,
				"apiToken":api
			}
		}
	  
		return this.httpClient.post(customerFPassword,data).subscribe(data  => {
			if(data["status"]=="success") {
				//window.location.href="/"+this.base_url+"/pages/changepassword?email="+email;
				$(".pass_succ").text(data["status"]);
				$(".email_forgot").hide();
				$(".otp_code").show();
			}
		}
		,error  => {console.log("Error", error);});
	}
	
	/******************get otp code********************/
	
	enterOTP(otp_code,email,new_pass){
		let data= {"request":{
		"name": base_url
		},
		  "header":{
			"token":token
		  }	
		}
		
		this.httpClient.post(check_account,data).subscribe(data  => {
			if(data["name"]==base_url){
				this.enterOTPCode(otp_code,email,new_pass,data["api_token"]);
				
			} else {
				$(".invalid_request").show();
			}
		});
	}
	
	/****chk otp fun*****/
	
	enterOTPCode(otp_code,email,pass,api_token){	
		console.log(pass);
		var x = otp_code;
		var y = +x; // y: number
		let data= {"request":{
		  "username":email,
		  "otp":y,
		  "password":pass
		},
		"header":{
			"token":token,
			"apiToken":api_token
		}
		}
	  
		return this.httpClient.post(cPasswordOTP,data).subscribe(data  => {
			console.log(data);
			if(data["status"]=="success") {
				$(".pass_succ span").text(data["status"]);
				$(".pass_succ").show();
				$(".otp_fail").hide();
			} else{
				$(".otp_fail").show();
				$(".pass_succ").hide();
				$(".otp_fail span").text(data["error"]);
			}
		}
		,error  => {console.log("Error", error);});
	}
  
  
	/*****************not used need to remove**************************/
  
	/***************code for change password*****************/
	
		getParams(url) {
			var params = {};
			var parser = document.createElement('a');
			parser.href = url;
			var query = parser.search.substring(1);
			var vars = query.split('&');
			for (var i = 0; i < vars.length; i++) {
				var pair = vars[i].split('=');
				params[pair[0]] = decodeURIComponent(pair[1]);
			}
			
			return params;
		};
	
		
		checkUrl(){
			let data= {"request":{
			"name": base_url
			},
			  "header":{
				"token":token
			  }	
			}
			this.httpClient.post(check_account,data).subscribe(data  => {
				if(data["name"]==base_url){
				} else{
					//$(".invalid_request").show();
				}
			});
		}
	

		/*changePasswordOTP(otp_code,old_pass){
			/****custom request***
			console.log(otp_code);
			
			let data= {"request":{
				"name": base_url
			},
			  "header":{
				"token":token
			  }	
			}
			this.httpClient.post(check_account,data).subscribe(data  => {
				//this.data = data.name;
				console.log(data)
				if(data["name"]==base_url){
					console.log("Workin fine44");
					//console.log('param1 = ' + this.GetParam('email'));
					//const firstParam: string = this.activeRoute.get('email');
					console.log("firstParam");
					var getemail = this.getParams(window.location.href);
					console.log(getemail["email"]);
					//console.log(oo);
					this.passReset(otp_code,old_pass,data["api_token"]);
					//this.startFirstLogin(email,password,data.api_token);
				} else {
					$(".invalid_request").show();
				}
			});
		}
		
		passReset(otp_code,old_pass,api_token){
			let data= {"request":{
				  "username":"aarvinms@gmail.com",
				  "otp":248300,
				  "password":"12345678"
				},
				"header":{
					"token":token,
					"apiToken":api_token
				}
			}
			this.httpClient.post(cPasswordOTP,data).subscribe(data  => {
				
			});
		}*/

  
}
