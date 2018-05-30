define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      //this.view.NotificationsButton.onClick = this.goToNotificationsPage.bind( this );
      this.view.LogoutButton.onClick = this.goToLoginScreen.bind( this );
    },
    goToNotificationsPage : function(){
      if(isIOS() && !getNotificationStatusForApp()){
        alert("Please Enable Notifications , Go to Settings > Notifications and select Digital ToolBox.");
        return;
      }
      var ntf = new kony.mvc.Navigation("notificationpage");
      ntf.navigate();	
    },
    goToLoginScreen : function(){
      
      clearLoginTokenFromStore();
      var ntf = new kony.mvc.Navigation("loginpage");
      ntf.navigate();	
    }
  };
});