define({ 
  //Type your controller code here 
  onNavigate: function() {
    this.init();
  },
  init : function(){
    this.applyBindings(); 
  },
  applyBindings : function(){
    this.view.languageListBox.selectedKey = kony.store.getItem("countryKey");
    if(this.view.languageListBox.selectedKey === null || this.view.languageListBox.selectedKey == "select"){
      this.view.flxPreLogin.bottom = "-100%";
    }
    else{
      this.view.flxPreLogin.bottom = "20%";
    }
    this.view.onDeviceBack = this.checkAndExit.bind(this);
    this.view.languageListBox.onSelection = this.languageSelection.bind(this);
    this.view.btnContinueLogin.onClick = this.continueLogin.bind(this);
    this.view.btnGuestLogin.onClick = this.guestLogin.bind(this);
  },
	
  checkAndExit : function(){
    kony.application.exit();
  },
  languageSelection : function(){
    var countryKey = this.view.languageListBox.selectedKey;
    kony.store.setItem("countryKey", countryKey);
    this.countrySelectAnimation(countryKey);	// Move animation from bottom to top to see the prelogin buttons
  },
  continueLogin : function(){
    kony.store.setItem("guest", "false");
    showLoading();
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
  }

});