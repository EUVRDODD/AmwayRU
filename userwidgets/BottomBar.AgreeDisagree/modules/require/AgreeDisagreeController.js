define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.AgreeButton.onClick = this.goToHomeScreen.bind( this );
      this.view.DisagreeButton.onClick = this.goBackToLoginScreen.bind( this );
    },
    goToHomeScreen : function(){
      var ntf = new kony.mvc.Navigation("homepage");
      ntf.navigate();	
    },
    goBackToLoginScreen: function(){
      var ntf = new kony.mvc.Navigation("loginpage");
      ntf.navigate();	
    }
  };
});