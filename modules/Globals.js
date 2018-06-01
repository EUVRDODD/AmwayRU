//Gloabal Valiables

function comparisionFunction(element1,element2){

  //kony.print("rahul elements comapred are >> " + JSON.stringify( element1["updatedDate"]) +" " +JSON.stringify(element2["updatedDate"]));
  return element1["updatedDate"] > element2["updatedDate"];

}
function comparisionFunctionStore(element1,element2){

  //kony.print("rahul elements comapred are >> " + JSON.stringify( element1["updatedDate"]) +" " +JSON.stringify(element2["updatedDate"]));
  //if(element1["lblState"] < element2["lblState"]) return element1["lblStoreName"] < element2["lblStoreName"];

  if(element1["lblState"] === element2["lblState"]) return element1["lblStoreName"] < element2["lblStoreName"];
  else return element1["lblState"] < element2["lblState"];
}

function comparisonfunctionStore2(element1,element2){
  return element1["lblStoreName"] < element2["lblStoreName"];
}

//#ifdef iphone
var NSURL = objc.import("NSURL");
var AVPlayer = objc.import("AVPlayer");
var AVPlayerViewController = objc.import("AVPlayerViewController");
var UIViewController = objc.import("UIViewController");
var UIApplication = objc.import("UIApplication");
var AVContoller = AVPlayerViewController.alloc().jsinit();
//#endif




flag=true;

response="";
comingFromStoreDetail=false;
var currentTab = 0;
comingFromContent=false;
var gblFileName = "";
var gblNutriliteDismiss = false;
var gblShowApps = false;
isIosBackground = false;
gblStartupFormSet = false;
gblGestureEnabledInWebPage=false;
gblGestureEnabledInMyContentPage=false;
mid="";
searchFlag=false;
mycontentFlag=false;
gblFormBack = [];
Background=0;
selLan="";
uId="";
uPas="";
comingFromTerms=false;
var gblInteractionDoneInDetails = false;
var gblRetailScroll = false;
//variables for GIP Simulator
var preYear;
var nxtYear;
var currYear;
var summary;
var varSegment;
var lastYear;
var lastYearValue;
var gblCurrentForm;
var gblData = {};
var gblAppData = {};
var gblSelectedIndex;
var gblDownloads = {};
var gblUID = "";
var gblFilterCategory = "";
var gblFirstCat=true;

var Hresponse={};
var webpageHamburger=false;
var mycontentHamburger=false;
var feedbackHamburger=false;
var GIPHamburger=false;
var homepageHamburger=false;
var incomeHamburger=false;
var settingHamburger=false;
var storeLocatorHamburger=false;


var gblPersonalCare = "personal care";
var gblNutrilite = "nutrition";
var gblArtistry = "artistry";
var gblAttitude = "attitude";
var gblAtHome = "at home";
var gblMoreProducts = "more products";
var gblAboutAmway="about amway";
var gblBeauty="beauty";
var gblheritage="heritage & values";
var gblFactSheets="fact sheets";
var gblManufacturing="manufacturing";
var gblAwards="awards & accolades";
var gblCorporate="corporate social responsibilities";
var gblMedia="media releases";
var gblOpportunity="business opportunity";
var gblRecognition="amway recognition";
var gblBrochures="business brochures";
var gblSeminars="business seminars and conferences";
var gblLearning="learning and development";
var gblArticle = "article";


var gblFilterCategoryName = "";
var gblTermsPolicyFlag = false;
var gblVisitorIndiaCode = 430;
var gblVisitor_imcID = "";
//var lstPrevAndCurrYearPlatinumData = [["1", "Select"],["210","6%"],["215","9%"],["220","12%"],["225","15%"],["230","18%"],["310","Silver Producer"],["320","Gold Producer"],["330","Platinum"],["340","Ruby"],["342","Founders Platinum"],["365","Sapphire"],["367","Founders Sapphire"],["370","Emerald"],["375","Founders Emerald"],	["380", "Diamond"],["385", "Founders Diamond"],["390", "Executive Diamond"],["395", "Founders Executive Diamond"]];
var lstPrevAndCurrYearPlatinumData = [
  ["1", "Select"],
  ["230", "Below Silver"],
  ["310", "Silver Producer"],
  ["320", "Gold Producer"],
  ["330", "Platinum"],
  ["340", "Ruby"],
  ["342", "Founders Platinum"],
  ["365", "Sapphire"],
  ["367", "Founders Sapphire"],
  ["370", "Emerald"],
  ["375", "Founders Emerald"],
  ["380", "Diamond"],
  ["385", "Founders Diamond"],
  ["390", "Executive Diamond"],
  ["395", "Founders Executive Diamond"]
];
//var lstPrevAndCurrYearData = [["1", "Select"],["210","6%"],["215","9%"],["220","12%"],["225","15%"],["230","18%"],["310","Silver Producer"],["320","Gold Producer"],["330","Platinum"],["340","Ruby"],["342","Founders Platinum"],["365","Sapphire"],["367","Founders Sapphire"],["370","Emerald"],["375","Founders Emerald"],	["380", "Diamond"],["385", "Founders Diamond"],["390", "Executive Diamond"],["395", "Founders Executive Diamond"],["400", "Double Diamond"],["405", "Founders Double diamond"],["410", "Triple Diamond"],["415", "Founders Triple Diamond"],["420", "Crown"]];
var lstPrevAndCurrYearData = [
  ["1", "Select"],
  ["230", "Below Silver"],
  ["310", "Silver Producer"],
  ["320", "Gold Producer"],
  ["330", "Platinum"],
  ["340", "Ruby"],
  ["342", "Founders Platinum"],
  ["365", "Sapphire"],
  ["367", "Founders Sapphire"],
  ["370", "Emerald"],
  ["375", "Founders Emerald"],
  ["380", "Diamond"],
  ["385", "Founders Diamond"],
  ["390", "Executive Diamond"],
  ["395", "Founders Executive Diamond"],
  ["400", "Double Diamond"],
  ["405", "Founders Double diamond"],
  ["410", "Triple Diamond"],
  ["415", "Founders Triple Diamond"],
  ["420", "Crown"]
];

var currentYear;
var currentYearValue;
var currFQMonths;
var currComebackPlatinum;
var currSPMonths;

var nextYear;
var nextYearValue;
var nextFQMonths;
var nextComebackPlatinum;
var nextSPMonths;

