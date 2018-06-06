define({
  init:function() {
    dismissLoading();
    this.applyBindings();
    this.view.onDeviceBack = this.checkAndExit.bind(this);
    this.view.preShow=this.loginPreshow.bind(this);
  },

  loginPreshow:function(){

    this.view.Popup.onTouchStart=function(){
      kony.print("");
    }
    if(comingFromTerms){
      controllerReference.view.textUsername.text =uId;
      controllerReference.view.textPassword.text =uPas;
      controllerReference.enableOrDisableLogin();
      comingFromTerms=false;
    }else{
      this.view.imgTermasCheckBox.src = "";
      controllerReference.view.textUsername.text ="";
      controllerReference.view.textPassword.text ="";
    }
  },

  checkAndExit:function(){
    if(this.view.Popup.isVisible){
      this.infoPopupOff();
    }else if(this.view.flxTermsPoliciesInfo.isVisible){
      this.view.flxTermsPoliciesInfo.isVisible=false;
    }else{
      try{
        //kony.application.exit();
        var nav = new kony.mvc.Navigation("preLoginpage");
        nav.navigate();
      }catch(e){

      }
    }
  },

  infoPopupOn:function(text){
    this.view.flxLogin.zIndex = 1;
    controllerReference.view.Popup.zIndex =4;
    controllerReference.view.Popup.left="0%";
    controllerReference.view.Popup.isVisible = true;
    this.view.textUsername.setEnabled(false);
    this.view.textPassword.setEnabled(false);
    this.view.btnLogin.setEnabled(false);
    this.view.btnKeepMeLoggedIn.setEnabled(false);
    this.view.btnForgotPass.setEnabled(false);
    controllerReference.view.Popup.lblInfoComment.text = text;
  },

  infoPopupOff:function(){

    this.view.flxLogin.zIndex = 4;
    controllerReference.view.textUsername.text ="";
    controllerReference.view.textPassword.text ="";
    this.enableOrDisableLogin();
    if(!isBlankOrNull(controllerReference.view.Popup)){
      controllerReference.view.Popup.zIndex =1;
      controllerReference.view.Popup.left="-100%";
      controllerReference.view.Popup.isVisible = false;
      this.view.textUsername.setEnabled(true);
      this.view.textPassword.setEnabled(true);
      this.view.btnLogin.setEnabled(true);
      this.view.btnKeepMeLoggedIn.setEnabled(true);
      this.view.btnForgotPass.setEnabled(true);

    }
  },

  showNotification:function(){
    try{
      controllerReference.view.Popup2.isVisible=true;
    }catch(e){}
  },

  applyBindings: function() {
    //this.view.cbgKeepMeLoggedIn.selectedKeys = ["KMLI"];
    //this.view.flxLogin.opacity = 0.3;
    //this.view.textPassword.onDone = this.retrieveDataMF.bind(this);
    this.view.postShow = this.loginPagePostshow();
    this.view.btnLogin.onClick = this.retrieveDataMF;
    this.view.flxLogin.onTouchEnd = this.dismissKeypad;
    //this.view.Popup.btnConfirmation.onClick = this.onDismissConfirm;
    this.view.btnKeepMeLoggedIn.onClick = this.onClickKMLI;
    this.view.btnForgotPass.onClick = this.forgotPassword;
    controllerReference = this;
    this.view.ImageKeepMeLoggedIn.src = "icon_check.png";
    controllerReference.view.textUsername.onDone = this.setFocus;
    this.enableOrDisableLogin();
    this.infoPopupOff();
    this.view.Popup.btnConfirmation.onClick = this.infoPopupOff;
    this.view.btnTermsofUse.onClick = this.goToTermsOfUse.bind(this) ; 
    this.view.btnPrivacyPolicy.onClick = this.goToPrivacypolicy.bind(this);
    this.view.flxCheck.onClick = this.onClickTermsPolicyCheckBox.bind(this);
    this.view.flxTermsPoliciesInfo.isVisible = false;
    this.view.acceptOk.onClick = this.goToAcceptOk.bind(this);
    this.view.flxTermsPoliciesInfo.onTouchEnd = this.goToDismissInfo.bind(this);
    pageComponents = ["Popup","Popup2"];

    //       	var getValue = kony.store.getItem("CheckTerms&Policies");
    //       	kony.print("jani >>> getValue "+getValue);
    //       	if(kony.store.getItem("CheckTerms&Policies") === "true"){
    //           kony.print("jani >>> if true ");
    //          this.view.imgTermasCheckBox.src = "icon_check.png";
    //         }
    //       	if(kony.store.getItem("CheckTerms&Policies") === "false" || kony.store.getItem("CheckTerms&Policies") === null){
    //           kony.print("jani >>> if false ");
    //          this.view.imgTermasCheckBox.src = "";
    //         }

    try
    {
      if (!isNetworkAvailable())
      {
        controllerReference.view.flxToast.setVisibility(true);
        //this.view.btnLogin.setEnabled(false);
        this.view.btnForgotPass.setEnabled(false);
        try{
          kony.timer.cancel("timerid1");	
        }catch(e){}

        kony.timer.schedule("timerid1", this.disableFlex.bind(this), 5, false);
      }
      else
        controllerReference.view.flxToast.setVisibility(false);
    } catch(e) {}


    if(kony.os.deviceInfo().name=="iPad"){
      this.view.flxKeepMeLoggedIn.left="0dp";
      this.view.flxTermsAndPolicy.left="0dp";


      this.view.lblIAgreed.skin="IpadSkn";
      this.view.btnTermsofUse.skin="Ipadsknbtn";
      this.view.btnTermsofUse.focusSkin="Ipadsknbtn";
      this.view.lblAnd.skin="IpadSkn";

      this.view.btnPrivacyPolicy.skin="Ipadsknbtn";
      this.view.btnPrivacyPolicy.focusSkin="Ipadsknbtn";
      this.view.FlexContainer0fce7783c3cb542.height="55%";
      this.view.FlexContainer0dd65a57c202948.height="35%";

      this.view.LabelKeepMeLoggedIn.skin="IpadSkn";
      this.view.lblForgotPwd.skin="IpadSkn";
    }


  },

  loginPagePostshow : function(){
    try{
      //this.PostshowAnalytics(this.view);
      var  pageComponents = ["Popup","Popup2"];
      var platform = getDevicePlatform();
      var data = {
        "app_type": platform,
        "app_country": "in",
        "app_language": getDeviceLanguage(),
        "app_digitalProperty": "Amway Business app",
        "app_region": "eia",
        "page_detail": this.view.id, //PAGE NAME, eg: Form1
        "page_components": pageComponents //Names of components in the form/page sent as an array. Example: ["slider","doclist","segTemplate"]
      };
      Tealium.trackView(sender.id,JSON.stringify(data),"eia-hub-app");

    }catch(ex){
      kony.print("jani exception :: "+ex);
    }

  },
  goToTermsOfUse : function(){
    uId= controllerReference.view.textUsername.text;
    uPas= controllerReference.view.textPassword.text ;

    var nav = new kony.mvc.Navigation("termsofusepage");
    nav.navigate();
  },
  goToPrivacypolicy : function(){
    uId= controllerReference.view.textUsername.text;
    uPas= controllerReference.view.textPassword.text ;
    var nav = new kony.mvc.Navigation("privacypolicypage");
    nav.navigate();
  },

  dismissKeypad: function(){
    kony.print("dismissing keypad");
    controllerReference.view.imgAmwayLogo.setFocus(true);
  },
  setFocus: function(){
    controllerReference.view.textPassword.setFocus(true);
  },
  disableFlex: function()
  {
    controllerReference.view.flxToast.setVisibility(false);
    try{
      kony.timer.cancel("timerid");	
    }catch(e){}
    this.view.btnLogin.setEnabled(true);
    this.view.btnForgotPass.setEnabled(true);
  },
  forgotPassword: function()
  {
    //var  pageComponents = ["Popup","Popup2"];
    callTealiumOnClick("click_action", "forgot_password", pageComponents);
    if (!isNetworkAvailable())
    {
      this.view.btnForgotPass.setEnabled(false);
      controllerReference.view.flxToast.setVisibility(true);
      try{
        kony.timer.cancel("timerid");	
      }catch(e){}
      kony.timer.schedule("timerid", this.disableFlex.bind(this), 5, false);
    }
    else
    {
      var ntf = new kony.mvc.Navigation("forgotpassword");
      ntf.navigate();
    }

  },
  enableOrDisableLogin: function()
  {
    if (isNullOrEmpty(controllerReference.view.textUsername.text) || isNullOrEmpty(controllerReference.view.textPassword.text))
    {
      controllerReference.view.btnLogin.skin = skinLoginDiasble;
      controllerReference.view.btnLogin.focusSkin = skinLoginDiasble;
      this.view.btnLogin.onClick = null;
    }
    else
    {
      controllerReference.view.btnLogin.skin = skinBtnLogin;
      controllerReference.view.btnLogin.focusSkin = skinBtnLogin;
      //this.view.btnLogin.onClick = this.retrieveDataMF;
      this.view.btnLogin.onClick = this.checkTermsAndPolicyInfo;
    }
  },

  getHamburgerMenuSuccessCallback:function(response){

    try{
      Hresponse= JSON.parse(response["result"]);
      Hresponse= Hresponse["result"];
      storeJson("Hresponse", Hresponse);
      kony.print(JSON.stringify(Hresponse));

      controllerReference.getAccessToken();
    }catch(e){

    }
  },

  getHamburgerMenuErrorCallback:function(){
    controllerReference.infoPopupOn(getI18Value("ServiceFailureMessage"));
    //controllerReference.getAccessToken();
  },

  getHamburgerMenu:function(){

    if (isNetworkAvailable()) {
      mobileFabricConfiguration.integrationObj = mobileFabricConfiguration.konysdkObject.getIntegrationService(mobileFabricConfiguration.integrationServices[9].service);
      var operationName = mobileFabricConfiguration.integrationServices[9].operations[0];
      var headers = {};
      data = {};
      mobileFabricConfiguration.integrationObj.invokeOperation(operationName, headers, data, this.getHamburgerMenuSuccessCallback, this.getHamburgerMenuErrorCallback);
    } else {
      controllerReference.view.flxToast.setVisibility(true);

      try {
        //this.view.btnLogin.setEnabled(false);
        try{
          kony.timer.cancel("timerid");	
        }catch(e){}	
        kony.timer.schedule("timerid", this.disableFlex.bind(this), 5, false);
      }catch (e) {}
    }



  },

  retrieveDataMF: function() {
    kony.print(" ********** Entering into retrieveDataMF ********** ");
    gblABOID=controllerReference.view.textUsername.text;
    DistributorID = parseInt(gblABOID);
    var visitor_imcID = gblVisitorIndiaCode * 100000000000 + DistributorID;
    kony.print("jani >>> visitor_imcID "+visitor_imcID);
    gblVisitor_imcID = visitor_imcID;
    kony.store.setItem("visitorImcID", gblVisitor_imcID);
    kony.print("jani >>> gblVisitor_imcID1 "+gblVisitor_imcID);
    callTealiumOnClick("click_action", "Login Button",pageComponents,gblVisitor_imcID);
    if (!mobileFabricConfiguration.isKonySDKObjectInitialized) {
      kony.print("MF not Initialized ");
      controllerReference.initializeMF();
    } else if (mobileFabricConfiguration.isKonySDKObjectInitialized) {
      controllerReference.getHamburgerMenu();
      kony.print("MF Initialized already");
    }
    kony.print(" ********** Exiting out of retrieveDataMF ********** ");
  },

  initializeMF: function() {
    kony.print(" ********** Entering into initializeMF ********** ");
    if (isNetworkAvailable()) {
      showLoading();
      mobileFabricConfiguration.konysdkObject = new kony.sdk();
      mobileFabricConfiguration.konysdkObject.init(mobileFabricConfiguration.appKey, mobileFabricConfiguration.appSecret, mobileFabricConfiguration.serviceURL, function(response) {
        kony.print(" ********** Entering into initializeMFSuccess ********** ");
        kony.print(" ********** Success initializeMFSuccess response : " + JSON.stringify(response) + " ********** ");
        mobileFabricConfiguration.isKonySDKObjectInitialized = true;

        kony.print("initialization successful");
        controllerReference.getHamburgerMenu();
        kony.print(" ********** Exiting out of initializeMFSuccess ********** ");
      }, function(error) {
        kony.print(" ********** Entering into initializeMFFailure ********** ");
        kony.print(" ********** Failure in initializeMF: " + JSON.stringify(error) + " ********** ");
        dismissLoading();
        controllerReference.infoPopupOn(getI18Value("ServiceFailureMessage"));
        kony.print(" ********** Exiting out of initializeMFFailure ********** ");
      });
    } else {
      //showInformationAlert("Info", getI18Value("OfflineMessage"));
      //controllerReference.infoPopupOn(getI18Value("OfflineMessage"));
      controllerReference.view.flxToast.setVisibility(true);
      try {
        // this.view.btnLogin.setEnabled(false);
        try{
          kony.timer.cancel("timerid");	
        }catch(e){}
        kony.timer.schedule("timerid", this.disableFlex.bind(this), 5, false);
      }catch (e) {}
    }
    kony.print(" ********** Exiting out of initializeMF ********** ");
  },

  loginSuccessTealiumOnClick: function(event_name,click_detail,pageComponents){

    // gblABOID=controllerReference.view.textUsername.text;
    // DistributorID = parseInt(gblABOID);
    // var visitor_imcID = gblVisitorIndiaCode * 100000000000 + DistributorID;
    //kony.print("jani >>> visitor_imcID "+visitor_imcID);
    //gblVisitor_imcID = visitor_imcID;
    kony.print("jani >>> gblVisitor_imcID2 "+gblVisitor_imcID);
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
      "page_components": ["btnLogin"]
    };
    Tealium.trackEvent("button_clicked",JSON.stringify(data),"eia-hub-app");
    //kony.print("track event called : "+JSON.stringify(data));
  },


  getAccessToken: function() {
    kony.print(" ********** Entering into getToken ********** ");

    function getTokenSuccessCallback(getTokenResponse) {
      kony.print(" ********** Entering into getTokenSuccessCallback ********** ");
      //controllerReference.loginSuccessTealiumOnClick("abo_login", "login_success",pageComponents);
      callTealiumOnClick("abo_login", "login_success",pageComponents,gblVisitor_imcID);
      if (getTokenResponse.opstatus === 0 && !getTokenResponse.hasOwnProperty("errors")) {
        kony.print("Response : " + JSON.stringify(getTokenResponse));
        kony.store.setItem("accessToken", getTokenResponse.accessToken);
        kony.print("accessToken is ::" + kony.store.getItem("accessToken"));
        kony.store.setItem("tokenType", getTokenResponse.tokenType);
        kony.store.setItem("refreshToken", getTokenResponse.refreshToken);
        controllerReference.getLoginService();
      } else {
        controllerReference.infoPopupOn(getI18Value("ServiceFailureMessage"));
      }
      kony.print(" ********** Exiting out of getTokenSuccessCallback ********** ");
    }

    function getTokenErrorCallback(errormsg) {
      kony.print(" ********** Entering into getTokenErrorCallback ********** ");
      //controllerReference.view.Popup.flxConfirmation.isVisible = true;
      kony.print(" ********** Failure in getTokenErrorCallback: " + JSON.stringify(errormsg) + " ********** ");
      dismissLoading();
      if(errormsg.hasOwnProperty("errors") && !isBlankOrNull(errormsg.errors[0]) && !isBlankOrNull(errormsg.errors[0].message) && (errormsg.errors[0].message === "Bad credentials" || errormsg.errors[0].message === "User is disabled"))
      {	//alert("inside")
        //showInformationAlert("Info", getI18Value("InvalidCredentialsMessage"));
        //controllerReference.view.Popup.flxConfirmation.isVisible = true;
        kony.print("setting opacity");
        callTealiumOnClick("form_error","Invalid Credentials" ,pageComponents,gblVisitor_imcID);
        //                 controllerReference.view.textUsername.text ="";
        //         		controllerReference.view.textPassword.text ="";
        //                 controllerReference.view.textUsername.setFocus(false);
        //                 controllerReference.view.textPassword.setFocus(false);
        controllerReference.infoPopupOn(getI18Value("InvalidCredentialsMessage"));
        //this.view.flxInfoPopup.setVisibility(true);
        //networkPopupController.displayInformation();
        //this.view.NetworkPopup.displayInformation();
        //this.view.NetworkPopup.setVisibility(true);
        //controllerObj = require("NetworkPopupController");
        //alert("inside "+ controllerReference );
        //controllerReference.displayInformation();
        //alert("inside ");
        // controllerObj.view.NetworkPopup.displayInformation();
      }else
        controllerReference.infoPopupOn(getI18Value("ServiceFailureMessage"));
      kony.print(" ********** Exiting out of getTokenErrorCallback ********** ");
    }

    if (isNetworkAvailable()) {
      showLoading();
      mobileFabricConfiguration.integrationObj = mobileFabricConfiguration.konysdkObject.getIntegrationService(mobileFabricConfiguration.integrationServices[0].service);
      var operationName = mobileFabricConfiguration.integrationServices[0].operations[0];
      var headers = {};

      var userName =  this.view.textUsername.text;
      var password = this.view.textPassword.text;

      if(isBlankOrNull(userName) || isBlankOrNull(password)){
        controllerReference.infoPopupOn(getI18Value("RequestCredentialsMessage"));
        dismissLoading();
        return;
      }

      data = {
        "client_id": "mobile_android_customer",
        "client_secret": "$tore@123",
        "grant_type": "password",
        "username":userName,
        "password":password,
        "storeCode": ""
      };
      mobileFabricConfiguration.integrationObj.invokeOperation(operationName, headers, data, getTokenSuccessCallback, getTokenErrorCallback);
    } else {
      controllerReference.view.flxToast.setVisibility(true);

      try {
        //this.view.btnLogin.setEnabled(false);
        try{
          kony.timer.cancel("timerid");	
        }catch(e){}	
        kony.timer.schedule("timerid", this.disableFlex.bind(this), 5, false);
      }catch (e) {}
    }

  },

  getLoginService: function() {
    kony.print("**************** Entering into getLoginSerive **********************");

    function LoginServiceSuccessCallback(LoginServiceResponse) {
      try
      {
        if (controllerReference.view.ImageKeepMeLoggedIn.src === "icon_check.png"){
          kony.print("Tokens are stored");
          kony.store.setItem("keepMeLoggedIn", "true");
        } else {
          kony.print("Removing the tokens as not selected");
          clearLoginTokenFromStore();

        }
        kony.print("**************** Entering into LoginServiceSuccessCallback **********************");
        kony.print("Response : " + JSON.stringify(LoginServiceResponse));
        if (LoginServiceResponse.userGroup === "ABO") {
          //TODO:FetchContentservice
          gblABOID=controllerReference.view.textUsername.text;
          registerForKMS();
          kony.print("User logged in successfully");
          LoggedIn=true;

          if(comingFromNotification){
            if(registrationWithKMS){
              var frmHome = new kony.mvc.Navigation("notificationpage");
              frmHome.navigate();
              comingFromNotification=false;
            }else{

              try{
                kony.timer.schedule("reg", controllerReference.navigateNoti, 5, false);
              }catch(e){

              }
            }

          }
          else{
            var frmHome1 = new kony.mvc.Navigation("homepage");
            frmHome1.navigate();
          }

        } 
        else {
          clearLoginTokenFromStore();
          controllerReference.infoPopupOn(getI18Value("OnlyABOMessage"));
          dismissLoading();
        }
        kony.print("**************** Exiting out of LoginServiceSuccessCallback **********************");
      }catch(e){
        clearLoginTokenFromStore();
        kony.print("Exception in getLoginService "+e);
      }
    }

    function LoginServiceErrorCallback(errormsg) {
      kony.print(" ********** Entering into LoginServiceErrorCallback ********** ");
      kony.print(" ********** Failure in LoginServiceErrorCallback: " + JSON.stringify(errormsg) + " ********** ");
      dismissLoading();
      clearLoginTokenFromStore();
      controllerReference.infoPopupOn(getI18Value("ServiceFailureMessage"));
      kony.print(" ********** Exiting out of LoginServiceErrorCallback ********** ");
    }
    if (isNetworkAvailable()) {

      mobileFabricConfiguration.integrationObj = mobileFabricConfiguration.konysdkObject.getIntegrationService(mobileFabricConfiguration.integrationServices[1].service);
      var operationName = mobileFabricConfiguration.integrationServices[1].operations[0];
      var headers = {
        "Authorization": kony.store.getItem("tokenType") + " " + kony.store.getItem("accessToken")
      };
      var userName =  controllerReference.view.textUsername.text;
      var password = controllerReference.view.textPassword.text;
      if(isBlankOrNull(userName) || isBlankOrNull(password)){
        controllerReference.infoPopupOn(getI18Value("RequestCredentialsMessage"));
        return;
      }
      data = {
        "username": userName,
        "password": password,
        "ksId": "ksId",
        "deviceId": kony.os.deviceInfo().deviceid
      };

      mobileFabricConfiguration.integrationObj.invokeOperation(operationName, headers, data, LoginServiceSuccessCallback, LoginServiceErrorCallback);
    }
    else {
    }

  },

  navigateNoti:function(){

    try{
      kony.timer.cancel("reg");
    }catch(e){}
    comingFromNotification=false;
    var nav = new kony.mvc.Navigation("notificationpage");
    nav.navigate();

  },
  onClickKMLI: function() 
  {
    kony.print("Entering into on click of keep me logged in");
    if (this.view.ImageKeepMeLoggedIn.src === "icon_check.png")
    {
      this.view.ImageKeepMeLoggedIn.src = "";
      kony.print("image : icon_checkbox");
    }

    else
    {
      this.view.ImageKeepMeLoggedIn.src = "icon_check.png";
      kony.print("image : icon_check");
    }
  },

  onClickTermsPolicyCheckBox: function(){ 
    kony.print("jani >>> click on terms&policy check box");
    if (this.view.imgTermasCheckBox.src  === "icon_check.png")
    {
      this.view.imgTermasCheckBox.src = "";
      kony.print("image : icon_checkbox");
      //kony.store.setItem("CheckTerms&Policies", "false");
    }

    else
    {
      this.view.imgTermasCheckBox.src = "icon_check.png";
      kony.print("image : icon_check");
      //kony.store.setItem("CheckTerms&Policies", "true");
    }
  },
  checkTermsAndPolicyInfo : function(){
    if( this.view.imgTermasCheckBox.src === "icon_check.png"){
      this.view.flxTermsPoliciesInfo.isVisible = false; 
      this.retrieveDataMF();
    }else{
      this.view.flxTermsPoliciesInfo.isVisible = true;
    }
    //     if(kony.store.getItem("CheckTerms&Policies") === "false" || kony.store.getItem("CheckTerms&Policies") === null){
    //       this.view.flxTermsPoliciesInfo.isVisible = true;
    //     }

  },
  goToDismissInfo : function(){

  },
  goToAcceptOk : function(){
    this.view.flxTermsPoliciesInfo.isVisible = false;
  },

  onNavigate : function() {
    this.init();
  }
});