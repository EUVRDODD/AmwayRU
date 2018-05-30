var key = "eia-hub-app";
/**
 * @function
 * Call #1
 */
function initTealium(){
  //Tealium.initSharedInstance("amway", "kony-app-poc", "dev", key); // Dev 
  //Tealium.initSharedInstance("amway", "eia-go-app", "dev", key);	// Dev 
  Tealium.initSharedInstance("amway", "eia-hub-app", "prod", key); // Production 
}

/**
 * @function
 *
 */
/*	function callTealiumOnClick(event_name,click_detail,pageComponents,gblVisitor_imcID){
  var platform = getDevicePlatform();
  var data = {
    "app_type": platform, //ios or android sent by OS of the device
    "app_country": "in",
    "app_language": getDeviceLanguage(),
    "app_digitalProperty": "Amway Business app",
    "app_region": "eia",
    "event_name": event_name, //"click_action",
    "click_detail": click_detail,//"header login",
    "click_category": "",
    "visitor_imcID":gblVisitor_imcID,
    "page_components": pageComponents
  };
  Tealium.trackEvent("button_clicked",JSON.stringify(data),key);
}	*/

function callTealiumOnClick(onClickDetails,pageComponents,isLoginPage){
  var platform = getDevicePlatform();
  var data = {
    "app_type": platform, //ios or android sent by OS of the device
    "app_country": "in",
    "app_language": getDeviceLanguage(),
    "app_digitalProperty": "Amway Business app",
    "app_region": "eia",
     "click_category": "",
    //"event_name": event_name, //"click_action",
    //"click_detail": click_detail,//"header login",
   
    //"visitor_imcID":gblVisitor_imcID,
    "page_components": pageComponents
  };
      if(!isLoginPage){
        data.visitor_imcID = gblVisitor_imcID;
      }
      if(null !== onClickDetails){
   	for(var jsonData in onClickDetails){
      data[jsonData]= onClickDetails[jsonData];
    }
  }
      kony.print("jani >>> onclickDetails "+JSON.stringify(data));
  Tealium.trackEvent("button_clicked",JSON.stringify(data),key);
}

/* function callTealiumOnScreenLoad(sender,additionalArg,gblVisitor_imcID){
  kony.print("jani >>> before track view called & sender id :"+JSON.stringify(sender.id));
  kony.print(JSON.stringify(sender.id));
  var platform = getDevicePlatform();
  var data = {
    "app_type": platform,
    "app_country": "in",
    "app_language": getDeviceLanguage(),
    "app_digitalProperty": "Amway Business app",
    "app_region": "eia",
    //"page_section": sender.id, // EDIT BY CATHY (JAN 12 2018): NOT REQUIRED FOR MOBILE
    "page_detail": sender.id, //PAGE NAME, eg: Form1
    "visitor_imcID":gblVisitor_imcID,
    "page_components": additionalArg //Names of components in the form/page sent as an array. Example: ["slider","doclist","segTemplate"]
  };
  Tealium.trackView(sender.id,JSON.stringify(data),key);
}	*/

function callTealiumOnScreenLoad(senderId, additionalArg, contentDetails, isLoginPage){
  kony.print("jani >>> before track view called & sender id :"+JSON.stringify(senderId));
  kony.print(JSON.stringify(senderId));
  var platform = getDevicePlatform();
  var data = {
    "app_type": platform,
    "app_country": "in",
    "app_language": getDeviceLanguage(),
    "app_digitalProperty": "Amway Business app",
    "app_region": "eia",
    //"page_section": sender.id, // EDIT BY CATHY (JAN 12 2018): NOT REQUIRED FOR MOBILE
    "page_detail": senderId, //PAGE NAME, eg: Form1
   
    "page_components": additionalArg //Names of components in the form/page sent as an array. Example: ["slider","doclist","segTemplate"]
  };
   
  if(!isLoginPage)
  	data.visitor_imcID = gblVisitor_imcID;
  
  if(null !== contentDetails){
   	for(var jsonData in contentDetails){
      data[jsonData]= contentDetails[jsonData];
    }
  }
  kony.print("jani >>> jsonData :: "+JSON.stringify(data));
  Tealium.trackView(senderId,JSON.stringify(data),key);
} 

function callTealiumOnScreenLoad1(sender,category,additionalArg,gblVisitor_imcID){
  
  var platform = getDevicePlatform();
  var data = {
    "app_type": platform,
    "app_country": "in",
    "app_language": getDeviceLanguage(),
    "app_digitalProperty": "Amway Business app",
    "app_region": "eia",
    //"page_section": sender.id, // EDIT BY CATHY (JAN 12 2018): NOT REQUIRED FOR MOBILE
    "page_category":category,
    "page_detail": sender, //PAGE NAME, eg: Form1
    "visitor_imcID":gblVisitor_imcID,
    "page_components": additionalArg //Names of components in the form/page sent as an array. Example: ["slider","doclist","segTemplate"]
  };
  Tealium.trackView(sender.id,JSON.stringify(data),key);
}
/**
 * @function
 *
 */
function callTealiumWidgetOnInteract(sender, event_name, click_category, widgetProp){
  kony.print(JSON.stringify(widgetProp));
  var platform = getDevicePlatform();
  var data = {
    "app_type": platform,
    "app_country": "in",
    "app_language": getDeviceLanguage(),
    //"app_digitalProperty": "kony test app",
    "app_digitalProperty": "Amway Business app",
    "app_region": "eia",
    'event_name': event_name,
    'click_category':click_category,  //e.g., article, video
    'click_detail': sender.id,  //e.g., name of article
    'search_keyword': widgetProp // e.g., 'skincare' 
  };
  Tealium.trackEvent("widget_interaction", JSON.stringify(data), key);
}


function getDevicePlatform(){
  //#ifdef iphone
  return "ios";
  //#endif
  //#ifdef android 
  return "android";
  //#endif
  //#ifdef tabrcandroid 
  return "android";
  //#endif
}

function getDeviceLanguage(){
  try{
    //#ifdef iphone
    var locale = kony.i18n.getCurrentDeviceLocale();
  	kony.print("locale in getDeviceLanguage :: "+locale.substring(0,2));
    return locale.substring(0,2);
  //#endif
  //#ifdef android 
  	var locale = kony.i18n.getCurrentDeviceLocale().language;
  	kony.print("locale in getDeviceLanguage :: "+locale);
    return locale;
  //#endif
  //#ifdef tabrcandroid 
  	var locale = kony.i18n.getCurrentDeviceLocale().language;
  	kony.print("locale in getDeviceLanguage :: "+locale);
    return locale;
  //#endif
    }
  catch(ex){
    kony.print("jani >>> Language "+ex);
  }
}

/**
 * @function
 *
 */
function a(){
  b();
}