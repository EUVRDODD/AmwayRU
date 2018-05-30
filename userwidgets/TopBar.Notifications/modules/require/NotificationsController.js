define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.BackButton.onClick = this.goToAppsWebPage.bind( this );
    },
    goToAppsWebPage : function(){
      var ntf = new kony.mvc.Navigation("settingpage");
      ntf.navigate();	
    }
  };
});