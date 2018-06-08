//Type your code here
function initDownloadManager(){
  try{
    kony.print("sreeni initialize download manager");
    if(undefined == DownloadManagerObject || null == DownloadManagerObject){
       DownloadManagerObject = new com.kony.download.DownloadManager();
   	   DownloadManagerObject.setCallbacks(updateProgressCallback,finishDownloadCallBackObj);
    }else{
      kony.print("Sreeni already initialized the dm")
    }
  }catch(e){
    kony.print("Error while initializing download manager");
  }
}
function updateProgressCallback(object,percentage){
  var controller;
  var currentForm = kony.application.getCurrentForm().id;
  kony.print("Sreeni current form is ::"+currentForm);
  kony.print("sreeni update progress callback object is"+JSON.stringify(object)+"percentage is "+percentage);
    if (currentForm === "homepage") {
     controller = require("homepageController");
  } else if (currentForm === "contentdetailpage") {
     controller = require("contentdetailpageController");
  }else if(currentForm=="mycontentpage"){
      controller = require("mycontentpageController");
  }else{
    return;
  }
  controller.updateProgressCallback(object,percentage);
}
function setEnglishObjToOffline(enableDownload,tempObj){
    try{
      	//var tempObj = gblAppData;
        if(enableDownload){

          tempObj["btnShare"] =  {
            setEnabled: true,
            skin: "sknShare",
            focusSkin:"sknShareActive"
          };
          tempObj["btnDownload"] = {
              setEnabled: true,
              skin:"sknBtnDownload",
              focusSkin:"sknBtnDownload",
            };
        }else{
          tempObj.url = null;
          tempObj["btnShare"] =  {
            setEnabled: false,
            skin: "sknShareDisable",
            focusSkin:"sknShareDisable"
          };
          tempObj["btnDownload"] = {
              setEnabled: false,
              skin:"sknBtnDownloadDisable",
              focusSkin:"sknBtnDownloadDisable",
            };
        }
          //tempObj.url = url;
         // tempObj["isDownload"] = "false";
          //tempObj["isShareable"] = "false";
          tempObj["flxDownloadOverlay"] = {onClick : function(){},isVisible:false};

          tempObj["isDownloaded"] = false;
          tempObj["isPaused"] = false;
          tempObj["PausedPercent"] = "";
          tempObj["isDownloading"] = false;
          tempObj["otherLanguageDownload"] = true;
       	  tempObj["btnBookmark"] = {
              onClick:this.onClickOfBookmarkButton,
              skin: "sknBookmark"
            };
          tempObj["isBookmarked"] = false;
          var offlineContent = retrieveJsonAllLanguages("offlineContent");
          if (isBlankOrNull(offlineContent)) offlineContent = {}
          offlineContent[tempObj["UID"]] = tempObj;
          storeJson("offlineContent", offlineContent);
      	  //kony.print("")
    }catch(e){
      kony.print("Exception occured in setEnglishObjToOffline "+e);
    }
    
  }