var diffComebackPlatinum;


var CYP = "";
var FYRQ = "";
var RQ = "";

var PABValue = 0;
var SEBValue = 0;
var PGBValue = 0;
var totalGIP = 0;

var varSPMonthsCurrYear;
var varSPMonthsNextYear
var varFQMonthsCurrYear;
var varFQMonthsNextYear;
var varComebackPlatinum;


function resetGIP(){
  CYP = "";
  FYRQ = "";
  RQ = "";

  PABValue = 0;
  SEBValue = 0;
  PGBValue = 0;
  totalGIP = 0;
}
/**
 *@description: Module to set the Global varaibles
 */
//Varible to hold the startup form while launch

var gblStartupForm = null;

// Variable to differentiate between prod and other environments
var gblIsProd = false;

var contentListData=[];
//var categoriesListGlobal={};

//Global Content List
var segmentData = [];
var gblStoreData=[];
var sortedContentList = [];
var gblLanguage = "English";
//var contentListUIDOfflineData = [];
//var gblHomePageUID = "";
// var gblHomePageUpdateOption = "";
// var gblIsDownloadOn = false;
// var gblIsShareOn = false;
// var gblIsBookmarkOn = false;

/*
            FOR DEV
            appKey:"f3f8a2095d9677bc1b0735aaf828703f", 
            appSecret:"380aa60e2cae3d993fac1f430dfaac9d", 
            serviceURL:"https://100014629.auth.konycloud.com/appconfig",
*/
//Mobilefabric configuration
var mobileFabricConfiguration = 
    {
      appKey:"496fb4c6d1ddd2c3228da634a9d7ed4e",//"c2d6e28805fc3271d3edc930a29bfa10", 
      appSecret:"d26eff8c17d5a8fdbb1f5c49a8654050",//"2a4965a756620ac437749ef73b15d552", 
      serviceURL:"https://100020316.auth.konycloud.com/appconfig",//"https://100014629.auth.konycloud.com/appconfig",
      integrationServices: 
      [
        {
          service:"GetUserTokenContentHub",
          operations:["GetUserTokenOperation"]
        },
        {
          service:"LoginServiceContentHub",
          operations:["LoginServiceOperation"]
        },
        {
          service:"TokenValidationThruSearch",
          operations:["Validation"]
        },
        {
          service:"RefreshTokenContentHub",
          operations:["RefreshTokenServiceOperation"]
        },
        {
          service:"CmsService",
          operations:["ContactUs","ContentList","CategoriesList", "ContentListNew", "GetAllStores"]
        }, {
          service:"BrightCove",
          operations:["GetVideo"]
        },{
          service:"GetPushMessage1",
          operations:["getPushMessage"]
        },
        {
          service:"PushMessageOrc",
          operations:["GetPushMessageDetails"]
        },
        {
          service:"ConfigService",
          operations:["GetConfigDetails","getCountryList"]
        },
        {
          service :"MenuHamburger",
          operations:["fetchMenuList"]
        }
      ],
      konysdkObject: null,
      authClient: null,
      integrationObj: null,
      isKonySDKObjectInitialized:false,
      isMFAuthenticated: false
    };

//var CONST_appleClientId = "QV43DA7BER.com.fss.IndusMobile";

// Variable to store the device Width
var screenWidth = kony.os.deviceInfo().screenWidth;

//  Variable to store the device Height
var screenHeight = kony.os.deviceInfo().screenHeight;

var isUserLoggedIn = false;

var gblPASSWORD_MIN_LENGTH = 6;
var gblPASSWORD_MAX_LENGTH = 28;
var gblUSERID_MIN_LENGTH = 6;
var gblUSERID_MAX_LENGTH = 28;

/**global variables of login***/
//variable to store deviceId
var gblDeviceId = "";

//variable to store preffered mode of login
//var gblPreferredLoginMode = "";

//variable to store username and mpin
var gblUserId = "";
var gblMpin = "";
var gblCustomerCareNumber = null;
var gblCustomerCareEmail = null;


///change date to milliseconds
function changeDateToMilliseconds(date){
  return new Date(date).getTime();
}



