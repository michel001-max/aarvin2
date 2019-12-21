import { Component, OnInit } from '@angular/core';
//import { ForgotService } from '../../shared/services/forgot.service';
import { LoginService } from '../../shared/services/login.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
	
	

  constructor(private httpClient: HttpClient,private loginService: LoginService) { }

  ngOnInit() {
  }
  
    changePassword(){
		event.preventDefault(); 
		
		var otp_code = ((document.getElementById("otp_code") as HTMLInputElement).value);
		var old_pass = ((document.getElementById("old_pass") as HTMLInputElement).value);
		//this.loginService.changePasswordOTP(otp_code,old_pass);
		
	}
	
	OTPSend(){
		
	}

}