function finishDownloadCallBackObj(object,filePath){
  try{
      var controller = null;
      var currentForm = kony.application.getCurrentForm().id;
      kony.print("Sreeni current form is ::"+currentForm);
      kony.print("sreeni finishDownloadCallBackObj callback object  is"+JSON.stringify(object)+"filePath"+filePath);

    if (currentForm === "homepage") {
      controller = require("homepageController");
    } else if (currentForm === "contentdetailpage") {
      controller = require("contentdetailpageController");
    }else if(currentForm=="mycontentpage"){
      controller = require("mycontentpageController");
    }
      if(!isBlankOrNull(filePath)&& filePath == "ERROR" && null!=controller){
        controller.finishDownloadCallBackObj(object,filePath);
        return;
      }
    	
        object.isDownloaded = true;
        object.isDownload = "true";
        object.isPaused = false;
        object.isDownloading = false;
        object.btnDownload.skin = "sknBtnDownloadActive";
        object.PausedPercent = "";
        object.flxDownloadOverlay = {onClick : function(){},isVisible:false};

        //push  data to offline
        var offlineContent = retrieveJsonAllLanguages("offlineContent");
        if(isBlankOrNull(offlineContent)){
          offlineContent = {};		
        }
          if(!isBlankOrNull(offlineContent[object["UID"]])){
              object.isBookmarked = offlineContent[object["UID"]].isBookmarked;
             if(object.isBookmarked)
                  object.btnBookmark.skin = "sknBookmarkActive";
              else
                  object.btnBookmark.skin = "sknBookmark";
             }
        offlineContent[object["UID"]] = object;
        storeJson("offlineContent", offlineContent);

        //update online data		
        for(var i=0;i<segmentData.length;i++){
          if(object["UID"] == segmentData[i]["UID"]){
            segmentData[i].btnDownload.skin = "sknBtnDownloadActive";
            segmentData[i].isDownloaded = true ;
            segmentData[i].isPaused = false ;
            segmentData[i].isDownloading = false ;
            segmentData[i].PausedPercent = "";
            segmentData[i].flxDownloadOverlay = {onClick : function(){},isVisible:false};
            break;
          }
        }
    	
      if(null != controller)
          controller.finishDownloadCallBackObj(object,filePath);
    	
    	//var plainUid = getUidWithoutLang(object["UID"]);
      	var plainUid = object.UIDPlain;
        var isEnglishContent = (object["UID"].split(plainUid)[1]).toLowerCase() === gblLanguage.toLowerCase();
        //If downloaded content is not in english then also we need to send it to offline as per requirement
        if(!isEnglishContent){
             //var plainUid = getUidWithoutLang(object["UID"]);
             var langFound = false;
             var appLanguageUrl = null;
             var languageUrls = object.contentType === "video" ? object.videoLanguageUrls : object.pdfLanguageUrls;
              kony.print("NSR lang urls :: "+JSON.stringify(languageUrls));
             if (languageUrls !== null && languageUrls !== undefined && languageUrls.length > 0) {
               for (var i = 0; i < languageUrls.length; i++) {
                 var tempLang = languageUrls[i]["language"];
                 if (tempLang === gblLanguage) {
                   appLanguageUrl = languageUrls[i]["url"];
                   langFound = true;
                   break;
                 }
               }
               var engContentObj = object;
               engContentObj.UID = plainUid+gblLanguage;
               engContentObj.url = appLanguageUrl;
               var offlineContent_new = retrieveJsonAllLanguages("offlineContent");
               if(isBlankOrNull(offlineContent_new))  offlineContent_new = {};
               if(!isBlankOrNull( offlineContent_new[engContentObj.UID])){
                 kony.print("entered #1")
                 var newEngContentObj =  offlineContent_new[engContentObj.UID];
                 newEngContentObj["otherLanguageDownload"] = true;
                  offlineContent_new[engContentObj.UID] = newEngContentObj;
                  storeJson("offlineContent", offlineContent_new);
               }
               else if (!langFound) {
                 kony.print("entered #2")
                  setEnglishObjToOffline(false,engContentObj);
               }
               else {
                 kony.print("entered #3")
                 setEnglishObjToOffline(true,engContentObj);
               }
             }
        	}
    
  }catch(e){
    kony.print("Exception in global finish module: "+e);
  }
    
}

function DownloadImageOffline(contentObj){
  try{
    	if(isAndroid()) 
          {
            return;
          }
    	//showLoading();
    	var docPath = kony.io.FileSystem.getDataDirectoryPath();
        var docPathFinal = docPath.replace("Library", "Documents");
        var fileName = contentObj.fileName;
        var filePath = docPathFinal+"/"+fileName;
        kony.print("[sreeni]file Path in homepage is "+filePath);
        var myFile = new kony.io.File(filePath);
        if(myFile.exists()){
          return;
        }
       	var imgUrl = (contentObj.imgContent).replace("\"","");
        gblFileName = contentObj.fileName;
        kony.print("[sreeni] url is "+ imgUrl);
        if(!isBlankOrNull(imgUrl)){
          var httpclient = new kony.net.HttpRequest();
          httpclient.onReadyStateChange = imgDownloadCallBack;
          httpclient.open(constants.HTTP_METHOD_GET, imgUrl);
          httpclient.send();
        }
  }catch(e){
    kony.print("Exception in DownloadImageOffline ::"+e);
  }
}

function imgDownloadCallBack(){
  try{
    kony.print("[sreeni]this.readyState "+this.readyState);
    if (this.readyState == constants.HTTP_READY_STATE_DONE) {
      kony.print("[sreeni]this.responseType "+this.responseType);
      if (this.responseType == constants.HTTP_RESPONSE_TYPE_RAWDATA) {
        var rb = this.response;
        var base64_ = kony.convertToBase64(rb);
        var offlineImageContent = retrieveJsonForImages("offlineImageContent");
        if(isBlankOrNull(offlineImageContent)) offlineImageContent = {};
        kony.print("LKJ LKJ offlineImageContent key in dw "+ JSON.stringify( offlineImageContent));
        offlineImageContent[gblFileName] = base64_;
        storeJson("offlineImageContent",offlineImageContent );
      } else {
        kony.print("[sreeni] responce type is "+ this.responseType);
      }
      //dismissLoading();
    }
  }catch(e){
    //dismissLoading();
    kony.print("Exception is "+e);
  }
}
