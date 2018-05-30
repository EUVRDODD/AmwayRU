//Type your code here

var gblMap = [];
function getDprObj(cid) {
  	kony.print("getDprObj() ---> cid: "+cid);
	var retval = null;
    var count = gblMap.length;
  	kony.print("getDprObj() ---> count: "+count);
    for (var i = 0; i < count; ++i) {
        var cb = gblMap[i];
        if (cb["KEY"] === cid) {
            retval = cb["VALUE"];
            break;
        }
    }
	if(retval == null) {
      	kony.print("getDprObj() ---> creating new reference ");
        var selIndex = Number(gblSelectedIndex) + "";
		var newObj = new com.kony.download.DownloadManagerAnd(cid, selIndex, dprCB);
		var temp = [];
		temp["KEY"] 	= cid;
		temp["VALUE"] 	= newObj;
		gblMap.push(temp);
		retval = newObj;
	}
  	kony.print("getDprObj() ---> cid: "+JSON.stringify(retval));
	return retval;
}
function androidSpecificOtherLangDownloadFinish(contentObject){
  try{
    	var plainUid = getUidWithoutLang(contentObject["UID"]);
        var isEnglishContent = (contentObject["UID"].split(plainUid)[1]).toLowerCase() === gblLanguage.toLowerCase();
        //If downloaded content is not in english then also we need to send it to offline as per requirement
        if(!isEnglishContent){
          var langFound = false;
          var appLanguageUrl = null;
          var languageUrls = contentObject.contentType === "video" ? contentObject.videoLanguageUrls : contentObject.pdfLanguageUrls;
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
            var engContentObj = contentObject;
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
    kony.print("Exception in androidSpecificOtherLangDownloadFinish :"+e);
  }
  
}
function dprCB(mode, progress, message, contentId, selIndex,isError) {
  contentId=contentId.split(".")[0];
  
  //kony.print("rahul mode is "+ mode+" "+ isError);
  
  var currentForm = kony.application.getCurrentForm().id;
  kony.print("Sreeni current form is ::"+currentForm);
    if (currentForm === "homepage") {
     controller = require("homepageController");
  } else if (currentForm === "contentdetailpage") {
     controller = require("contentdetailpageController");
  }else if(currentForm=="mycontentpage"){
      controller = require("mycontentpageController");
  }else{
    if(progress+"" == "100" || mode =="ONCOMPLETE"){
      kony.print("@@@sreeni finished Downloading1")
      var contentObject = {};
      	//update online data		
        for(var i=0;i<segmentData.length;i++){
          kony.print("@@@sreeni finished Downloading2")
          if(contentId == segmentData[i]["UID"]){
            kony.print("@@@sreeni finished Downloading3"+contentId);
            segmentData[i].btnDownload.skin = "sknBtnDownloadActive";
            segmentData[i].isDownloaded = true ;
            segmentData[i].isPaused = false ;
            segmentData[i].isDownloading = false ;
            segmentData[i].PausedPercent = "";
            segmentData[i].flxDownloadOverlay = {onClick : function(){},isVisible:false};
            //object =  segmentData[i];
            break;
          }
        }	
      	//push  data to offline
        var offlineContent = retrieveJsonAllLanguages("offlineContent");
        if(isBlankOrNull(offlineContent)){
          offlineContent = {};		
        }
      try{
        	if(!isBlankOrNull(offlineContent[contentId])  ){
              contentObject =  offlineContent[contentId];
              contentObject.btnDownload.skin = "sknBtnDownloadActive";
              contentObject.isDownloaded = true ;
              contentObject.isPaused = false ;
              contentObject.isDownloading = false ;
              contentObject.PausedPercent = "";
              contentObject.flxDownloadOverlay = {onClick : function(){},isVisible:false};
              contentObject.isBookmarked = offlineContent[contentId].isBookmarked;
             }else{
               kony.print("@@@sreeni finished Downloading5")
             }
      }catch(e){
         kony.print("@@@sreeni finished Downloading6"+e);
      }
          
      if(null !== contentObject){
        kony.print("@@@sreeni finished Downloading4"+JSON.stringify(contentObject))
        	offlineContent[contentId] = contentObject;
        	storeJson("offlineContent", offlineContent);
        	androidSpecificOtherLangDownloadFinish(contentObject);
      }else{
        kony.print("@@@Sreeni content not found in offline");
      }
    }
    return;
  }
  if(parseInt(progress) >0){
    controller.showDownloadStatus(contentId, progress+"%", mode );
    
    if(progress+"" == "100" || mode =="ONCOMPLETE"){
      	var offlineContent = retrieveJsonAllLanguages("offlineContent");
        if(isBlankOrNull(offlineContent)){
          offlineContent = {};		
        }
		if(!isBlankOrNull(offlineContent[contentId])  ){
              contentObject =  offlineContent[contentId];
          		if(null !== contentObject){
                	androidSpecificOtherLangDownloadFinish(contentObject);
                }else{
                  kony.print("@@@Sreeni content not found in offline");
                }
		}
    }
  }
  
}
