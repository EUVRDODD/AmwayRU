define({ 

  _init: function() {

    kony.print("Indu init called");
    controllerReference=this;
    this.applyBindings();
  },
  applyBindings: function() {

    if(!mycontentHamburger){
      this.view.SideDrawerWC.createSideDrawer();
      mycontentHamburger=true;
    }
    if(gblRetailScroll) return;
    mycontentFlag=false;
    //currentTab=0;
    pageComponents = ["Topbar","SideDrawer","Popup"];
    //controllerReference.view.flexSideDrawer.left = "-100%";
    swipedContent=0;
    if( !gblGestureEnabledInMyContentPage ) {
      gblGestureEnabledInMyContentPage = true;
      //currentTab = 0;
      //  this.addSwipeGestureHandler();
    }
    controllerReference.view.flxToast.isVisible=false;
    controllerReference.view.Topbar.flexOpenSideDrawer.onClick = controllerReference.openSideDrawer.bind( controllerReference );
    // controllerReference.view.SideDrawer.flexCloseButtonContainer.onClick = controllerReference.closeSideDrawer.bind( controllerReference );
    //controllerReference.view.SideDrawer.flexInvisibleTouchArea.onClick = controllerReference.closeSideDrawer.bind( controllerReference );
    controllerReference.view.preShow = controllerReference.mycontentPagePreShow.bind(controllerReference);
    this.view.onDeviceBack=this.checkGoBack.bind(this);
    this.view.btnHome.onClick = this.navigateToHome.bind(this);
    this.view.btnMyContent.onClick = this.navigateToMyContent.bind(this);
    this.view.btnSettings.onClick = this.navigateToSettings.bind(this);
    this.view.btnWebpage.onClick = this.navigateToWebApps.bind(this);
    this.view.postShow = this.goToMyContentPostshow.bind(this);
    this.view.segHomePageContent.onRowClick = this.segmentRowClicked.bind(this);
    this.view.flxAllContent.onClick = function(){controllerReference.getMyContentListAllContent();};//this.getMyContentListAllContent.bind(this);
    this.view.flxDownloadedContent.onClick = function(){controllerReference.getMyContentListDownloaded();};
    this.view.flxBookmarkedContent.onClick = function(){controllerReference.getMyContentListBookmarked();}; 

    controllerReference.view.flxMainPopup.isVisible=false;

    controllerReference.view.btnNoDelete.onClick=this.dismissPopup.bind(this);
    controllerReference.view.flxMainPopup.onTouchStart=function(){
      kony.print("Waiting for someone to write something amazing");
    };
  },

  dismissPopup:function(){
    callTealiumOnClick("click_action", "Undownload_No",pageComponents,gblVisitor_imcID);
    controllerReference.view.flxMainPopup.isVisible=false;
  },

  deleteContent:function(contentObject1,selectedIndex1){
    try{
      controllerReference.view.flxMainPopup.isVisible=true;
      kony.print("ContentObject is "+contentObject1 +"selected index is "+ selectedIndex1);

      controllerReference.view.btnYesDelete.onClick=function(){
        callTealiumOnClick("click_action", "Undownload_Yes",pageComponents,gblVisitor_imcID);
        kony.print("ContentObject is "+contentObject1 +"selected index is "+ selectedIndex1);
        var contentObject=contentObject1;
        var selectedIndex=parseInt(selectedIndex1);

        var docPath = kony.io.FileSystem.getDataDirectoryPath();
        kony.print("Kony doc directory path is:"+docPath);
        var path="";
        if(isIOS())
          path = docPath.replace("Library", "Documents");
        else
          path = docPath.replace("files", "");
        kony.print("final path is:"+path);

        //           var imgFileName = contentObject.fileName;
        //           var imageFilePath = path+"/"+imgFileName;
        //           var myImageFile = new kony.io.File(imageFilePath);
        //           if(myImageFile.exists()){
        //             //delete image
        //             myImageFile.remove();
        //             kony.print("image file removed check the size");
        //           }
        if (contentObject.contentType === "pdf"){
          kony.print("pdfdownloaded");
          var filePath = path+"/"+contentObject.UID+".pdf";
          var file = new kony.io.File(filePath);
          if(file.exists()){
            kony.print("pdf file exists in the path");
            file.remove();
            kony.print("pdf file removed check the size");
          }
        }
        else if (contentObject.contentType === "video"){
          kony.print("video downloaded");
          //  path=kony.io.FileSystem.getExternalStorageDirectoryPath() + "/Download";
          var filePath = path+"/"+contentObject.UID+".mp4";
          var file = new kony.io.File(filePath);
          if(file.exists()){
            kony.print("mp4 file exists in the path");
            file.remove();
            kony.print("mp4 file removed check the size");
          }    
        }
        contentObject.isPaused = false;
        contentObject.isDownloading = false;			
        contentObject.PausedPercent = "";  
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

        var expr =  !isBlankOrNull(contentObject["otherLanguageDownload"]) && contentObject["otherLanguageDownload"];
        kony.print("NSR@@ other language download "+expr);
        if(controllerReference.view.flxDonwloadedContentLine.centerX==="50%" && !expr){
          controllerReference.view.segHomePageContent.removeAt(selectedIndex);
          if(controllerReference.view.segHomePageContent.data.length == 0 || controllerReference.view.segHomePageContent.data.length==null){
            controllerReference.view.flxDownloadOffline.isVisible = true;
          }else{
            controllerReference.view.flxDownloadOffline.isVisible = false;
          }
        }else if( ( controllerReference.view.flxAllContentLine.centerX==="50%" && !(contentObject.isBookmarked) && !expr ) ){
          controllerReference.view.segHomePageContent.removeAt(selectedIndex);
          if(controllerReference.view.segHomePageContent.data.length == 0 || controllerReference.view.segHomePageContent.data.length==null){
            controllerReference.view.flxDownloadOrBookmarkOffline.isVisible = true;
          }else{
            controllerReference.view.flxDownloadOrBookmarkOffline.isVisible = false;
          }
        }
        else{
          kony.print("Entered case #3")
          controllerReference.view.segHomePageContent.setDataAt(contentObject, selectedIndex);
        }

        controllerReference.view.flxMainPopup.isVisible=false;
      }
    }catch(e){
      kony.print("Exception in deleteContent :"+e);
    }
  },

  goToMyContentPostshow : function(){
    try{
      controllerReference.PostshowAnalytics(this.view);
    }catch(e){

    }
    if(gblRetailScroll){
      gblRetailScroll = false;
      return;
    } 

    //controllerReference.getMyContentListAllContent();
    var prevForm = kony.application.getPreviousForm().id ;
    //     if(prevForm == "homepage"){
    //       kony.print("jani >>> homepage page pushing");
    //       gblFormBack.push(prevForm);
    //     }else if(prevForm == "settingpage"){
    //       kony.print("jani >>> settingpage page pushing");
    //       gblFormBack.push(prevForm);
    //     }else if(prevForm == "webapppage"){
    //       kony.print("jani >>> webapppage page pushing");
    //       gblFormBack.push(prevForm);
    //     }

    gblFormBack.push(prevForm);
    //kony.print(" jani >>> gblFormback list length searchresultspage :"+gblFormBack.length);
    kony.print(" jani >>> mycontent page previous form " +gblFormBack);

  },
  PostshowAnalytics :function(formName){
    var  additionalArg = ["Topbar","SideDrawer","Popup"];
    //additionalArg.push(this.view.id);
    kony.print("Tealium form widgets json for mycontent page :: "+JSON.stringify(additionalArg));
    callTealiumOnScreenLoad(this.view,additionalArg,gblVisitor_imcID);
  },
  showNotification:function(){
    try{
      controllerReference.view.Popup.isVisible=true;
    }catch(e){}
  },
  // Swipe Gesture Handle
  addSwipeGestureHandler: function() {
    try {
      this.view.setGestureRecognizer(2, {fingers:1,swipedistance:50,swipevelocity:50}, onGestureFunction); // swipe with default parameters
    }
    catch(err) {
      kony.print("Error while regestering the gestures: "+err);
    }

    // Gesture Handler
    function onGestureFunction(commonWidget,gestureInfo) {
      try {
        var direction = "";
        var GesType = ""+gestureInfo.gestureType;
        var tapParams = gestureInfo.gesturesetUpParams.taps;
        if (GesType == "2") 
        { 
          var swipeDirection = ""+gestureInfo.swipeDirection;

          if( swipeDirection === "1" ) {
            // left swipe
            swipedContent=1;
            if(currentTab===0){
              controllerReference.getMyContentListDownloaded();
              currentTab=1;
            }else if(currentTab==1){
              controllerReference.getMyContentListBookmarked();
              currentTab=2;
            }

          }
          else if( swipeDirection === "2" ) {
            // right swipe
            swipedContent=1;
            if(currentTab==1){
              controllerReference.getMyContentListAllContent();
              currentTab=0;
            }else if(currentTab==2){
              controllerReference.getMyContentListDownloaded();
              currentTab=1;
            }

          }
        }
      }
      catch(err) {
        kony.print("Error in gesture call back: "+err);
      }
    }
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
  navigateToHome: function() {
    this.navTrackEventAnalytics("click_action", "navigate_homepage",["btnHome"]);
    controllerReference.view.flxToast.setVisibility(false);
    try{
      kony.timer.cancel("timerid");	
    }catch(e){}

    var nav = new kony.mvc.Navigation("homepage");
    nav.navigate();

  },
  navigateToMyContent: function() {
    //No Action to take
  },
  navigateToSettings: function() {
    this.navTrackEventAnalytics("click_action", "navigate_settingpage",["btnSettings"]);
    var nav = new kony.mvc.Navigation("settingpage");
    nav.navigate();
  },
  navigateToWebApps: function() {
    this.navTrackEventAnalytics("click_action", "navigate_webapppage",["btnWebpage"]);
    var nav = new kony.mvc.Navigation("webapppage");
    nav.navigate();
  },
  checkGoBack:function(){

    if(this.view.SideDrawerWC.flxClosePopupVisible){
      this.view.SideDrawerWC.flxClosePopupVisible=false;
      //this.view.SideDrawer.scrollSideDrawerContainer.enableScrolling=true;
    }else if(this.view.flxMainPopup.isVisible){
      this.view.flxMainPopup.isVisible=false;
    }else{
      //var navObj = new kony.mvc.Navigation(this.getPreviousForm());
      //navObj.navigate();

      var ntf;
      var prevForm = gblFormBack.pop();
      kony.print("jani >>> mycontent page gblFormBack :" +gblFormBack);
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
    animate( controllerReference.view.flexSideDrawer, { "left": "0%" } );
  },
  closeSideDrawer: function() {
    animateSideDrawer( controllerReference.view.flexSideDrawer, { "left": "-100%" } );

  },
  onClickCloseOverlay:function(){
    kony.print("cancel clicked");
    callTealiumOnClick("click_action", "Cancel_Download",pageComponents,gblVisitor_imcID);
    if(undefined == controllerReference.view.segHomePageContent.selectedIndex[1] || null == controllerReference.view.segHomePageContent.selectedIndex[1]){
      kony.print("cancelDownload no selected index so returning");
      return;
    }
    var selectedIndex = controllerReference.view.segHomePageContent.selectedIndex[1];
    var contentObj = controllerReference.view.segHomePageContent.selectedItems;
    kony.print("selecte item is :: " + JSON.stringify(contentObj));
    var contentObject =  contentObj[0];
    controllerReference.cancelDownload(contentObject,selectedIndex);
  },

  toggleVisibility1:function(){
    this.view.flxDonwloadedContentLine.centerX = "-50%";
    this.view.flxBookmarkedContentLine.centerX = "-50%";
    this.view.flxAllContentLine.centerX = "50%";
  },

  toggleVisibility2:function(){
    this.view.flxBookmarkedContentLine.isVisible = false;
    this.view.flxAllContentLine.isVisible = false;
    this.view.flxDonwloadedContentLine.isVisible = true;

  },

  toggleVisibility3:function(){
    this.view.flxAllContentLine.isVisible = false;
    this.view.flxDonwloadedContentLine.isVisible = false;
    this.view.flxBookmarkedContentLine.isVisible = true;

  },

  getMyContentListAllContent:function(){

    //this.view.flxAllContentLine.isVisible=true;
    try{
      callTealiumOnClick("click_action", "ALL_CONTENT",pageComponents,gblVisitor_imcID);
    }catch(ex){
      kony.print("jani >>> All content Exception "+ex);
    }

    if(this.view.flxAllContentLine.centerX!=="50%" ){
      if(!gblFirstTimeLoad){
        kony.print("NSR not first time load")
        animate2(this.view.filterContentV2,{"left":"100%"},{"left":"0%"});
      }else{
        kony.print("NSR first time load")
        gblFirstTimeLoad = false;
        this.view.filterContentV2.left = "0%"
      }
      var offlineContentList = [];
      this.view.segHomePageContent.removeAll();
      this.view.lblAllContent.skin="activeFilterText";
      this.view.flxAllContent.skin="sknRedUL";
      this.view.lblDownloaded.skin="activeFilterText";
      this.view.flxDownloadedContent.skin="sknWhiteUL";
      this.view.lblBookmarked.skin="activeFilterText";
      this.view.flxBookmarkedContent.skin="sknWhiteUL";
      //this.view.flxAllContentLine.isVisible = true;
      this.view.flxAllContentLine.centerX="50%";
      if(currentTab==1){
        animate2(this.view.flxDonwloadedContentLine,{"centerX":"50%"},{"centerX":"-50%"},0.2); 
      }
      if(currentTab==2){
        animate2(this.view.flxBookmarkedContentLine,{"centerX":"50%"},{"centerX":"-50%"},0.2); 
      }
      animate2(this.view.flxAllContentLine,{"centerX":"150%"},{"centerX":"50%"},0.4); 
      currentTab=0;

      kony.print("Sreeni >> fetching all the offline content");
      try{
        var offlineContent = retrieveJson("offlineContent");
        var content;
        for (var key in offlineContent) {
          content = offlineContent[key];
          if(isNetworkAvailable()){
            if(content["isBookmarked"] || content["isDownloaded"] || ( !isBlankOrNull(content["otherLanguageDownload"]) && content["otherLanguageDownload"] )   ){
              offlineContentList.push(content);
            }
          }else{
            if(content["isDownloaded"] || (!isBlankOrNull(content["otherLanguageDownload"]) && content["otherLanguageDownload"])  ){
              if(content["isBookmarked"] || content["isDownloaded"]  || (!isBlankOrNull(content["otherLanguageDownload"]) && content["otherLanguageDownload"])){
                offlineContentList.push(content);
              }
            }
          }
        }
      }catch(e){}
      try{
        var offlineContent = retrieveJson("offlineContent");
        if(!isBlankOrNull(offlineContent)){
          kony.print("offlineContent: " +JSON.stringify(offlineContent));
          for (var key in offlineContent) {
            if (offlineContent.hasOwnProperty(key)) {
              // kony.print("Offline content key::"+key + " -> " + offlineContent[key]);
              for(var i=0;i<offlineContentList.length;i++){
                if(key == offlineContentList[i]["UID"]){
                  kony.print("SR@ Offline content key::"+key + " -> " + JSON.stringify( offlineContent[key]));
                  offlineContentList[i]["isBookmarked"] = offlineContent[key]["isBookmarked"];
                  offlineContentList[i]["isDownloaded"] = offlineContent[key]["isDownloaded"];
                  if(offlineContentList[i]["isBookmarked"]){
                    offlineContentList[i].btnBookmark.skin = "sknBookmarkActive";
                  }else{
                    offlineContentList[i].btnBookmark.skin = "sknBookmark";
                  }
                  offlineContentList[i]["isPaused"] = offlineContent[key]["isPaused"];
                  offlineContentList[i]["PausedPercent"] = offlineContent[key]["PausedPercent"];
                  offlineContentList[i]["isDownloading"] = offlineContent[key]["isDownloading"];
                  offlineContentList[i]["url"] = offlineContent[key]["url"];
                  if(offlineContentList[i]["isDownloading"]){
                    offlineContentList[i].flxDownloadOverlay = {isVisible:true, onClick : function(){}}; 
                    offlineContentList[i].btnPauseDownload = {isVisible:true,onClick:this.pauseDownload};
                    offlineContentList[i].loaderActive = {isVisible:true,src:"wheel1.gif"};
                    offlineContentList[i].btnPlayDownload = {onClick:this.playDownload,isVisible:false};
                    offlineContentList[i].closeOverlay = {isVisible:true, onClick:this.onClickCloseOverlay};
                    offlineContentList[i].loaderInactive = {src:"wheel.png",isVisible:false};
                    offlineContentList[i].btnDownload.skin = "sknBtnDownload";
                    offlineContentList[i].isDownloaded = false ;
                    offlineContentList[i].isPaused = false ;
                    offlineContentList[i].isDownloading = true ;
                    offlineContentList[i].PausedPercent = "";
                  }else if(offlineContentList[i]["isPaused"]){
                    offlineContentList[i].btnPauseDownload = {onClick:this.pauseDownload,isVisible:false};
                    offlineContentList[i].loaderActive = {src:"wheel1.gif",isVisible:false};
                    offlineContentList[i].btnPlayDownload = {isVisible:true,onClick:this.playDownload};
                    offlineContentList[i].closeOverlay = {isVisible:true, onClick:this.onClickCloseOverlay};
                    offlineContentList[i].loaderInactive = {isVisible:true,src:"wheel.png"};
                    offlineContentList[i].flxDownloadOverlay = {isVisible:true, onClick : function(){}};
                    offlineContentList[i].btnDownload.skin = "sknBtnDownload";
                    offlineContentList[i].isDownloaded = false ;
                    offlineContentList[i].isPaused = true ;
                    offlineContentList[i].isDownloading = false ;
                    offlineContentList[i].PausedPercent =offlineContent[key]["PausedPercent"];
                  }else if(offlineContentList[i]["isDownloaded"]){
                    offlineContentList[i].btnPauseDownload = {isVisible:true,onClick:this.pauseDownload};
                    offlineContentList[i].loaderActive = {isVisible:true,src:"wheel1.gif"};
                    offlineContentList[i].btnPlayDownload = {onClick:this.playDownload,isVisible:false};
                    offlineContentList[i].closeOverlay = {isVisible:true, onClick:this.onClickCloseOverlay};
                    offlineContentList[i].loaderInactive = {src:"wheel.png",isVisible:false};
                    offlineContentList[i].btnDownload.skin = "sknBtnDownloadActive";
                    offlineContentList[i].isDownloaded = true ;
                    offlineContentList[i].isPaused = false ;
                    offlineContentList[i].isDownloading = false ;
                    offlineContentList[i].PausedPercent = "";
                    offlineContentList[i].flxDownloadOverlay = {isVisible:false, onClick : function(){}}; 
                  }else if(( !isBlankOrNull(offlineContentList[i]["otherLanguageDownload"]) && offlineContentList[i]["otherLanguageDownload"] )){
                    kony.print("Other language content downloaded");
                    if(isBlankOrNull(offlineContentList[i].url) ){
                      kony.print("Sreeni just bookmarked and url is null");
                      offlineContentList[i].btnDownload.skin = "sknBtnDownloadDisable";
                    }else{
                      offlineContentList[i].btnDownload.skin = "sknBtnDownload";
                    }
                    //TODO view should be updated
                    //                     offlineContentList[i].btnPauseDownload = {isVisible:true,onClick:this.pauseDownload};
                    //                     offlineContentList[i].loaderActive = {isVisible:true,src:"wheel1.gif"};
                    //                     offlineContentList[i].btnPlayDownload = {onClick:this.playDownload,isVisible:false};
                    //                     offlineContentList[i].closeOverlay = {isVisible:true, onClick:this.onClickCloseOverlay};
                    //                     offlineContentList[i].loaderInactive = {src:"wheel.png",isVisible:false};
                    //                     offlineContentList[i].btnDownload.skin = "sknBtnDownloadActive";
                    //                     offlineContentList[i].isDownloaded = true ;
                    //                     offlineContentList[i].isPaused = false ;
                    //                     offlineContentList[i].isDownloading = false ;
                    //                     offlineContentList[i].PausedPercent = "";
                    //                     offlineContentList[i].flxDownloadOverlay = {isVisible:false, onClick : function(){}}; 
                  }else{
                    kony.print("Sreeni just bookmarked");
                    offlineContentList[i].btnPauseDownload = {isVisible:true,onClick:this.pauseDownload};
                    offlineContentList[i].loaderActive = {isVisible:true,src:"wheel1.gif"};
                    offlineContentList[i].btnPlayDownload = {onClick:this.playDownload,isVisible:false};
                    offlineContentList[i].closeOverlay = {isVisible:true, onClick:this.onClickCloseOverlay};
                    offlineContentList[i].loaderInactive = {src:"wheel.png",isVisible:false};
                    if(isBlankOrNull(offlineContentList[i].url) ){
                      kony.print("Sreeni just bookmarked and url is null");
                      offlineContentList[i].btnDownload.skin = "sknBtnDownloadDisable";
                    }else{
                      offlineContentList[i].btnDownload.skin = "sknBtnDownload";
                    }
                    offlineContentList[i].isDownloaded = false ;
                    offlineContentList[i].isPaused = false ;
                    offlineContentList[i].isDownloading = false ;
                    offlineContentList[i].PausedPercent = "";
                    offlineContentList[i].flxDownloadOverlay = {isVisible:false, onClick : function(){}}; 
                  }
                  break;
                }
              }
            }
          } 
        } 

      }catch(e){}
      if(isBlankOrNull(offlineContentList)){
        this.view.flxDownloadOrBookmarkOffline.isVisible = true;
        this.view.flxDownloadOffline.isVisible = false;
        this.view.flxBookmarkedOffline.isVisible = false;
        return;
      }else{
        this.view.flxDownloadOrBookmarkOffline.isVisible = false;
        this.view.flxDownloadOffline.isVisible = false;
        this.view.flxBookmarkedOffline.isVisible = false;
      }try{
        var offlineImageContent =retrieveJsonForImages("offlineImageContent");
        var base64_ = null;
        for(var i=0;i<offlineContentList.length;i++){
          if(!isNetworkAvailable() && isIOS()){
            var fileName = offlineContentList[i].fileName;
            if(!isBlankOrNull(offlineImageContent)){
              base64_ = offlineImageContent[fileName];
              if(!isBlankOrNull(base64_))
              {
                offlineContentList[i].imgContent = {base64 :base64_};
              }
            }
          }
          offlineContentList[i].btnShare.onClick = controllerReference.onClickOfShareButton;
          offlineContentList[i].btnDownload.onClick = controllerReference.onClickOfDownloadButton;
          offlineContentList[i].btnBookmark.onClick = controllerReference.onClickOfBookmarkButton;
          offlineContentList[i].closeOverlay = {isVisible:true, onClick:controllerReference.onClickCloseOverlay};

        }
        sortedContentList = kony.table.sort(offlineContentList, "updatedDate",comparisionFunction);
        kony.print("sortedAllContent :"+JSON.stringify(sortedContentList));

        this.view.segHomePageContent.setData(sortedContentList);
        swipedContent=0;
      }catch(e){
        kony.print("ABCABC Exception in Mycontent " +e);
      }

    }
  },
  getMyContentListDownloaded:function(){
    callTealiumOnClick("click_action", "DOWNLOADED",pageComponents,gblVisitor_imcID);

    //alert(this.view.flxDonwloadedContentLine.centerX);
    if(this.view.flxDonwloadedContentLine.centerX !=="50%"){
      if(currentTab < 1){
        animate2(this.view.filterContentV2,{"left":"-100%"},{"left":"0%"}); 
      }else if(currentTab > 1){
        animate2(this.view.filterContentV2,{"left":"100%"},{"left":"0%"}); 
      }
      var offlineContentList = [];
      this.view.segHomePageContent.removeAll();
      this.view.lblAllContent.skin="activeFilterText";
      this.view.flxAllContent.skin="sknWhiteUL";
      this.view.lblDownloaded.skin="activeFilterText";
      this.view.flxDownloadedContent.skin="sknRedUL";
      this.view.lblBookmarked.skin="activeFilterText";
      this.view.flxBookmarkedContent.skin="sknWhiteUL";

      //this.view.flxDonwloadedContentLine.isVisible = true;

      if(currentTab ==0){
        animate2(this.view.flxAllContentLine,{"centerX":"50%"},{"centerX":"150%"},0.2);
        animate2(this.view.flxDonwloadedContentLine,{"centerX":"-50%"},{"centerX":"50%"},0.4); 
      }else if(currentTab == 2){
        animate2(this.view.flxBookmarkedContentLine,{"centerX":"50%"},{"centerX":"-50%"},0.2);
        animate2(this.view.flxDonwloadedContentLine,{"centerX":"150%"},{"centerX":"50%"},0.4); 
      }
      currentTab=1;

      kony.print("Sreeni >> fetching download only offline content");
      try{
        var offlineContent = retrieveJson("offlineContent");
        var content;
        for (var key in offlineContent) { 
          content = offlineContent[key];
          if(content["isDownloaded"] || ( !isBlankOrNull(content["otherLanguageDownload"]) && content["otherLanguageDownload"] )  ){
            offlineContentList.push(content);
          }
        }
      }catch(e){}
      try{
        var offlineContent = retrieveJson("offlineContent");
        if(!isBlankOrNull(offlineContent)){
          kony.print("offlineContent: " +JSON.stringify(offlineContent));
          for (var key in offlineContent) {
            if (offlineContent.hasOwnProperty(key)) {
              // kony.print("Offline content key::"+key + " -> " + offlineContent[key]);
              for(var i=0;i<offlineContentList.length;i++){
                if(key == offlineContentList[i]["UID"]){
                  kony.print("SR@ Offline content key::"+key + " -> " + JSON.stringify( offlineContent[key]));
                  offlineContentList[i]["isBookmarked"] = offlineContent[key]["isBookmarked"];
                  offlineContentList[i]["isDownloaded"] = offlineContent[key]["isDownloaded"];
                  if(offlineContentList[i]["isBookmarked"]){
                    offlineContentList[i].btnBookmark.skin = "sknBookmarkActive";
                  }else{
                    offlineContentList[i].btnBookmark.skin = "sknBookmark";
                  }
                  offlineContentList[i]["isPaused"] = offlineContent[key]["isPaused"];
                  offlineContentList[i]["PausedPercent"] = offlineContent[key]["PausedPercent"];
                  offlineContentList[i]["isDownloading"] = offlineContent[key]["isDownloading"];
                  offlineContentList[i]["url"] = offlineContent[key]["url"];
                  if(offlineContentList[i]["isDownloading"]){
                    offlineContentList[i].flxDownloadOverlay = {isVisible:true, onClick : function(){}}; 
                    offlineContentList[i].btnPauseDownload = {isVisible:true,onClick:this.pauseDownload};
                    offlineContentList[i].loaderActive = {isVisible:true,src:"wheel1.gif"};
                    offlineContentList[i].btnPlayDownload = {onClick:this.playDownload,isVisible:false};
                    offlineContentList[i].closeOverlay = {isVisible:true, onClick:this.onClickCloseOverlay};
                    offlineContentList[i].loaderInactive = {src:"wheel.png",isVisible:false};
                    offlineContentList[i].btnDownload.skin = "sknBtnDownload";
                    offlineContentList[i].isDownloaded = false ;
                    offlineContentList[i].isPaused = false ;
                    offlineContentList[i].isDownloading = true ;
                    offlineContentList[i].PausedPercent = "";
                  }else if(offlineContentList[i]["isPaused"]){
                    offlineContentList[i].btnPauseDownload = {onClick:this.pauseDownload,isVisible:false};
                    offlineContentList[i].loaderActive = {src:"wheel1.gif",isVisible:false};
                    offlineContentList[i].btnPlayDownload = {isVisible:true,onClick:this.playDownload};
                    offlineContentList[i].closeOverlay = {isVisible:true, onClick:this.onClickCloseOverlay};
                    offlineContentList[i].loaderInactive = {isVisible:true,src:"wheel.png"};
                    offlineContentList[i].flxDownloadOverlay = {isVisible:true, onClick : function(){}};
                    offlineContentList[i].btnDownload.skin = "sknBtnDownload";
                    offlineContentList[i].isDownloaded = false ;
                    offlineContentList[i].isPaused = true ;
                    offlineContentList[i].isDownloading = false ;
                    offlineContentList[i].PausedPercent =offlineContent[key]["PausedPercent"];
                  }else if(offlineContentList[i]["isDownloaded"]){
                    offlineContentList[i].btnPauseDownload = {isVisible:true,onClick:this.pauseDownload};
                    offlineContentList[i].loaderActive = {isVisible:true,src:"wheel1.gif"};
                    offlineContentList[i].btnPlayDownload = {onClick:this.playDownload,isVisible:false};
                    offlineContentList[i].closeOverlay = {isVisible:true, onClick:this.onClickCloseOverlay};
                    offlineContentList[i].loaderInactive = {src:"wheel.png",isVisible:false};
                    offlineContentList[i].btnDownload.skin = "sknBtnDownloadActive";
                    offlineContentList[i].isDownloaded = true ;
                    offlineContentList[i].isPaused = false ;
                    offlineContentList[i].isDownloading = false ;
                    offlineContentList[i].PausedPercent = "";
                    offlineContentList[i].flxDownloadOverlay = {isVisible:false, onClick : function(){}}; 
                  }else if( ( !isBlankOrNull(offlineContentList[i]["otherLanguageDownload"]) && offlineContentList[i]["otherLanguageDownload"] )){
                    kony.print("TODO update view");
                    if(isBlankOrNull(offlineContentList[i].url) ){
                      kony.print("Sreeni just bookmarked and url is null");
                      offlineContentList[i].btnDownload.skin = "sknBtnDownloadDisable";
                    }else{
                      offlineContentList[i].btnDownload.skin = "sknBtnDownload";
                    }
                  }else{
                    kony.print("Sreeni just bookmarked");
                    offlineContentList[i].btnPauseDownload = {isVisible:true,onClick:this.pauseDownload};
                    offlineContentList[i].loaderActive = {isVisible:true,src:"wheel1.gif"};
                    offlineContentList[i].btnPlayDownload = {onClick:this.playDownload,isVisible:false};
                    offlineContentList[i].closeOverlay = {isVisible:true, onClick:this.onClickCloseOverlay};
                    offlineContentList[i].loaderInactive = {src:"wheel.png",isVisible:false};
                    if(isBlankOrNull(offlineContentList[i].url) ){
                      kony.print("Sreeni just bookmarked and url is null");
                      offlineContentList[i].btnDownload.skin = "sknBtnDownloadDisable";
                    }else{
                      offlineContentList[i].btnDownload.skin = "sknBtnDownload";
                    }
                    // offlineContentList[i].btnDownload.skin = "sknBtnDownload";
                    offlineContentList[i].isDownloaded = false ;
                    offlineContentList[i].isPaused = false ;
                    offlineContentList[i].isDownloading = false ;
                    offlineContentList[i].PausedPercent = "";
                    offlineContentList[i].flxDownloadOverlay = {isVisible:false, onClick : function(){}}; 
                  }
                  break;
                }
              }
            }
          } 
        } 

      }catch(e){}
      if(isBlankOrNull(offlineContentList)){
        this.view.flxDownloadOffline.isVisible = true;
        this.view.flxBookmarkedOffline.isVisible = false;
        this.view.flxDownloadOrBookmarkOffline.isVisible = false;
        return;
      }
      else{
        this.view.flxDownloadOffline.isVisible = false;
        this.view.flxBookmarkedOffline.isVisible = false;
        this.view.flxDownloadOrBookmarkOffline.isVisible = false;
      }
      var offlineImageContent = retrieveJsonForImages("offlineImageContent");
      var base64_ = null;
      for(var i=0;i<offlineContentList.length;i++){
        if(!isNetworkAvailable() && isIOS()){
          var fileName = offlineContentList[i].fileName;
          if(!isBlankOrNull(offlineImageContent)){
            base64_ = offlineImageContent[fileName];
            if(!isBlankOrNull(base64_))
            {
              offlineContentList[i].imgContent = {base64 :base64_};
            }
          }
        }
        offlineContentList[i].btnShare.onClick = controllerReference.onClickOfShareButton;
        offlineContentList[i].btnDownload.onClick = controllerReference.onClickOfDownloadButton;
        offlineContentList[i].btnBookmark.onClick = controllerReference.onClickOfBookmarkButton;
      }
      var sortedDownloadedContent = kony.table.sort(offlineContentList, "updatedDate",comparisionFunction);
      kony.print("sortedDownloadedContent :"+JSON.stringify(sortedDownloadedContent));
      //  animate(this.view.filterContentV2,{"left":"-100%"});

      this.view.segHomePageContent.setData(sortedDownloadedContent);
      swipedContent=0;
    }

  },
  getMyContentListBookmarked:function(){
    callTealiumOnClick("click_action", "BOOKMARKED",pageComponents,gblVisitor_imcID);

    if(this.view.flxBookmarkedContentLine.centerX!=="50%"){

      animate2(this.view.filterContentV2,{"left":"-100%"},{"left":"0%"}); 
      var offlineContentList = [];
      this.view.segHomePageContent.removeAll();
      this.view.lblAllContent.skin="activeFilterText";
      this.view.flxAllContent.skin="sknWhiteUL";
      this.view.lblDownloaded.skin="activeFilterText";
      this.view.flxDownloadedContent.skin="sknWhiteUL";
      this.view.lblBookmarked.skin="activeFilterText";
      this.view.flxBookmarkedContent.skin="sknRedUL";
      //this.view.flxBookmarkedContentLine.isVisible = true;

      if(currentTab==0){
        animate2(this.view.flxAllContentLine,{"centerX":"50%"},{"centerX":"150%"},0.2); 
      }

      if(currentTab==1){
        animate2(this.view.flxDonwloadedContentLine,{"centerX":"50%"},{"centerX":"150%"},0.2); 
      }

      animate2(this.view.flxBookmarkedContentLine,{"centerX":"-50%"},{"centerX":"50%"},0.4); 


      currentTab=2;
      kony.print("Sreeni >> fetching bookmark only offline content");
      try{
        var offlineContent = retrieveJson("offlineContent");
        for (var key in offlineContent) { 

          if(isNetworkAvailable()){
            if(offlineContent[key]["isBookmarked"]  ){
              offlineContentList.push(offlineContent[key]);
            }
          }else{ 
            var expr =  !isBlankOrNull(offlineContent[key]["otherLanguageDownload"]) && offlineContent[key]["otherLanguageDownload"];
            if(offlineContent[key]["isDownloaded"] || expr ){
              if(offlineContent[key]["isBookmarked"]  ){
                offlineContentList.push(offlineContent[key]);
              }           
            }            
          }
        }
      }catch(e){}

      try{
        var offlineContent = retrieveJson("offlineContent");
        if(!isBlankOrNull(offlineContent)){
          kony.print("offlineContent: " +JSON.stringify(offlineContent));
          for (var key in offlineContent) {
            if (offlineContent.hasOwnProperty(key)) {
              // kony.print("Offline content key::"+key + " -> " + offlineContent[key]);
              for(var i=0;i<offlineContentList.length;i++){
                if(key == offlineContentList[i]["UID"]){
                  kony.print("SR@ Offline content key::"+key + " -> " + JSON.stringify( offlineContent[key]));
                  offlineContentList[i]["isBookmarked"] = offlineContent[key]["isBookmarked"];
                  offlineContentList[i]["isDownloaded"] = offlineContent[key]["isDownloaded"];
                  if(offlineContentList[i]["isBookmarked"]){
                    offlineContentList[i].btnBookmark.skin = "sknBookmarkActive";
                  }else{
                    offlineContentList[i].btnBookmark.skin = "sknBookmark";
                  }
                  offlineContentList[i]["isPaused"] = offlineContent[key]["isPaused"];
                  offlineContentList[i]["PausedPercent"] = offlineContent[key]["PausedPercent"];
                  offlineContentList[i]["isDownloading"] = offlineContent[key]["isDownloading"];
                  offlineContentList[i]["url"] = offlineContent[key]["url"];
                  if(offlineContentList[i]["isDownloading"]){
                    offlineContentList[i].flxDownloadOverlay = {isVisible:true, onClick : function(){}}; 
                    offlineContentList[i].btnPauseDownload = {isVisible:true,onClick:this.pauseDownload};
                    offlineContentList[i].loaderActive = {isVisible:true,src:"wheel1.gif"};
                    offlineContentList[i].btnPlayDownload = {onClick:this.playDownload,isVisible:false};
                    offlineContentList[i].closeOverlay = {isVisible:true, onClick:this.onClickCloseOverlay};
                    offlineContentList[i].loaderInactive = {src:"wheel.png",isVisible:false};
                    offlineContentList[i].btnDownload.skin = "sknBtnDownload";
                    offlineContentList[i].isDownloaded = false ;
                    offlineContentList[i].isPaused = false ;
                    offlineContentList[i].isDownloading = true ;
                    offlineContentList[i].PausedPercent = "";
                  }else if(offlineContentList[i]["isPaused"]){
                    offlineContentList[i].btnPauseDownload = {onClick:this.pauseDownload,isVisible:false};
                    offlineContentList[i].loaderActive = {src:"wheel1.gif",isVisible:false};
                    offlineContentList[i].btnPlayDownload = {isVisible:true,onClick:this.playDownload};
                    offlineContentList[i].closeOverlay = {isVisible:true, onClick:this.onClickCloseOverlay};
                    offlineContentList[i].loaderInactive = {isVisible:true,src:"wheel.png"};
                    offlineContentList[i].flxDownloadOverlay = {isVisible:true, onClick : function(){}};
                    offlineContentList[i].btnDownload.skin = "sknBtnDownload";
                    offlineContentList[i].isDownloaded = false ;
                    offlineContentList[i].isPaused = true ;
                    offlineContentList[i].isDownloading = false ;
                    offlineContentList[i].PausedPercent =offlineContent[key]["PausedPercent"];
                  }else if(offlineContentList[i]["isDownloaded"]){
                    offlineContentList[i].btnPauseDownload = {isVisible:true,onClick:this.pauseDownload};
                    offlineContentList[i].loaderActive = {isVisible:true,src:"wheel1.gif"};
                    offlineContentList[i].btnPlayDownload = {onClick:this.playDownload,isVisible:false};
                    offlineContentList[i].closeOverlay = {isVisible:true, onClick:this.onClickCloseOverlay};
                    offlineContentList[i].loaderInactive = {src:"wheel.png",isVisible:false};
                    offlineContentList[i].btnDownload.skin = "sknBtnDownloadActive";
                    offlineContentList[i].isDownloaded = true ;
                    offlineContentList[i].isPaused = false ;
                    offlineContentList[i].isDownloading = false ;
                    offlineContentList[i].PausedPercent = "";
                    offlineContentList[i].flxDownloadOverlay = {isVisible:false, onClick : function(){}}; 
                  }else if(( !isBlankOrNull(offlineContentList[i]["otherLanguageDownload"]) && offlineContentList[i]["otherLanguageDownload"] )){
                    kony.print("Other language content downloaded");
                    if(isBlankOrNull(offlineContentList[i].url) ){
                      kony.print("Sreeni just bookmarked and url is null");
                      offlineContentList[i].btnDownload.skin = "sknBtnDownloadDisable";
                    }else{
                      offlineContentList[i].btnDownload.skin = "sknBtnDownload";
                    }
                  }else{
                    kony.print("Sreeni just bookmarked");
                    offlineContentList[i].btnPauseDownload = {isVisible:true,onClick:this.pauseDownload};
                    offlineContentList[i].loaderActive = {isVisible:true,src:"wheel1.gif"};
                    offlineContentList[i].btnPlayDownload = {onClick:this.playDownload,isVisible:false};
                    offlineContentList[i].closeOverlay = {isVisible:true, onClick:this.onClickCloseOverlay};
                    offlineContentList[i].loaderInactive = {src:"wheel.png",isVisible:false};
                    if(isBlankOrNull(offlineContentList[i].url) ){
                      kony.print("Sreeni just bookmarked and url is null");
                      offlineContentList[i].btnDownload.skin = "sknBtnDownloadDisable";
                    }else{
                      offlineContentList[i].btnDownload.skin = "sknBtnDownload";
                    }
                    offlineContentList[i].isDownloaded = false ;
                    offlineContentList[i].isPaused = false ;
                    offlineContentList[i].isDownloading = false ;
                    offlineContentList[i].PausedPercent = "";
                    offlineContentList[i].flxDownloadOverlay = {isVisible:false, onClick : function(){}}; 
                  }
                  break;
                }
              }
            }
          } 
        } 

      }catch(e){}
      if(isBlankOrNull(offlineContentList)){
        this.view.flxDownloadOrBookmarkOffline.isVisible = false;
        this.view.flxDownloadOffline.isVisible = false;
        this.view.flxBookmarkedOffline.isVisible = true;
        return;
      }else{
        this.view.flxDownloadOrBookmarkOffline.isVisible = false;
        this.view.flxDownloadOffline.isVisible = false;
        this.view.flxBookmarkedOffline.isVisible = false;
      }
      var offlineImageContent = retrieveJsonForImages("offlineImageContent");
      var base64_ = null;
      for(var i=0;i<offlineContentList.length;i++){
        if(!isNetworkAvailable() && isIOS()){
          var fileName = offlineContentList[i].fileName;
          if(!isBlankOrNull(offlineImageContent)){
            base64_ = offlineImageContent[fileName];
            if(!isBlankOrNull(base64_))
            {
              offlineContentList[i].imgContent = {base64 :base64_};
            }
          }
        }
        offlineContentList[i].btnShare.onClick = controllerReference.onClickOfShareButton;
        offlineContentList[i].btnDownload.onClick = controllerReference.onClickOfDownloadButton;
        offlineContentList[i].btnBookmark.onClick = controllerReference.onClickOfBookmarkButton;
      }
      sortedBookmarkedContent = kony.table.sort(offlineContentList, "updatedDate",comparisionFunction);
      kony.print("sortedBookmarkedContent :"+JSON.stringify(sortedBookmarkedContent));
      //  animate(this.view.filterContentV2,{"left":"-100%"});
      this.view.segHomePageContent.setData(sortedBookmarkedContent);

      swipedContent=0;
    }

  },


  trackEventAnalytics : function(contentType,contentId,click_detail){
    var dataOnclickArray = {
      "app_type": getDevicePlatform() , //ios or android sent by OS of the device
      "app_country": "in",
      "app_language": getDeviceLanguage(),
      "app_digitalProperty": "Amway Business app",
      "app_region": "eia",
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
  onClickOfDownloadButton: function() {
    try{

      kony.print("Sreeni >> on click of download button");
      var selectedIndex = controllerReference.view.segHomePageContent.selectedIndex[1];
      var contentObj = controllerReference.view.segHomePageContent.selectedItems;
      if(isBlankOrNull( contentObj[0].url )){
        kony.print("selected item url is null:: " );
        return;
      }
      var contentObject = contentObj[0];
      kony.print("selected item is :: " + JSON.stringify(contentObj));
      var contentId = contentObject.FullTitle;
      var contentType = contentObject.contentType;
      var click_detail = "Download";
      this.downloadTrackEventAnalytics("click_action", "Download", contentId,contentType,["btnDownload"]);
      var contentDownloadable = contentObject.isDownload;
      kony.print("contentDownloadable :: " + contentDownloadable+"");
      if(contentDownloadable == "true"){
        var contentDownloaded = contentObject.isDownloaded;
        kony.print("contentDownloaded :: " + contentDownloaded+"");
        if(contentDownloaded){
          controllerReference.deleteContent(contentObject,selectedIndex);
        }

        else if(contentObject.isDownloading){
          kony.print("content already downloading!!")
          return;
        }
        else if(contentObject.isPaused){
          kony.print("content already paused!!")
          return;
        }
        else{
          //Show loading and start downloading after finished do the below
          //store file path and
          if (!isNetworkAvailable()) {
            controllerReference.view.flxToast.isVisible = true;
            try{
              kony.timer.cancel("timerid");
            }catch(e){

            }

            kony.timer.schedule("timerid", controllerReference.disableFlex.bind(this), 6, false);
            return;
          } else {
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
                controllerReference.infoPopupOn(getI18Value("ContentUrlMissed"));
                contentObject.flxDownloadOverlay = { onClick : function(){},isVisible:false}
                contentObject.btnDownload = {skin:"sknBtnDownload", onClick: this.onClickOfDownloadButton};
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
          controllerReference.view.segHomePageContent.setDataAt(contentObject, selectedIndex);
        }
      }
    }catch(e){
      kony.print("Exception in onClickOfDownloadButton"+e);
    }
  },
  startDownload: function(content,index) {
    try{
      kony.print("sreeni URL in start download::"+content);
      if(isBlankOrNull(content.url) || isBlankOrNull(content.UID)){
        kony.print("Either  URL is null or UID is null ")
        return;
      }

      var url = content.url;
      if (url.indexOf("https://players.brightcove.net") != -1) {
        gblData = content;
        gblIndex = index;
        kony.print("Sreeni url is from brightcove ");
        this.getBrightCoveVideoData(content);
        return;
      }
      //Download content image for offline purpose
      //if(isIOS())
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
          // obj.startDownloadUsingDM(content.url, id); //FFI call only for Video

          obj.startDownload(content.url, id); //FFI call
        } else {
          obj.startDownload(content.url, id); //FFI call
        }
        //obj.startDownload(url, id); //FFI call
      }
    }catch(e){
      kony.print("Exception in startdownload::"+e)
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
        content.flxDownloadOverlay = {isVisible:true, onClick : function(){}};
        content.btnPauseDownload = {isVisible:true,onClick:this.pauseDownload}
        content.loaderActive = {isVisible:true,src:"wheel1.gif"};
        content.btnPlayDownload = {onClick:this.playDownload,isVisible:false};
        content.loaderInactive = {src:"wheel.png",isVisible:false};
        content.closeOverlay = {isVisible:true, onClick:this.onClickCloseOverlay};
      }else if(DOWNLOAD_STATUS == 2){ //When paused
        kony.print("In object paused");
        content.flxDownloadOverlay = {isVisible:true, onClick : function(){}};
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
        content.flxDownloadOverlay = {onClick : function(){},isVisible:false};
        content.closeOverlay = {isVisible:true, onClick:this.onClickCloseOverlay};
      }
      kony.print("Data before setting to segment:"+JSON.stringify(content));
      controllerReference.view.segHomePageContent.setDataAt(content, index);
      controllerReference.setOfflineData(content);
    }catch(e){
      kony.print("Exception in setoverlay"+e);
    }
  },
  setOfflineData:function(content){
    try{
      var offlineContent = retrieveJsonAllLanguages("offlineContent");
      if(isBlankOrNull(offlineContent))offlineContent = {}
      var expr =  !isBlankOrNull(content["otherLanguageDownload"]) && content["otherLanguageDownload"];
      kony.print("NSR@@ other language download "+expr);
      if(content.isDownloaded || content.isBookmarked || content.isDownloading || content.isPaused || expr ){
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
        kony.print("Ïnside if condition");
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
  onClickOfShareButton: function() {
    try {
      var selectedIndex = controllerReference.view.segHomePageContent.selectedIndex[1];
      var contentObj = controllerReference.view.segHomePageContent.selectedItems;
      if(isBlankOrNull( contentObj[0].url )){
        kony.print("selected item url is null:: " );
        return;
      }
      kony.print("selected item is :: " + JSON.stringify(contentObj));
      var contentType = contentObj[0].contentType;
      var contentId = contentObj[0].FullTitle;
      var click_detail = "Share";
      var dataOnclickArray = {
        "app_type": getDevicePlatform() , //ios or android sent by OS of the device
        "app_country": "in",
        "app_language": getDeviceLanguage(),
        "app_digitalProperty": "Amway Business app",
        "app_region": "eia",
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
      //this.trackEventAnalytics(contentType, contentId, click_detail);
      kony.print("jani >>> Share onclick contenttype and contentId "+contentType+" "+contentId);
      var contentShareable = contentObj[0].isShareable;
      kony.print("contentShareable :: " + contentShareable+"");
      //check wheher content shareable if yes , then check if it is already shared
      if (contentShareable == "true") {
        if(isIOS()){
          shareContentiOS(contentObj[0].url);
        }
        if(isAndroid()){
          shareContentAndroid(contentObj[0].url);
        }
      }else if (contentShareable == "false")
      {
        kony.print("cannot share");
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
        if(language.toLowerCase() === gblLanguage.toLowerCase()){
          var expr =  !isBlankOrNull(contentObj["otherLanguageDownload"]) && contentObj["otherLanguageDownload"];
          kony.print("NSR@@ other language download "+expr);
          if(this.view.flxBookmarkedContentLine.centerX==="50%" ){
            controllerReference.view.segHomePageContent.removeAt(selectedIndex);
            if(controllerReference.view.segHomePageContent.data.length == 0 || controllerReference.view.segHomePageContent.data.length==null){
              this.view.flxBookmarkedOffline.isVisible = true;
            }else{
              this.view.flxBookmarkedOffline.isVisible = false;
            }
          }else if( ( this.view.flxAllContentLine.centerX==="50%" && !(contentObj.isDownloaded) &&  !expr ) ){
            controllerReference.view.segHomePageContent.removeAt(selectedIndex);
            if(controllerReference.view.segHomePageContent.data.length == 0 || controllerReference.view.segHomePageContent.data.length==null){
              this.view.flxDownloadOrBookmarkOffline.isVisible = true;
            }else{
              this.view.flxDownloadOrBookmarkOffline.isVisible = false;
            }
          }
          else{
            kony.print("Entered case #3 while bookmark")
            controllerReference.view.segHomePageContent.setDataAt(contentObj, selectedIndex);
          }


        }
      }else{
        contentObj.isBookmarked = true;
        contentObj.btnBookmark.skin = "sknBookmarkActive";
        if(language.toLowerCase() == gblLanguage.toLowerCase()){
          controllerReference.view.segHomePageContent.setDataAt(contentObj, selectedIndex);
        }
      }
      contentObj.flxDownloadOverlay = {onClick : function(){},isVisible:false};

      //Updating global data for browse business
      if(language.toLowerCase() == gblLanguage.toLowerCase()){
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
        }else{
          contentObj.btnDownload.skin = "sknBtnDownload";
        }
      }
      var expr =  !isBlankOrNull(contentObj["otherLanguageDownload"]) && contentObj["otherLanguageDownload"];
      kony.print("NSR@@ other language download "+expr);
      if(contentObj.isDownloaded || contentObj.isBookmarked ||contentObj.isDownloading || contentObj.isPaused || expr ){
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
  onClickOfBookmarkButton: function() {

    var selectedIndex = controllerReference.view.segHomePageContent.selectedIndex[1];
    var contentObj = controllerReference.view.segHomePageContent.selectedItems;	
    var contentObject = contentObj[0];
    var contentType = contentObject.contentType;
    var contentId = contentObject.FullTitle;
    var click_detail = "Bookmark";
    this.trackEventAnalytics(contentType, contentId, click_detail);
    kony.print("jani >>> bookmark onclick contenttype and contentId "+contentType+" "+contentId);
    kony.print("selecte item is :: " + JSON.stringify(contentObject));
    var contentBookmarked = contentObject.isBookmarked;
    kony.print("isBookmarked :: " + contentBookmarked+"");
    var plainUid = getUidWithoutLang(contentObject["UID"]);
    kony.print("contentBookmarked :: " + contentBookmarked);
    var langFound = false;
    var languageUrls = contentObject.contentType === "video" ? contentObject.videoLanguageUrls : contentObject.pdfLanguageUrls;

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
        contentObject.UID = plainUid+gblLanguage;
        contentObject.url = null;
        controllerReference.bookMarkLanguageSpecificContent(contentObject, contentBookmarked,selectedIndex,gblLanguage);
      }
    }
    //All languages
    for(var z=0;z<languageUrls.length;z++){
      var contentLang = languageUrls[z].language;
      var contentLangUrl = languageUrls[z].url;
      var actualUid = plainUid+""+contentLang;
      contentObject["UID"] = actualUid;
      contentObject["url"] = contentLangUrl;
      controllerReference.bookMarkLanguageSpecificContent(contentObject, contentBookmarked,selectedIndex,contentLang);
    }
    //setting gblContentList's record skin 
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

  },
  updateProgressCallback:function(object,percentage){
    kony.print("my content update progress callback");
  },
  cancelDownload: function(content,index) {
    try{
      if(isIOS()){
        DownloadManagerObject.cancelDownloadJs(content);
      }
      if(isAndroid()){
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

      }

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
  downloadTrackEventAnalytics : function(event_name,click_detail, contentId,contentType, widgetComponents){
    var dataOnclickArray = {
      "app_type": getDevicePlatform() , //ios or android sent by OS of the device
      "app_country": "in",
      "app_language": getDeviceLanguage(),
      "app_digitalProperty": "Amway Business app",
      "app_region": "eia",
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
      this.downloadTrackEventAnalytics("click_action", "Download_pause", contentId,contentType,["btnPauseDownload"] );
      if(isIOS()){
        DownloadManagerObject.pauseDownloadJs(contentObject);
      }
      if(isAndroid()){
        kony.print("AND download pause");
        var id = contentObject["UID"];
        if(contentObject["contentType"]=="video"){
          id=id+".mp4";
        }else if(contentObject["contentType"]=="pdf"){
          id=id+".pdf";
        }
        var obj = getDprObj(id);
        obj.stopDownload();
      }
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
      if(isIOS()){
        DownloadManagerObject.resumeDownloadJs(contentObject);
      }

      if(isAndroid()){
        kony.print("AND download resume");
        var id = contentObject["UID"];
        if(contentObject["contentType"]=="video"){
          id=id+".mp4";
        }else if(contentObject["contentType"]=="pdf"){
          id=id+".pdf";
        }
        var obj = getDprObj(id);

        if (contentObject["contentType"] === "video") {
          // obj.startDownloadUsingDM(contentObject.url, id); //FFI call only for Video

          obj.startDownload(contentObject.url, id); //FFI call
        } else {
          obj.startDownload(contentObject.url, id); //FFI call
        }
      }
    }catch(e){
      kony.print("Exception in resumeDownload: "+e);
    }

  },
  finishDownloadCallBackObj:function(object,filePath){
    try{
      kony.print("finished called");
      if(!isBlankOrNull(filePath)&& filePath == "ERROR"){
        var index = null;
        for(var i=0;i<sortedContentList.length;i++){
          if(object["UID"] == sortedContentList[i]["UID"]){
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
      //update online data
      if(undefined != controllerReference.view.flxBookmarkedContentLine && controllerReference.view.flxBookmarkedContentLine.centerX==="50%" ){
        for(var i=0;i<sortedBookmarkedContent.length;i++){
          if(object["UID"] == sortedBookmarkedContent[i]["UID"]){
            index = i;
            break;
          }
        }
      }else{
        for(var i=0;i<sortedContentList.length;i++){
          if(object["UID"] == sortedContentList[i]["UID"]){
            index = i;//TODO what if two urls are same
            break;
          }
        }
      }

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
          }
        }
        offlineContent[object["UID"]] = object;
        storeJson("offlineContent", offlineContent);
      }
      if(undefined != index && null != index){
        controllerReference.view.segHomePageContent.setDataAt(object, index);
      }
    }catch(e){
      kony.print("Exception in homepage finish method:"+e);
    }

  },
  segmentRowClicked: function() {
    // if(!swipedContent){
    controllerReference.view.flxToast.setVisibility(false);
    try{
      kony.timer.cancel("timerid");	
    }catch(e){}
    kony.print("Sreeni >> Segment row clicked")
    var data = this.view.segHomePageContent.selectedRowItems[0];
    kony.print("data : " + JSON.stringify(data));

    mycontentFlag=true;
    var nav = new kony.mvc.Navigation("contentdetailpage");
    nav.navigate(data);
    //}

  },
  mycontentPagePreShow: function() {
    if(gblRetailScroll) return;
    if(kony.os.deviceInfo().name=="iPad"){
      this.view.flxMessagePage.height="45%";

    }
    kony.print("Indu preshow called");
    gblCurrentForm = "mycontentpage";
    controllerReference.view.flexSideDrawer.left = "-100%";
    // contentCount = 0;TODO pagination
    controllerReference.view.flxAllContentLine.centerX = "-50%";
    // this.view.flxDonwloadedContentLine.centerX="-50%";
    // this.view.flxBookmarkedContentLine.centerX="-50%";
    //controllerReference.view.flexSideDrawer.left = "-100"
    //this.closeSideDrawer();
    gblFirstTimeLoad = true;
    if(isAndroid())
      var currentFormName = kony.application.getCurrentForm().id;
    else
      var currentFormName = kony.application.getPreviousForm().id;

    kony.print("[Sreeni] PrePre form name is "+currentFormName);
    if( currentFormName == "contentdetailpage"){
      if(currentTab == 0) controllerReference.getMyContentListAllContent();
      else if (currentTab == 1) controllerReference.getMyContentListDownloaded();
      else controllerReference.getMyContentListBookmarked();
    }else{
      controllerReference.getMyContentListAllContent();
      controllerReference.toggleVisibility1();
    }
    this.view.SideDrawerWC.flxClosePopupVisible=false;
    //this.view.SideDrawer.scrollSideDrawerContainer.contentOffset = {x:"0",y:"0"};
    // this.view.SideDrawer.scrollSideDrawerContainer.enableScrolling=true;
    this.view.flxToast.isVisible=false;
    //[Sreeni]As per customer comments we dont need to show toast on my content as we are showing in home page
    //     if(!isNetworkAvailable()){
    //       controllerReference.view.flxToast.setVisibility(true);
    //       try{
    //         kony.timer.cancel("timerid");	
    //       }catch(e){}			
    //       kony.timer.schedule("timerid", controllerReference.disableFlex.bind(this), 5, false);
    //     }
  },
  disableFlex: function() {
    controllerReference.view.flxToast.setVisibility(false);
    try{
      kony.timer.cancel("timerid");	
    }catch(e){}
  },


  /*
  aboutPersonalCareData : function() {

    gblFilterCategory = gblPersonalCare;
    this.closeSideDrawer();
    this.navigateToHomePage(); 


  },
  aboutNutriliteData : function() {

    gblFilterCategory = gblNutrilite;
    this.closeSideDrawer();
    this.navigateToHomePage();


  },
  aboutBeautyData : function() {

    gblFilterCategory = gblBeauty;
    this.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutAtHomeData : function() {

    gblFilterCategory = gblAtHome;
    this.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutMoreProductsData : function() {

    gblFilterCategory = gblMoreProducts;
    this.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutAmwayData : function() {

    gblFilterCategory = gblAboutAmway;
    this.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutLearning : function() {

    gblFilterCategory = gblLearning;
    this.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutSeminars : function() {

    gblFilterCategory = gblSeminars;
    this.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutBrochures : function() {

    gblFilterCategory = gblBrochures;
    this.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutRecognition : function() {

    gblFilterCategory = gblRecognition;
    this.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutOppurtunity : function() {

    gblFilterCategory = gblOpportunity;
    this.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutCorporateSocial : function() {

    gblFilterCategory = gblCorporate;
    this.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutMedia : function() {

    gblFilterCategory = gblMedia;
    this.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutManufacturing : function() {

    gblFilterCategory = gblManufacturing;
    this.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutAwards : function() {

    gblFilterCategory = gblAwards;
    this.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutFacts : function() {

    gblFilterCategory = gblFactSheets;
    this.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutHeritage : function() {

    gblFilterCategory = gblheritage;
    this.closeSideDrawer();
    this.navigateToHomePage();

  },*/

  onNavigate: function() {

    kony.print("inside onNavigate homepage");

    this._init();
  },
  navigateToHomePage : function() {
    kony.print("Navigating to home page from form controller 2");

    var navObj = new kony.mvc.Navigation("homepage");
    navObj.navigate();
  },

  /*
  animateSideDrawer : function(element, params, duration) {
    kony.print("Animation started")
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
  showDownloadStatus : function(id, percentage, mode) {

    if("INPROGRESS" == mode){
      kony.print("INPROGRESS mode");
    } else if("ONCOMPLETE" == mode){
      kony.print("ONCOMPLETE mode");
      var contentObject = null;
      var offlineData = retrieveJsonAllLanguages("offlineContent");
      if(!isBlankOrNull(offlineData) && !isBlankOrNull(offlineData[id])){
        kony.print("Sreeni content found in offline");
        contentObject = offlineData[id];
      }
      controllerReference.finishDownloadCallBackObj(contentObject,"");	
    } else if("ONPAUSE" == mode) {
      kony.print("ONPAUSE mode");
    } else if("ONERROR" == mode) {
      kony.print("ONERROR mode");
      var contentObject = null;
      var offlineData = retrieveJsonAllLanguages("offlineContent");
      if(!isBlankOrNull(offlineData) && !isBlankOrNull(offlineData[id])){
        kony.print("Sreeni content found in offline");
        contentObject = offlineData[id];
      }
      controllerReference.finishDownloadCallBackObj(contentObject,"ERROR");	
    }
  },
});