//function to destroy all forms
function destroyAllForms(){
  kony.application.destroyForm("advancesearchpage");
  kony.application.destroyForm("bonusEarning");
  kony.application.destroyForm("commissionAchieved");
  kony.application.destroyForm("commissionSchedule");
  kony.application.destroyForm("contentdetailpage");
  kony.application.destroyForm("contentvideodetailpage");
  kony.application.destroyForm("feedbackpage");
  kony.application.destroyForm("forgotpassword");
  kony.application.destroyForm("GIPDiamondCurrYear");
  kony.application.destroyForm("GIPDiamondNextYear");
  kony.application.destroyForm("GIPDiamondPrevYear");
  kony.application.destroyForm("GIPDisclaimers");
  kony.application.destroyForm("GIPSegment");
  kony.application.destroyForm("GIPSimulatorHome");
  kony.application.destroyForm("homepage");
  kony.application.destroyForm("incomeSimulatorHome");
  kony.application.destroyForm("incomeSimulatorLOS");
  kony.application.destroyForm("loadingscreenpage");
  kony.application.destroyForm("loginpage");
  kony.application.destroyForm("mycontentpage");
  kony.application.destroyForm("notificationpage");
  kony.application.destroyForm("nutriliteWow");
  kony.application.destroyForm("PDFBrowser");
  kony.application.destroyForm("playvideo");
  kony.application.destroyForm("searchresultspage");

  kony.application.destroyForm("storedetailpage");
  kony.application.destroyForm("storelocatorpage");
  kony.application.destroyForm("termsandconditionspage");
  kony.application.destroyForm("webapppage");
}
// var segData = [{
// 	"profileName": "At Home",
// 	"profileImg": "https://images.contentstack.io/v3/assets/blte699a6163cd8c122/bltd1335d7d0c6e2a4a/5a2a5a6dc36d026545a23e3f/download",
// 	"lbltitle": "How to use SA8",
// 	"contentId": "bltdc806a46c4c4f19c",
// 	"pdfUid": "bltc040a49015e337c9",
// 	"contentType": "pdf",
// 	"lblSeeMore": "See more",
// 	"imgContent": "https://images.contentstack.io/v3/assets/blte699a6163cd8c122/bltba2c2b2dce8a441a/5a2ff5ff06edd11d3292824c/download",
// 	"rchContentDesc": "This document explain how to use SA8 for better results and cleaning.",
// 	"url": "https://assets.contentstack.io/v3/assets/blte699a6163cd8c122/bltc040a49015e337c9/5a2ff60e73340ef831ac65b2/download",
// 	"updatedDate": "2017-12-12T15:34:18.462Z",
// 	"btnLike": {
// 		"skin": "sknLike"
// 	},
// 	"btnShare": {
// 		"skin": "sknShare"
// 	},
// 	"btnBookmark": {
// 		"skin": "sknBookmark"
// 	}
// }, {
// 	"profileName": "At Home",
// 	"profileImg": "https://images.contentstack.io/v3/assets/blte699a6163cd8c122/bltd1335d7d0c6e2a4a/5a2a5a6dc36d026545a23e3f/download",
// 	"lbltitle": "Demo Video of SA8",
// 	"contentId": "bltdc806a46c4c4f19c",
// 	"videoUid": "blt3ac395bf89a29a88",
// 	"contentType": "video",
// 	"lblSeeMore": "See more",
// 	"imgContent": "https://images.contentstack.io/v3/assets/blte699a6163cd8c122/blt6143c2c9a54241cd/5a2ff68ad69e14e528c77976/download",
// 	"rchContentDesc": "New SA8 Liquid Concentrated Laundry Detergent has improved cleaning power, with a dual-enzyme performance that begins wo...",
// 	"url": "https://assets.contentstack.io/v3/assets/blte699a6163cd8c122/blt3ac395bf89a29a88/5a2ff6f6d6098ff7317bcf8d/download",
// 	"updatedDate": "2017-12-12T15:34:18.462Z",
// 	"btnLike": {
// 		"skin": "sknLike"
// 	},
// 	"btnShare": {
// 		"skin": "sknShare"
// 	},
// 	"btnBookmark": {
// 		"skin": "sknBookmark"
// 	}
// }, {
// 	"profileName": "Article",
// 	"profileSub": "Amway India",
// 	"profileImg": "https://images.contentstack.io/v3/assets/blte699a6163cd8c122/blt7044a21c42e49c54/5a2a5b0cf28012873a8f7d27/download",
// 	"lbltitle": "mComm Launch for Amway India",
// 	"contentId": "blt30f4160c87f39280",
// 	"pdfUid": "bltb0316fa8772dcbdd",
// 	"contentType": "pdf",
// 	"lblSeeMore": "See more",
// 	"imgContent": "picture4.png",
// 	"rchContentDesc": "Amway India has launched the mComm App for ABO and PCs and its gives opportunity to ABO to be updated with business and ...",
// 	"url": "https://assets.contentstack.io/v3/assets/blte699a6163cd8c122/bltb0316fa8772dcbdd/5a2fdbdf06edd11d329281aa/download",
// 	"updatedDate": "2017-12-12T13:40:46.089Z",
// 	"btnLike": {
// 		"skin": "sknLike"
// 	},
// 	"btnShare": {
// 		"skin": "sknShare"
// 	},
// 	"btnBookmark": {
// 		"skin": "sknBookmark"
// 	}
// }, {
// 	"profileName": "Article",
// 	"profileSub": "Amway India",
// 	"profileImg": "https://images.contentstack.io/v3/assets/blte699a6163cd8c122/blt7044a21c42e49c54/5a2a5b0cf28012873a8f7d27/download",
// 	"lbltitle": "New Sales Plan",
// 	"contentId": "bltbf021398a0fc7754",
// 	"videoUid": "null",
// 	"contentType": "video",
// 	"lblSeeMore": "See more",
// 	"imgContent": "picture4.png",
// 	"rchContentDesc": "New Sales Plan effective 1st Jan 2018 for ABOs",
// 	"url": "https://players.brightcove.net/1437117781001/default_default/index.html?videoId=5677225907001",
// 	"updatedDate": "2017-12-12T07:51:51.439Z",
// 	"btnLike": {
// 		"skin": "sknLike"
// 	},
// 	"btnShare": {
// 		"skin": "sknShare"
// 	},
// 	"btnBookmark": {
// 		"skin": "sknBookmark"
// 	}
// }, {
// 	"profileName": "Article",
// 	"profileSub": "Amway India",
// 	"profileImg": "https://images.contentstack.io/v3/assets/blte699a6163cd8c122/blt7044a21c42e49c54/5a2a5b0cf28012873a8f7d27/download",
// 	"lbltitle": "New Sales Plan",
// 	"contentId": "bltbf021398a0fc7754",
// 	"videoUid": "null",
// 	"contentType": "video",
// 	"lblSeeMore": "See more",
// 	"imgContent": "picture4.png",
// 	"rchContentDesc": "New Sales Plan effective 1st Jan 2018 for ABOs",
// 	"url": "https://players.brightcove.net/1437117781001/default_default/index.html?videoId=5677225907001",
// 	"updatedDate": "2017-12-12T07:51:51.439Z",
// 	"btnLike": {
// 		"skin": "sknLike"
// 	},
// 	"btnShare": {
// 		"skin": "sknShare"
// 	},
// 	"btnBookmark": {
// 		"skin": "sknBookmark"
// 	}
// },{
// 	"profileName": "Article",
// 	"profileSub": "Amway India",
// 	"profileImg": "https://images.contentstack.io/v3/assets/blte699a6163cd8c122/blt7044a21c42e49c54/5a2a5b0cf28012873a8f7d27/download",
// 	"lbltitle": "aaaa  New Sales Plan",
// 	"contentId": "bltbf021398a0fc7754",
// 	"videoUid": "null",
// 	"contentType": "video",
// 	"lblSeeMore": "See more",
// 	"imgContent": "picture4.png",
// 	"rchContentDesc": "New Sales Plan effective 1st Jan 2018 for ABOs",
// 	"url": "https://players.brightcove.net/1437117781001/default_default/index.html?videoId=5677225907001",
// 	"updatedDate": "2017-12-12T07:51:51.439Z",
// 	"btnLike": {
// 		"skin": "sknLike"
// 	},
// 	"btnShare": {
// 		"skin": "sknShare"
// 	},
// 	"btnBookmark": {
// 		"skin": "sknBookmark"
// 	}
// },
// {
// 	"profileName": "Article",
// 	"profileSub": "Amway India",
// 	"profileImg": "https://images.contentstack.io/v3/assets/blte699a6163cd8c122/blt7044a21c42e49c54/5a2a5b0cf28012873a8f7d27/download",
// 	"lbltitle": "bbb  New Sales Plan",
// 	"contentId": "bltbf021398a0fc7754",
// 	"videoUid": "null",
// 	"contentType": "video",
// 	"lblSeeMore": "See more",
// 	"imgContent": "picture4.png",
// 	"rchContentDesc": "New Sales Plan effective 1st Jan 2018 for ABOs",
// 	"url": "https://players.brightcove.net/1437117781001/default_default/index.html?videoId=5677225907001",
// 	"updatedDate": "2017-12-12T07:51:51.439Z",
// 	"btnLike": {
// 		"skin": "sknLike"
// 	},
// 	"btnShare": {
// 		"skin": "sknShare"
// 	},
// 	"btnBookmark": {
// 		"skin": "sknBookmark"
// 	}
// },
// {
// 	"profileName": "Article",
// 	"profileSub": "Amway India",
// 	"profileImg": "https://images.contentstack.io/v3/assets/blte699a6163cd8c122/blt7044a21c42e49c54/5a2a5b0cf28012873a8f7d27/download",
// 	"lbltitle": "ccc  New Sales Plan",
// 	"contentId": "bltbf021398a0fc7754",
// 	"videoUid": "null",
// 	"contentType": "video",
// 	"lblSeeMore": "See more",
// 	"imgContent": "picture4.png",
// 	"rchContentDesc": "New Sales Plan effective 1st Jan 2018 for ABOs",
// 	"url": "https://players.brightcove.net/1437117781001/default_default/index.html?videoId=5677225907001",
// 	"updatedDate": "2017-12-12T07:51:51.439Z",
// 	"btnLike": {
// 		"skin": "sknLike"
// 	},
// 	"btnShare": {
// 		"skin": "sknShare"
// 	},
// 	"btnBookmark": {
// 		"skin": "sknBookmark"
// 	}
// },{
// 	"profileName": "Article",
// 	"profileSub": "Amway India",
// 	"profileImg": "https://images.contentstack.io/v3/assets/blte699a6163cd8c122/blt7044a21c42e49c54/5a2a5b0cf28012873a8f7d27/download",
// 	"lbltitle": "ddd  New Sales Plan",
// 	"contentId": "bltbf021398a0fc7754",
// 	"videoUid": "null",
// 	"contentType": "video",
// 	"lblSeeMore": "See more",
// 	"imgContent": "picture4.png",
// 	"rchContentDesc": "New Sales Plan effective 1st Jan 2018 for ABOs",
// 	"url": "https://players.brightcove.net/1437117781001/default_default/index.html?videoId=5677225907001",
// 	"updatedDate": "2017-12-12T07:51:51.439Z",
// 	"btnLike": {
// 		"skin": "sknLike"
// 	},
// 	"btnShare": {
// 		"skin": "sknShare"
// 	},
// 	"btnBookmark": {
// 		"skin": "sknBookmark"
// 	}
// },
// {
// 	"profileName": "Article",
// 	"profileSub": "Amway India",
// 	"profileImg": "https://images.contentstack.io/v3/assets/blte699a6163cd8c122/blt7044a21c42e49c54/5a2a5b0cf28012873a8f7d27/download",
// 	"lbltitle": "bbb  New Sales Plan",
// 	"contentId": "bltbf021398a0fc7754",
// 	"videoUid": "null",
// 	"contentType": "video",
// 	"lblSeeMore": "See more",
// 	"imgContent": "picture4.png",
// 	"rchContentDesc": "New Sales Plan effective 1st Jan 2018 for ABOs",
// 	"url": "https://players.brightcove.net/1437117781001/default_default/index.html?videoId=5677225907001",
// 	"updatedDate": "2017-12-12T07:51:51.439Z",
// 	"btnLike": {
// 		"skin": "sknLike"
// 	},
// 	"btnShare": {
// 		"skin": "sknShare"
// 	},
// 	"btnBookmark": {
// 		"skin": "sknBookmark"
// 	}
// },
// {
// 	"profileName": "Article",
// 	"profileSub": "Amway India",
// 	"profileImg": "https://images.contentstack.io/v3/assets/blte699a6163cd8c122/blt7044a21c42e49c54/5a2a5b0cf28012873a8f7d27/download",
// 	"lbltitle": "ddd  New Sales Plan",
// 	"contentId": "bltbf021398a0fc7754",
// 	"videoUid": "null",
// 	"contentType": "video",
// 	"lblSeeMore": "See more",
// 	"imgContent": "picture4.png",
// 	"rchContentDesc": "New Sales Plan effective 1st Jan 2018 for ABOs",
// 	"url": "https://players.brightcove.net/1437117781001/default_default/index.html?videoId=5677225907001",
// 	"updatedDate": "2017-12-12T07:51:51.439Z",
// 	"btnLike": {
// 		"skin": "sknLike"
// 	},
// 	"btnShare": {
// 		"skin": "sknShare"
// 	},
// 	"btnBookmark": {
// 		"skin": "sknBookmark"
// 	}
// },
// {
// 	"profileName": "Article",
// 	"profileSub": "Amway India",
// 	"profileImg": "https://images.contentstack.io/v3/assets/blte699a6163cd8c122/blt7044a21c42e49c54/5a2a5b0cf28012873a8f7d27/download",
// 	"lbltitle": "bbb  New Sales Plan",
// 	"contentId": "bltbf021398a0fc7754",
// 	"videoUid": "null",
// 	"contentType": "video",
// 	"lblSeeMore": "See more",
// 	"imgContent": "picture4.png",
// 	"rchContentDesc": "New Sales Plan effective 1st Jan 2018 for ABOs",
// 	"url": "https://players.brightcove.net/1437117781001/default_default/index.html?videoId=5677225907001",
// 	"updatedDate": "2017-12-12T07:51:51.439Z",
// 	"btnLike": {
// 		"skin": "sknLike"
// 	},
// 	"btnShare": {
// 		"skin": "sknShare"
// 	},
// 	"btnBookmark": {
// 		"skin": "sknBookmark"
// 	}
// },
// {
// 	"profileName": "Article",
// 	"profileSub": "Amway India",
// 	"profileImg": "https://images.contentstack.io/v3/assets/blte699a6163cd8c122/blt7044a21c42e49c54/5a2a5b0cf28012873a8f7d27/download",
// 	"lbltitle": "eee  New Sales Plan",
// 	"contentId": "bltbf021398a0fc7754",
// 	"videoUid": "null",
// 	"contentType": "video",
// 	"lblSeeMore": "See more",
// 	"imgContent": "picture4.png",
// 	"rchContentDesc": "New Sales Plan effective 1st Jan 2018 for ABOs",
// 	"url": "https://players.brightcove.net/1437117781001/default_default/index.html?videoId=5677225907001",
// 	"updatedDate": "2017-12-12T07:51:51.439Z",
// 	"btnLike": {
// 		"skin": "sknLike"
// 	},
// 	"btnShare": {
// 		"skin": "sknShare"
// 	},
// 	"btnBookmark": {
// 		"skin": "sknBookmark"
// 	}
// },
// {
// 	"profileName": "Article",
// 	"profileSub": "Amway India",
// 	"profileImg": "https://images.contentstack.io/v3/assets/blte699a6163cd8c122/blt7044a21c42e49c54/5a2a5b0cf28012873a8f7d27/download",
// 	"lbltitle": "bbb  New Sales Plan",
// 	"contentId": "bltbf021398a0fc7754",
// 	"videoUid": "null",
// 	"contentType": "video",
// 	"lblSeeMore": "See more",
// 	"imgContent": "picture4.png",
// 	"rchContentDesc": "New Sales Plan effective 1st Jan 2018 for ABOs",
// 	"url": "https://players.brightcove.net/1437117781001/default_default/index.html?videoId=5677225907001",
// 	"updatedDate": "2017-12-12T07:51:51.439Z",
// 	"btnLike": {
// 		"skin": "sknLike"
// 	},
// 	"btnShare": {
// 		"skin": "sknShare"
// 	},
// 	"btnBookmark": {
// 		"skin": "sknBookmark"
// 	}
// },
// {
// 	"profileName": "Article",
// 	"profileSub": "Amway India",
// 	"profileImg": "https://images.contentstack.io/v3/assets/blte699a6163cd8c122/blt7044a21c42e49c54/5a2a5b0cf28012873a8f7d27/download",
// 	"lbltitle": "bbb  New Sales Plan",
// 	"contentId": "bltbf021398a0fc7754",
// 	"videoUid": "null",
// 	"contentType": "video",
// 	"lblSeeMore": "See more",
// 	"imgContent": "picture4.png",
// 	"rchContentDesc": "New Sales Plan effective 1st Jan 2018 for ABOs",
// 	"url": "https://players.brightcove.net/1437117781001/default_default/index.html?videoId=5677225907001",
// 	"updatedDate": "2017-12-12T07:51:51.439Z",
// 	"btnLike": {
// 		"skin": "sknLike"
// 	},
// 	"btnShare": {
// 		"skin": "sknShare"
// 	},
// 	"btnBookmark": {
// 		"skin": "sknBookmark"
// 	}
// },
// {
// 	"profileName": "Article",
// 	"profileSub": "Amway India",
// 	"profileImg": "https://images.contentstack.io/v3/assets/blte699a6163cd8c122/blt7044a21c42e49c54/5a2a5b0cf28012873a8f7d27/download",
// 	"lbltitle": "ccc  New Sales Plan",
// 	"contentId": "bltbf021398a0fc7754",
// 	"videoUid": "null",
// 	"contentType": "video",
// 	"lblSeeMore": "See more",
// 	"imgContent": "picture4.png",
// 	"rchContentDesc": "New Sales Plan effective 1st Jan 2018 for ABOs",
// 	"url": "https://players.brightcove.net/1437117781001/default_default/index.html?videoId=5677225907001",
// 	"updatedDate": "2017-12-12T07:51:51.439Z",
// 	"btnLike": {
// 		"skin": "sknLike"
// 	},
// 	"btnShare": {
// 		"skin": "sknShare"
// 	},
// 	"btnBookmark": {
// 		"skin": "sknBookmark"
// 	}
// }


