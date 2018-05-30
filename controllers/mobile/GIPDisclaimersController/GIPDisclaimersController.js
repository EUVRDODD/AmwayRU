define({ 

  onNavigate:function(){
    this.view.postShow=this.applyBindings.bind(this);
    this.view.preShow=this.GIPDisclaimerPreShow.bind(this);
  },
 applyBindings:function(){
   this.view.btnBack.onClick=this.goToGIPSimulatorHome.bind(this);
   controllerReference=this;
 },
  
  GIPDisclaimerPreShow:function(){
    try{
      this.view.GIPSegmentflexMainScroll.contentOffset={x:"0%" , y:"0%"};
    }catch(e){
      
    }
  },
    showNotification:function(){
    try{
      controllerReference.view.Popup.isVisible=true;
    }catch(e){}
  },
  

  
  goToGIPSimulatorHome:function(){
    var ntf = new kony.mvc.Navigation("GIPSimulatorHome");
    ntf.navigate();
  }

 });