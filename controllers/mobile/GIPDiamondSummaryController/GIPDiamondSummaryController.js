define({ 

 onNavigate:function(){
   
   this.view.preShow=this.applyBindings.bind(this);
   
 },
  
  applyBindings:function(){
    controllerReference=this;
    this.GIPHeaderAndWidgetSummary();
    this.GIPDiamondPAB();
    this.ConvertAmountInWords(this.eventobject);
    this.view.btnBack.onClick=this.goToPreviousForm.bind(this);
    this.view.onDeviceBack=this.goToPreviousForm.bind(this);
    this.view.btnGIPSegments.onClick=this.navigateToGIPHome.bind(this);
  },
  
    showNotification:function(){
    try{
      controllerReference.view.Popup.isVisible=true;
    }catch(e){}
  },
  

  
  navigateToGIPHome:function(){
    //preYear.reset();
    //currYear.reset();
    //nxtYear.reset();
    
    kony.application.destroyForm("GIPDiamondPrevYear");
    kony.application.destroyForm("GIPDiamondCurrYear");
    kony.application.destroyForm("GIPDiamondNextYear");
    preYear=null;
    currYear=null;
    nxtYear=null;
    resetGIP();
    var ntf=new kony.mvc.Navigation("GIPSimulatorHome");
    ntf.navigate();
  },
  

  //GIP Summary Dynamically Set Header and Widget
 GIPHeaderAndWidgetSummary:function() {

    //Header Text
    var headerDiamond = "Diamond Segment - Simulation";
    var headerEmerald = "Emerald Segment - Simulation";
    var headerPlatinum = "Platinum Segment - Simulation";

    
        if (varSegment == "Diamond") {
            this.view.flxHeader.skin = amwayGIPDiamondHeader;
            this.view.lblHeader.text = headerDiamond;
            if (kony.os.deviceInfo()["name"] == "iPad" || kony.os.deviceInfo()["name"] == "iPad Simulator" || kony.os.deviceInfo()["name"] == "iPhone Simulator" || kony.os.deviceInfo()["name"] == "iPhone") {
                this.view.GIPDiamondTotalEarnings.top = "2%";
            }
            this.view.imgTotal.src = "img_total_earning.png";
        } else if (varSegment == "Emerald") {
            this.view.flxHeader.skin = amwayGIPEmeraldHeader;
            this.view.lblHeader.text = headerEmerald;
            if (kony.os.deviceInfo()["name"] == "iPad" || kony.os.deviceInfo()["name"] == "iPad Simulator" || kony.os.deviceInfo()["name"] == "iPhone Simulator" || kony.os.deviceInfo()["name"] == "iPhone") {
                this.view.GIPDiamondTotalEarnings.top = "2%";
            }
            this.view.imgTotal.src = "img_total_earning.png";
        } else {
            this.view.flxHeader.skin = amwayGIPPlatinumHeader;
            this.view.lblHeader.text = headerPlatinum;
            if (kony.os.deviceInfo()["name"] == "iPad" || kony.os.deviceInfo()["name"] == "iPad Simulator" || kony.os.deviceInfo()["name"] == "iPhone Simulator" || kony.os.deviceInfo()["name"] == "iPhone") {
                this.view.GIPDiamondTotalEarnings.top = "2%";
            }
          
            this.view.imgTotal.src = "img_total_earning_platinum.png";
        }
    
},

  goToPreviousForm:function(){
    resetGIP();
    var ntf=new kony.mvc.Navigation("GIPDiamondNextYear");
    ntf.navigate();
  },
  
  
    //*****************************************************************
//***** Diamond , Emerald and Platinum Calculation  ***************
//*****************************************************************

 GIPDiamondPAB:function() {

    
        //alert("CYP:"+ CYP +" FYRQ:" + FYRQ + " RQ:"+ RQ);
        //***** Diamond Calculation Start ******
        if (varSegment == "Diamond") {

            this.view.GIPDiamondPGB.isVisible = true;

            if (CYP != "Pin Drop") {

                //PIN ACHIVEMENT BONUS (PAB)
                //Formula = =IF(OR(ISTEXT(C20),ISTEXT(C23)),VLOOKUP(I6,$T$2:$U$10,2,1),IF(ISTEXT(C25),VLOOKUP(I6,$W$2:$X$10,2,1),0))		 
                //CR - 26 Aug 2016 - Changes in the Diamond SEB and PGB Vaules as below
                if (CYP == "") {
                    if (nextFQMonths >= currFQMonths) //PAB only if there is no drop in Frontline Q (FQ) months applicable only for FYRQ and RQ
                    {
                        if ((CYP !== null && CYP !== "") || (FYRQ !== null && FYRQ != "")) {
                            if ((nextYear == 380) && (nextYearValue == "Diamond")) {
                                //alert("FYRQ-Diamond");
                                PABValue = 500000;
                            } else {
                                //alert("FYRQ-F-Diamond");
                                PABValue = 750000;
                            }
                        }

                        if (RQ != null && RQ != "") {
                            //alert("RQ-Diamond");
                            PABValue = 0;
                            //if((nextYear == 380) && (nextYearValue == "Diamond"))
                            //	PABValue =  750000;
                            //else
                            //PABValue =  1000000; 
                        }
                    } else {
                        PABValue = 0;
                    }
                } else {
                    if ((CYP != null && CYP != "") || (FYRQ != null && FYRQ != "")) {
                        if ((nextYear == 380) && (nextYearValue == "Diamond")) {
                            //alert("New-Comeback-Diamond");
                            PABValue = 1000000;
                        } else {
                            //alert("New-Comeback-F-Diamond");
                            PABValue = 1500000;
                        }
                    }

                    if (RQ != null && RQ != "") {
                        //alert("RQ-Diamond");
                        PABValue = 0;
                        //		if((nextYear == 380) && (nextYearValue == "Diamond"))
                        //		PABValue =  750000;
                        //	else
                        //	PABValue =  1000000; 
                    }
                }
            } else {
                PABValue = 0;
            }
            this.view.lblPABValue.text = this.ChangeNumberFormat(PABValue);


            //STRUCTURE ENHANCEMENT BONUS (SEB)
            //Formula = IF(AND(OR(ISTEXT(C23),ISTEXT(C25)),I6<=340),(I9-F9)*30000,IF(AND(OR(ISTEXT(C23),ISTEXT(C25)),I6<=367),(I11-F11)*40000,IF(I6>=370,(I11-F11)*50000,0)))
            //CR - 26 Aug 2016 - Structure Enhancement Bonus -  50,000 per incremental FQ month to 60,000 per incremental FQ month
            //if( ((FYRQ != null && FYRQ != "") || (RQ != null && RQ != "")) && (nextYear <= 340))	
            //					SEBValue =  0; //(I9-F9)*30000	
            //			else if( ((FYRQ != null && FYRQ != "") || (RQ != null && RQ != "")) && (nextYear <= 367))
            //				{alert("Diamond-nextyear<370 40000" );	SEBValue = (nextFQMonths - currFQMonths) * 40000;}
            //			else if(nextYear >= 370) 
            //				{alert("Diamond-nextyear>370 30000" );	SEBValue = (nextFQMonths - currFQMonths) * 30000;}
            //			else
            //					SEBValue = 0;
            if (CYP == "Pin Drop") {
                SEBValue = 0;
            } else if ((RQ != null && RQ != "") && (nextYear <= 340)) SEBValue = 0; //(I9-F9)*30000	
            else if ((RQ != null && RQ != "") && (nextYear <= 367)) {
                //alert("Diamond-nextyear<370 40000");
                SEBValue = (nextFQMonths - currFQMonths) * 30000;
            } else if ((RQ != null && RQ != "") && nextYear >= 370) {
                //alert("Diamond-nextyear>370 30000");
                SEBValue = (nextFQMonths - currFQMonths) * 30000;
            } else if (PABValue == 0) {
                SEBValue = (nextFQMonths - currFQMonths) * 30000;

            } else SEBValue = 0;

            if (SEBValue > 0) this.view.lblSEBValue.text = this.ChangeNumberFormat(SEBValue);
            else {
                SEBValue = 0;
                this.view.lblSEBValue.text = this.ChangeNumberFormat(SEBValue);
            }


            //PLATINUM GROWTH BONUS (PGB)	
            //Formula = No. of New and Comeback Platinums in your group * 30,000
            //if(currComebackPlatinum > 0)
            if (diffComebackPlatinum > 0) {
                //PGBValue = currComebackPlatinum * 30000;
                // CR - 26 Aug 2016 - Platinum Growth Bonus 30,000 Incremental Platinum to 1 Lakh Incremental Platinum
                //alert("PGB-Value: diamond 40000");
                PGBValue = diffComebackPlatinum * 40000;
                this.view.lblPGBValue.text = this.ChangeNumberFormat(PGBValue);
            } else {
                this.view.lblPGBValue.text = 0;
            }
        }
        //***** Diamond Calculation End ********
        //*************************************
        //***** Emerald Calculation Start *****
        //*************************************	 
        else if (varSegment == "Emerald") {
            this.view.GIPDiamondPGB.isVisible = true;

            if (CYP != "Pin Drop") {
                //PIN ACHIVEMENT BONUS (PAB)
                //Formula = =IF(OR(ISTEXT(C20),ISTEXT(C23)),VLOOKUP(I6,$T$2:$U$10,2,1),IF(ISTEXT(C25),VLOOKUP(I6,$W$2:$X$10,2,1),0))
                //CR - 26 Aug 2016 - Changes in the Emerald SEB, PAB and PGB Vaules as below
                if (CYP == "") {
                    if (nextFQMonths >= currFQMonths) //PAB only if there is no drop in Frontline Q (FQ) months 
                    {
                        // CR - 26 Aug 2016 - Pin Achievement Bonus 5 Lakh to 6 Lakh
                        // CR - 26 Aug 2016 - Pin Achievement Bonus 2.5 Lakh to 3 Lakh
                        if ((CYP != null && CYP != "") || (FYRQ != null && FYRQ != "")) {
                            if ((nextYear == 370) && (nextYearValue == "Emerald")) {
                                //alert("Emareld FRQ 25000");
                                PABValue = 250000;
                            } else {
                                //alert("f. emareld 375000");
                                PABValue = 375000;
                            }
                        }
                        if (RQ != null && RQ != "") {
                            //alert("RQ EMARELD");
                            PABValue = 0;
                            //if((nextYear == 370) && (nextYearValue == "Emerald"))			
                            //	PABValue =   0;
                            //	else
                            //	PABValue =   0; 		
                        }
                    } else {
                        PABValue = 0;
                    }
                } else {
                    if ((CYP != null && CYP != "") || (FYRQ != null && FYRQ != "")) {
                        if ((nextYear == 370) && (nextYearValue == "Emerald")) {
                            //alert("Emareld new, comeback pab 50000");
                            PABValue = 500000;
                        } else {
                            //alert("F emaraled new, comeback pab 750000");
                            PABValue = 750000;
                        }
                    }
                    if (RQ != null && RQ != "") {
                        //alert("Emareld RQ");
                        PABValue = 0;
                        //if((nextYear == 370) && (nextYearValue == "Emerald"))			
                        //	PABValue =   300000;
                        //else
                        //	PABValue =   500000; 		
                    }
                }
            } else {
                PABValue = 0;
            }
            //alert(PABValue);
            this.view.lblPABValue.text = this.ChangeNumberFormat(PABValue);


            //STRUCTURE ENHANCEMENT BONUS (SEB)
            //Formula = IF(AND(OR(ISTEXT(C23),ISTEXT(C25)),I6<=340),(I9-F9)*30000,IF(AND(OR(ISTEXT(C23),ISTEXT(C25)),I6<=367),(I11-F11)*40000,IF(I6>=370,(I11-F11)*50000,0)))
            //CR - 26 Aug 2016 - Structure Enhancement Bonus 50,000 per incremental FQ month to 60,000 per incremental FQ month		  						  		
            //if( ((FYRQ != null && FYRQ != "") || (RQ != null && RQ != "")) && (nextYear <= 340))	
            //				SEBValue =  0; //(I9-F9)*30000	
            //			else if( ((FYRQ != null && FYRQ != "") || (RQ != null && RQ != "")) && (nextYear <= 367))			
            //			{ alert("Emareld SEB 40000");	SEBValue = (nextFQMonths - currFQMonths) * 40000;}
            //			else if(nextYear >= 370)			
            //			{ alert("Emareld SEB 30000");	SEBValue = (nextFQMonths - currFQMonths) * 30000;}
            //			else
            //				SEBValue = 0;
            if (CYP == "Pin Drop") {
                SEBValue = 0;
            } else if ((RQ != null && RQ != "") && (nextYear <= 340)) SEBValue = 0; //(I9-F9)*30000	
            else if ((RQ != null && RQ != "") && (nextYear <= 367)) {
                //alert("Emareld SEB 40000");
                SEBValue = (nextFQMonths - currFQMonths) * 30000;


            } else if ((RQ != null && RQ != "") && (nextYear >= 370)) {
                //alert("Emareld SEB 30000");
                SEBValue = (nextFQMonths - currFQMonths) * 30000;

            } else if (PABValue == 0) {
                SEBValue = (nextFQMonths - currFQMonths) * 30000;

            } else SEBValue = 0;



            if (SEBValue > 0) {
                this.view.lblSEBValue.text = this.ChangeNumberFormat(SEBValue);
            } else {
                SEBValue = 0;
                this.view.lblSEBValue.text = this.ChangeNumberFormat(SEBValue);
            }


            //PLATINUM GROWTH BONUS (PGB)	
            //Formula = No. of New and Comeback Platinums in your group * 50,000  
            //CR - 26 Aug 2016 - Platinum Growth Bonus 50,000  Incremental Platinum to 1 Lakh Incremental Platinum
            //if(currComebackPlatinum > 0)
            if (diffComebackPlatinum > 0) {
                //PGBValue = currComebackPlatinum * 50000;	 
                PGBValue = diffComebackPlatinum * 30000;
                this.view.lblPGBValue.text = this.ChangeNumberFormat(PGBValue);
            } else
            this.view.lblPGBValue.text = 0;

        }
        //***** Emerald Calculation End ********* 
        //*************************************
        //***** Platinum Calculation Start *****
        //*************************************	
        else if (varSegment == "Platinum") {
            this.view.GIPDiamondPGB.isVisible = false;

            if (CYP != "Pin Drop") {
                //PIN ACHIVEMENT BONUS (PAB)
                //Excel Formula
                //Formula = IF(OR(ISTEXT(C20),ISTEXT(C23)),VLOOKUP(I6,$T$2:$U$10,2,1),IF(ISTEXT(C25),VLOOKUP(I6,$W$2:$X$10,2,1),0))					  				  	
                //Formula = IF(AND(I6<=340,I9<=8),150000,C28)
                //Rishabh Mail
                //Pin Achievement Bonus  :  Here the logic is ,  for Platinum and Ruby ABO with qualification criteria 
                //CYP and FYRQ will get 1.5 Lakh if Q months are 6-8 and 2.25 Lakh if Q months 9-11 . 
                //FYRQ here also will be rewarded Pin Achievement Bonus only if no drop in Q months . 
                //Founders Platinum to Founders sapphire with qualification criteria CYP and FYRQ will get 3 Lakh as Pin achievement Bonus .
                // FYRQ will be rewarded PAB only if no drop in FQ months .	
                //CR - 26 Aug 2016 - Changes in the Platinum SEB and PAB Vaules as below
                if (nextYear > 340) {
                    if (CYP == "") {
                        //CR - 26 Aug 2016 -  Pin Achievement Bonus 1.5 Lakh to 2.5 Lakh
                        //CR - 26 Aug 2016 -  Pin Achievement Bonus 2.25 Lakh	to 3.25 Lakh
                        //CR - 26 Aug 2016 -  Pin Achievement Bonus 3 Lakh to 4 Lakh
                        if (nextFQMonths >= currFQMonths) {
                            if ((CYP != null && CYP != "") || (FYRQ != null && FYRQ != "")) {
                                if (((nextYear == 340) && (nextYearValue == "Platinum")) || ((nextYear == 340) && (nextYearValue == "Ruby"))) {
                                    //alert("Platinum  FYRQ PAB 75000");
                                    PABValue = 75000;
                                    //	if(nextSPMonths <= 6 || nextSPMonths <= 8)							
                                    //			PABValue =   250000;
                                    //	else if (nextSPMonths <= 9 || nextSPMonths <= 11)							
                                    //	PABValue =   325000;
                                } else if ((nextYear == 342) && (nextYearValue == "Founders Platinum")) { //alert("fOUNDER Platinum FYRQ PAB 125000");
                                    PABValue = 125000;
                                } else
                                PABValue = 0;
                            }
                        }
                    } else {
                        if ((CYP != null && CYP != "") || (FYRQ != null && FYRQ != "")) {
                            if (((nextYear == 340) && (nextYearValue == "Platinum")) || ((nextYear == 340) && (nextYearValue == "Ruby"))) {
                                //alert("Platinum COMEBACK PAB 150000");
                                PABValue = 150000;
                                //if(nextSPMonths <= 6 || nextSPMonths <= 8)							
                                //		PABValue =   250000;
                                //	else if (nextSPMonths <= 9 || nextSPMonths <= 11)							
                                //		PABValue =   325000;
                            } else if ((nextYear == 342) && (nextYearValue == "Founders Platinum")) { //alert("fOUNDER Platinum COMEBACK PAB 250000");
                                PABValue = 250000;
                            } else
                            PABValue = 0;
                        }
                    }
                } else {
                    if (CYP == "") {
                        if (nextSPMonths >= currSPMonths) {
                            if ((CYP != null && CYP != "") || (FYRQ != null && FYRQ != "")) {
                                if (((nextYear == 340) && (nextYearValue == "Platinum")) || ((nextYear == 340) && (nextYearValue == "Ruby"))) { //alert(" Platinum FYRQ PAB 150000 next year>340");
                                    PABValue = 75000;
                                    //if(nextSPMonths <= 6 || nextSPMonths <= 8)							
                                    //		PABValue =   250000;
                                    //	else if (nextSPMonths <= 9 || nextSPMonths <= 11)							
                                    //	PABValue =   325000;
                                } else if ((nextYear == 342) && (nextYearValue == "Founders Platinum")) { //alert("fOUNDER Platinum COMEBACK PAB 250000 next year>340");
                                    PABValue = 125000;
                                } else
                                PABValue = 0;
                            }
                        }
                    } else {
                        if ((CYP != null && CYP != "") || (FYRQ != null && FYRQ != "")) {
                            if (((nextYear == 340) && (nextYearValue == "Platinum")) || ((nextYear == 340) && (nextYearValue == "Ruby"))) {
                                //	alert(" Platinum comeback PAB 150000 next year>340");
                                PABValue = 150000;
                                //if(nextSPMonths <= 6 || nextSPMonths <= 8)							
                                //	PABValue =   250000;
                                //	else if (nextSPMonths <= 9 || nextSPMonths <= 11)							
                                //	PABValue =   325000;
                            } else if ((nextYear == 342) && (nextYearValue == "Founders Platinum")) { // alert("founder Platinum FYRQ PAB 250000 next year>340");	
                                PABValue = 250000;
                            } else
                            PABValue = 0;
                        }
                    }
                }
            } else {
                PABValue = 0;
            }





/* Start Commented Previous working code  
					  
			//if(nextFQMonths >= currFQMonths)
			//{				 		  	 
				if((CYP != null && CYP != "") || (FYRQ != null && FYRQ != ""))
				{
					if(((nextYear == 340) && (nextYearValue == "Platinum")) || ((nextYear == 340) && (nextYearValue == "Ruby")))
					{
						if(nextSPMonths <= 6 || nextSPMonths <= 8)							
							PABValue =   150000;
						else if (nextSPMonths <= 9 || nextSPMonths <= 11)							
							PABValue =   225000;
					}
					else if(((nextYear == 342) && (nextYearValue == "Founders Platinum")) || ((nextYear == 365) && (nextYearValue == "Sapphire")) || ((nextYear == 367) && (nextYearValue == "Founders Sapphire")) )
						PABValue = 300000;			
					else 
						PABValue = 0;				
				}
			//}
			//else
						//PABValue = 0;	

			End Commented Previous working code  */
            //Requalified (RQ) ABOs in Platinum Category will not get Pin Achievement Bonus (PAB) 
            if (RQ != null && RQ != "") PABValue = 0;

            this.view.lblPABValue.text = this.ChangeNumberFormat(PABValue);
			
			//alert(CYP);

            //STRUCTURE ENHANCEMENT BONUS (SEB)
            //Formula = IF(AND(ISTEXT(C25),I6<=340),(I9-F9)*30000,IF(AND(ISTEXT(C25),I6>=342),(I11-F11)*40000,0))														
            //CR - 26 Aug 2016 -  Structure Enhancement Bonus 30,000 incremental SP month to 60,000 per incremental SP month
            //CR - 26 Aug 2016 -  Structure Enhancement Bonus 40,000 per incremental FQ month to 60,000 per incremental FQ month
            if (CYP == "Pin Drop") {
                SEBValue = 0;
            } else if ((RQ != null && RQ != "") && (nextYear <= 340)) { //alert("SEB PLATINUM  RQ 30000 <340");
                SEBValue = (nextSPMonths - currSPMonths) * 30000;

            } //(I9-F9)*30000
            else if ((RQ != null && RQ != "") && (nextYear >= 342)) { //alert("SEB PLATINUM  RQ 30000 >342");
                SEBValue = (nextFQMonths - currFQMonths) * 30000;

            } //(I11-F11)*40000
            else if (((nextYear == 365) && (nextYearValue == "Sapphire")) || ((nextYear == 367) && (nextYearValue == "Founders Sapphire"))) { //alert("SEB SAPPHIRE  RQ 30000");
                SEBValue = (nextFQMonths - currFQMonths) * 30000;

            } else if (PABValue == 0) {
                if (nextYear <= 340) {
                    SEBValue = (nextSPMonths - currSPMonths) * 30000;
                } else if (nextYear >= 342) {
                    SEBValue = (nextFQMonths - currFQMonths) * 30000;
                }

            } else SEBValue = 0;

            if (SEBValue > 0) this.view.lblSEBValue.text = this.ChangeNumberFormat(SEBValue);
            else {
                SEBValue = 0;
                this.view.lblSEBValue.text = this.ChangeNumberFormat(SEBValue);
            }

        }
        //***** Platinum Calculation End *********  
        else {
            //alert("AboutGIP");
        }


        //SUM OF PAB + SEB + PGB
        //alert("PABValue  : " + PABValue);
        //alert("SEBValue  : " + SEBValue);
        //alert("PGBValue  : " + PGBValue);
        totalGIP = PABValue + SEBValue + PGBValue;
        this.view.lblTotalValue.text = this.ChangeNumberFormat(totalGIP);

       this.ConvertAmountInWords(totalGIP);
    
},
  
  /*
 * Function for Displaying a number in Indian Rupees format.
 * Ex - 125465778 will conver into 2,54,65,778.
 */
 ChangeNumberFormat:function(Number){

    var x = Number.toString();
    var afterPoint = '';
    if (x.indexOf('.') > 0) afterPoint = x.substring(x.indexOf('.'), x.length);
    x = Math.floor(x);
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '') lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
    return res;
},


  
  
 ConvertAmountInWords:function(rVal) {
    
        //var rVal=document.getElementById('rupees').value;
        rVal = Math.floor(rVal);
        var rup = new String(rVal);
   		
        rupRev = rup.split("");
        actualNumber = rupRev.reverse();
  

  
  
  

        if (Number(rVal) >= 0) {

        } else {
            //alert('Number cannot be converted');
            return false;
        }
        if (Number(rVal) == 0) {
            //document.getElementById('wordValue').innerHTML=rup+''+'Rupees Zero Only';
            //alert("Rupees Zero Only");
            this.view.GIPFlexTotalInWords.isVisible = false;
            return false;
        }
        if (actualNumber.length > 9) {
            alert('the Number is too big to covertes');
            return false;
        }

        var numWords = ["Zero", " One", " Two", " Three", " Four", " Five", " Six", " Seven", " Eight", " Nine"];
        var numPlace = ['Ten', ' Eleven', ' Twelve', ' Thirteen', ' Fourteen', ' Fifteen', ' Sixteen', ' Seventeen', ' Eighteen', ' Nineteen'];
        var tPlace = ['dummy', ' Ten', ' Twenty', ' Thirty', ' Forty', ' Fifty', ' Sixty', ' Seventy', ' Eighty', ' Ninety'];

        var numWordsLength = rupRev.length;
        var totalWords = "";
        var numtoWords = new Array();
        var finalWord = "";
        j = 0;
        for (i = 0; i < numWordsLength; i++) {
            switch (i) {
            case 0:
                if (actualNumber[i] == 0 || actualNumber[i + 1] == 1) {
                    numtoWords[j] = '';
                } else {
                    numtoWords[j] = numWords[actualNumber[i]];
                }
                numtoWords[j] = numtoWords[j] + ' Only';
                break;
            case 1:
                CTen();
                break;
            case 2:
                if (actualNumber[i] == 0) {
                    numtoWords[j] = '';
                } else if (actualNumber[i - 1] != 0 && actualNumber[i - 2] != 0) {
                    numtoWords[j] = numWords[actualNumber[i]] + ' Hundred and';
                } else {
                    numtoWords[j] = numWords[actualNumber[i]] + ' Hundred';
                }
                break;
            case 3:
                if (actualNumber[i] == 0 || actualNumber[i + 1] == 1) {
                    numtoWords[j] = '';
                } else {
                    numtoWords[j] = numWords[actualNumber[i]];
                }
                if (actualNumber[i + 1] != 0 || actualNumber[i] > 0) {
                    numtoWords[j] = numtoWords[j] + " Thousand";
                }
                break;
            case 4:
                CTen();
                break;
            case 5:
                if (actualNumber[i] == 0 || actualNumber[i + 1] == 1) {
                    numtoWords[j] = '';
                } else {
                    numtoWords[j] = numWords[actualNumber[i]];
                }
                if (actualNumber[i + 1] != 0 || actualNumber[i] > 0) {
                    numtoWords[j] = numtoWords[j] + " Lakh";
                }
                break;
            case 6:
                CTen();
                break;
            case 7:
                if (actualNumber[i] == 0 || actualNumber[i + 1] == 1) {
                    numtoWords[j] = '';
                } else {
                    numtoWords[j] = numWords[actualNumber[i]];
                }
                numtoWords[j] = numtoWords[j] + " Crore";
                break;
            case 8:
                CTen();
                break;
            default:
                break;
            }
            j++;
        }
		
   
        
        numtoWords.reverse();
        for (i = 0; i < numtoWords.length; i++) {
            finalWord += numtoWords[i];
        }
			 
   function CTen() {
            if (actualNumber[i] == 0) {
                numtoWords[j] = '';
            } else if (actualNumber[i] == 1) {
                numtoWords[j] = numPlace[actualNumber[i - 1]];
            } else {
                numtoWords[j] = tPlace[actualNumber[i]];
            }
        }
       // alert(rup+'  '+finalWord);	
        if (rup > 0) {
            this.view.GIPFlexTotalInWords.isVisible = true;
            this.view.lblTotalInWords.text = finalWord;
        } else {
            this.view.GIPFlexTotalInWords.isVisible = false;
        }




},
   
  
  
  
          
  
 });