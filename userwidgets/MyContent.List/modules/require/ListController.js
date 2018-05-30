define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      //offlineContentList = [];

      mycontentListComponentReference = this;
      //this.view.btnHome.onClick = this.navigateToHome.bind(this);
      //this.view.btnMyContent.onClick = this.navigateToMyContent.bind(this);
      //this.view.btnSettings.onClick = this.navigateToSettings.bind(this);
      //this.view.btnWebApps.onClick = this.navigateToWebApps.bind(this);
      this.view.segHomePageContent.onRowClick = this.segmentRowClicked.bind(this);
      this.view.flxAllContent.onClick = function(){mycontentListComponentReference.getMyContentListAllContent();};//this.getMyContentListAllContent.bind(this);
      this.view.flxDownloadedContent.onClick = function(){mycontentListComponentReference.getMyContentListDownloaded();};
      this.view.flxBookmarkedContent.onClick = function(){mycontentListComponentReference.getMyContentListBookmarked();}; 

    },
    navigateToHome: function() {
      if(!isNetworkAvailable()){
        controllerReference.view.flxToast.setVisibility(true);
        try{
          kony.timer.cancel("timerid");	
        }catch(e){}			
        kony.timer.schedule("timerid", controllerReference.disableFlex.bind(this), 5, false);

      }else{
        var nav = new kony.mvc.Navigation("homepage");
        nav.navigate();
      }
    },
    navigateToMyContent: function() {
      //No Action to take
    },
    navigateToSettings: function() {
      var nav = new kony.mvc.Navigation("settingpage");
      nav.navigate();
    },
    navigateToWebApps: function() {
      var nav = new kony.mvc.Navigation("webapppage");
      nav.navigate();
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
    },

    getMyContentListAllContent:function()
    {
      currentTab=0;
      if(!this.view.flxAllContentLine.isVisible ){
        animate2(this.view.filterContentV2,{"left":"100%"},{"left":"0%"});
        var offlineContentList = [];
        this.view.segHomePageContent.removeAll();
        this.view.lblAllContent.skin="activeFilterText";
        this.view.flxAllContent.skin="sknRedUL";
        this.view.lblDownloaded.skin="activeFilterText";
        this.view.flxDownloadedContent.skin="sknWhiteUL";
        this.view.lblBookmarked.skin="activeFilterText";
        this.view.flxBookmarkedContent.skin="sknWhiteUL";
        this.view.flxAllContentLine.isVisible = true;
        this.view.flxDonwloadedContentLine.isVisible = false;
        this.view.flxBookmarkedContentLine.isVisible = false;
        kony.print("Sreeni >> fetching all the offline content");
        try{
          var offlineContent = retrieveJson("offlineContent");
          for (var key in offlineContent) {
            if(isNetworkAvailable()){
              if(offlineContent[key]["isBookmarked"] || offlineContent[key]["isDownloaded"]  ){
                offlineContentList.push(offlineContent[key]);
              }
            }else{
              if(offlineContent[key]["isDownloaded"]){
                if(offlineContent[key]["isBookmarked"] || offlineContent[key]["isDownloaded"]  ){
                  offlineContentList.push(offlineContent[key]);
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
        }
        for(var i=0;i<offlineContentList.length;i++){
          offlineContentList[i].btnShare.onClick = mycontentListComponentReference.onClickOfShareButton;
          offlineContentList[i].btnDownload.onClick = mycontentListComponentReference.onClickOfDownloadButton;
          offlineContentList[i].btnBookmark.onClick = mycontentListComponentReference.onClickOfBookmarkButton;
        }
        sortedContentList = kony.table.sort(offlineContentList, "updatedDate");
        kony.print("sortedAllContent :"+JSON.stringify(sortedContentList));

        this.view.segHomePageContent.setData(sortedContentList);
        swipedContent=0;
      }
    },

    getMyContentListDownloaded:function()
    {
      currentTab=1;
      if(!this.view.flxDonwloadedContentLine.isVisible){
        animate2(this.view.filterContentV2,{"left":"100%"},{"left":"0%"}); 
        var offlineContentList = [];
        this.view.segHomePageContent.removeAll();
        this.view.lblAllContent.skin="activeFilterText";
        this.view.flxAllContent.skin="sknWhiteUL";
        this.view.lblDownloaded.skin="activeFilterText";
        this.view.flxDownloadedContent.skin="sknRedUL";
        this.view.lblBookmarked.skin="activeFilterText";
        this.view.flxBookmarkedContent.skin="sknWhiteUL";
        this.view.flxAllContentLine.isVisible = false;
        this.view.flxDonwloadedContentLine.isVisible = true;
        this.view.flxBookmarkedContentLine.isVisible = false;

        kony.print("Sreeni >> fetching download only offline content");
        try{
          var offlineContent = retrieveJson("offlineContent");
          for (var key in offlineContent) { 
            if(offlineContent[key]["isDownloaded"]  ){
              offlineContentList.push(offlineContent[key]);
            }
          }
        }catch(e){}
        if(isBlankOrNull(offlineContentList)){
          this.view.flxDownloadOffline.isVisible = true;
          this.view.flxBookmarkedOffline.isVisible = false;
          this.view.flxDownloadOrBookmarkOffline.isVisible = false;
          return;
        }else{
          this.view.flxDownloadOffline.isVisible = false;
          this.view.flxBookmarkedOffline.isVisible = false;
          this.view.flxDownloadOrBookmarkOffline.isVisible = false;
        }
        for(var i=0;i<offlineContentList.length;i++){
          offlineContentList[i].btnShare.onClick = mycontentListComponentReference.onClickOfShareButton;
          offlineContentList[i].btnDownload.onClick = mycontentListComponentReference.onClickOfDownloadButton;
          offlineContentList[i].btnBookmark.onClick = mycontentListComponentReference.onClickOfBookmarkButton;
        }
        var sortedDownloadedContent = kony.table.sort(offlineContentList, "updatedDate");
        kony.print("sortedDownloadedContent :"+JSON.stringify(sortedDownloadedContent));
        //  animate(this.view.filterContentV2,{"left":"-100%"});

        this.view.segHomePageContent.setData(sortedDownloadedContent);
        swipedContent=0;
      }
    },

    getMyContentListBookmarked:function()
    {
      currentTab=2;
      if(!this.view.flxBookmarkedContentLine.isVisible){

        animate2(this.view.filterContentV2,{"left":"100%"},{"left":"0%"}); 
        var offlineContentList = [];
        this.view.segHomePageContent.removeAll();
        this.view.lblAllContent.skin="activeFilterText";
        this.view.flxAllContent.skin="sknWhiteUL";
        this.view.lblDownloaded.skin="activeFilterText";
        this.view.flxDownloadedContent.skin="sknWhiteUL";
        this.view.lblBookmarked.skin="activeFilterText";
        this.view.flxBookmarkedContent.skin="sknRedUL";
        this.view.flxAllContentLine.isVisible = false;
        this.view.flxDonwloadedContentLine.isVisible = false;
        this.view.flxBookmarkedContentLine.isVisible = true;
        kony.print("Sreeni >> fetching bookmark only offline content");
        try{
          var offlineContent = retrieveJson("offlineContent");
          for (var key in offlineContent) { 

            if(isNetworkAvailable()){
              if(offlineContent[key]["isBookmarked"]  ){
                offlineContentList.push(offlineContent[key]);
              }
            }else{  
              if(offlineContent[key]["isDownloaded"]  ){
                if(offlineContent[key]["isBookmarked"]  ){
                  offlineContentList.push(offlineContent[key]);
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
        for(var i=0;i<offlineContentList.length;i++){
          offlineContentList[i].btnShare.onClick = mycontentListComponentReference.onClickOfShareButton;
          offlineContentList[i].btnDownload.onClick = mycontentListComponentReference.onClickOfDownloadButton;
          offlineContentList[i].btnBookmark.onClick = mycontentListComponentReference.onClickOfBookmarkButton;
        }
        var sortedBookmarkedContent = kony.table.sort(offlineContentList, "updatedDate");
        kony.print("sortedBookmarkedContent :"+JSON.stringify(sortedBookmarkedContent));
        //  animate(this.view.filterContentV2,{"left":"-100%"});
        this.view.segHomePageContent.setData(sortedBookmarkedContent);

        swipedContent=0;
      }

    },


    onClickOfDownloadButton: function() {
      try{
        kony.print("Sreeni >> on click of download button");
        var selectedIndex = mycontentListComponentReference.view.segHomePageContent.selectedIndex[1];
        var contentObj = mycontentListComponentReference.view.segHomePageContent.selectedItems;
        kony.print("selecte item is :: " + JSON.stringify(contentObj));
        var contentObject = contentObj[0];
        var contentDownloadable = contentObject.isDownload;
        kony.print("contentDownloadable :: " + contentDownloadable+"");
        if(contentDownloadable == "true"){
          var contentDownloaded = contentObject.isDownloaded;
          kony.print("contentDownloaded :: " + contentDownloaded+"");
          if(contentDownloaded)
          {
            if(isIOS()){
              var docPath = kony.io.FileSystem.getDataDirectoryPath();
              kony.print("Kony doc directory path is:"+docPath);
              var path = docPath.replace("Library","Documents");
              kony.print("final path is:"+path);
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
            }

            contentObject.offlineURL = null;
            contentObject.isDownloaded = false;
            contentObject.btnDownload.skin = "sknBtnDownload";
            //             if(this.view.flxDonwloadedContentLine.isVisible || (this.view.flxAllContentLine.isVisible && !(contentObject.isBookmarked))){
            //                mycontentListComponentReference.view.segHomePageContent.removeAt(selectedIndex);
            //                if(mycontentListComponentReference.view.segHomePageContent.data.length == 0 || mycontentListComponentReference.view.segHomePageContent.data.length==null){
            //                	 this.view.flxDownloadOffline.isVisible = true;
            //                }else{
            //                  this.view.flxDownloadOffline.isVisible = false;
            //                }
            //             }
            if(this.view.flxDonwloadedContentLine.isVisible){
              mycontentListComponentReference.view.segHomePageContent.removeAt(selectedIndex);
              if(mycontentListComponentReference.view.segHomePageContent.data.length == 0 || mycontentListComponentReference.view.segHomePageContent.data.length==null){
                this.view.flxDownloadOffline.isVisible = true;
              }else{
                this.view.flxDownloadOffline.isVisible = false;
              }
            }else if((this.view.flxAllContentLine.isVisible && !(contentObject.isBookmarked))){
              mycontentListComponentReference.view.segHomePageContent.removeAt(selectedIndex);
              if(mycontentListComponentReference.view.segHomePageContent.data.length == 0 || mycontentListComponentReference.view.segHomePageContent.data.length==null){
                this.view.flxDownloadOrBookmarkOffline.isVisible = true;
              }else{
                this.view.flxDownloadOrBookmarkOffline.isVisible = false;
              }
            }
            else{
              mycontentListComponentReference.view.segHomePageContent.setDataAt(contentObject, selectedIndex);
            }
          }
          else if(contentObject.isDownloading){
            kony.print("content already downloading!!")
            return;
          }else if(contentObject.isPaused){
            kony.print("content already paused!!")
            return;
          }
          else{
            //Show loading and start downloading after finished do the below
            //store file path and
            if(isIOS()){

              if (!isNetworkAvailable()) {
                return;
              } else {
                if(undefined == contentObject.url || null == contentObject.url || typeof(contentObject.url) == "object"){
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
                  if(null!==contentObject.url){
                    kony.print("sreeni URL is not null"+contentObject.url);
                    mycontentListComponentReference.startDownload(contentObject,selectedIndex);
                    return;
                  }
                  else{
                    kony.print("content url missed "+getI18Value("ContentUrlMissed"));
                    controllerReference.infoPopupOn(getI18Value("ContentUrlMissed"));
                    contentObject.flxDownloadOverlay = { onClick : function(){},isVisible:false}
                    contentObject.btnDownload = {skin:"sknBtnDownload", onClick: this.onClickOfDownloadButton};
                  }

                }else{
                  kony.print("sreeni URL is not null"+contentObject.url);
                  mycontentListComponentReference.startDownload(contentObject,selectedIndex);
                  return;
                }
              }
              //kony.print("returning as there is no download funcitonality on home page");

            }
            else if(isAndroid()){
              kony.print("Downloading for android started");
            }
            //             contentObject.offlineURL = "Actual url here";
            //             contentObject.isDownloaded = true;
            //             contentObject.btnDownload.skin = "sknBtnDownloadActive";
            //             mycontentListComponentReference.view.segHomePageContent.setDataAt(contentObject, selectedIndex);
          }

          //segmentData[selectedIndex] = contentObject;
          //storeJson("globalContent", segmentData);
          //          try{
          //           	 var offlineContent = retrieveJson("offlineContent");
          //             if(contentObject.isDownloaded || contentObject.isBookmarked  ){
          //               offlineContent[contentObject["UID"]] = contentObject;
          //               storeJson("offlineContent", offlineContent);
          //             }else{
          //               delete offlineContent[contentObject["UID"]];
          //               storeJson("offlineContent", offlineContent);
          //             }

          mycontentListComponentReference.view.segHomePageContent.setDataAt(contentObject, selectedIndex);


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

        //Update the row
        mycontentListComponentReference.setDownloadProgress(1,content,index);

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
        DownloadManagerObject.startDownloadJs(content);
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
      mycontentListComponentReference.setOverlayView(PROGRESS_TYPE, content, index);
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

        }else if(DOWNLOAD_STATUS == 2){ //When paused
          kony.print("In object paused");
          content.flxDownloadOverlay = {isVisible:true, onClick : function(){}};
          content.btnPauseDownload = {onClick:this.pauseDownload,isVisible:false};
          content.loaderActive = {src:"wheel1.gif",isVisible:false};
          content.btnPlayDownload = {isVisible:true,onClick:this.playDownload};
          content.loaderInactive = {isVisible:true,src:"wheel.png"};

        }else{//when cancelled or not downloading
          content.btnPauseDownload = {isVisible:true,onClick:this.pauseDownload}
          content.loaderActive = {isVisible:true,src:"wheel1.gif"};
          content.btnPlayDownload = {isVisible:true,onClick:this.playDownload};
          content.loaderInactive = {src:"wheel.png",isVisible:false};
          content.flxDownloadOverlay = {onClick : function(){},isVisible:false};
        }
        kony.print("Data before setting to segment:"+JSON.stringify(content));
        mycontentListComponentReference.view.segHomePageContent.setDataAt(content, index);
        mycontentListComponentReference.setOfflineData(content);
      }catch(e){
        kony.print("Exception in setoverlay"+e);
      }
    },

    setOfflineData:function(content){
      try{
        var offlineContent = retrieveJson("offlineContent");
        if(isBlankOrNull(offlineContent))offlineContent = {}
        if(content.isDownloaded || content.isBookmarked || content.isDownloading || content.isPaused  ){
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
            for (var i = 0; i < sources.length; i++) {
              if (!isBlankOrNull(sources[i]["src"]) && sources[i]["src"].indexOf("mp4") != -1) {
                kony.print("Sreeni >>>>> final URL is : " + sources[i]["src"] + "is downloading is ");
                gblData.url = sources[i]["src"];
                break;
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
            mycontentListComponentReference.startDownload(gblData,gblIndex);
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
          mobileFabricConfiguration.integrationObj.invokeOperation(operationName, headers, dataToService, mycontentListComponentReference.getBrightCoveDataSuccessCallback, mycontentListComponentReference.getBrightCoveDataErrorCallback);
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
        var selectedIndex = mycontentListComponentReference.view.segHomePageContent.selectedIndex[1];
        var contentObj = mycontentListComponentReference.view.segHomePageContent.selectedItems;
        kony.print("selected item is :: " + JSON.stringify(contentObj));
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
    onClickOfBookmarkButton: function() {

      var selectedIndex = mycontentListComponentReference.view.segHomePageContent.selectedIndex[1];
      var contentObj = mycontentListComponentReference.view.segHomePageContent.selectedItems;
      kony.print("selecte item is :: " + JSON.stringify(contentObj));
      var contentBookmarked = contentObj[0].isBookmarked;
      kony.print("isBookmarked :: " + contentBookmarked+"");
      if(contentBookmarked){
        contentObj[0].isBookmarked = false;
        contentObj[0].btnBookmark.skin = "sknBookmark";
        if(this.view.flxBookmarkedContentLine.isVisible ){
          mycontentListComponentReference.view.segHomePageContent.removeAt(selectedIndex);
          if(mycontentListComponentReference.view.segHomePageContent.data.length == 0 || mycontentListComponentReference.view.segHomePageContent.data.length==null){
            this.view.flxBookmarkedOffline.isVisible = true;
          }else{
            this.view.flxBookmarkedOffline.isVisible = false;
          }
        }else if((this.view.flxAllContentLine.isVisible && !(contentObj[0].isDownloaded))){
          mycontentListComponentReference.view.segHomePageContent.removeAt(selectedIndex);
          if(mycontentListComponentReference.view.segHomePageContent.data.length == 0 || mycontentListComponentReference.view.segHomePageContent.data.length==null){
            //this.view.flxDownloadOffline.isVisible = true;
            this.view.flxDownloadOrBookmarkOffline.isVisible = true;
          }else{
            //this.view.flxDownloadOffline.isVisible = false;
            this.view.flxDownloadOrBookmarkOffline.isVisible = false;
          }
        }
        else{
          mycontentListComponentReference.view.segHomePageContent.setDataAt(contentObj[0], selectedIndex);
        }
      }else{
        contentObj[0].isBookmarked = true;
        contentObj[0].btnBookmark.skin = "sknBookmarkActive";
        mycontentListComponentReference.view.segHomePageContent.setDataAt(contentObj[0], selectedIndex);
      }
      try{
        kony.print("bookmarking item::"+JSON.stringify(contentObj[0]));
        kony.print("bookmarking item::"+contentObj[0]["UID"])
        var offlineContent = retrieveJson("offlineContent");
        if(contentObj[0].isDownloaded || contentObj[0].isBookmarked  ){
          offlineContent[contentObj[0]["UID"]] = contentObj[0];
          storeJson("offlineContent", offlineContent);
        }else{
          delete offlineContent[contentObj[0]["UID"]];
          storeJson("offlineContent", offlineContent);
        }
      }catch(e){kony.print("exception occured"+e);}
    },


    updateProgressCallback:function(object,percentage){
      kony.print("my content update progress callback");
    },

    cancelDownload: function(content,index) {

      try{
        if(isIOS()){
        //Update the row
        /*var offlineContent = retrieveJson("offlineContent");
      if(isBlankOrNull(offlineContent) && !isBlankOrNull(offlineContent[contentObject["UID"]]) ){
        var contentObj = offlineContent[contentObject["UID"]];
        kony.print("offline content url is "+contentObj.url);
        contentObject.url = contentObj.url;
      }	*/
        mycontentListComponentReference.setDownloadProgress(3,content,index);	

        //update online data	if user searches the data we are searching in segData	
        for(var i=0;i<segmentData.length;i++){
          if(content["UID"] == segmentData[i]["UID"]){
            segmentData[i].btnDownload.skin = "sknBtnDownload";
            segmentData[i].isDownloaded = false ;
            segmentData[i].isPaused = false ;
            segmentData[i].isDownloading = false ;
            segmentData[i].PausedPercent = "";
            segmentData[i].offlineUrl = "";
          }
        }

        DownloadManagerObject.cancelDownloadJs(content);
        }

        if(isAndroid()){
        kony.print("cancel clicked");
        controllerReference.setOverlayView(3,content,index);
        //controllerReference.view.ContentDetailCard.downloadOverlay.lblDownloadProgress.text = content.downloadStatus;
        var id = gblUID;
        var obj = getDprObj(id);
        obj.stopDownload();
        kony.print("pauseDownload1 --- END");
        }
      }catch(e){
        kony.print("Exception in cancel download:"+e);
      }

    },


    pauseDownload: function() {
      try{
        if(isIOS()){
        DownloadManagerObject.pauseDownloadJs(contentObject);
        kony.print("pause clicked");
        if(undefined == mycontentListComponentReference.view.segHomePageContent.selectedIndex[1] || null == mycontentListComponentReference.view.segHomePageContent.selectedIndex[1]){
          kony.print("pauseDownload no selected index so returning");
          return;
        }

        var selectedIndex = mycontentListComponentReference.view.segHomePageContent.selectedIndex[1];
        var contentObj = mycontentListComponentReference.view.segHomePageContent.selectedItems;
        kony.print("selecte item is :: " + JSON.stringify(contentObj));
        var contentObject =  contentObj[0];

        var offlineContent = retrieveJson("offlineContent");
        if(isBlankOrNull(offlineContent) && !isBlankOrNull(offlineContent[contentObject["UID"]]) ){
          var contentObj = offlineContent[contentObject["UID"]];
          kony.print("offline content url is "+contentObj.url);
          contentObject.url = contentObj.url;
        }	
        kony.print("pause clicked");
        //Set the row view      
        contentObject.PausedPercent = contentObject.lblDownloadProgress.text.substring(15);
        mycontentListComponentReference.setDownloadProgress(2,contentObject,selectedIndex);	
        //update online data		
        for(var i=0;i<segmentData.length;i++){
          if(contentObject["UID"] == segmentData[i]["UID"]){
            segmentData[i].btnDownload.skin = "sknBtnDownload";
            segmentData[i].isDownloaded = false ;
            segmentData[i].isPaused = true ;
            segmentData[i].isDownloading = false ;
            segmentData[i].PausedPercent = contentObject.lblDownloadProgress.text.substring(15);
            segmentData[i].offlineUrl = "";

          }
        }
        

        }

        if(isAndroid()){
        kony.print("pause clicked");
        controllerReference.setDownloadProgress(2,contentObject,selectedIndex);	
        //controllerReference.view.ContentDetailCard.downloadOverlay.lblDownloadProgress.text = gblData.downloadStatus;
        var id = gblUID;
        var obj = getDprObj(id);
        obj.stopDownload();
        kony.print("pauseDownload1 --- END");
        }
      }catch(e){
        kony.print("Exception in pauseDownload:"+e);
      }

    },
    playDownload: function() {

      try{
        if(isIOS()){
        kony.print("resume clicked");  
        if(undefined == mycontentListComponentReference.view.segHomePageContent.selectedIndex[1] || null == mycontentListComponentReference.view.segHomePageContent.selectedIndex[1]){
          kony.print("playDownload no selected index so returning");
          return;
        }
        var selectedIndex = mycontentListComponentReference.view.segHomePageContent.selectedIndex[1];
        var contentObj = mycontentListComponentReference.view.segHomePageContent.selectedItems;
        kony.print("selecte item is :: " + JSON.stringify(contentObj));
        var contentObject =  contentObj[0];  
        var offlineContent = retrieveJson("offlineContent");
        if(isBlankOrNull(offlineContent) && !isBlankOrNull(offlineContent[contentObject["UID"]]) ){
          var contentObj = offlineContent[contentObject["UID"]];
          kony.print("offline content url is "+contentObj.url);
          contentObject.url = contentObj.url;
        }	
        //Update row
        mycontentListComponentReference.setDownloadProgress(1,contentObject,selectedIndex);
        //update online data		
        for(var i=0;i<segmentData.length;i++){
          if(contentObject["UID"] == segmentData[i]["UID"]){
            segmentData[i].btnDownload.skin = "sknBtnDownload";
            segmentData[i].isDownloaded = false ;
            segmentData[i].isPaused = false ;
            segmentData[i].isDownloading = true ;
            segmentData[i].PausedPercent = "";
            segmentData[i].offlineUrl = "";          
          }
        }	
        DownloadManagerObject.resumeDownloadJs(contentObject);
        }

        if(isAndroid()){
        controllerReference.setDownloadProgress(1);
        //controllerReference.setOverlayView(1);
        this.startDownloadAnd();
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
          for(var i=0;i<segmentData.length;i++){
            if(object["UID"] == segmentData[i]["UID"]){
              index = i;
              break;
            }
          }	
          mycontentListComponentReference.cancelDownload(object,index);
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
        for(var i=0;i<sortedContentList.length;i++){
          if(object["UID"] == sortedContentList[i]["UID"]){
            index = i;//TODO what if two urls are same
            break;
          }
        }
        /*   for(var i=0;i<segmentData.length;i++){
        if(object["UID"] == segmentData[i]["UID"]){
          segmentData[i]=object;
		  break;
        }
      }
      */

        if(undefined != index && null != index){

          mycontentListComponentReference.view.segHomePageContent.setDataAt(object, index);
        }

      }catch(e){
        kony.print("Exception in homepage finish method:"+e);
      }

    },


    segmentRowClicked: function() {
      // if(!swipedContent){
      kony.print("Sreeni >> Segment row clicked")
      var data = this.view.segHomePageContent.selectedRowItems[0];
      kony.print("data : " + JSON.stringify(data));

      mycontentFlag=true;
      var nav = new kony.mvc.Navigation("contentdetailpage");
      nav.navigate(data);
      //}

    }
  };
});