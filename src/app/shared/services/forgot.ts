import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { url_text, token_text, first_api, second_customer_login, start_customer_login, for_pass, changepass_otp } from '../../variables';
import * as $ from 'jquery';// import Jquery here 
//import {ROUTER_DIRECTIVES, Router, Location} from "angular2/router";

var base_url = url_text
var token = token_text
var startCLogin = start_customer_login
var cLogin = second_customer_login 
var check_account = first_api
var customerFPassword = for_pass
var cPasswordOTP = changepass_otp

@Injectable({
  providedIn: 'root'
})
export class LoginService {
	
	constructor(private httpClient: HttpClient) { }
	
	/******check email******/
}
