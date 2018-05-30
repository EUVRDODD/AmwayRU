define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.LoginButton.onClick = this.goToTermsAndConditionsPage.bind( this );
    },
    goToTermsAndConditionsPage : function(){
      var ntf = new kony.mvc.Navigation("termsandconditionspage");
      ntf.navigate();	
    }
  };
});