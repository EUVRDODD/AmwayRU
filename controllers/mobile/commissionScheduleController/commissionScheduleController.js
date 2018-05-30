define({
	//call on post show
    applyBindings: function() {
     
      controllerReference=this;
        this.view.btnStart.onClick = this.nextCommissionSchedule.bind(this);
        this.view.btnBack.onClick = this.goBackToIncomeSimulatorHome.bind( this );
    },
  
  
  setHeaderText:function(){
     if(kony.os.deviceInfo().name=="iPad"){
    	this.view.btnStart.top="2%";
    }
    this.view.lblHeader.text="Commission Schedule";
  },
  
  onNavigate:function(){
    this.view.preShow=this.setHeaderText.bind(this);
    this.view.postShow=this.applyBindings.bind(this);
  },
	goBackToIncomeSimulatorHome: function() {
        var ntf = new kony.mvc.Navigation("incomeSimulatorHome");
        ntf.navigate();
    },
  
    nextCommissionSchedule: function() {
        var ntf = new kony.mvc.Navigation("incomeSimulatorLOS");
        ntf.navigate();
    },
	
    showNotification:function(){
    try{
      controllerReference.view.Popup.isVisible=true;
    }catch(e){}
  },
  

    
});