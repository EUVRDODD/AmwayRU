messageCount=0;
gblStartupFormSet=false;
comingFromNotification=false;
LoggedIn=false;
registrationWithKMS=false;
function registerPushCallBacks() {
    kony.print("registerPushCallBacks()--->START");
    var config = {
        onsuccessfulregistration: onSuccessfulRegisration,
        onfailureregistration: onFailureRegistration,
        onlinenotification: onlineNotification,
        offlinenotification: offlineNotification,
        onsuccessfulderegistration: onSuccessfulDeregistration,
        onfailurederegistration: onFailureDeregistration
    };
    kony.push.setCallbacks(config);
    kony.print("registerPushCallBacks()--->END");
} 

function registerAppCallBacks(){
  var config={
    onbackground:inBackground,
    onforeground:inForeground
  }
  kony.application.setApplicationCallbacks(config);
}

function inBackground(){
  kony.print("In Background callback");
  Background=1;
}
function inForeground(){
  kony.print("In Foreground callback");
  Background=0;
}

function onSuccessfulRegisration(regToken){ 
  kony.print("In Successful Registration");
  registrationToken=regToken;
  kony.print("ksid is " + registrationToken);
  registerWithKMSService();
}

function onFailureRegistration(err){
  kony.print("In Failure Registration"+JSON.stringify(err));
}

function onlineNotification(payload){
  kony.print("In Online Notifications");
  kony.print("payload sent is- "+payload);
  mid="";
  mid=payload["mid"];
  kony.print("mid is -" +mid);
  
  if(Background){
    
    if(LoggedIn){
       
    	var ntf= new kony.mvc.Navigation("notificationpage");
   		 ntf.navigate();
    }else{
      comingFromNotification=true;
      var ntf= new kony.mvc.Navigation("loginpage");
   		 ntf.navigate();
    }
   
    
  }else{
    
    try{
    kony.timer.schedule("notification", showNoti, 15, false);
  }catch(e){
    
  }
  }
}

function showNoti(){
  
  try{
    
  currentForm=kony.application.getCurrentForm().id;
  kony.print("current form is "+ currentForm);
  if(currentForm != "loginpage" && currentForm !="loadingscreenpage" && currentForm!="frmDummy" && currentForm != "termsandconditionspage"  && currentForm!="privacypolicypage" ){
     var controller=currentForm+"Controller";
  var currentController= require(controller);
  currentController.showNotification();
  try{
    kony.timer.cancel("timerid");
  }catch(e){
  }
  }
  }catch(e){
    
  }
}

function offlineNotification(payload){
  try{
       if(isIOS()){
         kony.print("kony this is iOS");
          if(isIosBackground){
            if(LoggedIn){
              
            var ntf= new kony.mvc.Navigation("notificationpage");
            ntf.navigate();
            }else{
               comingFromNotification=true;
               var ntf= new kony.mvc.Navigation("loginpage");
            ntf.navigate();
            }
            
            return;
          }
        }
       kony.print("In Offline Notifications");
        kony.print("payload sent is- "+JSON.stringify(payload));
         mid="";
        mid=payload["mid"];
        kony.print("mid is -" +mid);

          kony.print("checking whether token exist or not");
          token = kony.store.getItem("accessToken");
          kony.print("sessionToken : " + token);
		
          if (isBlankOrNull(token)) {
              kony.print("No token found!! Moving to login page ");
              status = {"statusCode" : 3, "statusMessage" : "Success"};
            	comingFromNotification=true;
              gblStartupForm = "loginpage";
          } else {
            gblStartupForm =  "notificationpage";
            
            gblStartupFormSet = true;
            validateToken(token);

          }
  }catch(e){
    kony.print("Exception in offlineNotification"+e);
  }
  
  
}

function onSuccessfulDeregistration(){
  kony.print("In Successful Deregistration");
}
function onFailureDeregistration(){
  kony.print("In Failure Deregistration"); 
}



