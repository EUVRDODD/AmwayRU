var conDetailCardData ;
//Uncaught Reference Handler
function uncaughtExceptionHandler(exceptionObject) {
    // Converting exception object into a readable string
    var exceptionString = exceptionObject;
    /*if(exceptionObject.indexOf("sourceURL") !== -1){
      exceptionString += exceptionObject.sourceURL;
    }
    if(exceptionObject.indexOf("line") !== -1){
      exceptionString += " line # " + exceptionObject.line;
    }
    if(exceptionObject.indexOf("message") !== -1){
      exceptionString += " : " + exceptionObject.message;
    }*/
    //Logging the exception string to console
    kony.print("Unhandled Exception:" + JSON.stringify(exceptionString));
    kony.print("Unhandled Exception without stringify:" + exceptionString);
    dismissLoading();
}
//var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function getMonthIntShort (month){
  for(var i = 0; i < monthsShort.length; i++){
    if(monthsShort[i].toUpperCase() === month.toUpperCase()){
      return i+1;
    }    
  }
}

function sideDrawerCategory(category){
  gblFilterCategory=category;
  var currentForm = kony.application.getCurrentForm().id;
  var currentFormController= currentForm+"Controller";
  var controller = require(currentFormController);
  controller.closeSideDrawer();
  controller.navigateToHomePage();
}



function animateSideDrawer(element, params, duration) {
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
}

function formatAMPM(time) {  
  kony.print("time: "+time);
  var hours = time.substring(0,2); 
  kony.print("hours: "+time);
  var minutes = time.substring(3,5); 
  kony.print("minutes: "+time);
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; 
  hours = hours < 10 ? '0' + hours : hours;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  kony.print("strTime: "+strTime);
  return strTime;
}
function getUidWithoutLang(uid){
  try{
    var str =  uid;
    var mapObj = {
      English:"",
      Tamil:"",
      Bengali:"",
      Hindi:""
    };
    str = str.replace(/English|Tamil|Bengali|Hindi/gi, function(matched){
      return mapObj[matched];
    });
    kony.print("Changing the UID"+str)
    return str;
  }catch(e){
    kony.print("Exception in setUid"+e);
  }
}
function getNotificationStatusForApp() {
  var status = false;
  if (isIOS()) {
    kony.print("Inside getNotificationStatusForApp ");
    status = com.notification.getNotificationStatus();
    kony.print("returned value of notification status : " + status);
  }
  return status;
}

function exitApp() {
  try {
    kony.application.exit();
  } catch (err) {}
}

function showLoading(loadingText,indicator,isBlocked) {
  try {
    if(isBlankOrNull(isBlocked)){
      isBlocked = true;
    }
    if(isBlankOrNull(indicator)){
      indicator = true;
    }
    if(isBlankOrNull(loadingText)){
      loadingText = "Loading...";
    }
    kony.print("showLoading - Start");
    kony.application.showLoadingScreen("", loadingText, constants.LOADING_SCREEN_POSITION_ONLY_CENTER, isBlocked, indicator, null);
    kony.print("showLoading - End ");

  } catch (err) {}
}


function dismissLoading3Sec(){
  kony.timer.schedule("timerid", dismissLoading , 4, false);
}


function dismissLoading() {
  try {
    kony.application.dismissLoadingScreen();
    kony.print("dismiss  Loading");
  } catch (err) {}



  try{
    kony.timer.cancel("timerid");
  }catch(e){

  }
}

function showInformationAlert(header, body) {
  try {
    var basicConf = {alertTitle: header,message: body ,alertType: constants.ALERT_TYPE_INFO,yesLabel:"OK",alertIcon:"", alertHandler: function(){}};	
    var infoAlert = kony.ui.Alert(basicConf,{});
  } catch (err) {}
}

function showConfirmationAlert(header, body, lblyes, lblno, callBack) {
  try {
    var basicConf = {
      "message": body,
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "alertTitle": header,
      "yesLabel": lblyes,
      "noLabel": lblno,
      "alertIcon": "",
      "alertHandler": callBack
    };
    var confirmationAlert = kony.ui.Alert(basicConf, {});
  } catch (err){}
}
function showErrorAlert(header, body) {
  try {
    var basicConf = {alertTitle: header,message: body ,alertType: constants.ALERT_TYPE_ERROR,alertIcon:"", alertHandler: function(){}};
    kony.ui.Alert(basicConf, {});
  } catch (err) {}
}

