//Type your code here
status = {"statusCode" : 0, "statusMessage" : "Running"};
gblNotifyMe = false;
DownloadManagerObject = null;
function removePartialContent(){
  
      try{
          var offlineContent = retrieveJsonAllLanguages("offlineContent");
          if(!isBlankOrNull(offlineContent)){
            kony.print("offlineContent: " +JSON.stringify(offlineContent));
            for (var key in offlineContent) {
              if (offlineContent.hasOwnProperty(key)) {
                kony.print("Offline content key::"+key + " -> " + offlineContent[key]);
                  if(offlineContent[key]["isPaused"] || offlineContent[key]["isDownloading"] ){
                     kony.print("removing key");
                    if(offlineContent[key]["isBookmarked"]){
                      offlineContent[key]["isPaused"] = false;
                      offlineContent[key]["PausedPercent"] = "";
                      offlineContent[key]["isDownloading"] = false;
                    }else{
                       delete offlineContent[key];
                    }
                   	
                  }
              }
            } 
            storeJson("offlineContent", offlineContent);
          } 
        }catch(e){}
}
function checkTokenExist() {
  	//if(isIOS()){
      removePartialContent();
    //}
  	removeJson("partialContent");
  	kony.print("checking whether token exist or not");
    token = kony.store.getItem("accessToken");
    kony.print("sessionToken : " + token);

    if (isBlankOrNull(token)) {
        kony.print("No token found!! Moving to login page ");
      	status = {"statusCode" : 3, "statusMessage" : "Success"};
        gblStartupForm = "loginpage";
    } else {
        validateToken(token);
      	//kony.timer.schedule("timerid", validateToken, 0, false);
        if(isIOS() && gblStartupFormSet){
          kony.print("Startup form set already")
          gblStartupFormSet = false;
        }else{
           gblStartupForm =  "homepage";
        }
       
    }
}

function refreshTokenSuccessCallback(refreshTokenResponse) {
    kony.print("*************************** Entering into refreshTokenSuccessCallback **************************" + JSON.stringify(refreshTokenResponse));
    //TODO :save latest token in device store
  	if (gblNotifyMe === true)
    {
    	gblNotifyMe = false;
      	//call function in homepageController
     	var homePageController = require("homepageController");
    	homePageController.addDataToSegment();
          	
    }
   	status = {"statusCode" : 3, "statusMessage" : "Success"};
    dismissLoading();
  	//dismissLoading();
}

function refreshTokenErrorCallback(errormsg) {
    kony.print("*************************** Entering into refreshTokenErrorCallback ****" + errormsg);
  	status = {"statusCode" : 2, "statusMessage" : "Error in refreshToken"};
    dismissLoading();
}

function refreshToken() {
    kony.print("*************************** Entering into refreshToken **************************");
    if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
       // showLoading(" ", false, false);
        mobileFabricConfiguration.integrationObj = mobileFabricConfiguration.konysdkObject.getIntegrationService(mobileFabricConfiguration.integrationServices[3].service);
        var operationName = mobileFabricConfiguration.integrationServices[3].operations[0];
        var headers = {};
        data = {
            "client_id": "mobile_android_customer",
            "client_secret": "$tore@123",
            "grant_type": "refresh_token",
            "refresh_token": kony.store.getItem("refreshToken")
        };
        mobileFabricConfiguration.integrationObj.invokeOperation(operationName, headers, data, refreshTokenSuccessCallback, refreshTokenErrorCallback);
    } else {
      	status = {"statusCode" : 1, "statusMessage" : "Network Unavailable"};
        kony.print("No network while refreshing the token!!");
    }
}

function validateTokenSuccessCallback(validateTokenResponse) {
    
    kony.print("*************** Entering into validateTokenSuccessCallback *************************");
    kony.print("Response : " + JSON.stringify(validateTokenResponse));
  	
  	if (validateTokenResponse.hasOwnProperty('errmsg')) {
        refreshToken();
    } else {
        kony.print("Valid token");
      status = {"statusCode" : 3, "statusMessage" : "Success"};
        //TODO :: fetchContentFromCms()
      	
//       	if (gblNotifyMe === true)
//    		{
//       		gblNotifyMe = false;
//       		//dismissLoading();
//     	}
    }
    dismissLoading();
  	//status = {"statusCode" : 3, "statusMessage" : "Success"};
  	kony.print(" ********** Exiting out of validateTokenSuccessCallback ********** ");
}

