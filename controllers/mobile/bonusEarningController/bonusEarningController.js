define({
	//call on post show
    applyBindings: function() {
      	controllerReference=this;
        this.view.btnStart.onClick = this.goToIncomeSimualtorHome.bind(this);
        this.view.btnBack.onClick = this.goToPreviousForm.bind(this);
      	
    },
  
      showNotification:function(){
    try{
      controllerReference.view.Popup.isVisible=true;
    }catch(e){}
  },
  	setHeaderText:function(){
      if(this.getPreviousForm()=="incomeSimulatorLOS"){
        
        this.view.lblHeader.text=kony.i18n.getLocalizedString("bonusEarninglblHeader1");
      }else{
        this.view.lblHeader.text=kony.i18n.getLocalizedString("bonusEarninglblHeader2");
      }
      
    },
	
    goToIncomeSimualtorHome: function() {
      
        var ntf =new kony.mvc.Navigation("incomeSimulatorHome");  	
        ntf.navigate();
    },

    goToPreviousForm: function() {
      
      try{
      kony.print("In go back function");
      prevForm=kony.application.getPreviousForm().id;
      kony.print("prev form is "+ prevForm);
        var ntf = new kony.mvc.Navigation(prevForm);
        ntf.navigate(data1);
      kony.application.destroyForm("bonusEarning");
      }catch(e){
        kony.print("Exception is "+ e);
      }
    },

    onNavigate: function(data) {
      data1=data;
      this.view.onDeviceBack=this.goToPreviousForm.bind(this);
       this.view.preShow=this.setHeaderText.bind(this);
      this.view.postShow=this.applyBindings.bind(this);
        this.setDataOnSegmentBonusEarnings(data["segmentData"]);
    },


    setDataOnSegmentBonusEarnings: function(data1) {
        var widgetDataMap = {
            "lblHeaderCommission": "lblHeaderCommission",
            "lblHeaderAmount": "lblHeaderAmount",
            "imgCheckmark": "imgCheckmark",
            "lblBonus": "lblBonus",
            "lblAmount": "lblAmount"
        };
      
        this.view.segmentBonusEarnings.widgetDataMap = widgetDataMap;
        this.view.segmentBonusEarnings.data = data1;
    },




});