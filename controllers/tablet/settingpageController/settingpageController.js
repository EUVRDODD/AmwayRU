define({ 


  //Type your controller code here 
  init : function() {
    this.applyBindings();

  },

  applyBindings : function() {
    controllerReference=this;
   // this.view.SideDrawer.flexCloseButtonContainer.onClick = this.closeSideDrawer.bind( this );
    //this.view.SideDrawer.flexInvisibleTouchArea.onClick = this.closeSideDrawer.bind( this );
    this.view.btnback.onClick=this.openSideDrawer.bind( this );

    if(isAndroid() || (isIOS() && getNotificationStatusForApp())){
      try {
        notifications = JSON.parse(kony.store.getItem("notifications"));
        if (notifications === null) {
          kony.store.setItem("notifications", "{}");
          notifications = {};
        }
      } 
      catch (e) {
        kony.print("Error getting notifications interactions" + e);
      }

      if( !isNetworkAvailable() ){

        messageCount = kony.store.getItem("messageCount") || 0;
        messagCount=parseInt(messageCount);
        if(messageCount==0){
          controllerReference.view.Settings.showlbl=false;
        }else{
          controllerReference.view.Settings.showlbl=true;
          controllerReference.view.Settings.setText=messageCount+"";
        }
      }else{
        var startIndex=0;
        var pageSize=50;
        showLoading("", false, false);
        try{
          if(mobileFabricConfiguration.isKonySDKObjectInitialized){
            mobileFabricConfiguration.konysdkObject.getMessagingService().fetchAllMessages(startIndex,
                                                                                           pageSize,
                                                                                           function(response) {
              kony.print("Fetched all messages :" + JSON.stringify(response));
              controllerReference.getCount(response);
            },
                                                                                           function(error) {
              kony.print("Failed to fetch messages : " + JSON.stringify(error));
            }
                                                                                          );
          }else{
            controllerReference.initializeMobileFabric();
          }

        }catch(e){
          dismissLoading();
        }
      }
    }


	//component methods
    this.view.Settings.goToLogOutConfirm(this.showLogoutPopup);
    this.view.Settings.notificationButtonClick(this.goToNotificationsPage);
	this.view.Settings.gotoChangeUserConfirm(this.openChangeUserPopup);

    
    this.view.flxClosePopup.onTouchStart = function(){kony.print("flx close pop clicked")};
    //this.view.Settings.changeLocale();
    this.view.flxToast.isVisible=false;
    this.view.btnLogoutYes.onClick = this.goToLogoutYes.bind(this);
    this.view.btnLogoutNo.onClick = this.goToLogoutNo.bind(this);
    this.view.btnHome.onClick=this.navigateToHomePage.bind(this);
    this.view.onDeviceBack=this.checkGoBack.bind(this);
    this.view.btnMyContent.onClick = this.goToMyContent.bind(this);
    this.view.btnWebpage.onClick = this.goToWebappPage.bind(this);
    this.view.postShow = this.goToSettingsPostshow.bind(this);
	pageComponents = ["Settings","Popup","SideDrawer"];

    //this.view.flxClosePopup.onTouchEnd = this.goToDismissPopup.bind(this);
    this.goTOSettingsPreShow();
	// changeuser
    this.view.flxOpenChangeUserPopup.onTouchStart = function(){"flx open pop up is clicked"};
    this.view.btnChangeuserYes.onClick = this.gotoChangeUserYes.bind(this);
    this.view.btnChangeUserNo.onClick = this.gotoChangeuserNo.bind(this);
	
  },

  goToNotificationsPage : function(){
    if(isIOS() && !getNotificationStatusForApp()){
      alert("Please Enable Notifications , Go to Settings > Notifications and select Digital ToolBox.");
      return;
    }
  
    var ntf = new kony.mvc.Navigation("notificationpage");
    ntf.navigate();
   
  },

  goToSettingsPostshow : function(){
    try{

	gblCurrentForm="settingpage";
      try{
        controllerReference.PostshowAnalytics(this.view);
      }catch(e){
        
      }
      

      var prevForm = kony.application.getPreviousForm().id ;
      if(prevForm!="notificationpage" && prevForm != "nutriliteWow")
        gblFormBack.push(prevForm);
      //kony.print(" jani >>> gblFormback list length searchresultspage :"+gblFormBack.length);
      kony.print(" jani >>> settingpage previous form " +gblFormBack);

    }catch(e){

    }

  },
  PostshowAnalytics :function(formName){
    var  additionalArg = ["Settings","Popup","SideDrawer"];
    //additionalArg.push(this.view.id);
    kony.print("Tealium form widgets json for Settingpage :: "+JSON.stringify(additionalArg));
    callTealiumOnScreenLoad(this.view,additionalArg,gblVisitor_imcID);
  },

  initializeMobileFabric:function() {
    kony.print(" ********** Entering into initializeMobileFabric ********** ");
    try{
      if (isNetworkAvailable()) {
        // showLoading(" ", false, false);
        mobileFabricConfiguration.konysdkObject = new kony.sdk();
        mobileFabricConfiguration.konysdkObject.init(mobileFabricConfiguration.appKey, mobileFabricConfiguration.appSecret, mobileFabricConfiguration.serviceURL, function(response) {
          kony.print(" ********** Success initializeMobileFabricSuccess response : " + JSON.stringify(response) + " ********** ");
          mobileFabricConfiguration.isKonySDKObjectInitialized = true;
          kony.application.dismissLoadingScreen();
          controllerReference.applyBindings();

          kony.print("initialization successful");
          kony.print(" ********** Exiting out of initializeMobileFabricSuccess ********** ");
        }, function(error) {
          kony.print(" ********** Entering into initializeMobileFabricFailure ********** ");
          kony.print(" ********** Failure in initializeMobileFabric: " + JSON.stringify(error) + " ********** ");
          kony.application.dismissLoadingScreen();
          status = {"statusCode" : 2, "statusMessage" : "Error in initializing mobile fabric"};
          kony.print(" ********** Exiting out of initializeMobileFabricFailure ********** ");
        });
      } else {
        kony.application.dismissLoadingScreen();
        status = {"statusCode" : 1, "statusMessage" : "Network Unavailable"};
        kony.print(" ********** Exiting out of initializeMobileFabric ********** ");
      }

    }catch(e){
      kony.print("Error occured while initializing the mobilefabric ");
    }

  },


  getCount:function(response){
    response=response["messages"];
    messageCount=0;

    kony.print("No of records are - "+response.length);

    for(var i=0;i<response.length;i++){
      if(response[i]["status"]=="Submitted"){

        if (!notifications.hasOwnProperty(response[i]["fetchId"])) {

          notifications[response[i]["fetchId"]] = [0, 0]; //read delete

          kony.store.setItem("notifications", JSON.stringify(notifications));
        }

        if(!notifications[response[i]["fetchId"]][1]){

          if(!notifications[response[i]["fetchId"]][0]){
            messageCount++;
          }else{
            kony.print("fetch id is-"+response[i]["fetchId"]);
          }

        }

      }     
    }

    kony.print("message count is "+messageCount);
    try{
      kony.store.setItem("messageCount", messageCount+"");
    }catch(e){
      kony.print("Exception "+e);
      dismissLoading();
    }


    if(messageCount==0){
      controllerReference.view.Settings.showlbl=false;
    }else{
      controllerReference.view.Settings.setText=messageCount+"";
      controllerReference.view.Settings.showlbl=true;

    }

    dismissLoading();
  },


  checkGoBack:function(){
    // Added Logic to dismiss Logout pop up if it is visible
    if(this.view.flxClosePopup.isVisible){
      this.view.flxClosePopup.isVisible = false;
      //var navObj = new kony.mvc.Navigation(this.getCurrentForm());
      //navObj.navigate();
    }
    else if(this.view.flxOpenChangeUserPopup.isVisible){
      this.view.flxOpenChangeUserPopup.isVisible = false;
        }
	else if(this.view.SideDrawerWC.flxClosePopupVisible){
      this.view.SideDrawerWC.flxClosePopupVisible=false;
      //this.view.SideDrawer.scrollSideDrawerContainer.enableScrolling=true;
    }else{

      var prevForm=gblFormBack.pop();

      var navObj = new kony.mvc.Navigation(prevForm);
      navObj.navigate();
    }

    //       //navObj.navigate();

    //     else{
    //       //var navObj = new kony.mvc.Navigation("homepage");
    //       //navObj.navigate();

    //       var ntf;
    //       if(isNetworkAvailable()){
    // //         if(gblFormBack.length !==0){
    // //           gblFormBack.splice(-1);
    // //         }
    //         var prevForm = gblFormBack.pop();
    //         kony.print("jani >>> setting page gblFormBack :" +gblFormBack);
    //         kony.print("jani >>> onback button prev form"+prevForm);
    //         ntf = new kony.mvc.Navigation(prevForm); 
    //         //ntf.navigate();
    //       }else{
    //         ntf=new kony.mvc.Navigation("homepage"); 
    //       }

    //       ntf.navigate();
    //     }
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
  closeSideDrawer: function() {
    animateSideDrawer( controllerReference.view.flexSideDrawer, {"left":"-100%"} );
    

  },


  trackEventAnalytics : function(event_name,click_detail , pageComponents){
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
  navigateToHomePage:function(){
    controllerReference.trackEventAnalytics("click_action", "navigate_homepage",["btnHome"]);
    var ntf=new kony.mvc.Navigation("homepage");
    // gblFilterCategory = "";
    ntf.navigate();


  },

  goToMyContent : function() {
    this.trackEventAnalytics("click_action", "navigate_mycontent" , ["btnMyContent"]);
    var ntf=new kony.mvc.Navigation("mycontentpage");
    ntf.navigate();
  },

  goToWebappPage : function() {
    this.trackEventAnalytics("click_action", "navigate_webapppage" ,["btnWebpage"]);
    var ntf=new kony.mvc.Navigation("webapppage");
    ntf.navigate();
  },


  disableFlex: function() {
    this.view.flxToast.setVisibility(false);
    try{
      kony.timer.cancel("timerid");	
    }catch(e){}
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
  aboutAmwayData : function() {

    gblFilterCategory = gblAboutAmway;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },

*/
  goToLogoutYes : function(){
    callTealiumOnClick("click_action","Logout_Yes",["btnLogoutYes"],gblVisitor_imcID);
    clearLoginTokenFromStore();
    gblFilterCategory = "";
    gblVisitor_imcID = "";
    LoggedIn=false;
    var ntf = new kony.mvc.Navigation("preLoginpage");
    ntf.navigate();

  },

  goToLogoutNo : function(){
    callTealiumOnClick("click_action","Logout_No",["btnLogoutNo"],gblVisitor_imcID);
    this.view.flxClosePopup.setVisibility(false);
  },

  gotoChangeUserYes : function(){
    kony.print("goto change user YES called");
    callTealiumOnClick("click_action","ChangeUser",["btnChangeuserYes"],gblVisitor_imcID);
    clearLoginTokenFromStore();// if change user clicked present login will removed from store
    gblFilterCategory = "";
    gblVisitor_imcID = "";
    LoggedIn=false;
    var ntf = new kony.mvc.Navigation("preLoginpage");
    ntf.navigate();
    this.view.flxOpenChangeUserPopup.setVisibility(false);
  },
  
  gotoChangeuserNo : function(){
    callTealiumOnClick("click_action","ChangeUser_No",["btnChangeUserNo"],gblVisitor_imcID);
    this.view.flxOpenChangeUserPopup.setVisibility(false);
    kony.print("goto change user No called");
  },

  
  goTOSettingsPreShow : function(){

    if(!settingHamburger){
      this.view.SideDrawerWC.createSideDrawer();
      settingHamburger=true;
    }
    controllerReference=this;
    this.view.flxClosePopup.setVisibility(false); 
    this.view.flxToast.isVisible=false;
    this.view.flexSideDrawer.left = "-100%";
    this.closeSideDrawer();
    this.view.SideDrawerWC.flxClosePopupVisible=false;
    //this.view.SideDrawer.scrollSideDrawerContainer.contentOffset = {x:"0",y:"0"};
    //this.view.SideDrawer.scrollSideDrawerContainer.enableScrolling=true;

  },

  showLogoutPopup:function(){
    this.view.flxClosePopup.setVisibility(true); 
  },

  openChangeUserPopup:function(){
    kony.print("openChangeUserPopup called");
    this.view.flxOpenChangeUserPopup.setVisibility(true);
  },
  
  goToDismissPopup : function(){
    this.view.flxClosePopup.setVisibility(false);
  },

  onNavigate: function() {

    this.init();
  },


  showNotification:function(){
    try{
      controllerReference.view.Popup.isVisible=true;
    }catch(e){}
  },



});