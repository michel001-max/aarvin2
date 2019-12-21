import { Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { DemoComponent } from './demo/demo.component';

var dynamic_urlValue = localStorage.getItem("user_url");
var islogin = localStorage.getItem("isLoggedIn");
//var dynamic_urlValue = "vimvigr";
 
console.log(dynamic_urlValue);

//var page_redirect = "";
if(dynamic_urlValue !== null) {
	console.log('1111111');
	
} else{
	/* if(islogin=="true"){
		//page_redirect = "collection/all";
	} else{
	} */
	dynamic_urlValue = "";
		
	//window.location  =  "vimvigr/pages/login";
	console.log('00000000000');
	
} 
export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'demo',
    component: DemoComponent
  },
  {
    path: dynamic_urlValue,
    component: MainComponent, 
    children: [
      {
        path: '',
        loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)
      },
      {
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      },
      {
        path: 'blog',
        loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)
      }
    ]
  } ,
  {
    path: '**',
    redirectTo: dynamic_urlValue
  } 
]; 

