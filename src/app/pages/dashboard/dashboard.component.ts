import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
	checkLogout(){
		localStorage.removeItem("isLoggedIn");
		localStorage.removeItem("user_url");
		localStorage.removeItem("email");
		window.location.href="/pages/login";
	}

}