function registerForKMS() {
  kony.print("registerForKMS()--->START");
  var config = [];
  if (isAndroid()) {
    kony.print("registerForKMS()--->Registering app with GCM");
    config["senderid"]	= "96963177128"; //AppId - amwayapp		      
  }else{
    config = [0,1,2];
  }
  kony.push.register(config);		
  kony.print("registerForKMS()--->END"); 
}


function registerWithKMSService(){
  if (isNetworkAvailable()) {
    if (mobileFabricConfiguration.isKonySDKObjectInitialized) {

      kony.print(" ************ Entering into registerWithKMSService **************");
      var deviceId=kony.os.deviceInfo().deviceid;
      var ufid=gblABOID;
      var os="";
      if(isIOS()){
        os="iphone";
      }else{
        os="androidgcm";
      }
      mobileFabricConfiguration.konysdkObject.getMessagingService().register(os,deviceId, registrationToken, ufid,function(response){
        KSID = response.id;
        kony.print("KSID" +JSON.stringify(KSID));
		registrationWithKMS=true;
        kony.print("\n<----------Subscription Success--------> " + JSON.stringify(response));
      },
                                                                             function(error){
        kony.print("\n<----------Subscription Failure--------> " + JSON.stringify(error));
        kony.print("Subscription Failed");
      } );

    } else {
      var context = "Push_Notification";
      initializeMobileFabric(context);
    }
  } else {
    status = {"statusCode" : 1, "statusMessage" : "Network Unavailable"};
  }
 }                                                                       

function addToRead(data) {
    var readMessages;
    try {
      readMessages = JSON.parse(kony.store.getItem("readMessages")) || [];
      
      for(var i in readMessages) {
        if( readMessages[i].lblFetchId.text === data.lblFetchId.text ) { return; }
      }
      
      readMessages.push(data);
      kony.store.setItem("readMessages", JSON.stringify(readMessages));
    
    }
    catch(e){
      kony.print("** Unable to read data: **" + e);
    }
  
  
  }

function addToUnRead(data) {
    var unReadMessages;
    try {
      unReadMessages = JSON.parse(kony.store.getItem("unReadMessages")) || [];
      
      for(var i in unReadMessages) {
        if( unReadMessages[i].lblFetchId.text === data.lblFetchId.text ) {  return; }
      }
      
      unReadMessages.push(data);
      kony.store.setItem("unReadMessages", JSON.stringify(unReadMessages));
    
    }
    catch(e){
      kony.print("** Unable to store data in downloads: **" + e);
    }
  }

function removeFromRead(data) {
    var readMessages;
    try {
      readMessages = JSON.parse(kony.store.getItem("readMessages")) || [];
      
      if( readMessages.length === 0 ) return;
      else {
        for(var i in readMessages) {
          if( readMessages[i].lblFetchId.text === data.lblFetchId.text ) {
            readMessages.splice(i,1);
            
           

            kony.store.setItem("readMessages", JSON.stringify(readMessages));            
            break;
          }
        }
      }
    }
    catch(e) {
      kony.print("** Unable to store data in downloads: **" + e);     
    }
  }


function removeFromUnRead(data) {
    var unReadMessages;
    try {
      unReadMessages = JSON.parse(kony.store.getItem("unReadMessages")) || [];
      
      if( unReadMessages.length === 0 ) return;
      else {
        for(var i in unReadMessages) {
          if( unReadMessages[i].lblFetchId.text === data.lblFetchId.text ) {
            unReadMessages.splice(i,1);
            
           

            kony.store.setItem("unReadMessages", JSON.stringify(unReadMessages));            
            break;
          }
        }
      }
    }
    catch(e) {
      kony.print("** Unable to store data in downloads: **" + e);     
    }
  }

function UpdateAll(data){
   if( notificationData.length === 0 ) return -1;
      else {
        for(var i in notificationData) {
          
          kony.print(JSON.stringify(notificationData[i]));
          kony.print(JSON.stringify(data));
          if( notificationData[i].lblFetchId.text === data.lblFetchId.text ) {
            return i;
            
          }
        }
      }
  
}