function isNetworkAvailable() {
  try {
    return kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY);
  } catch (err) {}
}

function isAndroid() {
  try {
    var deviceInfo = kony.os.deviceInfo();
    if (deviceInfo["name"] == "android") {
      return true;
    } else {
      return false;
    }
  } catch (err) {}
}

function isIOS() {
  try {
    var deviceInfo = kony.os.deviceInfo();
    var name = deviceInfo["name"];
    if (name == "iphone" || name == "iPhone" || name == "ipad" || name == "iPad") {
      return true;
    } else {
      return false;
    }
  } catch (err) {}
}

function isNullOrEmpty(inputString) {
  if (inputString === null || inputString === "" || inputString === undefined) {
    return true;
  } else {
    return false;
  }
}

function isBlankOrNull(argValue) {
  if (argValue === undefined || argValue === "" || argValue === null || argValue === "null" || argValue === "nil" || kony.string.trim(argValue) === "" || argValue == [] || argValue == {} || argValue == "[]" || argValue == "{}" || argValue === false || argValue == "false") {
    return true;
  }
  return false;
}

function isMobileNumberValid(mobileNumber) {
  try {
    var patternMobileNumber = /(^([7-9]{1})([0-9]{9})$)/;
    if (patternMobileNumber.test(mobileNumber)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {}
}

function isEmailIdValid(emailId) {
  try {
    var PatternEmailId = /^([a-zA-Z0-9_\.\-])+([a-zA-Z0-9])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (PatternEmailId.test(emailId)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {}
}

function isNumber(num) {
  if (num == "" || num == null || isNaN(num)) {
    return false;
  } else {
    return true;
  }
}

function openBrowser(URL) {
  try {
    return kony.application.openURL(URL);
  } catch (err) {}
}

function openCall(number) {
  try {
    return kony.phone.dial(number);
  } catch (err) {}
}

function openEmail(to, cc, bcc, sub, msgbody) {
  try {
    var toArr = [];
    toArr.push(to);
    var ccArrr = [];
    ccArrr.push(cc);
    var bccArr = [];
    bccArr.push(bcc);
    return kony.phone.openEmail(toArr, ccArrr, bccArr , sub, msgbody,false,null);
  } catch (err) {}
}
/*
function encryptData(inputstrEnc) {
	var algo = "aes";
	var encryptDecryptKey = kony.crypto.newKey("passphrase", 192, {
		passphrasetext: ["Amway1", "Amway2", "Amway3"],
		subalgo: "aes"
	});
    var prptobj = {
        padding: "pkcs5",
        mode: "cbc",
        initializationvector: "1234567890123456"
    };
    var myEncryptedText = kony.crypto.encrypt(algo, encryptDecryptKey, inputstrEnc, prptobj);
    return myEncryptedText;
}

function decryptData(inputstrDec) {
	var algo = "aes";
	var encryptDecryptKey = kony.crypto.newKey("passphrase", 192, {
		passphrasetext: ["Amway1", "Amway2", "Amway3"],
		subalgo: "aes"
	});
    var prptobj = {
        padding: "pkcs5",
        mode: "cbc",
        initializationvector: "1234567890123456"
    };
    var myClearText = kony.crypto.decrypt(algo, encryptDecryptKey, inputstrDec, prptobj);
    return myClearText;
}*/
function storeString(keyStr, valueStr) {
  try {
    kony.store.setItem(keyStr, valueStr);

  } catch (err){}
}
function retrieveString(keyStr) {
  try {
    var retItem = kony.store.getItem(keyStr);
    return retItem;
  } catch (err){}
}
function storeJson(keyStr, valueJson) {
  try {
    if(!isBlankOrNull(valueJson)){
      if(typeof(valueJson) != "string"){
        var value = JSON.stringify(valueJson);
      } else {
        value = valueJson;
      }
      kony.store.setItem(keyStr, value);
    }
  } catch (err){}
}



function retrieveJsonAllLanguages(keyStr) {
  try {
    var retItem = kony.store.getItem(keyStr);
    var retJson = JSON.parse(retItem);
    return retJson;
  } catch (err){}
}

function retrieveJson(keyStr) {
  try {
    var retItem = kony.store.getItem(keyStr);
    var retJson = JSON.parse(retItem);
    for(var i in retJson){
      var str_=i;
      if(str_.split("English").length == 1){
        delete retJson[i];
      }

    }
    return retJson;
  } catch (err){}
}
function retrieveJsonForImages(keyStr) {
  try {
    var retItem = kony.store.getItem(keyStr);
    var retJson = JSON.parse(retItem);
    return retJson;
  } catch (err){}
}
function removeJson(keyStr) {
  try {
    kony.store.removeItem(keyStr);
  } catch (err){}
}

function clearServerSessionOnLogout() {

}
/*
function formatTimeStamp(enterdTimeStamp){
	kony.print("calling formatTimeStamp - enterdTimeStamp " + enterdTimeStamp);
	if(isBlankOrNull(enterdTimeStamp)){
		return "";
	}
	try{
		if(enterdTimeStamp.indexOf("/") != -1){ 
			enterdTimeStamp = replaceAll(enterdTimeStamp,"/","-"); 
		}
		var date = new Date(enterdTimeStamp);
		kony.print("formatTimeStamp - date: " + date);
		var dateStr = date.getDate() + " " + getMonthName(date.getMonth() + 1) + " " + date.getFullYear()  + "|" + addZeroBefore(date.getHours()) + ":" + addZeroBefore(date.getMinutes());
		kony.print("formatTimeStamp - dateStr: " + dateStr);
		return dateStr;
	}catch(e){
		kony.print("error while calling formatTimeStamp: " + e);
		return "";
	}
}

function formatTimeStamp2(enterdTimeStamp){
	//var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	kony.print("calling formatTimeStamp2 - enterdTimeStamp " + enterdTimeStamp);
	if(isBlankOrNull(enterdTimeStamp)){
		return "";
	}
	try{
		if(enterdTimeStamp.indexOf("/") != -1){ 
			enterdTimeStamp = replaceAll(enterdTimeStamp,"/","-"); 
		}
		var date = new Date(enterdTimeStamp);
		kony.print("formatTimeStamp - date: " + date);
		var dateStr = date.getDate() + " " + getMonthShortName(date.getMonth() + 1) + " " + date.getFullYear() ;
		kony.print("formatTimeStamp - dateStr: " + dateStr);
		return dateStr;
	}catch(e){
		kony.print("error while calling formatTimeStamp: " + e);
		return "";
	}
}
*/

function isEqualIngoreCase(string1, string2) {
  var result = false;
  try{
    if (string1 != null && string2 != null) {
      string1 = string1.toLowerCase();
      string2 = string2.toLowerCase();
      result = (string1 == string2);	
    }
  }catch(e){
    kony.print("error while calling isEqualIngoreCase:" + e);
  }
  return result;
}

function getI18Value(key)
{
  value = "";
  if (key !== null || key !== "")
  {
    value = kony.i18n.getLocalizedString(key);
  }
  return value;
}

function animate( element, params, duration ){
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
      "animationEnd": null
    });
}


function uncaughtExceptionHandler(exceptionObject) {
  // Converting exception object into a readable string
  var exceptionString = exceptionObject;
  /*if(exceptionObject.indexOf("sourceURL") !== -1){
    exceptionString += exceptionObject.sourceURL;
  }
  if(exceptionObject.indexOf("line") !== -1){
    exceptionString += " line # " + exceptionObject.line;
  }
  if(exceptionObject.indexOf("message") !== -1){
    exceptionString += " : " + exceptionObject.message;
  }*/
  //Logging the exception string to console
  kony.print("Unhandled Exception:" + JSON.stringify(exceptionString));
  kony.print("Unhandled Exception without stringify:" + exceptionString);
  dismissLoading();
}


function animate2( element, params1,params2, duration ,callback){
  duration = duration || 0.5;
  callback= callback|| null;
  params1.stepConfig = {
    "timingFunction": kony.anim.EASE
  };
  params2.stepConfig = {
    "timingFunction": kony.anim.EASE
  };
  element.animate(
    kony.ui.createAnimation({
      "0":params1,
      "100": params2,
    }), {
      "delay": 0,
      "iterationCount": 1,
      "fillMode": kony.anim.FILL_MODE_FORWARDS,
      "duration": duration
    }, {
      "animationEnd": callback
    });
}
function menuToggle() {
  if( this.view.flexSideDrawer.left == "0dp" ) {
    animate( this.view.flexSideDrawer, {"left": "-100%"} );
  } else {
    animate( this.view.flexSideDrawer, {"left": "0dp"} );
  }
}



