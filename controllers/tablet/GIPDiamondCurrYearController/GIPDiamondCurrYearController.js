define({ 

  onNavigate:function(){


    this.view.preShow=this.applyBindings.bind(this);

  },
  reset:function(){
    this.GIPCurrYearListMasterData();
    this.view.lblSPMonths.isVisible = true;
    this.view.flexSPMonthsCurrYear.isVisible = true;
    this.view.lblFQMonths.isVisible = true;
    this.view.flexFQMonthsCurrYear.isVisible = true;
    this.view.lblComebackPlatinum.isVisible=true;
    this.view.flexComebackPlatinumCurrYear.isVisible=true;
    this.view.txtSPMonths.text="";
    this.view.txtFQMonths.text="";
    this.view.txtComebackPlatinum.text="";

  },

  showNotification:function(){
    try{
      controllerReference.view.Popup.isVisible=true;
    }catch(e){}
  },



  resetNextForms:function(){
    try{

      // nxtYear.reset();
    }catch(e){

    }
  },


  goToPrevYear:function(){
    resetGIP();
    var ntf=new kony.mvc.Navigation("GIPDiamondPrevYear");
    ntf.navigate();

    kony.application.destroyForm("GIPDiamondCurrYear");
    currYear=null;

  },
  applyBindings:function(){
    controllerReference=this;
    if(currYear==null){
      this.GIPCurrYearListMasterData();
    }
    currYear=this;



    this.GIPHeaderAndWidgetCurr();


    this.view.lstCurryear.onSelection=this.GIPCurrYearAchivedPin.bind(this);
    this.view.btnNext.onClick=this.GIPCurrentYearValues.bind(this);
    this.view.btnBack.onClick=this.goToPrevYear.bind(this);
    this.view.onDeviceBack=this.goToPrevYear.bind(this);
  },


  // GIP Current Year Dynamically Set Header and Widget 

  GIPHeaderAndWidgetCurr:function() {

    //Header Text
    var headerDiamond = "Diamond Segment - Simulation";
    var headerEmerald = "Emerald Segment - Simulation";
    var headerPlatinum = "Platinum Segment - Simulation";


    if (varSegment == "Diamond") {
      this.view.flxHeader.skin = amwayGIPDiamondHeader;
      this.view.lblHeader.text = headerDiamond;

      this.view.lblSPMonths.isVisible = false;
      //this.view.txtSPMonths.isVisible = false;
      this.view.flexSPMonthsCurrYear.isVisible = false;
      if (kony.os.deviceInfo()["name"] == "iPad" || kony.os.deviceInfo()["name"] == "iPad Simulator" || kony.os.deviceInfo()["name"] == "iPhone Simulator" || kony.os.deviceInfo()["name"] == "iPhone") {
        //this.view.lblFQMonths.top = "52%";
      }
      this.view.lblComebackPlatinum.isVisible = true;
      this.view.txtComebackPlatinum.isVisible = true;
    } else if (varSegment == "Emerald") {
      this.view.flxHeader.skin = amwayGIPEmeraldHeader;
      this.view.lblHeader.text = headerEmerald;
      this.view.lblSPMonths.isVisible = false;
      //this.view.txtSPMonths.isVisible = false;
      this.view.flexSPMonthsCurrYear.isVisible = false;
      if (kony.os.deviceInfo()["name"] == "iPad" || kony.os.deviceInfo()["name"] == "iPad Simulator" || kony.os.deviceInfo()["name"] == "iPhone Simulator" || kony.os.deviceInfo()["name"] == "iPhone") {
        //this.view.lblFQMonths.top = "52%";
      }
      this.view.lblComebackPlatinum.isVisible = true;
      this.view.txtComebackPlatinum.isVisible = true;
    } else {
      this.view.flxHeader.skin = amwayGIPPlatinumHeader;
      this.view.lblHeader.text = headerPlatinum;
      //             this.view.lblSPMonths.isVisible = true; 
      //             this.view.txtSPMonths.isVisible = true;
      //             this.view.lblSPMonths.isVisible = true; 
      //             this.view.txtSPMonths.isVisible = true;
      this.view.lblComebackPlatinum.isVisible = false;
      //this.view.txtComebackPlatinum.isVisible = false;
      this.view.flexComebackPlatinumCurrYear.isVisible = false;

    }

  },


  //Show GIP Diamond Next Year
  GIPDiamondNextYear:function(){
    this.resetNextForms();
    var varlstCurryear = this.view.lstCurryear.selectedKey;	

    //Validation for SPMonths integer number
    varSPMonthsCurrYear =  this.view.txtSPMonths.text;
    varSPMonthsCurrYear = /^\d+$/.test(varSPMonthsCurrYear);

    //Validation for FQMonths integer number	
    varFQMonthsCurrYear = this.view.txtFQMonths.text;
    varFQMonthsCurrYear = /^\d+$/.test(varFQMonthsCurrYear);

    //Validation for ComebackPlatinum integer number	
    varComebackPlatinum = this.view.txtComebackPlatinum.text;
    varComebackPlatinum = /^\d+$/.test(varComebackPlatinum);	



    if(varlstCurryear == 1) 
      alert("Please select the Pin Level Achieved in 2016-17.");  			
    else if((varSegment == "Platinum") && (varSPMonthsCurrYear == false) && (currentYear < 342))	 	 
      alert("Please enter numeric SP months");		  				
    else if((varSegment == "Platinum") && (varFQMonthsCurrYear == false) && (currentYear >= 342))  								  							  			 			 		
      alert("Please enter numeric FQ months"); 
    else if((varSegment == "Diamond") && (varFQMonthsCurrYear == false))  								  							  			 			 		
      alert("Please enter numeric FQ months"); 
    else if((varSegment == "Emerald") && (varFQMonthsCurrYear == false))  								  							  			 			 		
      alert("Please enter numeric FQ months");
    else if((varSegment == "Diamond") && (varComebackPlatinum == false))
      alert("Please enter numeric value for comeback platinum");
    else if((varSegment == "Emerald") && (varComebackPlatinum == false))
      alert("Please enter numeric value for comeback platinum"); 

    //Range Validation for SP months current year  				
    else if((varSegment == "Platinum") && (varSPMonthsCurrYear == true))
    {
      var valSP = false;
      var SPMonthsvalue = parseInt(this.view.txtSPMonths.text);
      if((currentYear == 310 && SPMonthsvalue < 1) || (currentYear == 310 && SPMonthsvalue > 2)) //Silver Producer
      {
        valSP = true;
        alert("Enter Silver producer SP months between 1 to 2");						
      }
      if((currentYear == 320 && SPMonthsvalue < 3) || (currentYear == 320 && SPMonthsvalue > 5)) //Gold Producer
      {
        valSP = true;
        alert("Enter Gold producer SP months between 3 to 5");
      }	
      if((currentYear == 340 && currentYearValue == "Platinum" && SPMonthsvalue < 6) || (currentYear == 340 && currentYearValue == "Platinum" && SPMonthsvalue > 11)) //Platinum
      {
        valSP = true;
        alert("Enter Platinum SP months between 6 to 11");
      }
      if((currentYear == 340 && currentYearValue == "Ruby" && SPMonthsvalue < 6) || (currentYear == 340 && currentYearValue == "Ruby" && SPMonthsvalue > 11)) //Ruby
      {
        valSP = true;
        alert("Enter Ruby SP months between 6 to 11");
      }
      if( valSP === false){					
        //frmDiamondNextYear.show(); 
        var ntf=new kony.mvc.Navigation("GIPDiamondNextYear");
        ntf.navigate();
      }

    } 	

    //Range Validation for FQ months current year  				
    else if( (varSegment == "Platinum") && (varFQMonthsCurrYear == true) || (varSegment == "Emerald") && (varFQMonthsCurrYear == true) || (varSegment == "Diamond") && (varFQMonthsCurrYear == true) )
    {
      var valFQ = false;
      var FQMonthsvalue = parseInt(this.view.txtFQMonths.text);				

      if((currentYear == 310 && FQMonthsvalue < 1) || (currentYear == 310 && FQMonthsvalue > 2)) //Silver Producer
      {
        valFQ =  true;
        alert("Enter Silver producer FQ months between 1 to 2");
      }		
      if((currentYear == 320 && FQMonthsvalue < 3) || (currentYear == 320 && FQMonthsvalue > 5)) //Gold Producer
      {
        valFQ = true;
        alert("Enter Gold producer FQ months between 3 to 5");
      }		
      if((currentYear == 340 && currentYearValue == "Platinum" && FQMonthsvalue < 6) || (currentYear == 340 && currentYearValue == "Platinum" && FQMonthsvalue > 11)) //Platinum
      {
        valFQ = true;
        alert("Enter Platinum FQ months between 6 to 11");
      }	
      if((currentYear == 340 && currentYearValue == "Ruby" && FQMonthsvalue < 6) || (currentYear == 340 && currentYearValue == "Ruby" && FQMonthsvalue > 11)) //Ruby
      {
        valFQ = true;
        alert("Enter Ruby FQ months between 6 to 11");
      }		  				
      //if((currentYear == 342 && currentYearValue == "Founders Platinum" && FQMonthsvalue < 1) || (currentYear == 342 && currentYearValue == "Founders Platinum" && FQMonthsvalue > 12)) //Founders Platinum
      //{
      //		valFQ = true;
      //		alert("Enter Founders Platinum FQ months between 1 to 12");
      //}			 
      //if((currentYear == 365 && currentYearValue == "Sapphire" && FQMonthsvalue < 12) || (currentYear == 365 && currentYearValue == "Sapphire" && FQMonthsvalue > 24)) //Sapphire
      if((currentYear == 365 && currentYearValue == "Sapphire" && FQMonthsvalue < 12)) //Sapphire
      {
        valFQ = true;
        //alert("Enter Sapphire FQ months between 12 to 24");
        alert("Sapphire FQ months minimum value should be 12");
      }			
      //if((currentYear == 367 && currentYearValue == "Founders Sapphire" && FQMonthsvalue < 20) || (currentYear == 367 && currentYearValue == "Founders Sapphire" && FQMonthsvalue > 30)) //Founders Sapphire
      if((currentYear == 367 && currentYearValue == "Founders Sapphire" && FQMonthsvalue < 20)) //Founders Sapphire
      {
        valFQ = true;
        //alert("Enter Founders Sapphire FQ months between 20 to 30");
        alert("Founders Sapphire FQ months minimum value should be 20");	
      }		
      if((currentYear == 370 && currentYearValue == "Emerald" && FQMonthsvalue < 18)) //Emerald
      {
        valFQ = true;
        alert("Emerald FQ months minimum value should be 18");
      }			
      if((currentYear == 375 && currentYearValue == "Founders Emerald" && FQMonthsvalue < 30)) //Founders Emerald
      {
        valFQ = true;
        alert("Founders Emerald FQ months minimum value should be 30");
      }		
      if((currentYear == 380 && currentYearValue == "Diamond" && FQMonthsvalue < 36)) //Diamond
      {
        valFQ = true;
        alert("Diamond FQ months minimum value should be 36");
      }			
      if((currentYear == 385 && currentYearValue == "Founders Diamond" && FQMonthsvalue < 60)) //Founders Diamond
      {
        valFQ = true;
        alert("Founders Diamond FQ months minimum value should be 60");
      }		
      if((currentYear == 390 && currentYearValue == "Executive Diamond" && FQMonthsvalue < 54)) // || (currentYear == 370 && currentYearValue == "Emerald" && FQMonthsvalue > 30)) //Executive Diamond
      {
        valFQ = true;
        alert("Executive Diamond FQ months minimum value should be 54");
      }		
      if((currentYear == 395 && currentYearValue == "Founders Executive Diamond" && FQMonthsvalue < 90)) //Founders Executive Diamond
      {
        valFQ = true;
        alert("Founders Executive Diamond FQ months minimum value should be 90");
      }		
      if((currentYear == 400 && currentYearValue == "Double Diamond" && FQMonthsvalue < 72)) //Double Diamond
      {
        valFQ = true;
        alert("Double Diamond FQ months minimum value should be 72");
      }		
      if((currentYear == 405 && currentYearValue == "Founders Double diamond" && FQMonthsvalue < 120))//Founders Double diamond
      {
        valFQ = true;
        alert("Founders Double diamond FQ months minimum value should be 120");
      }		
      if((currentYear == 410 && currentYearValue == "Triple Diamond" && FQMonthsvalue < 90))//Triple Diamond
      {
        valFQ = true;
        alert("Triple Diamond FQ months minimum value should be 90");
      }		
      if((currentYear == 415 && currentYearValue == "Founders Triple Diamond" && FQMonthsvalue < 150))//Triple Diamond
      {
        valFQ = true;
        alert("Founders Triple Diamond FQ months minimum value should be 150");
      }		
      if((currentYear == 420 && currentYearValue == "Crown" && FQMonthsvalue < 108)) //Triple Diamond
      {
        valFQ = true;
        alert("Crown FQ months minimum value should be 108");
      }		
      if( valFQ == false){
        var ntf=new kony.mvc.Navigation("GIPDiamondNextYear");
        ntf.navigate();
      }
    }  			

    else  {				  									
      var ntf=new kony.mvc.Navigation("GIPDiamondNextYear");
      ntf.navigate();
    }


  },






  //***********************************
  //***** Current Year Achived PIN*****
  //***********************************

  GIPCurrYearAchivedPin:function() {

    this.view.txtSPMonths.text="";
    this.view.txtFQMonths.text="";
    this.view.txtComebackPlatinum.text="";

    currentYearValue = this.view.lstCurryear.selectedKeyValue[1];
    //currentYear = this.view.lstCurryear.selectedKeyValue[0];
    // if (currentYearValue == "Platinum") currentYear = 340;
    //else
    currentYear = this.view.lstCurryear.selectedKeyValue[0];

    if (varSegment == "Platinum") {
      //Sapphire and above only FQ month option should come and Q month should not come 
      //if(currentYear >= 365)
      if (currentYear > 340) {
        this.view.lblSPMonths.isVisible = false;
        this.view.flexSPMonthsCurrYear.isVisible = false;
        if (kony.os.deviceInfo()["name"] == "iPad" || kony.os.deviceInfo()["name"] == "iPad Simulator" || kony.os.deviceInfo()["name"] == "iPhone Simulator" || kony.os.deviceInfo()["name"] == "iPhone") {
          //this.view.lblFQMonths.top = "55%";				 	
        }
        this.view.lblFQMonths.isVisible = true;
        this.view.flexFQMonthsCurrYear.isVisible = true;
      }

      //Need to confirm and then implement
      //Below Sapphire Q month option should come and FQ month should not come	
      else {

        // if (kony.os.deviceInfo()["name"]=="iPad" || kony.os.deviceInfo()["name"]=="iPad Simulator"  || kony.os.deviceInfo()["name"]=="iPhone Simulator" || kony.os.deviceInfo()["name"]=="iPhone") {
        //	this.view.lblSPMonths.top = "55%";
        //	this.view.flexSPMonthsCurrYear.top = "2%";
        // }	
        this.view.lblSPMonths.isVisible = true;
        this.view.flexSPMonthsCurrYear.isVisible = true;
        this.view.lblFQMonths.isVisible = false;
        this.view.flexFQMonthsCurrYear.isVisible = false;
      }
    }

  },


  //Current Year Selected Values

  GIPCurrentYearValues:function() {


    currSPMonths = Math.round(this.view.txtSPMonths.text);
    currSPMonths = parseInt(currSPMonths);
    currFQMonths = Math.round(this.view.txtFQMonths.text);
    currFQMonths = parseInt(currFQMonths);
    currComebackPlatinum = Math.round(this.view.txtComebackPlatinum.text);
    currComebackPlatinum = parseInt(currComebackPlatinum);

    this.GIPDiamondNextYear();

  },



  //**********************************************************
  //***** List Current Year Master Data Binding **************
  //**********************************************************

  GIPCurrYearListMasterData:function() {

    //List Current Year Master Data
    if (varSegment == "Diamond" || varSegment == "Emerald") {
      this.view.lstCurryear.masterData = lstPrevAndCurrYearData;
      this.view.lstCurryear.selectedKey = "1";
    } else {
      this.view.lstCurryear.masterData = lstPrevAndCurrYearPlatinumData;
      this.view.lstCurryear.selectedKey = "1";
    }

  },


});