define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

            //this.view.LogoutButton.onClick = this.goToLogOutConfirm.bind( this );
           // this.view.lstLanguage.selectedKey="en_IN";
           // this.view.lstLanguage.selectedKey=kony.i18n.getCurrentLocale();
          // this.changeLocale();
   	 },
   
    
    changeLang:function(data){
            if( data["selectedKey"]=="hi_IN"){
              kony.i18n.setCurrentLocaleAsync("hi_IN", this.onsuccesscallback, this.onfailurecallback);
              gblLanguage = data["selectedValue"];
            }else if( data["selectedKey"]=="en_IN"){
              kony.i18n.setCurrentLocaleAsync("en_IN", this.onsuccesscallback, this.onfailurecallback);
              gblLanguage = data["selectedValue"];
            }
          kony.print("gblLanguage in changeLanguage : " + gblLanguage);
    },

    onsuccesscallback:function(oldlocalename, newlocalename){
      
      //destroyAllForms();
      // controllerReference.view.addWidgets();
      if(isNetworkAvailable()){
        var ntf=new kony.mvc.Navigation("homepage");
        ntf.navigate();
      }else{
        var ntf=new kony.mvc.Navigation("mycontentpage");
        ntf.navigate();
      }


      // kony.application.destroyForm("settingpage");

    },

    onfailurecallback:function(errCode, errMsg){
      alert("err"+errMsg);
    },

	notificationButtonClick:function(action){
      this.view.NotificationsButton.onClick = action; 
    },
   

    goToLogOutConfirm : function(action){
      this.view.LogoutButton.onClick = action;
    },
    
    //when user clicks on change country button this method is called
    
    gotoChangeUserConfirm : function(action){
      this.view.ChangeUserButton.onClick = action;
      kony.print("gotoChangeUserConfirm called"+action);
    },

    changeLocale:function(){

      //this.view.lstLanguage.onSelection=this.changeLang.bind(this);
    }

  };
});