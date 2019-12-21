import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }
  
	getForgotemail(){
		event.preventDefault(); 
		var email = ((document.getElementById("email") as HTMLInputElement).value);
		this.loginService.forgetPassword(email);
		console.log(email)
	}
	
	OTPSend(){
		event.preventDefault(); 
		var otp_code = ((document.getElementById("your_otp_code") as HTMLInputElement).value);
		var email = ((document.getElementById("email") as HTMLInputElement).value);
		var new_pass = ((document.getElementById("new_pass") as HTMLInputElement).value);
		this.loginService.enterOTP(otp_code,email,new_pass);
	}
  

}
