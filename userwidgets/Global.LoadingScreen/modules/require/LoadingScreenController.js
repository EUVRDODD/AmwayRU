define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.VideoLoadingScreen.onCompletion = this.onCompletionVideoLoadingScreen.bind(this);
      this.view.VideoLoadingScreen.onPrepared = this.onPreparedVideoLoadingScreen.bind(this);
    },

    onCompletionVideoLoadingScreen: function() {

      if(!isIOS()){ 
        FontSizeAnd.preAppInitCal();
      }

      isIosBackground = true;
      kony.print("Status : " + status.statusMessage);
      if (status.statusCode === 1)
      {
        //Offline
      }
      else if (status.statusCode === 2)
      {
        //Service error
      }
      else if (status.statusCode === 0)
      {
        //showLoading();
        gblNotifyMe = true;
      }

      try{

        //getting hamburgermenu
        try{
          Hresponse= JSON.parse(kony.store.getItem("Hresponse")) || {};
        }catch(e){
			kony.print("Exception in Hamburger Response");
        }
        
        
        kony.print("Hamburger Response is --"+JSON.stringify(Hresponse));
        
        loadingpageObj.checkAppVersion();
        
        kony.print("jani >>> inside try ");
      }catch(ex){
        kony.print("jani >>> loadingpageObj.checkAppVersion "+ex);
      }

    },
    onPreparedVideoLoadingScreen: function() {
      this.view.VideoLoadingScreen.play();
    }
  };
});