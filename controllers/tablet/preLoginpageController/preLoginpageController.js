define({ 
  //Type your controller code here 
  onNavigate: function() {
    this.init();
  },
  init : function(){
    this.applyBindings(); 
    this.otherRememberLogics();
  },
  applyBindings : function(){
    this.view.onDeviceBack = this.checkAndExit.bind(this);
    this.view.languageListBox.onSelection = this.languageSelection.bind(this);
    this.view.btnContinueLogin.onClick = this.continueLogin.bind(this);
    this.view.btnGuestLogin.onClick = this.guestLogin.bind(this);
    this.view.preShow = this.preLoginPreshow.bind(this);
  },
  otherRememberLogics : function(){
    this.view.flxToast.isVisible = false;
    //this.view.flxPreLogin.bottom = "-100%";
    this.view.languageListBox.selectedKey = kony.store.getItem("countryKey");
    if(kony.store.getItem("countryKey") === null || kony.store.getItem("countryKey") == "select" || kony.store.getItem("countryKey") === undefined){
          this.view.flxPreLogin.bottom = "-100%";
        }
        else{
          this.view.flxPreLogin.bottom = "20%";
        }
  },
  disableFlexToast : function(){
    this.view.flxToast.isVisible = false;
  },
  checkAndExit : function(){
    kony.application.exit();
  },
  languageSelection : function(){
    var currentLocale = kony.i18n.getCurrentLocale();
    var countryKey = this.view.languageListBox.selectedKey;
    kony.store.setItem("countryKey", countryKey);
    this.getSelectedLocale(countryKey);
    this.countrySelectAnimation(countryKey);	// Move animation from bottom to top to see the prelogin buttons
    //kony.print("jani >>> current locale is "+currentLocale+" country key is "+countryKey);
  },
  getSelectedLocale :function(countryKey){
    try{
      var countryLocaleKey = countryKey;
      kony.print("jani >>> key is "+countryLocaleKey);
      var prevkey=kony.i18n.getCurrentLocale();
      kony.print("jani >>> prev Key is "+prevkey);
      if(countryLocaleKey !== prevkey){
        kony.print("jani >>> Selected key is "+countryLocaleKey);
        kony.i18n.setCurrentLocaleAsync(countryLocaleKey,this.destroyForms,this.doNothing);
      }
    }catch(ex){
      kony.print("jani >>> locale exception "+JSON.stringify(ex));
    }

  },

  destroyForms : function(){
    this.view.btnContinueLogin.text = getI18Value("ContinueAsLogin");
    this.view.btnGuestLogin.text = getI18Value("ContinueAsGuest");
    var frmArray =  ["loginpage",
                     "homepage",
                     "contentdetailpage",
                     "feedbackpage",
                     "forgotPassword",
                     "mycontentpage",
                     "notificationpage",
                     "searchresultspage",
                     "searchstorelocationpage",
                     "settingpage",
                     "storedetailpage",
                     "storelocatorpage",
                     "privacypolicypage",
                     "incomeSimulatorHome",
                     "GIPSimulatorHome",
                     "webapppage"
                    ];

    kony.print("entered destroyform");
    for(i=0;i<frmArray.length;i++){
      kony.application.destroyForm(frmArray[i]); 
    }
    dismissLoading();
    kony.print("jani >>> locale change success "+kony.i18n.getCurrentLocale());
  },
  doNothing : function(){
    //kony.print("jani >>> locale change error "+kony.i18n.getCurrentLocale());
  },
  continueLogin : function(){
    showLoading();
    kony.store.setItem("guest", "false");
    var nav = new kony.mvc.Navigation("loginpage");
    nav.navigate();
  },
  guestLogin : function(){
    showLoading();
    kony.store.setItem("guest", "true");
    var nav = new kony.mvc.Navigation("homepage");
    nav.navigate();
  },
  countrySelectAnimation : function(countryKey){
    //alert("country key "+countryKey);
    var bottom = "";
    if(countryKey == "select" || countryKey === null){
      bottom = "-100%";
    } else {
      bottom = "20%";
    }
    var animObject = kony.ui.createAnimation(
      {
        "100": {
          "bottom": bottom,
          "stepConfig": {
            "timingFunction": kony.anim.EASE
          }
        }
      });
    var timingConfig = {
      "delay": 0,
      "iterationCount": 1,
      "fillMode": kony.anim.FILL_MODE_FORWARDS,
      "duration": 0.8
    };
    var callBackObject = {
      "animationEnd": function(){kony.print('End of anim');}
    };
    this.view.flxPreLogin.animate(animObject, timingConfig, callBackObject);
  },

  preLoginPreshow : function(){
    this.getCountriesList();
  },
  getCountriesList : function(){
    kony.print("jani >>> Inside getCountriesList function : ");
    if (isNetworkAvailable()) {
      kony.print("jani >>> Network available for getCountriesList : ");
      showLoading();
      if (mobileFabricConfiguration.isKonySDKObjectInitialized) {
        kony.print("jani >>> Ïnside if condition");
        mobileFabricConfiguration.integrationObj = mobileFabricConfiguration.konysdkObject.getIntegrationService(mobileFabricConfiguration.integrationServices[8].service);
        var operationName = mobileFabricConfiguration.integrationServices[8].operations[1];
        var headers = {};
        var data = {};
        kony.print("jani >>> Operation name : " + operationName);
        mobileFabricConfiguration.integrationObj.invokeOperation(operationName, headers, data, this.getCountryListSuccessCallBack, this.getCountryListErrorCallBack);
      } else {
        kony.print("jani >>> Kony SDK obj is not initialized for getCountriesList :");
        this.initializeMF("GET_COUNTRYLIST_DATA");
      }
    } else {
      try
    {
        this.view.flxToast.isVisible = true;
        try{
          kony.timer.cancel("timerid");	
        }catch(e){
          kony.print("Timer cancel Exception "+e);
        }

        kony.timer.schedule("timerid", this.disableFlexToast.bind(this), 3, false);
    } catch(e) {
      kony.print("Toast message Exception "+e);
    }
      //kony.print("Network not available for getCountriesList : ");

    }

  },
  getCountryListSuccessCallBack : function(getCountriesResponse){
    if(getCountriesResponse.opstatus === 0){
      kony.print("jani >>> *************** Entering into getCountryListSuccessCallBack *************************");
      if (getCountriesResponse.countries !== null && getCountriesResponse.countries.length > 0) {
        var countriesList = getCountriesResponse.countries;
        kony.print("jani >>>>> Data is : " + JSON.stringify(countriesList));
        var jsondata = JSON.parse(countriesList);
        //kony.print("jani >>> jsondata :: "+jsondata);		// output : [object, object]
        var resultArray = [];
        resultArray.push(["select","Select Country"]);
        resultArray.push(["en_IN","English"]);
        for(var key in jsondata){
          kony.print("jani >>> key :: "+key);
          resultArray.push([key, jsondata[key]]);

        }
        this.view.languageListBox.masterData = resultArray;
        if(kony.store.getItem("countryKey") === null || kony.store.getItem("countryKey") === ""){
          //alert("if "+kony.store.getItem("countryKey"));
          this.view.languageListBox.selectedKey = "select";
          this.view.flxPreLogin.bottom = "-100%";
        }
        else{
          this.view.languageListBox.selectedKey = kony.store.getItem("countryKey");
          this.view.flxPreLogin.bottom = "20%";
          kony.i18n.setCurrentLocaleAsync(this.view.languageListBox.selectedKey,this.destroyForms,this.doNothing);
          //alert("else "+kony.store.getItem("countryKey"));
        }

        kony.print("jani >>>>> countries Data is : " + resultArray);		
      }
      dismissLoading();
    }
  },
  getCountryListErrorCallBack : function(errormsg){
    dismissLoading();
    kony.print(" ********** Failure in getCountryListErrorCallBack: " + JSON.stringify(errormsg) + " ********** ");
  },

  initializeMF: function(context) {
    kony.print(" ********** Entering into initializeMF ********** ");
    if (isNetworkAvailable()) {
      showLoading();
      mobileFabricConfiguration.konysdkObject = new kony.sdk();
      mobileFabricConfiguration.konysdkObject.init(mobileFabricConfiguration.appKey, mobileFabricConfiguration.appSecret, mobileFabricConfiguration.serviceURL, function(response) {
        kony.print(" ********** Entering into initializeMFSuccess ********** ");
        kony.print(" ********** Success initializeMFSuccess response : " + JSON.stringify(response) + " ********** ");
        mobileFabricConfiguration.isKonySDKObjectInitialized = true;
        dismissLoading();
        kony.print("initialization successful");
        if (context == "GET_COUNTRYLIST_DATA") {
          this.getCountriesList();
        }
        kony.print(" ********** Exiting out of initializeMFSuccess ********** ");
      }, function(error) {
        kony.print(" ********** Entering into initializeMFFailure ********** ");
        kony.print(" ********** Failure in initializeMF: " + JSON.stringify(error) + " ********** ");
        dismissLoading();
        kony.print(" ********** Exiting out of initializeMFFailure ********** ");
      });
    } else {

    }
    kony.print(" ********** Exiting out of initializeMF ********** ");
  },


});