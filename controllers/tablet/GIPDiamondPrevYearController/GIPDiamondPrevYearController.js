define({ 

 onNavigate:function(){
   
   
   this.view.preShow=this.applyBindings.bind(this);
  
 },
  
  
  goToGIPSegment:function(){
    resetGIP();
     var ntf = new kony.mvc.Navigation("GIPSegment");  
    ntf.navigate();
    
    kony.application.destroyForm("GIPDiamondPrevYear");
    preYear=null;
    
  },
  
    showNotification:function(){
    try{
      controllerReference.view.Popup.isVisible=true;
    }catch(e){}
  },
  

  
  reset:function(){
     this.GIPPrevYearListMasterData();
  },
  
  //**********************************************************
//***** List Previous Year Master Data Binding *************
//**********************************************************
   GIPPrevYearListMasterData:function(){
        //List Previous Year Master Data
     
        if (varSegment == "Diamond" || varSegment == "Emerald") {
            this.view.lstPrevyear.masterData = lstPrevAndCurrYearData;
            this.view.lstPrevyear.selectedKey = "1";
        } else {
            this.view.lstPrevyear.masterData = lstPrevAndCurrYearPlatinumData;
            this.view.lstPrevyear.selectedKey = "1";
        }
       
    
    
},
  
  
  applyBindings:function(){
    controllerReference=this;
    if(preYear==null){
      this.GIPPrevYearListMasterData();
    }
     preYear=this;
    
    this.GIPHeaderAndWidgetPrev();
    this.view.lstPrevyear.onSelection=this.GIPPrevYearAchivedPin.bind(this);
    this.view.btnNext.onClick=this.GIPDiamondCurrentYear.bind(this);
    this.view.btnBack.onClick=this.goToGIPSegment.bind(this);
    this.view.onDeviceBack=this.goToGIPSegment.bind(this);
  },
  
  
  
  
  resetNextForms:function(){
     try{
    
   // currYear.reset();
    //nxtYear.reset();
  }catch(e){
  
}
  },
  
  
  
  //Show GIP Diamond Current Year
 GIPDiamondCurrentYear:function(){

   
	var varlstPrevyear = this.view.lstPrevyear.selectedKey;
		
		if(varlstPrevyear == 1)		
  			alert("Please select the highest Pin Level achieved.");  				
		else{
          var ntf=new kony.mvc.Navigation("GIPDiamondCurrYear");
          ntf.navigate();
        }
			
},
  
  
  //************************************
//***** Previous Year Achived PIN ****
//************************************
  GIPPrevYearAchivedPin:function(){
     lastYearValue = this.view.lstPrevyear.selectedKeyValue[1];
       
        lastYear = this.view.lstPrevyear.selectedKeyValue[0];
  },


  //***** GIP Previous Year Dynamically Set Header and Widget ***

 GIPHeaderAndWidgetPrev:function() {
	
    //Header Text
    var headerDiamond = "Diamond Segment Simulation";
    var headerEmerald = "Emerald Segment Simulation";
    var headerPlatinum = "Platinum Segment Simulation";

   

        if (varSegment == "Diamond") {
            this.view.flxHeader.skin = amwayGIPDiamondHeader;
            this.view.lblHeader.text = headerDiamond;
        } else if (varSegment == "Emerald") {
            this.view.flxHeader.skin = amwayGIPEmeraldHeader;
            this.view.lblHeader.text = headerEmerald;
        } else {
            this.view.flxHeader.skin = amwayGIPPlatinumHeader;
            this.view.lblHeader.text = headerPlatinum;
        }
   
},
  
  
  
  trimTitleTillLengthForHeader:function(titleString){
    var strLength = parseInt(15);
	var width = 640;
	if(kony.os.deviceInfo().deviceWidth <= parseInt(width)){
	//alert("640"+kony.os.deviceInfo().deviceWidth);
		if (titleString.length <= strLength){
			//alert("Eqaul Length");
			return titleString;
		}
			else{	
					//alert("Not Eqaul Length");
					var trimmedString = titleString.substring(0, parseInt(strLength));
					return trimmedString+"...";
				}
	}else{
		//alert(" > 640"+kony.os.deviceInfo().deviceWidth);
		if (titleString.length <= parseInt(18)){
			//alert("Eqaul Length");
			return titleString;
		}
			else{	
					//alert("Not Eqaul Length");
					var trimmedString = titleString.substring(0, parseInt(18));
					return trimmedString+"...";
				}
		}
  },
 });