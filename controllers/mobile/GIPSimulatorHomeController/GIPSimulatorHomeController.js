define({ 

  onNavigate:function(){
    //this.view.preShow=this.applyBindings.bind(this);
    this.applyBindings();
  },

  applyBindings:function(){
    this.view.preShow=this.GIPPreshow.bind(this);
    this.view.postShow=this.GIPPostShow.bind(this);
    this.view.flxToast.isVisible=false;
    //this.view.SideDrawer.flexCloseButtonContainer.onClick = this.closeSideDrawer.bind( this );
    //this.view.SideDrawer.flexInvisibleTouchArea.onClick = this.closeSideDrawer.bind( this );
    this.view.btnBack.onClick=this.openSideDrawer.bind(this);

    this.view.btnHome.onClick=this.goToHomepage.bind(this);
    this.view.btnMyContent.onClick=this.goToMyContentPage.bind(this);
    this.view.btnSettings.onClick=this.goToSettingsPage.bind(this);
    this.view.btnWebpage.onClick=this.goBackToTools.bind(this);

    this.view.btnSimulator.onClick=this.goToGIPSegment;
    this.view.btnGIPDisclaimers.onClick=this.goToGIPDisclaimers.bind(this);
    this.view.onDeviceBack=this.checkGoBack.bind(this);

  },

  GIPPostShow:function(){
    var prevForm = kony.application.getPreviousForm().id;
    if (prevForm == "homepage" || prevForm == "mycontentpage" || prevForm=="feedbackpage" || prevForm=="webapppage" || prevForm=="settingpage") {
      gblFormBack.push(prevForm);
    }
  },


  checkGoBack:function(){
    if(this.view.SideDrawerWC.flxClosePopupVisible){
      this.view.SideDrawerWC.flxClosePopupVisible=false;
      //this.view.SideDrawer.scrollSideDrawerContainer.enableScrolling=true;
    }else{
      var prevForm = gblFormBack.pop();
      var navObj = new kony.mvc.Navigation(prevForm);
      navObj.navigate();
    }

  },


  showNotification:function(){
    try{
      controllerReference.view.Popup.isVisible=true;
    }catch(e){}
  },


  GIPPreshow:function(){
    controllerReference=this;
    if(!GIPHamburger){   
      this.view.SideDrawerWC.createSideDrawer();
      GIPHamburger=true;
    }

    pageComponents = ["SideDrawer","Popup"];
    if(kony.os.deviceInfo().name=="iPad"){
      this.view.lblHeader0e62586bea5d243.height="5%";
      this.view.imgGIP.top="5%";
      this.view.btnSimulator.top="73%";

      this.view.btnGIPDisclaimers.top="81%";
      this.view.lblGIPDisclaimers.top="81%";
      this.view.btnGIPDisclaimers.text="Disclaimers:";
    }
    gblCurrentForm = "GIPSimulatorHome";
    this.view.flexSideDrawer.left = "-100%";
    this.closeSideDrawer();
    this.view.SideDrawerWC.flxClosePopupVisible=false;
    // this.view.SideDrawer.scrollSideDrawerContainer.contentOffset = {x:"0",y:"0"};
    // this.view.SideDrawer.scrollSideDrawerContainer.enableScrolling=true;
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
      "page_components": pageComponents
    };
    Tealium.trackEvent("click_action", JSON.stringify(dataOnclickArray), "eia-hub-app");
  },

  goToHomepage:function(){
   	//this.trackEventAnalytics("click_action", "navigate_homepage",["btnHome"]);
    var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"navigate_homepage",
        "click_category":"footer"
    	 };
     callTealiumOnClick(onClickDetails,["btnHome"], false);
      var ntf = new kony.mvc.Navigation("homepage");
      //gblFilterCategory = "";
      ntf.navigate();
    
  },


  goToMyContentPage:function(){
    //this.trackEventAnalytics("click_action", "navigate_mycontent",["btnMyContent"]);
    var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"navigate_mycontent",
        "click_category":"footer"
    	 };
     callTealiumOnClick(onClickDetails,["btnMyContent"], false);
    var ntf = new kony.mvc.Navigation("mycontentpage");
    ntf.navigate();
  },

  goToSettingsPage:function(){
    //this.trackEventAnalytics("click_action", "navigate_settingpage",["btnSettings"]);
    var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"navigate_settingpage",
        "click_category":"footer"
    	 };
     callTealiumOnClick(onClickDetails,["btnSettings"], false);
    var ntf = new kony.mvc.Navigation("settingpage");
    ntf.navigate(); 
  },

  goBackToTools:function() {
    //this.trackEventAnalytics("click_action", "navigate_webapppage",["btnWebpage"]);
    var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"navigate_webapppage",
        "click_category":"footer"
    	 };
     callTealiumOnClick(onClickDetails,["btnWebpage"], false);
    var ntf = new kony.mvc.Navigation("webapppage");
    ntf.navigate();
  },



  goToGIPSegment:function(){
    var ntf = new kony.mvc.Navigation("GIPSegment");
    ntf.navigate();
  },
  goToGIPDisclaimers:function(){
    var ntf = new kony.mvc.Navigation("GIPDisclaimers");
    ntf.navigate();
  },

  openSideDrawer: function() {
    /* if( this.view.SideDrawer.Accordion4.height == "84dp" ){

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

    //animate( this.view.flexSideDrawer, { "left": "-100%" } );

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
      "animationEnd": function(){}
    });
  },

  */

  navigateToHomePage : function() {
    var navObj = new kony.mvc.Navigation("homepage");
    navObj.navigate();
  }


});