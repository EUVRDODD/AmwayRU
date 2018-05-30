define({
  _init: function() {
    kony.print("sreeni init called");
    controllerReference = this;
    this.applyBindings();
  },
  infoPopupOn:function(text){
    try{
      this.view.flxHome.zIndex = 1;
      controllerReference.view.Popup.zIndex =4;
      controllerReference.view.Popup.left="0%";
      controllerReference.view.Popup.isVisible = true;

      controllerReference.view.Popup.lblInfoComment.text = text;
    }catch(e){
      kony.print("Exception ininfoPopupOff"+e);
    }
  },
  infoPopupOff:function(){
    try{
      this.view.flxHome.zIndex = 4;
      if(!isBlankOrNull(controllerReference.view.Popup)){
        controllerReference.view.Popup.left="-100%";
        controllerReference.view.Popup.zIndex =1;
        controllerReference.view.Popup.isVisible = false;

      }
    }catch(e){
      kony.print("Exception ininfoPopupOff"+e);
    }

  },
  applyBindings: function() {
    try{

      if(!homepageHamburger){
        this.view.SideDrawerWC.createSideDrawer();
        homepageHamburger=true;
      }

      kony.print("sreeni apply binding called");
      if (gblRetailScroll) return;
      //kony.print("jani >>> remember visitorIMCID "+kony.store.getItem("visitorImcID"));
      controllerReference.view.lblNofilteredData.isVisible = false ;
      controllerReference.view.segHomePageContent.scrollingEvents = {"onReachingEnd":controllerReference.scrollToSearchListEnd};
      this.view.preShow = this.homePagePreShow.bind(this);
      this.view.postShow = this.homePagePostShow.bind(this);
      this.view.Topbar.flexOpenSideDrawer.onClick = this.openSideDrawer.bind(this);
      // this.view.SideDrawer.flexCloseButtonContainer.onClick = this.closeSideDrawer.bind(this);
      //this.view.SideDrawer.flexInvisibleTouchArea.onClick = this.closeSideDrawer.bind(this);
      this.view.FeedTile.MoreButton.onClick = this.showHiddenOptions.bind(this);
      this.view.segHomePageContent.onRowClick = this.segmentRowClicked;
      this.view.btnHome.onClick = this.navigateToHome.bind(this);
      this.view.btnMyContent.onClick = this.navigateToMyContent.bind(this);
      this.view.btnSettings.onClick = this.navigateToSettings.bind(this);
      this.view.btnWebpage.onClick = this.navigateToWebApps.bind(this);
      this.view.flxToast.setVisibility(false);
      this.view.MoreOptions.OptionCancel.onClick = this.hideHiddenOptions.bind(this);
      this.view.Popup.btnConfirmation.onClick = this.infoPopupOff;
      controllerReference.view.filterTabFilterCategory.isVisible = false;
      controllerReference.view.filterContents.top="50dp";
      this.view.btnClose.onClick = this.onClickBtnClose.bind(this);
      this.view.onDeviceBack=this.BackButton.bind(this);
      gblAndroidData = null;
      gblSelectedIndex = null;
      pageComponents = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
    }catch(e){
      kony.print("Exception in applyBindings "+e);
    }

  },
  BackButton:function(){
    if(this.view.SideDrawerWC.flxClosePopupVisible){
      this.view.SideDrawerWC.flxClosePopupVisible = false;
      //this.view.SideDrawer.scrollSideDrawerContainer.enableScrolling=true;
    }else if(this.view.flxMainPopup.isVisible){
      controllerReference.view.flxMainPopup.left="-100%";
      this.view.flxMainPopup.isVisible=false;

    }else if(this.view.Popup.isVisible){
      controllerReference.infoPopupOff();
    }else {
      exitApp();  
    }


  },
  onClickBtnClose : function() {
    try{
      controllerReference.view.filterTabFilterCategory.isVisible = false;
      controllerReference.view.flxDownloadOffline.isVisible = false;
      controllerReference.view.filterContents.top="50dp";
      gblFilterCategory = "";
      controllerReference.homePagePreShow();
    }catch(e){
      kony.print("Exception in onClickBtnClose "+e);
    }
  },
  navigateToHome: function() {
    //No Action to take
  },
  navTrackEventAnalytics : function(event_name,click_detail,pageComponents){
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
  navigateToMyContent: function() {
    try{
      //this.navTrackEventAnalytics("click_action", "navigate_mycontentpage",["btnMyContent"]);
      var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"navigate_mycontentpage",
        "click_category":"footer"
        
    	 };
      callTealiumOnClick(onClickDetails,["btnMyContent"], false);
      controllerReference.disableFlex(); // When navigating to my content when toast appears we are getting one error message.
      var nav = new kony.mvc.Navigation("mycontentpage");
      nav.navigate();
    }catch(e){
      kony.print("Exception in navigateToMyContent "+e);
    }

  },
  navigateToSettings: function() {
    //this.navTrackEventAnalytics("click_action", "navigate_settingpage",["btnSettings"]);
    var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"navigate_settingpage",
        "click_category":"footer"
        
    	 };
    callTealiumOnClick(onClickDetails,["btnSettings"], false);
    var nav = new kony.mvc.Navigation("settingpage");
    nav.navigate();
  },
  dismissPopup:function(){
    controllerReference.view.flxMainPopup.left="-100%";
    controllerReference.view.flxMainPopup.isVisible=false;
    var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"Undownload_No"
     };
    callTealiumOnClick(onClickDetails, ["btnNoDelete"], false);
    //callTealiumOnClick("click_action", "Undownload_No",["btnNoDelete"],gblVisitor_imcID);

  },
  navigateToWebApps: function() {
    //this.navTrackEventAnalytics("click_action", "navigate_webapppage",["btnWebpage"]);
    var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"navigate_webapppage",
        "click_category":"footer"
     };
    callTealiumOnClick(onClickDetails, ["btnWebpage"], false);
    var nav = new kony.mvc.Navigation("webapppage");
    nav.navigate();
  },

  DoLayout:function(){
    this.view.CopyFlexContainer0j5a14b1a493542.width = controllerReference.view.lblFilterCategory.frame.width;
  },

  homePagePreShow: function() {
    //kony.store.clear();

    controllerReference.view.lblFilterCategory.doLayout=this.DoLayout;
    if(kony.os.deviceInfo().name=="iPad"){
      this.view.flxMessagePage.height="45%";
      this.view.Popup.flxConfirmation.height="300dp";
      this.view.CopyFlexContainer0ad9eaee26dc747.width="35%";
    }

    try{
      // showLoading("Loading...", null, null);
      if (gblRetailScroll) return;
      contentCount = 0;
      gblCurrentForm = "homepage";
      controllerReference = this;

      kony.print("sreeni preshow called");
      this.infoPopupOff();
      this.view.flexSideDrawer.left = "-100%";
      this.view.SideDrawerWC.flxClosePopupVisible=false;

      //this.view.SideDrawer.scrollSideDrawerContainer.contentOffset = {x:"0",y:"0"};
      // this.view.SideDrawer.scrollSideDrawerContainer.enableScrolling=true;
      this.closeSideDrawer();
      this.view.segHomePageContent.removeAll();
      controllerReference.view.flxDownloadOffline.isVisible = false;
      controllerReference.view.flxMainPopup.left="-100%";
      controllerReference.view.flxMainPopup.isVisible=false;



      controllerReference.view.btnNoDelete.onClick=this.dismissPopup.bind(this);
      controllerReference.view.flxMainPopup.onTouchStart=function(){
        kony.print("Waiting for someone to write something amazing");
      };
      //this.view.segHomePageContent.isVisible = false;

      //sortedContentList = [];

      if (isNetworkAvailable()) {
        kony.print("gblFilterCategory : in preshow : " + gblFilterCategory);
        if (isBlankOrNull(gblFilterCategory)) {
          controllerReference.view.filterTabFilterCategory.isVisible = false;
          controllerReference.view.filterContents.top="50dp";
          segmentData = [];
          gblContentList = [];
          controllerReference.getContentListData();
        } else {    

          this.filterCategory(gblFilterCategory);
          /* if (gblFilterCategory === gblPersonalCare) {
            this.aboutPersonalCareData();
          } else if (gblFilterCategory === gblNutrilite) {
            this.aboutNutriliteData();
          } else if (gblFilterCategory === gblBeauty) {
            this.aboutBeautyData();
          } else if (gblFilterCategory === gblAtHome) {
            this.aboutAtHomeData();
          } else if (gblFilterCategory === gblMoreProducts) {
            this.aboutMoreProductsData();
          } else if (gblFilterCategory === gblAboutAmway) {
            this.aboutAmwayData();
          }else if(gblFilterCategory === gblheritage ){
            this.aboutHeritage();
          }else if(gblFilterCategory === gblFactSheets ){
            this.aboutFacts();
          }else if(gblFilterCategory === gblManufacturing ){
            this.aboutManufacturing();
          }else if(gblFilterCategory === gblAwards ){
            this.aboutAwards();
          }else if(gblFilterCategory === gblCorporate ){
            this.aboutCorporateSocial();
          }else if(gblFilterCategory === gblMedia ){
            this.aboutMedia();
          }else if(gblFilterCategory === gblOpportunity ){
            this.aboutOppurtunity();
          }else if(gblFilterCategory === gblRecognition ){
            this.aboutRecognition();
          }else if(gblFilterCategory === gblBrochures ){
            this.aboutBrochures();
          }else if(gblFilterCategory === gblSeminars ){
            this.aboutSeminars();
          }else if(gblFilterCategory === gblLearning ){
            this.aboutLearning();
          }
          */
        }

      }
      else{
        segmentData = [];
        gblContentList = [];

        kony.print("jani >>> enter into offline mode in homepage : ");
        var offlineContentList = [];
        var offlineContent = retrieveJson("offlineContent");

        kony.print("jani >>> offlineContent data : " +JSON.stringify(offlineContent));
        for (var key in offlineContent) {
          var expr =  !isBlankOrNull(offlineContent[key]["otherLanguageDownload"]) && offlineContent[key]["otherLanguageDownload"];
          kony.print("NSR@@ other language download "+expr);
          if(offlineContent[key]["isDownloaded"] || expr ){
            offlineContentList.push(offlineContent[key]);
          }
        }
        kony.print("Sreeni offlinecontentlist length is ::"+offlineContentList.length);

        try{
          var offlineImageContent = retrieveJsonForImages("offlineImageContent");
          var base64_ = null;
          for(var i=0;i<offlineContentList.length;i++){
            if(!isNetworkAvailable() && isIOS() ){
              var fileName = offlineContentList[i].fileName;
              if(!isBlankOrNull(offlineImageContent)){
                base64_ = offlineImageContent[fileName];
                if(!isBlankOrNull(base64_))
                {
                  kony.print("[Sreeni offline image content base64 is ]" +base64_);
                  offlineContentList[i].imgContent = {base64 :base64_};
                }
              }
            }
            offlineContentList[i].btnShare.onClick = controllerReference.onClickOfShareButton;
            offlineContentList[i].btnDownload.onClick = controllerReference.onClickOfDownloadButton;
            offlineContentList[i].btnBookmark.onClick = controllerReference.onClickOfBookmarkButton;

          }
        }catch(e){
          kony.print("LKJ Exception in homepage offline image fetch "+e);
        }
        var sortedOfflineContentList = kony.table.sort(offlineContentList, "updatedDate",comparisionFunction);
        kony.print("Sreeni after offlinecontentlist length is ::"+sortedOfflineContentList.length);
        //kony.print("jani >>> sortedOfflineContentList :"+JSON.stringify(sortedOfflineContentList));
        kony.print("jani >>> sortedOfflineContentList length : "+sortedOfflineContentList.length);
        segmentData = sortedOfflineContentList;
        gblContentList = sortedOfflineContentList;

        if (isBlankOrNull(gblFilterCategory))
        {
          controllerReference.view.filterTabFilterCategory.isVisible = false;
          controllerReference.view.filterContents.top="50dp";

          controllerReference.scrollToSearchListEnd();
          this.view.segHomePageContent.isVisible = true;

          if(sortedOfflineContentList.length !==0){
            //controllerReference.view.flxToast.isVisible = false;
            controllerReference.view.flxDownloadOffline.isVisible = false;
          }
          else{
            //controllerReference.view.flxToast.isVisible = true;
            controllerReference.view.lblNofilteredData.isVisible = false; 
            controllerReference.view.flxDownloadOffline.isVisible = true;
          }

          try{
            controllerReference.view.flxToast.isVisible = true;
            kony.timer.cancel("timerid");	
          }catch(e){}
          kony.timer.schedule("timerid", this.disableFlex.bind(this), 7, false);



        }else{

          this.filterCategory(gblFilterCategory);
          /*
          if (gblFilterCategory === gblPersonalCare) {
            this.aboutPersonalCareData();
          } else if (gblFilterCategory === gblNutrilite) {
            this.aboutNutriliteData();
          } else if (gblFilterCategory === gblBeauty) {
            this.aboutBeautyData();
          } else if (gblFilterCategory === gblAtHome) {
            this.aboutAtHomeData();
          } else if (gblFilterCategory === gblMoreProducts) {
            this.aboutMoreProductsData();
          } else if (gblFilterCategory === gblAboutAmway) {
            this.aboutAmwayData();
          }else if(gblFilterCategory === gblheritage ){
            this.aboutHeritage();
          }else if(gblFilterCategory === gblFactSheets ){
            this.aboutFacts();
          }else if(gblFilterCategory === gblManufacturing ){
            this.aboutManufacturing();
          }else if(gblFilterCategory === gblAwards ){
            this.aboutAwards();
          }else if(gblFilterCategory === gblCorporate ){
            this.aboutCorporateSocial();
          }else if(gblFilterCategory === gblMedia ){
            this.aboutMedia();
          }else if(gblFilterCategory === gblOpportunity ){
            this.aboutOppurtunity();
          }else if(gblFilterCategory === gblRecognition ){
            this.aboutRecognition();
          }else if(gblFilterCategory === gblBrochures ){
            this.aboutBrochures();
          }else if(gblFilterCategory === gblSeminars ){
            this.aboutSeminars();
          }else if(gblFilterCategory === gblLearning ){
            this.aboutLearning();
          }

*/
        }

      }
    }catch(e){
      kony.print("Exception in homePagePreShow "+e);
    }

  },
  homePagePostShow: function() {
    try{
      if (gblRetailScroll){
        gblRetailScroll = false;
      } 
	  
      var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
      kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
      callTealiumOnScreenLoad(this.view.id,additionalArg,null,false); 
      //controllerReference.PostshowAnalytics(this.view);

      var prevForm = kony.application.getPreviousForm().id ;
      gblFormBack.push(prevForm);
      kony.print(" jani >>> homepage page previous form " +gblFormBack);
      gblCurrentForm = "homepage";
      kony.print("sreeni postShow called -> " + gblCurrentForm);
    }catch(e){
      kony.print("Exception in homepage "+e);
    }

  },
  PostshowAnalytics :function(formName){
    try{
      var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
      //additionalArg.push(this.view.id);
      kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
      //callTealiumOnScreenLoad(this.view,additionalArg,gblVisitor_imcID);
      callTealiumOnScreenLoad(this.view.id,additionalArg,null,false); 
    }catch(e){
      kony.print("Exception is "+ e);
    }
  }, 
  disableFlex: function() {
    controllerReference.view.flxToast.isVisible = false;
    try{
      kony.timer.cancel("timerid");	
    }catch(e){}
  },
  showHiddenOptions: function() {
    animate(this.view.hiddenOptionsContainer, {
      "bottom": "0dp"
    });
  },
  hideHiddenOptions: function() {
    animate(this.view.hiddenOptionsContainer, {
      "bottom": "-285dp"
    });
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


    animate(this.view.flexSideDrawer, {
      "left": "0%"
    });
  },
  closeSideDrawer: function() {
    animate(this.view.flexSideDrawer, {
      "left": "-100%"
    });


  },
  initializeMF: function(context,data) {
    kony.print(" ********** Entering into initializeMF ********** ");
    if (isNetworkAvailable()) {
      showLoading();
      mobileFabricConfiguration.konysdkObject = new kony.sdk();
      mobileFabricConfiguration.konysdkObject.init(mobileFabricConfiguration.appKey, mobileFabricConfiguration.appSecret, mobileFabricConfiguration.serviceURL, function(response) {
        kony.print(" ********** Entering into initializeMFSuccess ********** ");
        kony.print(" ********** Success initializeMFSuccess response : " + JSON.stringify(response) + " ********** ");
        mobileFabricConfiguration.isKonySDKObjectInitialized = true;
        dismissLoading();
        kony.print("initialization successful");
        if (context == "GET_HOME_PAGE_DATA") {
          if (isBlankOrNull(gblFilterCategory)) {
            controllerReference.view.filterTabFilterCategory.isVisible = false;
            controllerReference.view.filterContents.top="50dp";
            controllerReference.getContentListData();
          } else {
            this.filterCategory(gblFilterCategory);
            /*
            if (gblFilterCategory === gblPersonalCare) {
              this.aboutPersonalCareData();
            } else if (gblFilterCategory === gblNutrilite) {
              this.aboutNutriliteData();
            } else if (gblFilterCategory === gblBeauty) {
              this.aboutBeautyData();
            } else if (gblFilterCategory === gblAtHome) {
              this.aboutAtHomeData();
            } else if (gblFilterCategory === gblMoreProducts) {
              this.aboutMoreProductsData();
            } else if (gblFilterCategory === gblAboutAmway) {
              this.aboutAmwayData();
            }else if(gblFilterCategory === gblheritage ){
              this.aboutHeritage();
            }else if(gblFilterCategory === gblFactSheets ){
              this.aboutFacts();
            }else if(gblFilterCategory === gblManufacturing ){
              this.aboutManufacturing();
            }else if(gblFilterCategory === gblAwards ){
              this.aboutAwards();
            }else if(gblFilterCategory === gblCorporate ){
              this.aboutCorporateSocial();
            }else if(gblFilterCategory === gblMedia ){
              this.aboutMedia();
            }else if(gblFilterCategory === gblOpportunity ){
              this.aboutOppurtunity();
            }else if(gblFilterCategory === gblRecognition ){
              this.aboutRecognition();
            }else if(gblFilterCategory === gblBrochures ){
              this.aboutBrochures();
            }else if(gblFilterCategory === gblSeminars ){
              this.aboutSeminars();
            }else if(gblFilterCategory === gblLearning ){
              this.aboutLearning();
            }
            */
          }
        }else if (context == "GET_BRIGHTCOVE_DATA") {
          controllerreference.getBrightCoveVideoData(data);
          //controllerReference.getContentListData();
        }
        kony.print(" ********** Exiting out of initializeMFSuccess ********** ");
      }, function(error) {
        kony.print(" ********** Entering into initializeMFFailure ********** ");
        kony.print(" ********** Failure in initializeMF: " + JSON.stringify(error) + " ********** ");
        controllerReference.view.flxDownloadOffline.isVisible = true;
        dismissLoading();
        controllerReference.infoPopupOn(getI18Value("ServiceFailureMessage"));
        kony.print(" ********** Exiting out of initializeMFFailure ********** ");
      });
    } else {
      kony.print("sreeni showing toast when there is no n/w");
      controllerReference.view.flxToast.isVisible = true;
      controllerReference.view.lblNofilteredData.isVisible = false ;
      controllerReference.view.flxDownloadOffline.isVisible = true;

      try{
        kony.timer.cancel("timerid");	
      }catch(e){}			
      kony.timer.schedule("timerid", controllerReference.disableFlex.bind(this), 5, false);
    }
    kony.print(" ********** Exiting out of initializeMF ********** ");
  },
  getContentListData: function() {
    kony.print("Inside getContentListData function");
    if (isNetworkAvailable()) {
      showLoading();
      if (mobileFabricConfiguration.isKonySDKObjectInitialized) {
        kony.print("inside if condition");
        mobileFabricConfiguration.integrationObj = mobileFabricConfiguration.konysdkObject.getIntegrationService(mobileFabricConfiguration.integrationServices[4].service);
        var operationName = mobileFabricConfiguration.integrationServices[4].operations[3];
        var headers = {};
        var data = {};
        kony.print("Operation name : " + operationName);
        mobileFabricConfiguration.integrationObj.invokeOperation(operationName, headers, data, this.getContentListDataSuccessCallback, this.getContentListDataErrorCallback);
      } else {
        this.initializeMF("GET_HOME_PAGE_DATA");
      }
    }
    else {
      controllerReference.view.flxToast.isVisible = true;
      controllerReference.view.lblNofilteredData.isVisible = false ;
      controllerReference.view.flxDownloadOffline.isVisible = true;
      try{
        kony.timer.cancel("timerid");	
      }catch(e){}	
      try{
        kony.timer.schedule("timerid", controllerReference.disableFlex.bind(this), 5, false);
      }catch(e){

      }

      //controllerReference.getContentListOfflineData();
    }
  },
  getContentListDataSuccessCallback: function(contentListResponse) {
    if (contentListResponse["opstatus"] === 0) {

      kony.print("*************** Entering into contactusSuccessCallback *************************");
      //kony.print("Response : " + JSON.stringify(contentListResponse));

      if (contentListResponse.contentList != null && contentListResponse.contentList.length > 0) {
        var data = contentListResponse.contentList;
        kony.print("Ramu >>>>> Data is : " + JSON.stringify(data));

        /*for(var g = 0; g < data.gength; g++){
            for(var f = g+1; f < data.length; f++){
            if(data[g]["contentId"] ==data[f]["contentId"]){
                kony.print("hello  content id repeated::"+ data[f]["contentId"]);
            }
            }        
        }	 
        kony.print("\n\n\n\n") ;*/


        var btnShareSkn = "sknShare";
        var btnBookmarkSkn = "sknBookmark";
        var btnDownloadSkn = "sknBtnDownload";

        //kony.print("data length : " + data.length);
        for (var i = 0; i < data.length; i++) {


          try{
            var record = {};
            var title = data[i]["title"];
            var FullTitle=title;
            kony.print("title is -"+title.length);
            if (title !== null && title !== "" && title !== undefined && title.length > 42) {
              title = title.substring(0, 42) + "...";
            }

            if(kony.os.deviceInfo().name=="iPad"){
              if (title !== null && title !== "" && title !== undefined && title.length > 32) {
                title = title.substring(0, 32) + "...";
              }
            }


            kony.print("title::"+title+ "\n");
            var pdfFileName =  data[i]["pdfFileName"];
            var videoFileName = data[i]["videoFileName"];
            var pdfUrl = data[i]["pdfUrl"];
            var videoUrl = data[i]["videoUrl"];
            var brightCoveUrl = data[i]["brightCoveUrl"]
            var htmlUrl = data[i]["htmlUrl"];
            var ebookUrl = data[i]["ebookUrl"];

            var contentId = data[i]["contentId"];
            var updatedDate = parseInt(changeDateToMilliseconds(data[i]["updatedAt"]));
            if (videoUrl === null || videoUrl === "null" || videoUrl === "") {
              videoUrl = brightCoveUrl;
            }

            var category=[];
            var catTitle="";
            var pdfTitle="";
            category = data[i]["category"];
            catTitle = category[0]["categoryTitle"];
            pdfTitle = data[i]["pdfTitle"];
            if (isBlankOrNull(pdfTitle)) {
              kony.print("pdf title null for title::"+title+ "\n");
              pdfTitle = title;
            }
            if (pdfTitle.length > 42) {
              pdfTitle = pdfTitle.substring(0, 42) + "...";
            }

            if(kony.os.deviceInfo().name=="iPad"){
              if (pdfTitle.length > 32) {
                pdfTitle = pdfTitle.substring(0, 32) + "...";
              }
            }

            var pdfDesc = data[i]["pdfDescription"];
            var pdfFullDesc=pdfDesc;
            var pdfSeemoreText;
            if(isBlankOrNull(pdfDesc)){
              pdfSeemoreText = "";
            }
            else{
              pdfSeemoreText = "See more";
            }
            if (pdfDesc !== null && pdfDesc !== "" && pdfDesc !== undefined && pdfDesc.length > 115) {
              if(isIOS()){
                pdfDesc = pdfDesc.substring(0, 110) + "...";
              }
              else{
                pdfDesc = pdfDesc.substring(0, 115) + "...";
              }

            }

            var pdfImg = "imagedrag.png";
            pdfImg = data[i]["pdfImage"];
            if (pdfImg === null || pdfImg === "null") {
              pdfImg = "imagedrag.png";
            }
            var videoTitle = data[i]["videoTitle"];
            if (isBlankOrNull(videoTitle)) {
              videoTitle = title;
            }
            if (videoTitle.length > 42) {
              videoTitle = videoTitle.substring(0, 42) + "...";
            }

            if(kony.os.deviceInfo().name=="iPad"){
              if (videoTitle.length > 32) {
                videoTitle = videoTitle.substring(0, 32) + "...";
              }
            }

            var videoDesc = data[i]["videoDescription"];
            var videoFullDesc=videoDesc;
            var videoSeemoreText;
            if(isBlankOrNull(videoDesc)){
              videoSeemoreText = "";
            }
            else{
              videoSeemoreText = "See more";
            }
            if (videoDesc !== null && videoDesc !== "" && videoDesc !== undefined && videoDesc.length > 115) {
              if(isIOS()){
                videoDesc = videoDesc.substring(0, 110) + "...";
              }
              else{
                videoDesc = videoDesc.substring(0, 115) + "...";
              }
            }
            var videoImg = "imagedrag.png";
            videoImg = data[i]["videoImage"];
            if (videoImg === null || videoImg === "null") {
              videoImg = "imagedrag.png";
            }
            var htmlTitle = data[i]["htmlTitle"];
            if (isBlankOrNull(htmlTitle)) {
              htmlTitle = title;
            }
            if (htmlTitle.length > 42) {
              htmlTitle = htmlTitle.substring(0, 42) + "...";
            }

            if(kony.os.deviceInfo().name=="iPad"){
              if (htmlTitle.length > 32) {
                htmlTitle = htmlTitle.substring(0, 32) + "...";
              }
            }


            var htmlDesc = data[i]["htmlDescription"];
            var htmlFullDesc=htmlDesc;
            var htmlSeemoreText;
            if(isBlankOrNull(htmlDesc)){
              htmlSeemoreText = "";
            }
            else{
              htmlSeemoreText = "See more";
            }
            if (htmlDesc !== null && htmlDesc !== "" && htmlDesc !== undefined && htmlDesc.length > 115) {
              if(isIOS()){
                htmlDesc = htmlDesc.substring(0, 110) + "...";
              }else{
                htmlDesc = htmlDesc.substring(0, 115) + "...";
              }

            }

            var ebookTitle = data[i]["ebookTitle"];
            if (isBlankOrNull(ebookTitle)) {
              ebookTitle = title;
            }
            if (ebookTitle.length > 42) {
              ebookTitle = ebookTitle.substring(0, 42) + "...";
            }

            if(kony.os.deviceInfo().name=="iPad"){
              if (ebookTitle.length > 32) {
                ebookTitle = ebookTitle.substring(0, 32) + "...";
              }
            }


            var ebookImg = data[i]["ebookImg"];
            if (ebookImg==="<null>" ||ebookImg === null || ebookImg === "null" || ebookImg === "" || ebookImg === undefined || ebookImg === "undefined") {
              ebookImg = "imagedrag.png";    
            }
            var ebookDesc = data[i]["ebookDesc"];
            var ebookFullDesc=ebookDesc;
            var eBookSeemoreText;
            if(isBlankOrNull(ebookDesc)){
              eBookSeemoreText = "";
            }
            else{
              eBookSeemoreText = "See more";
            }
            if (ebookDesc !== null && ebookDesc !== "" && ebookDesc !== undefined && ebookDesc.length > 115) {
              if(isIOS()){
                ebookDesc = ebookDesc.substring(0, 110) + "...";
              }else{
                ebookDesc = ebookDesc.substring(0, 115) + "...";
              }

            }

            var htmlImg = data[i]["htmlImage"];

            if (htmlImg==="<null>" ||htmlImg === null || htmlImg === "null" || htmlImg === "" || htmlImg === undefined || htmlImg === "undefined") {
              htmlImg = "imagedrag.png";    
            }

            var pdfDownload = data[i]["pdfDownloadable"];
            var videoDownload = data[i]["videoDownloadable"];
            var pdfShareable = data[i]["pdfShareable"];
            var videoShareable = data[i]["videoShareable"];

            //Below two variables are common for both video and pdf
            var isDownload = "";
            var isShareable = "";


            var btnShareData = {};
            var btnDownloadData = {};

            var pdfUrlList = data[i]["pdfUrlList"];
            var videoUrlList = data[i]["videoUrlList"];
            var ebookUrlList = data[i]["ebookUrlList"];

            if (catTitle !== null && catTitle !== "" && catTitle !== "Article") {

              if (pdfUrlList !== null && pdfUrlList !== undefined && pdfUrlList.length > 0) {
                //alert("pdfDownload"+pdfDownload);
                /** Logic for handling PDF languages --- start*/
                var pdfLanguages = [];
                var pdfLanguageUrls = [];
                for (var j=0; j<pdfUrlList.length; j++) {
                  var record = {};
                  var language = pdfUrlList[j]["pdfLanguage"];
                  var version = pdfUrlList[j]["pdfVersion"];
                  if (language === null || language === "null") {
                    language = gblLanguage.toLowerCase();
                  }

                  if(version===null || version ==="null"){
                    version=0;
                  }else{
                    version=parseInt(version);
                  }
                  pdfLanguages.push([language, language]);
                  var pdfUrlValue = pdfUrlList[j]["pdfUrl"];
                  /*if (pdfUrlValue === null || pdfUrlValue === "null" || !pdfUrlValue.startsWith("http")) {
                  pdfUrlValue = "https://assets.contentstack.io/v3/assets/blte699a6163cd8c122/blt4c999becf09debbf/5a6086411c8c426f0be551f6/download";
                }*/
                  record["language"] = language;
                  record["url"] = pdfUrlValue;
                  record["version"]=version;
                  if (language !== null && language !== undefined && language.toLowerCase() === gblLanguage.toLowerCase()) {
                    pdfUrl = pdfUrlValue;
                  }
                  pdfLanguageUrls.push(record);
                }
                kony.print("PDFLanguages : " + JSON.stringify(pdfLanguages));
                kony.print("PDFLanguages URLs : " + JSON.stringify(pdfLanguageUrls));
                /** Logic for handling PDF languages --- end*/

                if (pdfShareable === "false") {
                  btnShareData = {
                    skin: "sknShareDisable",
                    focusSkin: "sknShareDisable",
                    onClick: this.onClickOfShareButton,
                  };
                  isShareable = "false";
                }else if (isBlankOrNull(pdfUrl)){
                  btnShareData = {
                    skin: "sknShareDisable",
                    focusSkin: "sknShareDisable",
                    onClick: this.onClickOfShareButton,
                  };
                  isShareable = "true";
                }else {
                  btnShareData = {
                    skin: "sknShare",
                    focusSkin:"sknShareActive",
                    onClick: this.onClickOfShareButton,
                  };
                  isShareable = "true";
                }

                kony.print("PDFDownload : " + pdfDownload);
                if (pdfDownload === "false") {
                  kony.print("SR@ pdf non download");
                  btnDownloadData = {
                    skin: "sknBtnDownloadDisable",
                    focusSkin :"sknBtnDownloadDisable"
                  };
                  isDownload = "false";
                }else if ( isBlankOrNull(pdfUrl)) {
                  kony.print("SR@ pdf non download");
                  btnDownloadData = {
                    skin: "sknBtnDownloadDisable",
                    focusSkin :"sknBtnDownloadDisable"
                  };
                  isDownload = "true";
                } else {
                  kony.print("SR@ pdf download");
                  btnDownloadData = {
                    onClick:this.onClickOfDownloadButton,
                    skin: "sknBtnDownload"
                  };
                  isDownload = "true";
                }
                var img_src="";
                if(category[0]["categoryTitle"].toLowerCase() =="more products"){
                  img_src="more_productsbb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="about amway"){
                  img_src="amwayiconbb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="artistry" || category[0]["categoryTitle"].toLowerCase()=="attitude" || category[0]["categoryTitle"].toLowerCase()=="beauty" ){
                  img_src="beautybb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="at home"){
                  img_src="homebb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="personal care"){
                  img_src="personal_carebb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="nutrition"){
                  img_src="nutritionbb.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="heritage & values"){
                  img_src="heritage_and_values.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="fact sheets"){
                  img_src="fact_sheets.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="manufacturing"){
                  img_src="manufacturing.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="awards & accolades"){
                  img_src="awards_and_accolades.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="corporate social responsibilities"){
                  img_src="corporate_social_responsibilities.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="media releases"){
                  img_src="media_releases.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="business opportunity"){
                  img_src="business_opportunity.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="amway recognition"){
                  img_src="amway_recognition.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="business brochures"){
                  img_src="business_brochures.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="business seminars and conferences"){
                  img_src="business_seminars_and_conferences.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="learning and development"){
                  img_src="learning_and_development.png";
                }
                record = {
                  "fileName":pdfFileName,
                  "profileName": category[0]["categoryTitle"],
                  "profileSub": category[0]["categoryDesc"],
                  "profileImg":img_src,
                  "lbltitle": pdfTitle,
                  "FullTitle":FullTitle,
                  "contentId": contentId,
                  "UID": contentId+data[i]["pdfUid"]+"English",
                  "contentType": "pdf",
                  "lblSeeMore": pdfSeemoreText,
                  "lblLine":{
                    isVisible: true
                  },
                  "lblLineSeparator":{
                    isVisible: true
                  },
                  "imgContent": pdfImg,
                  "rchContentDesc": pdfDesc,
                  "FullDesc":pdfFullDesc,
                  "url": pdfUrl,
                  "updatedDate": updatedDate,
                  "isDownload":isDownload,
                  "isShareable":isShareable,
                  "btnShare": btnShareData,
                  "btnBookmark": {
                    onClick:this.onClickOfBookmarkButton,
                    skin: btnBookmarkSkn
                  },
                  "btnDownload": btnDownloadData,
                  "flxDownloadOverlay": {onClick : function(){},isVisible:false},
                  "loaderActive":{isVisible:true,src:"wheel1.gif"},"loaderInactive":{isVisible:true,src:"wheel.png"},
                  "btnPauseDownload":{isVisible:true,onClick:this.pauseDownload},
                  "closeOverlay":{isVisible:true, onClick:this.onClickCloseOverlay},
                  "pdfLanguages":pdfLanguages,
                  "pdfLanguageUrls":pdfLanguageUrls
                };

                segmentData.push(record);
              } 


              if (videoUrlList !== null && videoUrlList !== undefined && videoUrlList.length > 0) {

                /** Logic for handling Video languages --- start*/
                var videoLanguages = [];
                var videoLanguageUrls = [];
                for (var j=0; j<videoUrlList.length; j++) {
                  var record = {};
                  var language = videoUrlList[j]["videoLanguage"];
                  var version = videoUrlList[j]["videoVersion"];
                  videoLanguages.push([language, language]);

                  if(version===null || version ==="null"){
                    version=0;
                  }else{
                    version=parseInt(version);
                  }

                  var videoUrlValue = videoUrlList[j]["videoUrl"];
                  record["language"] = language;
                  record["url"] = videoUrlValue;
                  record["version"]=version;
                  if (language !== null && language !== undefined && language.toLowerCase() === gblLanguage.toLowerCase()) {
                    videoUrl = videoUrlValue;
                  }
                  videoLanguageUrls.push(record);
                }
                kony.print("videoLanguages : " + JSON.stringify(videoLanguages));
                kony.print("videoLanguages URLs : " + JSON.stringify(videoLanguageUrls));
                /** Logic for handling Video languages --- end*/

                if (videoShareable === "false") {
                  btnShareData = {
                    skin: "sknShareDisable",
                    focusSkin: "sknShareDisable",
                    onClick: this.onClickOfShareButton,
                  };
                  isShareable = "false";
                }else if ( isBlankOrNull(videoUrl)) {
                  btnShareData = {
                    skin: "sknShareDisable",
                    focusSkin: "sknShareDisable",
                    onClick: this.onClickOfShareButton,
                  };
                  isShareable = "true";
                } else {
                  btnShareData = {
                    skin: "sknShare",
                    focusSkin:"sknShareActive",
                    onClick: this.onClickOfShareButton,
                  };
                  isShareable = "true";
                }

                if (videoDownload === "false") {
                  btnDownloadData = {
                    skin: "sknBtnDownloadDisable",
                    focusSkin: "sknBtnDownloadDisable"
                  };
                  isDownload = "false";
                }else if ( isBlankOrNull(videoUrl)) {
                  btnDownloadData = {
                    skin: "sknBtnDownloadDisable",
                    focusSkin: "sknBtnDownloadDisable"
                  };
                  isDownload = "true";
                }  else {
                  btnDownloadData = {
                    onClick: this.onClickOfDownloadButton,
                    skin: "sknBtnDownload"
                  };
                  isDownload = "true";
                }

                var img_src="";
                if(category[0]["categoryTitle"].toLowerCase() =="more products"){
                  img_src="more_productsbb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="about amway"){
                  img_src="amwayiconbb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="artistry" || category[0]["categoryTitle"].toLowerCase()=="attitude" || category[0]["categoryTitle"].toLowerCase()=="beauty" ){
                  img_src="beautybb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="at home"){
                  img_src="homebb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="personal care"){
                  img_src="personal_carebb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="nutrition"){
                  img_src="nutritionbb.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="heritage & values"){
                  img_src="heritage_and_values.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="fact sheets"){
                  img_src="fact_sheets.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="manufacturing"){
                  img_src="manufacturing.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="awards & accolades"){
                  img_src="awards_and_accolades.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="corporate social responsibilities"){
                  img_src="corporate_social_responsibilities.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="media releases"){
                  img_src="media_releases.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="business opportunity"){
                  img_src="business_opportunity.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="amway recognition"){
                  img_src="amway_recognition.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="business brochures"){
                  img_src="business_brochures.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="business seminars and conferences"){
                  img_src="business_seminars_and_conferences.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="learning and development"){
                  img_src="learning_and_development.png";
                }


                record = {
                  "fileName":videoFileName,
                  "profileName": category[0]["categoryTitle"],
                  "profileSub": category[0]["categoryDesc"],
                  "profileImg": img_src,
                  "lbltitle": videoTitle,
                  "FullTitle":FullTitle,
                  "contentId": contentId,
                  "UID": contentId+data[i]["videoUid"]+"English",
                  "contentType": "video",
                  "lblSeeMore": videoSeemoreText,
                  "lblLine":{
                    isVisible: true
                  },
                  "lblLineSeparator":{
                    isVisible: true
                  },
                  "imgContent": videoImg,
                  "rchContentDesc": videoDesc,
                  "FullDesc":videoFullDesc,
                  "url": videoUrl,
                  "updatedDate": updatedDate,
                  "isDownload":isDownload,
                  "isShareable":isShareable,
                  "btnShare": btnShareData,
                  "btnBookmark": {
                    onClick:this.onClickOfBookmarkButton,
                    skin: btnBookmarkSkn
                  },
                  "btnDownload": btnDownloadData,
                  "flxDownloadOverlay": {onClick : function(){},isVisible:false},
                  "loaderActive":{isVisible:true,src:"wheel1.gif"},"loaderInactive":{isVisible:true,src:"wheel.png"},
                  "btnPauseDownload":{isVisible:true,onClick:this.pauseDownload},
                  "closeOverlay":{isVisible:true, onClick:this.onClickCloseOverlay},
                  "videoLanguages":videoLanguages,
                  "videoLanguageUrls":videoLanguageUrls
                };
                segmentData.push(record);
              }

              //[Sreeni]Consider brightcove only when Build.io url is not there( which is handled above)

              /*if (!isBlankOrNull(brightCoveUrl)) {

              if (videoShareable === "false") {
                btnShareData = {
                  skin: "sknShareDisable",
                  focusSkin: "sknShareDisable",
                  onClick: this.onClickOfShareButton,
                };
                isShareable = "false";
              } else {
                btnShareData = {
                  skin: "sknShare",
                  focusSkin:"sknShareActive",
                  onClick: this.onClickOfShareButton,
                };
                isShareable = "true";
              }

              if (videoDownload === "false") {
                btnDownloadData = {
                  skin: "sknBtnDownloadDisable",
                  focusSkin: "sknBtnDownloadDisable"
                };
                isDownload = "false";
              } else {
                btnDownloadData = {
                  onClick: this.onClickOfDownloadButton,
                  skin: "sknBtnDownload",
                };
                isDownload = "true";
              }


              record = {
                "profileName": category[0]["categoryTitle"],
                "profileSub": category[0]["categoryDesc"],
                "profileImg": category[0]["categoryImage"],
                "lbltitle": data[i]["videoTitle"],
                "contentId": contentId,
                "UID": data[i]["videoUid"],
                "contentType": "video",
                "lblSeeMore": "See more",
                "lblLine":{
                  isVisible: true
                },
                "lblLineSeparator":{
                  isVisible: true
                },
                "imgContent": videoImg,
                "rchContentDesc": videoDesc,
                "url": brightCoveUrl,
                "updatedDate": updatedDate,
                "isDownload":isDownload,
                "isShareable": isShareable,
                "btnShare": btnShareData,
                "btnBookmark": {
                  onClick: this.onClickOfBookmarkButton,
                  skin: btnBookmarkSkn
                },
                "btnDownload": btnDownloadData

              };
              segmentData.push(record);
            } */

              var img_src="";
              if(category[0]["categoryTitle"].toLowerCase() =="more products"){
                img_src="more_productsbb.png";
              }else if(category[0]["categoryTitle"].toLowerCase()=="about amway"){
                img_src="amwayiconbb.png";
              }else if(category[0]["categoryTitle"].toLowerCase()=="artistry" || category[0]["categoryTitle"].toLowerCase()=="attitude" || category[0]["categoryTitle"].toLowerCase()=="beauty" ){
                img_src="beautybb.png";
              }else if(category[0]["categoryTitle"].toLowerCase()=="at home"){
                img_src="homebb.png";
              }else if(category[0]["categoryTitle"].toLowerCase()=="personal care"){
                img_src="personal_carebb.png";
              }else if(category[0]["categoryTitle"].toLowerCase()=="nutrition"){
                img_src="nutritionbb.png";
              }else if((category[0]["categoryTitle"]).toLowerCase() =="heritage & values"){
                img_src="heritage_and_values.png";
              }else if((category[0]["categoryTitle"]).toLowerCase() =="fact sheets"){
                img_src="fact_sheets.png";
              }else if((category[0]["categoryTitle"]).toLowerCase() =="manufacturing"){
                img_src="manufacturing.png";
              }else if((category[0]["categoryTitle"]).toLowerCase() =="awards & accolades"){
                img_src="awards_and_accolades.png";
              }else if((category[0]["categoryTitle"]).toLowerCase() =="corporate social responsibilities"){
                img_src="corporate_social_responsibilities.png";
              }else if((category[0]["categoryTitle"]).toLowerCase() =="media releases"){
                img_src="media_releases.png";
              }else if((category[0]["categoryTitle"]).toLowerCase() =="business opportunity"){
                img_src="business_opportunity.png";
              }else if((category[0]["categoryTitle"]).toLowerCase() =="amway recognition"){
                img_src="amway_recognition.png";
              }else if((category[0]["categoryTitle"]).toLowerCase() =="business brochures"){
                img_src="business_brochures.png";
              }else if((category[0]["categoryTitle"]).toLowerCase() =="business seminars and conferences"){
                img_src="business_seminars_and_conferences.png";
              }else if((category[0]["categoryTitle"]).toLowerCase() =="learning and development"){
                img_src="learning_and_development.png";
              }


              if (!isBlankOrNull(htmlUrl)) {

                record = {
                  "profileName": category[0]["categoryTitle"],
                  "profileSub": category[0]["categoryDesc"],
                  "profileImg": img_src,
                  "lbltitle": htmlTitle,
                  "FullTitle":FullTitle,
                  "contentId": contentId,
                  "UID": data[i]["htmlUid"]+"English",
                  "contentType": "html",
                  "lblSeeMore": htmlSeemoreText,
                  "lblLine":{
                    isVisible: true
                  },
                  "lblLineSeparator":{
                    isVisible: true
                  },
                  "imgContent": htmlImg,
                  "rchContentDesc": htmlDesc,
                  "FullDesc":htmlFullDesc,
                  "url": htmlUrl,
                  "updatedDate": updatedDate,
                  "isDownload": "false",
                  "btnShare": {
                    setEnabled: false,
                    skin: "sknShareDisable",
                    focusSkin: "sknShareDisable"
                  },
                  "btnBookmark": {
                    onClick:this.onClickOfBookmarkButton,
                    skin: btnBookmarkSkn
                  },
                  "btnDownload": {
                    setEnabled: false,
                    skin :"sknBtnDownloadDisable",
                    focusSkin :"sknBtnDownloadDisable"
                  },
                  "isShareable": "false",
                  "flxDownloadOverlay": {onClick : function(){},isVisible:false},
                  "loaderActive":{isVisible:true,src:"wheel1.gif"},"loaderInactive":{isVisible:true,src:"wheel.png"},
                  "btnPauseDownload":{isVisible:true,onClick:this.pauseDownload},
                  "closeOverlay":{isVisible:true, onClick:this.onClickCloseOverlay}
                };
                segmentData.push(record);
              }

              if (ebookUrlList !== null && ebookUrlList !== undefined && ebookUrlList.length > 0) {

                /** Logic for handling eBook languages --- start*/
                var ebookLanguages = [];
                var ebookLanguageUrls = [];
                for (var j=0; j<ebookUrlList.length; j++) {
                  var record = {};
                  var language = ebookUrlList[j]["ebookLanguage"];
                  ebookLanguages.push([language, language]);
                  var ebookUrlValue = ebookUrlList[j]["ebookUrl"];
                  record["language"] = language;
                  record["url"] = ebookUrlValue;
                  if (language !== null && language !== undefined && language.toLowerCase() === gblLanguage.toLowerCase()) {
                    ebookUrl = ebookUrlValue;
                  }
                  ebookLanguageUrls.push(record);
                }
                kony.print("ebookLanguages : " + JSON.stringify(ebookLanguages));
                kony.print("ebookLanguages URLs : " + JSON.stringify(ebookLanguageUrls));
                /** Logic for handling eBook languages --- end*/
                var ebookDesc = data[i]["ebookDesc"];
                if(isBlankOrNull(ebookDesc)){ 
                  ebookDesc = "";
                }
                if (ebookDesc !== null && ebookDesc !== "" && ebookDesc !== undefined && ebookDesc.length > 115) {
                  if(isIOS()){
                    ebookDesc = ebookDesc.substring(0, 110) + "...";
                  }else{
                    ebookDesc = ebookDesc.substring(0, 115) + "...";
                  }

                }


                var img_src="";
                if(category[0]["categoryTitle"].toLowerCase() =="more products"){
                  img_src="more_productsbb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="about amway"){
                  img_src="amwayiconbb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="artistry" || category[0]["categoryTitle"].toLowerCase()=="attitude" || category[0]["categoryTitle"].toLowerCase()=="beauty" ){
                  img_src="beautybb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="at home"){
                  img_src="homebb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="personal care"){
                  img_src="personal_carebb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="nutrition"){
                  img_src="nutritionbb.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="heritage & values"){
                  img_src="heritage_and_values.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="fact sheets"){
                  img_src="fact_sheets.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="manufacturing"){
                  img_src="manufacturing.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="awards & accolades"){
                  img_src="awards_and_accolades.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="corporate social responsibilities"){
                  img_src="corporate_social_responsibilities.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="media releases"){
                  img_src="media_releases.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="business opportunity"){
                  img_src="business_opportunity.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="amway recognition"){
                  img_src="amway_recognition.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="business brochures"){
                  img_src="business_brochures.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="business seminars and conferences"){
                  img_src="business_seminars_and_conferences.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="learning and development"){
                  img_src="learning_and_development.png";
                }

                record = {
                  "profileName": category[0]["categoryTitle"],
                  "profileSub": category[0]["categoryDesc"],
                  "profileImg": img_src,
                  "lbltitle": ebookTitle,
                  "FullTitle":FullTitle,
                  "contentId": contentId,
                  "UID": contentId+data[i]["ebookUid"]+"English",
                  "contentType": "ebook",
                  "lblSeeMore": eBookSeemoreText,
                  "lblLine":{
                    isVisible: true
                  },
                  "lblLineSeparator":{
                    isVisible: true
                  },
                  "imgContent": ebookImg,
                  "rchContentDesc": ebookDesc,
                  "FullDesc":ebookFullDesc,
                  "url": ebookUrl,
                  "updatedDate": updatedDate,
                  "isDownload": "false",
                  "isShareable": "false",
                  "btnShare": {
                    setEnabled: false,
                    skin: "sknShareDisable",
                    focusSkin:"sknShareDisable",
                  },
                  "btnBookmark": {
                    onClick:this.onClickOfBookmarkButton,
                    skin: btnBookmarkSkn
                  },
                  "btnDownload": {
                    setEnabled: false,
                    skin:"sknBtnDownloadDisable",
                    focusSkin:"sknBtnDownloadDisable",

                  },
                  "flxDownloadOverlay": {onClick : function(){},isVisible:false},
                  "loaderActive":{isVisible:true,src:"wheel1.gif"},"loaderInactive":{isVisible:true,src:"wheel.png"},
                  "btnPauseDownload":{isVisible:true,onClick:this.pauseDownload},
                  "closeOverlay":{isVisible:true, onClick:this.onClickCloseOverlay},
                  "ebookLanguages":ebookLanguages,
                  "ebookLanguageUrls":ebookLanguageUrls
                };
                segmentData.push(record);
              }

            } 
            else if (catTitle !== null && catTitle !== "" && catTitle === "Article") {
              kony.print("PDF Url : " + pdfUrl);
              kony.print("Video Url : " + videoUrl);
              //|| !isBlankOrNull(pdfTitle) || !isBlankOrNull(pdfDesc)
              if (pdfUrlList !== null && pdfUrlList !== undefined && pdfUrlList.length > 0) {
                /** Logic for handling PDF languages --- start*/
                var pdfLanguages = [];
                var pdfLanguageUrls = [];
                for (var j=0; j<pdfUrlList.length; j++) {
                  var record = {};
                  var language = pdfUrlList[j]["pdfLanguage"];
                  var version = pdfUrlList[j]["pdfVersion"];

                  if(version===null || version ==="null"){
                    version=0;
                  }else{
                    version=parseInt(version);
                  }

                  pdfLanguages.push([language, language]);
                  var pdfUrlValue = pdfUrlList[j]["pdfUrl"];
                  record["language"] = language;
                  record["url"] = pdfUrlValue;
                  record["version"] = version;
                  if (language !== null && language !== undefined && language.toLowerCase() === gblLanguage.toLowerCase()) {
                    pdfUrl = pdfUrlValue;
                  }
                  pdfLanguageUrls.push(record);
                }
                kony.print("PDFLanguages : " + JSON.stringify(pdfLanguages));
                kony.print("PDFLanguages URLs : " + JSON.stringify(pdfLanguageUrls));
                /** Logic for handling PDF languages --- end*/

                kony.print("Inside if pdfUrl condition");
                var pdfDesc = data[i]["pdfDescription"];

                if (pdfDesc !== null && pdfDesc !== "" && pdfDesc.length > 115) {
                  if(isIOS()){
                    pdfDesc = pdfDesc.substring(0, 110) + "...";
                  }else{
                    pdfDesc = pdfDesc.substring(0, 115) + "...";
                  }

                }
                if (pdfShareable === "false") {
                  btnShareData = {
                    skin: "sknShareDisable",
                    focusSkin: "sknShareDisable",
                    onClick: this.onClickOfShareButton,
                  };
                  isShareable = "false";
                }else if ( isBlankOrNull(pdfUrl)) {
                  btnShareData = {
                    skin: "sknShareDisable",
                    focusSkin: "sknShareDisable",
                    onClick: this.onClickOfShareButton,
                  };
                  isShareable = "true";
                } else {
                  btnShareData = {
                    skin: "sknShare",
                    focusSkin:"sknShareActive",
                    onClick: this.onClickOfShareButton,
                  };
                  isShareable = "true";
                }
                kony.print("PDFDownload 2: " + pdfDownload);
                if (pdfDownload === "false") {
                  kony.print("SR@ pdf non download article");
                  btnDownloadData = {
                    skin: "sknBtnDownloadDisable",
                    focusSkin: "sknBtnDownloadDisable"
                  };
                  isDownload = "false";
                }else  if ( isBlankOrNull(pdfUrl)) {
                  kony.print("SR@ pdf non download article");
                  btnDownloadData = {
                    skin: "sknBtnDownloadDisable",
                    focusSkin: "sknBtnDownloadDisable"
                  };
                  isDownload = "true";
                } else {
                  kony.print("SR@ pdf  download article");
                  btnDownloadData = {
                    onClick: this.onClickOfDownloadButton,
                    skin: "sknBtnDownload"
                  };
                  isDownload = "true";
                }


                var img_src="";
                if(category[0]["categoryTitle"].toLowerCase() =="more products"){
                  img_src="more_productsbb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="about amway"){
                  img_src="amwayiconbb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="artistry" || category[0]["categoryTitle"].toLowerCase()=="attitude" || category[0]["categoryTitle"].toLowerCase()=="beauty" ){
                  img_src="beautybb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="at home"){
                  img_src="homebb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="personal care"){
                  img_src="personal_carebb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="nutrition"){
                  img_src="nutritionbb.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="heritage & values"){
                  img_src="heritage_and_values.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="fact sheets"){
                  img_src="fact_sheets.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="manufacturing"){
                  img_src="manufacturing.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="awards & accolades"){
                  img_src="awards_and_accolades.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="corporate social responsibilities"){
                  img_src="corporate_social_responsibilities.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="media releases"){
                  img_src="media_releases.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="business opportunity"){
                  img_src="business_opportunity.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="amway recognition"){
                  img_src="amway_recognition.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="business brochures"){
                  img_src="business_brochures.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="business seminars and conferences"){
                  img_src="business_seminars_and_conferences.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="learning and development"){
                  img_src="learning_and_development.png";
                }

                record = {
                  "fileName":pdfFileName,
                  "profileName": category[0]["categoryTitle"],
                  "profileSub": category[0]["categoryDesc"],
                  "profileImg": img_src,
                  "lbltitle": pdfTitle,
                  "FullTitle":FullTitle,
                  "contentId": contentId,
                  "UID": contentId+data[i]["pdfUid"]+"English",
                  "contentType": "pdf",
                  "lblSeeMore": pdfSeemoreText,
                  "lblLine":{
                    isVisible: true
                  },
                  "lblLineSeparator":{
                    isVisible: true
                  },
                  "imgContent": pdfImg,
                  "rchContentDesc": pdfDesc,
                  "FullDesc":pdfFullDesc,
                  "url": pdfUrl,
                  "updatedDate": updatedDate,
                  "isDownload": isDownload,
                  "isShareable":isShareable,
                  "btnShare": btnShareData,
                  "btnBookmark": {
                    onClick:this.onClickOfBookmarkButton,
                    skin: btnBookmarkSkn
                  },
                  "btnDownload": btnDownloadData,
                  "flxDownloadOverlay": {onClick : function(){},isVisible:false},
                  "loaderActive":{isVisible:true,src:"wheel1.gif"},"loaderInactive":{isVisible:true,src:"wheel.png"},
                  "btnPauseDownload":{isVisible:true,onClick:this.pauseDownload},
                  "closeOverlay":{isVisible:true, onClick:this.onClickCloseOverlay},
                  "pdfLanguages":pdfLanguages,
                  "pdfLanguageUrls":pdfLanguageUrls

                };
                segmentData.push(record);
              }

              kony.print("starting videoUrl validation");
              //|| !isBlankOrNull(videoTitle) || !isBlankOrNull(videoDesc)
              if (videoUrlList !== null && videoUrlList !== undefined && videoUrlList.length > 0) {

                /** Logic for handling Video languages --- start*/
                var videoLanguages = [];
                var videoLanguageUrls = [];
                for (var j=0; j<videoUrlList.length; j++) {
                  var record = {};
                  var language = videoUrlList[j]["videoLanguage"];
                  var version = videoUrlList[j]["videoVersion"];
                  if(version===null || version ==="null"){
                    version=0;
                  }else{
                    version=parseInt(version);
                  }
                  videoLanguages.push([language, language]);
                  var videoUrlValue = videoUrlList[j]["videoUrl"];
                  record["language"] = language;
                  record["url"] = videoUrlValue;
                  record["version"] = version;
                  if (language !== null && language !== undefined && language.toLowerCase() === gblLanguage.toLowerCase()) {
                    videoUrl = videoUrlValue;
                  }
                  videoLanguageUrls.push(record);
                }
                kony.print("videoLanguages : " + JSON.stringify(videoLanguages));
                kony.print("videoLanguages URLs : " + JSON.stringify(videoLanguageUrls));
                /** Logic for handling Video languages --- end*/

                kony.print("videoUrl : " + videoUrl);
                var videoDesc = data[i]["videoDescription"]
                if (videoDesc !== null && videoDesc !== "" && videoDesc.length > 115) {
                  if(isIOS()){
                    videoDesc = videoDesc.substring(0, 110) + "...";
                  }else{
                    videoDesc = videoDesc.substring(0, 115) + "...";
                  }

                }
                if (videoShareable === "false") {
                  btnShareData = {
                    skin: "sknShareDisable",
                    focusSkin: "sknShareDisable",
                    onClick: this.onClickOfShareButton,
                  };
                  isShareable = "false";
                } else if ( isBlankOrNull(videoUrl)) {
                  btnShareData = {
                    skin: "sknShareDisable",
                    focusSkin: "sknShareDisable",
                    onClick: this.onClickOfShareButton,
                  };
                  isShareable = "true";
                } else {
                  btnShareData = {
                    skin: "sknShare",
                    focusSkin:"sknShareActive",
                    onClick: this.onClickOfShareButton,
                  };
                  isShareable = "true";
                }
                if (videoDownload === "false") {
                  btnDownloadData = {
                    skin: "sknBtnDownloadDisable",
                    focusSkin: "sknBtnDownloadDisable"

                  };
                  isDownload = "false";
                } else if ( isBlankOrNull(videoUrl)) {
                  btnDownloadData = {
                    skin: "sknBtnDownloadDisable",
                    focusSkin: "sknBtnDownloadDisable"

                  };
                  isDownload = "true";
                } else {
                  btnDownloadData = {
                    onClick: this.onClickOfDownloadButton,
                    skin: "sknBtnDownload"
                  };
                  isDownload = "true";
                }


                var img_src="";
                if(category[0]["categoryTitle"].toLowerCase() =="more products"){
                  img_src="more_productsbb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="about amway"){
                  img_src="amwayiconbb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="artistry" || category[0]["categoryTitle"].toLowerCase()=="attitude" || category[0]["categoryTitle"].toLowerCase()=="beauty" ){
                  img_src="beautybb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="at home"){
                  img_src="homebb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="personal care"){
                  img_src="personal_carebb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="nutrition"){
                  img_src="nutritionbb.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="heritage & values"){
                  img_src="heritage_and_values.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="fact sheets"){
                  img_src="fact_sheets.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="manufacturing"){
                  img_src="manufacturing.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="awards & accolades"){
                  img_src="awards_and_accolades.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="corporate social responsibilities"){
                  img_src="corporate_social_responsibilities.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="media releases"){
                  img_src="media_releases.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="business opportunity"){
                  img_src="business_opportunity.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="amway recognition"){
                  img_src="amway_recognition.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="business brochures"){
                  img_src="business_brochures.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="business seminars and conferences"){
                  img_src="business_seminars_and_conferences.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="learning and development"){
                  img_src="learning_and_development.png";
                }

                record = {
                  "fileName":videoFileName,
                  "profileName": category[0]["categoryTitle"],
                  "profileSub": category[0]["categoryDesc"],
                  "profileImg": img_src,
                  "lbltitle": videoTitle,
                  "FullTitle":FullTitle,
                  "contentId": contentId,
                  "UID": contentId+data[i]["videoUid"]+"English",
                  "contentType": "video",
                  "lblSeeMore": videoSeemoreText,
                  "lblLine":{
                    isVisible: true
                  },
                  "lblLineSeparator":{
                    isVisible: true
                  },
                  "imgContent": videoImg,
                  "rchContentDesc": videoDesc,
                  "FullDesc":videoFullDesc,
                  "url": videoUrl,
                  "updatedDate": updatedDate,
                  "isDownload": isDownload,
                  "isShareable" : isShareable,
                  "btnShare": btnShareData,
                  "btnBookmark": {
                    onClick:this.onClickOfBookmarkButton,
                    skin: btnBookmarkSkn
                  },
                  "btnDownload": btnDownloadData,
                  "flxDownloadOverlay": {onClick : function(){},isVisible:false},
                  "loaderActive":{isVisible:true,src:"wheel1.gif"},"loaderInactive":{isVisible:true,src:"wheel.png"},
                  "btnPauseDownload":{isVisible:true,onClick:this.pauseDownload},
                  "closeOverlay":{isVisible:true, onClick:this.onClickCloseOverlay},
                  "videoLanguages":videoLanguages,
                  "videoLanguageUrls":videoLanguageUrls
                };
                segmentData.push(record);
              }
              //|| !isBlankOrNull(videoTitle) || !isBlankOrNull(videoDesc)
              if (!isBlankOrNull(htmlUrl) ) {


                var htmlDesc = data[i]["htmlDescription"];
                if (htmlDesc !== null && htmlDesc !== "" && htmlDesc.length > 115) {
                  if(isIOS()){
                    htmlDesc = htmlDesc.substring(0, 110) + "...";
                  }
                  else{
                    htmlDesc = htmlDesc.substring(0, 115) + "...";
                  }
                }


                var img_src="";
                if(category[0]["categoryTitle"].toLowerCase() =="more products"){
                  img_src="more_productsbb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="about amway"){
                  img_src="amwayiconbb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="artistry" || category[0]["categoryTitle"].toLowerCase()=="attitude" || category[0]["categoryTitle"].toLowerCase()=="beauty" ){
                  img_src="beautybb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="at home"){
                  img_src="homebb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="personal care"){
                  img_src="personal_carebb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="nutrition"){
                  img_src="nutritionbb.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="heritage & values"){
                  img_src="heritage_and_values.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="fact sheets"){
                  img_src="fact_sheets.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="manufacturing"){
                  img_src="manufacturing.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="awards & accolades"){
                  img_src="awards_and_accolades.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="corporate social responsibilities"){
                  img_src="corporate_social_responsibilities.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="media releases"){
                  img_src="media_releases.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="business opportunity"){
                  img_src="business_opportunity.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="amway recognition"){
                  img_src="amway_recognition.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="business brochures"){
                  img_src="business_brochures.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="business seminars and conferences"){
                  img_src="business_seminars_and_conferences.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="learning and development"){
                  img_src="learning_and_development.png";
                }


                record = {
                  "profileName": category[0]["categoryTitle"],
                  "profileSub": category[0]["categoryDesc"],
                  "profileImg": img_src,
                  "lbltitle": htmlTitle,
                  "FullTitle":FullTitle,
                  "contentId": contentId,
                  "UID": data[i]["htmlUid"]+"English",
                  "contentType": "html",
                  "lblSeeMore": htmlSeemoreText,
                  "lblLine":{
                    isVisible: true
                  },
                  "lblLineSeparator":{
                    isVisible: true
                  },
                  "imgContent": htmlImg,
                  "rchContentDesc": htmlDesc,
                  "FullDesc":htmlFullDesc,
                  "url": htmlUrl,
                  "updatedDate": updatedDate,
                  "isDownload":"false",
                  "btnShare": {
                    setEnabled: false,
                    skin: "sknShareDisable",
                    focusSkin:"sknShareDisable"
                  },
                  "btnBookmark": {
                    onClick:this.onClickOfBookmarkButton,
                    skin: btnBookmarkSkn
                  },
                  "btnDownload": {
                    setEnabled: false,
                    skin:"sknBtnDownloadDisable",
                    focusSkin:"sknBtnDownloadDisable"

                  },
                  "isShareable":"false",
                  "flxDownloadOverlay": {onClick : function(){},isVisible:false},
                  "loaderActive":{isVisible:true,src:"wheel1.gif"},"loaderInactive":{isVisible:true,src:"wheel.png"},
                  "btnPauseDownload":{isVisible:true,onClick:this.pauseDownload},
                  "closeOverlay":{isVisible:true, onClick:this.onClickCloseOverlay}
                };
                segmentData.push(record);
              }

              if (ebookUrlList !== null && ebookUrlList !== undefined && ebookUrlList.length > 0) {

                /** Logic for handling eBook languages --- start*/
                var ebookLanguages = [];
                var ebookLanguageUrls = [];
                for (var j=0; j<ebookUrlList.length; j++) {
                  var record = {};
                  var language = ebookUrlList[j]["ebookLanguage"];
                  ebookLanguages.push([language, language]);
                  var ebookUrlValue = ebookUrlList[j]["ebookUrl"];
                  record["language"] = language;
                  record["url"] = ebookUrlValue;
                  if (language !== null && language !== undefined && language.toLowerCase() === gblLanguage.toLowerCase()) {
                    ebookUrl = ebookUrlValue;
                  }
                  ebookLanguageUrls.push(record);
                }
                kony.print("ebookLanguages : " + JSON.stringify(ebookLanguages));
                kony.print("ebookLanguages URLs : " + JSON.stringify(ebookLanguageUrls));
                /** Logic for handling eBook languages --- end*/

                var ebookDesc = data[i]["ebookDesc"];
                if(isBlankOrNull(ebookDesc)){ 
                  ebookDesc = "";
                }
                if (ebookDesc !== null && ebookDesc !== "" && ebookDesc !== undefined && ebookDesc.length > 115) {
                  if(isIOS()){
                    ebookDesc = ebookDesc.substring(0, 110) + "...";
                  }
                  else{
                    ebookDesc = ebookDesc.substring(0, 115) + "...";
                  }
                }


                var img_src="";
                if(category[0]["categoryTitle"].toLowerCase() =="more products"){
                  img_src="more_productsbb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="about amway"){
                  img_src="amwayiconbb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="artistry" || category[0]["categoryTitle"].toLowerCase()=="attitude" || category[0]["categoryTitle"].toLowerCase()=="beauty" ){
                  img_src="beautybb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="at home"){
                  img_src="homebb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="personal care"){
                  img_src="personal_carebb.png";
                }else if(category[0]["categoryTitle"].toLowerCase()=="nutrition"){
                  img_src="nutritionbb.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="heritage & values"){
                  img_src="heritage_and_values.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="fact sheets"){
                  img_src="fact_sheets.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="manufacturing"){
                  img_src="manufacturing.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="awards & accolades"){
                  img_src="awards_and_accolades.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="corporate social responsibilities"){
                  img_src="corporate_social_responsibilities.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="media releases"){
                  img_src="media_releases.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="business opportunity"){
                  img_src="business_opportunity.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="amway recognition"){
                  img_src="amway_recognition.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="business brochures"){
                  img_src="business_brochures.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="business seminars and conferences"){
                  img_src="business_seminars_and_conferences.png";
                }else if((category[0]["categoryTitle"]).toLowerCase() =="learning and development"){
                  img_src="learning_and_development.png";
                }
                record = {
                  "profileName": category[0]["categoryTitle"],
                  "profileSub": category[0]["categoryDesc"],
                  "profileImg": img_src,
                  "lbltitle": ebookTitle,
                  "FullTitle":FullTitle,
                  "contentId": contentId,
                  "UID": contentId+data[i]["ebookUid"]+"English",
                  "contentType": "ebook",
                  "lblSeeMore": eBookSeemoreText,
                  "lblLine":{
                    isVisible: true
                  },
                  "lblLineSeparator":{
                    isVisible: true
                  },
                  "imgContent": ebookImg,
                  "rchContentDesc": ebookDesc,
                  "FullDesc":ebookFullDesc,
                  "url": ebookUrl,
                  "updatedDate": updatedDate,
                  "isDownload":"false",
                  "btnShare": {
                    setEnabled: false,
                    skin: "sknShareDisable",
                    focusSkin:"sknShareDisable",
                  },
                  "btnBookmark": {
                    onClick:this.onClickOfBookmarkButton,
                    skin: btnBookmarkSkn
                  },
                  "btnDownload": {
                    setEnabled: false,
                    skin:"sknBtnDownloadDisable",
                    focusSkin:"sknBtnDownloadDisable",

                  },
                  "isShareable":"false",
                  "flxDownloadOverlay": {onClick : function(){},isVisible:false},
                  "loaderActive":{isVisible:true,src:"wheel1.gif"},"loaderInactive":{isVisible:true,src:"wheel.png"},
                  "btnPauseDownload":{isVisible:true,onClick:this.pauseDownload},
                  "closeOverlay":{isVisible:true, onClick:this.onClickCloseOverlay},
                  "ebookLanguages":ebookLanguages,
                  "ebookLanguageUrls":ebookLanguageUrls
                };
                segmentData.push(record);
              }
            }

          }catch(e){
            continue;
          }

        }
        for (var j=0;j<segmentData.length;j++){

          if(isBlankOrNull(segmentData[j]["imgContent"])){
            segmentData[j]["imgContent"]=="imagedrag.png";
          }
          segmentData[j]["isBookmarked"] = false;
          segmentData[j]["isDownloaded"] = false;
          segmentData[j]["lblLineDevider"] ={isVisible:true};
          segmentData[j]["lblLineContentDevider"] ={isVisible:true};
          segmentData[j]["isPaused"] = false;
          segmentData[j]["PausedPercent"] = "";
          segmentData[j]["isDownloading"] = false;
          segmentData[j]["lblDownloadProgress"] ={text: "Downloading... "};
          segmentData[j]["btnPlayDownload"] = {isVisible:false,onClick:this.playDownload};
        }
        for(var l = 0; l < segmentData.length; l++){
          for(var m = l+1; m < segmentData.length; m++){
            if(segmentData[l]["UID"] ==segmentData[m]["UID"]){
              kony.print("sreeni repeated::"+ segmentData[m]["UID"]);
            }
          }        
        }	 
        kony.print("\n\n\n\n");
        kony.print("Ramu >>>>> segment data length" + segmentData.length);
        kony.print("Ramu >>>>> final segment data is : " + JSON.stringify(segmentData));
        kony.print("retrieveJson before: " +retrieveJson("offlineContent"));
        try{
          var offlineContent = retrieveJson("offlineContent");
          if(!isBlankOrNull(offlineContent)){
            kony.print("offlineContent: " +JSON.stringify(offlineContent));
            for (var key in offlineContent) {
              if (offlineContent.hasOwnProperty(key)) {
                // kony.print("Offline content key::"+key + " -> " + offlineContent[key]);
                for(var i=0;i<segmentData.length;i++){
                  if(key == segmentData[i]["UID"]){
                    kony.print("SR@ Offline content key::"+key + " -> " + JSON.stringify( offlineContent[key]));
                    segmentData[i]["isBookmarked"] = offlineContent[key]["isBookmarked"];
                    segmentData[i]["isDownloaded"] = offlineContent[key]["isDownloaded"];
                    if(segmentData[i]["isBookmarked"]){
                      segmentData[i].btnBookmark.skin = "sknBookmarkActive";
                    }
                    if(segmentData[i]["isDownloaded"]){
                      segmentData[i].btnDownload.skin = "sknBtnDownloadActive";
                    }
                    segmentData[i]["isPaused"] = offlineContent[key]["isPaused"];
                    segmentData[i]["PausedPercent"] = offlineContent[key]["PausedPercent"];
                    segmentData[i]["isDownloading"] = offlineContent[key]["isDownloading"];
                    segmentData[i]["url"] = offlineContent[key]["url"];
                    if(segmentData[i]["isDownloading"]){
                      segmentData[i].flxDownloadOverlay = {isVisible:true, onClick : function(){}}; 
                      segmentData[i].btnPauseDownload = {isVisible:true,onClick:this.pauseDownload};
                      segmentData[i].loaderActive = {isVisible:true,src:"wheel1.gif"};
                      segmentData[i].btnPlayDownload = {onClick:this.playDownload,isVisible:false};
                      segmentData[i].closeOverlay = {isVisible:true, onClick:this.onClickCloseOverlay};
                      segmentData[i].loaderInactive = {src:"wheel.png",isVisible:false};
                      segmentData[i].btnDownload.skin = "sknBtnDownload";
                      segmentData[i].isDownloaded = false ;
                      segmentData[i].isPaused = false ;
                      segmentData[i].isDownloading = true ;
                      segmentData[i].PausedPercent = "";
                    }
                    if(segmentData[i]["isPaused"]){
                      segmentData[i].btnPauseDownload = {onClick:this.pauseDownload,isVisible:false};
                      segmentData[i].loaderActive = {src:"wheel1.gif",isVisible:false};
                      segmentData[i].btnPlayDownload = {isVisible:true,onClick:this.playDownload};
                      segmentData[i].closeOverlay = {isVisible:true, onClick:this.onClickCloseOverlay};
                      segmentData[i].loaderInactive = {isVisible:true,src:"wheel.png"};
                      segmentData[i].flxDownloadOverlay = {isVisible:true, zIndex:4,onClick : function(){}};
                      segmentData[i].btnDownload.skin = "sknBtnDownload";
                      segmentData[i].isDownloaded = false ;
                      segmentData[i].isPaused = true ;
                      segmentData[i].isDownloading = false ;
                      segmentData[i].PausedPercent =offlineContent[key]["PausedPercent"];
                    }
                    break;
                  }
                }
              }
            } 
          } 

        }catch(e){}

        var sortedContentListData = kony.table.sort(segmentData, "updatedDate", comparisionFunction);
        segmentData=sortedContentListData;
        gblContentList = sortedContentListData;
        kony.print("rahul after sorting data is >> "+ JSON.stringify(segmentData));
        controllerReference.view.lblNofilteredData.isVisible = false;
        controllerReference.view.segHomePageContent.isVisible = true;
        controllerReference.scrollToSearchListEnd();
        dismissLoading();
      }else{
        controllerReference.view.flxDownloadOffline.isVisible = true;
        //controllerReference.infoPopupOn(getI18Value("NoRecordsMessage"));
        dismissLoading();
      }
      dismissLoading();
      kony.print(" ********** Exiting out of content list SuccessCallback ********** ");
    } else {
      controllerReference.view.flxDownloadOffline.isVisible = true;
      controllerReference.infoPopupOn(getI18Value("ServiceFailureMessage"));
      dismissLoading();
    }
  },
  //Segment on reach end , pagination handle
  scrollToSearchListEnd: function() {

    try{


      kony.print("Sreeni >> on reaching end called");
      if (isBlankOrNull(gblFilterCategory)) {
        kony.print("rahul data is >> "+ JSON.stringify(segmentData));
        var displayData = segmentData;
        if (contentCount < displayData.length) {
          var max = 0;
          if (contentCount + 20 < displayData.length) {
            max = contentCount + 20;
          } else {
            max = displayData.length;
          }
          var currentData = new Array();
          for (var i = contentCount; i < max ; i++) {
            kony.print("contentTitle : " + displayData[i]["lbltitle"] + " ::: contentType: " + displayData[i]["contentType"]);
            currentData.push(displayData[i]);
          }

          kony.print("rahul data after sorting  is >> "+ JSON.stringify(currentData));

          if(contentCount>0)
            this.view.segHomePageContent.removeAt(contentCount, 0);
          this.view.segHomePageContent.addAll(currentData);
          if(max!=displayData.length)
            this.view.segHomePageContent.addDataAt({"lbltitle" :"Loading...",template:"flxTemplateLoadMore"}, max, 0)	
            contentCount = max;
        }
      } else {
        kony.print("gblFilterCategory is not null : " + gblFilterCategory);
      }

    }catch(e){
      kony.print("Exception is "+ e);
    }
  },
  getContentListDataErrorCallback: function(errormsg) {
    dismissLoading();
    controllerReference.infoPopupOn(getI18Value("ServiceFailureMessage"));
    controllerReference.view.flxDownloadOffline.isVisible = true;
    kony.print(" ********** Failure in ccontentErrorCallback: " + JSON.stringify(errormsg) + " ********** ");
  },
  dimissLoad:function(){
    dismissLoading();
    kony.timer.cancel("loadingtimer");
  },
  onClickOfShareButton: function() {
    try {
      var selectedIndex = controllerReference.view.segHomePageContent.selectedIndex[1];
      var contentObj = controllerReference.view.segHomePageContent.selectedItems;
      var contentObject = contentObj[0];
      kony.print("selecte item is :: " + JSON.stringify(contentObject));
      try{
        var contentType = contentObject.contentType;
        var contentId = contentObject.FullTitle;
        var click_detail = "Share";
        var dataOnclickArray = {
          "app_type": getDevicePlatform() , //ios or android sent by OS of the device
          "app_country": "in",
          "app_language": getDeviceLanguage(),
          "app_digitalProperty": "Amway Business app",
          "app_region":"eia",
          "event_name": "social_share", //"click_action",
          "click_detail": click_detail,//"header login",
          "click_category": "",
          "content_type": contentType,
          "content_id": contentId,
          "social_type":"",
          "visitor_imcID":gblVisitor_imcID,  
          "page_components": ["btnShare"]
        };
        Tealium.trackEvent("click_action", JSON.stringify(dataOnclickArray), "eia-hub-app");
      }catch(ex){

      }
      var contentShareable = contentObject.isShareable;
      kony.print("contentShareable :: " + contentShareable+"");
      var selectedLanguage = gblLanguage;
      var languageUrlList = {};
      var contentType = contentObject["contentType"];
      if (contentType === "pdf") {
        languageUrlList = contentObject["pdfLanguageUrls"];
      } else if (contentType === "video") {
        languageUrlList = contentObject["videoLanguageUrls"];
      } else if (contentType === "ebook") {
        languageUrlList = contentObject["ebookLanguageUrls"];
      } else if (contentType === "brightCoveVideo") {
        languageUrlList = contentObject["brightCoveLanguageUrls"];
      }
      kony.print("jani >>> contentdetail page videolanguages : "+ JSON.stringify(languageUrlList));
      var contentUrl = "";
      if (languageUrlList !== null && languageUrlList !== undefined && languageUrlList.length > 0) {
        for (var i=0; i<languageUrlList.length; i++) {
          var langRecord = languageUrlList[i];
          if (langRecord["language"] === selectedLanguage) {
            kony.print("language url found");
            contentUrl = langRecord["url"];
            break;
          }
        }
      }
      if (isBlankOrNull(contentUrl)) {
        kony.print("content URL missed");
        // contentUrl = languageUrlList[0]["url"];
        //controllerReference.infoPopupOn(getI18Value("ContentUrlMissed"));
        //contentObject.btnShare = {skin:"sknBtnShareDisable", onClick: this.onClickOfShareButton};
        return;
      }
      //check wheher content shareable if yes , then check if it is already shared
      if (contentShareable == "true") {
        //#ifdef iphone
        shareContentiOS(contentUrl);
        //#endif
        //#ifdef android
        shareContentAndroid(contentUrl);
        //#endif
      }
    } catch (e) {}
  },

  bookMarkLanguageSpecificContent: function(contentObj,contentBookmarked,selectedIndex,language) {
    try{
      kony.print("bookmarking item with UID :"+contentObj["UID"] +"isBookmarked :: " + contentBookmarked+" language:"+language +" index"+selectedIndex);
      kony.print("bookmarking item::"+JSON.stringify(contentObj));

      if(contentBookmarked){
        contentObj.isBookmarked = false;
        contentObj.btnBookmark.skin = "sknBookmark";
      }else{
        contentObj.isBookmarked = true;
        contentObj.btnBookmark.skin = "sknBookmarkActive";
      }
      contentObj.flxDownloadOverlay = {onClick : function(){},isVisible:false};
      kony.print("NSR current language is "+language +" gblLang "+gblLanguage);
      if( language.toLowerCase() === gblLanguage.toLowerCase() ){
        kony.print("mnb language matched");
        controllerReference.view.segHomePageContent.setDataAt(contentObj, selectedIndex);
        for(var i=0;i<gblContentList.length;i++){
          if(gblContentList[i]["UID"]==contentObj["UID"]){
            kony.print("mnb updating global data:: "+JSON.stringify(contentObj));
            gblContentList[i].isBookmarked = contentObj.isBookmarked;
            gblContentList[i].btnBookmark.skin = contentObj.btnBookmark.skin;
            gblContentList[i].flxDownloadOverlay = contentObj.flxDownloadOverlay;
            break;
          }
        }

      }
      var offlineContent = retrieveJsonAllLanguages("offlineContent");
      if(isBlankOrNull(offlineContent))offlineContent = {}
      if(!isBlankOrNull(offlineContent[contentObj["UID"]])){
        var tempContent = offlineContent[contentObj["UID"]];
        tempContent.isBookmarked = contentObj.isBookmarked;
        tempContent.btnBookmark.skin = contentObj.btnBookmark.skin;
        contentObj = tempContent;
      }else{
        contentObj.isDownloading = false;
        contentObj.isPaused = false;
        contentObj.PausedPercent = "";
        contentObj.isDownloaded = false;
        if(isBlankOrNull(contentObj.url) ){
          contentObj.btnDownload.skin = "sknBtnDownloadDisable";
          contentObj.btnDownload.focusSkin = "sknBtnDownloadDisable";
        }else{
          contentObj.btnDownload.skin = "sknBtnDownload";
        }
      }
      var expr =  !isBlankOrNull(contentObj["otherLanguageDownload"]) && contentObj["otherLanguageDownload"];
      kony.print("NSR@@ other language download "+expr);
      if(expr || contentObj.isDownloaded || contentObj.isBookmarked ||contentObj.isDownloading || contentObj.isPaused ){
        offlineContent[contentObj["UID"]] = contentObj;
        storeJson("offlineContent", offlineContent);
      }else{
        delete offlineContent[contentObj["UID"]];
        storeJson("offlineContent", offlineContent);
      }
      kony.print("stored item::"+contentObj["UID"])
    }catch(e){
      kony.print("Exception in bookMarkLanguageSpecificContent ::"+e);
    }
  },
  trackEventAnalytics : function(contentType,contentId,click_detail){
    var dataOnclickArray = {
      "app_type": getDevicePlatform() , //ios or android sent by OS of the device
      "app_country": "in",
      "app_language": getDeviceLanguage(),
      "app_digitalProperty": "Amway Business app",
      "app_region":"eia",
      "event_name": "click_action", //"click_action",
      "click_detail": click_detail,//"header login",
      "click_category": "",
      "content_type": contentType,
      "content_id": contentId,
      "visitor_imcID":gblVisitor_imcID,
      "page_components": ["btnBookmark"]
    };
    Tealium.trackEvent("click_action", JSON.stringify(dataOnclickArray), "eia-hub-app");
  },
  onClickOfBookmarkButton: function() {
    try{
      var selectedIndex = controllerReference.view.segHomePageContent.selectedIndex[1];
      var contentObject = controllerReference.view.segHomePageContent.selectedItems;
      var contentObj = contentObject[0];
      kony.print("selecte item is :: " + JSON.stringify(contentObj));
      try{
        var contentType = contentObj.contentType;
        var contentId = contentObj.FullTitle;
        //var click_detail = "Bookmark";
        //this.trackEventAnalytics(contentType, contentId, click_detail);
         var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"Bookmark",
        "content_type": contentType,
      	"content_id": contentId
        
     };
      callTealiumOnClick(onClickDetails, ["btnBookmark"], false);
        
        kony.print("jani >>> bookmark onclick contenttype and contentId "+contentType+" "+contentId);
      }catch(ex){
        kony.print("jani >>> excaption "+ex); 
      }
      if(isBlankOrNull(contentObj.url) || typeof(contentObj.url) == "object"){
        var langUrls = contentObj.contentType === "video" ? contentObj.videoLanguageUrls : contentObj.pdfLanguageUrls;
        contentObj.url = null;
        kony.print("SR@ url becomes empty so setting it again"+JSON.stringify(langUrls));
        if(!isBlankOrNull(langUrls)){
          for(var k=0;k<langUrls.length;k++){
            if(langUrls[k]["language"].toLowerCase() == gblLanguage.toLowerCase()){
              kony.print("SR@ english URL is "+langUrls[k]["url"]);
              contentObj.url = langUrls[k]["url"];
              break;
            }
          }
        }
      }

      var plainUid = getUidWithoutLang(contentObj["UID"]);
      kony.print("selecte item is :: " + JSON.stringify(contentObj));
      var contentBookmarked = contentObj.isBookmarked;

      kony.print("contentBookmarked :: " + contentBookmarked);
      var langFound = false;
      var languageUrls = contentObj.contentType === "video" ? contentObj.videoLanguageUrls : contentObj.pdfLanguageUrls;

      if (languageUrls !== null && languageUrls !== undefined && languageUrls.length > 0) {
        for (var i = 0; i < languageUrls.length; i++) {
          var tempLang = languageUrls[i]["language"];
          if (tempLang === gblLanguage) {
            langFound = true;
            break;
          }
        }
        //if english not found then also we need to update the UI
        if (!langFound) {
          contentObj["UID"] = plainUid+gblLanguage;
          contentObj["url"] = null;
          controllerReference.bookMarkLanguageSpecificContent(contentObj, contentBookmarked,selectedIndex,gblLanguage);
        }

        //All languages
        for(var z=0;z<languageUrls.length;z++){
          var contentLang = languageUrls[z].language;
          kony.print("NSR current language:: "+contentLang);
          var contentLangUrl = languageUrls[z].url;
          var actualUid = plainUid+""+contentLang;
          contentObj["UID"] = actualUid;
          contentObj["url"] = contentLangUrl;
          controllerReference.bookMarkLanguageSpecificContent(contentObj, contentBookmarked,selectedIndex,contentLang);
        }
        for (var i=0; i<gblContentList.length; i++) {
          if(isBlankOrNull( gblContentList[i]["url"] ) ){
            var downloadBtn = {
              setEnabled: false,
              skin:"sknBtnDownloadDisable",
              focusSkin:"sknBtnDownloadDisable",
            }
            gblContentList[i].btnDownload = downloadBtn;
          }
        }
      }
    }catch(e){
      kony.print("Exception occured in onClickOfBookmarkButton ::"+e)
    }


  },

  segmentRowClicked: function() {
    try{
      kony.print("row clicked");
      var data = this.view.segHomePageContent.selectedRowItems[0];
      kony.print("data : " + JSON.stringify(data));
      var downloadSkn = data.btnDownload.skin;
      var otherLanguageDownload = false;
      if(!isBlankOrNull(data.otherLanguageDownload)){
        otherLanguageDownload = data.otherLanguageDownload;
        kony.print("ANSR ohter lang "+otherLanguageDownload);
      }
      if(!isNetworkAvailable() && !isBlankOrNull(downloadSkn) && downloadSkn == "sknBtnDownload"  &&  !otherLanguageDownload  ){
        try{
          kony.timer.cancel("timerid");	
        }catch(e){}
        controllerReference.view.flxToast.isVisible = true;
        kony.timer.schedule("timerid", controllerReference.disableFlex.bind(this), 5, false);
      }else{
        controllerReference.view.flxToast.isVisible = false;
        try{
          kony.timer.cancel("timerid");	
        }catch(e){}
        var nav = new kony.mvc.Navigation("contentdetailpage");
        nav.navigate(data);
      }
    }catch(e){
      kony.print("Exception insegmentRowClicked "+e);
    }
  },
  showDownloadStatus : function(id, percentage, mode) {

    if("INPROGRESS" == mode){
      kony.print("INPROGRESS mode");
      //controllerReference.updateProgressCallback(contentObject, percentage); no need to call
    } else if("ONERROR" == mode) {
      kony.print("ONERROR mode");
      var contentObject = null;
      var offlineData = retrieveJsonAllLanguages("offlineContent");
      if(!isBlankOrNull(offlineData) && !isBlankOrNull(offlineData[id])){
        kony.print("Sreeni content found in offline");
        contentObject = offlineData[id];
      }
      controllerReference.finishDownloadCallBackObj(contentObject,"ERROR");	
    } else if("ONCOMPLETE" == mode){
      kony.print("ONCOMPLETE mode");
      var contentObject = null;
      kony.print("---- id is "+ id +"  " + segmentData[0]);
      var offlineData = retrieveJsonAllLanguages("offlineContent");
      if(!isBlankOrNull(offlineData) && !isBlankOrNull(offlineData[id])){
        kony.print("Sreeni content found in offline");
        contentObject = offlineData[id];
      }
      controllerReference.finishDownloadCallBackObj(contentObject,"");	
    } else if("ONPAUSE" == mode) {
      kony.print("ONPAUSE mode");
    }
  },
  checkPermissions : function(contentObj,selectedIndex) {
    var options = {isAccessModeAlways:true};
    var result = kony.application.checkPermission(kony.os.RESOURCE_EXTERNAL_STORAGE,options);
    if(result.status = kony.application.PERMISSION_DENIED) {
      gblAndroidData = contentObj;
      gblSelectedIndex = selectedIndex;
      kony.print("Permission status : " + result.status);
      kony.application.requestPermission(kony.os.RESOURCE_EXTERNAL_STORAGE, this.permissions_CB);
    }
    else if(result.status = kony.application.PERMISSION_GRANTED ){
      controllerReference.startDownload(contentObj,selectedIndex);
    }
  },
  permissions_CB : function(result) {
    kony.print("Inside permissions_CB method: " + JSON.stringify(result));
    //var currentObject = gblDownloads[gblUID];
    if (result.status === 50002.0 || result.status === "50002.0" || result.status === 50002) {
      kony.print("Inside if condition");
      controllerReference.startDownload(gblAndroidData,gblSelectedIndex);
      gblAndroidData = null;
      gblSelectedIndex = null;
    } else {
      kony.print("Inside else condition");
    }
  },
  setDownloadProgress:function(PROGRESS_TYPE,content,index){

    if (PROGRESS_TYPE == 1){//start download/play download
      content.isDownloading = true;
      content.isPaused = false;
      content.PausedPercent = "";
      content.isDownloaded = false;	
      content.btnDownload = {skin: "sknBtnDownload", onClick: this.onClickOfDownloadButton};
    }
    else if (PROGRESS_TYPE == 2){//pause download
      content.isDownloading = false;
      content.isPaused = true;
      content.isDownloaded = false;	
      content.btnDownload = {skin: "sknBtnDownload", onClick: this.onClickOfDownloadButton};			
    }else {//cancel download
      content.isDownloading = false;
      content.isPaused = false;
      content.PausedPercent = "";
      content.isDownloaded = false;	
      content.btnDownload = {skin: "sknBtnDownload", onClick: this.onClickOfDownloadButton};			
    }
    controllerReference.setOverlayView(PROGRESS_TYPE, content, index);
  },
  setOverlayView: function(DOWNLOAD_STATUS,content,index) {
    try{
      // while downloading
      if(DOWNLOAD_STATUS == 1){
        content.flxDownloadOverlay = {isVisible:true,  zIndex:4,onClick : function(){}};
        content.btnPauseDownload = {isVisible:true,onClick:this.pauseDownload};
        content.loaderActive = {isVisible:true,src:"wheel1.gif"};
        content.btnPlayDownload = {onClick:this.playDownload,isVisible:false};
        content.loaderInactive = {src:"wheel.png",isVisible:false};
        content.closeOverlay = {isVisible:true, onClick:this.onClickCloseOverlay};
      }else if(DOWNLOAD_STATUS == 2){ //When paused
        content.flxDownloadOverlay = {isVisible:true, zIndex:4, onClick : function(){}};
        content.btnPauseDownload = {onClick:this.pauseDownload,isVisible:false};
        content.loaderActive = {src:"wheel1.gif",isVisible:false};
        content.btnPlayDownload = {isVisible:true,onClick:this.playDownload};
        content.loaderInactive = {isVisible:true,src:"wheel.png"};
        content.closeOverlay = {isVisible:true, onClick:this.onClickCloseOverlay};
      }else{//when cancelled or not downloading
        content.btnPauseDownload = {isVisible:true,onClick:this.pauseDownload}
        content.loaderActive = {isVisible:true,src:"wheel1.gif"};
        content.btnPlayDownload = {isVisible:true,onClick:this.playDownload};
        content.loaderInactive = {src:"wheel.png",isVisible:false};
        content.flxDownloadOverlay = {onClick : function(){}, zIndex:4,isVisible:false};
        content.closeOverlay = {isVisible:true, onClick:this.onClickCloseOverlay};
      }
      kony.print("Data before setting to segment:"+JSON.stringify(content));
      controllerReference.view.segHomePageContent.setDataAt(content, index);
      controllerReference.setOfflineData(content);
    }catch(e){
      kony.print("Exception in setoverlay"+e);
    }
  },
  onClickOfDownloadButton: function() {
    try{

      var selectedIndex = controllerReference.view.segHomePageContent.selectedIndex[1];
      var contentObj = controllerReference.view.segHomePageContent.selectedItems;
      kony.print("selecte item is :: " + JSON.stringify(contentObj));
      try{
        var contentObject =  contentObj[0]; 
        if(isBlankOrNull(contentObject.url) || isBlankOrNull(contentObject.UID) || contentObject.btnDownload.skin == "sknBtnDownloadDisable"){
          kony.print("Either  URL is null or UID is null ")
          return;
        }

        var contentId = contentObject.FullTitle;
		var contentType = contentObject.contentType;
        //var widgetComponents = ["btnDownload"];
        //this.downloadTrackEventAnalytics("click_action", "Download", contentId,contentType,widgetComponents );
        var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"Download",
        "content_type": contentType,
      	"content_id": contentId
    	 };
      callTealiumOnClick(onClickDetails, ["btnDownload"], false);
        kony.print("jani >>> Download onclick contenttype and contentId "+contentType+" "+contentId);
      }catch(ex){
        kony.print("jani >>> exception "+ex);
      }
      var contentDownloadable = contentObject.isDownload;
      kony.print("contentDownloadable :: " + contentDownloadable+"");
      if(contentDownloadable == "true"){
        var contentDownloaded = contentObject.isDownloaded;
        kony.print("contentDownloaded :: " + contentDownloaded+"");
        if(contentDownloaded){
          controllerReference.deleteContent(contentObject,selectedIndex);
          return;
        }else if(contentObject.isDownloading){
          kony.print("content already downloading!!")
          return;
        }else if(contentObject.isPaused){
          kony.print("content already paused!!")
          return;
        }else{
          //Show loading and start downloading after finished do the below
          //store file path and
          //gblDownloads[contentObject.UID]= contentObject;
          if (!isNetworkAvailable()) {
            controllerReference.view.flxToast.isVisible = true;
            try{
              kony.timer.cancel("timerid");
            }catch(e){

            }
            kony.timer.schedule("timerid", controllerReference.disableFlex.bind(this), 5, false);
            return;
          } 
          else {
            if(isBlankOrNull(contentObject.url) || typeof(contentObject.url) == "object"){
              var langUrls = contentObject.contentType === "video" ? contentObject.videoLanguageUrls : contentObject.pdfLanguageUrls;
              contentObject.url = null;
              kony.print("SR@ url becomes empty so setting it again"+JSON.stringify(langUrls));
              if(!isBlankOrNull(langUrls)){
                for(var k=0;k<langUrls.length;k++){
                  if(langUrls[k]["language"].toLowerCase() == gblLanguage.toLowerCase()){
                    kony.print("SR@ english URL is "+langUrls[k]["url"]);
                    contentObject.url = langUrls[k]["url"];
                    break;
                  }
                }
              }
              if(!isBlankOrNull(contentObject.url)){
                if(isIOS()){
                  kony.print("sreeni URL is not null"+contentObject.url);
                  controllerReference.startDownload(contentObject,selectedIndex);
                }else{
                  controllerReference.checkPermissions(contentObject,selectedIndex);
                }
                return;
              }
              else{
                kony.print("content url missed "+getI18Value("ContentUrlMissed"));
                //                 controllerReference.infoPopupOn(getI18Value("ContentUrlMissed"));
                //                 contentObject.flxDownloadOverlay = { onClick : function(){},isVisible:false}
                //                 contentObject.btnDownload = {skin:"sknBtnDownload", onClick: this.onClickOfDownloadButton};
              }
            }else{
              if(isIOS()){
                kony.print("sreeni URL is not null"+contentObject.url);
                controllerReference.startDownload(contentObject,selectedIndex);
              }else{
                controllerReference.checkPermissions(contentObject,selectedIndex);
              }
              return;
            }
          }
        }
        controllerReference.view.segHomePageContent.setDataAt(contentObject, selectedIndex);          
      }
    }catch(e){
      kony.print("Exception in onClickOfDownloadButton"+e);
    }
  },
  deleteContent:function(contentObject1,selectedIndex1){

    kony.print("In delete content");


    try{
      controllerReference.view.flxMainPopup.left="0%";
      controllerReference.view.flxMainPopup.isVisible=true;
      controllerReference.view.btnYesDelete.onClick=function(){
       // callTealiumOnClick("click_action", "Undownload_Yes",["btnYesDelete"],gblVisitor_imcID);
        var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"Undownload_Yes"
    	 };
    	callTealiumOnClick(onClickDetails, ["btnYesDelete"], false);
        //1 Remove the file
        var contentObject=contentObject1;
        var selectedIndex=parseInt(selectedIndex1);
        kony.print("Content Object is "+ contentObject +"Index is "+ selectedIndex );
        var docPath = kony.io.FileSystem.getDataDirectoryPath();
        kony.print("Kony doc directory path is:"+docPath);
        var path="";
        if(isIOS())
          path = docPath.replace("Library", "Documents");
        else
          path = docPath.replace("files", "");
        kony.print("final path is:"+path);

        //         var imgFileName = contentObject.fileName;
        //         var imageFilePath = path+"/"+imgFileName;
        //         var myImageFile = new kony.io.File(imageFilePath);
        //         if(myImageFile.exists()){
        //           //delete image
        //           myImageFile.remove();
        //           kony.print("image file removed check the size");
        //         }

        if (contentObject.contentType === "pdf"){
          kony.print("pdfdownloaded");
          var filePath = path+"/"+contentObject.UID+".pdf";
          var file = new kony.io.File(filePath);
          if(file.exists()){
            kony.print("pdf file exists in the path");
            file.remove();
            kony.print("pdf file removed check the size");
          }
        }else if (contentObject.contentType === "video"){
          kony.print("video downloaded");
          //path=kony.io.FileSystem.getExternalStorageDirectoryPath() + "/Download";
          var filePath = path+"/"+contentObject.UID+".mp4";
          var file = new kony.io.File(filePath);
          if(file.exists()){
            kony.print("mp4 file exists in the path");
            file.remove();
            kony.print("mp4 file removed check the size");
          }    
        }

        if(!isNetworkAvailable()){

          controllerReference.view.segHomePageContent.removeAt(selectedIndex);
          if(controllerReference.view.segHomePageContent.data.length == 0 || controllerReference.view.segHomePageContent.data.length==null){
            controllerReference.view.flxDownloadOffline.isVisible = true;
          }else{
            controllerReference.view.flxDownloadOffline.isVisible = false;
          }
          contentObject.btnDownload.skin = "sknBtnDownload";
          contentObject.isDownloaded = false ;
          contentObject.isPaused = false;
          contentObject.isDownloading = false;			
          contentObject.PausedPercent = "";  


          for(var i=0;i<gblContentList.length;i++){
            if(gblContentList[i]["UID"] == contentObject.UID){
              gblContentList[i].btnDownload.skin = "sknBtnDownload";
              gblContentList[i].isDownloaded = false ;
              gblContentList[i].isPaused = false ;
              gblContentList[i].isDownloading = false ;
              gblContentList[i].PausedPercent = "0%";
            }
          }

          controllerReference.setOfflineData(contentObject);


        }
        else{
          //2 update segment row data plus offline data
          controllerReference.setDownloadProgress(3,contentObject,selectedIndex);
          //3 For search results page
          for(var i=0;i<segmentData.length;i++){
            if(contentObject["UID"] == segmentData[i]["UID"]){
              segmentData[i].btnDownload.skin = "sknBtnDownload";
              segmentData[i].isDownloaded = false ;
              segmentData[i].isPaused = false ;
              segmentData[i].isDownloading = false ;
              segmentData[i].PausedPercent = "0%";
            }
          }
        }        
        controllerReference.view.flxMainPopup.left="-100%";
        controllerReference.view.flxMainPopup.isVisible=false;

      }

    }catch(e){

    }
  },
  onClickCloseOverlay : function() {
    try{
      kony.print("cancel clicked");
      //callTealiumOnClick("click_action", "Cancel_Download",["closeOverlay"],gblVisitor_imcID);
      var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"Cancel_Download"
    	 };
    	callTealiumOnClick(onClickDetails, ["closeOverlay"], false);
      if(undefined == controllerReference.view.segHomePageContent.selectedIndex[1] || null == controllerReference.view.segHomePageContent.selectedIndex[1]){
        kony.print("cancelDownload no selected index so returning");
        return;
      }
      var selectedIndex = controllerReference.view.segHomePageContent.selectedIndex[1];
      var contentObj = controllerReference.view.segHomePageContent.selectedItems;
      kony.print("selecte item is :: " + JSON.stringify(contentObj));
      var contentObject =  contentObj[0];
      controllerReference.cancelDownload(contentObject,selectedIndex);

    }catch(e){
      kony.print("Exception onClickCloseOverlay :"+e);
    }

  },
  onNavigate: function() {
    kony.print("inside onNavigate homepage");
    this._init();
  },
  //**********************Sreeni****************************
  startDownload: function(content,index) {
    try{
      kony.print("sreeni URL in start download::"+content);
      if(isBlankOrNull(content.url) || isBlankOrNull(content.UID) || content.btnDownload.skin == "sknBtnDownloadDisable"){
        kony.print("Either  URL is null or UID is null ")
        return;
      }

      var url = content.url;
      if (url.indexOf("https://players.brightcove.net") != -1) {
        gblData = content;
        gblIndex = index;
        kony.print("Sreeni url is from brightcove ");
        controllerReference.getBrightCoveVideoData(content);
        return;
      }
      //Download content image for offline purpose
      // if(isIOS())
      DownloadImageOffline(content);
      //Update the row
      controllerReference.setDownloadProgress(1,content,index);

      //Update for search page
      for(var i=0;i<segmentData.length;i++){
        if(content["UID"] == segmentData[i]["UID"]){
          segmentData[i].btnDownload.skin = "sknBtnDownload";
          segmentData[i].isDownloaded = false ;
          segmentData[i].isPaused = false ;
          segmentData[i].isDownloading = true ;
          segmentData[i].PausedPercent = "";         
        }
      }	
      kony.print("start downloading")
      if(isIOS()){
        DownloadManagerObject.startDownloadJs(content);
      }
      else{
        kony.print("AND download start");
        var id = content["UID"];
        if(content["contentType"]=="video"){
          id=id+".mp4";
        }else if(content["contentType"]=="pdf"){
          id=id+".pdf";
        }
        var obj = getDprObj(id);
        kony.print("AND download start url"+url+":UID:"+id);
        if (content["contentType"] === "video") {
          //  obj.startDownloadUsingDM(content.url, id);

          obj.startDownload(content.url, id);
        } else {
          obj.startDownload(content.url, id);
        }
        //obj.startDownload(url, id); //FFI call
      }
    }catch(e){
      kony.print("Exception in startdownload::"+e)
    }

  },
  setOfflineData:function(content){
    try{
      var offlineContent = retrieveJsonAllLanguages("offlineContent");
      if(isBlankOrNull(offlineContent))offlineContent = {}
      var expr =  !isBlankOrNull(content["otherLanguageDownload"]) && content["otherLanguageDownload"];
      kony.print("NSR@@ other language download "+expr);
      if(expr || content.isDownloaded || content.isBookmarked || content.isDownloading || content.isPaused  ){
        offlineContent[content["UID"]] = content;
        storeJson("offlineContent", offlineContent);
      }else{
        delete offlineContent[content["UID"]];
        storeJson("offlineContent", offlineContent);
      }
    }catch(e){
      kony.print("Exception in setOfflineData"+e);
    }		
  },
  cancelDownload: function(content,index) {
    try{
      //#ifdef iphone
      DownloadManagerObject.cancelDownloadJs(content);
      //#endif
      //#ifdef android
      kony.print("AND download pause");
      var id = content["UID"];
      if(content["contentType"]=="video"){
        id=id+".mp4";
      }else if(content["contentType"]=="pdf"){
        id=id+".pdf";
      }
      var obj = getDprObj(id);
      obj.stopDownload();

      //removing the temp files
      var docPath = kony.io.FileSystem.getDataDirectoryPath();
      kony.print("Kony doc directory path is:" + docPath);
      var path = docPath.replace("files", "");
      kony.print("final path is:" + path);

      if (content.contentType === "pdf") {
        kony.print("pdfdownloaded");
        var filePath = path + "/" + content.UID + ".pdf";
        var file = new kony.io.File(filePath);
        if (file.exists()) {
          kony.print("pdf file exists in the path");
          file.remove();
          kony.print("pdf file removed check the size");
        }
      } else if (content.contentType === "video") {
        // path=kony.io.FileSystem.getExternalStorageDirectoryPath() + "/Download";
        kony.print("video downloaded");
        var filePath ="";


        var filePath = path + "/" + content.UID + ".mp4";
        var file = new kony.io.File(filePath);
        kony.print("filePath inside toggle is" + filePath);
        if (file.exists()) {
          kony.print("mp4 file exists in the path");
          file.remove();
          kony.print("mp4 file removed check the size");
        }
      }

      //#endif

      controllerReference.setDownloadProgress(3,content,index);	
      //update online data	if user searches the data we are searching in segData	
      for(var i=0;i<segmentData.length;i++){
        if(content["UID"] == segmentData[i]["UID"]){
          segmentData[i].btnDownload.skin = "sknBtnDownload";
          segmentData[i].isDownloaded = false ;
          segmentData[i].isPaused = false ;
          segmentData[i].isDownloading = false ;
          segmentData[i].PausedPercent = "";
        }
      }

    }catch(e){
      kony.print("Exception in cancel download:"+e);
    }

  },
  downloadTrackEventAnalytics : function(event_name,click_detail, contentId,contentType,widgetComponents){
    var dataOnclickArray = {
      "app_type": getDevicePlatform() , //ios or android sent by OS of the device
      "app_country": "in",
      "app_language": getDeviceLanguage(),
      "app_digitalProperty": "Amway Business app",
      "app_region":"eia",
      "event_name": event_name, //"click_action",
      "click_detail": click_detail,//"header login",
      "click_category": "",
      "content_id": contentId,
      "content_type":contentType,
      "visitor_imcID":gblVisitor_imcID,
      "page_components": widgetComponents
    };
    Tealium.trackEvent("click_action", JSON.stringify(dataOnclickArray), "eia-hub-app");
  },
  pauseDownload: function() {
    try{

      kony.print("pause clicked");
      if(undefined == controllerReference.view.segHomePageContent.selectedIndex[1] || null == controllerReference.view.segHomePageContent.selectedIndex[1]){
        kony.print("pauseDownload no selected index so returning");
        return;
      }
      var selectedIndex = controllerReference.view.segHomePageContent.selectedIndex[1];
      var contentObj = controllerReference.view.segHomePageContent.selectedItems;
      kony.print("selecte item is :: " + JSON.stringify(contentObj));
      var contentObject =  contentObj[0];
      var contentId = contentObject.FullTitle;
      var contentType = contentObject.contentType;
      //var widgetComponents = ["btnPauseDownload"];
      //this.downloadTrackEventAnalytics("click_action", "Download_pause", contentId,contentType,widgetComponents);
      var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"Download_pause",
        "content_type": contentType,
      	"content_id": contentId
    	 };
      callTealiumOnClick(onClickDetails, ["btnPauseDownload"], false);
      //#ifdef iphone
      DownloadManagerObject.pauseDownloadJs(contentObject);
      //#endif
      //#ifdef android
      kony.print("AND download pause");
      var id = contentObject["UID"];
      if(contentObject["contentType"]=="video"){
        id=id+".mp4";
      }else if(contentObject["contentType"]=="pdf"){
        id=id+".pdf";
      }
      var obj = getDprObj(id);
      obj.stopDownload();
      //#endif
      var offlineContent = retrieveJson("offlineContent");
      if(isBlankOrNull(offlineContent) && !isBlankOrNull(offlineContent[contentObject["UID"]]) ){
        var contentObj = offlineContent[contentObject["UID"]];
        kony.print("offline content url is "+contentObj.url);
        contentObject.url = contentObj.url;
      }	
      kony.print("pause clicked");
      //Set the row view      
      contentObject.PausedPercent = contentObject.lblDownloadProgress.text.substring(15);
      controllerReference.setDownloadProgress(2,contentObject,selectedIndex);	
      //update online data		
      for(var i=0;i<segmentData.length;i++){
        if(contentObject["UID"] == segmentData[i]["UID"]){
          segmentData[i].btnDownload.skin = "sknBtnDownload";
          segmentData[i].isDownloaded = false ;
          segmentData[i].isPaused = true ;
          segmentData[i].isDownloading = false ;
          segmentData[i].PausedPercent = contentObject.lblDownloadProgress.text.substring(15);
        }
      }
    }catch(e){
      kony.print("Exception in pauseDownload:"+e);
    }
  },
  playDownload: function() {
    try{
      kony.print("resume clicked");  



      if(undefined == controllerReference.view.segHomePageContent.selectedIndex[1] || null == controllerReference.view.segHomePageContent.selectedIndex[1]){
        kony.print("playDownload no selected index so returning");
        return;
      }
      var selectedIndex = controllerReference.view.segHomePageContent.selectedIndex[1];
      var contentObj = controllerReference.view.segHomePageContent.selectedItems;
      kony.print("selecte item is :: " + JSON.stringify(contentObj));
      var contentObject =  contentObj[0];  
      //#ifdef iphone
      DownloadManagerObject.resumeDownloadJs(contentObject);
      //#endif

      //#ifdef android
      kony.print("AND download resume");
      var id = contentObject["UID"];
      if(contentObject["contentType"]=="video"){
        id=id+".mp4";
      }else if(contentObject["contentType"]=="pdf"){
        id=id+".pdf";
      }
      var obj = getDprObj(id);
      if(contentObject["contentType"]=="video"){
        // obj.startDownloadUsingDM(contentObject.url, id); 
        obj.startDownload(contentObject.url, id); 
      }else if(contentObject["contentType"]=="pdf"){
        obj.startDownload(contentObject.url, id); 
      }
      //obj.startDownload(contentObject.url, id); 
      //#endif

      var offlineContent = retrieveJson("offlineContent");
      if(isBlankOrNull(offlineContent) && !isBlankOrNull(offlineContent[contentObject["UID"]]) ){
        var contentObj = offlineContent[contentObject["UID"]];
        kony.print("offline content url is "+contentObj.url);
        contentObject.url = contentObj.url;
      }	
      //Update row
      controllerReference.setDownloadProgress(1,contentObject,selectedIndex);
      //update online data		
      for(var i=0;i<segmentData.length;i++){
        if(contentObject["UID"] == segmentData[i]["UID"]){
          segmentData[i].btnDownload.skin = "sknBtnDownload";
          segmentData[i].isDownloaded = false ;
          segmentData[i].isPaused = false ;
          segmentData[i].isDownloading = true ;
          segmentData[i].PausedPercent = "";
        }
      }	


    }catch(e){
      kony.print("Exception in resumeDownload: "+e);
    }

  },
  updateProgressCallback:function(object,percentage){
    kony.print("homepage update progress callback"); 
  },
  finishDownloadCallBackObj:function(object,filePath){
    try{

      if(!isBlankOrNull(filePath)&& filePath == "ERROR"){
        var index = null;
        for(var i=0;i<segmentData.length;i++){
          if(object["UID"] == segmentData[i]["UID"]){
            index = i;
            break;
          }
        }	
        controllerReference.cancelDownload(object,index);
        return;
      }

      var index = null;
      kony.print("sreeni finishDownloadCallBackObj callback object  is"+JSON.stringify(object)+"filePath"+filePath);
      object.btnPauseDownload = {isVisible:true,onClick:this.pauseDownload};
      object.loaderActive = {isVisible:true,src:"wheel1.gif"};
      object.btnPlayDownload = {onClick:this.playDownload,isVisible:false};
      object.loaderInactive = {src:"wheel.png",isVisible:false};
      object.flxDownloadOverlay={isVisible:false};
      if(isAndroid()){
        object.isDownloaded = true;
        object.isDownload = "true";
        object.isPaused = false;
        object.isDownloading = false;
        object.btnDownload.skin = "sknBtnDownloadActive";
        object.PausedPercent = "";
        object.flxDownloadOverlay = {onClick : function(){},isVisible:false};
        object.btnShare.onClick = controllerReference.onClickOfShareButton;
        object.btnDownload.onClick = controllerReference.onClickOfDownloadButton;
        object.btnBookmark.onClick = controllerReference.onClickOfBookmarkButton;
        //update online data		
        for(var i=0;i<segmentData.length;i++){
          if(object.UID  == segmentData[i]["UID"]){
            segmentData[i].btnDownload.skin = "sknBtnDownloadActive";
            segmentData[i].isDownloaded = true ;
            segmentData[i].isPaused = false ;
            segmentData[i].isDownloading = false ;
            segmentData[i].PausedPercent = "";
            segmentData[i].flxDownloadOverlay = {onClick : function(){},isVisible:false};
            break;
          }
        }	
        //push  data to offline
        var offlineContent = retrieveJsonAllLanguages("offlineContent");
        if(isBlankOrNull(offlineContent)){
          offlineContent = {};		
        }else{
          if(!isBlankOrNull(offlineContent[object["UID"]])){
            object.isBookmarked = offlineContent[object["UID"]].isBookmarked;
            if(object.isBookmarked)
              object.btnBookmark.skin = "sknBookmarkActive";
            else
              object.btnBookmark.skin = "sknBookmark";
          }
        }
        offlineContent[object["UID"]] = object;
        storeJson("offlineContent", offlineContent);
      }
      for(var i=0;i<segmentData.length;i++){
        if(object["UID"] == segmentData[i]["UID"]){
          index = i;//TODO what if two urls are same
          break;
        }
      }	
      if(undefined != index && null != index){
        controllerReference.view.segHomePageContent.setDataAt(object, index);
      }

    }catch(e){
      kony.print("Exception in homepage finish method:"+e);
    }

  },
  getBrightCoveDataErrorCallback: function(errormsg) {
    dismissLoading();
    controllerReference.infoPopupOn(getI18Value("ServiceFailureMessage"));
    kony.print(" ********** Failure in brightcoveListResponse: " + JSON.stringify(errormsg) + " ********** ");
  },
  getBrightCoveDataSuccessCallback: function(brightcoveListResponse) {
    if (brightcoveListResponse["opstatus"] === 0) {
      kony.print("*************** Entering into brightcoveListResponse *************************");
      kony.print("Response : " + JSON.stringify(brightcoveListResponse));
      dismissLoading();
      if (!isBlankOrNull(brightcoveListResponse.sources)) {
        try {
          var sources = brightcoveListResponse.sources;
          kony.print("Sreeni >>>>> Data is : " + JSON.stringify(sources));
          for (var i =0; i< sources.length ; i++) {
            if(sources[i]["container"]=="MP4"){
              if (!isBlankOrNull(sources[i]["src"]) && sources[i]["src"].indexOf("mp4") != -1 && sources[i]["src"].indexOf("https") != -1) {
                kony.print("Sreeni >>>>> final URL is : " + sources[i]["src"] + "is downloading is ");
                gblData.url = sources[i]["src"];
                break;
              }
            }

          }

          //update online data	

          for(var i=0;i<segmentData.length;i++){
            if(gblData["UID"] == segmentData[i]["UID"]){
              kony.print("Sreeni >>>>> updating online data :"+JSON.stringify(gblData));
              segmentData[i].url = gblData.url;
              for(var m=0;m<segmentData[i].videoLanguageUrls.length;m++){
                if(segmentData[i].videoLanguageUrls[m]["language"].toLowerCase() === gblLanguage.toLowerCase()){
                  kony.print("Setting language for language support");
                  segmentData[i].videoLanguageUrls[m]["url"] = gblData.url;
                  break;
                }
              }
              //controllerReference.view.segHomePageContent.setDataAt(gblData, gblIndex);
            }
          }	
          kony.print("sreeni downloading brightcove");
          controllerReference.startDownload(gblData,gblIndex);
          gblData = null;
          gblIndex = null;
        } catch (e) {
          gblData = null;
          gblIndex = null;
          kony.print("exception in brightccove callback!!");
        }
      } else {
        gblData = null;
        gblIndex = null;
        controllerReference.infoPopupOn(getI18Value("ServiceFailureMessage"));
      }
    } else {
      gblData = null;
      gblIndex = null;
      dismissLoading();
      controllerReference.infoPopupOn(getI18Value("ServiceFailureMessage"));
    }
  },
  getBrightCoveVideoData: function(data) {
    kony.print("Inside getContentListData function");
    if (isNetworkAvailable()) {
      if (mobileFabricConfiguration.isKonySDKObjectInitialized) {
        showLoading();
        kony.print("Inside if condition");
        mobileFabricConfiguration.integrationObj = mobileFabricConfiguration.konysdkObject.getIntegrationService(mobileFabricConfiguration.integrationServices[5].service);
        var operationName = mobileFabricConfiguration.integrationServices[5].operations[0];
        kony.print("Operation name : " + operationName);
        var headers = {};
        var splitListAccntId = data.url.split("/");
        var accountId = splitListAccntId[3] + "";
        var splitListVideoId = data.url.split("=");
        var videoId = splitListVideoId[1] + "";
        kony.print("Sreeni account id is  " + accountId + "Video id is " + videoId);
        var dataToService = {
          "accountid": accountId,
          "videoid": videoId
        };
        mobileFabricConfiguration.integrationObj.invokeOperation(operationName, headers, dataToService, controllerReference.getBrightCoveDataSuccessCallback, controllerReference.getBrightCoveDataErrorCallback);
      } else {
        controllerReference.initializeMF("GET_BRIGHTCOVE_DATA", data);
      }
    } else {
      dismissLoading();
      kony.print("sreeni showing toast when there is no n/w");
      controllerReference.view.flxToast.isVisible = true;
      try {
        kony.timer.cancel("timerid");
      } catch (e) {}
      kony.timer.schedule("timerid", controllerReference.disableFlex.bind(this), 5, false);
    }
  },
  updateSegmentDataForBB:function(){
    try{
      for(var k=0;k<segmentData.length;k++){
        segmentData[k].flxDownloadOverlay = {onClick : function(){},isVisible:false}; 
        segmentData[k].btnPauseDownload = {isVisible:true,onClick:controllerReference.pauseDownload};
        segmentData[k].btnPlayDownload = {isVisible:false,onClick:controllerReference.playDownload};
        segmentData[k].closeOverlay = {isVisible:true, onClick:controllerReference.onClickCloseOverlay};
      }

      kony.print("NSR inside updateSegmentDataForBB");
      var offlineContent = retrieveJson("offlineContent");
      for (var key in offlineContent) {
        for(var i=0;i<segmentData.length;i++){
          if(key == segmentData[i]["UID"]){
            kony.print("SR@ Offline content key::"+key + " -> " + JSON.stringify( offlineContent[key]));
            segmentData[i]["isBookmarked"] = offlineContent[key]["isBookmarked"];
            segmentData[i]["isDownloaded"] = offlineContent[key]["isDownloaded"];
            if(segmentData[i]["isBookmarked"]){
              segmentData[i].btnBookmark = {skin: "sknBookmarkActive"   , onClick: controllerReference.onClickOfBookmarkButton};
            }else{
              segmentData[i].btnBookmark = {skin: "sknBookmark" , onClick: controllerReference.onClickOfBookmarkButton};
            }
            if(segmentData[i]["isDownloaded"]){
              segmentData[i].btnDownload = {skin: "sknBtnDownloadActive", onClick: controllerReference.onClickOfDownloadButton};
            }else{
              segmentData[i].btnDownload = {skin: "sknBtnDownload", onClick: controllerReference.onClickOfDownloadButton};
            }
            segmentData[i]["isPaused"] = offlineContent[key]["isPaused"];
            segmentData[i]["PausedPercent"] = offlineContent[key]["PausedPercent"];
            segmentData[i]["isDownloading"] = offlineContent[key]["isDownloading"];
            segmentData[i]["url"] = offlineContent[key]["url"];
            if(isBlankOrNull(segmentData[i]["url"])){
              kony.print("qwe URL is nil");
              segmentData[i].btnDownload.skin = "sknBtnDownloadDisable";
              segmentData[i].btnDownload.focusSkin = "sknBtnDownloadDisable";
            }
            if(segmentData[i]["isDownloading"]){
              segmentData[i].flxDownloadOverlay = {isVisible:true, onClick : function(){}}; 
              segmentData[i].btnPauseDownload = {isVisible:true,onClick:controllerReference.pauseDownload};
              segmentData[i].loaderActive = {isVisible:true,src:"wheel1.gif"};
              segmentData[i].btnPlayDownload = {onClick:controllerReference.playDownload,isVisible:false};
              segmentData[i].closeOverlay = {isVisible:true, onClick:controllerReference.onClickCloseOverlay};
              segmentData[i].loaderInactive = {src:"wheel.png",isVisible:false};
              segmentData[i].btnDownload.skin = "sknBtnDownload";
              segmentData[i].isDownloaded = false ;
              segmentData[i].isPaused = false ;
              segmentData[i].isDownloading = true ;
              segmentData[i].PausedPercent = "";
            }
            if(segmentData[i]["isPaused"]){
              segmentData[i].btnPauseDownload = {onClick:controllerReference.pauseDownload,isVisible:false};
              segmentData[i].loaderActive = {src:"wheel1.gif",isVisible:false};
              segmentData[i].btnPlayDownload = {isVisible:true,onClick:controllerReference.playDownload};
              segmentData[i].closeOverlay = {isVisible:true, onClick:controllerReference.onClickCloseOverlay};
              segmentData[i].loaderInactive = {isVisible:true,src:"wheel.png"};
              segmentData[i].flxDownloadOverlay = {isVisible:true, zIndex:4,onClick : function(){}};
              segmentData[i].btnDownload.skin = "sknBtnDownload";
              segmentData[i].isDownloaded = false ;
              segmentData[i].isPaused = true ;
              segmentData[i].isDownloading = false ;
              segmentData[i].PausedPercent =offlineContent[key]["PausedPercent"];
            }
            break;
          }//End If key matched with UID end
        }
      } 
    }catch(e){
      kony.print("Exception in updateSegmentDataForBB"+e);
    }

  },

  filterCategory : function(category) {
    try{      
      var filterListdata = [];
      for (var i=0; i<gblContentList.length; i++) {
        var record = gblContentList[i];
        //var recprofileName = sortedContentList[i]["profileName"];       
        if(record !== null && record["profileName"] !== undefined && record["profileName"].toLowerCase() === category){
          if(isNetworkAvailable()){
            record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
            filterListdata.push(record);
          }else{
            var expr =  !isBlankOrNull(record["otherLanguageDownload"]) && record["otherLanguageDownload"];
            kony.print("NSR@@ other language download "+expr);
            if(record["isDownloaded"] || expr){
              record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
              filterListdata.push(record);
            }
          }
        }
      }
      controllerReference.closeSideDrawer();
      controllerReference.view.segHomePageContent.removeAll();
      kony.print("jani >>> filterListdata : "+filterListdata.length);
      controllerReference.view.filterTabFilterCategory.isVisible = true;
      controllerReference.view.filterContents.top="90dp";
      controllerReference.view.lblFilterCategory.text = gblFilterCategoryName.toUpperCase();
      if(filterListdata.length !== 0){
        segmentData = filterListdata;       
        controllerReference.updateSegmentDataForBB();
        controllerReference.view.lblNofilteredData.isVisible = false;
        kony.print("rahul >>> filtered Data is  : "+JSON.stringify(segmentData));
        controllerReference.view.segHomePageContent.setData(segmentData);
      }
      else{
        segmentData=[];
        controllerReference.view.lblNofilteredData.isVisible = true; 
        controllerReference.view.flxDownloadOffline.isVisible = false;
      }
    }catch(e){
      kony.print("Exception in aboutPersonalCareData "+e);
    }
  },


  /*
  aboutPersonalCareData : function() {
    try{

      gblFilterCategory = gblPersonalCare;
      var filterListdata = [];
      kony.print("jani >>> filtered aboutPersonalCareData : "+JSON.stringify(gblContentList));
      for (var i=0; i<gblContentList.length; i++) {
        var record = gblContentList[i];
        //var recprofileName = sortedContentList[i]["profileName"];
        if(record !== null && record["profileName"] !== undefined && record["profileName"].toLowerCase() === gblPersonalCare){

          if(isNetworkAvailable()){
            record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
            filterListdata.push(record);
          }else{
            var expr =  !isBlankOrNull(record["otherLanguageDownload"]) && record["otherLanguageDownload"];
            kony.print("NSR@@ other language download "+expr);
            if(record["isDownloaded"] || expr){
              record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
              filterListdata.push(record);
            }
          }

        }

      }
      controllerReference.closeSideDrawer();
      controllerReference.view.segHomePageContent.removeAll();
      kony.print("jani >>> filterListdata : "+filterListdata.length);
      controllerReference.view.filterTabFilterCategory.isVisible = true;
      controllerReference.view.filterContents.top="90dp";
      controllerReference.view.lblFilterCategory.text = gblFilterCategoryName;
      if(filterListdata.length !== 0){
        segmentData = filterListdata;       

        controllerReference.updateSegmentDataForBB();
        controllerReference.view.lblNofilteredData.isVisible = false;
        kony.print("rahul >>> filtered Data is  : "+JSON.stringify(segmentData));
        controllerReference.view.segHomePageContent.setData(segmentData);

      }
      else{
        segmentData=[];
        controllerReference.view.lblNofilteredData.isVisible = true; 
        controllerReference.view.flxDownloadOffline.isVisible = false;
      }

    }catch(e){
      kony.print("Exception in aboutPersonalCareData "+e);
    }


  },
  aboutNutriliteData : function() {
    try{

      var filterListdata = [];
      gblFilterCategory = gblNutrilite;
      kony.print("jani >>> filtered aboutNutritionData : "+JSON.stringify(gblContentList));
      for (var i=0; i<gblContentList.length; i++) {

        var record = gblContentList[i];
        kony.print("mnb : "+JSON.stringify(record));
        //var recprofileName = sortedContentList[i]["profileName"];
        if(record !== null && record["profileName"] !== undefined && record["profileName"].toLowerCase() === gblNutrilite){

          if(isNetworkAvailable()){
            record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
            filterListdata.push(record);
          }else{
            var expr =  !isBlankOrNull(record["otherLanguageDownload"]) && record["otherLanguageDownload"];
            kony.print("NSR@@ other language download "+expr);
            if(record["isDownloaded"] || expr){
              record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
              filterListdata.push(record);
            }
          }
        }
      }
      controllerReference.closeSideDrawer();
      controllerReference.view.segHomePageContent.removeAll();
      controllerReference.view.filterTabFilterCategory.isVisible = true;
      controllerReference.view.filterContents.top="90dp";
      controllerReference.view.lblFilterCategory.text = gblFilterCategoryName;
      //kony.print("jani >>> filterListdata : "+filterListdata.length);
      if(filterListdata.length !== 0){
        segmentData = filterListdata;

        controllerReference.updateSegmentDataForBB();
        kony.print("NSR after updating data");
        controllerReference.view.lblNofilteredData.isVisible = false ;
        controllerReference.view.segHomePageContent.isVisible = true;
        kony.print("rahul >>> filtered Data is  : "+JSON.stringify(segmentData));
        controllerReference.view.segHomePageContent.setData(segmentData);  

      }
      else{
        segmentData=[];
        controllerReference.view.lblNofilteredData.isVisible = true; 
        controllerReference.view.flxDownloadOffline.isVisible = false;
      }

    }catch(e){
      kony.print("Exception in aboutNutriliteData "+e);
    }

  },
  aboutBeautyData : function() {
    try{

      var filterListdata = [];
      gblFilterCategory = gblBeauty;
      //kony.print("jani >>> filtered aboutBeautyData : "+JSON.stringify(sortedContentList));
      for (var i=0; i<gblContentList.length; i++) {
        var record = gblContentList[i];
        //var recprofileName = sortedContentList[i]["profileName"];
        if(record !== null && record["profileName"] !== undefined && (record["profileName"].toLowerCase() === gblArtistry || record["profileName"].toLowerCase() === gblAttitude  || record["profileName"].toLowerCase() === gblBeauty)){


          if(isNetworkAvailable()){
            record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
            filterListdata.push(record);
          }else{
            var expr =  !isBlankOrNull(record["otherLanguageDownload"]) && record["otherLanguageDownload"];
            kony.print("NSR@@ other language download "+expr);
            if(record["isDownloaded"]|| expr){
              record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
              filterListdata.push(record);
            }
          }
        }
      }
      controllerReference.closeSideDrawer();
      controllerReference.view.segHomePageContent.removeAll();
      controllerReference.view.filterTabFilterCategory.isVisible = true;
      controllerReference.view.filterContents.top="90dp";
      controllerReference.view.lblFilterCategory.text = gblFilterCategoryName;
      //kony.print("jani >>> filterListdata : "+filterListdata.length);
      if(filterListdata.length !== 0){
        segmentData = filterListdata;
        controllerReference.updateSegmentDataForBB();
        controllerReference.view.lblNofilteredData.isVisible = false ;
        controllerReference.view.segHomePageContent.isVisible = true;
        kony.print("rahul >>> filtered Data is  : "+JSON.stringify(segmentData));
        controllerReference.view.segHomePageContent.setData(segmentData);

      }
      else{
        segmentData=[];
        controllerReference.view.lblNofilteredData.isVisible = true; 
        controllerReference.view.flxDownloadOffline.isVisible = false;
      }

    }catch(e){
      kony.print("Exception in aboutBeautyData "+e);
    }

  },
  aboutAtHomeData : function() {
    try{

      var filterListdata = [];
      gblFilterCategory = gblAtHome;
      //kony.print("jani >>> filtered aboutAtHomeData : "+JSON.stringify(sortedContentList));
      for (var i=0; i<gblContentList.length; i++) {
        var record = gblContentList[i];
        // var recprofileName = sortedContentList[i]["profileName"];
        if(record !== null && record["profileName"] !== undefined && record["profileName"].toLowerCase() === gblAtHome){

          if(isNetworkAvailable()){
            record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
            filterListdata.push(record);
          }else{
            var expr =  !isBlankOrNull(record["otherLanguageDownload"]) && record["otherLanguageDownload"];
            kony.print("NSR@@ other language download "+expr);
            if(record["isDownloaded"] || expr){
              record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
              filterListdata.push(record);
            }
          }
        }
      }


      controllerReference.closeSideDrawer();
      controllerReference.view.segHomePageContent.removeAll();
      controllerReference.view.filterTabFilterCategory.isVisible = true;
      controllerReference.view.filterContents.top="90dp";
      controllerReference.view.lblFilterCategory.text = gblFilterCategoryName;
      //kony.print("jani >>> filterListdata : "+filterListdata.length);
      if(filterListdata.length !== 0){
        segmentData = filterListdata;
        controllerReference.updateSegmentDataForBB();
        controllerReference.view.lblNofilteredData.isVisible = false ;
        controllerReference.view.segHomePageContent.isVisible = true;
        kony.print("rahul >>> filtered Data is  : "+JSON.stringify(segmentData));
        controllerReference.view.segHomePageContent.setData(segmentData);

      }
      else{
        segmentData=[];
        controllerReference.view.lblNofilteredData.isVisible = true; 
        controllerReference.view.flxDownloadOffline.isVisible = false;
      }

    }catch(e){
      kony.print("Exception in aboutAtHomeData "+e);
    }

  },
  aboutMoreProductsData : function() {
    try{

      var filterListdata = [];
      gblFilterCategory = gblMoreProducts;
      //kony.print("jani >>> filtered aboutMoreProductsData : "+JSON.stringify(sortedContentList));
      for (var i=0; i<gblContentList.length; i++) {
        var record = gblContentList[i];
        //var recprofileName = sortedContentList[i]["profileName"];
        if(record !== null && record["profileName"] !== undefined && record["profileName"].toLowerCase() === gblMoreProducts){


          if(isNetworkAvailable()){
            record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
            filterListdata.push(record);
          }else{
            var expr =  !isBlankOrNull(record["otherLanguageDownload"]) && record["otherLanguageDownload"];
            kony.print("NSR@@ other language download "+expr);
            if(record["isDownloaded"] || expr){
              record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
              filterListdata.push(record);
            }
          }
        }
      }
      controllerReference.closeSideDrawer();
      controllerReference.view.segHomePageContent.removeAll();
      controllerReference.view.filterTabFilterCategory.isVisible = true;
      controllerReference.view.filterContents.top="90dp";
      controllerReference.view.lblFilterCategory.text = gblFilterCategoryName;
      //kony.print("jani >>> filterListdata : "+filterListdata.length);
      if(filterListdata.length !== 0){
        segmentData = filterListdata;
        controllerReference.updateSegmentDataForBB();
        controllerReference.view.lblNofilteredData.isVisible = false ;
        controllerReference.view.segHomePageContent.isVisible = true;
        kony.print("rahul >>> filtered Data is  : "+JSON.stringify(segmentData));
        controllerReference.view.segHomePageContent.setData(segmentData);

      }
      else{
        segmentData=[];
        controllerReference.view.lblNofilteredData.isVisible = true; 
        controllerReference.view.flxDownloadOffline.isVisible = false;
      }

    }catch(e){
      kony.print("Exception in aboutMoreProductsData "+e);
    }

  },
  aboutAmwayData : function() {
    try{

      var filterListdata = [];
      gblFilterCategory = gblAboutAmway;
      //kony.print("jani >>> filtered aboutAmwayData : "+JSON.stringify(sortedContentList));
      for (var i=0; i<gblContentList.length; i++) {
        var record = gblContentList[i];
        //var recprofileName = sortedContentList[i]["profileName"];
        if (record !== null && record["profileName"] !== undefined && record["profileName"].toLowerCase() === gblAboutAmway) {


          if(isNetworkAvailable()){
            record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
            filterListdata.push(record);
          }else{
            var expr =  !isBlankOrNull(record["otherLanguageDownload"]) && record["otherLanguageDownload"];
            kony.print("NSR@@ other language download "+expr);
            if(record["isDownloaded"] || expr){
              record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
              filterListdata.push(record);
            }
          }
        }
      }
      controllerReference.closeSideDrawer();
      controllerReference.view.segHomePageContent.removeAll();
      controllerReference.view.filterTabFilterCategory.isVisible = true;
      controllerReference.view.filterContents.top="90dp";
      controllerReference.view.lblFilterCategory.text = gblFilterCategoryName;
      //kony.print("jani >>> filterListdata : "+filterListdata.length);
      if(filterListdata.length !== 0){
        segmentData = filterListdata;
        controllerReference.updateSegmentDataForBB();
        controllerReference.view.lblNofilteredData.isVisible = false ;
        controllerReference.view.segHomePageContent.isVisible = true;
        kony.print("rahul >>> filtered Data is  : "+JSON.stringify(segmentData));
        controllerReference.view.segHomePageContent.setData(segmentData);

      }
      else{
        segmentData=[];
        controllerReference.view.lblNofilteredData.isVisible = true;
        controllerReference.view.flxDownloadOffline.isVisible = false;
      }

    }catch(e){
      kony.print("Exception in aboutAmwayData "+e);
    }

  },
  aboutHeritage : function() {
    try{

      var filterListdata = [];
      gblFilterCategory = gblheritage;
      //kony.print("jani >>> filtered aboutHeritage : "+JSON.stringify(sortedContentList));
      for (var i=0; i<gblContentList.length; i++) {
        var record = gblContentList[i];
        //var recprofileName = sortedContentList[i]["profileName"];
        if (record !== null && record["profileName"] !== undefined && record["profileName"].toLowerCase() === gblheritage) {


          if(isNetworkAvailable()){
            record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
            filterListdata.push(record);
          }else{
            var expr =  !isBlankOrNull(record["otherLanguageDownload"]) && record["otherLanguageDownload"];
            kony.print("NSR@@ other language download "+expr);
            if(record["isDownloaded"] || expr){
              record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
              filterListdata.push(record);
            }
          }
        }
      }
      controllerReference.closeSideDrawer();
      controllerReference.view.segHomePageContent.removeAll();
      controllerReference.view.filterTabFilterCategory.isVisible = true;
      controllerReference.view.filterContents.top="90dp";
      controllerReference.view.lblFilterCategory.text = gblFilterCategoryName;
      //kony.print("jani >>> filterListdata : "+filterListdata.length);
      if(filterListdata.length !== 0){
        segmentData = filterListdata;
        controllerReference.updateSegmentDataForBB();
        controllerReference.view.lblNofilteredData.isVisible = false ;
        controllerReference.view.segHomePageContent.isVisible = true;
        kony.print("rahul >>> filtered Data is  : "+JSON.stringify(segmentData));
        controllerReference.view.segHomePageContent.setData(segmentData);

      }
      else{
        segmentData=[];
        controllerReference.view.lblNofilteredData.isVisible = true;
        controllerReference.view.flxDownloadOffline.isVisible = false;
      }

    }catch(e){
      kony.print("Exception in aboutAmwayData "+e);
    }

  },
  aboutFacts : function() {
    try{

      var filterListdata = [];
      gblFilterCategory = gblFactSheets;
      //kony.print("jani >>> filtered aboutFacts : "+JSON.stringify(sortedContentList));
      for (var i=0; i<gblContentList.length; i++) {
        var record = gblContentList[i];
        //var recprofileName = sortedContentList[i]["profileName"];
        if (record !== null && record["profileName"] !== undefined && record["profileName"].toLowerCase() === gblFactSheets) {


          if(isNetworkAvailable()){
            record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
            filterListdata.push(record);
          }else{
            var expr =  !isBlankOrNull(record["otherLanguageDownload"]) && record["otherLanguageDownload"];
            kony.print("NSR@@ other language download "+expr);
            if(record["isDownloaded"] || expr){
              record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
              filterListdata.push(record);
            }
          }
        }
      }
      controllerReference.closeSideDrawer();
      controllerReference.view.segHomePageContent.removeAll();
      controllerReference.view.filterTabFilterCategory.isVisible = true;
      controllerReference.view.filterContents.top="90dp";
      controllerReference.view.lblFilterCategory.text = gblFilterCategoryName;
      //kony.print("jani >>> filterListdata : "+filterListdata.length);
      if(filterListdata.length !== 0){
        segmentData = filterListdata;
        controllerReference.updateSegmentDataForBB();
        controllerReference.view.lblNofilteredData.isVisible = false ;
        controllerReference.view.segHomePageContent.isVisible = true;
        kony.print("rahul >>> filtered Data is  : "+JSON.stringify(segmentData));
        controllerReference.view.segHomePageContent.setData(segmentData);

      }
      else{
        segmentData=[];
        controllerReference.view.lblNofilteredData.isVisible = true;
        controllerReference.view.flxDownloadOffline.isVisible = false;
      }

    }catch(e){
      kony.print("Exception in aboutAmwayData "+e);
    }

  },
  aboutManufacturing : function() {
    try{

      var filterListdata = [];
      gblFilterCategory = gblManufacturing;
      //kony.print("jani >>> filtered aboutFacts : "+JSON.stringify(sortedContentList));
      for (var i=0; i<gblContentList.length; i++) {
        var record = gblContentList[i];
        //var recprofileName = sortedContentList[i]["profileName"];
        if (record !== null && record["profileName"] !== undefined && record["profileName"].toLowerCase() === gblManufacturing) {


          if(isNetworkAvailable()){
            record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
            filterListdata.push(record);
          }else{
            var expr =  !isBlankOrNull(record["otherLanguageDownload"]) && record["otherLanguageDownload"];
            kony.print("NSR@@ other language download "+expr);
            if(record["isDownloaded"] || expr){
              record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
              filterListdata.push(record);
            }
          }
        }
      }
      controllerReference.closeSideDrawer();
      controllerReference.view.segHomePageContent.removeAll();
      controllerReference.view.filterTabFilterCategory.isVisible = true;
      controllerReference.view.filterContents.top="90dp";
      controllerReference.view.lblFilterCategory.text = gblFilterCategoryName;
      //kony.print("jani >>> filterListdata : "+filterListdata.length);
      if(filterListdata.length !== 0){
        segmentData = filterListdata;
        controllerReference.updateSegmentDataForBB();
        controllerReference.view.lblNofilteredData.isVisible = false ;
        controllerReference.view.segHomePageContent.isVisible = true;
        kony.print("rahul >>> filtered Data is  : "+JSON.stringify(segmentData));
        controllerReference.view.segHomePageContent.setData(segmentData);

      }
      else{
        segmentData=[];
        controllerReference.view.lblNofilteredData.isVisible = true;
        controllerReference.view.flxDownloadOffline.isVisible = false;
      }

    }catch(e){
      kony.print("Exception in aboutAmwayData "+e);
    }

  },
  aboutAwards : function() {
    try{

      var filterListdata = [];
      gblFilterCategory = gblAwards;

      for (var i=0; i<gblContentList.length; i++) {
        var record = gblContentList[i];
        if (record !== null && record["profileName"] !== undefined && record["profileName"].toLowerCase() === gblAwards) {


          if(isNetworkAvailable()){
            record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
            filterListdata.push(record);
          }else{
            var expr =  !isBlankOrNull(record["otherLanguageDownload"]) && record["otherLanguageDownload"];
            kony.print("NSR@@ other language download "+expr);
            if(record["isDownloaded"] || expr){
              record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
              filterListdata.push(record);
            }
          }
        }
      }
      controllerReference.closeSideDrawer();
      controllerReference.view.segHomePageContent.removeAll();
      controllerReference.view.filterTabFilterCategory.isVisible = true;
      controllerReference.view.filterContents.top="90dp";
      controllerReference.view.lblFilterCategory.text = gblFilterCategoryName;
      //kony.print("jani >>> filterListdata : "+filterListdata.length);
      if(filterListdata.length !== 0){
        segmentData = filterListdata;
        controllerReference.updateSegmentDataForBB();
        controllerReference.view.lblNofilteredData.isVisible = false ;
        controllerReference.view.segHomePageContent.isVisible = true;
        kony.print("rahul >>> filtered Data is  : "+JSON.stringify(segmentData));
        controllerReference.view.segHomePageContent.setData(segmentData);

      }
      else{
        segmentData=[];
        controllerReference.view.lblNofilteredData.isVisible = true;
        controllerReference.view.flxDownloadOffline.isVisible = false;
      }

    }catch(e){
      kony.print("Exception in aboutAmwayData "+e);
    }

  },
  aboutCorporateSocial : function() {
    try{

      var filterListdata = [];
      gblFilterCategory = gblCorporate;

      for (var i=0; i<gblContentList.length; i++) {
        var record = gblContentList[i];
        if (record !== null && record["profileName"] !== undefined && record["profileName"].toLowerCase() === gblCorporate) {


          if(isNetworkAvailable()){
            record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
            filterListdata.push(record);
          }else{
            var expr =  !isBlankOrNull(record["otherLanguageDownload"]) && record["otherLanguageDownload"];
            kony.print("NSR@@ other language download "+expr);
            if(record["isDownloaded"] || expr){
              record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
              filterListdata.push(record);
            }
          }
        }
      }
      controllerReference.closeSideDrawer();
      controllerReference.view.segHomePageContent.removeAll();
      controllerReference.view.filterTabFilterCategory.isVisible = true;
      controllerReference.view.filterContents.top="90dp";
      controllerReference.view.lblFilterCategory.text = gblFilterCategoryName;
      //kony.print("jani >>> filterListdata : "+filterListdata.length);
      if(filterListdata.length !== 0){
        segmentData = filterListdata;
        controllerReference.updateSegmentDataForBB();
        controllerReference.view.lblNofilteredData.isVisible = false ;
        controllerReference.view.segHomePageContent.isVisible = true;
        kony.print("rahul >>> filtered Data is  : "+JSON.stringify(segmentData));
        controllerReference.view.segHomePageContent.setData(segmentData);

      }
      else{
        segmentData=[];
        controllerReference.view.lblNofilteredData.isVisible = true;
        controllerReference.view.flxDownloadOffline.isVisible = false;
      }

    }catch(e){
      kony.print("Exception in aboutAmwayData "+e);
    }

  },
  aboutMedia : function() {
    try{

      var filterListdata = [];
      gblFilterCategory = gblMedia;

      for (var i=0; i<gblContentList.length; i++) {
        var record = gblContentList[i];
        if (record !== null && record["profileName"] !== undefined && record["profileName"].toLowerCase() === gblMedia) {


          if(isNetworkAvailable()){
            record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
            filterListdata.push(record);
          }else{
            var expr =  !isBlankOrNull(record["otherLanguageDownload"]) && record["otherLanguageDownload"];
            kony.print("NSR@@ other language download "+expr);
            if(record["isDownloaded"] || expr){
              record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
              filterListdata.push(record);
            }
          }
        }
      }
      controllerReference.closeSideDrawer();
      controllerReference.view.segHomePageContent.removeAll();
      controllerReference.view.filterTabFilterCategory.isVisible = true;
      controllerReference.view.filterContents.top="90dp";
      controllerReference.view.lblFilterCategory.text = gblFilterCategoryName;
      //kony.print("jani >>> filterListdata : "+filterListdata.length);
      if(filterListdata.length !== 0){
        segmentData = filterListdata;
        controllerReference.updateSegmentDataForBB();
        controllerReference.view.lblNofilteredData.isVisible = false ;
        controllerReference.view.segHomePageContent.isVisible = true;
        kony.print("rahul >>> filtered Data is  : "+JSON.stringify(segmentData));
        controllerReference.view.segHomePageContent.setData(segmentData);

      }
      else{
        segmentData=[];
        controllerReference.view.lblNofilteredData.isVisible = true;
        controllerReference.view.flxDownloadOffline.isVisible = false;
      }

    }catch(e){
      kony.print("Exception in aboutAmwayData "+e);
    }

  },
  aboutOppurtunity : function() {
    try{

      var filterListdata = [];
      gblFilterCategory = gblOpportunity;

      for (var i=0; i<gblContentList.length; i++) {
        var record = gblContentList[i];
        if (record !== null && record["profileName"] !== undefined && record["profileName"].toLowerCase() === gblOpportunity) {


          if(isNetworkAvailable()){
            record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
            filterListdata.push(record);
          }else{
            var expr =  !isBlankOrNull(record["otherLanguageDownload"]) && record["otherLanguageDownload"];
            kony.print("NSR@@ other language download "+expr);
            if(record["isDownloaded"] || expr){
              record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
              filterListdata.push(record);
            }
          }
        }
      }
      controllerReference.closeSideDrawer();
      controllerReference.view.segHomePageContent.removeAll();
      controllerReference.view.filterTabFilterCategory.isVisible = true;
      controllerReference.view.filterContents.top="90dp";
      controllerReference.view.lblFilterCategory.text = gblFilterCategoryName;
      //kony.print("jani >>> filterListdata : "+filterListdata.length);
      if(filterListdata.length !== 0){
        segmentData = filterListdata;
        controllerReference.updateSegmentDataForBB();
        controllerReference.view.lblNofilteredData.isVisible = false ;
        controllerReference.view.segHomePageContent.isVisible = true;
        kony.print("rahul >>> filtered Data is  : "+JSON.stringify(segmentData));
        controllerReference.view.segHomePageContent.setData(segmentData);

      }
      else{
        segmentData=[];
        controllerReference.view.lblNofilteredData.isVisible = true;
        controllerReference.view.flxDownloadOffline.isVisible = false;
      }

    }catch(e){
      kony.print("Exception in aboutAmwayData "+e);
    }

  },
  aboutRecognition : function() {
    try{

      var filterListdata = [];
      gblFilterCategory = gblRecognition;

      for (var i=0; i<gblContentList.length; i++) {
        var record = gblContentList[i];
        if (record !== null && record["profileName"] !== undefined && record["profileName"].toLowerCase() === gblRecognition) {


          if(isNetworkAvailable()){
            record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
            filterListdata.push(record);
          }else{
            var expr =  !isBlankOrNull(record["otherLanguageDownload"]) && record["otherLanguageDownload"];
            kony.print("NSR@@ other language download "+expr);
            if(record["isDownloaded"] || expr){
              record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
              filterListdata.push(record);
            }
          }
        }
      }
      controllerReference.closeSideDrawer();
      controllerReference.view.segHomePageContent.removeAll();
      controllerReference.view.filterTabFilterCategory.isVisible = true;
      controllerReference.view.filterContents.top="90dp";
      controllerReference.view.lblFilterCategory.text = gblFilterCategoryName;
      //kony.print("jani >>> filterListdata : "+filterListdata.length);
      if(filterListdata.length !== 0){
        segmentData = filterListdata;
        controllerReference.updateSegmentDataForBB();
        controllerReference.view.lblNofilteredData.isVisible = false ;
        controllerReference.view.segHomePageContent.isVisible = true;
        kony.print("rahul >>> filtered Data is  : "+JSON.stringify(segmentData));
        controllerReference.view.segHomePageContent.setData(segmentData);

      }
      else{
        segmentData=[];
        controllerReference.view.lblNofilteredData.isVisible = true;
        controllerReference.view.flxDownloadOffline.isVisible = false;
      }

    }catch(e){
      kony.print("Exception in aboutAmwayData "+e);
    }

  },
  aboutBrochures : function() {
    try{

      var filterListdata = [];
      gblFilterCategory = gblBrochures;

      for (var i=0; i<gblContentList.length; i++) {
        var record = gblContentList[i];
        if (record !== null && record["profileName"] !== undefined && record["profileName"].toLowerCase() === gblBrochures) {


          if(isNetworkAvailable()){
            record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
            filterListdata.push(record);
          }else{
            var expr =  !isBlankOrNull(record["otherLanguageDownload"]) && record["otherLanguageDownload"];
            kony.print("NSR@@ other language download "+expr);
            if(record["isDownloaded"] || expr){
              record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
              filterListdata.push(record);
            }
          }
        }
      }
      controllerReference.closeSideDrawer();
      controllerReference.view.segHomePageContent.removeAll();
      controllerReference.view.filterTabFilterCategory.isVisible = true;
      controllerReference.view.filterContents.top="90dp";
      controllerReference.view.lblFilterCategory.text = gblFilterCategoryName;
      //kony.print("jani >>> filterListdata : "+filterListdata.length);
      if(filterListdata.length !== 0){
        segmentData = filterListdata;
        controllerReference.updateSegmentDataForBB();
        controllerReference.view.lblNofilteredData.isVisible = false ;
        controllerReference.view.segHomePageContent.isVisible = true;
        kony.print("rahul >>> filtered Data is  : "+JSON.stringify(segmentData));
        controllerReference.view.segHomePageContent.setData(segmentData);

      }
      else{
        segmentData=[];
        controllerReference.view.lblNofilteredData.isVisible = true;
        controllerReference.view.flxDownloadOffline.isVisible = false;
      }

    }catch(e){
      kony.print("Exception in aboutAmwayData "+e);
    }

  },
  aboutSeminars : function() {
    try{

      var filterListdata = [];
      gblFilterCategory = gblSeminars;

      for (var i=0; i<gblContentList.length; i++) {
        var record = gblContentList[i];
        if (record !== null && record["profileName"] !== undefined && record["profileName"].toLowerCase() === gblSeminars) {


          if(isNetworkAvailable()){
            record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
            filterListdata.push(record);
          }else{
            var expr =  !isBlankOrNull(record["otherLanguageDownload"]) && record["otherLanguageDownload"];
            kony.print("NSR@@ other language download "+expr);
            if(record["isDownloaded"] || expr){
              record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
              filterListdata.push(record);
            }
          }
        }
      }
      controllerReference.closeSideDrawer();
      controllerReference.view.segHomePageContent.removeAll();
      controllerReference.view.filterTabFilterCategory.isVisible = true;
      controllerReference.view.filterContents.top="90dp";
      controllerReference.view.lblFilterCategory.text = gblFilterCategoryName;
      //kony.print("jani >>> filterListdata : "+filterListdata.length);
      if(filterListdata.length !== 0){
        segmentData = filterListdata;
        controllerReference.updateSegmentDataForBB();
        controllerReference.view.lblNofilteredData.isVisible = false ;
        controllerReference.view.segHomePageContent.isVisible = true;
        kony.print("rahul >>> filtered Data is  : "+JSON.stringify(segmentData));
        controllerReference.view.segHomePageContent.setData(segmentData);

      }
      else{
        segmentData=[];
        controllerReference.view.lblNofilteredData.isVisible = true;
        controllerReference.view.flxDownloadOffline.isVisible = false;
      }

    }catch(e){
      kony.print("Exception in aboutAmwayData "+e);
    }

  },
  aboutLearning : function() {
    try{

      var filterListdata = [];
      gblFilterCategory = gblLearning;

      for (var i=0; i<gblContentList.length; i++) {
        var record = gblContentList[i];

        kony.print("rahul data is "+ record["profileName"].toLowerCase() +"   "+ gblLearning);
        if (record !== null && record["profileName"] !== undefined && record["profileName"].toLowerCase() === gblLearning) {


          if(isNetworkAvailable()){
            record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
            filterListdata.push(record);
          }else{
            var expr =  !isBlankOrNull(record["otherLanguageDownload"]) && record["otherLanguageDownload"];
            kony.print("NSR@@ other language download "+expr);
            if(record["isDownloaded"] || expr){
              record.btnPauseDownload={isVisible:true,onClick:controllerReference.pauseDownload};
              filterListdata.push(record);
            }
          }
        }
      }
      controllerReference.closeSideDrawer();
      controllerReference.view.segHomePageContent.removeAll();
      controllerReference.view.filterTabFilterCategory.isVisible = true;
      controllerReference.view.filterContents.top="90dp";
      controllerReference.view.lblFilterCategory.text = gblFilterCategoryName;
      //kony.print("jani >>> filterListdata : "+filterListdata.length);
      if(filterListdata.length !== 0){
        segmentData = filterListdata;
        controllerReference.updateSegmentDataForBB();
        controllerReference.view.lblNofilteredData.isVisible = false ;
        controllerReference.view.segHomePageContent.isVisible = true;
        kony.print("rahul >>> filtered Data is  : "+JSON.stringify(segmentData));
        controllerReference.view.segHomePageContent.setData(segmentData);

      }
      else{
        segmentData=[];
        controllerReference.view.lblNofilteredData.isVisible = true;
        controllerReference.view.flxDownloadOffline.isVisible = false;
      }

    }catch(e){
      kony.print("Exception in aboutAmwayData "+e);
    }

  },

*/
  showNotification:function(){
    try{

      controllerReference.view.Popup2.isVisible=true;

    }catch(e){}
  }

});
