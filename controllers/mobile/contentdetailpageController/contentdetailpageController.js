define({
  onNavigate: function(context) {
    gblAppData=context;
    conDetailCardData=context;
    kony.print("conDetailCardData initialized"+JSON.stringify(conDetailCardData));
    this.applyBindings(context);
    //this.assignData(context);
  },
  applyBindings: function(data) {
    //gblAppData = null;
    try {
      
      controllerReference = this;
      controllerreference = this;
      
      this.view.flxBottomOverlay.onClick = function(){};
      this.view.flxTopOverlay.onClick = function(){};
      controllerreference.view.flxToast.setVisibility(false);
      this.view.flxContentDetails.setEnabled(true);
      DownloadingBrightCove = false; // When downloading brightcove make this as true so that user will not navigate to video page.
      
      this.view.btnDownload.onClick = this.downloadButtonToggle.bind(this);
      this.view.btnBookmark.onClick = this.onBtnBookmarkClick.bind(this);
      this.view.btnShare.onClick = this.shareContent;
      this.view.backButton.onClick = this._goBack.bind(this);
      this.view.onDeviceBack = this._goBack.bind(this);
      this.infoPopupOff();
      this.view.Popup.btnConfirmation.onClick = this.infoPopupOff;
      this.view.preShow = this.contentDetailsPreShow.bind(this, data);
      this.view.postShow = this.contentDetailsPostShow.bind(this, data);
      
      //this.view.segContentLang.onRowClick = this.setSelectedContentLang.bind(this);
      
      controllerReference.view.flxMainPopup.isVisible=false;
      controllerReference.view.btnNoDelete.onClick=this.dismissPopup.bind(this);
      pageComponents = ["ContentDetailCard","MoreOptions","Popup","Popup2"];
      controllerReference.view.flxMainPopup.onTouchStart=function(){
        kony.print("Waiting for someone to write something amazing");
      };
      controllerReference.view.Popup.onTouchStart=function(){
        kony.print("");
      };
      /*controllerReference.view.flxContentLang.onClick = function(){
        controllerReference.view.flxContentLang.isVisible = false;
      }*/
      
      kony.print("In End of apply Bindings");
    } catch (e) {
      kony.print("Exception is " + e);
    }
  },
  dismissPopup:function(){
    //callTealiumOnClick("click_action", "Undownload_No",["btnNoDelete"],gblVisitor_imcID);
    var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"Undownload_No"
    	 };
    callTealiumOnClick(onClickDetails,["btnNoDelete"], false);
    controllerReference.view.flxMainPopup.isVisible=false;
  },
  
  showNotification: function() {
    try {
      controllerReference.view.Popup2.isVisible = true;
    } catch (e) {}
  },
  
  setSegConLangData: function(){
    kony.print("***inside set data for conLang segment***");
    var segData = []; 
    var imgsrc = "icon_heart.png";
    for(var i=0;i<segConLangData.length;i++){
        var lang = segConLangData[i][1];
        if(lang === controllerReference.view.ContentDetailCard.lstBoxSelOption()){
          imgsrc = "icon_heart_active.png";
        }else{
          imgsrc = "icon_heart.png";          
        }
        var langOption = {
          "flxBackground":{
            
            onClick: function(){}
          },
          "lblContentLang":{
            text: lang
          },
          "imgContentLangSel":{
            src: imgsrc
          }
        };
        segData.push(langOption);
      }
    controllerReference.view.segContentLang.setData(segData);
  },
  setSelectedContentLang: function(){
    kony.print("entered segConLang onrowclick func");
    var selectedRow = controllerReference.view.segContentLang.selectedIndex[1];    
    kony.print("selected lang index = "+selectedRow);
    var selcLang = segConLangData[selectedRow][1];
    controllerReference.view.flxContentLang.isVisible = false;
    kony.print("selected content lang = "+selcLang);
    controllerReference.view.ContentDetailCard.lblSelLangText = selcLang;
    controllerReference.view.ContentDetailCard.goToSegLanguageContent(selcLang);
  },
  
  UpdateContent:function(){
      if(!isNetworkAvailable()){
        this.view.flxContentVersion.isVisible=false;
        controllerReference.view.flxToast.setVisibility(true);
        try {
          kony.timer.cancel("timerid");
        } catch (e) {
          
        }
        kony.timer.schedule("timerid", controllerReference.disableFlex.bind(this), 5, false);
        return;
      }
      controllerReference.view.btnDownload.skin = "sknBtnDownload";
      var docPath = kony.io.FileSystem.getDataDirectoryPath();
      kony.print("Kony doc directory path is:" + docPath);
      var path="";
      if(isIOS())
        path = docPath.replace("Library", "Documents");
      else
        path = docPath.replace("files", "");
      kony.print("final path is:" + path);

      if (gblAppData.contentType === "pdf") {
        kony.print("pdfdownloaded");
        var filePath = path + "/" + gblAppData.UID + ".pdf";
        var file = new kony.io.File(filePath);
        if (file.exists()) {
          kony.print("pdf file exists in the path");
          file.remove();
          kony.print("pdf file removed check the size");
        }
      } else if (gblAppData.contentType === "video") {
        kony.print("video downloaded");
        var filePath ="";

       // path=kony.io.FileSystem.getExternalStorageDirectoryPath() + "/Download";
        var filePath = path + "/" + gblAppData.UID + ".mp4";
        var file = new kony.io.File(filePath);
        kony.print("filePath inside toggle is" + filePath);
        if (file.exists()) {
          kony.print("mp4 file exists in the path");
          file.remove();
          kony.print("mp4 file removed check the size");
        }
      }
      kony.print("Setting the download progress")
      controllerReference.view.ContentDetailCard.setDownloadProgress(3);
      controllerReference.view.ContentDetailCard.setOverlayView(3);
      //my content 
      controllerReference.view.ContentDetailCard.setOfflineData();
      //For search results page
      for (var i = 0; i < segmentData.length; i++) {
        if (gblAppData["UID"] == segmentData[i]["UID"]) {
          segmentData[i].btnDownload.skin = "sknBtnDownload";
          segmentData[i].isDownloaded = false;
          segmentData[i].isPaused = false;
          segmentData[i].isDownloading = false;
          segmentData[i].PausedPercent = "0%";
        }
      }

      controllerReference.view.flxMainPopup.isVisible=false;
      
      if(!isBlankOrNull(controllerReference.view.ContentDetailCard.lstBoxSelOption())&& controllerReference.view.ContentDetailCard.lstBoxSelOption() != gblLanguage){
		  var offlineContent_new = retrieveJsonAllLanguages("offlineContent");
           if (isBlankOrNull(offlineContent_new)) offlineContent_new = {}
           var currentLang = controllerReference.view.ContentDetailCard.lstBoxSelOption();
           var plainUid = getUidWithoutLang(gblAppData["UID"]);
           var contentId;
		   var otherlanguageDownload = false;
           var languageUrls = gblAppData.contentType === "video" ? gblAppData.videoLanguageUrls : gblAppData.pdfLanguageUrls;
           if (languageUrls !== null && languageUrls !== undefined && languageUrls.length > 0) {
             for (var i = 0; i < languageUrls.length; i++) {
               
                contentId = plainUid+languageUrls[i]["language"];
               if(contentId == plainUid+currentLang || contentId == plainUid+gblLanguage){
                 continue;
               }
				if(!isBlankOrNull(offlineContent_new[contentId]) &&  offlineContent_new[contentId].isDownloaded ){
					otherlanguageDownload = true;
					break;
				}
             }
		   }
               if(!otherlanguageDownload){
                 if(!isBlankOrNull(offlineContent_new[plainUid+gblLanguage])){
                   	kony.print("Sreeni other language download false to existing english content which is in offline already");
                   	var tempObj = offlineContent_new[plainUid+gblLanguage] ;
					tempObj["otherLanguageDownload"] = false;
					offlineContent_new[plainUid+gblLanguage] = tempObj;
                 	storeJson("offlineContent", offlineContent_new);
                 }
			   }
            
      }
    
    this.view.flxContentVersion.isVisible=false;

    
    var selectedLanguage = this.view.ContentDetailCard.lstBoxSelOption();
    
    if(data["contentType"]=="pdf"){
       for (var k = 0; k < gblAppData.pdfLanguageUrls.length; k++) {
        if (gblAppData.pdfLanguageUrls[k]["language"].toLowerCase() === selectedLanguage.toLowerCase()) {
          gblAppData.url=gblAppData.pdfLanguageUrls[k]["url"]
          break;
        }
      }
    }else if(data["contentType"]=="video"){
      for (var k = 0; k < gblAppData.videoLanguageUrls.length; k++) {
        if (gblAppData.videoLanguageUrls[k]["language"].toLowerCase() === selectedLanguage.toLowerCase()) {
          gblAppData.url=gblAppData.videoLanguageUrls[k]["url"]
          break;
        }
      }
    }
   

    //#ifdef iphone
    controllerReference.startDownload();
    //#endif

    //#ifdef android
    kony.print("Starting android download execution");
    this.checkPermissions();
    //#endif

    
  },
  
  DownloadLater:function(){
    this.view.flxContentVersion.isVisible=false;
  },
  
  contentDetailsPreShow: function(data) {
    try{
      this.view.flxContentVersion.onTouchStart=function(){
        kony.print("waiting for someone to write something amazing");
      };
      
      this.view.btnContentYes.onClick=this.UpdateContent.bind(this);
      this.view.btnContentNo.onClick=this.DownloadLater.bind(this);
      
      this.view.flxScrollContent.contentOffset = {x:"0",y:"0"};
      kony.print("Inside contentdetails preshow : " + JSON.stringify(data)+"\n\n\n");
      var contentType = data["contentType"];
      gblContentType = contentType;
      var languages = [];
      var languageUrls = {};
      var defaultLanguage = "";
      if (contentType === "pdf") {
        languages = data["pdfLanguages"];
        languageUrls = data["pdfLanguageUrls"];
      } else if (contentType === "video") {
        languages = data["videoLanguages"];
        languageUrls = data["videoLanguageUrls"];
      } else if (contentType === "ebook") {
        languages = data["ebookLanguages"];
        languageUrls = data["videoLanguageUrls"];
      }
      var langFound = false;
      defaultLanguage = gblLanguage;
     
      if(isIOS()){
        var previousFormChk = kony.application.getPreviousForm().id;
      }else{
        var previousFormChk = kony.application.getCurrentForm().id;
      }
      kony.print("previousFormChk "+previousFormChk);
      
      if(!isNetworkAvailable() && previousFormChk != "playvideo" ){
        kony.print("@@NSR languages : "+JSON.stringify(languages));
        kony.print("@@NSR languages : "+JSON.stringify(languageUrls));
        var plainUID = getUidWithoutLang(data["UID"]);
        var offlineContent = retrieveJsonAllLanguages("offlineContent");
        
        if(!isBlankOrNull(offlineContent)){
          kony.print("@@NSR offlineContent : "+JSON.stringify(offlineContent));
          if (languages !== null && languages !== undefined && languages.length > 0) {
            	var len = languages.length;
            	while(len--){
                  if(len === -1)break;
                  var langUid = plainUID+languages[len][1];
                  if( !(!isBlankOrNull(offlineContent[langUid]) && offlineContent[langUid].isDownloaded)){
                        languages.splice(len,1);
                    	languageUrls.splice(len,1);
                  }
                }
//             	for(var k=0;k<languages.length;k++){
//                   var langUid = plainUID+languages[k][1];
//                   if( !(!isBlankOrNull(offlineContent[langUid]) && offlineContent[langUid].isDownloaded)){
//                         languages.splice(k,1);
//                     	languageUrls.splice(k,1);
//                   }
//                 }
            
//              for (var i = 0; i < languages.length; i++) {
//               var tempLang = languages[i][1];
//               if (tempLang === defaultLanguage) {
//                 langFound = true;
//                 break;
//               }
//             }
//             if (!langFound) {
//               defaultLanguage = languages[0][1];
//             }
            
          }
        }else{
          kony.print("Strange that user came here");
        }
      }
      if (languageUrls !== null && languageUrls !== undefined && languageUrls.length > 0) {
        for (var i = 0; i < languageUrls.length; i++) {
          var tempLang = languageUrls[i]["language"];
          if (tempLang === defaultLanguage) {
            langFound = true;
            break;
          }
        }
        if (!langFound) {
          defaultLanguage = languageUrls[0]["language"];
        }
      }
      kony.print("Before setting default language : " + defaultLanguage);
      kony.print("@@Ana languages : "+JSON.stringify(languages));
      this.view.ContentDetailCard.lstBoxLangMasterData = languages;
      segConLangData = languages;
      /*if(segConLangData === null || segConLangData === undefined || segConLangData.length === 0){
        segConLangData = [[defaultLanguage,defaultLanguage]];
      }*/
      this.view.ContentDetailCard.lblSelLangText = segConLangData[0][1];
      if (selLan == "") {
        this.view.ContentDetailCard.setLstBoxSelOption(defaultLanguage);
      } else {
        this.view.ContentDetailCard.setLstBoxSelOption(selLan);
       
      }

      var selLanguage = this.view.ContentDetailCard.lstBoxSelOption();
      var contentType = data["contentType"];
      var languageUrls = {};
      if (contentType !== null && contentType !== undefined) {
        if (contentType === "pdf") {
          languageUrls = data["pdfLanguageUrls"];
        } else if (contentType === "video") {
          languageUrls = data["videoLanguageUrls"];
        } else if (contentType === "brightCoveVideo") {
          languageUrls = data["brightCoveLanguageUrls"];
        } else if (contentType === "ebook") {
          languageUrls = data["ebookLanguageUrls"];
        }
      }
      var selUrl = "";
      if (languageUrls !== null && languageUrls !== undefined && languageUrls.length > 0) {
        for (var i = 0; i < languageUrls.length; i++) {
          if (selLanguage === languageUrls[i]["language"]) {
            selUrl = languageUrls[i]["url"];
            break;
          }
        }
      }
      kony.print("selUrl in contentDetailsPage : " + selUrl);
      data["url"] = selUrl;
      data["UID"] = getUidWithoutLang(data["UID"])+selLanguage;
      gblAppData = data;
      kony.print("Sreeni UID set preshow ::"+gblAppData["UID"]);
      var record = null;
      var offlineContent = retrieveJsonAllLanguages("offlineContent");
      if (!isBlankOrNull(offlineContent)&& undefined != offlineContent[gblAppData["UID"]] && null != offlineContent[gblAppData["UID"]] ) {
        record = offlineContent[gblAppData["UID"]];
      }
      if(null != record ){
        gblAppData["isDownloaded"] = record["isDownloaded"];
        if(gblAppData["isDownloaded"]){
          gblAppData.btnDownload.skin = "sknBtnDownloadActive";
        }
        gblAppData["isPaused"] = record["isPaused"];
        gblAppData["PausedPercent"] = record["PausedPercent"];
        gblAppData["isDownloading"] = record["isDownloading"];
        gblAppData["url"] = record["url"];
        gblAppData["isBookmarked"] = record["isBookmarked"];
      }else{
        gblAppData["isDownloaded"] = false;
        if(gblAppData["isDownloaded"]){
          gblAppData.btnDownload.skin = "sknBtnDownload";
        }
        gblAppData["isPaused"] = false;
        gblAppData["PausedPercent"] = "";
        gblAppData["isDownloading"] = false;
        gblAppData["isBookmarked"] = false;
        gblAppData["isDownload"] = "true";
      }
      kony.print("assigned data = "+JSON.stringify(gblAppData));
      this.assignData(gblAppData);

    }catch(e){
      kony.print("Exception in preshow:"+e);
    }

  //  kony.print("swaroopa" + JSON.stringify(kony.os.deviceInfo()));
 	if(kony.os.deviceInfo().model=="iPhone 7 Plus"){
      
      kony.print("here");
      this.view.ContentDetailCard.lstBoxLangLeft="35.2%";
     }
  },
  contentDetailsPostShow: function(data) {
    
    try{
   
    if(kony.os.deviceInfo().name=="iPad"){
    	this.view.flxMessagePage.height="45%";
      this.view.ContentDetailCard.lstBoxLangLeft="24%";
    }
      
      if(kony.os.deviceInfo().model=="iPhone 7 Plus"){
      
      kony.print("here");
      this.view.ContentDetailCard.lstBoxLangLeft="35.2%";
     }
	
   try{
    var contentType = data.contentType;
    var contentId = data.FullTitle;
    kony.print("jani >>> contenttype and contentId : "+contentType+" "+contentId);
     var formComponents = ["ContentDetailCard","MoreOptions","Popup","Popup2"];
 /*   var platform = getDevicePlatform();
     var formComponents = ["ContentDetailCard","MoreOptions","Popup","Popup2"];
    var argumentsArray = {
      "app_type": platform,
      "app_country": "in",
      "app_language": getDeviceLanguage(),
      "app_digitalProperty": "Amway Business app",
      "app_region": "eia",
      "page_section":"content details",
      "content_type":contentType,
      "content_id":contentId,
      "page_detail": this.view.id, //PAGE NAME, eg: Form1
      "visitor_imcID":gblVisitor_imcID,
      "page_components": formComponents //Names of components in the form/page sent as an array. Example: ["slider","doclist","segTemplate"]
    }
    Tealium.trackView(this.view.id,JSON.stringify(argumentsArray),"eia-hub-app");	*/
     var contentDetails = {
       "page_section":"content details",
      "content_type":contentType,
      "content_id":contentId
     }
     callTealiumOnScreenLoad(this.view.id, formComponents, contentDetails, false)
   }
    catch(ex){
      kony.print("jani >>> contentdetailpage Exception "+ex);
    }
    
    gblCurrentForm = "contentdetailpage";
    kony.print("gblCurrentForm in contentDetails : " + gblCurrentForm);
    // gbl back functionality by janibasha
    var prevForm = kony.application.getPreviousForm().id;
    if (prevForm == "searchresultspage" || prevForm == "homepage" || prevForm == "mycontentpage") {
      gblFormBack.push(prevForm);
    }
    kony.print(" jani >>> gblFormback list length contentdetailpage :" + gblFormBack.length);
    kony.print(" jani >>> contentdetailpage previous form " + prevForm);
    }catch(e){
      
    }
  },
//   PostshowAnalytics :function(formName){
//   	 var  additionalArg = [];
//   	 additionalArg.push(this.view.id);
//      additionalArg.push(newelt);
//   	 kony.print("Tealium form widgets json for storeLocator page :: "+JSON.stringify(additionalArg));
//      callTealiumOnScreenLoad(this.view,additionalArg);
// 	},
  _goBack: function() {

    selLan="";
    if(controllerReference.view.flxMainPopup.isVisible){
      controllerReference.view.flxMainPopup.isVisible=false;
    }else if(controllerReference.view.Popup.isVisible){
      controllerReference.infoPopupOff();
    }else if(this.view.flxContentVersion.isVisible){
      this.view.flxContentVersion.isVisible=false;
    }else{
      try {
        gblAppData.UID = "";
        var ntf;

        var prevForm = gblFormBack.pop();
        
        
        while (!isBlankOrNull(gblFormBack) && prevForm == "contentdetailpage") {
          prevForm = gblFormBack.pop();
        }
        if((prevForm == "homepage" || prevForm == "mycontentpage") && !gblInteractionDoneInDetails){
         kony.print("PrevForm is homepage")
         gblRetailScroll = true;
        }else{
          gblInteractionDoneInDetails = false;
        }
        if(prevForm=="searchresultspage")comingFromContent=true;
        kony.print("jani >>> onback button contentdetailpage prev form" + prevForm);
        ntf = new kony.mvc.Navigation(prevForm);
        //ntf.navigate();

        ntf.navigate();
        // controllerReference.setOverlayView(2);
        //controllerReference.setDownloadProgress(2);	
      } catch (e) {
        kony.print("Excepetion occured while navigating back" + e);
      }
    }

  },
  
  
  
  updateProgressCallback: function(object, percentage) {
    kony.print("detail page controller" + JSON.stringify(object) + "percentage is " + percentage);
    if (gblAppData != null && object.UID == gblAppData.UID) {
      if (!controllerReference.view.ContentDetailCard.dwOverlayIsVisible) {
        controllerReference.view.ContentDetailCard.dwOverlayIsVisible = true;
        
      }
      //if(!controllerReference.view.ContentDetailCard.btnPauseDownload.isVisible){
//          if(parseInt(percentage)>= 1){
//            controllerReference.view.ContentDetailCard.closeOverlay.isVisible = true;
//             controllerReference.view.ContentDetailCard.btnPauseDownload.isVisible = true;      
//       }
     // }
     
      controllerReference.view.ContentDetailCard.lblDwProgressText = "Downloading... " + percentage;
    } else {
      kony.print("Updating " + object.UID + " in the BG");
    }
  },
  
  finishDownloadCallBackObj: function(object, filePath) {
    kony.print("Inside finishDownloadCallbackObj");
    try {
      if (!isBlankOrNull(filePath) && filePath == "ERROR") {
        gblAppData = object;
        controllerReference.view.ContentDetailCard.cancelDownload();
        return;
      }
      if (object.UID == gblAppData.UID) {
        controllerReference.view.btnDownload.skin = "sknBtnDownloadActive";
        controllerReference.view.ContentDetailCard.lblDwProgressText = "Downloading... ";
        controllerReference.view.ContentDetailCard.dwOverlayIsVisible = false;
        gblAppData.isDownloaded = true;
        gblAppData.isDownloading = false;
        gblAppData.isPaused = false;
        gblAppData.btnDownload.skin = "sknBtnDownloadActive";
        gblAppData.PausedPercent = "";
        gblAppData.flxDownloadOverlay = {
          onClick: function() {},
          isVisible: false
        };
      }
      if(isAndroid()){
        kony.print("Inside Android");
        object.isDownloaded = true;
        object.isDownload = "true";
        object.isPaused = false;
        object.isDownloading = false;
        object.btnDownload.skin = "sknBtnDownloadActive";
        object.PausedPercent = "";
        object.flxDownloadOverlay = {onClick : function(){},isVisible:false};
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
		
        //turnoff overlay in contentdetails page UI
        controllerReference.view.ContentDetailCard.dwOverlayIsVisible = false;

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
     
    } catch (e) {
      kony.print("Exception in finishDownloadCallBackObj" + e);
    }

  },
  
  
  
  
  startDownload: function() {
    try {
      DownloadingBrightCove = false;

      if (isBlankOrNull(gblAppData.url) || typeof(gblAppData.url) == "object") {
        var selectedLanguage = this.view.ContentDetailCard.lstBoxSelOption();
        var langUrls = gblAppData.contentType === "video" ? gblAppData.videoLanguageUrls : gblAppData.pdfLanguageUrls;
        gblAppData.url = null;
        kony.print("SR@ url becomes empty so setting it again" + JSON.stringify(langUrls));
        if (!isBlankOrNull(langUrls)) {
          for (var k = 0; k < langUrls.length; k++) {
            if (langUrls[k]["language"].toLowerCase() == selectedLanguage.toLowerCase()) {
              kony.print("SR@ english URL is " + langUrls[k]["url"]);
              gblAppData.url = langUrls[k]["url"];
              break;
            }
          }
        }
        if (isBlankOrNull(gblAppData.url)) {
          kony.print("content url missed " + getI18Value("ContentUrlMissed"));
          controllerReference.infoPopupOn(getI18Value("ContentUrlMissed"));
          gblAppData.flxDownloadOverlay = {
            onClick: function() {},
            isVisible: false
          }
          gblAppData.btnDownload = {
            skin: "sknBtnDownload"
          };
          return;
        }

      }
      var url = gblAppData.url;
      if (url.indexOf("https://players.brightcove.net") != -1) {
        DownloadingBrightCove = true;
        kony.print("Sreeni url is from brightcove ");
        controllerreference.getBrightCoveVideoData(gblAppData);
        return;
      }
      //Download content image for offline purpose
      //if(isIOS())
   		DownloadImageOffline(gblAppData);
      controllerReference.view.ContentDetailCard.setDownloadProgress(1);
      controllerReference.view.ContentDetailCard.setOverlayView(1);
       
          gblAppData.isDownloaded = false;
          gblAppData.isPaused = false;
          gblAppData.isDownloading = true;
          gblAppData.PausedPercent = "";
      
      for (var i = 0; i < segmentData.length; i++) {
        if (gblAppData["UID"] == segmentData[i]["UID"]) {
          //online
          segmentData[i].btnDownload.skin = "sknBtnDownload";
          segmentData[i].isDownloaded = false;
          segmentData[i].isPaused = false;
          segmentData[i].isDownloading = true;
          segmentData[i].PausedPercent = "";
        }
      }
      //offline ->for home page refresh issue
      controllerReference.view.ContentDetailCard.setOfflineData();
      if(isIOS()){
        DownloadManagerObject.startDownloadJs(gblAppData);
      }
      else{
        kony.print("AND download start");
        var id = gblAppData["UID"];
        if(gblAppData["contentType"]=="video"){
          id=id+".mp4";
        }else if(gblAppData["contentType"]=="pdf"){
          id=id+".pdf";
        }
        var obj = getDprObj(id);
        if (gblAppData["contentType"] === "video") {
         // obj.startDownloadUsingDM(url, id); //FFI call only for Video
           obj.startDownload(url, id); //FFI call
        } else {
          obj.startDownload(url, id); //FFI call
        }
        //obj.startDownload(url, id); //FFI call
      }
    } catch (e) {
      kony.print("Exception in startDownload :" + e);
    }
  },

  deleteContent:function(){
    try{
      	controllerReference.view.flxMainPopup.isVisible=true;

        controllerReference.view.btnYesDelete.onClick=function(){
        //callTealiumOnClick("click_action", "Undownload_Yes",["btnYesDelete"],gblVisitor_imcID);
        var onClickDetails = {
          "event_name":"click_action",
          "click_detail":"Undownload_Yes"
    	  };
      	callTealiumOnClick(onClickDetails,["btnYesDelete"], false);
          //controllerReference.view.ContentDetailCard.downloadOverlay.isVisible = false;
          controllerReference.view.btnDownload.skin = "sknBtnDownload";
          var docPath = kony.io.FileSystem.getDataDirectoryPath();
          kony.print("Kony doc directory path is:" + docPath);
          var path="";
          if(isIOS())
            path = docPath.replace("Library", "Documents");
          else
            path = docPath.replace("files", "");
          kony.print("final path is:" + path);
          
		  
          if (gblAppData.contentType === "pdf") {
            kony.print("pdfdownloaded");
            var filePath = path + "/" + gblAppData.UID + ".pdf";
            var file = new kony.io.File(filePath);
            if (file.exists()) {
              kony.print("pdf file exists in the path");
              file.remove();
              kony.print("pdf file removed check the size");
            }
          } else if (gblAppData.contentType === "video") {
            kony.print("video downloaded");
            var filePath ="";

           // path=kony.io.FileSystem.getExternalStorageDirectoryPath() + "/Download";
            var filePath = path + "/" + gblAppData.UID + ".mp4";
            var file = new kony.io.File(filePath);
            kony.print("filePath inside toggle is" + filePath);
            if (file.exists()) {
              kony.print("mp4 file exists in the path");
              file.remove();
              kony.print("mp4 file removed check the size");
            }
          }
          kony.print("Setting the download progress");        
          controllerReference.view.ContentDetailCard.setDownloadProgress(3);
          controllerReference.view.ContentDetailCard.setOverlayView(3);
          //my content 
          controllerReference.view.ContentDetailCard.setOfflineData();
          //For search results page
          for (var i = 0; i < segmentData.length; i++) {
            if (gblAppData["UID"] == segmentData[i]["UID"]) {
              segmentData[i].btnDownload.skin = "sknBtnDownload";
              segmentData[i].isDownloaded = false;
              segmentData[i].isPaused = false;
              segmentData[i].isDownloading = false;
              segmentData[i].PausedPercent = "0%";
            }
          }

          controllerReference.view.flxMainPopup.isVisible=false;
		  kony.print("selected content lang - "+controllerReference.view.ContentDetailCard.lstBoxSelOption());
          if(!isBlankOrNull(controllerReference.view.ContentDetailCard.lstBoxSelOption())&& controllerReference.view.ContentDetailCard.lstBoxSelOption() != gblLanguage){
              var offlineContent_new = retrieveJsonAllLanguages("offlineContent");
               if (isBlankOrNull(offlineContent_new)) offlineContent_new = {}
               var currentLang = controllerReference.view.ContentDetailCard.lstBoxSelOption();
               var plainUid = getUidWithoutLang(gblAppData["UID"]);
               var contentId;
               var otherlanguageDownload = false;
               var languageUrls = gblAppData.contentType === "video" ? gblAppData.videoLanguageUrls : gblAppData.pdfLanguageUrls;
               if (languageUrls !== null && languageUrls !== undefined && languageUrls.length > 0) {
                 for (var i = 0; i < languageUrls.length; i++) {

                    contentId = plainUid+languageUrls[i]["language"];
                   if(contentId == plainUid+currentLang || contentId == plainUid+gblLanguage){
                     continue;
                   }
                    if(!isBlankOrNull(offlineContent_new[contentId]) &&  offlineContent_new[contentId].isDownloaded ){
                        otherlanguageDownload = true;
                        break;
                    }
                 }
               }
                   if(!otherlanguageDownload){
                     if(!isBlankOrNull(offlineContent_new[plainUid+gblLanguage])){
                        kony.print("Sreeni other language download false to existing english content which is in offline already");
                        var tempObj = offlineContent_new[plainUid+gblLanguage] ;
                        tempObj["otherLanguageDownload"] = false;
                        offlineContent_new[plainUid+gblLanguage] = tempObj;
                        storeJson("offlineContent", offlineContent_new);
                     }
                   }

          }
        }
    }catch(e){
      kony.print("Exception in deleteContent ::"+e);
    }
    
     
  },
/*  trackEventAnalytics : function(event_name,click_detail, contentId){
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
      "visitor_imcID":gblVisitor_imcID,
      "page_components": ["btnPauseDownload"]
    };
      Tealium.trackEvent("click_action", JSON.stringify(dataOnclickArray), "eia-hub-app");
  },	*/
  downloadButtonToggle: function() {
    
    try {
      gblInteractionDoneInDetails = true;
      kony.print("jani >>> download start : ");
      //this.trackEventAnalytics("Download", "Download",contentId);
      //kony.print("jani >>> gblAppData "+JSON.stringify(gblAppData));
      var contentType = gblAppData.contentType;
      var contentId = gblAppData.FullTitle;
      kony.print("jani >>> contentType"+contentType +"contentId "+contentId);
      var onClickDetails = {
          "event_name":"click_action",
          "click_detail":"Download",
          "content_type": contentType,
          "content_id": contentId
    	  };
      	callTealiumOnClick(onClickDetails,["btnDownload"], false);
  /*     var dataOnclickArray = {
      "app_type": getDevicePlatform() , //ios or android sent by OS of the device
      "app_country": "in",
      "app_language": getDeviceLanguage(),
      "app_digitalProperty": "Amway Business app",
      "app_region":"eia",
      "event_name": "click_action", //"click_action",
      "click_detail": "Download",//"header login",
      "click_category": "",
      "content_type": contentType,
      "content_id": contentId,
      "visitor_imcID":gblVisitor_imcID,
      "page_components": ["btnDownload"]
    };
      Tealium.trackEvent("click_action", JSON.stringify(dataOnclickArray), "eia-hub-app");	*/
      
      
      if (gblAppData.isDownload == "false") {
        kony.print("content non downloadable in downloadButtonToggle")
        return;
      }
      if (gblAppData.isDownloaded) {
        controllerReference.deleteContent();
      } 
      else if (gblAppData.isDownloading  && controllerReference.view.ContentDetailCard.dwOverlayIsVisible) {
        kony.print("content already downloading!!")
      } else if (gblAppData.isPaused && controllerReference.view.ContentDetailCard.dwOverlayIsVisible) {
        kony.print("content already paused!!")
      } else {
        if (!isNetworkAvailable()) {
          controllerReference.view.flxToast.setVisibility(true);
          controllerReference.view.ContentDetailCard.imgConDetSetEnabled(false);
          try {
            kony.timer.cancel("timerid");
          } catch (e) {}
          kony.timer.schedule("timerid", controllerReference.disableFlex.bind(this), 5, false);
        } else {
          //controllerReference.view.ContentDetailCard.downloadOverlay.isVisible = true;
          //#ifdef iphone
          controllerReference.startDownload();
          //#endif

          //#ifdef android
          kony.print("Starting android download execution");
          this.checkPermissions();
          //#endif
        }
      }
    } catch (e) {
      kony.print("Exception in downloadButtonToggle:" + e);
    }
  },
  assignData: function(data){
    try {
      kony.print("sreeni >> gblAppData : " + JSON.stringify(data));
      if (!isBlankOrNull(data.contentType))
        this.view.lblHeader.text = (data.contentType).toUpperCase();
      if (data.contentType == "html" || data.contentType == "ebook") {
        this.view.btnDownload.setEnabled(false);
        this.view.btnDownload.skin = "sknBtnDownloadDisable";
        this.view.btnDownload.focusSkin = "sknBtnDownloadDisable";
        this.view.btnDownload.onClick = function() {
          kony.print("dont download html");
        }
        this.view.btnShare.setEnabled(false);
        this.view.btnShare.skin = "sknShareDisable";
        this.view.btnShare.focusSkin = "sknShareDisable";
        this.view.btnShare.onClick = function() {
          kony.print("dont share html");
        }
      } else if (data.contentType == "pdf") {
        if (data.isDownload == "true" && !isBlankOrNull( data.url)) {
          this.view.btnDownload.setEnabled(true);
          this.view.btnDownload.skin = "sknBtnDownload";
        }else{
          this.view.btnDownload.setEnabled(false);
          this.view.btnDownload.skin = "sknBtnDownloadDisable";
          this.view.btnDownload.focusSkin = "sknBtnDownloadDisable";
        }
        if (data.isShareable == "false") {
          this.view.btnShare.setEnabled(false);
          this.view.btnShare.skin = "sknShareDisable";
          this.view.btnShare.focusSkin = "sknShareDisable";
        } else if (data.isShareable == "true") {
          this.view.btnShare.setEnabled(true);
          this.view.btnShare.skin = "sknShare";
          this.view.btnShare.focusSkin = "sknShareActive";
        }
      } else if (data.contentType == "video") {
        kony.print("ANSR data video"+JSON.stringify(data));
        if (data.isDownload == "true" &&  !isBlankOrNull( data.url) ) {
          kony.print("ANSR data video 1");
          this.view.btnDownload.setEnabled(true);
          this.view.btnDownload.skin = "sknBtnDownload";
        }else {
          kony.print("ANSR data video 2");
          this.view.btnDownload.setEnabled(false);
          this.view.btnDownload.skin = "sknBtnDownloadDisable";
          this.view.btnDownload.focusSkin = "sknBtnDownloadDisable";
        }
        if (data.isShareable == "false") {
          this.view.btnShare.setEnabled(false);
          this.view.btnShare.onClick = this.shareContent();
          this.view.btnShare.skin = "sknShareDisable";
          this.view.btnShare.focusSkin = "sknShareDisable";
        } else if (data.isShareable == "true") {
          this.view.btnShare.setEnabled(true);
          this.view.btnShare.skin = "sknShare";
          this.view.btnShare.focusSkin = "sknShareActive";
        }
      }
      this.view.ContentDetailCard.lblContentTitleText = data.FullTitle;
      if( !isBlankOrNull(data.imgContent.base64)){
         kony.print("[sreeni]base64 found");
         this.view.ContentDetailCard.setImgConDetBase64(data.imgContent.base64);
      }else{
         kony.print("[sreeni]RawBytes not found");
         this.view.ContentDetailCard.imgContDetailSrc = data.imgContent;
      }
      //this.view.ContentDetailCard.imgContentDetail.src = data.imgContent;
      kony.print("after setImgConDetBase64");
      if (!isBlankOrNull(data.profileSub))
        this.view.ContentDetailCard.lblPublisherText = data.profileSub + " - " + data.profileName;
      else
        this.view.ContentDetailCard.lblPublisherText = data.profileName;

      this.view.ContentDetailCard.rchContentDescText = data.FullDesc;

      if (data.contentType != "html" && data.contentType != "ebook") {
        if (data.isDownloaded)
          this.view.btnDownload.skin = "sknBtnDownloadActive";
      }
      if (data.isBookmarked) {
        this.view.btnBookmark.skin = "sknBookmarkActive";
      } else {
        this.view.btnBookmark.skin = "sknBookmark";
      }
      if (data.isPaused) {
        controllerReference.view.ContentDetailCard.dwOverlayIsVisible = true;
        controllerReference.view.ContentDetailCard.setOverlayView(2);
        if (isIOS()) {
          controllerReference.view.ContentDetailCard.lblDwProgressText = "Downloading... " + data.PausedPercent;
        } else {
          controllerReference.view.ContentDetailCard.lblDwProgressText = "Download Paused... " + data.PausedPercent.substring(15);
        }

      } else if (data.isDownloading) {
        controllerReference.view.ContentDetailCard.dwOverlayIsVisible = true;
        controllerReference.view.ContentDetailCard.setOverlayView(1);
        controllerReference.view.ContentDetailCard.lblDwProgressText = "Downloading... ";
      } else { //default case
        kony.print("entered default case");
        controllerReference.view.ContentDetailCard.dwOverlayIsVisible = true;
        controllerReference.view.ContentDetailCard.lblDwProgressText = "Downloading... ";
        controllerReference.view.ContentDetailCard.setOverlayView(1); //set the overlay and hide
        controllerReference.view.ContentDetailCard.dwOverlayIsVisible = false;
      }
      //#ifdef iphone
      controllerReference.view.ContentDetailCard.lstBoxLangLeft="30%";
      //#endif

    } catch (e) {
      kony.print("Exception in assignData" + e);
    }


  },
  
  
  showContentVersionPopup:function(){
    this.view.flxContentVersion.isVisible=true;
  },
  
  
  bookMarkLanguageSpecificContent: function(contentObj,contentBookmarked,language) {
   try{
        kony.print("bookmarking item with UID :"+contentObj["UID"] +"isBookmarked :: " + contentBookmarked+" language:"+language );
        kony.print("bookmarking item::"+JSON.stringify(contentObj));
     	
        if(contentBookmarked){
          contentObj.isBookmarked = false;
          contentObj.btnBookmark.skin = "sknBookmark";
        }else{
          contentObj.isBookmarked = true;
          contentObj.btnBookmark.skin = "sknBookmarkActive";
        }
        contentObj.flxDownloadOverlay = {onClick : function(){},isVisible:false};
     	if(language.toLowerCase() == gblLanguage.toLowerCase()){
             //current page skin
          controllerReference.view.btnBookmark.skin = contentObj.btnBookmark.skin;
            //Updating global data for browse business
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
           kony.print("Offline content found for::"+language);
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
         if(contentObj.isDownloaded || contentObj.isBookmarked ||contentObj.isDownloading || contentObj.isPaused || expr){
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
  onBtnBookmarkClick: function() {
    try{
      //callTealiumOnClick("click_action", "Bookmarked",pageComponents);
      kony.print("jani >>> gblAppData "+JSON.stringify(gblAppData));
      var contentType = gblAppData.contentType;
      var contentId = gblAppData.FullTitle;
      kony.print("jani >>> contentType"+contentType +"contentId "+contentId);
 /*      var dataOnclickArray = {
      "app_type": getDevicePlatform() , //ios or android sent by OS of the device
      "app_country": "in",
      "app_language": getDeviceLanguage(),
      "app_digitalProperty": "Amway Business app",
      "app_region":"eia",
      "event_name": "click_action", //"click_action",
      "click_detail": "Bookmark",//"header login",
      "click_category": "",
      "content_type": contentType,
      "content_id": contentId,
      "visitor_imcID":gblVisitor_imcID,
      "page_components": ["btnBookmark"]
    };
      Tealium.trackEvent("click_action", JSON.stringify(dataOnclickArray), "eia-hub-app");		*/
      var onClickDetails = {
          "event_name":"click_action",
          "click_detail":"Bookmark",
          "content_type": contentType,
      	  "content_id": contentId
    	  };
      	callTealiumOnClick(onClickDetails,["btnBookmark"], false);
      	gblInteractionDoneInDetails = true;
        var contentBookmarked = gblAppData.isBookmarked;
        kony.print("isBookmarked :: " + contentBookmarked + "");
        if (contentBookmarked) {
          kony.print("unbookmarking::" + gblAppData["UID"]);
          gblAppData.isBookmarked = false;
          gblAppData.btnBookmark.skin = "sknBookmark";
        } else {
          kony.print("bookmarking::" + gblAppData["UID"]);
          gblAppData.isBookmarked = true;
          gblAppData.btnBookmark.skin = "sknBookmarkActive";
        }
        
        var plainUid = getUidWithoutLang(gblAppData["UID"]);
        kony.print("contentBookmarked :: " + contentBookmarked);
        var langFound = false;
        var languageUrls = gblAppData.contentType === "video" ? gblAppData.videoLanguageUrls : gblAppData.pdfLanguageUrls;

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
            var tempAppData = JSON.parse(JSON.stringify(gblAppData));

            tempAppData["UID"] = plainUid+gblLanguage;
            tempAppData["url"] = null;
            this.bookMarkLanguageSpecificContent(tempAppData, contentBookmarked,gblLanguage);
          }
        }
        //All languages
        for(var z=0;z<languageUrls.length;z++){
          var contentLang = languageUrls[z].language;
          var contentLangUrl = languageUrls[z].url;
          var actualUid = plainUid+""+contentLang;
          var tempAppData = JSON.parse(JSON.stringify(gblAppData));
          tempAppData["UID"] = actualUid;
          tempAppData["url"] = contentLangUrl;
          this.bookMarkLanguageSpecificContent(tempAppData, contentBookmarked,contentLang);
        }
         //gblAppData["UID"] = tempGblUid;
          kony.print("bookmarking item::" + JSON.stringify(gblAppData));
          kony.print("bookmarking item::" + gblAppData["UID"])
          if( gblAppData.isDownloading){
            gblAppData.flxDownloadOverlay = {isVisible:true};
          }else if(gblAppData.isDownloaded)
          {
            gblAppData.flxDownloadOverlay = {isVisible:false};
          }else if(gblAppData.isPaused)
          {
            gblAppData.flxDownloadOverlay = {isVisible:true};
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
    }catch(e){
      kony.print("Exception in details page bookmark click:"+e);
    }
    
  },
  _showOptions: function() {
    //animate( this.view.hiddenOptionsContainer, { "bottom": "0dp" } );
  },
  _hideOptions: function() {
    animate(this.view.hiddenOptionsContainer, {
      "bottom": "-285dp"
    });
  },
  
  shareContent: function() {
    try {
     // callTealiumOnClick("click_action", "Shared",pageComponents);
      var contentType = gblAppData.contentType;
      var contentId = gblAppData.FullTitle;
 /*     var click_detail = "Share";
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
      Tealium.trackEvent("click_action", JSON.stringify(dataOnclickArray), "eia-hub-app");		*/
      var onClickDetails = {
            "event_name":"social_share",
            "click_detail":"Share",
            "content_type": contentType,
            "content_id": contentId
            };
          callTealiumOnClick(onClickDetails,["btnShare"], false);
      var contentShareable = gblAppData.isShareable;
      if (isBlankOrNull(gblAppData.url)) {
        kony.print("URL is null... can't open");
        kony.print("content url missed " + getI18Value("ContentUrlMissed"));
        controllerReference.infoPopupOn(getI18Value("ContentUrlMissed"));
        return;
      }
      kony.print("contentShareable :: " + contentShareable + "");
      //check wheher content shareable if yes , then check if it is already shared
      if (contentShareable == "true") {
        kony.print("Inside share content : " + gblAppData.url);
        //#ifdef iphone
        shareContentiOS(gblAppData.url);
        //#endif
        //#ifdef android
        shareContentAndroid(gblAppData.url);
        //#endif
      }
    } catch (e) {}
  },
  playMediaiOS: function(path) {
    kony.print("Inside playMediaOs");
    var url = NSURL.URLWithString(path);
    var player = AVPlayer.playerWithURL(url);
    kony.print("Player initiated");
    AVContoller.player = player;
    UIApplication.sharedApplication().keyWindow.rootViewController.presentModalViewControllerAnimated(AVContoller, true);
    player.play();
  },
  infoPopupOn: function(text) {
    this.view.flxContentDetails.zIndex = 1;
    controllerReference.view.Popup.zIndex = 4;
    controllerReference.view.Popup.left="0%";
    controllerReference.view.Popup.isVisible = true;
    
    controllerReference.view.Popup.lblInfoComment.text = text;
    this.view.flxContentDetails.setEnabled(false);
  },
  infoPopupOff: function() {
    this.view.flxContentDetails.zIndex = 4;
    if (!isBlankOrNull(controllerReference.view.Popup)) {
      controllerReference.view.Popup.zIndex = 1;
      controllerReference.view.Popup.left="-100%";
      controllerReference.view.Popup.isVisible = false;
      this.view.flxContentDetails.setEnabled(true);
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
                gblAppData.url = sources[i]["src"];

                var selectedLanguage = this.view.ContentDetailCard.lstBoxSelOption();
                for (var k = 0; k < gblAppData.videoLanguageUrls.length; k++) {
                  if (gblAppData.videoLanguageUrls[k]["language"].toLowerCase() === selectedLanguage.toLowerCase()) {
                    gblAppData.videoLanguageUrls[k]["url"] = gblAppData.url;
                    break;
                  }
                }

                break;
              }
            }

          }

          
      
          
          
          
          /* kony.print("Sreeni >>>>> final gblAppData is :"+JSON.stringify(gblAppData));
                     var offlineContent = retrieveJsonAllLanguages("offlineContent");
                     if(isBlankOrNull(offlineContent))offlineContent = {};		
                     offlineContent[gblAppData["UID"]] = gblAppData;
                     storeJson("offlineContent", offlineContent);*/

          //update online data		
          for (var i = 0; i < segmentData.length; i++) {
            if (gblAppData["UID"] == segmentData[i]["UID"]) {
              kony.print("Sreeni >>>>> updating online data :" + JSON.stringify(gblAppData));
              segmentData[i].url = gblAppData.url;
              var selectedLanguage = this.view.ContentDetailCard.lstBoxSelOption();
              for (var m = 0; m < segmentData[i].videoLanguageUrls.length; m++) {
                if (segmentData[i].videoLanguageUrls[m]["language"].toLowerCase() === selectedLanguage.toLowerCase()) {
                  kony.print("Setting language for language support");
                  segmentData[i].videoLanguageUrls[m]["url"] = gblAppData.url;
                  break;
                }
              }
            }
          }
          if (!DownloadingBrightCove) {
            kony.print("sreeni playing brightcove");
            var nav = new kony.mvc.Navigation("playvideo");
            nav.navigate(gblAppData);
          } else {
            DownloadingBrightCove = false;
            kony.print("sreeni downloading brightcove");
            controllerReference.startDownload();
          }
        } catch (e) {
          DownloadingBrightCove = false;
          kony.print("exception in brightccove callback!!");
        }
      } else {
        DownloadingBrightCove = false;
        controllerReference.infoPopupOn(getI18Value("ServiceFailureMessage"));
      }
    } else {
      DownloadingBrightCove = false;
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
        mobileFabricConfiguration.integrationObj.invokeOperation(operationName, headers, dataToService, controllerreference.getBrightCoveDataSuccessCallback, controllerreference.getBrightCoveDataErrorCallback);
      } else {
        controllerreference.initializeMF("GET_BRIGHTCOVE_DATA", data);
      }
    } else {
      dismissLoading();
      kony.print("sreeni showing toast when there is no n/w");
      controllerreference.view.flxToast.setVisibility(true);
      try {
        kony.timer.cancel("timerid");
      } catch (e) {}
      kony.timer.schedule("timerid", controllerreference.disableFlex.bind(this), 2, false);
    }
  },
  initializeMF: function(context, data) {
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
        if (context == "GET_BRIGHTCOVE_DATA") {
          controllerreference.getBrightCoveVideoData(data);
        }
        kony.print(" ********** Exiting out of initializeMFSuccess ********** ");
      }, function(error) {
        kony.print(" ********** Entering into initializeMFFailure ********** ");
        kony.print(" ********** Failure in initializeMF: " + JSON.stringify(error) + " ********** ");
        dismissLoading();
        controllerReference.infoPopupOn(getI18Value("ServiceFailureMessage"));
        kony.print(" ********** Exiting out of initializeMFFailure ********** ");
      });
    } else {
      kony.print("sreeni showing toast when there is no n/w");
      controllerreference.view.flxToast.setVisibility(true);
      try {
        kony.timer.cancel("timerid");
      } catch (e) {}
      kony.timer.schedule("timerid", controllerreference.disableFlex.bind(this), 2, false);
    }
    kony.print(" ********** Exiting out of initializeMF ********** ");
  },
  disableFlex: function() {
    controllerreference.view.flxToast.setVisibility(false);
    try {
      kony.timer.cancel("timerid");
    } catch (e) {}
    controllerreference.view.ContentDetailCard.imgConDetSetEnabled(true);
    //controllerreference.view.flxToast.setVisibility(false);
  },
  showOfflineContent: function() {
    if (gblAppData.contentType === "video")
      this.playOfflineVideo();
  },
  playOfflineVideo: function() {
    if (isIOS())
      this.playMediaiOS();
    else {
      kony.print("play button clicked");
      gblAppData.isOffline = true;
      var nav = new kony.mvc.Navigation("playvideo");
      nav.navigate(gblAppData);
    }
  },
  showDownloadStatus: function(id, percentage, mode) {
    var contentObject = null;
	kony.print("Rahul mode is "+ mode);
    var offlineData = retrieveJsonAllLanguages("offlineContent");
    
	//kony.print("Rahul offline data is "+ JSON.stringify(offlineData));
    
    if(!isBlankOrNull(offlineData) && !isBlankOrNull(offlineData[id])){
      kony.print("Sreeni content found in offline");
      contentObject = offlineData[id];
    }

    for(var i=0;i<segmentData.length;i++){
      if(id == segmentData[i]["UID"]){
        contentObject =  segmentData[i];
        break;
      }
    }
    if("INPROGRESS" == mode){
      kony.print("INPROGRESS mode");
      controllerReference.updateProgressCallback(contentObject, percentage);
    } else if("ONERROR" == mode) {
      kony.print("ONERROR mode");
      controllerReference.finishDownloadCallBackObj(contentObject,"ERROR");	
    } else if("ONPAUSE" == mode) {
      kony.print("ONPAUSE mode");
    }
    else if("ONCOMPLETE" == mode){
      kony.print("ONCOMPLETE mode");
      controllerReference.finishDownloadCallBackObj(contentObject,"");	
    }
  },
  checkPermissions: function() {
    var options = {
      isAccessModeAlways: true
    };
    var result = kony.application.checkPermission(kony.os.RESOURCE_EXTERNAL_STORAGE, options);
    if (result.status === kony.application.PERMISSION_DENIED) {
      kony.print("Permission status : " + result.status);
      kony.application.requestPermission(kony.os.RESOURCE_EXTERNAL_STORAGE, this.permissions_CB);
    } else if (result.status === kony.application.PERMISSION_GRANTED) {
      kony.print("Permission already available for storage");
      controllerReference.startDownload();
    }
  },
  permissions_CB: function(result) {
    if (result.status === 50002.0 || result.status === "50002.0" || result.status === 50002) {
      kony.print("Inside if condition");
      controllerReference.startDownload();
    } else {
      kony.print("Inside else condition");
    }
  },
  videoPlayTealiumOnClick : function(event_name,video_name){
  var platform = getDevicePlatform();
  var data = {
    "app_type": platform, //ios or android sent by OS of the device
    "app_country": "in",
    "app_language": getDeviceLanguage(),
    "app_digitalProperty": "Amway Business app",
    "app_region": "eia",
    "click_category": "",
    "event_name": event_name, //"click_action",
    "video_name": video_name,//"header login",
    "page_components": pageComponents
  };
  Tealium.trackEvent("button_clicked",JSON.stringify(data),"eia-hub-app");
  kony.print("track event called : "+JSON.stringify(data));
},
  
});