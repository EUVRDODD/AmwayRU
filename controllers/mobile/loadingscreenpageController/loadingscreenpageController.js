define({

  //Type your controller code here
  _init :function(){
    //this.applyBinding();
  },
  onNavigate:function(){
    loadingpageObj = this;
    this.applyBinding();
  },

  applyBinding : function(){

    kony.print("@@@ applyBinding");

    this.view.infoPopup.onBtnOkClick = this.onMandateOkClick.bind(this);
    this.view.Upgrade.onBtnOkClick = this.onOptionalOkClick.bind(this);
    this.view.Upgrade.onBtnCancelClick = this.onOptionalCancelClick.bind(this);
  },
  navigationFromLoading:function(){
    if (gblStartupForm == "homepage") {
      kony.print("Hello Navigatin to home form ");
      LoggedIn=true;
      kony.print("jani >>> remember visitorIMCID "+kony.store.getItem("visitorImcID"));
      gblVisitor_imcID = kony.store.getItem("visitorImcID");
      var frmHome = new kony.mvc.Navigation("homepage");
      frmHome.navigate();

    } else if (gblStartupForm == "loginpage") {
      kony.print("Hello Navigatin to login form ");
      kony.print("Status : " + status.statusMessage);
      var frmLogin = new kony.mvc.Navigation("preLoginpage");
      frmLogin.navigate();
    }else if(gblStartupForm == "notificationpage"){
      kony.print("Hello Navigatin to notification form ");
      kony.print("Status : " + status.statusMessage);
      LoggedIn=true;
      var ntf = new kony.mvc.Navigation("notificationpage");
      ntf.navigate();
    }
  },

  checkAppVersion : function(){
    try{
      kony.print("jani >>> checkAppVersion inside ");
      if(isNetworkAvailable()){
        //showLoading();
        if(mobileFabricConfiguration.isKonySDKObjectInitialized){
          mobileFabricConfiguration.integrationObj = mobileFabricConfiguration.konysdkObject.getIntegrationService(mobileFabricConfiguration.integrationServices[8].service);
          var operationName = mobileFabricConfiguration.integrationServices[8].operations[0];
          var headers = {};
          var data = {};
          kony.print("Jani >>> operation Name "+operationName);
          mobileFabricConfiguration.integrationObj.invokeOperation(operationName, headers, data, this.checkAppVersionSuccessCallback, this.checkAppVersionErrorCallback);
        }
        else {
          this.initializeMF("CHECK_APP_VERSION");
        }

      }
      else{
        loadingpageObj.navigationFromLoading();
        kony.print("Internet Connection was Required ");
      }
    }catch(ex){
      loadingpageObj.navigationFromLoading();
      kony.print("jani >>> checkAppVersion exception : "+ex);
    }
  },

  checkAppVersionSuccessCallback : function(success){
    try{
      dismissLoading();
      kony.print("jani >>> checkAppVersion Success call::"+JSON.stringify(success));
      if(success.opstatus === 0){

        loadingpageObj.getHamburgerMenu();
        var formattedResponse = JSON.parse(success.result);
        kony.print("jani >>> checkAppVersion Formatted Values::"+JSON.stringify(formattedResponse));
        loadingpageObj.validateAppVersion(formattedResponse);
        storeJson("configProperties",formattedResponse);
      }else{
        loadingpageObj.navigationFromLoading();
      }
    }
    catch(ex){
      loadingpageObj.navigationFromLoading();
      kony.print("jani >>> checkAppVersionSuccessCallback exception "+ex);
    }
  },
  checkAppVersionErrorCallback : function(error){
    try{
      loadingpageObj.navigationFromLoading();
      dismissLoading();
      kony.print("jani >>> checkAppVersion Error call::"+JSON.stringify(error));
    }
    catch(ex){
      loadingpageObj.navigationFromLoading();
      kony.print("jani >>> checkAppVersionErrorCallback exception "+ex);
    }
  },
  validateAppVersion : function(data){
    try{
      kony.print("jani >>> Version::"+appConfig.appVersion);
      var currentVersion = appConfig.appVersion;
      gblServiceLang = data.configProps.appVersion;
      gblAppLanguage = data.configProps.appLanguage;
      gblAppLocale = "en_IN";
      this.setAppLocale(gblAppLocale);
      var min = "",max = "";
      if(isIOS()){
        min = data.configProps.iOS_Min_Version;
        max = data.configProps.iOS_Max_Version;
      }else{
        min = data.configProps.Android_Min_Version;
        max = data.configProps.Android_Max_Version;
      }
      // min = "1.1.0";
      //max = "2.0.0";
      var minCompare = loadingpageObj.compareVersions(currentVersion,min);
      var maxCompare = loadingpageObj.compareVersions(currentVersion,max);
      kony.print("jani >>> minCompare::"+minCompare);
      kony.print("jani >>> maxCompare::"+maxCompare);
      if(minCompare === -1){
        kony.print("jani >>> update is mandatory");
        this.view.infoPopup.storeLocatorMessageDisplay(getI18Value("amway.mandate_update"));
        this.view.flxMandateUpdate.setVisibility(true);
        this.view.flxOptionalUpdate.setVisibility(false);
        kony.print("jani >>> Reached end of loop");
      }else if(maxCompare === 0  || maxCompare === 1){
        kony.print("jani >>> App-up-todate");
        this.view.flxMandateUpdate.setVisibility(false);
        this.view.flxOptionalUpdate.setVisibility(false);
        loadingpageObj.navigationFromLoading();
        kony.print("jani >>> up-todate Reached end of loop");
      }else {
        kony.print("jani >>> update is optional");
        this.view.Upgrade.setDisplayMessage(getI18Value("amway.optional_update"));
        this.view.flxOptionalUpdate.setVisibility(true);
        this.view.flxMandateUpdate.setVisibility(false);
        kony.print("jani >>> Reached end of loop");
      }
    }catch(e){
      loadingpageObj.navigationFromLoading();
      kony.print("jani >>> in validateAppVersion  "+e);
    }

  },
  compareVersions : function(currentVersion, compareVersion){
    // Return 1 if currentVersion > compareVersion
    // Return -1 if currentVersion < compareVersion
    // Return 0 if currentVersion == compareVersion
    if (currentVersion === compareVersion) {
      return 0;
    }

    var currentVersion_components = currentVersion.split(".");
    var compareVersion_components = compareVersion.split(".");

    kony.print("jani >>> currentVersion_components "+currentVersion_components);
    kony.print("jani >>> compareVersion_components"+compareVersion_components);

    var len = Math.min(currentVersion_components.length, compareVersion_components.length);
    kony.print("jani >>> length "+len);

    // loop while the components are equal
    for (var i = 0; i < len; i++) {
      // currentVersion bigger than compareVersion
      if (parseInt(currentVersion_components[i]) > parseInt(compareVersion_components[i])) {
        kony.print("jani >>> :current version > than");
        return 1;
      }

      // compareVersion bigger than currentVersion
      if (parseInt(currentVersion_components[i]) < parseInt(compareVersion_components[i])) {
        kony.print("jani >>> :current version < than");
        return -1;
      }
    }

    // If one's a prefix of the other, the longer one is greater.
    if (currentVersion_components.length > compareVersion_components.length) {
      kony.print("jani >>> :current version length > than");
      return 1;
    }

    if (currentVersion_components.length < compareVersion_components.length) {
      kony.print("jani >>> :current version < than");
      return -1;
    }

    // Otherwise they are the same.
    return 0;
  },
  setAppLocale : function(locale){
    kony.i18n.setCurrentLocaleAsync(locale, this.setAppLocaleSuccess, this.setAppLocaleFailure);
  },
  setAppLocaleSuccess : function(oldlocalename,newlocalename){
    kony.print("App locale changed from "+oldlocalename+" to "+newlocalename);
  },
  setAppLocaleFailure : function(errCode,errMsg){
    kony.print("Error in setting Locale::"+errMsg);
  },
  onMandateOkClick : function(){
    if(isIOS()){
      kony.application.openURL("https://itunes.apple.com/in/app/amway-india-digital-tool-box-m/id1087710829?mt=8");
    }else{
      kony.application.openURL("https://play.google.com/store/apps/details?id=com.amway.amwayindia&hl=en");
    }
    //this.navigationFromLoading();
    kony.application.exit();
    kony.print("jani >>> mandate OK Click End");
  },
  onOptionalCancelClick : function(){
    this.view.flxOptionalUpdate.setVisibility(false);
    loadingpageObj.navigationFromLoading();
    kony.print("jani >>> onOptional Cancel Click End");
  },
  onOptionalOkClick : function(){
    //this.view.flxOptionalUpdate.setVisibility(false);
    if(isIOS()){
      kony.application.openURL("https://itunes.apple.com/in/app/amway-india-digital-tool-box-m/id1087710829?mt=8");
    }else{
      kony.application.openURL("https://play.google.com/store/apps/details?id=com.amway.amwayindia&hl=en");
    }
    //this.navigationFromLoading();
    kony.application.exit();
    kony.print("jani >>> onOptional OK Click End");
  },

  getHamburgerMenuSuccessCallback:function(response){

    // kony.print(JSON.stringify(response));
    try{
      Hresponse= JSON.parse(response["result"]);
      Hresponse= Hresponse["result"];
      storeJson("Hresponse", Hresponse);
      kony.print(JSON.stringify(Hresponse));
    }catch(e){

    }

  },

  getHamburgerMenuErrorCallback:function(){


    kony.print("In failure callback of getHamburgerMenu");

  },

  getHamburgerMenu:function(){
    if (!mobileFabricConfiguration.isKonySDKObjectInitialized) {
      kony.print("MF not Initialized ");
      loadingpageObj.initializeMF("Hamburger");
    }else{
      if (isNetworkAvailable()) {
        mobileFabricConfiguration.integrationObj = mobileFabricConfiguration.konysdkObject.getIntegrationService(mobileFabricConfiguration.integrationServices[9].service);
        var operationName = mobileFabricConfiguration.integrationServices[9].operations[0];
        var headers = {};
        data = {};
        mobileFabricConfiguration.integrationObj.invokeOperation(operationName, headers, data, this.getHamburgerMenuSuccessCallback, this.getHamburgerMenuErrorCallback);
      } else {
			return;
      }


    }
  },

  initializeMF: function(context) {
    try{
      kony.print(" ********** Entering into initializeMF ********** ");
      if (isNetworkAvailable()) {
        //showLoading();
        mobileFabricConfiguration.konysdkObject = new kony.sdk();
        mobileFabricConfiguration.konysdkObject.init(mobileFabricConfiguration.appKey, mobileFabricConfiguration.appSecret, mobileFabricConfiguration.serviceURL, function(response) {
          kony.print(" ********** Entering into initializeMFSuccess ********** ");
          mobileFabricConfiguration.isKonySDKObjectInitialized = true;
          dismissLoading();
          kony.print("initialization successful");
          if (context == "CHECK_APP_VERSION") {
            loadingpageObj.checkAppVersion();
          }else if(context=="Hamburger"){
            loadingpageObj.getHamburgerMenu();
          }
          kony.print(" ********** Exiting out of initializeMFSuccess ********** ");
        }, function(error) {
          loadingpageObj.navigationFromLoading();
          kony.print(" ********** Entering into initializeMFFailure ********** ");
          kony.print(" ********** Failure in initializeMF: " + JSON.stringify(error) + " ********** ");
          dismissLoading();
          kony.print(" ********** Exiting out of initializeMFFailure ********** ");
        });
      } else {
        loadingpageObj.navigationFromLoading();
      }
      kony.print(" ********** Exiting out of initializeMF ********** ");
    }
    catch(ex){
      loadingpageObj.navigationFromLoading();
      kony.print("jani >>> initializeMF Exception : "+ex);
    }
  },

});