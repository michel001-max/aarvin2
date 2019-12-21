import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  
  getRequest(){
	  console.log('get request');
  }
  
}
