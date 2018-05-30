define({ 

  onNavigate:function(){


    this.view.preShow=this.applyBindings.bind(this);

  },

  reset:function(){
    this.GIPNextyearListMasterData();
    this.view.lblSPMonths.isVisible = true;
    this.view.flexSPMonthsNextYear.isVisible = true;
    this.view.lblFQMonths.isVisible = true;
    this.view.flexFQMonthsNextYear.isVisible = true;
    this.view.lblComebackPlatinumNextYear.isVisible=true;
    this.view.flexComebackPlatinumNextYear.isVisible=true;


    this.view.txtSPMonths.text="";
    this.view.txtFQMonths.text="";
    this.view.txtComebackPlatinumNextYear.text="";

  },

  showNotification:function(){
    try{
      controllerReference.view.Popup.isVisible=true;
    }catch(e){}
  },


  applyBindings:function(){
    controllerReference=this;
    if(nxtYear==null){
      this.GIPNextyearListMasterData();
    }
    nxtYear=this;


    this.GIPHeaderAndWidgetNext();
    this.view.lstNextyear.onSelection=this.GIPNextYearAchivedPin.bind(this);
    this.view.btnNext.onClick=this.callAllFunctions.bind(this);
    this.view.btnBack.onClick=this.goToPreviousForm.bind(this);
    this.view.onDeviceBack=this.goToPreviousForm.bind(this);
  },
  goToPreviousForm:function(){
    resetGIP();
    var ntf=new kony.mvc.Navigation("GIPDiamondCurrYear");
    ntf.navigate();


    kony.application.destroyForm("GIPDiamondNextYear");
    nxtYear=null;
  },

  callAllFunctions:function(){
    this.GIPNextYearValues();
    this.GIPDiamondAchiveAPin();
    this.GIPDiamondSummary();
  },


  //Show GIP Diamond Summary
  GIPDiamondSummary:function(){	

    var varlstNextyear = this.view.lstNextyear.selectedKey;

    //Validation for SPMonths integer number
    varSPMonthsNextYear = this.view.txtSPMonths.text;
    varSPMonthsNextYear = /^\d+$/.test(varSPMonthsNextYear);

    //Validation for FQMonths integer number		
    varFQMonthsNextYear = this.view.txtFQMonths.text;
    varFQMonthsNextYear = /^\d+$/.test(varFQMonthsNextYear);



    if(varlstNextyear == 1)  
      alert("Please select the Pin Level you aim to achieve in 2017-18."); 
    else if((varSegment == "Platinum") && (varSPMonthsNextYear == false) && (nextYear < 342))
      alert("Please enter numeric SP months");
    else if((varSegment == "Platinum") && (varFQMonthsNextYear == false) && (nextYear >= 342))  								  							  			 			 		
      alert("Please enter numeric FQ months");	
    else if((varSegment == "Diamond") && (varFQMonthsNextYear == false))  								  							  			 			 		
      alert("Please enter numeric FQ months"); 
    else if((varSegment == "Emerald") && (varFQMonthsNextYear == false))  								  							  			 			 		
      alert("Please enter numeric FQ months");


    //Range Validation for SP months next year  				
    else if((varSegment == "Platinum") && (varSPMonthsNextYear == true))
    {
      var valSPNext = false;
      var SPMonthsvalueNextYear = parseInt(this.view.txtSPMonths.text);

      if((nextYear == 340 && nextYearValue == "Platinum" && SPMonthsvalueNextYear < 6) || (nextYear == 340 && nextYearValue == "Platinum" && SPMonthsvalueNextYear > 11)) //Platinum
      {
        valSPNext = true;
        alert("Enter Platinum SP months between  6 to 11");
      }
      if((nextYear == 340 && nextYearValue == "Ruby" && SPMonthsvalueNextYear < 6) || (nextYear == 340 && nextYearValue == "Ruby" && SPMonthsvalueNextYear > 11)) //Ruby
      {
        valSPNext = true;
        alert("Enter Ruby SP months between  6 to 11");
      }
      if( valSPNext == false){
        var ntf=new kony.mvc.Navigation("GIPDiamondSummary");
        ntf.navigate();
      }					

    }



    //Range Validation for FQ months next year  				
    else if( (varSegment == "Platinum") && (varFQMonthsNextYear == true) || (varSegment == "Emerald") && (varFQMonthsNextYear == true) || (varSegment == "Diamond") && (varFQMonthsNextYear == true) )
    {  		
      var valFQNext = false;
      var FQMonthsvaluenextYear = parseInt(this.view.txtFQMonths.text);				


      if((nextYear == 340 && nextYearValue == "Platinum" && FQMonthsvaluenextYear < 6) || (nextYear == 340 && nextYearValue == "Platinum" && FQMonthsvaluenextYear > 11)) //Platinum
      {
        valFQNext = true;
        alert("Enter Platinum FQ months between 6 to 11");
      }	
      if((nextYear == 340 && nextYearValue == "Ruby" && FQMonthsvaluenextYear < 6) || (nextYear == 340 && nextYearValue == "Ruby" && FQMonthsvaluenextYear > 11)) //Ruby
      {
        valFQNext = true;
        alert("Enter Ruby FQ months between 6 to 11");
      }		  				
      //if((nextYear == 342 && nextYearValue == "Founders Platinum" && FQMonthsvaluenextYear < 1) || (nextYear == 342 && nextYearValue == "Founders Platinum" && FQMonthsvaluenextYear > 12)) //Founders Platinum
      //{
      //		valFQNext = true;
      //		alert("Enter Founders Platinum FQ months between 1 to 12");
      //}			 
      //if((nextYear == 365 && nextYearValue == "Sapphire" && FQMonthsvaluenextYear < 12) || (nextYear == 365 && nextYearValue == "Sapphire" && FQMonthsvaluenextYear > 24)) //Sapphire
      if((nextYear == 365 && nextYearValue == "Sapphire" && FQMonthsvaluenextYear < 12)) //Sapphire
      {
        valFQNext = true;
        //alert("Enter Sapphire FQ months between 12 to 24");
        alert("Sapphire FQ months minimum value should be 12");

      }			
      //if((nextYear == 367 && nextYearValue == "Founders Sapphire" && FQMonthsvaluenextYear < 20) || (nextYear == 367 && nextYearValue == "Founders Sapphire" && FQMonthsvaluenextYear > 30)) //Founders Sapphire
      if((nextYear == 367 && nextYearValue == "Founders Sapphire" && FQMonthsvaluenextYear < 20)) //Founders Sapphire
      {
        valFQNext = true;
        //alert("Enter Founders Sapphire FQ months between 20 to 30");
        alert("Founders Sapphire FQ months minimum value should be 20");	
      }		
      if((nextYear == 370 && nextYearValue == "Emerald" && FQMonthsvaluenextYear < 18)) //Emerald
      {
        valFQNext = true;
        alert("Emerald FQ months minimum value should be 18");
      }			
      if((nextYear == 375 && nextYearValue == "Founders Emerald" && FQMonthsvaluenextYear < 30)) //Founders Emerald
      {
        valFQNext = true;
        alert("Founders Emerald FQ months minimum value should be 30");
      }		
      if((nextYear == 380 && nextYearValue == "Diamond" && FQMonthsvaluenextYear < 36)) //Diamond
      {
        valFQNext = true;
        alert("Diamond FQ months minimum value should be 36");
      }			
      if((nextYear == 385 && nextYearValue == "Founders Diamond" && FQMonthsvaluenextYear < 60)) //Founders Diamond
      {
        valFQNext = true;
        alert("Founders Diamond FQ months minimum value should be 60");
      }		
      if((nextYear == 390 && nextYearValue == "Executive Diamond" && FQMonthsvaluenextYear < 54)) // || (currentYear == 370 && nextYearValue == "Emerald" && FQMonthsvalue > 30)) //Executive Diamond
      {
        valFQNext = true;
        alert("Executive Diamond FQ Months minimum value is 54");
      }		
      if((nextYear == 395 && nextYearValue == "Founders Executive Diamond" && FQMonthsvaluenextYear < 90)) //Founders Executive Diamond
      {
        valFQNext = true;
        alert("Founders Executive Diamond FQ months minimum value should be 90");
      }		
      if((nextYear == 400 && nextYearValue == "Double Diamond" && FQMonthsvaluenextYear < 72)) //Double Diamond
      {
        valFQNext = true;
        alert("Double Diamond FQ months minimum value should be 72");
      }		
      if((nextYear == 405 && nextYearValue == "Founders Double diamond" && FQMonthsvaluenextYear < 120))//Founders Double diamond
      {
        valFQNext = true;
        alert("Founders Double diamond FQ months minimum value should be 120");
      }		
      if((nextYear == 410 && nextYearValue == "Triple Diamond" && FQMonthsvaluenextYear < 90))//Triple Diamond
      {
        valFQNext = true;
        alert("Triple Diamond FQ months minimum value should be 90");
      }		
      if((nextYear == 415 && nextYearValue == "Founders Triple Diamond" && FQMonthsvaluenextYear < 150))//Triple Diamond
      {
        valFQNext = true;
        alert("Founders Triple Diamond FQ months minimum value should be 150");
      }		
      if((nextYear == 420 && nextYearValue == "Crown" && FQMonthsvaluenextYear < 108)) //Triple Diamond
      {
        valFQNext = true;
        alert("Crown FQ months minimum value should be 108");
      }		
      if( valFQNext == false){
        var ntf=new kony.mvc.Navigation("GIPDiamondSummary");
        ntf.navigate();
      }

    }   				  			  		  					
    else  {
      var ntf=new kony.mvc.Navigation("GIPDiamondSummary");
      ntf.navigate();
    }

  },



  //Next Year Selected Values
  GIPNextYearValues:function() {

    nextSPMonths = Math.round(this.view.txtSPMonths.text);
    nextSPMonths = parseInt(nextSPMonths); //Next Year SP Months	
    nextFQMonths = parseInt(this.view.txtFQMonths.text); //Next Year FQ Months		
    nextComebackPlatinum = Math.round(this.view.txtComebackPlatinumNextYear.text);
    nextComebackPlatinum = parseInt(nextComebackPlatinum);

    //Difference of Comeback Qualified Platinum Nextyear and CurrentYear
    diffComebackPlatinum = nextComebackPlatinum - currComebackPlatinum;

  },


  //***************************************************************************
  //***** CYP , FYRQ and RQ Common Code for Diamond , Emerald and Platinum ****
  //***************************************************************************
  //***** Achive A PIN ****

  GIPDiamondAchiveAPin:function() {
    //CYP : Change Your Pin 
    //Formula = IF(AND(I6>F6,I6>E6),"New Pin",IF(AND(I6>F6,I6=E6),"Comeback Pin(Highest Award)",IF(AND(I6>F6,I6<E6),"Comeback Pin (lower than highest)",0 )))   			  
    if ((nextYear > currentYear) && (nextYear > lastYear)) CYP = "New Pin";
    else if ((nextYear > currentYear) && (nextYear == lastYear)) CYP = "Comeback Pin(Highest Award)";
    else if ((nextYear < currentYear)) CYP = "Pin Drop";
    else
      CYP = "";


    //FYRQ : First Year Requalified
    //Formula = IF(AND(F6>E6,I6=F6),"First Year Requalification",0)		                                                                                                                                                                          				  				  			   
    if ((currentYear > lastYear) && (nextYear == currentYear)) FYRQ = "First Year Requalification";
    else
      FYRQ = "";

    //RQ : Requalified
    //Formula = IF(OR(AND(F6=E6,I6=F6),AND(F6<E6,I6=F6)),"Requalified" &" "& VLOOKUP(I6,$XFB$1048490:$XFC$1048512,2,0),0)							    		  				  				  
    if (((currentYear == lastYear) && (nextYear == currentYear)) || ((currentYear < lastYear) && (nextYear == currentYear))) RQ = "Requalified" + " " + nextYearValue;
    else
      RQ = "";

  },


  //******************************************
  //***** List Next Year Master Data Binding *
  //******************************************
  GIPNextyearListMasterData:function() {



    //List Next Year Master Data
    if (varSegment == "Diamond") {
      this.view.lstNextyear.masterData = [
        ["1", "Select"],
        ["380", "Diamond"],
        ["385", "Founders Diamond"],
        ["390", "Executive Diamond"],
        ["395", "Founders Executive Diamond"],
        ["400", "Double Diamond"],
        ["405", "Founders Double diamond"],
        ["410", "Triple Diamond"],
        ["415", "Founders Triple Diamond"],
        ["420", "Crown"]
      ];
      this.view.lstNextyear.selectedKey = "1";

    } else if (varSegment == "Emerald") {
      this.view.lstNextyear.masterData = [
        ["1", "Select"],
        ["370", "Emerald"],
        ["375", "Founders Emerald"]
      ];
      this.view.lstNextyear.selectedKey = "1";
    } else {
      this.view.lstNextyear.masterData = [
        ["1", "Select"],
        ["330", "Platinum"],
        ["340", "Ruby"],
        ["342", "Founders Platinum"],
        ["365", "Sapphire"],
        ["367", "Founders Sapphire"]
      ];
      this.view.lstNextyear.selectedKey = "1";
    }

  },


  //GIP Next Year Dynamically Set Header and Widget 
  GIPHeaderAndWidgetNext:function() {

    //Header Text
    var headerDiamond = "Diamond Segment - Simulation";
    var headerEmerald = "Emerald Segment - Simulation";
    var headerPlatinum = "Platinum Segment - Simulation";


    if (varSegment == "Diamond") {
      this.view.flxHeader.skin = amwayGIPDiamondHeader;
      this.view.lblHeader.text = headerDiamond;
      if (kony.os.deviceInfo()["name"] == "iPad" || kony.os.deviceInfo()["name"] == "iPad Simulator" || kony.os.deviceInfo()["name"] == "iPhone Simulator" || kony.os.deviceInfo()["name"] == "iPhone") {
        //this.view.lblFQMonths.top = "52%";
      }
      this.view.lblFQMonths.isVisible = true;
      this.view.txtFQMonths.isVisible = true;
      this.view.lblSPMonths.isVisible = false;
      //this.view.txtSPMonths.isVisible = false;
      this.view.flexSPMonthsNextYear.isVisible = false;
    } else if (varSegment == "Emerald") {
      this.view.flxHeader.skin = amwayGIPEmeraldHeader;
      this.view.lblHeader.text = headerEmerald;
      if (kony.os.deviceInfo()["name"] == "iPad" || kony.os.deviceInfo()["name"] == "iPad Simulator" || kony.os.deviceInfo()["name"] == "iPhone Simulator" || kony.os.deviceInfo()["name"] == "iPhone") {
        //this.view.lblFQMonths.top = "52%";
      }
      this.view.lblFQMonths.isVisible = true;
      this.view.txtFQMonths.isVisible = true;
      this.view.lblSPMonths.isVisible = false;
      //this.view.txtSPMonths.isVisible = false;
      this.view.flexSPMonthsNextYear.isVisible = false;

    } else {
      this.view.flxHeader.skin = amwayGIPPlatinumHeader;
      this.view.lblHeader.text = headerPlatinum;
      //this.view.lblFQMonths.isVisible =  true;
      //this.view.txtFQMonths.isVisible =  true;
      this.view.lblComebackPlatinumNextYear.isVisible = false;
      this.view.flexComebackPlatinumNextYear.isVisible = false;
    }

  },


  //********************************
  //***** Next Year Achived PIN ****
  //********************************

  GIPNextYearAchivedPin:function() {

    this.view.txtSPMonths.text="";
    this.view.txtFQMonths.text="";
    this.view.txtComebackPlatinumNextYear.text="";

    nextYearValue = this.view.lstNextyear.selectedKeyValue[1];
    //nextYear = this.view.lstNextyear.selectedKeyValue[0];
    // if (nextYearValue == "Platinum") nextYear = 340;
    //else
    nextYear = this.view.lstNextyear.selectedKeyValue[0];


    if (varSegment == "Platinum") {
      //Sapphire and above only FQ month option should come and Q month should not come
      //if(nextYear >= 365)
      if (nextYear > 340) {
        this.view.lblSPMonths.isVisible = false;
        this.view.flexSPMonthsNextYear.isVisible = false;
        if (kony.os.deviceInfo()["name"] == "iPad" || kony.os.deviceInfo()["name"] == "iPad Simulator" || kony.os.deviceInfo()["name"] == "iPhone Simulator" || kony.os.deviceInfo()["name"] == "iPhone") {
          //this.view.lblFQMonths.top = "55%";
        }
        this.view.lblFQMonths.isVisible = true;
        this.view.flexFQMonthsNextYear.isVisible = true;
      }

      //Below Sapphire Q month option should come and FQ month should not come
      else {

        //if (kony.os.deviceInfo()["name"]=="iPad" || kony.os.deviceInfo()["name"]=="iPad Simulator"  || kony.os.deviceInfo()["name"]=="iPhone Simulator" || kony.os.deviceInfo()["name"]=="iPhone") {
        //	this.view.lblFQMonths.top = "55%";
        //	this.view.flexFQMonthsNextYear.top = "2%";
        // }	
        this.view.lblSPMonths.isVisible = true;
        this.view.flexSPMonthsNextYear.isVisible = true;
        this.view.lblFQMonths.isVisible = false;
        this.view.flexFQMonthsNextYear.isVisible = false;
      }
    }


  },


});