// ];

var staticSearchData= [
  {
    "profileName": "Application",
    "profileSub": "Amway India",
    "profileImg": "amwayindiawebsiteimage.jpg",
    "lbltitle": "SHOP ONLINE",
    "contentId": "SHOP ONLINE",
    "videoUid": "",
    "contentType": "TOOL",
    "lblSeeMore": "",
    "imgContent": "amwayindiawebsiteimage.jpg",
    "rchContentDesc": "Tool",
    "url": "",
    "updatedDate": "",
    "btnLike": {
      "skin": "sknLike"
    },
    "btnShare": {
      "skin": "sknShare"
    },
    "btnBookmark": {
      "skin": "sknBookmark"
    }
  },
  {
    "profileName": "Simulators",
    "profileSub": "Amway India",
    "profileImg": "incomesimulator.jpg",
    "lbltitle": "Income Simulator",
    "contentId": "Income Simulator",
    "videoUid": "",
    "contentType": "TOOL",
    "lblSeeMore": "",
    "imgContent": "incomesimulator.jpg",
    "rchContentDesc": "Tool",
    "url": "",
    "updatedDate": "",
    "btnLike": {
      "skin": "sknLike"
    },
    "btnShare": {
      "skin": "sknShare"
    },
    "btnBookmark": {
      "skin": "sknBookmark"
    }
  },
  {
    "profileName": "Simulators",
    "profileSub": "Amway India",
    "profileImg": "gipsimulator.jpg",
    "lbltitle": "GIP Simulator",
    "contentId": "GIP Simulator",
    "videoUid": "",
    "contentType": "TOOL",
    "lblSeeMore": "",
    "imgContent": "gipsimulator.jpg",
    "rchContentDesc": "Tool",
    "url": "",
    "updatedDate": "",
    "btnLike": {
      "skin": "sknLike"
    },
    "btnShare": {
      "skin": "sknShare"
    },
    "btnBookmark": {
      "skin": "sknBookmark"
    }
  },
  {
    "profileName": "Analyzers",
    "profileSub": "Amway India",
    "profileImg": "nutrilitewowanalyzerimage.jpg",
    "lbltitle": "Nutrilite W.O.W. Program",
    "contentId": "Nutrilite W.O.W. Program",
    "videoUid": "",
    "contentType": "TOOL",
    "lblSeeMore": "",
    "imgContent": "nutrilitewowanalyzerimage.jpg",
    "rchContentDesc": "Tool",
    "url": "",
    "updatedDate": "",
    "btnLike": {
      "skin": "sknLike"
    },
    "btnShare": {
      "skin": "sknShare"
    },
    "btnBookmark": {
      "skin": "sknBookmark"
    }
  },
  {
    "profileName": "Recommenders",
    "profileSub": "Amway India",
    "profileImg": "artistryskincarerecommenderimage.jpg",
    "lbltitle": "Artistry Skincare Recommender",
    "contentId": "Artistry Skincare Recommender",
    "videoUid": "",
    "contentType": "TOOL",
    "lblSeeMore": "",
    "imgContent": "artistryskincarerecommenderimage.jpg",
    "rchContentDesc": "Tool",
    "url": "",
    "updatedDate": "",
    "btnLike": {
      "skin": "sknLike"
    },
    "btnShare": {
      "skin": "sknShare"
    },
    "btnBookmark": {
      "skin": "sknBookmark"
    }
  },

  {
    "profileName": "Consulting Tools",
    "profileSub": "Amway India",
    "profileImg": "productconsulting.jpg",
    "lbltitle": "Product Catalogue",
    "contentId": "Product Catalogue",
    "videoUid": "",
    "contentType": "TOOL",
    "lblSeeMore": "",
    "imgContent": "productconsulting.jpg",
    "rchContentDesc": "Tool",
    "url": "",
    "updatedDate": "",
    "btnLike": {
      "skin": "sknLike"
    },
    "btnShare": {
      "skin": "sknShare"
    },
    "btnBookmark": {
      "skin": "sknBookmark"
    }
  }
  //   ,
  // {
  // 	"profileName": "Consulting Tools",
  // 	"profileSub": "Amway India",
  // 	"profileImg": "mybiz.jpg",
  // 	"lbltitle": "MyBiz",
  // 	"contentId": "MyBiz",
  // 	"videoUid": "",
  // 	"contentType": "TOOL",
  // 	"lblSeeMore": "",
  // 	"imgContent": "mybiz.jpg",
  // 	"rchContentDesc": "Tool",
  // 	"url": "",
  // 	"updatedDate": "",
  // 	"btnLike": {
  // 		"skin": "sknLike"
  // 	},
  // 	"btnShare": {
  // 		"skin": "sknShare"
  // 	},
  // 	"btnBookmark": {
  // 		"skin": "sknBookmark"
  // 	}
  // }
];

