define({
	// call in post show
    applyBindings: function() {
      controllerReference=this;
        this.view.btnBack.onClick = this.goBackToIncomeSimulatorLOS.bind(this);
      this.view.onDeviceBack=this.goBackToIncomeSimulatorLOS.bind(this);
        this.view.btnStart.onClick = this.goToBonusEarning.bind(this);
      	
      	
    },
  	// call in form init
    init: function() {
        data1 = [];
      	bonus="";
    },
  
    showNotification:function(){
    try{
      controllerReference.view.Popup.isVisible=true;
    }catch(e){}
  },
  

  setHeaderText:function(){
     if(kony.os.deviceInfo().name=="iPad"){
    	
      this.view.btnStart.width="36%";
    }
	
    this.view.lblHeader.text="Your Earnings";
  },
  
    goToBonusEarning: function() {
        var ntf = new kony.mvc.Navigation("bonusEarning");
        ntf.navigate({
            "segmentData": data1,
          "bonusLevel":data2
        });
    },

    goBackToIncomeSimulatorLOS: function() {
        var ntf = new kony.mvc.Navigation("incomeSimulatorLOS");
        ntf.navigate();
      
      kony.application.destroyForm("commissionAchieved");
    },

    onNavigate: function(data) {

        
            this.view.lblCongratulationsPercentage.text = "Your have Achieved " + data["bonusLevel"] + "%";
            data1 = data["segmentData"];
      		data2=data["bonusLevel"];
        
      
      this.view.init=this.init.bind(this);
      this.view.preShow=this.setHeaderText.bind(this);
      this.view.postShow=this.applyBindings.bind(this);
      
      

    },


});