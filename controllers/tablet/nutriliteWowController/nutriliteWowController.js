define({ 

  applyBindings:function(){
    this.view.btnBack.onClick=this.goToBackPage.bind(this);
    this.view.preShow=this.setUrlToBrowser.bind(this);
    //this.view.onHide = this.destroyForm.bind(this);
    this.view.onDeviceBack=this.goToBackPage.bind(this);
    this.view.postShow = this.goToPostshow.bind(this);
   	
  },

  pageFinished:function(){
    gblNutriliteDismiss = true;
    kony.print("Tre page finished");
    dismissLoading();
  },
  showNotification:function(){
    try{
      controllerReference.view.Popup.isVisible=true;
    }catch(e){}
  },
	onSuccessEvent:function(){
      kony.print("tre onSuccessEvent ");
    },
  	onFailureEvent:function(){
      kony.print("tre onFailureEvent ");
    },
  onPageStartEvent:function(){
      kony.print("tre onSuccessEvent ");
    },
  dismissLoadingForNutrilite:function(){
				dismissLoading();
			  },
  goToPostshow : function(){
    
     if(this.view.lblHeader.text == "Nutrilite W.O.W. Program"){
       try{
			 kony.timer.cancel("nutriliteTimer");	
		}catch(e){}
       kony.timer.schedule("nutriliteTimer", this.dismissLoadingForNutrilite.bind(this), 5, false);
     }
     if(!gblNutriliteDismiss) {
       kony.application.showLoadingScreen("", "Loading...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, null);
     } else{
       gblNutriliteDismiss = false;
     }
    controllerReference.view.brwNutriliteWow.onPageStarted = this.onPageStartEvent.bind(this);
    controllerReference.view.brwNutriliteWow.onSuccess = this.onSuccessEvent.bind(this);
    controllerReference.view.brwNutriliteWow.onFailure = this.onFailureEvent.bind(this);
    controllerReference.view.brwNutriliteWow.onPageFinished=this.pageFinished.bind(this);
    var prevForm = kony.application.getPreviousForm().id ;
    kony.print(" jani >>> contentdetailpage previous form " +prevForm);
    if(prevForm == "contentdetailpage"){
      gblFormBack.push(prevForm);
    }
    else if(prevForm == "homepage"){
      gblFormBack.push(prevForm);
    }
    else if(prevForm == "mycontentpage"){
      gblFormBack.push(prevForm);
    }
	

  },
 

  /*   checkGoBack:function(){
    if(!isNetworkAvailable() && this.getPreviousForm()=="homepage"){
      var navObj = new kony.mvc.Navigation("mycontentpage");
      navObj.navigate();
    }else{
      var ntf;
      var prevForm = gblFormBack.pop();
      kony.print("jani >>> onback button nutriliteWow prev form"+prevForm);
      ntf = new kony.mvc.Navigation(prevForm);
      ntf.navigate(urlData);
    }
  },		*/
  goToBackPage:function(){
    try{
      if(this.getPreviousForm()=="searchresultspage")comingFromContent=true;
      	gblNutriliteDismiss = false;
      	if(this.getPreviousForm() == "webapppage"){
          kony.print("tre Previous form is webapp page");
          gblShowApps = true;
        }
      	var ntf=new kony.mvc.Navigation(this.getPreviousForm());
        ntf.navigate(urlData);
        kony.application.destroyForm("nutriliteWow");
      	dismissLoading();
    }catch(e){
      kony.print("exception is::"+e);
    }
    
  },

  onNavigate:function(data){
   
    urlData = data;
    kony.print("URL data in nutriliteWow : " + JSON.stringify(urlData));
    this.applyBindings();

  },
 

  setUrlToBrowser:function(){
    
    try{
       controllerReference=this;
    	controllerReference.view.brwNutriliteWow.showProgressIndicator=false;
      kony.print("urlData : " + JSON.stringify(urlData));
      if (!isBlankOrNull(urlData))
      {
        this.view.lblHeader.text = "";
        if ((!isBlankOrNull(urlData.contentType) && urlData.contentType === "html") )
        {
          kony.print("Sreeni this is HTML content");
          var requestURL = {
            URL : urlData.url,
            requestMethod : constants.BROWSER_REQUEST_METHOD_GET
          };
          controllerReference.view.brwNutriliteWow.requestURLConfig = requestURL;
        }else if(typeof (urlData) === "string"){
          var url;
          kony.print("Sreeni this is string");
          if(urlData === "Shop Online"){
            url="https://www.amway.in";
          }else if(urlData === "Product Catalogue"){       
            kony.print("In Product Catalogue");
             //kony.application.openURL("http://www.amway.in/store/amway/en/INR/lmsSearch/lmsHandler?LMSURL=https%3a%2f%2findia.amwayuniversity.com%2fcourses%2fapp%2fmanagement%2fLMS_CNT_SilentLaunch.aspx%3fUserMode%3d0%26ActivityId%3d2555%26lang%3den-US");
            url="http://www.amway.in/store/amway/en/INR/lmsSearch/lmsHandler?LMSURL=https%3a%2f%2findia.amwayuniversity.com%2fcourses%2fapp%2fmanagement%2fLMS_CNT_SilentLaunch.aspx%3fUserMode%3d0%26ActivityId%3d2555%26lang%3den-US";
          }else if(urlData === "Nutrilite Product Recommender"){
            url="http://nutriliterecommender.amway.in/" ;
          }else if(urlData === "Artistry Skincare Recommender"){
            url="http://artistryrecommender.amway.in/" ; 
          }else if(urlData === "MyBiz") {
            url = "https://mybiz.amway.com/";
          }else if(urlData==="Amway India"){
            url = "https://www.amway.in/";
          }
          this.setSideDrawerListUrl(urlData,url);
        }
        else{
          kony.print("Sreeni this is PDF content : " + urlData.url);
          controllerReference.view.brwNutriliteWow.htmlString =  '<iframe src="http://docs.google.com/gview?url=' + urlData.url + '&embedded=true" style="width:100%; height:100%;" frameborder="0"></iframe>';
        }
      }
      else
      {
        this.view.lblHeader.text = "Nutrilite W.O.W. Program";
        var urlConf = {
          URL : "https://www.nutrilitewow.com/",
          requestMethod:constants.BROWSER_REQUEST_METHOD_GET
        };
        controllerReference.view.brwNutriliteWow.requestURLConfig=urlConf;
      }


    }catch(e){}


  },

  setSideDrawerListUrl:function(title,url)
  {
    kony.print("Sreeni setting sided url content")
    try{ 
      this.view.lblHeader.text = title;
      var urlConf = {
        URL : url,
        requestMethod:constants.BROWSER_REQUEST_METHOD_GET
      };
      controllerReference.view.brwNutriliteWow.requestURLConfig=urlConf;
    }catch(e){}

  }

});