// function getTestSegementData(){
//     segmentData = [].concat(segData,segData,segData,segData,segData);
//   	kony.print("Final segment data length::"+segmentData.length);
// }


// storeResponse={

//   "entries": [
//         {
//             "title": "Store 1",
//             "description": "pat",
//             "key_words": "pat",
//             "address_1": "Sample",
//             "address_2": "Sample",
//             "address_3": "12345",
//             "phone": "11111111",
//             "email": "anwar.sadat@amway.com",
//             "operating_hours": "sasasasa",
//             "latitude": "17.402419",
//             "longitude": "78.3923445",
//             "store_pic": {
//                 "uid": "blt7d66042d26485eb8",
//                 "created_at": "2017-09-28T11:27:22.226Z",
//                 "updated_at": "2017-09-28T11:27:22.226Z",
//                 "created_by": "blt174e3c97c924280edd31a5c4",
//                 "updated_by": "blt174e3c97c924280edd31a5c4",
//                 "content_type": "image/jpeg",
//                 "file_size": "777835",
//                 "tags": [],
//                 "filename": "Penguins.jpg",
//                 "url": "https://images.contentstack.io/v3/assets/bltafb318e1c8494656/blt7d66042d26485eb8/59ccdc9a765ca3280d7cdbd6/download",
//                 "ACL": {},
//                 "is_dir": false,
//                 "_version": 1,
//                 "title": "Penguins.jpg",
//                 "publish_details": [
//                     {
//                         "environment": "bltc8f846d9e36b899d",
//                         "locale": "ko-kr",
//                         "time": "2017-11-08T08:54:17.978Z",
//                         "user": "blt174e3c97c924280edd31a5c4",
//                         "version": 1
//                     }
//                 ]
//             },
//             "tags": [],
//             "locale": "en-us",
//             "uid": "blt270fc664fbbd153f",
//             "created_by": "blt174e3c97c924280edd31a5c4",
//             "updated_by": "blt174e3c97c924280edd31a5c4",
//             "created_at": "2017-11-08T10:03:00.515Z",
//             "updated_at": "2017-11-08T10:03:00.515Z",
//             "ACL": {},
//             "_version": 1,
//             "publish_details": [
//                 {
//                     "environment": "bltc8f846d9e36b899d",
//                     "locale": "ko-kr",
//                     "time": "2017-11-08T10:03:05.966Z",
//                     "user": "blt174e3c97c924280edd31a5c4",
//                     "version": 1
//                 }
//             ]
//         },
//     	{
//             "title": "Store 2",
//             "description": "pat",
//             "key_words": "pat",
//             "address_1": "Sample",
//             "address_2": "Sample",
//             "address_3": "42646",
//             "phone": "22222",
//             "email": "anwar.sadat@amway.com",
//             "operating_hours": "sasasasa",
//             "latitude": "1111",
//             "longitude": "22222",
//             "store_pic": {
//                 "uid": "blt7d66042d26485eb8",
//                 "created_at": "2017-09-28T11:27:22.226Z",
//                 "updated_at": "2017-09-28T11:27:22.226Z",
//                 "created_by": "blt174e3c97c924280edd31a5c4",
//                 "updated_by": "blt174e3c97c924280edd31a5c4",
//                 "content_type": "image/jpeg",
//                 "file_size": "777835",
//                 "tags": [],
//                 "filename": "Penguins.jpg",
//                 "url": "https://images.contentstack.io/v3/assets/bltafb318e1c8494656/blt7d66042d26485eb8/59ccdc9a765ca3280d7cdbd6/download",
//                 "ACL": {},
//                 "is_dir": false,
//                 "_version": 1,
//                 "title": "Penguins.jpg",
//                 "publish_details": [
//                     {
//                         "environment": "bltc8f846d9e36b899d",
//                         "locale": "ko-kr",
//                         "time": "2017-11-08T08:54:17.978Z",
//                         "user": "blt174e3c97c924280edd31a5c4",
//                         "version": 1
//                     }
//                 ]
//             },
//             "tags": [],
//             "locale": "en-us",
//             "uid": "blt270fc664fbbd153f",
//             "created_by": "blt174e3c97c924280edd31a5c4",
//             "updated_by": "blt174e3c97c924280edd31a5c4",
//             "created_at": "2017-11-08T10:03:00.515Z",
//             "updated_at": "2017-11-08T10:03:00.515Z",
//             "ACL": {},
//             "_version": 1,
//             "publish_details": [
//                 {
//                     "environment": "bltc8f846d9e36b899d",
//                     "locale": "ko-kr",
//                     "time": "2017-11-08T10:03:05.966Z",
//                     "user": "blt174e3c97c924280edd31a5c4",
//                     "version": 1
//                 }
//             ]
//         },
//     	{
//             "title": "Store 3",
//             "description": "pat",
//             "key_words": "pat",
//             "address_1": "Sample",
//             "address_2": "Sample",
//             "address_3": "48956",
//             "phone": "33333",
//             "email": "anwar.sadat@amway.com",
//             "operating_hours": "sasasasa",
//             "latitude": "1111",
//             "longitude": "22222",
//             "store_pic": {
//                 "uid": "blt7d66042d26485eb8",
//                 "created_at": "2017-09-28T11:27:22.226Z",
//                 "updated_at": "2017-09-28T11:27:22.226Z",
//                 "created_by": "blt174e3c97c924280edd31a5c4",
//                 "updated_by": "blt174e3c97c924280edd31a5c4",
//                 "content_type": "image/jpeg",
//                 "file_size": "777835",
//                 "tags": [],
//                 "filename": "Penguins.jpg",
//                 "url": "https://images.contentstack.io/v3/assets/bltafb318e1c8494656/blt7d66042d26485eb8/59ccdc9a765ca3280d7cdbd6/download",
//                 "ACL": {},
//                 "is_dir": false,
//                 "_version": 1,
//                 "title": "Penguins.jpg",
//                 "publish_details": [
//                     {
//                         "environment": "bltc8f846d9e36b899d",
//                         "locale": "ko-kr",
//                         "time": "2017-11-08T08:54:17.978Z",
//                         "user": "blt174e3c97c924280edd31a5c4",
//                         "version": 1
//                     }
//                 ]
//             },
//             "tags": [],
//             "locale": "en-us",
//             "uid": "blt270fc664fbbd153f",
//             "created_by": "blt174e3c97c924280edd31a5c4",
//             "updated_by": "blt174e3c97c924280edd31a5c4",
//             "created_at": "2017-11-08T10:03:00.515Z",
//             "updated_at": "2017-11-08T10:03:00.515Z",
//             "ACL": {},
//             "_version": 1,
//             "publish_details": [
//                 {
//                     "environment": "bltc8f846d9e36b899d",
//                     "locale": "ko-kr",
//                     "time": "2017-11-08T10:03:05.966Z",
//                     "user": "blt174e3c97c924280edd31a5c4",
//                     "version": 1
//                 }
//             ]
//         },
//     	{
//             "title": "Store 4",
//             "description": "pat",
//             "key_words": "pat",
//             "address_1": "Sample",
//             "address_2": "Sample",
//             "address_3": "89789",
//             "phone": "44444",
//             "email": "anwar.sadat@amway.com",
//             "operating_hours": "sasasasa",
//             "latitude": "1111",
//             "longitude": "22222",
//             "store_pic": {
//                 "uid": "blt7d66042d26485eb8",
//                 "created_at": "2017-09-28T11:27:22.226Z",
//                 "updated_at": "2017-09-28T11:27:22.226Z",
//                 "created_by": "blt174e3c97c924280edd31a5c4",
//                 "updated_by": "blt174e3c97c924280edd31a5c4",
//                 "content_type": "image/jpeg",
//                 "file_size": "777835",
//                 "tags": [],
//                 "filename": "Penguins.jpg",
//                 "url": "https://images.contentstack.io/v3/assets/bltafb318e1c8494656/blt7d66042d26485eb8/59ccdc9a765ca3280d7cdbd6/download",
//                 "ACL": {},
//                 "is_dir": false,
//                 "_version": 1,
//                 "title": "Penguins.jpg",
//                 "publish_details": [
//                     {
//                         "environment": "bltc8f846d9e36b899d",
//                         "locale": "ko-kr",
//                         "time": "2017-11-08T08:54:17.978Z",
//                         "user": "blt174e3c97c924280edd31a5c4",
//                         "version": 1
//                     }
//                 ]
//             },
//             "tags": [],
//             "locale": "en-us",
//             "uid": "blt270fc664fbbd153f",
//             "created_by": "blt174e3c97c924280edd31a5c4",
//             "updated_by": "blt174e3c97c924280edd31a5c4",
//             "created_at": "2017-11-08T10:03:00.515Z",
//             "updated_at": "2017-11-08T10:03:00.515Z",
//             "ACL": {},
//             "_version": 1,
//             "publish_details": [
//                 {
//                     "environment": "bltc8f846d9e36b899d",
//                     "locale": "ko-kr",
//                     "time": "2017-11-08T10:03:05.966Z",
//                     "user": "blt174e3c97c924280edd31a5c4",
//                     "version": 1
//                 }
//             ]
//         },

