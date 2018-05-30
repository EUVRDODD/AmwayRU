define({ 
  applyBindings: function(){

    controllerReference=this;
    kony.print("feedback applyBindings method");
    //animate( this.view.flexSideDrawer, {"left":"-100%"} );
    this.view.openSideDrawer.onClick = this.openSideDrawer.bind( this );
    //this.view.SideDrawer.flexCloseButtonContainer.onClick = controllerReference.closeSideDrawer.bind( this );
    //this.view.SideDrawer.flexInvisibleTouchArea.onClick = controllerReference.closeSideDrawer.bind( this );
    this.view.goToSearchPage.onClick = this.goToSearchPage.bind( this );
    this.view.goToHome.onClick = this.goToHome.bind( this );
    this.view.goToMyContent.onClick = this.goToMyContent.bind( this );
    this.view.goToSettings.onClick = this.goToSettings.bind( this );
    this.view.goToAppsWeb.onClick = this.goToAppsWeb.bind( this );
    this.view.preShow=this.onFeedbackPreShow.bind(this);
    this.view.onDeviceBack=this.checkGoBack.bind(this);
    this.view.postShow = this.goToFeedbackPostshow.bind(this);
    pageComponents = ["ContactUsSelector","SideDrawer","Popup"];

  },

  PostshowAnalytics :function(formName){
    var  additionalArg = ["ContactUsSelector","SideDrawer","Popup"];
    //additionalArg.push(this.view.id);
    kony.print("Tealium form widgets json for searchresultpage :: "+JSON.stringify(additionalArg));
    callTealiumOnScreenLoad(this.view,additionalArg,gblVisitor_imcID);
  },

  goToFeedbackPostshow : function(){
    try{
      //this.PostshowAnalytics(this.view);
      var  additionalArg = ["ContactUsSelector","SideDrawer","Popup"];
  	 //additionalArg.push(this.view.id);
  	 kony.print("Tealium form widgets json for searchresultpage :: "+JSON.stringify(additionalArg));
     callTealiumOnScreenLoad(this.view.id,additionalArg,null,false); 
    }catch(ex){
      kony.print("jani exception :: "+ex);
    }
    try{
      var prevForm = kony.application.getPreviousForm().id ;
      if(prevForm != "nutriliteWow" && prevForm!="feedbackpage")
        gblFormBack.push(prevForm);
    }catch(e){

    }

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
    }else{
      var prevForm= gblFormBack.pop();
      var navObj = new kony.mvc.Navigation(prevForm);
      navObj.navigate();
    }

  },

  onFeedbackPreShow:function(){
    kony.print("Feedback preshow ");
    if(!feedbackHamburger){
      this.view.SideDrawerWC.createSideDrawer();
      feedbackHamburger=true;
    }

    gblCurrentForm = "feedbackpage";
    this.view.flexSideDrawer.left = "-100%";
    this.view.SideDrawerWC.flxClosePopupVisible=false;
    // this.view.SideDrawer.scrollSideDrawerContainer.contentOffset = {x:"0%",y:"0%"};
    // this.view.SideDrawer.scrollSideDrawerContainer.enableScrolling=true;
    //  this.view.flexSideDrawer.left = "-100%";
    controllerReference.closeSideDrawer();
    var Contactdata=[];
    if(isBlankOrNull(gblCustomerCareEmail) ){  
      kony.print("removing customercare email ");
      this.view.ContactUsSelector.segContactUs.removeAt(0);
    }else{
      Contactdata.push({lblContactUs:gblCustomerCareEmail,imgContactUs:"icon_mail.png"});
    }

    if(isBlankOrNull(gblCustomerCareNumber) ){   
      kony.print("removing customercare number ");
      this.view.ContactUsSelector.segContactUs.removeAt(1);
    }else{
      Contactdata.push({lblContactUs:gblCustomerCareNumber,imgContactUs:"icon_phone.png"});
    }

    this.view.ContactUsSelector.segContactUs.setData(Contactdata);

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


  goToHome: function(){
    //this.trackEventAnalytics("click_action", "navigate_homepage",["goToHome"]);
    var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"navigate_homepage",
      	"click_category":"footer"
    	 };
     callTealiumOnClick(onClickDetails,["goToHome"], false);
    var navObj = new kony.mvc.Navigation("homepage");
    navObj.navigate();

  },
  goToMyContent: function(){
    //this.trackEventAnalytics("click_action", "navigate_mycontent",["goToMyContent"]);
    var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"navigate_mycontent",
      	"click_category":"footer"
    	 };
     callTealiumOnClick(onClickDetails,["goToMyContent"], false);
    var ntf = new kony.mvc.Navigation("mycontentpage");
    ntf.navigate();	
  },
  goToSettings: function(){
    //this.trackEventAnalytics("click_action", "navigate_settingpage",["goToSettings"]);
    var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"navigate_settingpage",
      	"click_category":"footer"
    	 };
     callTealiumOnClick(onClickDetails,["goToSettings"], false);
    var ntf = new kony.mvc.Navigation("settingpage");
    ntf.navigate();	
  },
  goToAppsWeb: function(){
    //this.trackEventAnalytics("click_action", "navigate_webapppage",["goToAppsWeb"]);
    var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"navigate_webapppage",
      	"click_category":"footer"
    	 };
     callTealiumOnClick(onClickDetails,["goToAppsWeb"], false);
    var ntf = new kony.mvc.Navigation("webapppage");
    ntf.navigate();	
  },

  openSideDrawer: function(){
    //      if( this.view.SideDrawer.Accordion4.height == "84dp" ){

    //       this.view.SideDrawer.Accordion4.height="0dp";
    //       this.view.SideDrawer.flexToolsContainer.height = "162dp";
    //         this.view.SideDrawer.AccordionActive4.isVisible = false;



    //       }

    //      if( this.view.SideDrawer.Accordion6.height == "42dp" ){

    //        this.view.SideDrawer.Accordion6.height="0dp";
    //        this.view.SideDrawer.flexToolsContainer.height = "162dp";
    //         this.view.SideDrawer.AccordionActive6.isVisible = false;



    //       }

    //      if( this.view.SideDrawer.Accordion7.height == "42dp" ){
    //         this.view.SideDrawer.Accordion7.height="0dp";
    //        this.view.SideDrawer.flexToolsContainer.height = "162dp";
    //         this.view.SideDrawer.AccordionActive7.isVisible = false;



    //       }

    //      if( this.view.SideDrawer.Accordion8.height == "84dp" ){


    //        this.view.SideDrawer.Accordion8.height="0dp";
    //        this.view.SideDrawer.flexToolsContainer.height = "162dp";
    //         this.view.SideDrawer.AccordionActive8.isVisible = false;

    //       }
    animate( this.view.flexSideDrawer, {"left":"0%"} );
  },
  closeSideDrawer: function(){
    animateSideDrawer( controllerReference.view.flexSideDrawer, {"left":"-100%"} );
    //animate( this.view.flexSideDrawer, {"left":"-100%"} );


  },
  goToSearchPage: function() {
    var ntf = new kony.mvc.Navigation("searchresultspage");
    ntf.navigate();	
  },
  onContactUsSegmentRowClick:function(eventobject,rowNumber){
    try{
      kony.print("on Row click"+rowNumber);
      var selectedItems = controllerReference.view.ContactUsSelector.segContactUs.selectedRowItems;
      var selectedItemsString = JSON.stringify(selectedItems).toLowerCase();
      kony.print(" Selected row items are "+selectedItemsString);

      if(selectedItemsString.indexOf(gblCustomerCareEmail) != -1){
        if(isIOS()){
          //Invokes function 'checkEmailJs'
          var isMailConfigured = com.checkEmail.checkEmailJs();
          kony.print("isMailConfigured "+isMailConfigured);
          if(!isMailConfigured){
            showInformationAlert("Info", "Mail not Configured");
            return;
          }
        }
        openEmail(gblCustomerCareEmail+"", "", "", "", "");
      }else if(selectedItemsString.indexOf(gblCustomerCareNumber) != -1){
        openCall(gblCustomerCareNumber+"");
      }

    }catch(e){
      kony.print("Error opening contact");
    }


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

  aboutAmwayData : function() {

    gblFilterCategory = gblAboutAmway;
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
  */

  onNavigate:function(context){
    kony.print("feedback OnNavigate method");	
    this.applyBindings();
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
      "animationEnd": function(){}
    });
  },

  */
  navigateToHomePage : function() {
    var navObj = new kony.mvc.Navigation("homepage");
    navObj.navigate();
  }



});