define({ 

onNavigate:function(){
  	varSegment="";
	this.view.postShow=this.applyBindings.bind(this);
},
  
  applyBindings:function(){
    controllerReference=this;
    this.view.btnPlatinum.onClick=this.GIPSegmentSelection.bind(this.eventobject);
    this.view.btnDiamond.onClick=this.GIPSegmentSelection.bind(this.eventobject);
    this.view.btnEmerald.onClick=this.GIPSegmentSelection.bind(this.eventobject);
    this.view.btnBack.onClick=this.goToGIPSimulatorHome.bind(this);
    this.view.btnAboutGIP.onClick=this.GIPAboutGIPPDF.bind(this);
  },
  
  
    showNotification:function(){
    try{
      controllerReference.view.Popup.isVisible=true;
    }catch(e){}
  },
  

//**********************************************************
//***** Open About GIP PDF *********************************
//**********************************************************

GIPAboutGIPPDF:function() {    
        //Open Link Directly
        //kony.application.openURL("https://d15dx9g4u1sir9.cloudfront.net/Mobile/Business%20Oppurtunity/GIP/GIP%20BROCHURE.pdf");
        //kony.application.openURL("https://docs.google.com/gview?embedded=true&url=https://d15dx9g4u1sir9.cloudfront.net/Mobile/Business Oppurtunity/GIP/GIP BROCHURE.pdf");		
        //  kony.application.openURL("https://d15dx9g4u1sir9.cloudfront.net/Mobile/Business Oppurtunity/GIP/GIP BROCHURE.pdf");
        if ((kony.os.deviceInfo()["name"] == "WindowsPhone") || (kony.os.deviceInfo()["name"] == "iPhone Simulator") || (kony.os.deviceInfo()["name"] == "iPhone")) {
            kony.application.openURL("https://d15dx9g4u1sir9.cloudfront.net/Mobile/Business Oppurtunity/GIP/GIP BROCHURE.pdf");
        } else {
            kony.application.openURL("https://docs.google.com/gview?embedded=true&url=https://d15dx9g4u1sir9.cloudfront.net/Mobile/Business Oppurtunity/GIP/GIP BROCHURE.pdf");
        }
        //Open Link Use of Google Docs
        //kony.application.openURL("http://docs.google.com/gview?embedded=true&url=https://d15dx9g4u1sir9.cloudfront.net/Mobile/Business%20Oppurtunity/GIP/GIP%20BROCHURE.pdf");
    
},

	goToGIPSimulatorHome:function(){
    var ntf = new kony.mvc.Navigation("GIPSimulatorHome");
    ntf.navigate();
  },
  
  GIPSegmentSelection:function(btnObject){
    
     if (btnObject.id == "btnPlatinum") varSegment = "Platinum";
        else if (btnObject.id == "btnEmerald") varSegment = "Emerald";
        else if (btnObject.id == "btnDiamond") varSegment = "Diamond";
        else
        varSegment = "AboutGIP";
try{
     preYear.reset();
    currYear.reset();
    nxtYear.reset();
  }catch(e){
  
}
        if (varSegment !== "" || varSegment != "AboutGIP"){
         // frmDiamondPrevYear.show();
          var ntf=new kony.mvc.Navigation("GIPDiamondPrevYear");
          ntf.navigate();
        } 
  },
  
  
  
 });