//     ],
//     "count": 1
// }





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


response = {
  "shopping":
  [
    {
      "catImageMobile": "shop_online.png",
      "catShortTitle": "shop-online",
      "categoryTitle": "SHOP ONLINE",
      "isDirectLink": true
    }
  ],

  "about us":
  [
    {

      "catImageMobile": "heritage_and_values.png",
      "catShortTitle": "heritage_&_values",
      "categoryTitle": "HERITAGE & VALUES"
    },
    {

      "catImageMobile": "fact_sheets.png",
      "catShortTitle": "fact_sheets",
      "categoryTitle": "FACT SHEETS"
    },
    {

      "catImageMobile": "manufacturing.png",
      "catShortTitle": "manufacturing",
      "categoryTitle": "MANUFACTURING"
    },
    {

      "catImageMobile": "awards_and_accolades.png",
      "catShortTitle": "awards_&_accolades",
      "categoryTitle": "AWARDS & ACCOLADES"
    },
    {

      "catImageMobile": "corporate_social_responsibilities.png",
      "catShortTitle": "corporate_social_responsibilities",
      "categoryTitle": "CORPORATE SOCIAL RESPONSIBILITIES"
    },
    {

      "catImageMobile": "media_releases.png",
      "catShortTitle": "media_releases",
      "categoryTitle": "MEDIA RELEASES"
    }
  ],
  "our products":
  [
    {
      "catImageMobile": "nutrition.png",
      "catShortTitle": "nutrition",
      "categoryTitle": "NUTRITION"
    },
    {

      "catImageMobile": "beauty.png",
      "catShortTitle": "beauty",
      "categoryTitle": "BEAUTY"
    },
    {

      "catImageMobile": "personalcare.png",
      "catShortTitle": "personal_care",
      "categoryTitle": "PERSONAL CARE"
    },
    {

      "catImageMobile": "athome.png",
      "catShortTitle": "at_home",
      "categoryTitle": "AT HOME"
    },
    {

      "catImageMobile": "moreproducts.png",
      "catShortTitle": "more_products",
      "categoryTitle": "MORE PRODUCTS"
    },
    {

      "catImageMobile": "catalogue.png",
      "catShortTitle": "catalogue",
      "categoryTitle": "Catalogue",
      "isDirectLink": true
    }
  ],
  "amway business":
  [
    {

      "catImageMobile": "business_opportunity.png",
      "catShortTitle": "business_opportunity",
      "categoryTitle": "BUSINESS OPPORTUNITY",
    },
    {

      "catImageMobile": "amway_recognition.png",
      "catShortTitle": "amway_recognition",
      "categoryTitle": "AMWAY RECOGNITION"
    },
    {

      "catImageMobile": "business_brochures.png",
      "catShortTitle": "business_brochures",
      "categoryTitle": "BUSINESS BROCHURES"
    },
    {

      "catImageMobile": "business_seminars_and_conferences.png",
      "catShortTitle": "business_seminars_and_conferences",
      "categoryTitle": "BUSINESS SEMINARS & CONFERENCES"
    },
    {

      "catImageMobile": "learning_and_development.png",
      "catShortTitle": "learning_and_development",
      "categoryTitle": "LEARNING AND DEVELOPMENT"
    }

  ],
  "tools & enablers":
  [
    {

      "catImageMobile": "icon_wheel.png",
      "catShortTitle": "simulators",
      "categoryTitle": "SIMULATORS",
      "subCategories": [
        {
          "catImageMobile":"https://images.contentstack.io/v3/assets/bltafb318e1c8494656/blt10a7e934a4a85ab8/5a1d0fef87a6ac360724253a/download",
          "catShortTitle":"income-simulator",
          "categoryTitle":"Income Simulator",
          "isDirectLink": true
        }
        ,
        {

          "catImageMobile":"https://images.contentstack.io/v3/assets/bltafb318e1c8494656/bltd06d3025f7e7b37e/5a1d0f5095203aab7b54f4ca/download",
          "catShortTitle":"gip-simulator",
          "categoryTitle":"GIP Simulator",
          "isDirectLink": true
        }]
    },
    {

      "catImageMobile": "icon_medal.png",
      "catShortTitle": "recommenders",
      "categoryTitle": "RECOMMENDERS",
      "subCategories": [
        {
          "catImageTablet":"https://images.contentstack.io/v3/assets/bltafb318e1c8494656/blt7ca6b6f7c5280fe0/5a1d1148e796d29d7bc9670a/download",
          "catImageMobile":"https://images.contentstack.io/v3/assets/bltafb318e1c8494656/blt7ca6b6f7c5280fe0/5a1d1148e796d29d7bc9670a/download",
          "catShortTitle":"artistry",
          "categoryTitle":"Artistry Skincare Recommender",
          "isDirectLink": true
        }
      ]
    },
    {

      "catImageMobile": "icon_analyzer.png",
      "catShortTitle": "analyzers",
      "categoryTitle": "ANALYZERS",
      "subCategories": [
        {
          "catImageTablet":"https://images.contentstack.io/v3/assets/bltafb318e1c8494656/blt7b9882154fdf58a5/5a1d11cddd1a8b5b0781786e/download",
          "catImageMobile":"https://images.contentstack.io/v3/assets/bltafb318e1c8494656/blt7b9882154fdf58a5/5a1d11cddd1a8b5b0781786e/download",
          "catShortTitle":"nutrilite",
          "categoryTitle":"Nutrilite W.O.W. Program",
          "isDirectLink": true
        }
      ]
    }
  ],
  "help":
  [
    {

      "catImageMobile": "icon_phone.png",
      "catShortTitle": "contact-us",
      "categoryTitle": "CONTACT US",
      "isDirectLink": true
    },
    {

      "catImageMobile": "icon_marker.png",
      "catShortTitle": "store-locator",
      "categoryTitle": "STORE LOCATOR",
      "isDirectLink": true
    },
    {

      "catImageMobile": "icon_logout.png",
      "catShortTitle": "logout",
      "categoryTitle": "LOGOUT",
      "isDirectLink": true
    }
  ],




}

