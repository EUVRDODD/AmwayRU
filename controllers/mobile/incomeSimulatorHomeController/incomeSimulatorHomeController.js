define({ 
  //call on post show
  applyBindings: function(){
    controllerReference=this;
    this.view.preShow=this.incomeSimulatorPreShow.bind(this);
    this.view.postShow=this.incomeSimulatorPostShow.bind(this);
    // this.view.SideDrawerWC.flexCloseButtonContainer.onClick = this.closeSideDrawer.bind( this );
    // this.view.SideDrawerWC.flexInvisibleTouchArea.onClick = this.closeSideDrawer.bind( this );
    this.view.btnback.onClick=this.openSideDrawer.bind( this );
    this.view.btnStart.onClick=this.onStartIncomeSimulator.bind(this);
    this.view.btnIncomeSimulator.onClick=this.showIncomeSimulatorPDF.bind(this);
    this.view.btnHome.onClick=this.goToHomepage.bind(this);
    this.view.btnMyContent.onClick=this.goToMyContentPage.bind(this);
    this.view.btnSettings.onClick=this.goToSettingsPage.bind(this);
    this.view.btnWebpage.onClick=this.goBackToTools.bind(this);

  },

  showNotification:function(){
    try{
      controllerReference.view.Popup.isVisible=true;
    }catch(e){}
  },
  incomeSimulatorPostShow:function(){
    var prevForm = kony.application.getPreviousForm().id;
    if (prevForm == "homepage" || prevForm == "mycontentpage" || prevForm=="feedbackpage" || prevForm=="webapppage" || prevForm=="settingpage") {
      gblFormBack.push(prevForm);
    }
  },



  incomeSimulatorPreShow:function(){

    if(!incomeHamburger){
      this.view.SideDrawerWC.createSideDrawer();
      incomeHamburger=true;
    }

    pageComponents = ["SideDrawer","Popup"];
    gblCurrentForm = "incomeSimulatorHome";
    this.view.flexMain.contentOffset={x:"0%",y:"0%"};
    this.view.flxToast.isVisible=false;
    this.view.flexSideDrawer.left = "-100%";
    this.closeSideDrawer();
    this.view.SideDrawerWC.flxClosePopupVisible=false;
    //this.view.SideDrawerWC.scrollSideDrawerContainer.contentOffset = {x:"0",y:"0"};
    //this.view.SideDrawerWC.scrollSideDrawerContainer.enableScrolling=true;
    this.view.onDeviceBack=this.checkGoBack.bind(this);
  },

  checkGoBack:function(){
    if(this.view.SideDrawerWC.flxClosePopupVisible){
      this.view.SideDrawerWC.flxClosePopupVisible=false;
      //this.view.SideDrawerWC.scrollSideDrawerContainer.enableScrolling=true;
    }else{
      var prevForm = gblFormBack.pop();
      var navObj = new kony.mvc.Navigation(prevForm);
      navObj.navigate();
    }

  },

  onNavigate:function(){
    this.applyBindings();
    // this.view.preShow=this.applyBindings.bind(this);

  },
  openSideDrawer: function() {

    /*
     if( this.view.SideDrawerWC.Accordion4.height == "84dp" ){

      this.view.SideDrawerWC.Accordion4.height="0dp";
      this.view.SideDrawerWC.flexToolsContainer.height = "162dp";
        this.view.SideDrawerWC.AccordionActive4.isVisible = false;



      }

     if( this.view.SideDrawerWC.Accordion6.height == "42dp" ){

       this.view.SideDrawerWC.Accordion6.height="0dp";
       this.view.SideDrawerWC.flexToolsContainer.height = "162dp";
        this.view.SideDrawerWC.AccordionActive6.isVisible = false;



      }

     if( this.view.SideDrawerWC.Accordion7.height == "42dp" ){
        this.view.SideDrawerWC.Accordion7.height="0dp";
       this.view.SideDrawerWC.flexToolsContainer.height = "162dp";
        this.view.SideDrawerWC.AccordionActive7.isVisible = false;



      }

     if( this.view.SideDrawerWC.Accordion8.height == "84dp" ){


       this.view.SideDrawerWC.Accordion8.height="0dp";
       this.view.SideDrawerWC.flexToolsContainer.height = "162dp";
        this.view.SideDrawerWC.AccordionActive8.isVisible = false;

      }

    */
    animate( this.view.flexSideDrawer, { "left": "0%" } );
  },
  closeSideDrawer: function() {
    animateSideDrawer( controllerReference.view.flexSideDrawer, {"left":"-100%"} );
    //animate( this.view.flexSideDrawer, { "left": "-100%" } );

  },

  disableFlex: function() {
    this.view.flxToast.setVisibility(false);
    try{
      kony.timer.cancel("timerid");	
    }catch(e){}
  },
  trackEventAnalytics : function(event_name,click_detail){

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

  onStartIncomeSimulator:function() {
    var ntf = new kony.mvc.Navigation("commissionSchedule",["btnWebpage"]);
    ntf.navigate();
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
*/
  goBackToTools:function() {
    //this.trackEventAnalytics("click_action", "navigate_webapppage");
    var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"navigate_webapppage",
        "click_category":"footer"
    	 };
     callTealiumOnClick(onClickDetails,["btnWebpage"], false);
    var ntf = new kony.mvc.Navigation("webapppage");
    ntf.navigate();
  },
  /*
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
    var navObj = new kony.mvc.Navigation("homepage");
    navObj.navigate();
  },



  showIncomeSimulatorPDF:function(){

    if((kony.os.deviceInfo()["name"]== "WindowsPhone")|| (kony.os.deviceInfo()["name"] == "iPhone Simulator") || (kony.os.deviceInfo()["name"] == "iPhone")){
      kony.application.openURL("https://d15dx9g4u1sir9.cloudfront.net/Mobile/Business Center/Income Calculator/opportunity brochue.pdf");
    }else{
      kony.application.openURL("https://docs.google.com/gview?embedded=true&url=https://d15dx9g4u1sir9.cloudfront.net/Mobile/Business Center/Income Calculator/opportunity brochue.pdf");
    }

  }



});