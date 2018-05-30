define({
  
  
  onNavigate: function() {
        if (this.getCurrentForm() == "commissionSchedule") {
            this.resetWidgetsAndValues();
        }
      this.view.init=this.intializeVariables.bind(this);
      this.view.preShow=this.setHeaderText.bind(this);
      this.view.postShow=this.applyBindings.bind(this);
      
    },
  
    showNotification:function(){
    try{
      controllerReference.view.Popup.isVisible=true;
    }catch(e){}
  },
  

    //call in post show
    applyBindings: function() {
      	controllerReference=this;
        this.view.btnBack.onClick = this.goBackToCommissionSchedule.bind(this);
      this.view.onDeviceBack=this.goBackToCommissionSchedule.bind(this);
        this.view.btnNext.onClick = this.showLOSNextForm.bind(this);
        this.view.btnClose.onClick = this.hidePopup.bind(this);
		this.view.btnSave.onClick=this.calculateGPV_PPV.bind(this.eventobject);
      	for (var i = 1; i <= 4; i++) {
            var j = 1;
            if (i == 1) j = 0;
            for (; j <= 4; j++) {
				 this.view["ABO" + i + "" + j].onClick=this.showPopup.bind(this.eventobject);

            }
        }
    },
  
  
  
  setHeaderText:function(){
    this.hidePopup();
    this.view.lblHeader.text="Simulate your Earnings";
  },

    // call in form init
    intializeVariables: function() {
        boolToCheckMethodCall = false;
        selectedABOID = "";
        salesCommission = 0;
        personalCommission = 0;
        performanceCommission = 0;
        enhancedSales = 0;
        tradeDiscount = 0;
        groupDevelopmentCommission = 0;
        leadershipEnhancementCommission = 0;
        totalCommissions = 0;
        arrSilverProducer = [];

    },

    goBackToCommissionSchedule: function() {
        var ntf = new kony.mvc.Navigation("commissionSchedule");
        ntf.navigate();
      
      kony.application.destroyForm("incomeSimulatorLOS");
    },

    convertIntoInteger: function(number) {
        var digit = parseFloat(number).toFixed(0);
        return digit;
    },

    resetWidgetsAndValues: function() {
        for (var i = 1; i <= 4; i++) {
            var j = 1;
            if (i == 1) j = 0;
            for (; j <= 4; j++) {

                this.view["FlexABO" + i + "" + j + "Values"].isVisible = false;
                this.view["lblABO" + i + "" + j + "PPVValue"]["text"] = "PP : " + 0;
                this.view["lblABO" + i + "" + j + "GPVValue"]["text"] = "TP : " + 0;
                this.view["lblABO" + i + "" + j + "BVValue"]["text"] = "Bonus : " + 0 + " %";

            }
        }
        this.view.lblPersonalCommissionValue.text = this.convertIntoInteger(0);
        this.view.lblSalesCommissionValue.text = this.convertIntoInteger(0);
        this.view.lblTotalCommissionValue.text = this.convertIntoInteger(0);
        boolToCheckMethodCall = false;
        selectedABOID = "";
        salesCommission = 0;
        personalCommission = 0;
        performanceCommission = 0;
        enhancedSales = 0;
        tradeDiscount = 0;
        groupDevelopmentCommission = 0;
        leadershipEnhancementCommission = 0;
        totalCommissions = 0;
        arrSilverProducer = [];
        this.view.btnNext.isVisible = false;
    },

    

  
  
    //Function to calculate the GPV & PPV of ABO's
    calculateGPV_PPV: function(eventObject) {
        var ppvValue = this.view.txtPPV.text;
        var gpvValue = this.view.txtGPV.text;

        if (!ppvValue || ppvValue < 0) {
            alert("Please insert Personal Points");
            return;
        } else {

            //extract abo's possition
            var aboColumn = selectedABOID.substr(0, selectedABOID.length - 1);
            var aboRowNumber = selectedABOID.substr(selectedABOID.length - 1, 1);
            var bvValue = this.calculateBonusPercentage(gpvValue);

            //calculate GPV
            if (!gpvValue || (gpvValue === 0)) {
                gpvValue = ppvValue;
                if (aboRowNumber === 0) {
                    //check if bv is silver producer
                    var isSliverProducer = this.isYOUQualifiedSilverProducer(gpvValue);
                    var isSliverSponser = this.isYOUQualifiedSilverSponser();
                    if (isSliverProducer != "NONE" || isSliverSponser) {
                        bvValue = "21";
                    } else {
                        bvValue = this.calculateBonusPercentage(gpvValue);
                    }
                } else {

                    try {
                        var downlineBV = this.view["lbl" + aboColumn + "" + (parseInt(aboRowNumber) + 1) + "BVValue"]["text"].split(" ");
                        if (downlineBV[2] == 21) {
                            bvValue = "21";
                        } else {
                            bvValue = this.calculateBonusPercentage(gpvValue);
                        }
                    } catch (err) {
                        bvValue = this.calculateBonusPercentage(gpvValue);
                    }

                }
            } else {


                if (this.view.txtGPV.info.a == 1) {
                    //alert("gpvValue : "+gpvValue+" ppvValue : "+ppvValue);
                    if (parseInt(gpvValue) < parseInt(ppvValue)) {
                        alert("Team Points can not be less then Personal Points, please insert correct value");
                        return;
                    }

                }


                if (aboRowNumber < 4) {

                    if (aboRowNumber == 0) {
                        gpvValue = this.calculateGPVofYOU(ppvValue);

                        //check if bv is silver producer
                        var isSliverProducer = this.isYOUQualifiedSilverProducer(gpvValue);
                        var isSliverSponser = this.isYOUQualifiedSilverSponser();

                        if (isSliverProducer != "NONE" || isSliverSponser) {
                            bvValue = "21";
                        } else {
                            bvValue = this.calculateBonusPercentage(gpvValue);
                        }
                    } else {

                        //downline gpv
                        var downlineGPVString = this.view["lbl" + aboColumn + "" + (parseInt(aboRowNumber) + 1) + "GPVValue"]["text"].split(": ");
                        var downlineBV = this.view["lbl" + aboColumn + "" + (parseInt(aboRowNumber) + 1) + "BVValue"]["text"].split(" ");
                        if (downlineBV[2] == 21) {
                            gpvValue = parseInt(ppvValue);
                            bvValue = "21";
                        } else {

                            if (this.view.txtGPV.info.a == 1) {
                                gpvValue = parseInt(gpvValue) + parseInt(downlineGPVString[1]);
                            } else {
                                gpvValue = parseInt(ppvValue) + parseInt(downlineGPVString[1]);
                            }

                            bvValue = this.calculateBonusPercentage(gpvValue);
                        }



                    }

                }

            }

            /*****set PPV,GPV & Bonus Level % for selected ABO*****/
            this.view["lbl" + selectedABOID + "PPVValue"]["text"] = "PP : " + ppvValue;
            this.view["lbl" + selectedABOID + "GPVValue"]["text"] = "TP : " + gpvValue;
            this.view["lbl" + selectedABOID + "BVValue"]["text"] = "Bonus : " + bvValue + " %";

            //show value flex	
            this.view["Flex" + selectedABOID + "Values"]["isVisible"] = true;
            this.view["Flex" + selectedABOID + "Values"].animate(this.animDeftranslateForFlex(), this.animConfig(), this.animationCallBack());
            /***************************************************/

            //if(aboRowNumber != 0){
            //check condition if selected ABO is silver producer
            var isSilverProducer = this.isQualifiedSilverProducer(gpvValue, aboColumn, parseInt(aboRowNumber));
            var isSilverSponser = this.isQualifiedSilverSponser(aboColumn, parseInt(aboRowNumber));
            if (isSilverProducer != "NONE" || isSilverSponser) {
                gpvValue = 0;
            }
            //}

            //calculate & set GPV of other ABO's
            for (var i = aboRowNumber - 1; i >= 0; i--) {


                var bonusLevel = 0;

                //set condition of you (Main ABO)
                if (i == 0) {
                    aboColumn = "ABO1";
                    //ppv of main ABO
                    var aboMainPPV = this.view["lblABO10PPVValue"]["text"].split(": ");
                    gpvValue = this.calculateGPVofYOU(aboMainPPV[1]);
                    //check if bv is silver producer
                    var isSliverProducer = this.isYOUQualifiedSilverProducer(gpvValue);
                    var isSliverSponser = this.isYOUQualifiedSilverSponser();
                    if (isSliverProducer != "NONE" || isSliverSponser) {
                        bonusLevel = "21";
                    } else {
                        bonusLevel = this.calculateBonusPercentage(gpvValue);
                    }
                    this.view["lbl" + aboColumn + "" + i + "GPVValue"]["text"] = "TP : " + gpvValue;
                } else {
                    //previous ppv
                    var ppvString = this.view["lbl" + aboColumn + "" + i + "PPVValue"]["text"];
                    var ppv = ppvString.split(": ");

                    //previous gpv
                    var gpvString = this.view["lbl" + aboColumn + "" + i + "GPVValue"]["text"];
                    var gpv = ppvString.split(": ");

                    /*
                    if(gpvValue >= 10000)
                    	gpvValue = 0;
                    	*/

                    //calculate GPV

                    //check condition if selected ABO is silver producer
                    //alert("gpvValue old : " + gpvValue);
                    //alert("ppv[1]  : " + ppv[1]);


                    gpvValue = parseInt(gpvValue) + parseInt(ppv[1]);

                    var isSilverProducer = this.isQualifiedSilverProducer(gpvValue, aboColumn, i);
                    if (isSilverProducer != "NONE") {
                        //alert("inside if isSilverProducer : " + isSilverProducer);
                        //gpvValue = 0;
                        bonusLevel = "21";
                        this.view["lbl" + aboColumn + "" + i + "GPVValue"]["text"] = "TP : " + gpvValue;
                        gpvValue = 0;
                        //gpvValue = parseInt(gpvValue) + parseInt(ppv[1]);

                        //alert("gpvValue After: " + gpvValue);

                    } else {

                        var downlineBV = this.view["lbl" + aboColumn + "" + (i + 1) + "BVValue"]["text"].split(" ");
                        if (downlineBV[2] == 21) {
                            bonusLevel = "21";
                        } else {
                            bonusLevel = this.calculateBonusPercentage(gpvValue);
                        }
                        this.view["lbl" + aboColumn + "" + i + "GPVValue"]["text"] = "TP : " + gpvValue;
                    }

                }


                /*****set PPV,GPV & Bonus Level % for selected ABO*****/
                //this.view["lbl"+aboColumn+""+i+"PPVValue"]["text"] = "PP : "+ppv;
                this.view["lbl" + aboColumn + "" + i + "BVValue"]["text"] = "Bonus : " + bonusLevel + " %";

                //show value flex	
                this.view["Flex" + aboColumn + "" + i + "Values"]["isVisible"] = true;
                this.view["Flex" + aboColumn + "" + i + "Values"].animate(this.animDeftranslateForFlex(), this.animConfig(), this.animationCallBack());
                /***************************************************/
            }

            //calculate commissions
            this.calculatePersonal_SalesCommissions();
        }

        //Hide Popup
        this.hidePopup();
    },

    showPopup: function(eventObject) {

        if (!boolToCheckMethodCall) {

            boolToCheckMethodCall = true;
            selectedABOID = eventObject.id;



            var oldPPV = this.view["lbl" + selectedABOID + "PPVValue"]["text"].split(": ");
            var oldGPV = this.view["lbl" + selectedABOID + "GPVValue"]["text"].split(": ");


            var ppvText = oldPPV[1];
            var gpvText = oldGPV[1];

            if (ppvText == 0)
                ppvText = "";

            if (gpvText == 0)
                gpvText = "";


            //set default text
            this.view.txtPPV.text = ppvText;
            this.view.txtGPV.text = gpvText;


            //extract abo's possition
            var aboColumn = selectedABOID.substr(0, selectedABOID.length - 1);
            var aboRowNumber = selectedABOID.substr(selectedABOID.length - 1, 1);
            this.view.txtGPV.setEnabled(true);
            this.view.txtGPV.info = {
                a: 1
            };

            if (aboRowNumber < 4) {

                //check of YOU
                if (aboRowNumber == 0) {

                    for (var i = 1; i <= 4; i++) {

                        var nextABOGPV = this.view["FlexABO" + i + "1Values"]["isVisible"];
                        if (nextABOGPV) {
                            this.view.txtGPV.setEnabled(false);
                            this.view.txtGPV.info = {
                                a: 0
                            };
                            break;
                        }
                    }

                } else {

                    aboRowNumber = parseInt(aboRowNumber) + 1;
                    var nextABOGPV = this.view["Flex" + aboColumn + "" + aboRowNumber + "Values"]["isVisible"];

                    //var nextABOGPV = this.view["lbl"+aboColumn+""+aboRowNumber+"GPVValue"]["text"].split(": ");

                    if (nextABOGPV) {
                        this.view.txtGPV.setEnabled(false);
                        this.view.txtGPV.info = {
                            a: 0
                        };
                    }

                }

            }

            //show popup flex
            this.view.FlexContainerPopup.isVisible = true;

            this.view.FlexMainPopupBox.animate(this.animDeftranslate(), this.animConfig(), this.animationCallBack());

        }
    },

    showLOSNextForm: function() {
        //calculate all other commissions
        this.calculateAllCommissions();
    },


    calculateBonusPercentage: function(pvRange) {

        var bonusPercentage;

        //condion to check the bonus percent
        if (pvRange >= 0 && pvRange < 100) {
            bonusPercentage = 0;
        } else if (pvRange >= 100 && pvRange < 500) {
            bonusPercentage = 6;
        } else if (pvRange >= 500 && pvRange < 1200) {
            bonusPercentage = 9;
        } else if (pvRange >= 1200 && pvRange < 2400) {
            bonusPercentage = 11;
        } else if (pvRange >= 2400 && pvRange < 4000) {
            bonusPercentage = 13;
        } else if (pvRange >= 4000 && pvRange < 7000) {
            bonusPercentage = 15;
        } else if (pvRange >= 7000 && pvRange < 10000) {
            bonusPercentage = 18;
        } else if (pvRange >= 10000) {
            bonusPercentage = 21;
        }

        return bonusPercentage;
    },

    //Function to check silver producer qualification for YOU(Main ABO)
    isYOUQualifiedSilverProducer: function(aboMainGPV) {
        if (aboMainGPV >= 10000) {
            return "ALL";

        } else if (aboMainGPV >= 4000 && aboMainGPV < 10000) {

            for (var i = 1; i <= 4; i++) {

                for (var k = 1; k <= 4; k++) {
                    //downline gpv
                    var gpvString = this.view["lblABO" + i + "" + k + "GPVValue"]["text"].split(": ");

                    if (gpvString[1] >= 10000) {
                        return "SOME";
                    }
                }
            }

        } else if (aboMainGPV >= 0 && aboMainGPV < 10000) {

            var arrMainABOsDownlineSliverProducers = [];

            for (var j = 1; j <= 4; j++) {

                for (var k = 1; k <= 4; k++) {
                    //downline gpv
                    var gpvString = this.view["lblABO" + j + "" + k + "GPVValue"]["text"].split(": ");

                    if (gpvString[1] >= 10000) {
                        arrMainABOsDownlineSliverProducers.push("lblABO" + j + "" + k + "GPVValue");
                        break;
                    }
                }
            }

            if (arrMainABOsDownlineSliverProducers.length >= 2)
                return "SOME";
        }

        return "NONE";
    },

    //Function to check silver sponser qualification for YOU(Main ABO)
    isYOUQualifiedSilverSponser: function() {

        for (var i = 1; i <= 4; i++) {
            //downline bv
            var bvString = this.view["lblABO" + i + "1BVValue"]["text"].split(" ");

            if (bvString[2] == 21) {
                return true;
            }
        }

        return false;
    },

    calculateGPVofYOU: function(ppvValue) {

        //gpv of all frontline abo's
        //var arrFrontlineGPV = [];
        var gpvValue = 0;
        for (var j = 1; j <= 4; j++) {

            //get gpv of frontline abo's
            var arrFrontLineGPV = this.view["lblABO" + j + "1GPVValue"]["text"].split(": ");
            var frontLineGPV = arrFrontLineGPV[1];
            //alert("frontLineGPV : " + frontLineGPV);
            for (var k = 1; k <= 4; k++) {
                //get bv value
                var downlineGPV = this.view["lblABO" + j + "" + k + "GPVValue"]["text"].split(": ");
                if (downlineGPV[1] >= 10000) {
                    frontLineGPV = 0;
                    break;
                }
            }
            gpvValue = gpvValue + parseInt(frontLineGPV);
        }

        gpvValue = gpvValue + parseInt(ppvValue);

        return gpvValue;

    },

    //Function to check for silver producer
    isQualifiedSilverProducer: function(gpv1, aboColumn, aboRow) {

        //alert("aboColumn : " + aboColumn + " gpv1 : " + gpv1 + " aboRow : " + aboRow);

        if (gpv1 >= 10000) {
            return "ALL";
        } else if (gpv1 >= 4000 && gpv1 < 10000) {

            for (var k = aboRow + 1; k <= 4; k++) {
                //downline gpv
                var gpvString = this.view["lbl" + aboColumn + "" + k + "GPVValue"]["text"].split(": ");
                if (gpvString[1] >= 10000) {
                    return "SOME";
                }
            }

        }

        return "NONE";
    },

    //Function to check silver sponser qualification for YOU(Main ABO)
    isQualifiedSilverSponser: function(aboColumn, aboRow) {

        for (var k = aboRow + 1; k <= 4; k++) {
            //downline gpv
            var gpvString = this.view["lbl" + aboColumn + "" + k + "GPVValue"]["text"].split(": ");
            if (gpvString[1] >= 10000) {
                return true;
            }
        }

        return false;
    },

    //Function to hide popup
    hidePopup: function() {
        //hide popup flex
        this.view.FlexContainerPopup.isVisible = false;
    },

    //Function to calculate commissions
    calculateAllCommissions: function() {

        var nextABOGPV = this.view["FlexABO10Values"]["isVisible"];

        if (nextABOGPV) {

            //Get PPV & Bonus Level of Main ABO
            var aboMainPPV = this.view["lblABO10PPVValue"]["text"].split(": ");
            var aboMainGPV = this.view["lblABO10GPVValue"]["text"].split(": ");
            var aboMainBonusLevel = this.view["lblABO10BVValue"]["text"].split(" ");

            /***** Enhanced Sales Commission *****/
            if (aboMainGPV[1] >= 20000)
                enhancedSales = this.calculateRubyBonus(parseInt(aboMainGPV[1]));
            /*************************************/


            /***** Group Development Commission *****/
            groupDevelopmentCommission = 0;
            var arrGDCQualifiedABOs = this.isGroupDevelopmentCommissionQualified();
            //alert("arrGDCQualifiedABOs : " + arrGDCQualifiedABOs);
            if (arrGDCQualifiedABOs.length > 0) {

                groupDevelopmentCommission = this.calculateGroupDevelopmentCommissionValue(arrGDCQualifiedABOs);

                /*
                for(var j = 0; j < arrGDCQualifiedABOs.length; j++){
                	var frontlineABOGPV = this.view[arrGDCQualifiedABOs[j]]["text"].split(": ");
                	//alert("frontlineABOGPV : "+ frontlineABOGPV);
                	groupDevelopmentCommission = groupDevelopmentCommission + calculateMonthlyBonus(parseInt(frontlineABOGPV[1]));
                }
                */
            }


            //alert("groupDevelopmentCommission : " + groupDevelopmentCommission);
            /**************************/



            /***** Leadership Enhancement Commission *****/
            leadershipEnhancementCommission = 0;
            var aboMainGPV = this.view["lblABO10GPVValue"]["text"].split(": ");
            var isSliverProducer = this.isYOUQualifiedSilverProducer(aboMainGPV[1]);
            var isLECQualified = this.isLeadershipEnhancementCommissionQualified();
            if (isSliverProducer != "NONE" && isLECQualified > 0) {
                leadershipEnhancementCommission = this.calculateLeadershipEnhancementCommissionValue(isSliverProducer, aboMainGPV[1]);
                //alert("leadershipEnhancementCommission : " + leadershipEnhancementCommission);
            }
            /*********************************************/

            /***** TRADE DISCOUNT *****/
            tradeDiscount = this.calculateTradeDiscount(parseInt(aboMainPPV[1]));
            /**************************/


            //total of all commissions
            totalCommissions = performanceCommission + enhancedSales + groupDevelopmentCommission + tradeDiscount + leadershipEnhancementCommission;



            //Show next form
            //ppv of main ABO
            aboMainBonusLevel = [];
            aboMainBonusLevel = this.view.lblABO10BVValue.text.split(" ");
            var ntf;
            var setImageCommission = this.setImageName(performanceCommission);
            var setImageLeaderShip = this.setImageName(leadershipEnhancementCommission);
            var setImageEnhancedSales = this.setImageName(enhancedSales);
            var setImageGroupDevelopment = this.setImageName(groupDevelopmentCommission);
            var setImageRetailMargin = this.setImageName(0);
            var setImageTradeDiscount = this.setImageName(tradeDiscount);

            var data = [
                [{
                        "lblHeaderCommission": "Commissions",
                        "lblHeaderAmount": "Amt.(Rs.)"
                    },
                    [{
                            "imgCheckmark": setImageCommission,
                            "lblBonus": "Total Sales Commission",
                            "lblAmount": performanceCommission
                        },
                        {
                            "imgCheckmark": setImageLeaderShip,
                            "lblBonus": "Leadership Development",
                            "lblAmount": leadershipEnhancementCommission
                        },
                        {
                            "imgCheckmark": setImageEnhancedSales,
                            "lblBonus": "Enhanced Sales",
                            "lblAmount": enhancedSales
                        },
                        {
                            "imgCheckmark": setImageGroupDevelopment,
                            "lblBonus": "Group Development",
                            "lblAmount": groupDevelopmentCommission
                        },
                        {
                            "imgCheckmark": setImageRetailMargin,
                            "lblBonus": "Retail Margin",
                            "lblAmount": "Difference of Selling & Purchasing Price, Not paid by Amway"
                        },
                        {
                            "imgCheckmark": setImageTradeDiscount,
                            "lblBonus": "Trade Discount",
                            "lblAmount": tradeDiscount
                        },
                        {
                            "imgCheckmark": "img_transparant.png",
                            "lblBonus": "Total",
                            "lblAmount": totalCommissions
                        }
                    ]
                ]
            ];
            if (aboMainBonusLevel[2] <= 0) {
                //frmBonusEarnings.show();

                ntf = new kony.mvc.Navigation("bonusEarning");
                ntf.navigate({
                    "segmentData": data
                });
            } else {
                ntf = new kony.mvc.Navigation("commissionAchieved");
                ntf.navigate({
                    "bonusLevel": aboMainBonusLevel[2],
                    "segmentData": data
                });

            }
        }
    },


    setImageName: function(value) {
        if (value > 0) {
            return "icon_tick.png";
        } else {
            return "icon_cross1.png";
        }
    },

    //Function to calculate personal, sales & performance commissions
    calculatePersonal_SalesCommissions: function() {

        //show simulate button
        this.view.btnNext.isVisible = true;




        /***** PersonalCommission *****/
        //Get PPV & Bonus Level of Main ABO
        var aboMainPPV = this.view["lblABO10PPVValue"]["text"].split(": ");
        var aboMainGPV = this.view["lblABO10GPVValue"]["text"].split(": ");
        var aboMainBonusLevel = this.view["lblABO10BVValue"]["text"].split(" ");

        //Calculate Personal Commission for Main ABO
        personalCommission = this.calculatePersonalBonus(parseInt(aboMainPPV[1]), parseInt(aboMainBonusLevel[2]));
        //alert("personalCommission : " + personalCommission);
        this.view.lblPersonalCommissionValue.text = personalCommission;
        /******************************/


        /***** Sales Commission *****/
        //Calculate Sales Commission for Main ABO
        salesCommission = 0;
        for (var i = 1; i <= 4; i++) {

            //Get GPV of frontline ABO
            var frontlineABOBV = this.view["lblABO" + i + "1BVValue"]["text"].split(" ");
            var frontlineABOGPV = this.view["lblABO" + i + "1GPVValue"]["text"].split(": ");

            //calculate sales commission for each frontline ABO
            salesCommission = salesCommission + this.calculateDifferentialBonus(parseInt(frontlineABOGPV[1]), parseInt(frontlineABOBV[2]), parseInt(aboMainBonusLevel[2]));
        }
        this.view.lblSalesCommissionValue.text = salesCommission;
        /****************************/


        /***** Performance Commission *****/
        //Total performance commission
        performanceCommission = personalCommission + salesCommission;
        this.view.lblTotalCommissionValue.text = performanceCommission;
        /**********************************/
    },

    // Function to calculate PERSONAL Commission
    // Bonus % is Bonus Level
    // PERSONAL BONUS = PPV * 80 * BONUS %
    calculatePersonalBonus: function(ppv, bonusLevel) {

        var personalBonus = ppv * 80 * (bonusLevel / 100);
        personalBonus = this.convertIntoPositiveNumber(personalBonus);
        return personalBonus;
    },

    // Function to calculate DIFFERENTIAL BONUS (Sales Commission)
    // DIFFERENTIAL BONUS = FRONTLINE GPV * 80 * ( YOU BONUS % - FRONTLINE BONUS % )			
    calculateDifferentialBonus: function(ForntlineGPV, FrontlineBonus, YourBonus) {

        //calculate value
        var differentialBonus = ForntlineGPV * 80 * ((YourBonus - FrontlineBonus) / 100);
        differentialBonus = this.convertIntoPositiveNumber(differentialBonus);

        return differentialBonus;

    },


    // Function to calculate RUBY BONUS (Enhanced Sales Commission)
    // Applicable if GPV is 20,000
    // RUBY BONUS = 2 % * 80 * PPV
    calculateRubyBonus: function(gpv) {

        var rubyBonus = (2 / 100) * 80 * gpv;
        rubyBonus = this.convertIntoPositiveNumber(rubyBonus);
        return rubyBonus;
    },



    // // Function to calculate LEADERSHIP BONUS (Leadership Enhancement Commission)
    // // LEADERSHIP BONUS = 4 % * 80 * GPV of ABO's			
    calculateLeadershipBonus: function(gpv) {

        var leadershipBonus = (6 / 100) * 80 * gpv;
        leadershipBonus = this.convertIntoPositiveNumber(leadershipBonus);
        return leadershipBonus;

    },


    //Function to calculate TRADE DISCOUNT
    //TRADE DISCOUNT = ( (ppv * 80) * 1.14 ) * 7.8 %;			
    calculateTradeDiscount: function(ppv) {

        var tradeDiscount = (ppv * 80) * (10 / 100);
        tradeDiscount = Math.round(tradeDiscount);
        return tradeDiscount;

    },

    //Function to convert value into positive number
    convertIntoPositiveNumber: function(value) {

        var positiveNumber;
        positiveNumber = Math.round(value);
        positiveNumber = Math.abs(positiveNumber);

        return positiveNumber;
    },


    // Function to check the group development commission qualification
    isGroupDevelopmentCommissionQualified: function() {
        var arrQualifiedABOs = [];
        var arrSilverProducerGroup = [];

        for (var i = 1; i <= 4; i++) {
            var aboBonusLevelFrontlineABO = this.view["lblABO" + i + "1BVValue"]["text"].split(" ");
            if (aboBonusLevelFrontlineABO[2] == "21") {
                //alert("aboBonusLevelFrontlineABO : "+aboBonusLevelFrontlineABO[2]);
                arrSilverProducerGroup.push("lblABO" + i);
                for (var j = 2; j <= 4; j++) {
                    //get bv value
                    var aboBonusLevel = this.view["lblABO" + i + "" + j + "BVValue"]["text"].split(" ");
                    //			alert("aboBonusLevel : "+aboBonusLevel[2]);
                    if (aboBonusLevel[2] == "21") {
                        arrQualifiedABOs.push(i);
                        break;
                    }
                }
            }
        }

        if (arrSilverProducerGroup.length > 2 && arrQualifiedABOs.length > 0)
            return arrQualifiedABOs;

        return 0;
    },



    //Function to calculate group development commission
    calculateGroupDevelopmentCommissionValue: function(arrGDCABOs) {
        var arrABOS = arrGDCABOs;
        var groupDevelopmentCommission = 0;

        //alert("arrABOS : " + arrABOS);

        for (var i = 0; i < arrABOS.length; i++) {

            var aboColumn = arrABOS[i];

            //check if any 10000 ABO present in los
            var bonusLevel = this.view["lblABO" + aboColumn + "1BVValue"].text.split(" ");

            if (bonusLevel[2] == "21") {

                var groupDevelopmentCommissionForOneLOS = 0;

                for (var j = 4; j >= 1; j--) {

                    //get bv & gp value
                    var aboGPV = this.view["lblABO" + aboColumn + "" + j + "GPVValue"].text.split(": ");
                    var aboBonusLevel = this.view["lblABO" + aboColumn + "" + j + "BVValue"].text.split(" ");

                    if (aboBonusLevel[2] == "21") {

                        var groupDevelopmentCommissionGeneratedByOneABO = this.calculateMonthlyBonus(parseInt(aboGPV[1]));

                        if (j == 1) {

                            if (aboGPV[1] < 10000) {
                                var shortfall = 8000 - groupDevelopmentCommissionGeneratedByOneABO;
                                groupDevelopmentCommissionForOneLOS = groupDevelopmentCommissionForOneLOS - shortfall;
                                groupDevelopmentCommissionForOneLOS = Math.abs(groupDevelopmentCommissionForOneLOS);
                            }

                        } else {
                            //add commission of each abo's
                            groupDevelopmentCommissionForOneLOS = groupDevelopmentCommissionForOneLOS + groupDevelopmentCommissionGeneratedByOneABO;
                        }

                    }

                }

                groupDevelopmentCommission = groupDevelopmentCommission + groupDevelopmentCommissionForOneLOS;
            }

        }

        return groupDevelopmentCommission;

    },


    // Function to calculate MONTHLY BONUS (GROUP DEVELOPMENT BONUS)
    // 1 % OF ABO 4's GPV
    // MONTHLY BONUS = 1 % * 80 * (GPV of ABO 4)			
    calculateMonthlyBonus: function(gpv) {

        var monthlyBonus = (1 / 100) * 80 * gpv;
        monthlyBonus = this.convertIntoPositiveNumber(monthlyBonus);
        return monthlyBonus;

    },

    //Function to check the group development commission qualification
    isLeadershipEnhancementCommissionQualified: function() {
        var arrSilverProducerGroup = [];

        for (var i = 1; i <= 4; i++) {
            var aboBonusLevelFrontlineABO = this.view["lblABO" + i + "1BVValue"].text.split(" ");
            if (aboBonusLevelFrontlineABO[2] == "21") {
                //alert("aboBonusLevelFrontlineABO : "+aboBonusLevelFrontlineABO[2]);
                arrSilverProducerGroup.push("lblABO" + i);
            }
        }


        if (arrSilverProducerGroup.length > 0)
            return 1;

        return 0;
    },

    //  Function to calculate leadership enhancement commission
    calculateLeadershipEnhancementCommissionValue: function(eligibilityForLB, GPVOfYOU) {

        var LOSLeadershipCommission = this.calculateLECForEachLOS();
        //alert("LOSLeadershipCommission : " + LOSLeadershipCommission);
        if (eligibilityForLB == "ALL") {

            if (LOSLeadershipCommission == 0) {
                //There is no downline of you on 10000 GPV so he will get LEC his GPV * 76 * 4%
                return this.calculateLeadershipBonus(parseInt(GPVOfYOU));
            } else {
                //YOU will get all of the generated LEC
                return LOSLeadershipCommission;
            }

        } else {

            //YOU will get some of generated LEC
            var shortfall = 48000 - this.calculateLeadershipBonus(parseInt(GPVOfYOU));
            var hisLEC = LOSLeadershipCommission - shortfall;

            return hisLEC;
        }

    },

    //   // Function to calculate Leadership commission for each LOS
    calculateLECForEachLOS: function() {

        var leadershipCommission = 0;

        for (var i = 1; i <= 4; i++) {

            //check if any 10000 ABO present in los
            var bonusLevel = this.view["lblABO" + i + "1BVValue"].text.split(" ");
            if (bonusLevel[2] == "21") {

                var leadershipCommissionForOneLOS = 0;

                for (var j = 4; j >= 1; j--) {

                    //get bv & gp value
                    var aboGPV = this.view["lblABO" + i + "" + j + "GPVValue"].text.split(": ");
                    var aboBonusLevel = this.view["lblABO" + i + "" + j + "BVValue"].text.split(" ");

                    if (aboBonusLevel[2] == "21") {
                        var isSilverProducer = this.isQualifiedSilverProducer(aboGPV[1], "ABO" + i, j);

                        var leadershipGeneratedByOneABO = this.calculateLeadershipBonus(parseInt(aboGPV[1]));
                        //alert("leadershipGeneratedByOneABO : " + leadershipGeneratedByOneABO);

                        if (isSilverProducer == "ALL") {
                            leadershipCommissionForOneLOS = leadershipGeneratedByOneABO;
                        } else if (isSilverProducer == "SOME") {

                            var shortfall = 48000 - leadershipGeneratedByOneABO;
                            var ABOsLEC = leadershipCommissionForOneLOS - shortfall;
                            leadershipCommissionForOneLOS = 48000;

                        } else {

                            leadershipCommissionForOneLOS = leadershipCommissionForOneLOS + leadershipGeneratedByOneABO;
                        }

                    }

                }

                leadershipCommission = leadershipCommission + leadershipCommissionForOneLOS;
            }

        }

        return leadershipCommission;
    },



    //   //Remove existing value from array
    //  removeFromArray:function(arr, selectedAbo) {
    //       for(var i = arr.length; i--;) {
    //           if(arr[i] === selectedAbo) {
    //               arr.splice(i, 1);
    //           }
    //       }
    // }


    // //Remove existing silver producer values from array
    // removeSilverProducerFromArray:function(aboColumn, aboRowNumber, selectedABOID){

    // 	var gpvString = this.view["lbl"+aboColumn+""+i+"GPVValue"]["text"];

    // 	this.removeFromArray(arrSilverProducer, selectedABOID);

    // },


    //   //check for silver producer in downline
    // isFoundSilverProducer:function(arr,selectedAbo){
    // 	for(var i = arr.length; i--;) {
    // 	var aboColumnInArray = arr[i].slice(0,4);
    // 	var selectedABOColumn = selectedAbo.slice(0,4);
    //           if(aboColumnInArray === selectedABOColumn) {
    //               return true;
    //           }
    //       }
    //       return false;
    // },




    /*********************/
    /** POPUP ANIMATION **/
    /*********************/

    //Function to configure animation
    animConfig: function() {
        var config = {
            "duration": 0.6,
            "iterationCount": 1,
            "delay": 0,
            "fillMode": kony.anim.FILL_MODE_FORWARDS
        };
        return config;
    },

    //Function to create animation object
    animDeftranslateForFlex: function() {

        var transformProp1 = kony.ui.makeAffineTransform();
        transformProp1.scale(0, 0);

        var transformProp2 = kony.ui.makeAffineTransform();
        transformProp2.scale(1, 1);


        var animDefinitionOne = {
            0: {
                "transform": transformProp1
            },
            100: {
                "transform": transformProp2
            }
        }

        animDef = kony.ui.createAnimation(animDefinitionOne);
        return animDef;

    },

    //Function to create animation object
    animDeftranslate: function() {

        var transformProp0 = kony.ui.makeAffineTransform();
        transformProp0.scale(0, 0);

        var transformProp1 = kony.ui.makeAffineTransform();
        transformProp1.scale(1.4, 1.4);

        var transformProp2 = kony.ui.makeAffineTransform();
        transformProp2.scale(1, 1);

        var animDefinitionOne = {
            0: {
                "transform": transformProp0
            },
            50: {
                "transform": transformProp1
            },
            100: {
                "transform": transformProp2
            }
        }

        animDef = kony.ui.createAnimation(animDefinitionOne);
        return animDef;

    },


    //Animation Success Call back
    animationCallBack: function() {
        boolToCheckMethodCall = false;
    },




});