define(function () {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      var title;
      sideDrawerReference = this;
      this.currentlySelected = 0;
      pageComponents = [];

      //       this.view.AccordionButton1.onClick = this.AccordionButton1.bind( this );
      //       this.view.AccordionButton2.onClick = this.AccordionButton2.bind( this );
      //       this.view.AccordionButton3.onClick = this.AccordionButton3.bind( this );
      this.view.AccordionButton4.onClick = this.AccordionButton4.bind( this );
      //this.view.AccordionButton5.onClick = this.AccordionButton5.bind( this );
      this.view.AccordionButton6.onClick = this.AccordionButton6.bind( this );
      this.view.AccordionButton7.onClick = this.AccordionButton7.bind( this );
      this.view.AccordionButton8.onClick = this.AccordionButton8.bind( this );

      this.view.btnGIPSimulator.onClick=this.goToGIPSimulator.bind(this);
      this.view.linkContactUs.onClick = this.goToContactUs.bind( this );
      this.view.linkStoreLocator.onClick = this.goToStoreLocator.bind( this );
      //       this.view.linkFAQ.onClick = this.goToFAQ.bind( this );
      this.view.btnNutrilite.onClick=this.goToNutrilite.bind(this);
      this.view.btnIncomeSimulator.onClick=this.goToIncomeSimulator.bind(this);
      this.view.btnSkinRecommender.onClick=this.openSkinRecommender.bind(this);

      this.view.btnProductCon.onClick=this.openProductConsulting.bind(this);
      this.view.btnMyBiz.onClick=this.openMyBiz.bind(this);
      this.view.flxShopOnlineSideDrawer.onTouchStart =this.openShopOnline.bind(this);
      this.view.flxLogout.onClick = this.logout;
      this.view.btnLogoutYes.onClick = this.goToLogoutYes;
      this.view.btnLogoutNo.onClick = this.goToLogoutNo;
      this.view.flxClosePopup.onTouchStart = function(){kony.print("flx close pop clicked")};
      // Browse Business Categories
      this.view.flxBBusinessAccord1.onClick = this.goToBBusinessAccord1.bind(this);
      this.view.flxBBusinessAccord2.onClick = this.goToBBusinessAccord2.bind(this);
      this.view.flxBBusinessAccord3.onClick = this.goToBBusinessAccord3.bind(this);
      this.view.flxBBusinessAccord4.onClick = this.goToBBusinessAccord4.bind(this);
      this.view.flxBBusinessAccord5.onClick = this.goToBBusinessAccord5.bind(this);
      this.view.flxBBusinessAccord6.onClick = this.goToBBusinessAccord6.bind(this);
      this.view.flxHeritage.onClick=this.goToflxHeritage.bind(this);
      this.view.flxFact.onClick=this.goToflxFact.bind(this);
      this.view.flxManufacturing.onClick=this.goToflxManufacturing.bind(this);
      this.view.flxAwards.onClick=this.goToflxAwards.bind(this);
      this.view.flxCorporate.onClick=this.goToflxCorporate.bind(this);
      this.view.flxMedia.onClick=this.goToflxMedia.bind(this);      
      this.view.flxCatalogue.onClick=this.openProductConsulting.bind(this);
      this.view.flxOpportunity.onClick=this.goToflxOpportunity.bind(this);
      this.view.flxRecognition.onClick=this.goToflxRecognition.bind(this);
      this.view.flxBrochures.onClick=this.goToflxBrochures.bind(this);
      this.view.flxSeminars.onClick=this.goToflxSeminars.bind(this);
      this.view.flxLearning.onClick=this.goToflxLearning.bind(this);
    }, 

    goToflxOpportunity:function(){
      callTealiumOnClick("click_action","business_opportunity",["flxOpportunity"],gblVisitor_imcID);   


      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"business_opportunity",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "BUSINESS OPPORTUNITY";

      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutOppurtunity();
      }else{
        sideDrawerCategory(gblOpportunity);
      }

      /*
      else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutOppurtunity();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutOppurtunity();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutOppurtunity();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutOppurtunity();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutOppurtunity();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutOppurtunity();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutOppurtunity();
      }


      */

    },

    goToflxRecognition:function(){
      callTealiumOnClick("click_action","amway_recognition",["flxRecognition"],gblVisitor_imcID);   


      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"amway_recognition",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "AMWAY RECOGNITION";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutRecognition();
      }else{
        sideDrawerCategory(gblRecognition);
      }
      /*
      else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutRecognition();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutRecognition();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutRecognition();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutRecognition();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutRecognition();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutRecognition();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutRecognition();
      }

*/
    },

    goToflxBrochures:function(){
      callTealiumOnClick("click_action","business_brochures",["flxBrochures"],gblVisitor_imcID);   


      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"business_brochures",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "BUSINESS BROCHURES";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutBrochures();
      }else{
        sideDrawerCategory(gblBrochures);
      }

      /*else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutBrochures();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutBrochures();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutBrochures();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutBrochures();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutBrochures();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutBrochures();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutBrochures();
      }
*/
    },

    goToflxSeminars:function(){
      callTealiumOnClick("click_action","business_seminars_and_conferences",["flxSeminars"],gblVisitor_imcID);   


      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"business_seminars_and_conferences",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "BUSINESS SEMINARS & CONFERENCES";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutSeminars();
      }else{
        sideDrawerCategory(gblSeminars);
      }

      /*else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutSeminars();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutSeminars();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutSeminars();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutSeminars();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutSeminars();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutSeminars();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutSeminars();
      }

*/
    },

    goToflxLearning:function(){
      callTealiumOnClick("click_action","learning_and_development",["flxLearning"],gblVisitor_imcID);   


      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"learning_and_development",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "LEARNING AND DEVELOPMENT";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutLearning();
      }else{
        sideDrawerCategory(gblLearning);
      } 
      /*
      else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutLearning();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutLearning();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutLearning();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutLearning();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutLearning();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutLearning();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutLearning();
      }

      */

    },

    goToBBusinessAccord1 : function(){

      callTealiumOnClick("click_action","Personal_care",["flxBBusinessAccord1"],gblVisitor_imcID);   


      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"Personal_care",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "PERSONAL CARE";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutPersonalCareData();
      }else{
        sideDrawerCategory(gblPersonalCare);
      }

      /*else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutPersonalCareData();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutPersonalCareData();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutPersonalCareData();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutPersonalCareData();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutPersonalCareData();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutPersonalCareData();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutPersonalCareData();
      }

*/
    },

    goToBBusinessAccord2 : function(){

      callTealiumOnClick("click_action","Nutrition",["flxBBusinessAccord2"],gblVisitor_imcID);
      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"Nutrition",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "NUTRITION";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutNutriliteData();
      }else{
        sideDrawerCategory(gblNutrilite);
      }
      /* else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutNutriliteData();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutNutriliteData();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutNutriliteData();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutNutriliteData();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutNutriliteData();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutNutriliteData();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutNutriliteData();
      }
*/
    },

    goToBBusinessAccord3 : function(){

      callTealiumOnClick("click_action","Beauty",["flxBBusinessAccord3"],gblVisitor_imcID);
      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"Beauty",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }

      gblFilterCategoryName = "BEAUTY";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutBeautyData();
      }else{
        sideDrawerCategory(gblBeauty);
      }
      /*else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutBeautyData();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutBeautyData();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutBeautyData();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutBeautyData();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutBeautyData();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutBeautyData();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutBeautyData();
      }
*/
    },

    goToBBusinessAccord4 : function(){

      callTealiumOnClick("click_action","At_home",["flxBBusinessAccord4"],gblVisitor_imcID);

      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"At_home",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }

      gblFilterCategoryName = "AT HOME";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutAtHomeData();
      }else{
        sideDrawerCategory(gblAtHome);
      }

      /*else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutAtHomeData();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutAtHomeData();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutAtHomeData();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutAtHomeData();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutAtHomeData();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutAtHomeData();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutAtHomeData();
      }
      */

    },

    goToBBusinessAccord5 : function(){

      callTealiumOnClick("click_action","More_products",["flxBBusinessAccord5"],gblVisitor_imcID);

      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"More_products",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "MORE PRODUCTS";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutMoreProductsData();
      }else{
        sideDrawerCategory(gblMoreProducts);
      } 

      /*else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutMoreProductsData();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutMoreProductsData();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutMoreProductsData();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutMoreProductsData();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutMoreProductsData();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutMoreProductsData();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutMoreProductsData();
      }
*/
    },

    goToBBusinessAccord6 : function(){

      callTealiumOnClick("click_action","About_Amway",["flxBBusinessAccord6"],gblVisitor_imcID);

      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"About_Amway",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }

      gblFilterCategoryName = "ABOUT AMWAY";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutAmwayData();
      }else{
        sideDrawerCategory(gblAboutAmway);
      }

      /*else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutAmwayData();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutAmwayData();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutAmwayData();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutAmwayData();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutAmwayData();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutAmwayData();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutAmwayData();
      }
*/
    },

    goToflxHeritage : function(){


      callTealiumOnClick("click_action","heritage_&_values",["flxHeritage"],gblVisitor_imcID);   


      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"heritage_&_values",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "HERITAGE & VALUES";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutHeritage();
      }else{
        sideDrawerCategory(gblheritage);
      } 

      /*else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutHeritage();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutHeritage();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutHeritage();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutHeritage();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutHeritage();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutHeritage();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutHeritage();
      }
*/

    },

    goToflxFact:function(){
      callTealiumOnClick("click_action","fact_sheets",["flxFact"],gblVisitor_imcID);   


      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"fact_sheets",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "FACT SHEETS";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutFacts();
      }else{
        sideDrawerCategory(gblFactSheets);
      }

      /*else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutFacts();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutFacts();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutFacts();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutFacts();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutFacts();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutFacts();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutFacts();
      }
*/
    },

    goToflxManufacturing:function(){
      callTealiumOnClick("click_action","manufacturing",["flxManufacturing"],gblVisitor_imcID);   


      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"manufacturing",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "MANUFACTURING";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutManufacturing();
      }else{
        sideDrawerCategory(gblManufacturing);
      } /*else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutManufacturing();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutManufacturing();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutManufacturing();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutManufacturing();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutManufacturing();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutManufacturing();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutManufacturing();
      }

*/
    },

    goToflxAwards:function(){
      callTealiumOnClick("click_action","awards_&_accolades",["flxAwards"],gblVisitor_imcID);   


      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"awards_&_accolades",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "AWARDS & ACCOLADES";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutAwards();
      }else{
        sideDrawerCategory(gblAwards);
      } 

      /*else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutAwards();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutAwards();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutAwards();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutAwards();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutAwards();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutAwards();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutAwards();
      }

*/
    },

    goToflxCorporate:function(){
      callTealiumOnClick("click_action","corporate_social_responsibilities",["flxCorporate"],gblVisitor_imcID);   


      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"corporate_social_responsibilities",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "CORPORATE SOCIAL RESPONSIBILITIES";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutCorporateSocial();
      }else{
        sideDrawerCategory(gblCorporate);
      } 

      /*else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutCorporateSocial();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutCorporateSocial();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutCorporateSocial();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutCorporateSocial();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutCorporateSocial();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutCorporateSocial();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutCorporateSocial();
      }

*/
    },

    goToflxMedia:function(){
      callTealiumOnClick("click_action","media_releases",["flxMedia"],gblVisitor_imcID);   


      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"media_releases",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "MEDIA RELEASES";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutMedia();
      }else{
        sideDrawerCategory(gblMedia);
      }

      /*else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutMedia();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutMedia();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutMedia();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutMedia();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutMedia();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutMedia();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutMedia();
      }
*/
    },


    goToGIPSimulator:function(){
      callTealiumOnClick("click_action","GIP_simulator",["btnGIPSimulator"],gblVisitor_imcID);


      var ntf=new kony.mvc.Navigation("GIPSimulatorHome");
      ntf.navigate();
      this.AccordionButton4Close();
    },

    logout: function(){
      this.view.flxToast.setVisibility(false);
      this.view.flxClosePopup.isVisible = true;

      this.view.scrollSideDrawerContainer.enableScrolling=false;
      //  this.view.scrollSideDrawerContainer.setEnabled(false);
      //	controllerReference.view.SideDrawer.flexCloseButtonContainer.setEnabled(false);
      //  controllerReference.view.SideDrawer.flexInvisibleTouchArea.setEnabled(false);


    },

    goToLogoutYes : function(){
      callTealiumOnClick("click_action","Logout_Yes",["btnLogoutYes"],gblVisitor_imcID);
      this.view.flxClosePopup.isVisible = false;
      // this.view.scrollSideDrawerContainer.setEnabled(true);
      //  controllerReference.view.SideDrawer.flexInvisibleTouchArea.setEnabled(true);
      //  controllerReference.view.SideDrawer.flexCloseButtonContainer.setEnabled(true);
      this.AccordionButton4Close();     
      this.AccordionButton6Close();   
      this.AccordionButton7Close();  
      //this.AccordionButton8Close();

      clearLoginTokenFromStore();
      gblFilterCategory = "";
      gblVisitor_imcID = "";
      LoggedIn=false;
      var ntf = new kony.mvc.Navigation("loginpage");
      ntf.navigate();

    },

    goToLogoutNo : function(){
      callTealiumOnClick("click_action","Logout_No",["btnLogoutNo"],gblVisitor_imcID);
      this.view.flxClosePopup.setVisibility(false);
      this.view.scrollSideDrawerContainer.enableScrolling=true;
      // this.view.scrollSideDrawerContainer.setEnabled(true);
      //controllerReference.view.SideDrawer.flexInvisibleTouchArea.setEnabled(true);
      //controllerReference.view.SideDrawer.flexCloseButtonContainer.setEnabled(true);


      // controllerReference.view.flxHome.setEnabled(true);
    },

    openShopOnline:function(){
      callTealiumOnClick("click_action","Shop_online",["flxShopOnlineSideDrawer"],gblVisitor_imcID);
      if (!isNetworkAvailable())
      {
        this.view.flxToast.setVisibility(true);
        try{
          kony.timer.cancel("timerid123");	
        }catch(e){}	
        kony.timer.schedule("timerid123", this.disableFlex.bind(this), 3, false);
      }else{
        title="Shop Online";
        var ntf=new kony.mvc.Navigation("nutriliteWow");
        ntf.navigate(title);
        // kony.application.openURL("https://www.amway.in/");		// added for external browser.
      }

    },

    openMyBiz:function(){
      callTealiumOnClick("click_action","Mybiz",["btnMyBiz"],gblVisitor_imcID);
      if (!isNetworkAvailable())
      {
        this.view.flxToast.setVisibility(true);
        try{
          kony.timer.cancel("timerid123");	
        }catch(e){}	
        kony.timer.schedule("timerid123", this.disableFlex.bind(this), 3, false);
      }else{
        //kony.application.openURL("https://mybiz.amway.com/");
        title="MyBiz";


        var ntf=new kony.mvc.Navigation("nutriliteWow");
        ntf.navigate(title);
        this.AccordionButton8Close();
      }
    },

    openProductConsulting:function(){
      callTealiumOnClick("click_action","Product_catalogue",["btnProductCon"],gblVisitor_imcID);
      this.AccordionButton4Close();     
      this.AccordionButton6Close();   
      this.AccordionButton7Close();  
      // this.AccordionButton8Close();
      if (!isNetworkAvailable())
      {
        this.view.flxToast.setVisibility(true);
        try{
          kony.timer.cancel("timerid123");	
        }catch(e){}	
        kony.timer.schedule("timerid123", this.disableFlex.bind(this), 3, false);
      }else{
        //title="Product Catalogue";
        kony.application.openURL("http://www.amway.in/store/amway/en/INR/lmsSearch/lmsHandler?LMSURL=https%3a%2f%2findia.amwayuniversity.com%2fcourses%2fapp%2fmanagement%2fLMS_CNT_SilentLaunch.aspx%3fUserMode%3d0%26ActivityId%3d2555%26lang%3den-US");
        //         var ntf=new kony.mvc.Navigation("nutriliteWow");
        //         ntf.navigate(title);
        //this.AccordionButton8Close();
      }

    },

    openNutriliteRecommender:function(){
      callTealiumOnClick("click_action","Nutrilite_product_recommender",pageComponents,gblVisitor_imcID);
      if (!isNetworkAvailable())
      {
        this.view.flxToast.setVisibility(true);
        try{
          kony.timer.cancel("timerid123");	
        }catch(e){}	
        kony.timer.schedule("timerid123", this.disableFlex.bind(this), 3, false);
      }else{
        title="Nutrilite Product Recommender";
        var ntf=new kony.mvc.Navigation("nutriliteWow");
        ntf.navigate(title);
      }

      //kony.application.openURL("http://nutriliterecommender.amway.in/");
    },

    openSkinRecommender:function(){
      callTealiumOnClick("click_action","Artistry_skincare_recommender",["btnSkinRecommender"],gblVisitor_imcID);
      if (!isNetworkAvailable())
      {
        this.view.flxToast.setVisibility(true);
        try{
          kony.timer.cancel("timerid123");	
        }catch(e){}	
        kony.timer.schedule("timerid123", this.disableFlex.bind(this), 3, false);
      }else{
        title="Artistry Skincare Recommender";


        var ntf=new kony.mvc.Navigation("nutriliteWow");
        ntf.navigate(title);
        this.AccordionButton6Close();
      }

      // kony.application.openURL("http://artistryrecommender.amway.in/");
    },

    goToIncomeSimulator:function(){
      callTealiumOnClick("click_action","Income_simulator",["btnIncomeSimulator"],gblVisitor_imcID);


      var ntf=new kony.mvc.Navigation("incomeSimulatorHome");
      ntf.navigate();
      this.AccordionButton4Close();
    },

    disableFlex: function(){
      this.view.flxToast.setVisibility(false);
      this.view.linkContactUs.setEnabled(true);
      try{
        kony.timer.cancel("timerid123");	
      }catch(e){}	

    },

    goToNutrilite:function(){
      callTealiumOnClick("click_action","Nutrilite_wow",["btnNutrilite"],gblVisitor_imcID);
      if (!isNetworkAvailable())
      {
        this.view.flxToast.setVisibility(true);
        try{
          kony.timer.cancel("timerid123");	
        }catch(e){}	
        kony.timer.schedule("timerid123", this.disableFlex.bind(this), 3, false);
      }
      else
      {


        var ntf=new kony.mvc.Navigation("nutriliteWow");
        ntf.navigate(null);
        this.AccordionButton7Close();
      }

    },

    SortFeedOption1: function() {
      animate( this.view.SortFeedActive1, { "height": "100%" } );
      animate( this.view.SortFeedActive2, { "height": "0%" } );
      animate( this.view.SortFeedActive3, { "height": "0%" } );
      animate( this.view.SortFeedActive4, { "height": "0%" } );
    },
    SortFeedOption2: function() {
      animate( this.view.SortFeedActive1, { "height": "0%" } );
      animate( this.view.SortFeedActive2, { "height": "100%" } );
      animate( this.view.SortFeedActive3, { "height": "0%" } );
      animate( this.view.SortFeedActive4, { "height": "0%" } );
    },
    SortFeedOption3: function() {
      animate( this.view.SortFeedActive1, { "height": "0%" } );
      animate( this.view.SortFeedActive2, { "height": "0%" } );
      animate( this.view.SortFeedActive3, { "height": "100%" } );
      animate( this.view.SortFeedActive4, { "height": "0%" } );
    },
    SortFeedOption4: function() {
      animate( this.view.SortFeedActive1, { "height": "0%" } );
      animate( this.view.SortFeedActive2, { "height": "0%" } );
      animate( this.view.SortFeedActive3, { "height": "0%" } );
      animate( this.view.SortFeedActive4, { "height": "100%" } );
    },

    AccordionButton1: function() {
      if( this.view.Accordion1.height == "168dp" ){
        //         this.view.AccordionActive1.isVisible = false;
        //this.view.flexBusinessContainer.height = "180dp";
        animate( this.view.Accordion1, {"height": "0dp"} );
        return false;
      }
      //       this.view.AccordionActive1.isVisible = true;
      //       this.view.AccordionActive2.isVisible = false;
      //       this.view.AccordionActive3.isVisible = false;
      this.view.AccordionActive4.isVisible = false;
      this.view.AccordionActive5.isVisible = false;
      this.view.AccordionActive6.isVisible = false;
      this.view.AccordionActive7.isVisible = false;
      this.view.AccordionActive8.isVisible = false;

      animate( this.view.Accordion1, { "height": "168dp"} );
      this.view.Accordion2.height = "0dp";
      this.view.Accordion3.height = "0dp";
      this.view.Accordion4.height = "0dp";
      this.view.Accordion5.height = "0dp";
      this.view.Accordion6.height = "0dp";
      this.view.Accordion7.height = "0dp";
      this.view.Accordion8.height = "0dp";

      this.view.flexBusinessContainer.height = "348dp";
      this.view.flexToolsContainer.height = "162dp";

    },

    AccordionButton2: function() {
      if( this.view.Accordion2.height == "168dp" ){
        //this.view.AccordionActive2.isVisible = false;
        //this.view.flexBusinessContainer.height = "180dp";
        animate( this.view.Accordion2, {"height": "0dp"} );
        return false;
      }
      //       this.view.AccordionActive1.isVisible = false;
      //       this.view.AccordionActive2.isVisible = true;
      //       this.view.AccordionActive3.isVisible = false;
      this.view.AccordionActive4.isVisible = false;
      this.view.AccordionActive5.isVisible = false;
      this.view.AccordionActive6.isVisible = false;
      this.view.AccordionActive7.isVisible = false;
      this.view.AccordionActive8.isVisible = false;


      this.view.Accordion1.height = "0dp";

      this.view.Accordion3.height = "0dp";
      this.view.Accordion4.height = "0dp";
      this.view.Accordion5.height = "0dp";
      this.view.Accordion6.height = "0dp";
      this.view.Accordion7.height = "0dp";
      this.view.Accordion8.height = "0dp";

      this.view.flexBusinessContainer.height = "348dp";
      this.view.flexToolsContainer.height = "162dp";
      animate( this.view.Accordion2, { "height": "168dp"} );
    },
    AccordionButton3: function() {
      if( this.view.Accordion3.height == "168dp" ){
        //this.view.AccordionActive3.isVisible = false;
        //this.view.flexBusinessContainer.height = "180dp";
        animate( this.view.Accordion3, {"height": "0dp"} );
        return false;
      }
      //       this.view.AccordionActive1.isVisible = false;
      //       this.view.AccordionActive2.isVisible = false;
      //       this.view.AccordionActive3.isVisible = true;
      this.view.AccordionActive4.isVisible = false;
      this.view.AccordionActive5.isVisible = false;
      this.view.AccordionActive6.isVisible = false;
      this.view.AccordionActive7.isVisible = false;
      this.view.AccordionActive8.isVisible = false;


      this.view.Accordion1.height = "0dp";
      this.view.Accordion2.height = "0dp";

      this.view.Accordion4.height = "0dp";
      this.view.Accordion5.height = "0dp";
      this.view.Accordion6.height = "0dp";
      this.view.Accordion7.height = "0dp";
      this.view.Accordion8.height = "0dp";

      this.view.flexBusinessContainer.height = "348dp";
      this.view.flexToolsContainer.height = "162dp";
      animate( this.view.Accordion3, { "height": "168dp"} );

    },
    AccordionButton4: function() {

      if( this.view.Accordion4.height == "84dp" ){
        this.view.AccordionActive4.isVisible = false;
        this.view.flexToolsContainer.height = "162dp";
        animate( this.view.Accordion4, {"height": "0dp"} );
        return false;
      }

      //       this.view.AccordionActive1.isVisible = false;
      //       this.view.AccordionActive2.isVisible = false;
      //       this.view.AccordionActive3.isVisible = false;
      this.view.AccordionActive4.isVisible = true;
      this.view.AccordionActive5.isVisible = false;
      this.view.AccordionActive6.isVisible = false;
      this.view.AccordionActive7.isVisible = false;
      this.view.AccordionActive8.isVisible = false;


      /* this.view.Accordion1.height = "0dp";
      this.view.Accordion2.height = "0dp";
      this.view.Accordion3.height = "0dp";*/
      this.view.Accordion5.height = "0dp";
      this.view.Accordion6.height = "0dp";
      this.view.Accordion7.height = "0dp";
      this.view.Accordion8.height = "0dp";
      this.view.flexToolsContainer.height = "246dp";
      animate( this.view.Accordion4, { "height": "84dp"} );      


      //this.view.flexBusinessContainer.height = "180dp";


    },

    AccordionButton5: function() {

      if( this.view.Accordion5.height == "126dp" ){
        this.view.AccordionActive5.isVisible = false;
        this.view.flexToolsContainer.height = "162dp";
        animate( this.view.Accordion5, {"height": "0dp"} );
        return false;
      }

      //       this.view.AccordionActive1.isVisible = false;
      //       this.view.AccordionActive2.isVisible = false;
      //       this.view.AccordionActive3.isVisible = false;
      this.view.AccordionActive4.isVisible = false;
      this.view.AccordionActive5.isVisible = true;
      this.view.AccordionActive6.isVisible = false;
      this.view.AccordionActive7.isVisible = false;
      this.view.AccordionActive8.isVisible = false;



      /* this.view.Accordion1.height = "0dp";
      this.view.Accordion2.height = "0dp";
      this.view.Accordion3.height = "0dp";*/
      this.view.Accordion4.height = "0dp";
      animate( this.view.Accordion5, { "height": "126dp"} );
      this.view.Accordion6.height = "0dp";
      this.view.Accordion7.height = "0dp";
      this.view.Accordion8.height = "0dp";

      //this.view.flexBusinessContainer.height = "180dp";
      this.view.flexToolsContainer.height = "338dp";
    },

    AccordionButton6: function() {
      kony.print("Accrodian6 clicked")
      this.view.lblSkinRecommender.text = "Artistry Skincare Recommender";

      if( this.view.Accordion6.height == "42dp" ){
        this.view.AccordionActive6.isVisible = false;
        this.view.flexToolsContainer.height = "162dp";
        animate( this.view.Accordion6, {"height": "0dp"} );
        return false;
      }

      //       this.view.AccordionActive1.isVisible = false;
      //       this.view.AccordionActive2.isVisible = false;
      //       this.view.AccordionActive3.isVisible = false;
      this.view.AccordionActive4.isVisible = false;
      this.view.AccordionActive5.isVisible = false;
      this.view.AccordionActive6.isVisible = true;
      this.view.AccordionActive7.isVisible = false;
      this.view.AccordionActive8.isVisible = false;


      /* this.view.Accordion1.height = "0dp";
      this.view.Accordion2.height = "0dp";
      this.view.Accordion3.height = "0dp";*/
      this.view.Accordion4.height = "0dp";
      this.view.Accordion5.height = "0dp";
      this.view.Accordion7.height = "0dp";
      this.view.Accordion8.height = "0dp";

      //this.view.flexBusinessContainer.height = "180dp";
      this.view.flexToolsContainer.height = "204dp";
      animate( this.view.Accordion6, { "height": "42dp"} );      

    },

    AccordionButton7: function() {

      if( this.view.Accordion7.height == "42dp" ){
        this.view.AccordionActive7.isVisible = false;
        this.view.flexToolsContainer.height = "162dp";
        animate( this.view.Accordion7, {"height": "0dp"} );
        return false;
      }

      //       this.view.AccordionActive1.isVisible = false;
      //       this.view.AccordionActive2.isVisible = false;
      //       this.view.AccordionActive3.isVisible = false;
      this.view.AccordionActive4.isVisible = false;
      this.view.AccordionActive5.isVisible = false;
      this.view.AccordionActive6.isVisible = false;
      this.view.AccordionActive7.isVisible = true;
      this.view.AccordionActive8.isVisible = false;


      /* this.view.Accordion1.height = "0dp";
      this.view.Accordion2.height = "0dp";
      this.view.Accordion3.height = "0dp";*/
      this.view.Accordion4.height = "0dp";
      this.view.Accordion5.height = "0dp";
      this.view.Accordion6.height = "0dp";
      this.view.Accordion8.height = "0dp";
      this.view.flexToolsContainer.height = "204dp";
      animate( this.view.Accordion7, { "height": "42dp"} );      


      //this.view.flexBusinessContainer.height = "180dp";


    },

    AccordionButton8: function() {

      if( this.view.Accordion8.height == "84dp" ){
        this.view.AccordionActive8.isVisible = false;
        this.view.flexToolsContainer.height = "162dp";
        animate( this.view.Accordion8, {"height": "0dp"} );
        return false;
      }

      //       this.view.AccordionActive1.isVisible = false;
      //       this.view.AccordionActive2.isVisible = false;
      //       this.view.AccordionActive3.isVisible = false;
      this.view.AccordionActive4.isVisible = false;
      this.view.AccordionActive5.isVisible = false;
      this.view.AccordionActive6.isVisible = false;
      this.view.AccordionActive7.isVisible = false;
      this.view.AccordionActive8.isVisible = true;


      /* this.view.Accordion1.height = "0dp";
      this.view.Accordion2.height = "0dp";
      this.view.Accordion3.height = "0dp";*/
      this.view.Accordion4.height = "0dp";
      this.view.Accordion5.height = "0dp";
      this.view.Accordion6.height = "0dp";
      this.view.Accordion7.height = "0dp";
      this.view.flexToolsContainer.height = "246dp";
      animate( this.view.Accordion8, { "height": "84dp"} );

      //this.view.flexBusinessContainer.height = "180dp";

    },

    AccordionButton4Close: function() {


      if( this.view.Accordion4.height == "84dp" ){

        this.view.AccordionActive4.isVisible = false;
        this.view.flexToolsContainer.height = "162dp";
        this.view.Accordion4.height="0dp";

      }

    },
    AccordionButton6Close:function(){

      if( this.view.Accordion6.height == "42dp" ){
        this.view.AccordionActive6.isVisible = false;
        this.view.flexToolsContainer.height = "162dp";
        this.view.Accordion6.height="0dp";

      }
    },
    AccordionButton7Close: function() {
      if( this.view.Accordion7.height == "42dp" ){
        this.view.AccordionActive7.isVisible = false;
        this.view.flexToolsContainer.height = "162dp";
        this.view.Accordion7.height="0dp";

      }
    },
    AccordionButton8Close: function(){
      if( this.view.Accordion8.height == "84dp" ){
        this.view.AccordionActive8.isVisible = false;
        this.view.Accordion8.height = "0dp";
        this.view.flexToolsContainer.height = "162dp";



      }},

    contactusSuccessCallback:function(contactusResponse) {

      kony.print("*************** Entering into contactusSuccessCallback *************************");
      kony.print("Response : " + JSON.stringify(contactusResponse));

      dismissLoading();
      if(contactusResponse.opstatus !== 0){
        showInformationAlert("Info", "Unable to process the request! Please try again later ");
      }else{
        if (!isBlankOrNull(contactusResponse.entries) && !isBlankOrNull(contactusResponse.entries[0])) {
          if(!isBlankOrNull(contactusResponse.entries[0]["customer_care_number"])){
            gblCustomerCareNumber = contactusResponse.entries[0]["customer_care_number"];
          }
          if(!isBlankOrNull(contactusResponse.entries[0]["contact_email"])){
            gblCustomerCareEmail = contactusResponse.entries[0]["contact_email"];
          }
          if( !isBlankOrNull(gblCustomerCareNumber) || !isBlankOrNull(gblCustomerCareEmail)){
            this.view.flxClosePopup.isVisible = false;
            var frmFeedback = new kony.mvc.Navigation("feedbackpage");
            frmFeedback.navigate();	
          }else{
            showInformationAlert("Info", "Unable to process the request! Please try again later ");
          }
        }
      }
      kony.print(" ********** Exiting out of contactusSuccessCallback ********** ");
    },
    contactusErrorCallback:function(errormsg) {
      dismissLoading();
      showInformationAlert("Info", "Unable to process the request! Please try again later ");
      kony.print(" ********** Failure in contactusErrorCallback: " + JSON.stringify(errormsg) + " ********** ");
    },
    goToContactUs: function() {
      callTealiumOnClick("click_action","Contact_US",["linkContactUs"],gblVisitor_imcID);
      if (isNetworkAvailable()) {
        showLoading();
        if (mobileFabricConfiguration.isKonySDKObjectInitialized) {

          mobileFabricConfiguration.integrationObj = mobileFabricConfiguration.konysdkObject.getIntegrationService(mobileFabricConfiguration.integrationServices[4].service);
          var operationName = mobileFabricConfiguration.integrationServices[4].operations[0];
          mobileFabricConfiguration.integrationObj.invokeOperation(operationName, null, null, sideDrawerReference.contactusSuccessCallback,sideDrawerReference.contactusErrorCallback);
        } else {
          sideDrawerReference.initializeMobileFabric_SideDrawer("CONTACT_US");
          //  initializeMobileFabric(context);
        }
      } else {
        //           showInformationAlert("Info", "You are offline!! ");
        this.view.linkContactUs.setEnabled(false);
        this.view.flxToast.setVisibility(true);
        try{
          kony.timer.cancel("timerid123");	
        }catch(e){}
        kony.timer.schedule("timerid123", this.disableFlex.bind(this), 3, false);
      }

    },
    initializeMobileFabric_SideDrawer:function(context) {
      kony.print(" ********** Entering into initializeMobileFabric ********** ");
      try{
        if (isNetworkAvailable()) {
          // showLoading(" ", false, false);
          mobileFabricConfiguration.konysdkObject = new kony.sdk();
          mobileFabricConfiguration.konysdkObject.init(mobileFabricConfiguration.appKey, mobileFabricConfiguration.appSecret, mobileFabricConfiguration.serviceURL, function(response) {
            kony.print(" ********** Success initializeMobileFabricSuccess response : " + JSON.stringify(response) + " ********** ");
            mobileFabricConfiguration.isKonySDKObjectInitialized = true;
            kony.application.dismissLoadingScreen();
            if (!isBlankOrNull(context) && context == "CONTACT_US") {
              sideDrawerReference.goToContactUs();
            }
            else if(!isBlankOrNull(context) && context == "STORE_LOCATOR"){
              sideDrawerReference.goToStoreLocator();
            }

            kony.print("initialization successful");
            kony.print(" ********** Exiting out of initializeMobileFabricSuccess ********** ");
          }, function(error) {
            kony.print(" ********** Entering into initializeMobileFabricFailure ********** ");
            kony.print(" ********** Failure in initializeMobileFabric: " + JSON.stringify(error) + " ********** ");
            kony.application.dismissLoadingScreen();
            status = {"statusCode" : 2, "statusMessage" : "Error in initializing mobile fabric"};
            //alert (" Unable to initialize the application for MF. Please try again. ");
            kony.print(" ********** Exiting out of initializeMobileFabricFailure ********** ");
          });
        } else {
          //alert ("Network unavailable. Please check your network settings. ");
          status = {"statusCode" : 1, "statusMessage" : "Network Unavailable"};
          kony.print(" ********** Exiting out of initializeMobileFabric ********** ");
        }

      }catch(e){
        kony.print("Error occured while initializing the mobilefabric ");
      }

    },
    goToStoreLocator: function() {
      callTealiumOnClick("click_action","Store_locator",["linkStoreLocator"],gblVisitor_imcID);
      if (isNetworkAvailable()) {
        var ntf=new kony.mvc.Navigation("storelocatorpage");
        ntf.navigate();
      }else{    
        this.view.flxToast.setVisibility(true);
        try{
          kony.timer.cancel("timerid123");	
        }catch(e){}
        kony.timer.schedule("timerid123", this.disableFlex.bind(this), 3, false);

      }
      /*if (isNetworkAvailable()) {
        showLoading();
        if (mobileFabricConfiguration.isKonySDKObjectInitialized) {

          mobileFabricConfiguration.integrationObj = mobileFabricConfiguration.konysdkObject.getIntegrationService(mobileFabricConfiguration.integrationServices[4].service);
          var operationName = mobileFabricConfiguration.integrationServices[4].operations[0];
          mobileFabricConfiguration.integrationObj.invokeOperation(operationName, null, null, sideDrawerReference.storeLocatorSuccessCallback,sideDrawerReference.storeLocatorErrorCallback);
        } else {
          sideDrawerReference.initializeMobileFabric_SideDrawer("STORE_LOCATOR");
          //  initializeMobileFabric(context);
        }
      } else {
        //           showInformationAlert("Info", "You are offline!! ");
        this.view.linkContactUs.setEnabled(false);
        this.view.flxToast.setVisibility(true);
        try{
          kony.timer.cancel("timerid");	
        }catch(e){}
        kony.timer.schedule("timerid", this.disableFlex.bind(this), 2, false);
      }*/

    },
    goToFAQ: function() {
      var ntf = new kony.mvc.Navigation("contentdetailpage");
      ntf.navigate();	
    },

  };
});