function validateTokenErrorCallback(errormsg) {
    dismissLoading();
    kony.print(" ********** Entering into validateTokenErrorCallback ********** ");
    kony.print(" ********** Failure in validateTokenErrorCallback: " + JSON.stringify(errormsg) + " ********** ");
  	status = {"statusCode" : 2, "statusMessage" : "Error in validateToken"};
    kony.print(" ********** Exiting out of validateTokenErrorCallback ********** ");
}
count = 0;
function validateToken(token) {
  	kony.print(" ************ ENtering into validateToken **************");
  count += 1;
  	status = {"statusCode" : 0, "statusMessage" : "Running"};
    if (isNetworkAvailable()) {
        if (mobileFabricConfiguration.isKonySDKObjectInitialized) {
            //showLoading(" ", false, false);
            mobileFabricConfiguration.integrationObj = mobileFabricConfiguration.konysdkObject.getIntegrationService(mobileFabricConfiguration.integrationServices[2].service);
            var operationName = mobileFabricConfiguration.integrationServices[2].operations[0];
            var headers = {
                "Authorization": kony.store.getItem("tokenType") + " " + kony.store.getItem("accessToken")
            };
            data = {
                "textToSearch": "d51d33ce-92a0-42db-9f72-ef74e1c51482",
                "storeCode": ""
            };
            mobileFabricConfiguration.integrationObj.invokeOperation(operationName, headers, data, validateTokenSuccessCallback, validateTokenErrorCallback);
        } else {
            var context = "VALIDATE_TOKEN";
            initializeMobileFabric(context);
        }
    } else {
      	status = {"statusCode" : 1, "statusMessage" : "Network Unavailable"};
    }
}


function initializeMobileFabric(context) {
    kony.print(" ********** Entering into initializeMobileFabric ********** ");
  try{
    	 if (isNetworkAvailable()) {
       // showLoading(" ", false, false);
        mobileFabricConfiguration.konysdkObject = new kony.sdk();
        mobileFabricConfiguration.konysdkObject.init(mobileFabricConfiguration.appKey, mobileFabricConfiguration.appSecret, mobileFabricConfiguration.serviceURL, function(response) {
            kony.print(" ********** Success initializeMobileFabricSuccess response : " + JSON.stringify(response) + " ********** ");
            mobileFabricConfiguration.isKonySDKObjectInitialized = true;
          	kony.application.dismissLoadingScreen();
            if (!isBlankOrNull(context) && context == "VALIDATE_TOKEN") {
                var token = kony.store.getItem("accessToken");
                validateToken(token);
            }else if(!isBlankOrNull(context) && context == "Push_Notification"){
              registerWithKMSService();
            }
          
            kony.print("initialization successful");
            kony.print(" ********** Exiting out of initializeMobileFabricSuccess ********** ");
        }, function(error) {
            kony.print(" ********** Entering into initializeMobileFabricFailure ********** ");
            kony.print(" ********** Failure in initializeMobileFabric: " + JSON.stringify(error) + " ********** ");
            kony.application.dismissLoadingScreen();
          	status = {"statusCode" : 2, "statusMessage" : "Error in initializing mobile fabric"};
            kony.print(" ********** Exiting out of initializeMobileFabricFailure ********** ");
        });
    } else {
      	status = {"statusCode" : 1, "statusMessage" : "Network Unavailable"};
        kony.print(" ********** Exiting out of initializeMobileFabric ********** ");
    }
    
  }catch(e){
    kony.print("Error occured while initializing the mobilefabric ");
  }
   
}

function clearLoginTokenFromStore(){
  kony.print("Hello Clearing the tokens");
  try{
      kony.store.removeItem("accessToken");
      kony.store.removeItem("tokenType");
      kony.store.removeItem("refreshToken");
  }catch(e){
    kony.print("Exception in clearing tokens"+e);
  }
  
}


