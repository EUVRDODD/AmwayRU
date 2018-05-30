define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
          
			this.view.btnYesPush.onClick=this.navigateToNotification.bind(this);
            
            this.view.btnNoPush.onClick=this.hidePopup.bind(this);
            
            this.view.flxMainPopup.onTouchStart=function(){
              kony.print("");
            }
		},
      
      navigateToNotification:function(){
       this.view.isVisible=false;
        var ntf=new kony.mvc.Navigation("notificationpage");
        ntf.navigate();
      },
      
      hidePopup:function(){
		 this.view.isVisible=false;
 
      }
      			

		
	};
});