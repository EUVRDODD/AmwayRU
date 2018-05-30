define(function () {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

      var title;
      sideDrawerReference = this;
      this.currentlySelected = 0;
      pageComponents = [];
      this.view.flexInvisibleTouchArea.onClick = this.closeSideDrawer;
      this.view.flexCloseButtonContainer.onClick = this.closeSideDrawer;
      //       this.view.AccordionButton1.onClick = this.AccordionButton1.bind( this );
      //       this.view.AccordionButton2.onClick = this.AccordionButton2.bind( this );
      //       this.view.AccordionButton3.onClick = this.AccordionButton3.bind( this );
      this.view.AccordionButton4.onClick = this.AccordionButton4.bind( this );
      //this.view.AccordionButton5.onClick = this.AccordionButton5.bind( this );
      this.view.AccordionButton6.onClick = this.AccordionButton6.bind( this );
      this.view.AccordionButton7.onClick = this.AccordionButton7.bind( this );
      this.view.AccordionButton8.onClick = this.AccordionButton8.bind( this );

      this.view.btnGIPSimulator.onClick=this.goToGIPSimulator.bind(this);
      this.view.linkContactUs.onClick = this.goToContactUs.bind( this );
      this.view.linkStoreLocator.onClick = this.goToStoreLocator.bind( this );
      //       this.view.linkFAQ.onClick = this.goToFAQ.bind( this );
      this.view.btnNutrilite.onClick=this.goToNutrilite.bind(this);
      this.view.btnIncomeSimulator.onClick=this.goToIncomeSimulator.bind(this);
      this.view.btnSkinRecommender.onClick=this.openSkinRecommender.bind(this);

      this.view.btnProductCon.onClick=this.openProductConsulting.bind(this);
      this.view.btnMyBiz.onClick=this.openMyBiz.bind(this);
      this.view.flxShopOnlineSideDrawer.onTouchStart =this.openShopOnline.bind(this);
      this.view.flxLogout.onClick = this.logout;
      this.view.btnLogoutYes.onClick = this.goToLogoutYes;
      this.view.btnLogoutNo.onClick = this.goToLogoutNo;
      this.view.flxClosePopup.onTouchStart = function(){kony.print("flx close pop clicked")};
      // Browse Business Categories
      this.view.flxBBusinessAccord1.onClick = this.goToBBusinessAccord1.bind(this);
      this.view.flxBBusinessAccord2.onClick = this.goToBBusinessAccord2.bind(this);
      this.view.flxBBusinessAccord3.onClick = this.goToBBusinessAccord3.bind(this);
      this.view.flxBBusinessAccord4.onClick = this.goToBBusinessAccord4.bind(this);
      this.view.flxBBusinessAccord5.onClick = this.goToBBusinessAccord5.bind(this);
      this.view.flxBBusinessAccord6.onClick = this.goToBBusinessAccord6.bind(this);
      this.view.flxHeritage.onClick=this.goToflxHeritage.bind(this);
      this.view.flxFact.onClick=this.goToflxFact.bind(this);
      this.view.flxManufacturing.onClick=this.goToflxManufacturing.bind(this);
      this.view.flxAwards.onClick=this.goToflxAwards.bind(this);
      this.view.flxCorporate.onClick=this.goToflxCorporate.bind(this);
      this.view.flxMedia.onClick=this.goToflxMedia.bind(this);      
      this.view.flxCatalogue.onClick=this.openProductConsulting.bind(this);
      this.view.flxOpportunity.onClick=this.goToflxOpportunity.bind(this);
      this.view.flxRecognition.onClick=this.goToflxRecognition.bind(this);
      this.view.flxBrochures.onClick=this.goToflxBrochures.bind(this);
      this.view.flxSeminars.onClick=this.goToflxSeminars.bind(this);
      this.view.flxLearning.onClick=this.goToflxLearning.bind(this);
    }, 


    toolsCliked:function(widget){
      var index=widget.id[(widget.id.length)-1];   
      var flx=(widget.id).split("Outer")[0];
      var cat=this.view["lbl"+flx.replace("flx","")].text;

      if(this.view[flx+"OuterSub"+index].height!="0dp"){
        animate(this.view[flx+"OuterSub"+index],{"height": "0dp"});
        //this.view[flx+"OuterSub"+index].height="0dp";
        this.view[flx+"Active"+index].isVisible=false;
        this.view[flx+"Container"].height= (41*Hresponse[cat.toLowerCase()].length)+2+ "dp";
      }else{
        animate(this.view[flx+"OuterSub"+index],{"height": (41*Hresponse[cat.toLowerCase()][index]["subCategories"].length)+"dp"});
        //this.view[flx+"OuterSub"+index].height= (41*Hresponse[cat.toLowerCase()][index]["subCategories"].length)+"dp";
        this.view[flx+"Active"+index].isVisible=true;
        this.view[flx+"Container"].height=( 41*Hresponse[cat.toLowerCase()].length + 2+  41*Hresponse[cat.toLowerCase()][index]["subCategories"].length) +"dp"; 
      }
      
      for(var i=0;i<Hresponse[cat.toLowerCase()].length;i++){
        if(i!=index){
          animate(this.view[flx+"OuterSub"+i],{"height": "0dp"});
          // this.view[flx+"OuterSub"+i].height="0dp";
          this.view[flx+"Active"+i].isVisible=false;
        }
      }

    },

    filterCategory:function(widget){
      var id = (widget.id).replace("Outer","");
      var label= id.replace("flx","lbl")+"temp";
      var category = this.view[label].text;
      callTealiumOnClick("click_action",category,[id],gblVisitor_imcID);   
      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,category,additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }
      var categoryName= category.split('_').join(" ");
      gblFilterCategoryName = categoryName;
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.filterCategory(categoryName.toLowerCase());
      }else{
        sideDrawerCategory(categoryName.toLowerCase());
      }
      this.collapseAll();
    },

    hamBurgerClicked:function(widget){

      var id = (widget.id).replace("Outer","");
      var label= id.replace("flx","lbl")+"temp";

      switch(this.view[""+label].text){
        case "income-simulator":
          this.goToIncomeSimulator();
          break;
        case "gip-simulator":
          this.goToGIPSimulator();
          break;
        case "artistry":
          this.openSkinRecommender();
          break;
        case "nutrilite":
          this.goToNutrilite();
          break;          
        case "shop-online":
          this.openShopOnline();
          break;
        case "catalogue":
          this.openProductConsulting();
          break;
        case "contact-us":
          this.goToContactUs();
          break;
        case "store-locator":
          this.goToStoreLocator();
          break;
        case "logout":
          this.logout();
          break;
      }
      this.collapseAll();
    },

    collapseAll:function(){
      
      for(var cat in Hresponse){
        var catT =cat.split(' ').join('');
        for(var j=0;j<Hresponse[cat].length;j++){
          this.view["flx"+catT+"OuterSub"+j].height="0dp";
          this.view["flx"+catT+"Active"+j].isVisible=false;
          this.view["flx"+catT+"Container"].height = (41*Hresponse[cat.toLowerCase()].length)+2+"dp";
        }
      }
    },

    createSideDrawer:function(){
      //this.view.flxDynamic.removeAll();
      gblFirstCat=true;
      for(var cat in Hresponse){
        sideDrawerReference.createCategories(cat);
      }
      //       this.createShopping();
      //       this.createAboutUs();
      //       this.createOurProducts();
      //       this.createAmwayBusiness();
      //       this.createTools();
      //       this.createHelp();
    },

    createCategories:function(cat1){
      try{
        var catTemp=cat1;
        cat =cat1.split(' ').join('');
        var top_="40dp";
        if(gblFirstCat){
          top_="0dp";
          gblFirstCat=false;
        }
        var flxTools = new kony.ui.FlexContainer({
          "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
          "clipBounds": true,
          "height": "30dp",
          "id": "flx"+cat,
          "isVisible": true,
          "layoutType": kony.flex.FREE_FORM,
          "left": "0dp",
          //"skin": "sknFlxMenus",
          "top": top_,  
          "width": "100%",
          "zIndex": 1
        }, {}, {}); 
        var lblTools = new kony.ui.Label({
          "centerY":"50%",
          "height": kony.flex.USE_PREFERED_SIZE,
          "width":kony.flex.USE_PREFERED_SIZE,
          "id": "lbl"+cat,
          "isVisible": true,
          "left": "20dp",      
          "skin": "CopysideMenuHeader2",
          "text": catTemp.toUpperCase(),
          "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
          },
          "top": "0dp",
          "zIndex": 1
        },
                                         {
          "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
          "padding": [0, 0, 0, 0],
          "paddingInPixel": false
        }, {
          "textCopyable": false
        });   
        flxTools.add(lblTools);
        this.view.flxDynamic.add(flxTools);


        var flxToolsContainer = new kony.ui.FlexContainer({
          "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
          "clipBounds": true,
          "height": kony.flex.USE_PREFERED_SIZE,
          "id": "flx"+cat+"Container",
          "isVisible": true,
          "layoutType": kony.flex.FLOW_VERTICAL,
          "left": "0dp",
          //"skin": "sknFlxMenus",
          "top": "0dp",   
          "width": "100%",
          "zIndex": 1
        }, {}, {});
        flxToolsContainer.setDefaultUnit(kony.flex.DP);




        var flxDivider = new kony.ui.FlexContainer({
          "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
          "clipBounds": true,
          "height":"1dp",
          "id": "flxDivider",
          "isVisible": true,
          "layoutType": kony.flex.FLOW_VERTICAL,
          "left": "0dp",
          "skin": "CopyborderBBBBBB2",
          "top": "0dp",  
          "width": "100%",
          "zIndex": 1
        },{},{});			
        flxDivider.setDefaultUnit(kony.flex.DP);     
        flxToolsContainer.add(flxDivider);    

        if(Hresponse[catTemp] !== null && Hresponse[catTemp] !== undefined){
          for(var i=0; i<Hresponse[catTemp].length; i++) {

            flxDivider = new kony.ui.FlexContainer({
              "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
              "clipBounds": true,
              "height":"1dp",
              "id": "flxDivider"+i,
              "isVisible": true,
              "layoutType": kony.flex.FLOW_VERTICAL,
              "left": "0dp",
              "skin": "CopyborderBBBBBB2",
              "top": "0dp",  
              "width": "100%",
              "zIndex": 1
            },{},{});
            flxDivider.setDefaultUnit(kony.flex.DP);
            var flxToolsOuter= new kony.ui.FlexContainer({
              "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
              "clipBounds": true,
              "height":"40dp",
              "id": "flx"+cat+"Outer"+i,
              "isVisible": true,
              "left": "0dp",
              "top": "0dp",   
              "width": "100%",
              "zIndex": 1
            },{},{});
            flxToolsOuter.setDefaultUnit(kony.flex.DP);

            if(Hresponse[catTemp][i].hasOwnProperty("subCategories") && Hresponse[catTemp][i]["subCategories"]!==null){
              flxToolsOuter.onClick = this.toolsCliked;
            }
            else if(Hresponse[catTemp][i].hasOwnProperty("isDirectLink")){

              flxToolsOuter.onClick = this.hamBurgerClicked;
            }
            else{
              flxToolsOuter.onClick = this.filterCategory;
            }

            //active tab
            var flxToolsActive = new kony.ui.FlexContainer({
              "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
              "clipBounds": true,
              "height":"40dp",
              "id": "flx"+cat+"Active"+i,
              "isVisible": false,
              "left": "0dp",
              "top": "0dp",   
              "width": "100%",
              "zIndex": 1
            },{},{});          
            flxToolsActive.setDefaultUnit(kony.flex.DP);
            var flxImgActive = new kony.ui.FlexContainer({
              "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
              "clipBounds": true,
              "height":"40dp",
              "id": "flxImg"+cat+"Active"+i,
              "isVisible": true,
              "left": "5dp",
              "top": "0dp",   
              "width": "40dp",
              "zIndex": 1
            },{},{});
            flxImgActive.setDefaultUnit(kony.flex.DP);
            var temp = Hresponse[catTemp][i].catImageMobile.split('.png');
            var imgIconActive = new kony.ui.Image2({
              "centerY": "50%",
              "centerX":"50%",
              "height": "50dp",
              "width": "50dp",    
              "id": "imgIcon"+cat+"Active"+i,
              "isVisible": true,
              //"left": "16dp",
              //"skin": "sknImg",
              "src": temp[0]+"_active.png",
              //"imageWhenFailed": "download_error.png",
              // "imageWhileDownloading": "download_error.png",
              "zIndex": 1,
              //"onTouchStart":show
            },
                                                   {
              "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
              "padding": [0, 0, 0, 0],
              "paddingInPixel": false
            }, {});
            var flxlblActive = new kony.ui.FlexContainer({
              "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
              "clipBounds": true,
              "height":"100%",
              "id": "flxlbl"+cat+"Active"+i,
              "isVisible": true,
              "left": "45dp",
              "top": "0dp",   
              "width": "100%",
              "zIndex": 1,

            },{},{});
            flxlblActive.setDefaultUnit(kony.flex.DP);
            var lblTextActive = new kony.ui.Label({
              "centerY":"50%",
              "height": kony.flex.USE_PREFERED_SIZE,
              "width":kony.flex.USE_PREFERED_SIZE,
              "id": "lbl"+cat+"Active"+i,
              "isVisible": true,
              "left": "0dp",      
              //"skin": "CopyAccordionInactive2",
              "skin":"CopyCopyslLabel01af4fe8f96074e",
              "text": (Hresponse[catTemp][i].categoryTitle).toUpperCase(),
              "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
              },
              "top": "0dp",
              "zIndex": 1
            },
                                                  {
              "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
              "padding": [0, 0, 0, 0],
              "paddingInPixel": false
            }, {
              "textCopyable": false
            });
            var imgIconArrowUp = new kony.ui.Image2({
              "centerY": "50%",
              //"centerX":"50%",
              "height": "50dp",
              "width": "50dp",    
              "id": "imgIcon"+cat+"ArrowUp"+i,
              "isVisible": true,
              //"left": "16dp",
              //"skin": "sknImg",
              "right":"0dp",
              "src": "icon_chevron_up.png",
              //"imageWhenFailed": "download_error.png",
              // "imageWhileDownloading": "download_error.png",
              "zIndex": 1,
              //"onTouchStart":show
            },
                                                    {
              "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
              "padding": [0, 0, 0, 0],
              "paddingInPixel": false
            }, {});       


            flxlblActive.add(lblTextActive);
            flxImgActive.add(imgIconActive);
            flxToolsActive.add(flxImgActive,flxlblActive,imgIconArrowUp);


            //inactive tab
            var flxTools = new kony.ui.FlexContainer({
              "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
              "clipBounds": true,
              "height":"40dp",
              "id": "flx"+cat+i,
              "isVisible": true,
              "left": "0dp",
              "top": "0dp",   
              "width": "100%",
              "zIndex": 1
            },{},{});
            flxTools.setDefaultUnit(kony.flex.DP);
            var flxImg = new kony.ui.FlexContainer({
              "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
              "clipBounds": true,
              "height":"40dp",
              "id": "flxImg"+cat+i,
              "isVisible": true,
              "left": "5dp",
              "top": "0dp",   
              "width": "40dp",
              "zIndex": 1
            },{},{});
            flxImg.setDefaultUnit(kony.flex.DP);

            var imgIcon = new kony.ui.Image2({
              "centerY": "50%",
              "centerX":"50%",
              "height": "18dp",
              "width": "18dp",    
              "id": "imgIcon"+cat+i,
              "isVisible": true,
              //"left": "16dp",
              //"skin": "sknImg",
              "src": Hresponse[catTemp][i].catImageMobile,
              //"imageWhenFailed": "download_error.png",
              // "imageWhileDownloading": "download_error.png",
              "zIndex": 1,
              //"onTouchStart":show
            },
                                             {
              "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
              "padding": [0, 0, 0, 0],
              "paddingInPixel": false
            }, {});
            var flxlbl = new kony.ui.FlexContainer({
              "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
              "clipBounds": true,
              "height":"100%",
              "id": "flxlbl"+cat+i,
              "isVisible": true,
              "left": "45dp",
              "top": "0dp",   
              "width": "100%",
              "zIndex": 1,

            },{},{});
            flxlbl.setDefaultUnit(kony.flex.DP);
            var lblText = new kony.ui.Label({
              "centerY":"50%",
              "height": kony.flex.USE_PREFERED_SIZE,
              "width":kony.flex.USE_PREFERED_SIZE,
              "id": "lbl"+cat+i,
              "isVisible": true,
              "left": "0dp",      
              "skin": "CopyAccordionInactive2",
              //"skin":"CopyCopyslLabel01af4fe8f96074e",
              "text": (Hresponse[catTemp][i].categoryTitle).toUpperCase(),
              "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
              },
              "top": "0dp",
              "zIndex": 1
            },
                                            {
              "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
              "padding": [0, 0, 0, 0],
              "paddingInPixel": false
            }, {
              "textCopyable": false
            });

            var lblTextTemp = new kony.ui.Label({
              "centerY":"50%",
              "height": kony.flex.USE_PREFERED_SIZE,
              "width":kony.flex.USE_PREFERED_SIZE,
              "id": "lbl"+cat+i+"temp",
              "isVisible": false,
              "left": "0dp",      
              "skin": "CopyAccordionInactive2",
              //"skin":"CopyCopyslLabel01af4fe8f96074e",
              "text": (Hresponse[catTemp][i].catShortTitle),
              "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
              },
              "top": "0dp",
              "zIndex": 1
            },
                                                {
              "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
              "padding": [0, 0, 0, 0],
              "paddingInPixel": false
            }, {
              "textCopyable": false
            });

            var imgIconArrowDown = new kony.ui.Image2({
              "centerY": "50%",
              //"centerX":"50%",
              "height": "50dp",
              "width": "50dp",    
              "id": "imgIcon"+cat+"ArrowDown"+i,
              "isVisible": true,
              "right":"0dp",
              "src": "icon_chevron_down.png",
              "zIndex": 1,
            },
                                                      {
              "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
              "padding": [0, 0, 0, 0],
              "paddingInPixel": false
            }, {});
            flxlbl.add(lblText,lblTextTemp);
            flxImg.add(imgIcon);

            if(Hresponse[catTemp][i].hasOwnProperty("subCategories") && Hresponse[catTemp][i]["subCategories"]!==null){
              flxTools.add(flxImg,flxlbl,imgIconArrowDown);
            }else{
              flxTools.add(flxImg,flxlbl);
            }
            flxToolsOuter.add(flxTools,flxToolsActive);

            var flxToolsOuterSub=new kony.ui.FlexContainer({
              "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
              "clipBounds": true,
              "height":"0dp",
              "id": "flx"+cat+"OuterSub"+i,
              "layoutType": kony.flex.FLOW_VERTICAL,
              "isVisible": false,
              "left": "0dp",
              "top": "0dp",   
              "width": "100%",
              "zIndex": 1
            },{},{});

            if(Hresponse[catTemp][i].hasOwnProperty("subCategories") && Hresponse[catTemp][i]["subCategories"]!==null )
            {

              // var Flxheight = 41*Hresponse[catTemp][i]["subCategories"].length;
              flxToolsOuterSub = new kony.ui.FlexContainer({
                "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
                "clipBounds": true,
                "height":"0dp",
                "id": "flx"+cat+"OuterSub"+i,
                "layoutType": kony.flex.FLOW_VERTICAL,
                "isVisible": true,
                "left": "0dp",
                "top": "0dp",   
                "width": "100%",
                "zIndex": 1
              },{},{});
              flxToolsOuterSub.setDefaultUnit(kony.flex.DP);



              for(var j=0;j<Hresponse[catTemp][i]["subCategories"].length;j++){
                var flxDividerSub = new kony.ui.FlexContainer({
                  "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
                  "clipBounds": true,
                  "height":"1dp",
                  "id": "flxDividerSub"+i+""+j,
                  "isVisible": true,
                  "layoutType": kony.flex.FLOW_VERTICAL,
                  "left": "0dp",
                  "skin": "CopyborderBBBBBB2",
                  "top": "0dp",  
                  "width": "100%",
                  "zIndex": 1
                },{},{});
                flxDividerSub.setDefaultUnit(kony.flex.DP);

                flxToolsSub = new kony.ui.FlexContainer({
                  "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
                  "clipBounds": true,
                  "height":"40dp",
                  "id": "flx"+cat+"Sub"+i+""+j,
                  "isVisible": true,
                  "left": "0dp",
                  "top": "0dp",   
                  "width": "100%",
                  "zIndex": 1
                },{},{});
                flxToolsSub.setDefaultUnit(kony.flex.DP);
                flxToolsSub.onClick = this.hamBurgerClicked;
                var lblToolsSub = new kony.ui.Label({
                  "centerY":"50%",
                  "height": kony.flex.USE_PREFERED_SIZE,
                  "width":kony.flex.USE_PREFERED_SIZE,
                  "id": "lbl"+cat+"Sub"+i+""+j,
                  "isVisible": true,
                  "left": "45dp",      
                  "skin":"CopyAcc2",
                  "text": (Hresponse[catTemp][i].subCategories[j].categoryTitle),
                  "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                  },
                  "top": "0dp",
                  "zIndex": 1,

                },
                                                    {
                  "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                  "padding": [0, 0, 0, 0],
                  "paddingInPixel": false
                }, {
                  "textCopyable": false
                });


                var lblToolsSubTemp = new kony.ui.Label({
                  "centerY":"50%",
                  "height": kony.flex.USE_PREFERED_SIZE,
                  "width":kony.flex.USE_PREFERED_SIZE,
                  "id": "lbl"+cat+"Sub"+i+""+j+"temp",
                  "isVisible": false,
                  "left": "45dp",      
                  "skin":"CopyAcc2",
                  "text": (Hresponse[catTemp][i].subCategories[j].catShortTitle),
                  "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                  },
                  "top": "0dp",
                  "zIndex": 1,

                },
                                                        {
                  "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                  "padding": [0, 0, 0, 0],
                  "paddingInPixel": false
                }, {
                  "textCopyable": false
                });


                flxToolsSub.add(lblToolsSub,lblToolsSubTemp);
                flxToolsOuterSub.add(flxToolsSub,flxDividerSub);
              }
            }


            flxToolsContainer.add(flxToolsOuter,flxDivider,flxToolsOuterSub);
          }
        }    
        this.view.flxDynamic.add(flxToolsContainer);

      }
      catch(e){
        kony.print("exception is  --"+ e );
      }
    },


    /*   
    createShopping:function(){

      var flxShop = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "height": "30dp",
        "id": "flxShop",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0dp",
        //"skin": "sknFlxMenus",
        "top": "0dp",   
        "width": "100%",
        "zIndex": 1
      }, {}, {}); 
      var lblShop = new kony.ui.Label({
        "centerY":"50%",
        "height": kony.flex.USE_PREFERED_SIZE,
        "width":kony.flex.USE_PREFERED_SIZE,
        "id": "lblShop",
        "isVisible": true,
        "left": "20dp",      
        "skin": "CopysideMenuHeader2",
        "text": "SHOPPING",
        "textStyle": {
          "letterSpacing": 0,
          "strikeThrough": false
        },
        "top": "0dp",
        "zIndex": 1
      },
                                      {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {
        "textCopyable": false
      });   
      flxShop.add(lblShop);
      this.view.flxDynamic.add(flxShop);


      var flxShopContainer = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "height": kony.flex.USE_PREFERED_SIZE,
        "id": "flxShopContainer",
        "isVisible": true,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "left": "0dp",
        //"skin": "sknFlxMenus",
        "top": "0dp",   
        "width": "100%",
        "zIndex": 1
      }, {}, {});
      flxShopContainer.setDefaultUnit(kony.flex.DP);
      var flxDivider = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "height":"1dp",
        "id": "flxDivider",
        "isVisible": true,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "left": "0dp",
        "skin": "CopyborderBBBBBB2",
        "top": "0dp",  
        "width": "100%",
        "zIndex": 1
      },{},{});			
      flxDivider.setDefaultUnit(kony.flex.DP);      
      flxShopContainer.add(flxDivider);     
      if(arrShop !== null && arrShop !== undefined){
        for(var i=0; i<arrShop["shop"].length; i++) {

          flxDivider = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"1dp",
            "id": "flxDivider"+i,
            "isVisible": true,
            "layoutType": kony.flex.FLOW_VERTICAL,
            "left": "0dp",
            "skin": "CopyborderBBBBBB2",
            "top": "0dp",  
            "width": "100%",
            "zIndex": 1
          },{},{});

          flxDivider.setDefaultUnit(kony.flex.DP);

          var flxShop = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"40dp",
            "id": "flxShop"+i,
            "isVisible": true,
            "left": "0dp",
            "top": "0dp",   
            "width": "100%",
            "zIndex": 1
          },{},{});
          flxShop.setDefaultUnit(kony.flex.DP);


          var flxImg = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"40dp",
            "id": "flxImg"+i,
            "isVisible": true,
            "left": "5dp",
            "top": "0dp",   
            "width": "40dp",
            "zIndex": 1
          },{},{});
          flxImg.setDefaultUnit(kony.flex.DP);

          var imgIcon = new kony.ui.Image2({
            "centerY": "50%",
            "centerX":"50%",
            "height": "18dp",
            "width": "18dp",    
            "id": "imgIcon"+i,
            "isVisible": true,
            //"left": "16dp",
            //"skin": "sknImg",
            "src": arrShop["shop"][i].catImageMobile,
            //"imageWhenFailed": "download_error.png",
            // "imageWhileDownloading": "download_error.png",
            "zIndex": 1,
            //"onTouchStart":show
          },
                                           {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
          }, {});


          var flxlbl = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"100%",
            "id": "flxlbl"+i,
            "isVisible": true,
            "left": "45dp",
            "top": "0dp",   
            "width": "100%",
            "zIndex": 1,
            "centerY":"50%",

          },{},{});
          flxlbl.setDefaultUnit(kony.flex.DP);

          var lblShop = new kony.ui.Label({
            "centerY":"50%",
            "height": kony.flex.USE_PREFERED_SIZE,
            "width":kony.flex.USE_PREFERED_SIZE,
            "id": "lblShop"+i,
            "isVisible": true,
            "left": "0dp",      
            "skin": "CopyAccordionInactive2",
            "text": (arrShop["shop"][i].categoryTitle).toUpperCase(),
            "textStyle": {
              "letterSpacing": 0,
              "strikeThrough": false
            },
            "top": "0dp",
            "zIndex": 1

          },
                                          {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
          }, {
            "textCopyable": false
          });


          var lblShopTemp = new kony.ui.Label({
            "centerY":"50%",
            "height": kony.flex.USE_PREFERED_SIZE,
            "width":kony.flex.USE_PREFERED_SIZE,
            "id": "lblShop"+i+"temp",
            "isVisible": false,
            "left": "0dp",      
            "skin": "CopyAccordionInactive2",
            "text": (arrShop["shop"][i].catShortTitle),
            "textStyle": {
              "letterSpacing": 0,
              "strikeThrough": false
            },
            "top": "0dp",
            "zIndex": 1

          },
                                          {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
          }, {
            "textCopyable": false
          });

          flxlbl.add(lblShop,lblShopTemp);
          flxImg.add(imgIcon);

          flxShop.add(flxImg,flxlbl);

          flxShop.onClick= this.hamBurgerClicked;
          flxShopContainer.add(flxShop,flxDivider);
        }
      }    
      this.view.flxDynamic.add(flxShopContainer);


    },

    createHelp:function(){

      var flxHelp = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "height": "30dp",
        "id": "flxHelp",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0dp",
        //"skin": "sknFlxMenus",
        "top": "40dp",   
        "width": "100%",
        "zIndex": 1
      }, {}, {}); 
      var lblHelp = new kony.ui.Label({
        "centerY":"50%",
        "height": kony.flex.USE_PREFERED_SIZE,
        "width":kony.flex.USE_PREFERED_SIZE,
        "id": "lblHelp",
        "isVisible": true,
        "left": "20dp",      
        "skin": "CopysideMenuHeader2",
        "text": "HELP",
        "textStyle": {
          "letterSpacing": 0,
          "strikeThrough": false
        },
        "top": "0dp",
        "zIndex": 1
      },
                                      {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {
        "textCopyable": false
      });   
      flxHelp.add(lblHelp);
      this.view.flxDynamic.add(flxHelp);


      var flxHelpContainer = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "height": kony.flex.USE_PREFERED_SIZE,
        "id": "flxHelpContainer",
        "isVisible": true,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "left": "0dp",
        //"skin": "sknFlxMenus",
        "top": "0dp",   
        "width": "100%",
        "zIndex": 1
      }, {}, {});
      flxHelpContainer.setDefaultUnit(kony.flex.DP);
      var flxDivider = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "height":"1dp",
        "id": "flxDivider",
        "isVisible": true,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "left": "0dp",
        "skin": "CopyborderBBBBBB2",
        "top": "0dp",  
        "width": "100%",
        "zIndex": 1
      },{},{});			
      flxDivider.setDefaultUnit(kony.flex.DP);      
      flxHelpContainer.add(flxDivider);     
      if(arrHelp !== null && arrHelp !== undefined){
        for(var i=0; i<arrHelp["help"].length; i++) {

          flxDivider = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"1dp",
            "id": "flxDivider"+i,
            "isVisible": true,
            "layoutType": kony.flex.FLOW_VERTICAL,
            "left": "0dp",
            "skin": "CopyborderBBBBBB2",
            "top": "0dp",  
            "width": "100%",
            "zIndex": 1
          },{},{});

          flxDivider.setDefaultUnit(kony.flex.DP);

          var flxHelp = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"40dp",
            "id": "flxHelp"+i,
            "isVisible": true,
            "left": "0dp",
            "top": "0dp",   
            "width": "100%",
            "zIndex": 1
          },{},{});
          flxHelp.setDefaultUnit(kony.flex.DP);


          var flxImg = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"40dp",
            "id": "flxImg"+i,
            "isVisible": true,
            "left": "5dp",
            "top": "0dp",   
            "width": "40dp",
            "zIndex": 1
          },{},{});
          flxImg.setDefaultUnit(kony.flex.DP);

          var imgIcon = new kony.ui.Image2({
            "centerY": "50%",
            "centerX":"50%",
            "height": "50dp",
            "width": "50dp",    
            "id": "imgIcon"+i,
            "isVisible": true,
            //"left": "16dp",
            //"skin": "sknImg",
            "src": arrHelp["help"][i].catImageMobile,
            //"imageWhenFailed": "download_error.png",
            // "imageWhileDownloading": "download_error.png",
            "zIndex": 1,
            //"onTouchStart":show
          },
                                           {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
          }, {});


          var flxlbl = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"100%",
            "id": "flxlbl"+i,
            "isVisible": true,
            "left": "45dp",
            "top": "0dp",   
            "width": "100%",
            "zIndex": 1,
            "centerY":"50%",

          },{},{});
          flxlbl.setDefaultUnit(kony.flex.DP);

          var lblHelp = new kony.ui.Label({
            "centerY":"50%",
            "height": kony.flex.USE_PREFERED_SIZE,
            "width":kony.flex.USE_PREFERED_SIZE,
            "id": "lblHelp"+i,
            "isVisible": true,
            "left": "0dp",      
            "skin": "CopyAccordionInactive2",
            "text": (arrHelp["help"][i].categoryTitle).toUpperCase(),
            "textStyle": {
              "letterSpacing": 0,
              "strikeThrough": false
            },
            "top": "0dp",
            "zIndex": 1,

          },
                                          {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
          }, {
            "textCopyable": false
          });



           var lblHelpTemp = new kony.ui.Label({
            "centerY":"50%",
            "height": kony.flex.USE_PREFERED_SIZE,
            "width":kony.flex.USE_PREFERED_SIZE,
            "id": "lblHelp"+i+"temp",
            "isVisible": false,
            "left": "0dp",      
            "skin": "CopyAccordionInactive2",
            "text": (arrHelp["help"][i].catShortTitle),
            "textStyle": {
              "letterSpacing": 0,
              "strikeThrough": false
            },
            "top": "0dp",
            "zIndex": 1,

          },
                                          {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
          }, {
            "textCopyable": false
          });

          flxlbl.add(lblHelp,lblHelpTemp);
          flxImg.add(imgIcon);

          flxHelp.add(flxImg,flxlbl);

          flxHelp.onClick= this.hamBurgerClicked;
          flxHelpContainer.add(flxHelp,flxDivider);
        }
      }    
      this.view.flxDynamic.add(flxHelpContainer);




    },

    createAboutUs:function(){
      var flxAboutUs = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "height": "30dp",
        "id": "flxAboutUs",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0dp",
        //"skin": "sknFlxMenus",
        "top": "40dp",   
        "width": "100%",
        "zIndex": 1
      }, {}, {}); 
      var lblAboutUs = new kony.ui.Label({
        "centerY":"50%",
        "height": kony.flex.USE_PREFERED_SIZE,
        "width":kony.flex.USE_PREFERED_SIZE,
        "id": "lblAboutUs",
        "isVisible": true,
        "left": "20dp",      
        "skin": "CopysideMenuHeader2",
        "text": "ABOUT US",
        "textStyle": {
          "letterSpacing": 0,
          "strikeThrough": false
        },
        "top": "0dp",
        "zIndex": 1
      },
                                         {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {
        "textCopyable": false
      });   
      flxAboutUs.add(lblAboutUs);
      this.view.flxDynamic.add(flxAboutUs);

      var flxAboutUsContainer = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "height": kony.flex.USE_PREFERED_SIZE,
        "id": "flxAboutUsContainer",
        "isVisible": true,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "left": "0dp",
        //"skin": "sknFlxMenus",
        "top": "0dp",  
        "width": "100%",
        "zIndex": 1
      }, {}, {});
      flxAboutUsContainer.setDefaultUnit(kony.flex.DP);
      var flxDivider = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "height":"1dp",
        "id": "flxDivider",
        "isVisible": true,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "left": "0dp",
        "skin": "CopyborderBBBBBB2",
        "top": "0dp",  
        "width": "100%",
        "zIndex": 1
      },{},{});			
      flxDivider.setDefaultUnit(kony.flex.DP);      
      flxAboutUsContainer.add(flxDivider);     
      if(arrAboutUs !== null && arrAboutUs !== undefined){
        for(var i=0; i<arrAboutUs["about-us"].length; i++) {

          flxDivider = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"1dp",
            "id": "flxDivider"+i,
            "isVisible": true,
            "layoutType": kony.flex.FLOW_VERTICAL,
            "left": "0dp",
            "skin": "CopyborderBBBBBB2",
            "top": "0dp",  
            "width": "100%",
            "zIndex": 1
          },{},{});

          flxDivider.setDefaultUnit(kony.flex.DP);

          var flxAboutUs = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"40dp",
            "id": "flxAboutUs"+i,
            "isVisible": true,
            "left": "0dp",
            "top": "0dp",   
            "width": "100%",
            "zIndex": 1
          },{},{});
          flxAboutUs.setDefaultUnit(kony.flex.DP);


          var flxImg = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"40dp",
            "id": "flxImg"+i,
            "isVisible": true,
            "left": "5dp",
            "top": "0dp",   
            "width": "40dp",
            "zIndex": 1
          },{},{});
          flxImg.setDefaultUnit(kony.flex.DP);

          var imgIcon = new kony.ui.Image2({
            "centerY": "50%",
            "centerX":"50%",
            "height": "18dp",
            "width": "18dp",    
            "id": "imgIcon"+i,
            "isVisible": true,
            //"left": "16dp",
            //"skin": "sknImg",
            "src": arrAboutUs["about-us"][i].catImageMobile,
            //"imageWhenFailed": "download_error.png",
            // "imageWhileDownloading": "download_error.png",
            "zIndex": 1,
            //"onTouchStart":show
          },
                                           {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
          }, {});


          var flxlbl = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"100%",
            "id": "flxlbl"+i,
            "isVisible": true,
            "left": "45dp",
            "top": "0dp",   
            "width": "100%",
            "zIndex": 1,
            "centerY":"50%",

          },{},{});
          flxlbl.setDefaultUnit(kony.flex.DP);

          var lblAboutUs = new kony.ui.Label({
            "centerY":"50%",
            "height": kony.flex.USE_PREFERED_SIZE,
            "width":kony.flex.USE_PREFERED_SIZE,
            "id": "lblAboutUs"+i,
            "isVisible": true,
            "left": "0dp",      
            "skin": "CopyAccordionInactive2",
            "text": (arrAboutUs["about-us"][i].categoryTitle).toUpperCase(),
            "textStyle": {
              "letterSpacing": 0,
              "strikeThrough": false
            },
            "top": "0dp",
            "zIndex": 1,

          },
                                          {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
          }, {
            "textCopyable": false
          });


          var lblAboutUsTemp = new kony.ui.Label({
            "centerY":"50%",
            "height": kony.flex.USE_PREFERED_SIZE,
            "width":kony.flex.USE_PREFERED_SIZE,
            "id": "lblAboutUs"+i+"temp",
            "isVisible": false,
            "left": "0dp",      
            "skin": "CopyAccordionInactive2",
            "text": (arrAboutUs["about-us"][i].catShortTitle),
            "textStyle": {
              "letterSpacing": 0,
              "strikeThrough": false
            },
            "top": "0dp",
            "zIndex": 1,

          },
                                          {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
          }, {
            "textCopyable": false
          });


          flxlbl.add(lblAboutUs,lblAboutUsTemp);
          flxImg.add(imgIcon);
          flxAboutUs.add(flxImg,flxlbl);

          if(arrAboutUs["about-us"][i].hasOwnProperty("isDirectLink")){
            flxAboutUs.onClick= this.hamBurgerClicked;
          }else{
            flxAboutUs.onClick= this.fliterCategory;
          }

          flxAboutUsContainer.add(flxAboutUs,flxDivider);
        }
      }    
      this.view.flxDynamic.add(flxAboutUsContainer);
    },

    createOurProducts:function(){
      var flxOurProducts = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "height": "30dp",
        "id": "flxOurProducts",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0dp",
        //"skin": "sknFlxMenus",
        "top": "40dp",  
        "width": "100%",
        "zIndex": 1
      }, {}, {}); 
      var lblOurProducts = new kony.ui.Label({
        "centerY":"50%",
        "height": kony.flex.USE_PREFERED_SIZE,
        "width":kony.flex.USE_PREFERED_SIZE,
        "id": "lblOurProducts",
        "isVisible": true,
        "left": "20dp",      
        "skin": "CopysideMenuHeader2",
        "text": "OUR PRODUCTS",
        "textStyle": {
          "letterSpacing": 0,
          "strikeThrough": false
        },
        "top": "0dp",
        "zIndex": 1
      },
                                             {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {
        "textCopyable": false
      });   
      flxOurProducts.add(lblOurProducts);
      this.view.flxDynamic.add(flxOurProducts);


      var flxOurProductsContainer = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "height": kony.flex.USE_PREFERED_SIZE,
        "id": "flxOurProductsContainer",
        "isVisible": true,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "left": "0dp",
        //"skin": "sknFlxMenus",
        "top": "0dp",   
        "width": "100%",
        "zIndex": 1
      }, {}, {});
      flxOurProductsContainer.setDefaultUnit(kony.flex.DP);

      var flxDivider = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "height":"1dp",
        "id": "flxDivider",
        "isVisible": true,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "left": "0dp",
        "skin": "CopyborderBBBBBB2",
        "top": "0dp",  
        "width": "100%",
        "zIndex": 1
      },{},{});			
      flxDivider.setDefaultUnit(kony.flex.DP);      
      flxOurProductsContainer.add(flxDivider);     
      if(arrOurProducts !== null && arrOurProducts !== undefined){
        for(var i=0; i<arrOurProducts["our-products"].length; i++) {


          flxDivider = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"1dp",
            "id": "flxDivider"+i,
            "isVisible": true,
            "layoutType": kony.flex.FLOW_VERTICAL,
            "left": "0dp",
            "skin": "CopyborderBBBBBB2",
            "top": "0dp",  
            "width": "100%",
            "zIndex": 1
          },{},{});

          flxDivider.setDefaultUnit(kony.flex.DP);

          var flxOurProducts = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"40dp",
            "id": "flxOurProducts"+i,
            "isVisible": true,
            "left": "0dp",
            "top": "0dp",   
            "width": "100%",
            "zIndex": 1
          },{},{});
          flxOurProducts.setDefaultUnit(kony.flex.DP);


          var flxImg = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"40dp",
            "id": "flxImg"+i,
            "isVisible": true,
            "left": "5dp",
            "top": "0dp",   
            "width": "40dp",
            "zIndex": 1
          },{},{});
          flxImg.setDefaultUnit(kony.flex.DP);

          var imgIcon = new kony.ui.Image2({
            "centerY": "50%",
            "centerX":"50%",
            "height": "18dp",
            "width": "18dp",    
            "id": "imgIcon"+i,
            "isVisible": true,
            //"left": "16dp",
            //"skin": "sknImg",
            "src": arrOurProducts["our-products"][i].catImageMobile,
            //"imageWhenFailed": "download_error.png",
            // "imageWhileDownloading": "download_error.png",
            "zIndex": 1,
            //"onTouchStart":show
          },
                                           {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
          }, {});


          var flxlbl = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"100%",
            "id": "flxlbl"+i,
            "isVisible": true,
            "left": "45dp",
            "top": "0dp",   
            "width": "100%",
            "zIndex": 1,

          },{},{});
          flxlbl.setDefaultUnit(kony.flex.DP);

          var lblOurProducts = new kony.ui.Label({
            "centerY":"50%",
            "height": kony.flex.USE_PREFERED_SIZE,
            "width":kony.flex.USE_PREFERED_SIZE,
            "id": "lblOurProducts"+i,
            "isVisible": true,
            "left": "0dp",      
            "skin": "CopyAccordionInactive2",
            "text": (arrOurProducts["our-products"][i].categoryTitle).toUpperCase(),
            "textStyle": {
              "letterSpacing": 0,
              "strikeThrough": false
            },
            "top": "0dp",
            "zIndex": 1,

          },
                                                 {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
          }, {
            "textCopyable": false
          });

           var lblOurProductsTemp = new kony.ui.Label({
            "centerY":"50%",
            "height": kony.flex.USE_PREFERED_SIZE,
            "width":kony.flex.USE_PREFERED_SIZE,
            "id": "lblOurProducts"+i+"temp",
            "isVisible": false,
            "left": "0dp",      
            "skin": "CopyAccordionInactive2",
            "text": (arrOurProducts["our-products"][i].catShortTitle),
            "textStyle": {
              "letterSpacing": 0,
              "strikeThrough": false
            },
            "top": "0dp",
            "zIndex": 1,

          },
                                                 {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
          }, {
            "textCopyable": false
          });

          flxlbl.add(lblOurProducts,lblOurProductsTemp);
          flxImg.add(imgIcon);

          flxOurProducts.add(flxImg,flxlbl);

          if(arrOurProducts["our-products"][i].hasOwnProperty("isDirectLink")){
            flxOurProducts.onClick= this.hamBurgerClicked;
          }else{
            flxOurProducts.onClick= this.fliterCategory;
          }

          flxOurProductsContainer.add(flxOurProducts,flxDivider);
        }
      }    
      this.view.flxDynamic.add(flxOurProductsContainer);

    },

    createAmwayBusiness:function(){
      var flxAmwayBusiness = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "height": "30dp",
        "id": "flxAmwayBusiness",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0dp",
        //"skin": "sknFlxMenus",
        "top": "40dp",  
        "width": "100%",
        "zIndex": 1
      }, {}, {}); 
      var lblAmwayBusiness = new kony.ui.Label({
        "centerY":"50%",
        "height": kony.flex.USE_PREFERED_SIZE,
        "width":kony.flex.USE_PREFERED_SIZE,
        "id": "lblAmwayBusiness",
        "isVisible": true,
        "left": "20dp",      
        "skin": "CopysideMenuHeader2",
        "text": "AMWAY BUSINESS",
        "textStyle": {
          "letterSpacing": 0,
          "strikeThrough": false
        },
        "top": "0dp",
        "zIndex": 1
      },
                                               {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {
        "textCopyable": false
      });   
      flxAmwayBusiness.add(lblAmwayBusiness);
      this.view.flxDynamic.add(flxAmwayBusiness);


      var flxAmwayBusinessContainer = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "height": kony.flex.USE_PREFERED_SIZE,
        "id": "flxAmwayBusinessContainer",
        "isVisible": true,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "left": "0dp",
        //"skin": "sknFlxMenus",
        "top": "0dp",   
        "width": "100%",
        "zIndex": 1
      }, {}, {});
      flxAmwayBusinessContainer.setDefaultUnit(kony.flex.DP);

      var flxDivider = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "height":"1dp",
        "id": "flxDivider",
        "isVisible": true,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "left": "0dp",
        "skin": "CopyborderBBBBBB2",
        "top": "0dp",  
        "width": "100%",
        "zIndex": 1
      },{},{});			
      flxDivider.setDefaultUnit(kony.flex.DP);      
      flxAmwayBusinessContainer.add(flxDivider);     
      if(arrAmwayBusiness !== null && arrAmwayBusiness !== undefined){
        for(var i=0; i<arrAmwayBusiness["amway-business"].length; i++) {

          flxDivider = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"1dp",
            "id": "flxDivider"+i,
            "isVisible": true,
            "layoutType": kony.flex.FLOW_VERTICAL,
            "left": "0dp",
            "skin": "CopyborderBBBBBB2",
            "top": "0dp",  
            "width": "100%",
            "zIndex": 1
          },{},{});

          flxDivider.setDefaultUnit(kony.flex.DP);

          var flxAmwayBusiness = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"40dp",
            "id": "flxAmwayBusiness"+i,
            "isVisible": true,
            "left": "0dp",
            "top": "0dp",   
            "width": "100%",
            "zIndex": 1
          },{},{});
          flxAmwayBusiness.setDefaultUnit(kony.flex.DP);


          var flxImg = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"40dp",
            "id": "flxImg"+i,
            "isVisible": true,
            "left": "5dp",
            "top": "0dp",   
            "width": "40dp",
            "zIndex": 1
          },{},{});
          flxImg.setDefaultUnit(kony.flex.DP);

          var imgIcon = new kony.ui.Image2({
            "centerY": "50%",
            "centerX":"50%",
            "height": "18dp",
            "width": "18dp",    
            "id": "imgIcon"+i,
            "isVisible": true,
            //"left": "16dp",
            //"skin": "sknImg",
            "src": arrAmwayBusiness["amway-business"][i].catImageMobile,
            //"imageWhenFailed": "download_error.png",
            // "imageWhileDownloading": "download_error.png",
            "zIndex": 1,
            //"onTouchStart":show
          },
                                           {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
          }, {});


          var flxlbl = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"100%",
            "id": "flxlbl"+i,
            "isVisible": true,
            "left": "45dp",
            "top": "0dp",   
            "width": "100%",
            "zIndex": 1,

          },{},{});
          flxlbl.setDefaultUnit(kony.flex.DP);

          var lblAmwayBusiness = new kony.ui.Label({
            "centerY":"50%",
            "height": kony.flex.USE_PREFERED_SIZE,
            "width":kony.flex.USE_PREFERED_SIZE,
            "id": "lblAmwayBusiness"+i,
            "isVisible": true,
            "left": "0dp",      
            "skin": "CopyAccordionInactive2",
            "text": (arrAmwayBusiness["amway-business"][i].categoryTitle).toUpperCase(),
            "textStyle": {
              "letterSpacing": 0,
              "strikeThrough": false
            },
            "top": "0dp",
            "zIndex": 1,

          },
                                          {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
          }, {
            "textCopyable": false
          });



          var lblAmwayBusinessTemp = new kony.ui.Label({
            "centerY":"50%",
            "height": kony.flex.USE_PREFERED_SIZE,
            "width":kony.flex.USE_PREFERED_SIZE,
            "id": "lblAmwayBusiness"+i+"temp",
            "isVisible": false,
            "left": "0dp",      
            "skin": "CopyAccordionInactive2",
            "text": (arrAmwayBusiness["amway-business"][i].catShortTitle),
            "textStyle": {
              "letterSpacing": 0,
              "strikeThrough": false
            },
            "top": "0dp",
            "zIndex": 1,

          },
                                          {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
          }, {
            "textCopyable": false
          });


          flxlbl.add(lblAmwayBusiness,lblAmwayBusinessTemp);
          flxImg.add(imgIcon);

          flxAmwayBusiness.add(flxImg,flxlbl);

          if(arrAmwayBusiness["amway-business"][i].hasOwnProperty("isDirectLink")){
            flxAmwayBusiness.onClick= this.hamBurgerClicked;
          }else{
            flxAmwayBusiness.onClick= this.fliterCategory;
          }

          flxAmwayBusinessContainer.add(flxAmwayBusiness,flxDivider);
        }
      }    
      this.view.flxDynamic.add(flxAmwayBusinessContainer);
    },

    createTools:function(){
      var flxTools = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "height": "30dp",
        "id": "flxTools",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0dp",
        //"skin": "sknFlxMenus",
        "top": "40dp",  
        "width": "100%",
        "zIndex": 1
      }, {}, {}); 
      var lblTools = new kony.ui.Label({
        "centerY":"50%",
        "height": kony.flex.USE_PREFERED_SIZE,
        "width":kony.flex.USE_PREFERED_SIZE,
        "id": "lblTools",
        "isVisible": true,
        "left": "20dp",      
        "skin": "CopysideMenuHeader2",
        "text": "TOOLS & ENABLERS",
        "textStyle": {
          "letterSpacing": 0,
          "strikeThrough": false
        },
        "top": "0dp",
        "zIndex": 1
      },
                                       {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {
        "textCopyable": false
      });   
      flxTools.add(lblTools);
      this.view.flxDynamic.add(flxTools);


      var flxToolsContainer = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "height": kony.flex.USE_PREFERED_SIZE,
        "id": "flxToolsContainer",
        "isVisible": true,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "left": "0dp",
        //"skin": "sknFlxMenus",
        "top": "0dp",   
        "width": "100%",
        "zIndex": 1
      }, {}, {});
      flxToolsContainer.setDefaultUnit(kony.flex.DP);

      var flxDivider = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "height":"1dp",
        "id": "flxDivider",
        "isVisible": true,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "left": "0dp",
        "skin": "CopyborderBBBBBB2",
        "top": "0dp",  
        "width": "100%",
        "zIndex": 1
      },{},{});			
      flxDivider.setDefaultUnit(kony.flex.DP);     
      flxToolsContainer.add(flxDivider);    

      if(arrTools !== null && arrTools !== undefined){
        for(var i=0; i<arrTools["tools"].length; i++) {
          flxDivider = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"1dp",
            "id": "flxDivider"+i,
            "isVisible": true,
            "layoutType": kony.flex.FLOW_VERTICAL,
            "left": "0dp",
            "skin": "CopyborderBBBBBB2",
            "top": "0dp",  
            "width": "100%",
            "zIndex": 1
          },{},{});
          flxDivider.setDefaultUnit(kony.flex.DP);
          var flxToolsOuter= new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"40dp",
            "id": "flxToolsOuter"+i,
            "isVisible": true,
            "left": "0dp",
            "top": "0dp",   
            "width": "100%",
            "zIndex": 1
          },{},{});
          flxToolsOuter.setDefaultUnit(kony.flex.DP);

          flxToolsOuter.onClick = this.toolsCliked;

          //active tab
          var flxToolsActive = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"40dp",
            "id": "flxToolsActive"+i,
            "isVisible": false,
            "left": "0dp",
            "top": "0dp",   
            "width": "100%",
            "zIndex": 1
          },{},{});          
          flxToolsActive.setDefaultUnit(kony.flex.DP);
          var flxImgActive = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"40dp",
            "id": "flxImgActive"+i,
            "isVisible": true,
            "left": "5dp",
            "top": "0dp",   
            "width": "40dp",
            "zIndex": 1
          },{},{});
          flxImgActive.setDefaultUnit(kony.flex.DP);
          var temp = arrTools["tools"][i].catImageMobile.split('.png');
          var imgIconActive = new kony.ui.Image2({
            "centerY": "50%",
            "centerX":"50%",
            "height": "50dp",
            "width": "50dp",    
            "id": "imgIconActive"+i,
            "isVisible": true,
            //"left": "16dp",
            //"skin": "sknImg",
            "src": temp[0]+"_active.png",
            //"imageWhenFailed": "download_error.png",
            // "imageWhileDownloading": "download_error.png",
            "zIndex": 1,
            //"onTouchStart":show
          },
                                                 {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
          }, {});
          var flxlblActive = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"100%",
            "id": "flxlblActive"+i,
            "isVisible": true,
            "left": "45dp",
            "top": "0dp",   
            "width": "100%",
            "zIndex": 1,

          },{},{});
          flxlblActive.setDefaultUnit(kony.flex.DP);
          var lblTextActive = new kony.ui.Label({
            "centerY":"50%",
            "height": kony.flex.USE_PREFERED_SIZE,
            "width":kony.flex.USE_PREFERED_SIZE,
            "id": "lblTextActive"+i,
            "isVisible": true,
            "left": "0dp",      
            //"skin": "CopyAccordionInactive2",
            "skin":"CopyCopyslLabel01af4fe8f96074e",
            "text": (arrTools["tools"][i].categoryTitle).toUpperCase(),
            "textStyle": {
              "letterSpacing": 0,
              "strikeThrough": false
            },
            "top": "0dp",
            "zIndex": 1
          },
                                                {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
          }, {
            "textCopyable": false
          });
          var imgIconArrowUp = new kony.ui.Image2({
            "centerY": "50%",
            //"centerX":"50%",
            "height": "50dp",
            "width": "50dp",    
            "id": "imgIconArrowUp"+i,
            "isVisible": true,
            //"left": "16dp",
            //"skin": "sknImg",
            "right":"0dp",
            "src": "icon_chevron_up.png",
            //"imageWhenFailed": "download_error.png",
            // "imageWhileDownloading": "download_error.png",
            "zIndex": 1,
            //"onTouchStart":show
          },
                                                  {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
          }, {});       


          flxlblActive.add(lblTextActive);
          flxImgActive.add(imgIconActive);
          flxToolsActive.add(flxImgActive,flxlblActive,imgIconArrowUp);


          //inactive tab
          var flxTools = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"40dp",
            "id": "flxTools"+i,
            "isVisible": true,
            "left": "0dp",
            "top": "0dp",   
            "width": "100%",
            "zIndex": 1
          },{},{});
          flxTools.setDefaultUnit(kony.flex.DP);
          var flxImg = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"40dp",
            "id": "flxImg"+i,
            "isVisible": true,
            "left": "5dp",
            "top": "0dp",   
            "width": "40dp",
            "zIndex": 1
          },{},{});
          flxImg.setDefaultUnit(kony.flex.DP);

          var imgIcon = new kony.ui.Image2({
            "centerY": "50%",
            "centerX":"50%",
            "height": "50dp",
            "width": "50dp",    
            "id": "imgIcon"+i,
            "isVisible": true,
            //"left": "16dp",
            //"skin": "sknImg",
            "src": arrTools["tools"][i].catImageMobile,
            //"imageWhenFailed": "download_error.png",
            // "imageWhileDownloading": "download_error.png",
            "zIndex": 1,
            //"onTouchStart":show
          },
                                           {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
          }, {});
          var flxlbl = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "height":"100%",
            "id": "flxlbl"+i,
            "isVisible": true,
            "left": "45dp",
            "top": "0dp",   
            "width": "100%",
            "zIndex": 1,

          },{},{});
          flxlbl.setDefaultUnit(kony.flex.DP);
          var lblText = new kony.ui.Label({
            "centerY":"50%",
            "height": kony.flex.USE_PREFERED_SIZE,
            "width":kony.flex.USE_PREFERED_SIZE,
            "id": "lblText"+i,
            "isVisible": true,
            "left": "0dp",      
            "skin": "CopyAccordionInactive2",
            //"skin":"CopyCopyslLabel01af4fe8f96074e",
            "text": (arrTools["tools"][i].categoryTitle).toUpperCase(),
            "textStyle": {
              "letterSpacing": 0,
              "strikeThrough": false
            },
            "top": "0dp",
            "zIndex": 1
          },
                                          {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
          }, {
            "textCopyable": false
          });
          var imgIconArrowDown = new kony.ui.Image2({
            "centerY": "50%",
            //"centerX":"50%",
            "height": "50dp",
            "width": "50dp",    
            "id": "imgIconArrowDown"+i,
            "isVisible": true,
            "right":"0dp",
            "src": "icon_chevron_down.png",
            "zIndex": 1,
          },
                                                    {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
          }, {});
          flxlbl.add(lblText);
          flxImg.add(imgIcon);
          flxTools.add(flxImg,flxlbl,imgIconArrowDown);

          flxToolsOuter.add(flxTools,flxToolsActive);

          var flxToolsOuterSub=null;

          if(arrTools["tools"][i]["subCategories"]!== null )
          {

            flxToolsOuterSub = new kony.ui.FlexContainer({
              "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
              "clipBounds": true,
              "height":kony.flex.USE_PREFERED_SIZE,
              "id": "flxToolsOuterSub"+i,
              "layoutType": kony.flex.FLOW_VERTICAL,
              "isVisible": false,
              "left": "0dp",
              "top": "0dp",   
              "width": "100%",
              "zIndex": 1
            },{},{});
            flxToolsOuterSub.setDefaultUnit(kony.flex.DP);
            for(var j=0;j<arrTools["tools"][i]["subCategories"].length;j++){
              var flxDividerSub = new kony.ui.FlexContainer({
                "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
                "clipBounds": true,
                "height":"1dp",
                "id": "flxDividerSub"+i+""+j,
                "isVisible": true,
                "layoutType": kony.flex.FLOW_VERTICAL,
                "left": "0dp",
                "skin": "CopyborderBBBBBB2",
                "top": "0dp",  
                "width": "100%",
                "zIndex": 1
              },{},{});
              flxDividerSub.setDefaultUnit(kony.flex.DP);

              flxToolsSub = new kony.ui.FlexContainer({
                "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
                "clipBounds": true,
                "height":"40dp",
                "id": "flxToolsSub"+i+""+j,
                "isVisible": true,
                "left": "0dp",
                "top": "0dp",   
                "width": "100%",
                "zIndex": 1
              },{},{});
              flxToolsSub.setDefaultUnit(kony.flex.DP);

              flxToolsSub.onClick = this.hamBurgerClicked;


              var lblToolsSub = new kony.ui.Label({
                "centerY":"50%",
                "height": kony.flex.USE_PREFERED_SIZE,
                "width":kony.flex.USE_PREFERED_SIZE,
                "id": "lblToolsSub"+i+""+j,
                "isVisible": true,
                "left": "45dp",      
                "skin":"CopyAcc2",
                "text": (arrTools["tools"][i].subCategories[j].categoryTitle),
                "textStyle": {
                  "letterSpacing": 0,
                  "strikeThrough": false
                },
                "top": "0dp",
                "zIndex": 1,

              },
                                                  {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
              }, {
                "textCopyable": false
              });


              var lblToolsSubTemp = new kony.ui.Label({
                "centerY":"50%",
                "height": kony.flex.USE_PREFERED_SIZE,
                "width":kony.flex.USE_PREFERED_SIZE,
                "id": "lblToolsSub"+i+""+j+"temp",
                "isVisible": false,
                "left": "45dp",      
                "skin":"CopyAcc2",
                "text": (arrTools["tools"][i].subCategories[j].catShortTitle),
                "textStyle": {
                  "letterSpacing": 0,
                  "strikeThrough": false
                },
                "top": "0dp",
                "zIndex": 1,

              },
                                                  {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
              }, {
                "textCopyable": false
              });


              flxToolsSub.add(lblToolsSub,lblToolsSubTemp);
              flxToolsOuterSub.add(flxToolsSub,flxDividerSub);
            }
          }


          flxToolsContainer.add(flxToolsOuter,flxDivider,flxToolsOuterSub);
        }
      }    
      this.view.flxDynamic.add(flxToolsContainer);
    },

    */
    closeSideDrawer:function(){
      animate( controllerReference.view.flexSideDrawer, { "left": "-100%" } );
      this.view.scrollSideDrawerContainer.setContentOffset({x:"0dp",y:"0dp"});
      this.collapseAll();
    },

    goToflxOpportunity:function(){
      callTealiumOnClick("click_action","business_opportunity",["flxOpportunity"],gblVisitor_imcID);   
      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"business_opportunity",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "BUSINESS OPPORTUNITY";

      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutOppurtunity();
      }else{
        sideDrawerCategory(gblOpportunity);
      }

      /*
      else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutOppurtunity();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutOppurtunity();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutOppurtunity();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutOppurtunity();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutOppurtunity();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutOppurtunity();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutOppurtunity();
      }


      */

    },

    goToflxRecognition:function(){
      callTealiumOnClick("click_action","amway_recognition",["flxRecognition"],gblVisitor_imcID);   


      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"amway_recognition",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "AMWAY RECOGNITION";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutRecognition();
      }else{
        sideDrawerCategory(gblRecognition);
      }
      /*
      else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutRecognition();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutRecognition();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutRecognition();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutRecognition();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutRecognition();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutRecognition();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutRecognition();
      }

*/
    },

    goToflxBrochures:function(){
      callTealiumOnClick("click_action","business_brochures",["flxBrochures"],gblVisitor_imcID);   


      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"business_brochures",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "BUSINESS BROCHURES";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutBrochures();
      }else{
        sideDrawerCategory(gblBrochures);
      }

      /*else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutBrochures();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutBrochures();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutBrochures();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutBrochures();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutBrochures();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutBrochures();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutBrochures();
      }
*/
    },

    goToflxSeminars:function(){
      callTealiumOnClick("click_action","business_seminars_and_conferences",["flxSeminars"],gblVisitor_imcID);   


      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"business_seminars_and_conferences",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "BUSINESS SEMINARS & CONFERENCES";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutSeminars();
      }else{
        sideDrawerCategory(gblSeminars);
      }

      /*else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutSeminars();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutSeminars();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutSeminars();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutSeminars();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutSeminars();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutSeminars();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutSeminars();
      }

*/
    },

    goToflxLearning:function(){
      callTealiumOnClick("click_action","learning_and_development",["flxLearning"],gblVisitor_imcID);   


      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"learning_and_development",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "LEARNING AND DEVELOPMENT";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutLearning();
      }else{
        sideDrawerCategory(gblLearning);
      } 
      /*
      else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutLearning();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutLearning();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutLearning();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutLearning();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutLearning();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutLearning();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutLearning();
      }

      */

    },

    goToBBusinessAccord1 : function(){

      callTealiumOnClick("click_action","Personal_care",["flxBBusinessAccord1"],gblVisitor_imcID);   


      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"Personal_care",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "PERSONAL CARE";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutPersonalCareData();
      }else{
        sideDrawerCategory(gblPersonalCare);
      }

      /*else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutPersonalCareData();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutPersonalCareData();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutPersonalCareData();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutPersonalCareData();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutPersonalCareData();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutPersonalCareData();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutPersonalCareData();
      }

*/
    },

    goToBBusinessAccord2 : function(){

      callTealiumOnClick("click_action","Nutrition",["flxBBusinessAccord2"],gblVisitor_imcID);
      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"Nutrition",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "NUTRITION";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutNutriliteData();
      }else{
        sideDrawerCategory(gblNutrilite);
      }
      /* else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutNutriliteData();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutNutriliteData();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutNutriliteData();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutNutriliteData();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutNutriliteData();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutNutriliteData();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutNutriliteData();
      }
*/
    },

    goToBBusinessAccord3 : function(){

      callTealiumOnClick("click_action","Beauty",["flxBBusinessAccord3"],gblVisitor_imcID);
      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"Beauty",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }

      gblFilterCategoryName = "BEAUTY";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutBeautyData();
      }else{
        sideDrawerCategory(gblBeauty);
      }
      /*else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutBeautyData();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutBeautyData();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutBeautyData();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutBeautyData();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutBeautyData();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutBeautyData();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutBeautyData();
      }
*/
    },

    goToBBusinessAccord4 : function(){

      callTealiumOnClick("click_action","At_home",["flxBBusinessAccord4"],gblVisitor_imcID);

      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"At_home",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }

      gblFilterCategoryName = "AT HOME";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutAtHomeData();
      }else{
        sideDrawerCategory(gblAtHome);
      }

      /*else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutAtHomeData();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutAtHomeData();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutAtHomeData();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutAtHomeData();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutAtHomeData();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutAtHomeData();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutAtHomeData();
      }
      */

    },

    goToBBusinessAccord5 : function(){

      callTealiumOnClick("click_action","More_products",["flxBBusinessAccord5"],gblVisitor_imcID);

      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"More_products",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "MORE PRODUCTS";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutMoreProductsData();
      }else{
        sideDrawerCategory(gblMoreProducts);
      } 

      /*else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutMoreProductsData();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutMoreProductsData();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutMoreProductsData();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutMoreProductsData();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutMoreProductsData();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutMoreProductsData();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutMoreProductsData();
      }
*/
    },

    goToBBusinessAccord6 : function(){

      callTealiumOnClick("click_action","About_Amway",["flxBBusinessAccord6"],gblVisitor_imcID);

      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"About_Amway",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }

      gblFilterCategoryName = "ABOUT AMWAY";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutAmwayData();
      }else{
        sideDrawerCategory(gblAboutAmway);
      }

      /*else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutAmwayData();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutAmwayData();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutAmwayData();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutAmwayData();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutAmwayData();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutAmwayData();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutAmwayData();
      }
*/
    },

    goToflxHeritage : function(){


      callTealiumOnClick("click_action","heritage_&_values",["flxHeritage"],gblVisitor_imcID);   


      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"heritage_&_values",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "HERITAGE & VALUES";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutHeritage();
      }else{
        sideDrawerCategory(gblheritage);
      } 

      /*else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutHeritage();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutHeritage();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutHeritage();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutHeritage();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutHeritage();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutHeritage();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutHeritage();
      }
*/

    },

    goToflxFact:function(){
      callTealiumOnClick("click_action","fact_sheets",["flxFact"],gblVisitor_imcID);   


      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"fact_sheets",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "FACT SHEETS";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutFacts();
      }else{
        sideDrawerCategory(gblFactSheets);
      }

      /*else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutFacts();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutFacts();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutFacts();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutFacts();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutFacts();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutFacts();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutFacts();
      }
*/
    },

    goToflxManufacturing:function(){
      callTealiumOnClick("click_action","manufacturing",["flxManufacturing"],gblVisitor_imcID);   


      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"manufacturing",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "MANUFACTURING";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutManufacturing();
      }else{
        sideDrawerCategory(gblManufacturing);
      } /*else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutManufacturing();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutManufacturing();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutManufacturing();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutManufacturing();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutManufacturing();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutManufacturing();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutManufacturing();
      }

*/
    },

    goToflxAwards:function(){
      callTealiumOnClick("click_action","awards_&_accolades",["flxAwards"],gblVisitor_imcID);   


      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"awards_&_accolades",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "AWARDS & ACCOLADES";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutAwards();
      }else{
        sideDrawerCategory(gblAwards);
      } 

      /*else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutAwards();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutAwards();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutAwards();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutAwards();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutAwards();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutAwards();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutAwards();
      }

*/
    },

    goToflxCorporate:function(){
      callTealiumOnClick("click_action","corporate_social_responsibilities",["flxCorporate"],gblVisitor_imcID);   


      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"corporate_social_responsibilities",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "CORPORATE SOCIAL RESPONSIBILITIES";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutCorporateSocial();
      }else{
        sideDrawerCategory(gblCorporate);
      } 

      /*else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutCorporateSocial();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutCorporateSocial();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutCorporateSocial();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutCorporateSocial();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutCorporateSocial();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutCorporateSocial();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutCorporateSocial();
      }

*/
    },

    goToflxMedia:function(){
      callTealiumOnClick("click_action","media_releases",["flxMedia"],gblVisitor_imcID);   


      try{
        var  additionalArg = ["Topbar","VideoTile","Recommended","FeedTile","MoreOptions","SideDrawer","Popup","Popup2"];
        //additionalArg.push(this.view.id);
        kony.print("Tealium form widgets json for Homepage :: "+JSON.stringify(additionalArg));
        callTealiumOnScreenLoad1(gblCurrentForm,"media_releases",additionalArg,gblVisitor_imcID);
      }catch(e){
        kony.print("Exception is "+ e);
      }


      gblFilterCategoryName = "MEDIA RELEASES";
      if (gblCurrentForm === "homepage") {
        var homepageController = require("homepageController");
        homepageController.aboutMedia();
      }else{
        sideDrawerCategory(gblMedia);
      }

      /*else if (gblCurrentForm === "mycontentpage") {
        var homepageController = require("mycontentpageController");
        homepageController.aboutMedia();
      } else if (gblCurrentForm === "feedbackpage") {
        var homepageController = require("feedbackpageController");
        homepageController.aboutMedia();
      } else if (gblCurrentForm === "incomeSimulatorHome") {
        var homepageController = require("incomeSimulatorHomeController");
        homepageController.aboutMedia();
      } else if (gblCurrentForm === "GIPSimulatorHome") {
        var homepageController = require("GIPSimulatorHomeController");
        homepageController.aboutMedia();
      }else if(gblCurrentForm==="storelocatorpage"){
        var homepageController = require("storelocatorpageController");
        homepageController.aboutMedia();
      }else if(gblCurrentForm==="settingpage"){
        var homepageController = require("settingpageController");
        homepageController.aboutMedia();
      }else if(gblCurrentForm==="webapppage"){
        var homepageController = require("webapppageController");
        homepageController.aboutMedia();
      }
*/
    },


    goToGIPSimulator:function(){
      callTealiumOnClick("click_action","GIP_simulator",["btnGIPSimulator"],gblVisitor_imcID);


      var ntf=new kony.mvc.Navigation("GIPSimulatorHome");
      ntf.navigate();
      // this.AccordionButton4Close();
    },

    logout: function(){
      this.view.flxToast.setVisibility(false);
      this.view.flxClosePopup.isVisible = true;

      //this.view.scrollSideDrawerContainer.enableScrolling=false;
      //  this.view.scrollSideDrawerContainer.setEnabled(false);
      //	controllerReference.view.SideDrawer.flexCloseButtonContainer.setEnabled(false);
      //  controllerReference.view.SideDrawer.flexInvisibleTouchArea.setEnabled(false);


    },

    goToLogoutYes : function(){
      callTealiumOnClick("click_action","Logout_Yes",["btnLogoutYes"],gblVisitor_imcID);
      this.view.flxClosePopup.isVisible = false;
      // this.view.scrollSideDrawerContainer.setEnabled(true);
      //  controllerReference.view.SideDrawer.flexInvisibleTouchArea.setEnabled(true);
      //  controllerReference.view.SideDrawer.flexCloseButtonContainer.setEnabled(true);
      //this.AccordionButton4Close();     
      //this.AccordionButton6Close();   
      //this.AccordionButton7Close();  
      //this.AccordionButton8Close();

      clearLoginTokenFromStore();
      gblFilterCategory = "";
      gblVisitor_imcID = "";
      LoggedIn=false;
      var ntf = new kony.mvc.Navigation("preLoginpage");
      ntf.navigate();

    },

    goToLogoutNo : function(){
      callTealiumOnClick("click_action","Logout_No",["btnLogoutNo"],gblVisitor_imcID);
      this.view.flxClosePopup.setVisibility(false);
      // this.view.scrollSideDrawerContainer.enableScrolling=true;
      // this.view.scrollSideDrawerContainer.setEnabled(true);
      //controllerReference.view.SideDrawer.flexInvisibleTouchArea.setEnabled(true);
      //controllerReference.view.SideDrawer.flexCloseButtonContainer.setEnabled(true);


      // controllerReference.view.flxHome.setEnabled(true);
    },

    openShopOnline:function(){
      callTealiumOnClick("click_action","Shop_online",["flxShopOnlineSideDrawer"],gblVisitor_imcID);
      if (!isNetworkAvailable())
      {
        this.view.flxToast.setVisibility(true);
        try{
          kony.timer.cancel("timerid123");	
        }catch(e){}	
        kony.timer.schedule("timerid123", this.disableFlex.bind(this), 3, false);
      }else{
        title="Shop Online";
        var ntf=new kony.mvc.Navigation("nutriliteWow");
        ntf.navigate(title);
        // kony.application.openURL("https://www.amway.in/");		// added for external browser.
      }

    },

    openMyBiz:function(){
      callTealiumOnClick("click_action","Mybiz",["btnMyBiz"],gblVisitor_imcID);
      if (!isNetworkAvailable())
      {
        this.view.flxToast.setVisibility(true);
        try{
          kony.timer.cancel("timerid123");	
        }catch(e){}	
        kony.timer.schedule("timerid123", this.disableFlex.bind(this), 3, false);
      }else{
        //kony.application.openURL("https://mybiz.amway.com/");
        title="MyBiz";


        var ntf=new kony.mvc.Navigation("nutriliteWow");
        ntf.navigate(title);
        //this.AccordionButton8Close();
      }
    },

    openProductConsulting:function(){
      callTealiumOnClick("click_action","Product_catalogue",["btnProductCon"],gblVisitor_imcID);
      //this.AccordionButton4Close();     
      // this.AccordionButton6Close();   
      // this.AccordionButton7Close();  
      // this.AccordionButton8Close();
      if (!isNetworkAvailable())
      {
        this.view.flxToast.setVisibility(true);
        try{
          kony.timer.cancel("timerid123");	
        }catch(e){}	
        kony.timer.schedule("timerid123", this.disableFlex.bind(this), 3, false);
      }else{
        //title="Product Catalogue";
        kony.application.openURL("http://www.amway.in/store/amway/en/INR/lmsSearch/lmsHandler?LMSURL=https%3a%2f%2findia.amwayuniversity.com%2fcourses%2fapp%2fmanagement%2fLMS_CNT_SilentLaunch.aspx%3fUserMode%3d0%26ActivityId%3d2555%26lang%3den-US");
        //         var ntf=new kony.mvc.Navigation("nutriliteWow");
        //         ntf.navigate(title);
        //this.AccordionButton8Close();
      }

    },

    openNutriliteRecommender:function(){
      callTealiumOnClick("click_action","Nutrilite_product_recommender",pageComponents,gblVisitor_imcID);
      if (!isNetworkAvailable())
      {
        this.view.flxToast.setVisibility(true);
        try{
          kony.timer.cancel("timerid123");	
        }catch(e){}	
        kony.timer.schedule("timerid123", this.disableFlex.bind(this), 3, false);
      }else{
        title="Nutrilite Product Recommender";
        var ntf=new kony.mvc.Navigation("nutriliteWow");
        ntf.navigate(title);
      }

      //kony.application.openURL("http://nutriliterecommender.amway.in/");
    },

    openSkinRecommender:function(){
      callTealiumOnClick("click_action","Artistry_skincare_recommender",["btnSkinRecommender"],gblVisitor_imcID);
      if (!isNetworkAvailable())
      {
        this.view.flxToast.setVisibility(true);
        try{
          kony.timer.cancel("timerid123");	
        }catch(e){}	
        kony.timer.schedule("timerid123", this.disableFlex.bind(this), 3, false);
      }else{
        title="Artistry Skincare Recommender";


        var ntf=new kony.mvc.Navigation("nutriliteWow");
        ntf.navigate(title);
        //this.AccordionButton6Close();
      }

      // kony.application.openURL("http://artistryrecommender.amway.in/");
    },

    goToIncomeSimulator:function(){
      callTealiumOnClick("click_action","Income_simulator",["btnIncomeSimulator"],gblVisitor_imcID);


      var ntf=new kony.mvc.Navigation("incomeSimulatorHome");
      ntf.navigate();
      //this.AccordionButton4Close();
    },

    disableFlex: function(){
      this.view.flxToast.setVisibility(false);
      this.view.linkContactUs.setEnabled(true);
      try{
        kony.timer.cancel("timerid123");	
      }catch(e){}	

    },

    goToNutrilite:function(){
      callTealiumOnClick("click_action","Nutrilite_wow",["btnNutrilite"],gblVisitor_imcID);
      if (!isNetworkAvailable())
      {
        this.view.flxToast.setVisibility(true);
        try{
          kony.timer.cancel("timerid123");	
        }catch(e){}	
        kony.timer.schedule("timerid123", this.disableFlex.bind(this), 3, false);
      }
      else
      {


        var ntf=new kony.mvc.Navigation("nutriliteWow");
        ntf.navigate(null);
        //this.AccordionButton7Close();
      }

    },

    SortFeedOption1: function() {
      animate( this.view.SortFeedActive1, { "height": "100%" } );
      animate( this.view.SortFeedActive2, { "height": "0%" } );
      animate( this.view.SortFeedActive3, { "height": "0%" } );
      animate( this.view.SortFeedActive4, { "height": "0%" } );
    },
    SortFeedOption2: function() {
      animate( this.view.SortFeedActive1, { "height": "0%" } );
      animate( this.view.SortFeedActive2, { "height": "100%" } );
      animate( this.view.SortFeedActive3, { "height": "0%" } );
      animate( this.view.SortFeedActive4, { "height": "0%" } );
    },
    SortFeedOption3: function() {
      animate( this.view.SortFeedActive1, { "height": "0%" } );
      animate( this.view.SortFeedActive2, { "height": "0%" } );
      animate( this.view.SortFeedActive3, { "height": "100%" } );
      animate( this.view.SortFeedActive4, { "height": "0%" } );
    },
    SortFeedOption4: function() {
      animate( this.view.SortFeedActive1, { "height": "0%" } );
      animate( this.view.SortFeedActive2, { "height": "0%" } );
      animate( this.view.SortFeedActive3, { "height": "0%" } );
      animate( this.view.SortFeedActive4, { "height": "100%" } );
    },

    AccordionButton1: function() {
      if( this.view.Accordion1.height == "168dp" ){
        //         this.view.AccordionActive1.isVisible = false;
        //this.view.flexBusinessContainer.height = "180dp";
        animate( this.view.Accordion1, {"height": "0dp"} );
        return false;
      }
      //       this.view.AccordionActive1.isVisible = true;
      //       this.view.AccordionActive2.isVisible = false;
      //       this.view.AccordionActive3.isVisible = false;
      this.view.AccordionActive4.isVisible = false;
      this.view.AccordionActive5.isVisible = false;
      this.view.AccordionActive6.isVisible = false;
      this.view.AccordionActive7.isVisible = false;
      this.view.AccordionActive8.isVisible = false;

      animate( this.view.Accordion1, { "height": "168dp"} );
      this.view.Accordion2.height = "0dp";
      this.view.Accordion3.height = "0dp";
      this.view.Accordion4.height = "0dp";
      this.view.Accordion5.height = "0dp";
      this.view.Accordion6.height = "0dp";
      this.view.Accordion7.height = "0dp";
      this.view.Accordion8.height = "0dp";

      this.view.flexBusinessContainer.height = "348dp";
      this.view.flexToolsContainer.height = "162dp";

    },

    AccordionButton2: function() {
      if( this.view.Accordion2.height == "168dp" ){
        //this.view.AccordionActive2.isVisible = false;
        //this.view.flexBusinessContainer.height = "180dp";
        animate( this.view.Accordion2, {"height": "0dp"} );
        return false;
      }
      //       this.view.AccordionActive1.isVisible = false;
      //       this.view.AccordionActive2.isVisible = true;
      //       this.view.AccordionActive3.isVisible = false;
      this.view.AccordionActive4.isVisible = false;
      this.view.AccordionActive5.isVisible = false;
      this.view.AccordionActive6.isVisible = false;
      this.view.AccordionActive7.isVisible = false;
      this.view.AccordionActive8.isVisible = false;


      this.view.Accordion1.height = "0dp";

      this.view.Accordion3.height = "0dp";
      this.view.Accordion4.height = "0dp";
      this.view.Accordion5.height = "0dp";
      this.view.Accordion6.height = "0dp";
      this.view.Accordion7.height = "0dp";
      this.view.Accordion8.height = "0dp";

      this.view.flexBusinessContainer.height = "348dp";
      this.view.flexToolsContainer.height = "162dp";
      animate( this.view.Accordion2, { "height": "168dp"} );
    },
    AccordionButton3: function() {
      if( this.view.Accordion3.height == "168dp" ){
        //this.view.AccordionActive3.isVisible = false;
        //this.view.flexBusinessContainer.height = "180dp";
        animate( this.view.Accordion3, {"height": "0dp"} );
        return false;
      }
      //       this.view.AccordionActive1.isVisible = false;
      //       this.view.AccordionActive2.isVisible = false;
      //       this.view.AccordionActive3.isVisible = true;
      this.view.AccordionActive4.isVisible = false;
      this.view.AccordionActive5.isVisible = false;
      this.view.AccordionActive6.isVisible = false;
      this.view.AccordionActive7.isVisible = false;
      this.view.AccordionActive8.isVisible = false;


      this.view.Accordion1.height = "0dp";
      this.view.Accordion2.height = "0dp";

      this.view.Accordion4.height = "0dp";
      this.view.Accordion5.height = "0dp";
      this.view.Accordion6.height = "0dp";
      this.view.Accordion7.height = "0dp";
      this.view.Accordion8.height = "0dp";

      this.view.flexBusinessContainer.height = "348dp";
      this.view.flexToolsContainer.height = "162dp";
      animate( this.view.Accordion3, { "height": "168dp"} );

    },
    AccordionButton4: function() {

      if( this.view.Accordion4.height == "84dp" ){
        this.view.AccordionActive4.isVisible = false;
        this.view.flexToolsContainer.height = "162dp";
        animate( this.view.Accordion4, {"height": "0dp"} );
        return false;
      }

      //       this.view.AccordionActive1.isVisible = false;
      //       this.view.AccordionActive2.isVisible = false;
      //       this.view.AccordionActive3.isVisible = false;
      this.view.AccordionActive4.isVisible = true;
      this.view.AccordionActive5.isVisible = false;
      this.view.AccordionActive6.isVisible = false;
      this.view.AccordionActive7.isVisible = false;
      this.view.AccordionActive8.isVisible = false;


      /* this.view.Accordion1.height = "0dp";
      this.view.Accordion2.height = "0dp";
      this.view.Accordion3.height = "0dp";*/
      this.view.Accordion5.height = "0dp";
      this.view.Accordion6.height = "0dp";
      this.view.Accordion7.height = "0dp";
      this.view.Accordion8.height = "0dp";
      this.view.flexToolsContainer.height = "246dp";
      animate( this.view.Accordion4, { "height": "84dp"} );      


      //this.view.flexBusinessContainer.height = "180dp";


    },

    AccordionButton5: function() {

      if( this.view.Accordion5.height == "126dp" ){
        this.view.AccordionActive5.isVisible = false;
        this.view.flexToolsContainer.height = "162dp";
        animate( this.view.Accordion5, {"height": "0dp"} );
        return false;
      }

      //       this.view.AccordionActive1.isVisible = false;
      //       this.view.AccordionActive2.isVisible = false;
      //       this.view.AccordionActive3.isVisible = false;
      this.view.AccordionActive4.isVisible = false;
      this.view.AccordionActive5.isVisible = true;
      this.view.AccordionActive6.isVisible = false;
      this.view.AccordionActive7.isVisible = false;
      this.view.AccordionActive8.isVisible = false;



      /* this.view.Accordion1.height = "0dp";
      this.view.Accordion2.height = "0dp";
      this.view.Accordion3.height = "0dp";*/
      this.view.Accordion4.height = "0dp";
      animate( this.view.Accordion5, { "height": "126dp"} );
      this.view.Accordion6.height = "0dp";
      this.view.Accordion7.height = "0dp";
      this.view.Accordion8.height = "0dp";

      //this.view.flexBusinessContainer.height = "180dp";
      this.view.flexToolsContainer.height = "338dp";
    },

    AccordionButton6: function() {
      kony.print("Accrodian6 clicked")
      this.view.lblSkinRecommender.text = "Artistry Skincare Recommender";

      if( this.view.Accordion6.height == "42dp" ){
        this.view.AccordionActive6.isVisible = false;
        this.view.flexToolsContainer.height = "162dp";
        animate( this.view.Accordion6, {"height": "0dp"} );
        return false;
      }

      //       this.view.AccordionActive1.isVisible = false;
      //       this.view.AccordionActive2.isVisible = false;
      //       this.view.AccordionActive3.isVisible = false;
      this.view.AccordionActive4.isVisible = false;
      this.view.AccordionActive5.isVisible = false;
      this.view.AccordionActive6.isVisible = true;
      this.view.AccordionActive7.isVisible = false;
      this.view.AccordionActive8.isVisible = false;


      /* this.view.Accordion1.height = "0dp";
      this.view.Accordion2.height = "0dp";
      this.view.Accordion3.height = "0dp";*/
      this.view.Accordion4.height = "0dp";
      this.view.Accordion5.height = "0dp";
      this.view.Accordion7.height = "0dp";
      this.view.Accordion8.height = "0dp";

      //this.view.flexBusinessContainer.height = "180dp";
      this.view.flexToolsContainer.height = "204dp";
      animate( this.view.Accordion6, { "height": "42dp"} );      

    },

    AccordionButton7: function() {

      if( this.view.Accordion7.height == "42dp" ){
        this.view.AccordionActive7.isVisible = false;
        this.view.flexToolsContainer.height = "162dp";
        animate( this.view.Accordion7, {"height": "0dp"} );
        return false;
      }

      //       this.view.AccordionActive1.isVisible = false;
      //       this.view.AccordionActive2.isVisible = false;
      //       this.view.AccordionActive3.isVisible = false;
      this.view.AccordionActive4.isVisible = false;
      this.view.AccordionActive5.isVisible = false;
      this.view.AccordionActive6.isVisible = false;
      this.view.AccordionActive7.isVisible = true;
      this.view.AccordionActive8.isVisible = false;


      /* this.view.Accordion1.height = "0dp";
      this.view.Accordion2.height = "0dp";
      this.view.Accordion3.height = "0dp";*/
      this.view.Accordion4.height = "0dp";
      this.view.Accordion5.height = "0dp";
      this.view.Accordion6.height = "0dp";
      this.view.Accordion8.height = "0dp";
      this.view.flexToolsContainer.height = "204dp";
      animate( this.view.Accordion7, { "height": "42dp"} );      


      //this.view.flexBusinessContainer.height = "180dp";


    },

    AccordionButton8: function() {

      if( this.view.Accordion8.height == "84dp" ){
        this.view.AccordionActive8.isVisible = false;
        this.view.flexToolsContainer.height = "162dp";
        animate( this.view.Accordion8, {"height": "0dp"} );
        return false;
      }

      //       this.view.AccordionActive1.isVisible = false;
      //       this.view.AccordionActive2.isVisible = false;
      //       this.view.AccordionActive3.isVisible = false;
      this.view.AccordionActive4.isVisible = false;
      this.view.AccordionActive5.isVisible = false;
      this.view.AccordionActive6.isVisible = false;
      this.view.AccordionActive7.isVisible = false;
      this.view.AccordionActive8.isVisible = true;


      /* this.view.Accordion1.height = "0dp";
      this.view.Accordion2.height = "0dp";
      this.view.Accordion3.height = "0dp";*/
      this.view.Accordion4.height = "0dp";
      this.view.Accordion5.height = "0dp";
      this.view.Accordion6.height = "0dp";
      this.view.Accordion7.height = "0dp";
      this.view.flexToolsContainer.height = "246dp";
      animate( this.view.Accordion8, { "height": "84dp"} );

      //this.view.flexBusinessContainer.height = "180dp";

    },

    AccordionButton4Close: function() {


      if( this.view.Accordion4.height == "84dp" ){

        this.view.AccordionActive4.isVisible = false;
        this.view.flexToolsContainer.height = "162dp";
        this.view.Accordion4.height="0dp";

      }

    },
    AccordionButton6Close:function(){

      if( this.view.Accordion6.height == "42dp" ){
        this.view.AccordionActive6.isVisible = false;
        this.view.flexToolsContainer.height = "162dp";
        this.view.Accordion6.height="0dp";

      }
    },
    AccordionButton7Close: function() {
      if( this.view.Accordion7.height == "42dp" ){
        this.view.AccordionActive7.isVisible = false;
        this.view.flexToolsContainer.height = "162dp";
        this.view.Accordion7.height="0dp";

      }
    },
    AccordionButton8Close: function(){
      if( this.view.Accordion8.height == "84dp" ){
        this.view.AccordionActive8.isVisible = false;
        this.view.Accordion8.height = "0dp";
        this.view.flexToolsContainer.height = "162dp";



      }},

    contactusSuccessCallback:function(contactusResponse) {

      kony.print("*************** Entering into contactusSuccessCallback *************************");
      kony.print("Response : " + JSON.stringify(contactusResponse));

      dismissLoading();
      if(contactusResponse.opstatus !== 0){
        showInformationAlert("Info", "Unable to process the request! Please try again later ");
      }else{
        if (!isBlankOrNull(contactusResponse.entries) && !isBlankOrNull(contactusResponse.entries[0])) {
          if(!isBlankOrNull(contactusResponse.entries[0]["customer_care_number"])){
            gblCustomerCareNumber = contactusResponse.entries[0]["customer_care_number"];
          }
          if(!isBlankOrNull(contactusResponse.entries[0]["contact_email"])){
            gblCustomerCareEmail = contactusResponse.entries[0]["contact_email"];
          }
          if( !isBlankOrNull(gblCustomerCareNumber) || !isBlankOrNull(gblCustomerCareEmail)){
            this.view.flxClosePopup.isVisible = false;
            var frmFeedback = new kony.mvc.Navigation("feedbackpage");
            frmFeedback.navigate();	
          }else{
            showInformationAlert("Info", "Unable to process the request! Please try again later ");
          }
        }
      }
      kony.print(" ********** Exiting out of contactusSuccessCallback ********** ");
    },
    contactusErrorCallback:function(errormsg) {
      dismissLoading();
      showInformationAlert("Info", "Unable to process the request! Please try again later ");
      kony.print(" ********** Failure in contactusErrorCallback: " + JSON.stringify(errormsg) + " ********** ");
    },
    goToContactUs: function() {
      callTealiumOnClick("click_action","Contact_US",["linkContactUs"],gblVisitor_imcID);
      if (isNetworkAvailable()) {
        showLoading();
        if (mobileFabricConfiguration.isKonySDKObjectInitialized) {

          mobileFabricConfiguration.integrationObj = mobileFabricConfiguration.konysdkObject.getIntegrationService(mobileFabricConfiguration.integrationServices[4].service);
          var operationName = mobileFabricConfiguration.integrationServices[4].operations[0];
          mobileFabricConfiguration.integrationObj.invokeOperation(operationName, null, null, sideDrawerReference.contactusSuccessCallback,sideDrawerReference.contactusErrorCallback);
        } else {
          sideDrawerReference.initializeMobileFabric_SideDrawer("CONTACT_US");
          //  initializeMobileFabric(context);
        }
      } else {
        //           showInformationAlert("Info", "You are offline!! ");
        this.view.linkContactUs.setEnabled(false);
        this.view.flxToast.setVisibility(true);
        try{
          kony.timer.cancel("timerid123");	
        }catch(e){}
        kony.timer.schedule("timerid123", this.disableFlex.bind(this), 3, false);
      }

    },
    initializeMobileFabric_SideDrawer:function(context) {
      kony.print(" ********** Entering into initializeMobileFabric ********** ");
      try{
        if (isNetworkAvailable()) {
          // showLoading(" ", false, false);
          mobileFabricConfiguration.konysdkObject = new kony.sdk();
          mobileFabricConfiguration.konysdkObject.init(mobileFabricConfiguration.appKey, mobileFabricConfiguration.appSecret, mobileFabricConfiguration.serviceURL, function(response) {
            kony.print(" ********** Success initializeMobileFabricSuccess response : " + JSON.stringify(response) + " ********** ");
            mobileFabricConfiguration.isKonySDKObjectInitialized = true;
            kony.application.dismissLoadingScreen();
            if (!isBlankOrNull(context) && context == "CONTACT_US") {
              sideDrawerReference.goToContactUs();
            }
            else if(!isBlankOrNull(context) && context == "STORE_LOCATOR"){
              sideDrawerReference.goToStoreLocator();
            }

            kony.print("initialization successful");
            kony.print(" ********** Exiting out of initializeMobileFabricSuccess ********** ");
          }, function(error) {
            kony.print(" ********** Entering into initializeMobileFabricFailure ********** ");
            kony.print(" ********** Failure in initializeMobileFabric: " + JSON.stringify(error) + " ********** ");
            kony.application.dismissLoadingScreen();
            status = {"statusCode" : 2, "statusMessage" : "Error in initializing mobile fabric"};
            //alert (" Unable to initialize the application for MF. Please try again. ");
            kony.print(" ********** Exiting out of initializeMobileFabricFailure ********** ");
          });
        } else {
          //alert ("Network unavailable. Please check your network settings. ");
          status = {"statusCode" : 1, "statusMessage" : "Network Unavailable"};
          kony.print(" ********** Exiting out of initializeMobileFabric ********** ");
        }

      }catch(e){
        kony.print("Error occured while initializing the mobilefabric ");
      }

    },
    goToStoreLocator: function() {
      callTealiumOnClick("click_action","Store_locator",["linkStoreLocator"],gblVisitor_imcID);
      if (isNetworkAvailable()) {
        var ntf=new kony.mvc.Navigation("storelocatorpage");
        ntf.navigate();
      }else{    
        this.view.flxToast.setVisibility(true);
        try{
          kony.timer.cancel("timerid123");	
        }catch(e){}
        kony.timer.schedule("timerid123", this.disableFlex.bind(this), 3, false);

      }
      /*if (isNetworkAvailable()) {
        showLoading();
        if (mobileFabricConfiguration.isKonySDKObjectInitialized) {

          mobileFabricConfiguration.integrationObj = mobileFabricConfiguration.konysdkObject.getIntegrationService(mobileFabricConfiguration.integrationServices[4].service);
          var operationName = mobileFabricConfiguration.integrationServices[4].operations[0];
          mobileFabricConfiguration.integrationObj.invokeOperation(operationName, null, null, sideDrawerReference.storeLocatorSuccessCallback,sideDrawerReference.storeLocatorErrorCallback);
        } else {
          sideDrawerReference.initializeMobileFabric_SideDrawer("STORE_LOCATOR");
          //  initializeMobileFabric(context);
        }
      } else {
        //           showInformationAlert("Info", "You are offline!! ");
        this.view.linkContactUs.setEnabled(false);
        this.view.flxToast.setVisibility(true);
        try{
          kony.timer.cancel("timerid");	
        }catch(e){}
        kony.timer.schedule("timerid", this.disableFlex.bind(this), 2, false);
      }*/

    },
    goToFAQ: function() {
      var ntf = new kony.mvc.Navigation("contentdetailpage");
      ntf.navigate();	
    },

  };
});