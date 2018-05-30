define(function() {

    return {
      constructor: function(baseConfig, layoutConfig, pspConfig) {

        if(kony.os.deviceInfo().name=="iPad"){
			
          this.view.lstBoxLangSettings.left="25%";
        }
      }
    };
});