/*
//Our Products
result= 
  for(var j=0;j<result.length;j++)
  result[j].subCategories = null;
arrOurProducts = {};
arrOurProducts["our-products"]=result;
storeJson("ourProductsOfflineData",arrOurProducts);




//Amway Business
result= ;
for(var j=0;j<result.length;j++)
  result[j].subCategories = null;
arrAmwayBusiness = {};
arrAmwayBusiness["amway-business"]=result;
storeJson("amwayBusinessOfflineData",arrAmwayBusiness);


//About US
result=;
for(var j=0;j<result.length;j++)
  result[j].subCategories = null;
arrAboutUs = {};
arrAboutUs["about-us"]=result;
storeJson("aboutusOfflineData",arrAboutUs);


//tools and enablers
result=;
arrTools = {};
arrTools["tools"]= result;
storeJson("toolsOfflineData",arrTools);




//help
result= 
  for(var j=0;j<result.length;j++)
  result[j].subCategories = null;
arrHelp = {};
arrHelp["help"]=result;
storeJson("helpOfflineData",arrHelp);



//SHOPPING

result= ;

for(var j=0;j<result.length;j++)
  result[j].subCategories = null;
arrShop = {};
arrShop["shop"]=result;
storeJson("shopOfflineData",arrShop);

*/

