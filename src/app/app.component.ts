import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
//import { url_text, token_text, first_api, start_customer_login } from 'variables';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	
   constructor(private httpClient: HttpClient, translate: TranslateService, private router: Router) {
      translate.setDefaultLang('en');
      translate.addLangs(['en', 'fr']);
   }
   
   ngOnInit() { 
			/*******check for if user exist in api then add into url*******/
		var get_userurl = localStorage.getItem("user_url");

			var chk_path = window.location.pathname;
			
			
			chk_path = chk_path.replace(/\//g, '');
			
			if(chk_path==="pages/404/" || chk_path==="pages/404"){
				console.log("inside"); 
			} else {
																	/***token need to create dynamic for future****/
				let data= { "request":{ "name": chk_path }, "header":{ "token":"KEY:GYHYH-SDFTG-67RTY-XCFGH-SDFT8" } }
				console.log(get_userurl);
				/*****check for api*******/         
				if(get_userurl === null || get_userurl === 'undefined'){
					this.httpClient.post("https://api.repbro.com/checkAccount",data).subscribe(data  => {
						
						if(data["error"] === "No details found"){
							/****no details found***/
							//console.log("invalid response");
								this.router.navigate(['pages/404' ]);
						} else {
							var api_name_url = data["name"];
							var api_token = data["api_token"]; 
							var api_path = data["api_path"];
							
							localStorage.setItem('user_url', api_name_url); 
							localStorage.setItem('api_token', api_token); 
							localStorage.setItem('api_path', api_path); 
							
							setTimeout( ()=>{    //<<<---    using ()=> syntax
								//this.router.navigate([api_name_url+'pages/login' ]);
								window.location.href=api_name_url+"/pages/login";
							}, 700 ); 
							
						}
						
					});
				} 
			}

			console.log(get_userurl, 'success');
			var islogin = localStorage.getItem("isLoggedIn");
				if (islogin)
				{ 
					//console.log("Successfully Login  !!");
				}
				else{

					this.router.navigate(['/vimvigr/pages/login']);    
				}	
   }
 
}
