define({

  applyBindings: function() {
    controllerReference = this;
    this.view.btnHome.onClick = this.navigateToHomePage.bind(this);
    this.view.btnMyContent.onClick = this.navigateToMyContent.bind(this);
    this.view.btnSettings.onClick = this.navigateToSettings.bind(this);

    // this.view.SideDrawer.flexCloseButtonContainer.onClick = controllerReference.closeSideDrawer.bind( this );
    //this.view.SideDrawer.flexInvisibleTouchArea.onClick = controllerReference.closeSideDrawer.bind( this );
    this.view.btnback.onClick=this.openSideDrawer.bind( this );
    this.view.onDeviceBack=this.checkGoBack.bind(this);
    this.view.postShow = this.goToWebappPostShow.bind(this);
    //pageComponents = ["Popup","SideDrawer"];
    this.view.flxAppsTab.onClick=this.moveToApps.bind(this);
    this.view.flxWebsitesTab.onClick=this.moveToWebsites.bind(this);
    //this.view.flxToolsTab.setEnabled(false);	// to suppress the tools tab
    //this.view.flxAppsTab.setEnabled(false);	// to suppress the Apps tab
  },






  tealiumApps:function(){
    //kony.print("jani >>> websites true");
    //pageComponents = ["Popup","SideDrawer"];
    //callTealiumOnClick("click_action","APPS",["flxAppsTab"],gblVisitor_imcID);
    var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"APPS"
    	 };
     callTealiumOnClick(onClickDetails,["flxAppsTab"], false);
  },

  tealiumWebsites:function(){

    //kony.print("jani >>> websites true");
    //pageComponents = ["Popup","SideDrawer"];
    //callTealiumOnClick("click_action","WEBSITES",["flxWebsitesTab"],gblVisitor_imcID);
    var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"WEBSITES"
    	 };
     callTealiumOnClick(onClickDetails,["flxWebsitesTab"], false);
  },

  moveToApps:function(){
    if(this.view.flxLineApps.centerX !=="50%"){
      animate(this.view.filterContent1,{"left":"0%"},0.5);
      animate(this.view.filterContent2,{"left":"100%"},0.5);
      animate2(this.view.flxLineWeb,{"centerX":"50%"},{"centerX":"-50%"},0.3,this.tealiumApps.bind(this)); 
      animate2(this.view.flxLineApps,{"centerX":"150%"},{"centerX":"50%"},0.6); 
    }
  },

  moveToWebsites:function(){
    if(this.view.flxLineWeb.centerX !=="50%"){
      animate(this.view.filterContent2,{"left":"0%"},0.5);
      animate(this.view.filterContent1,{"left":"-100%"},0.5);
      animate2(this.view.flxLineApps,{"centerX":"50%"},{"centerX":"150%"},0.3,this.tealiumWebsites.bind(this)); 
      animate2(this.view.flxLineWeb,{"centerX":"-50%"},{"centerX":"50%"},0.6); 
    }

  },

  PostshowAnalytics :function(formName){
    var  additionalArg = ["Popup","SideDrawer"];
    //additionalArg.push(this.view.id);
    kony.print("Tealium form widgets json for webapp page :: "+JSON.stringify(additionalArg));
    callTealiumOnScreenLoad(this.view,additionalArg,gblVisitor_imcID);
  },

  goToWebappPostShow : function(){
    try{
      //controllerReference.PostshowAnalytics(this.view);
     var  additionalArg = ["Popup","SideDrawer"];
     kony.print("Tealium form widgets json for webapp page :: "+JSON.stringify(additionalArg));
     callTealiumOnScreenLoad(this.view,additionalArg,null,false);
    }catch(e){

    }


    gblCurrentForm="webapppage";
    var prevForm = kony.application.getPreviousForm().id ;
    //         if(prevForm == "homepage"){
    //           kony.print("jani >>> homepage page pushing");
    //           gblFormBack.push(prevForm);
    //         }else if(prevForm == "mycontentpage"){
    //           kony.print("jani >>> mycontentpage page pushing");
    //           gblFormBack.push(prevForm);
    //         }else if(prevForm == "settingpage"){
    //           kony.print("jani >>> settingpage page pushing");

    //         }
    if(prevForm!="nutriliteWow")
      gblFormBack.push(prevForm);
    //kony.print(" jani >>> gblFormback list length searchresultspage :"+gblFormBack.length);
    kony.print(" jani >>> webapp page previous form " +prevForm);

  },
  showNotification:function(){
    try{
      controllerReference.view.Popup.isVisible=true;
    }catch(e){}
  },


  checkGoBack:function(){
    if(this.view.SideDrawerWC.flxClosePopupVisible){
      this.view.SideDrawerWC.flxClosePopupVisible=false;

      //this.view.SideDrawer.scrollSideDrawerContainer.enableScrolling=true;
    }else if(this.view.flxMainPopup.isVisible){
      this.view.flxMainPopup.isVisible=false;
    }else{

      var ntf;

      var prevForm = gblFormBack.pop();
      kony.print("jani >>> webapp page gblFormBack :" +gblFormBack);
      kony.print("jani >>> onback button prev form"+prevForm);
      ntf = new kony.mvc.Navigation(prevForm); 

      ntf.navigate();
    }
  },
  openSideDrawer: function() {

    /*
    if( this.view.SideDrawer.Accordion4.height == "84dp" ){

      this.view.SideDrawer.Accordion4.height="0dp";
      this.view.SideDrawer.flexToolsContainer.height = "162dp";
      this.view.SideDrawer.AccordionActive4.isVisible = false;



    }

    if( this.view.SideDrawer.Accordion6.height == "42dp" ){

      this.view.SideDrawer.Accordion6.height="0dp";
      this.view.SideDrawer.flexToolsContainer.height = "162dp";
      this.view.SideDrawer.AccordionActive6.isVisible = false;



    }

    if( this.view.SideDrawer.Accordion7.height == "42dp" ){
      this.view.SideDrawer.Accordion7.height="0dp";
      this.view.SideDrawer.flexToolsContainer.height = "162dp";
      this.view.SideDrawer.AccordionActive7.isVisible = false;



    }

    if( this.view.SideDrawer.Accordion8.height == "84dp" ){


      this.view.SideDrawer.Accordion8.height="0dp";
      this.view.SideDrawer.flexToolsContainer.height = "162dp";
      this.view.SideDrawer.AccordionActive8.isVisible = false;

    }
*/
    animate( this.view.flexSideDrawer, { "left": "0%" } );
  },

  dismissPopup:function(){
    this.view.flxMainPopup.isVisible=false;
  },

  closeSideDrawer: function() {
    animateSideDrawer( controllerReference.view.flexSideDrawer, {"left":"-100%"} );

    //animate( this.view.flexSideDrawer, { "left": "-100%" } );

  },
  setDataOnSegments: function() {

    if(!webpageHamburger){
      this.view.SideDrawerWC.createSideDrawer();
      webpageHamburger=true;
    }

    this.view.FlexScrollContainer0e40297e9488c4d.contentOffset={x:"0%",y:"0%"};
    this.view.flxToast.isVisible=false;
    this.view.flexSideDrawer.left = "-100%";
    this.view.flxMainPopup.isVisible=false;
    this.view.flxMainPopup.onTouchStart=function(){
      kony.print("waiting for someone to write something amazing");
    };

    this.view.flxDismiss.onClick=this.dismissPopup.bind(this);
    this.view.btnDownload.onClick=this.OpenStore.bind(this);
    this.view.btnOpenInBrowser.onClick=this.OpenBrowser.bind(this);
    controllerReference.closeSideDrawer();
    this.view.SideDrawerWC.flxClosePopupVisible=false;
    //this.view.SideDrawer.scrollSideDrawerContainer.contentOffset = {x:"0",y:"0"};
    //this.view.SideDrawer.scrollSideDrawerContainer.enableScrolling=true;


    // this.setDataOnToolsSegment();
    this.setDataOnWebsitesSegment();
    this.setDataOnAppsSegment();
    try{
      if(!gblShowApps){
        this.view.filterContent1.left = "0%"
        //this.view.flxLineApps.isVisible = true;
        this.view.flxLineApps.centerX="50%";
        this.view.filterContent2.left = "100%"
        this.view.flxLineWeb.centerX="-50%";
        //this.view.flxLineWeb.isVisible = false;
      }else{
        gblShowApps = false;
      }
    }catch(e){
      kony.print("Exception in preshow ::"+e);
    }
  },

  //   	onNavigate:function(){
  //   	this.view.postShow=this.applyBindings.bind(this);
  //     },

  disableFlex: function() {
    this.view.flxToast.setVisibility(false);
    try{
      kony.timer.cancel("timerid");	
    }catch(e){}
  },
  trackEventAnalytics : function(event_name,click_detail,pageComponents){
    var dataOnclickArray = {
      "app_type": getDevicePlatform() , //ios or android sent by OS of the device
      "app_country": "in",
      "app_language": getDeviceLanguage(),
      "app_digitalProperty": "Amway Business app",
      "app_region": "eia",
      "event_name": event_name, //"click_action",
      "click_detail": click_detail,//"header login",
      "click_category":"footer",
      "visitor_imcID":gblVisitor_imcID,
      "page_components": pageComponents
    };
    Tealium.trackEvent("click_action", JSON.stringify(dataOnclickArray), "eia-hub-app");
  },

  /*
  aboutPersonalCareData : function() {

    gblFilterCategory = gblPersonalCare;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },

  aboutNutriliteData : function() {

    gblFilterCategory = gblNutrilite;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },

  aboutBeautyData : function() {

    gblFilterCategory = gblBeauty;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },

  aboutLearning : function() {

    gblFilterCategory = gblLearning;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutSeminars : function() {

    gblFilterCategory = gblSeminars;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutBrochures : function() {

    gblFilterCategory = gblBrochures;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutRecognition : function() {

    gblFilterCategory = gblRecognition;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutOppurtunity : function() {

    gblFilterCategory = gblOpportunity;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutCorporateSocial : function() {

    gblFilterCategory = gblCorporate;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutMedia : function() {

    gblFilterCategory = gblMedia;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutManufacturing : function() {

    gblFilterCategory = gblManufacturing;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutAwards : function() {

    gblFilterCategory = gblAwards;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutFacts : function() {

    gblFilterCategory = gblFactSheets;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutHeritage : function() {

    gblFilterCategory = gblheritage;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutAtHomeData : function() {

    gblFilterCategory = gblAtHome;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },

  aboutMoreProductsData : function() {

    gblFilterCategory = gblMoreProducts;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },

  aboutAmwayData : function() {

    gblFilterCategory = gblAboutAmway;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },

  animateSideDrawer : function(element, params, duration) {
    duration = duration || 0.25;
    params.stepConfig = {
      "timingFunction": kony.anim.EASE
    };
    element.animate(
      kony.ui.createAnimation({
        "100": params,
      }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": duration
      }, {
        "animationEnd":function(){}
      });
  },

  */
  navigateToHomePage : function() {
    //controllerReference.trackEventAnalytics("click_action", "navigate_homepage",["btnHome"]);
    var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"navigate_homepage",
      	"click_category":"footer"
    	 };
     callTealiumOnClick(onClickDetails,["btnHome"], false);
    var navObj = new kony.mvc.Navigation("homepage");
    //gblFilterCategory = "";
    navObj.navigate();

  },
  navigateToMyContent : function() {
    //this.trackEventAnalytics("click_action", "navigate_mycontent",["btnMyContent"]);
    var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"navigate_mycontent",
      	"click_category":"footer"
    	 };
     callTealiumOnClick(onClickDetails,["btnMyContent"], false);
    var navObj = new kony.mvc.Navigation("mycontentpage");

    navObj.navigate();
  },

  navigateToSettings : function() {
    //this.trackEventAnalytics("click_action", "navigate_settingpage",["btnSettings"]);
    var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"navigate_settingpage",
      	"click_category":"footer"
    	 };
     callTealiumOnClick(onClickDetails,["btnSettings"], false);
    var navObj = new kony.mvc.Navigation("settingpage");
    navObj.navigate();
  },

  setDataOnToolsSegment: function() {
    //this.view.flxToolsTab.setEnabled(false);	// to suppress the tools tab
    /*    var data = [];
        data.push({
            "btnOpen": {
                "text": "OPEN",
                onClick: this.openQRCodeScanner
            },
            "lblTitle": "QR code scanner",
            "imgIcon": "amywayapp.png",
            "lblDesc": ""
        });
        this.view.segTools.setData(data);	*/
  },

  setDataOnWebsitesSegment: function() {
    try{
      var data = [];
      data.push({
        "btnOpen": {
          "text": "OPEN",
          onClick:function(){
            //callTealiumOnClick("click_action", "Amway India",["btnOpen"],gblVisitor_imcID);
            var onClickDetails = {
                "event_name":"click_action",
                "click_detail":"Amway India"
                };
             callTealiumOnClick(onClickDetails,["btnOpen"], false);
            // kony.application.openURL("https://www.amway.in/");
            if (!isNetworkAvailable())
            {
              controllerReference.view.flxToast.setVisibility(true);
              try{
                kony.timer.cancel("timerid");	
              }catch(e){}			
              kony.timer.schedule("timerid", controllerReference.disableFlex, 5, false);
            }else{
              title="Amway India";
              var ntf= new kony.mvc.Navigation("nutriliteWow");
              ntf.navigate(title);
            }

          }
        },
        "lblTitle": "Amway India",
        "imgIcon": "amwayindiawebsiteimage.jpg",
        "lblDesc": "www.amway.in"
      });
      //         data.push({
      //           "btnOpen": {
      //             "text": "OPEN",
      //             onClick:function(){
      //               callTealiumOnClick("click_action", "MyBiz",["btnOpen"],gblVisitor_imcID);
      //               // kony.application.openURL("https://mybiz.amway.com/");
      //               if (!isNetworkAvailable())
      //               {
      //                 controllerReference.view.flxToast.setVisibility(true);
      //                 try{
      //                   kony.timer.cancel("timerid");	
      //                 }catch(e){}			
      //                 kony.timer.schedule("timerid", controllerReference.disableFlex, 5, false);
      //               }else{
      //                 title="MyBiz";
      //                 var ntf= new kony.mvc.Navigation("nutriliteWow");
      //                 ntf.navigate(title);
      //               }
      //             }
      //           },
      //           "lblTitle": "MyBiz",
      //           "imgIcon": "mybiz.jpg",
      //           "lblDesc": "mybiz.amway.com"
      //         });

      var title1="Artistry Skincare Recommender";

      if(kony.os.deviceInfo().name=="iPad"){

        title1="Artistry Skincare Recom...";
      }

      data.push({
        "btnOpen": {
          "text": "OPEN",
          onClick:function(){
            //callTealiumOnClick("click_action", "Artistry Skincare Recommender",["btnOpen"],gblVisitor_imcID);
            var onClickDetails = {
                "event_name":"click_action",
                "click_detail":"Artistry Skincare Recommender"
                };
             callTealiumOnClick(onClickDetails,["btnOpen"], false);
            //kony.application.openURL("http://artistryrecommender.amway.in/");
            if (!isNetworkAvailable())
            {
              controllerReference.view.flxToast.setVisibility(true);
              try{
                kony.timer.cancel("timerid");	
              }catch(e){}			
              kony.timer.schedule("timerid", controllerReference.disableFlex, 5, false);
            }else{
              title="Artistry Skincare Recommender";

              var ntf= new kony.mvc.Navigation("nutriliteWow");
              ntf.navigate(title);
            }
          }
        },


        "lblTitle": title1,
        "imgIcon": "artistryskincarerecommenderimage.jpg",
        "lblDesc": "artistryrecommender.amway.in"
      });

      //       data.push({
      //             "btnOpen": {
      //                 "text": "OPEN",
      //                 onClick:function(){
      //                   kony.application.openURL("http://nutriliterecommender.amway.in/");
      //                 }
      //             },
      //             "lblTitle": "Nutrilite Product Recommender",
      //             "imgIcon": "nutriliteproductrecommenderimage.jpg",
      //             "lblDesc": "nutriliterecommender.amway.in"
      //         });


      data.push({
        "btnOpen": {
          "text": "OPEN",
          onClick:function(){
            //callTealiumOnClick("click_action", "Nutrilite Wow Analyzer",["btnOpen"],gblVisitor_imcID);
            var onClickDetails = {
                "event_name":"click_action",
                "click_detail":"Nutrilite Wow Analyzer"
                };
             callTealiumOnClick(onClickDetails,["btnOpen"], false);
            //kony.application.openURL("https://www.nutrilitewow.com/");
            if (!isNetworkAvailable())
            {
              controllerReference.view.flxToast.setVisibility(true);
              try{
                kony.timer.cancel("timerid");	
              }catch(e){}			
              kony.timer.schedule("timerid", controllerReference.disableFlex, 5, false);
            }else{
              title="";
              var ntf= new kony.mvc.Navigation("nutriliteWow");
              ntf.navigate(title);
            }
          }
        },
        "lblTitle": "Nutrilite W.O.W. Program",
        "imgIcon": "nutrilitewowanalyzerimage.jpg",
        "lblDesc": "www.nutrilitewow.com"
      });

      //       	for (i = 0; i < data.length; i++)
      //         {
      //           	if (data[i].lblTitle.length > 20)
      //             {
      //               	data[i].lblTitle = data[i].lblTitle.substr(0, 20) + "...";
      //             }  
      //         }


      this.view.segWebsites.setData(data);
    }catch(e){
      kony.print("Exception in setDataOnWebsitesSegment :"+e);
    }


  },

  setDataOnAppsSegment: function() {
    try{
      this.view.flxAppsTab.setEnabled(true);	// to suppress the Apps tab
      var data = [];

      data.push({
        "btnOpen": {
          "text": "OPEN",
          onClick: this.openAmwayApp
        },
        "lblTitle": "Amway India App",
        "imgIcon": "amwayindiaappimage.jpg",
        "lblDesc": ""
      });
      //       data.push({
      //             "btnOpen": {
      //                 "text": "OPEN",
      //                 onClick: this.openNutriliteWowApp
      //             },
      //             "lblTitle": "Nutrilite Wow App",
      //             "imgIcon": "nutrilitewowappimage.jpg",
      //             "lblDesc": ""
      //         });

      this.view.segApps.setData(data);	
    }catch(e){
      kony.print("Exception in setDataOnAppsSegment :"+e);
    }

  },

  openQRCodeScanner: function() {
    //TODO scan the QR code 
    /*var ntf = new kony.mvc.Navigation("incomeSimulatorHome");
        ntf.navigate();*/
  },

  openAmwayApp: function() {
    //callTealiumOnClick("click_action", "Amway India App",["btnOpen"],gblVisitor_imcID);
    var onClickDetails = {
                "event_name":"click_action",
                "click_detail":"Amway India App"
                };
             callTealiumOnClick(onClickDetails,["btnOpen"], false);
    var deviceName = kony.os.deviceInfo().name;
    selectedData = this.view.segApps.selectedItems[0];
    if (deviceName == "android") {
      var KonyMain = java.import("com.konylabs.android.KonyMain");
      var PackageManager = java.import("android.content.pm.PackageManager");

      var pm = KonyMain.getActContext().getPackageManager();

      try {
        pm.getPackageInfo("com.orgname.AmwayMcommerce", PackageManager.GET_ACTIVITIES);
        kony.application.openURL("amwaymcommerce://com.orgname.AmwayMcommerce");
      } catch (e) {
        if (!isNetworkAvailable()){
          controllerReference.view.flxToast.setVisibility(true);
          try{
            kony.timer.cancel("timerid");	
          }catch(e){}			
          kony.timer.schedule("timerid", controllerReference.disableFlex, 5, false);
        }else{

          //show Popup
          //this.showPopup();

          kony.application.openURL("https://play.google.com/store/apps/details?id=com.orgname.amwaymcommerce");

        }




      }
    } 
    else {
      kony.print("entered iOS case");
      var url = "amwaymcommerce://";
      var canOpenUrl = com.kony.isAppInstalled(
        /**String*/
        url);
      kony.print("end of  iOS case" + canOpenUrl);

      if (canOpenUrl) {
        kony.application.openURL("amwaymcommerce://");
      } else {
        if (!isNetworkAvailable()){
          controllerReference.view.flxToast.setVisibility(true);
          try{
            kony.timer.cancel("timerid");	
          }catch(e){}			
          kony.timer.schedule("timerid", controllerReference.disableFlex, 5, false);
        }else{

          //show Popup
          // this.showPopup();
          kony.application.openURL("https://itunes.apple.com/in/app/amwayindia/id1198927478?mt=8");
        }
      }
    }


  },

  OpenStore:function(){


    this.view.flxMainPopup.isVisible=false;

    if (!isIOS()){
      kony.application.openURL("https://play.google.com/store/apps/details?id=com.orgname.amwaymcommerce");
    }else{
      kony.application.openURL("https://itunes.apple.com/in/app/amwayindia/id1198927478?mt=8");
    }
  },

  OpenBrowser:function(){

    this.view.flxMainPopup.isVisible=false;

    title="Shop Online";
    var ntf=new kony.mvc.Navigation("nutriliteWow");
    ntf.navigate(title);
  },

  showPopup:function(){
    this.view.flxMainPopup.isVisible=true;
  },

  openOnlineShopping: function(){
    kony.application.openURL("https://www.amway.in");
  },
  openNutriliteWowApp: function(){
    //TODO open app 	
    //kony.application.openURL("https://www.amway.in");
  },
  onNavigate : function() {
    this.view.preShow=this.setDataOnSegments.bind(this);
    this.applyBindings();
  }


});