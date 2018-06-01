define(function() {

    return {
      constructor: function(baseConfig, layoutConfig, pspConfig) {
        
	    contentDetailRefObj = this;
        if(kony.os.deviceInfo().name=="iPad"){
			
          this.view.lstBoxLangSettings.left="25%";
        }
        this.view.closeOverlay.onClick = this.onCloseOverlay.bind(this);
        this.view.btnPauseDownload.onClick = this.pauseDownload.bind(this);
        this.view.btnPlayDownload.onClick = this.playDownload.bind(this);
        
        this.view.imgContentDetail.onTouchStart = this.contentImageOnTouchStart.bind(this);
        
        this.view.lstBoxLangSettings.onSelection = this.goToLanguageContent.bind(this, data);

        this.view.downloadOverlay.onTouchStart = function() {
          kony.print("waiting for someone to write something amazing.Why not you?");
        };
      },
      
      lstBoxSelOption: function(){
      	return contentDetailRefObj.view.lstBoxLangSettings.selectedKey;
      },
      setLstBoxSelOption: function(op){
       contentDetailRefObj.view.lstBoxLangSettings.selectedKey = op;
      },
      imgConDetBase64: function(){
        return contentDetailRefObj.view.ContentDetailCard.imgContentDetail.base64;
      },
      setImgConDetBase64: function(base64val){
        contentDetailRefObj.view.ContentDetailCard.imgContentDetail.base64 = base64val;
      },
      onCloseOverlay: function() {
        try {
          //callTealiumOnClick("click_action", "Cancel_Download",["closeOverlay"],gblVisitor_imcID);
          var onClickDetails = {
            "event_name":"click_action",
            "click_detail":"Cancel_Download"
          };
          callTealiumOnClick(onClickDetails,["closeOverlay"], false);
          contentDetailRefObj.cancelDownload();
        } catch (e) {
          kony.print("Exception in onCloseOverlay" + e);
        }
      },
      cancelDownload: function() {
        try {

          if(contentDetailRefObj.view.downloadOverlay.lblDownloadProgress.text == "Downloading... "){
            kony.print("Download didnt start");
            contentDetailRefObj.setDownloadProgress(3);
            contentDetailRefObj.setOverlayView(3);
            return;
          }
          //#ifdef android
          kony.print("cancel clicked");
          var id = gblAppData["UID"];

          if(gblAppData["contentType"]=="video"){
            id=id+".mp4";
          }else if(gblAppData["contentType"]=="pdf"){
            id=id+".pdf";
          }
          var obj = getDprObj(id);
          obj.stopDownload();
          kony.print("pauseDownload1 --- END");

          //removing the temp files
          var docPath = kony.io.FileSystem.getDataDirectoryPath();
          kony.print("Kony doc directory path is:" + docPath);
          var path = docPath.replace("files", "");
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
            // path=kony.io.FileSystem.getExternalStorageDirectoryPath() + "/Download";
            kony.print("video downloaded");
            var filePath ="";


            var filePath = path + "/" + gblAppData.UID + ".mp4";
            var file = new kony.io.File(filePath);
            kony.print("filePath inside toggle is" + filePath);
            if (file.exists()) {
              kony.print("mp4 file exists in the path");
              file.remove();
              kony.print("mp4 file removed check the size");
            }
          }

          //#endif

          //#ifdef iphone  
          DownloadManagerObject.cancelDownloadJs(gblAppData);
          //#endif

          //Update the UI and state
          contentDetailRefObj.setDownloadProgress(3);
          contentDetailRefObj.setOverlayView(3);
          //update online data	if user searches the data we are searching in segData	
          for (var i = 0; i < segmentData.length; i++) {
            if (gblAppData["UID"] == segmentData[i]["UID"]) {
              segmentData[i].btnDownload.skin = "sknBtnDownload";
              segmentData[i].isDownloaded = false;
              segmentData[i].isPaused = false;
              segmentData[i].isDownloading = false;
              segmentData[i].PausedPercent = "";
            }
          }
          contentDetailRefObj.setOfflineData(); //Offline data for home page refresh
          contentDetailRefObj.view.downloadOverlay.lblDownloadProgress.text = "Downloading... ";

        } catch (e) {
          contentDetailRefObj.setDownloadProgress(3);
          contentDetailRefObj.setOverlayView(3);
          kony.print("Exception in cancel download:" + e);
        }
      },
      setDownloadProgress: function(PROGRESS_TYPE) {
        kony.print("[Sreeni] setDownloadProgress "+PROGRESS_TYPE);
        if (PROGRESS_TYPE == 1) { //start download/play download
          gblAppData.isDownloading = true;
          gblAppData.PausedPercent = "";
          gblAppData.isPaused = false;
          gblAppData.isDownloaded = false;
          gblAppData.btnDownload.skin = "sknBtnDownload";
        } else if (PROGRESS_TYPE == 2) { //pause download
          gblAppData.isDownloading = false;
          gblAppData.isPaused = true;
          gblAppData.isDownloaded = false;
          gblAppData.btnDownload.skin = "sknBtnDownload";
        } else { //Cancel
          gblAppData.isDownloading = false;
          gblAppData.isPaused = false;
          gblAppData.PausedPercent = "";
          gblAppData.isDownloaded = false;
          gblAppData.btnDownload.skin = "sknBtnDownload";
        }
      },
      setOverlayView: function(DOWNLOAD_STATUS) {
        kony.print("[Sreeni] setDownloadProgress "+DOWNLOAD_STATUS);
        //not downloading or while downloading
        if (DOWNLOAD_STATUS == 1) {
          gblAppData.flxDownloadOverlay = {
            isVisible: true,
            onClick: function() {}
          };
          contentDetailRefObj.view.downloadOverlay.isVisible = true;

          contentDetailRefObj.view.btnPauseDownload.isVisible = true;
          contentDetailRefObj.view.closeOverlay.isVisible = true;
          contentDetailRefObj.view.btnPauseDownload.zIndex = 4;
          contentDetailRefObj.view.loaderActive.isVisible = true;
          contentDetailRefObj.view.btnPlayDownload.zIndex = 0;
          contentDetailRefObj.view.btnPlayDownload.isVisible = false;
          contentDetailRefObj.view.loaderInactive.isVisible = false;
        } else if (DOWNLOAD_STATUS == 2) { //When paused
          gblAppData.flxDownloadOverlay = {
            isVisible: true,
            onClick: function() {}
          };
          contentDetailRefObj.view.downloadOverlay.isVisible = true;
          contentDetailRefObj.view.btnPauseDownload.zIndex = 0;
          contentDetailRefObj.view.btnPauseDownload.isVisible = false;
          contentDetailRefObj.view.loaderActive.isVisible = false;
          contentDetailRefObj.view.btnPlayDownload.isVisible = true;
          contentDetailRefObj.view.btnPlayDownload.zIndex = 4;
          contentDetailRefObj.view.loaderInactive.isVisible = true;
        } else { //Cancel
          gblAppData.flxDownloadOverlay = {
            onClick: function() {},
            isVisible: false
          };
          contentDetailRefObj.view.btnPauseDownload.isVisible = true;
          contentDetailRefObj.view.btnPauseDownload.zIndex = 4;
          contentDetailRefObj.view.loaderActive.isVisible = true;
          contentDetailRefObj.view.btnPlayDownload.zIndex = 0;
          contentDetailRefObj.view.btnPlayDownload.isVisible = false;
          contentDetailRefObj.view.loaderInactive.isVisible = false;
          contentDetailRefObj.view.downloadOverlay.isVisible = false;
        }
      },
      setOfflineData: function() {
        try {
          var offlineContent = retrieveJsonAllLanguages("offlineContent");
          if (isBlankOrNull(offlineContent)) offlineContent = {};
          var expr =  !isBlankOrNull(gblAppData["otherLanguageDownload"]) && gblAppData["otherLanguageDownload"];
          kony.print("NSR@@ other language download "+expr);
          if (gblAppData.isDownloaded || gblAppData.isBookmarked || gblAppData.isDownloading || gblAppData.isPaused || expr) {
            offlineContent[gblAppData["UID"]] = gblAppData;
            storeJson("offlineContent", offlineContent);
          } else {
            delete offlineContent[gblAppData["UID"]];
            storeJson("offlineContent", offlineContent);
          }
        } catch (e) {
          kony.print("Exception in setOfflineData" + e);
        }
      },
      
      pauseDownload: function() {
        try {
          if(contentDetailRefObj.view.downloadOverlay.lblDownloadProgress.text == "Downloading... "){
            kony.print("Download didnt start");
            return;
          }
          var contentId = gblAppData.FullTitle;
          //this.trackEventAnalytics("Download", "Download_pause", contentId);
          var onClickDetails = {
            "event_name":"click_action",
            "click_detail":"Download_pause",
            "content_id": contentId
          };
          callTealiumOnClick(onClickDetails,["btnPauseDownload"], false);
          //#ifdef iphone
          DownloadManagerObject.pauseDownloadJs(gblAppData);
          //#endif

          //#ifdef android
          kony.print("AND download pause");
          var id = gblAppData["UID"];

          if(gblAppData["contentType"]=="video"){
            id=id+".mp4";
          }else if(gblAppData["contentType"]=="pdf"){
            id=id+".pdf";
          }
          var obj = getDprObj(id);
          obj.stopDownload();
          //#endif
          var offlineContent = retrieveJsonAllLanguages("offlineContent");
          if (isBlankOrNull(offlineContent)) {
            kony.print("There is no offline content");
            return;
          } else {            
            if (!isBlankOrNull(offlineContent[gblAppData["UID"]]))
              var contentObj = offlineContent[gblAppData["UID"]];
            kony.print("pauseDownload offline content url is " + contentObj.url);
            gblAppData.url = contentObj.url;
          }
          kony.print("pause clicked");
          contentDetailRefObj.setOverlayView(2);
          contentDetailRefObj.setDownloadProgress(2);
          gblAppData.PausedPercent = contentDetailRefObj.view.downloadOverlay.lblDownloadProgress.text.substring(15);
          //update online data		
          for (var i = 0; i < segmentData.length; i++) {
            if (gblAppData["UID"] == segmentData[i]["UID"]) {
              segmentData[i].btnDownload.skin = "sknBtnDownload";
              segmentData[i].isDownloaded = false;
              segmentData[i].isPaused = true;
              segmentData[i].isDownloading = false;
              segmentData[i].PausedPercent = contentDetailRefObj.view.downloadOverlay.lblDownloadProgress.text.substring(15);
            }
          }
          contentDetailRefObj.setOfflineData(); //offline ->for home page refresh issue

        } catch (e) {
          kony.print("Exception in pauseDownload:" + e);
        }

      },
      playDownload: function() {
        try {
          var offlineContent = retrieveJsonAllLanguages("offlineContent");
          if (isBlankOrNull(offlineContent)) {
            kony.print("There is no offline content");
            return;
          } else {
            if (!isBlankOrNull(offlineContent[gblAppData["UID"]]))
              var contentObj = offlineContent[gblAppData["UID"]];
            kony.print("playDownload offline content url is " + contentObj.url);
            gblAppData.url = contentObj.url;
          }

          kony.print("resume clicked");
          contentDetailRefObj.setOverlayView(1);
          contentDetailRefObj.setDownloadProgress(1);
          //update online data		
          for (var i = 0; i < segmentData.length; i++) {
            if (gblAppData["UID"] == segmentData[i]["UID"]) {
              segmentData[i].btnDownload.skin = "sknBtnDownload";
              segmentData[i].isDownloaded = false;
              segmentData[i].isPaused = false;
              segmentData[i].isDownloading = true;
              segmentData[i].PausedPercent = "";
            }
          }
          //offline ->for home page refresh issue
          contentDetailRefObj.setOfflineData();

          //#ifdef iphone
          DownloadManagerObject.resumeDownloadJs(gblAppData);
          //#endif

          //#ifdef android
          kony.print("AND download resume");
          var id = gblAppData["UID"];
          if(gblAppData["contentType"]=="video"){
            id=id+".mp4";
          }else if(gblAppData["contentType"]=="pdf"){
            id=id+".pdf";
          }
          var obj = getDprObj(id);

          if (gblAppData["contentType"] === "video") {
            //  obj.startDownloadUsingDM(gblAppData.url, id); //FFI call only for Video

            obj.startDownload(gblAppData.url, id);
          } else {
            obj.startDownload(gblAppData.url, id); //FFI call
          }
          //#endif
        } catch (e) {
          kony.print("Exception in playDownload:" + e);
        }
      },
      
      contentImageOnTouchStart: function() {
        kony.print("gblAppData in onTouchStart is : " + JSON.stringify(gblAppData));
        var data = JSON.parse(JSON.stringify(gblAppData));


        var selLanguage = contentDetailRefObj.view.lstBoxLangSettings.selectedKey;
        var contentType = data["contentType"];
        var languageUrls = [];
        var contentId = data.FullTitle;


        try{
          var contentTypeOpen;
          if(contentType === "video" || contentType ==="brightCoveVideo"){
            contentTypeOpen = "open video";
          }else if(contentType === "pdf"){
            contentTypeOpen = "open pdf";
          }else if(contentType === "ebook"){
            contentTypeOpen = "open ebook";
          }else{
            contentTypeOpen = "open other";
          }

          kony.print("jani >>> contenttype "+contentType+" full title "+contentId);
          //this.videoPlayTealiumOnClick("click_action", videoName);
          /*      var platform = getDevicePlatform();
      var data1 = {
        "app_type": platform, //ios or android sent by OS of the device
        "app_country": "in",
        "app_language": getDeviceLanguage(),
        "app_digitalProperty": "Amway Business app",
        "app_region": "eia",
        "click_category": "",
        "event_name": "click_action", //"click_action",
        "click_detail":contentTypeOpen,
        "content_type":contentType,
        "content_Id":contentId,
        //"video_name": video_name,//"header login",
        "page_components": ["imgContentDetail"]
      };
      Tealium.trackEvent("button_clicked",JSON.stringify(data1),"eia-hub-app");		*/
          var onClickDetails = {
            "event_name":"click_action",
            "click_detail":contentTypeOpen,
            "content_type":contentType,
            "content_Id":contentId
          };
          callTealiumOnClick(onClickDetails,["imgContentDetail"], false);

        }catch(e){
          kony.print("Exception is "+ e);
        }


        if (contentType !== null && contentType !== undefined) {
          if (contentType === "pdf") {
            languageUrls = data["pdfLanguageUrls"];
          } else if (contentType === "video") {    

            languageUrls = data["videoLanguageUrls"];
            kony.print("videoLanguageUrls "+ JSON.stringify(languageUrls));
          } else if (contentType === "brightCoveVideo") {
            languageUrls = data["brightCoveLanguageUrls"];
          } else if (contentType === "ebook") {
            languageUrls = data["ebookLanguageUrls"];
          }
        }
        var selUrl = "";
        var selVersion=0;
        kony.print(">>>>>>"+ selLanguage +"     "+languageUrls);
        if (languageUrls !== null && languageUrls !== undefined && languageUrls.length > 0) {

          for (var i = 0; i < languageUrls.length; i++) {
            if (selLanguage === languageUrls[i]["language"]) {
              selUrl = languageUrls[i]["url"];
              selVersion=  languageUrls[i]["version"];
              break;
            }
          }
        }
        kony.print("selUrl in contentDetailsPage : " + selUrl);
        if (isBlankOrNull(selUrl)) {
          kony.print("URL is null... can't open");
          kony.print("content url missed " + getI18Value("ContentUrlMissed"));
          controllerReference.infoPopupOn(getI18Value("ContentUrlMissed"));
          return;
        }
        data["url"] = selUrl;
        gblAppData["url"] = selUrl;
        gblAppData["version"] = selVersion;
        if (gblAppData.isDownloaded) {
	      var offlineData;// = null;
          try{
            offlineData = retrieveJsonAllLanguages("offlineContent");
          }catch(e){

          } 


          var tempVersion=0;
          if (data.contentType === "pdf") {

            for(var i=0;i<offlineData[gblAppData["UID"]].pdfLanguageUrls.length;i++){

              if(offlineData[gblAppData["UID"]].pdfLanguageUrls[i].language== selLanguage){
                tempVersion=offlineData[gblAppData["UID"]].pdfLanguageUrls[i].version;
              }

            }


            if(selVersion > tempVersion){
              controllerReference.showContentVersionPopup();
              return;
            }

          }else if(data.contentType === "video"){

            for(var i=0;i<offlineData[gblAppData["UID"]].videoLanguageUrls.length;i++){

              if(offlineData[gblAppData["UID"]].videoLanguageUrls[i].language== selLanguage){
                tempVersion=offlineData[gblAppData["UID"]].videoLanguageUrls[i].version;
              }

            }


            if(selVersion >tempVersion){
              controllerReference.showContentVersionPopup();
              return;
            }

          }



          //#ifdef iphone
          var docPath = kony.io.FileSystem.getDataDirectoryPath();
          kony.print("Kony doc directory path is:" + docPath);
          var path = docPath.replace("Library", "Documents");
          kony.print("final path is:" + path);
          if (data.contentType === "pdf") {
            kony.print("pdfdownloaded");
            var filePath = path + "/" + data.UID + ".pdf";
            var file = new kony.io.File(filePath);
            if (file.exists()) {
              kony.print("pdf file exists in the path")
              DownloadManagerObject.openPdfJs("file://" + filePath);
            }
          } else if (data.contentType === "video") {
            kony.print("video downloaded");
            var filePath = path + "/" + data.UID + ".mp4";
            var file = new kony.io.File(filePath);
            if (file.exists()) {
              kony.print("mp4 file exists in the path")
              controllerReference.playMediaiOS("file://" + filePath);
            }
          }
          //#endif
          //#ifdef android

          var docPath = kony.io.FileSystem.getDataDirectoryPath();
          kony.print("Kony doc directory path is:" + docPath);
          var path = docPath.replace("files", "");
          kony.print("final path is:" + path);
          if (data.contentType === "pdf") {
            kony.print("pdfdownloaded");
            var filePath = path + "/" + data.UID + ".pdf";
            var file = new kony.io.File(filePath);
            if (file.exists()) {
              kony.print("pdf file exists in the path")
              //          var nav = new kony.mvc.Navigation("pdfViewer");
              data.isOnline=false;
              var nav = new kony.mvc.Navigation("customPdfViewer");
              nav.navigate(data);
            }
          } else if (data.contentType === "video") {
            kony.print("video downloaded");
            // path = kony.io.FileSystem.getExternalStorageDirectoryPath();
            kony.print("path : " + path);
            var filePath = path + "/" + data.UID + ".mp4";
            kony.print("video downloaded" + filePath);
            var file = new kony.io.File(filePath);
            if (file.exists()) {
              kony.print("mp4 file exists in the path");
              var nav = new kony.mvc.Navigation("playvideo");
              nav.navigate(data);
            }
          }
          //#endif

        } else {
          if (!isNetworkAvailable()) {
            controllerreference.view.flxToast.setVisibility(true);
            contentDetailRefObj.view.imgContentDetail.setEnabled(false);
            try {
              kony.timer.cancel("timerid");
            } catch (e) {}
            kony.timer.schedule("timerid", contentDetailRefObj.compDisableFlex.bind(contentDetailRefObj), 2, false);
          } 
          else {
            kony.print("Ramu >>> Inside else condition of Image onclick... Network available ::: " + JSON.stringify(data));
            if (data.contentType === "html") {
              kony.print("html");
              selLan = selLanguage;
              var nav = new kony.mvc.Navigation("nutriliteWow");
              nav.navigate(data);
            } else if (data.contentType === "pdf") {
              kony.print("pdf");
              selLan = selLanguage;
              if(isIOS()){
                var nav = new kony.mvc.Navigation("nutriliteWow");
                nav.navigate(data);
              }
              else{
                var nav = new kony.mvc.Navigation("customPdfViewer");
                data.isOnline=true;
                nav.navigate(data);
              }

            }
            else if (data.contentType === "video") {
              selLan = selLanguage;
              var url = data.url.toLowerCase();
              kony.print("video" + url);
              if (url.indexOf("https://players.brightcove.net") != -1) {
                //DownloadingBrightCove = false;
                kony.print("Sreeni url is from brightcove ")
                controllerreference.getBrightCoveVideoData(data);
              } else {
                kony.print("Sreeni url is not from brightcove ")
                var nav = new kony.mvc.Navigation("playvideo");
                nav.navigate(data);
              }
            } else if (data.contentType === "ebook") {
              kony.print("sreeni ebook");
              kony.application.openURL(data.url);
            }
          }
        }
      },
      
      goToLanguageContent: function(data) {
        try{
          var contentType = gblContentType;
          kony.print("Inside goToLanguageContent\n\n\n "+contentType);
          var selectedLanguage = contentDetailRefObj.view.lstBoxLangSettings.selectedKey;

          if(kony.os.deviceInfo().name=="iPad"){

            this.view.ContentDetailCard.lstBoxLangSettings.left="24%";
          }

          selLan=selectedLanguage;
          kony.print("selectedKey is : " + selectedLanguage);
          var languageUrlList = {};
          if (contentType === "pdf") {
            languageUrlList = gblAppData["pdfLanguageUrls"];
          } else if (contentType === "video") {
            languageUrlList = gblAppData["videoLanguageUrls"];
          } else if (contentType === "ebook") {
            languageUrlList = gblAppData["ebookLanguageUrls"];
          } else if (contentType === "brightCoveVideo") {
            languageUrlList = gblAppData["brightCoveLanguageUrls"];
          }
          kony.print("jani >>> contentdetail page languages : " + JSON.stringify(languageUrlList));
          var contentUrl = "";
          if (languageUrlList !== null && languageUrlList !== undefined && languageUrlList.length > 0) {
            for (var i = 0; i < languageUrlList.length; i++) {
              var langRecord = languageUrlList[i];
              if (langRecord["language"] === selectedLanguage) {
                contentUrl = langRecord["url"];
                break;
              }
            }
          }
          kony.print("jani >>> contentdetail page contentUrl : " + contentUrl);
          data["url"] = contentUrl;
          data["UID"] = getUidWithoutLang(data["UID"])+selectedLanguage;
          gblAppData = data;
          var record = null;
          var offlineContent = retrieveJsonAllLanguages("offlineContent");
          kony.print("Offline content for all languages::"+JSON.stringify(offlineContent)+"\n\n\n");
          if (!isBlankOrNull(offlineContent)&& undefined != offlineContent[gblAppData["UID"]] && null != offlineContent[gblAppData["UID"]] ) {
            record = offlineContent[gblAppData["UID"]];
          }
          if(null != record ){
            kony.print("NSR changing lang #1")
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
            kony.print("NSR changing lang #2")
            gblAppData["isDownloaded"] = false;
            if(gblAppData["isDownloaded"]){
              gblAppData.btnDownload.skin = "sknBtnDownload";
            }
            gblAppData["isPaused"] = false;
            gblAppData["PausedPercent"] = "";
            gblAppData["isDownloading"] = false;
            gblAppData["isBookmarked"] = false;
          }
          controllerReference.assignData(gblAppData);
        }catch(e){
          kony.print("Exception in goToLanguageContent::"+e);
        }


        if(kony.os.deviceInfo().model=="iPhone 7 Plus"){


          contentDetailRefObj.view.lstBoxLangSettings.left="35.2%";
        }

      },
      
      compDisableFlex: function() {
        controllerreference.view.flxToast.setVisibility(false);
        try {
          kony.timer.cancel("timerid");
        } catch (e) {}
        contentDetailRefObj.view.imgContentDetail.setEnabled(true);
        //controllerreference.view.flxToast.setVisibility(false);
      },
      
      
      
      
      
    };
});