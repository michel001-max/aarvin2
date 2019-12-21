export var url_text = localStorage.getItem("user_url");
export var api_path = localStorage.getItem("api_path");
export var a_token = localStorage.getItem("auth_token");
console.log('a_token');
console.log(a_token);
//export var url_text = "vimvigr";
export var url_text_check = 'cart';
export var currency_symbol = '$';

export var token_text = 'KEY:GYHYH-SDFTG-67RTY-XCFGH-SDFT8';
//export var a_token = '5a92b72ca3cdb05bb234cff9252e2f5727cc2c4f';
export var first_api = 'https://api.repbro.com/checkAccount'; 
export var start_customer_login = 'https://api.repbro.com/'+url_text+'/startCustomerLogin';
export var second_customer_login = 'https://api.repbro.com/'+url_text+'/customerLogin';
export var productlisting = 'https://api.repbro.com/'+url_text+'/cartproducts';
export var product_sing = 'https://api.repbro.com/'+url_text+'/cartproductDetails';
export var for_pass = 'https://api.repbro.com/'+url_text+'/customerForgetPassword';
export var changepass_otp = 'https://api.repbro.com/'+url_text+'/customerChangePasswordWithOtp';
export var save_order = 'https://api.repbro.com/'+url_text+'/saveorder';
