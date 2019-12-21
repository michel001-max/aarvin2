import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../shared/services/login.service';
import { ActivatedRoute, Router} from '@angular/router';
import { url_text } from '../../variables';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	public user_url = url_text;
	constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService) { }

	ngOnInit() {
		/* if(this.check_login!==null){
			this.router.navigate([this.check_login+'/collection/all' ]);
		}  */
	} 
  
	getLoginFormValues() {
		event.preventDefault();  
		var email= ((document.getElementById("email") as HTMLInputElement).value);
		var password= ((document.getElementById("password") as HTMLInputElement).value);
		var account= ((document.getElementById("account_id") as HTMLInputElement).value);
		this.loginService.startCustomerLogin(email,password,account);
	}
	confirmEmailA(){
		event.preventDefault(); 
		var email= ((document.getElementById("email") as HTMLInputElement).value);
		this.loginService.checkEmailFirst(email);
		
	}

}
