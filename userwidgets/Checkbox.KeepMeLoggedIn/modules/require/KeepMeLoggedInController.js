define(function() {
    var ACTIVE_CHECKBOX_IMG = "icon_checkbox.png";
	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
          this.view.flexKeepMeLoggedIn.onClick = this.onClickFlexKeepMeLoggedIn.bind( this );
      },
		onClickFlexKeepMeLoggedIn: function() {
          if(ACTIVE_CHECKBOX_IMG != this.view.ImageKeepMeLoggedIn.src){
          	this.view.ImageKeepMeLoggedIn.src  = ACTIVE_CHECKBOX_IMG;
          }else{
            this.view.ImageKeepMeLoggedIn.src = "icon_check.png";
          }
      }
	};
});