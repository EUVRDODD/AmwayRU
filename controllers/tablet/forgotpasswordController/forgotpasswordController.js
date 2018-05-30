define({
  applyBindings:function(){
     showLoading("", "", "");
    this.view.brwForgotPassword.onPageFinished=this.dismissLoading.bind(this);
  	this.view.btnBack.onClick=this.goToLoginPage.bind(this);
    
 },
  dismissLoading:function(){
    dismissLoading();
  },
  onNavigate:function(){
   
    this.view.preShow=this.setUrlToBrowser.bind(this);
    this.view.postShow=this.applyBindings.bind(this);
  },
  goToLoginPage:function(){
    var ntf=new kony.mvc.Navigation("loginpage");
    ntf.navigate();
  },
  
   showNotification:function(){
    try{
      controllerReference.view.Popup.isVisible=true;
    }catch(e){}
  },
  

  
  setUrlToBrowser:function(){
    controllerReference=this;
    this.view.brwForgotPassword.showProgressIndicator=false;
    var urlConf = {
      URL : "https://www.amway.in/store/amway/en/INR/login/pw/setUser?cid=content-hub-app",
      requestMethod:constants.BROWSER_REQUEST_METHOD_GET
    };
  this.view.brwForgotPassword.requestURLConfig=urlConf;
  this.view.brwForgotPassword.handleRequest = this.handleBrwReq;
    
    dismissLoading3Sec();
},
  
  handleBrwReq:function(browserWidget, params) {
    var originalURL = params["originalURL"];
    //alert(originalURL);
    if (originalURL == "https://www.amway.in/store/amway/en/INR/" || 
        originalURL=="http://www.amway.in/store/amway/en/INR/static-pages/termsOfUse" || 
        originalURL=="http://www.amway.in/store/amway/en/INR/static-pages/privacyPolicy"|| 
        originalURL=="http://www.amway.in/store/amway/en/INR/static-pages/ABO_PCPrivacyPolicy"|| 
        originalURL=="http://www.amway.in/store/amway/en/INR/search/distributorSearch" ||
       	originalURL=="http://www.amway.in/store/amway/en/INR/static-pages/amwayEmailUs"||
       	originalURL=="http://www.amway.in/store/amway/en/INR/static-pages/staticPages/amwayDownloadsPage" ||
       	originalURL=="https://www.amway.in/store/amway/en/INR") {   
      return true;
    }else{
      return false;
    }
  }
  
 });