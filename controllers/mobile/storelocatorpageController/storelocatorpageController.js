define({
  currentForm: this,
  applyBindings: function() {
    thisForm = this;
    var textChanged = false;

    pageComponents = ["SideDrawer","Popup"];
    //this.view.flxToast.setVisibility(false);

    this.view.preShow = this.storeLocatorList.bind(this);

    thisForm.view.flxStoreLocatorRecentSearch.zIndex = 1;
    thisForm.view.flxStoreLocatorSearchResult.opacity = 1;
    this.view.flxOverlay.onTouchStart = function() {
      kony.print("overlay clicked");
    };
    this.view.btnCancel.onClick=this.resetAll.bind(this);
    this.view.btnHome.onClick = this.navigateToHome.bind(this);
    this.view.btnMyContent.onClick = this.navigateToMyContent.bind(this);
    this.view.btnSettings.onClick = this.navigateToSettings.bind(this);
    this.view.btnWebpage.onClick = this.navigateToWebapps.bind(this);
    this.view.onDeviceBack = this.checkGoBack.bind(this);
    this.view.postShow = this.goToStoreLocatorPostshow.bind(this);
    this.view.flxOverlay.onClick=this.hideSearch.bind(this);

    this.view.segStores.onRowClick = this.goToStoreDetails.bind(this);
    swipedStore = "0";
    this.view.flexSideDrawer.left = "-100%";
    //animate( this.view.flexSideDrawer, {"left":"-100%"} );
    //Adding Swipe Gesture
    // this.addSwipeGestureHandler();
    // Clearing any previous search input

    // Search Text Box
    this.view.tbxStoreLocatorSearch.onTouchStart = function() {
      // thisForm.view.tbxStoreLocatorSearch.text="";

      thisForm.populateRecentSearch();
    };


    this.view.tbxStoreLocatorSearch.onTextChange=function(){
      if(this.text.trim()==""){
        this.text = "";
      }
    };
    //thisForm.populateRecentSearch();
    /* App Menu */
    this.view.openSideDrawer.onClick = this.openSideDrawer.bind(this);
    // this.view.SideDrawer.flexCloseButtonContainer.onClick = this.closeSideDrawer.bind(this);
    //this.view.SideDrawer.flexInvisibleTouchArea.onClick = this.closeSideDrawer.bind(this);
    // this.view.goToSearchPage.onClick = this.goToSearchPage.bind(this);
    // Clear Container
    this.view.flxStoreLocatorClear.onTouchStart = function() {
      thisForm.view.flxStoreLocatorClear.text="";
      kony.store.removeItem("recentStores");
      thisForm.populateRecentSearch();
    };
    this.view.tbxStoreLocatorSearch.onDone = function() {
      if (this.text.length > 2 && this.text.length < 36) {
        thisForm.searchFor(this.text);
      } else {
        //thisForm.hideSearch();
        this.setFocus(true);
      }
    };
    // Recent Stores Segment
    this.view.segStoreLocatorRecentSearch.onRowClick = function() {

      var index = this.selectedRowIndex[1];
      var rowData = this.selectedRowItems[0];
      if (rowData.lblRecentStores == "No Search History!") {
        return;
      }
      // Delete the Row
      if (swipedStore == "0" && rowData.imgRecentStores == "icon_cross1.png") {
        thisForm.deleteRow(index, rowData.lblRecentStores);
      }
      // Toggle Action
      else if (swipedStore != "0") {
        rowData.imgRecentStores = swipedStore == "1" ? "icon_cross1.png" : "icon_compass.png";
        swipedStore = "0";
        this.setDataAt(rowData, index);
      }
      // Search
      else {
        if (kony.store.getItem("recentStores") !== null)
          thisForm.searchFor(rowData.lblRecentStores);
        else thisForm.populateRecentSearch();
      }
    };
    // Store Search Result
    this.view.flxStoreLocatorSearchResult.onTouchStart = function() {
      //       if( this.opacity==0.8 )
      //         animate( this,{"opacity":1});
      //       if( thisForm.view.flxStoreLocatorRecentSearch.zIndex==2 )
      //         animate( thisForm.view.flxStoreLocatorRecentSearch, {"zIndex":1});
    };

    thisForm.view.lblStoreLocatorTitle.setFocus();
    dismissLoading();
  },

  resetAll:function(){
    this.view.flxToast.setVisibility(false);
    if(isNetworkAvailable()){
      this.applyBindings();
      this.storeLocatorList();
    }else{
      thisForm.view.flxStoreLocatorRecentSearch.zIndex = 1;
      thisForm.view.flxStoreLocatorSearchResult.opacity = 1;
      thisForm.view.flxOverlay.onTouchStart = function() {
        kony.print("overlay clicked");
      };
      thisForm.view.lblStoreLocatorTitle.setFocus();
      thisForm.view.flxToast.setVisibility(true);
      try{
        kony.timer.schedule("timerid", thisForm.disableFlex.bind(this), 5, false);
      }catch(e){

      }

    }

  },
  hideSearch:function(){
    //this.view.btnCancel.setEnabled(false);
    thisForm.view.flxStoreLocatorRecentSearch.zIndex = 1;
    thisForm.view.flxStoreLocatorSearchResult.opacity = 1;
    thisForm.view.lblStoreLocatorTitle.setFocus();
  },
  checkGoBack: function() {
    if(this.view.SideDrawerWC.flxClosePopupVisible){
      this.view.SideDrawerWC.flxClosePopupVisible=false;
      //this.view.SideDrawer.scrollSideDrawerContainer.enableScrolling=true;
    }else if(this.view.flxStoreLocatorRecentSearch.zIndex == 2){
      thisForm.hideSearch();
    }
    else{
      var prevForm= gblFormBack.pop();
      var navObj = new kony.mvc.Navigation(prevForm);
      navObj.navigate();
    }
  },


  goToStoreLocatorPostshow:function(){
    try{
      //this.PostshowAnalytics(this.view);
      var  additionalArg = ["SideDrawer","Popup"];
    //additionalArg.push(this.view.id);
    kony.print("Tealium form widgets json for storeLocator page :: "+JSON.stringify(additionalArg));
    callTealiumOnScreenLoad(this.view.id,additionalArg,null,false);
    }catch(e){

    }

    try{
      var prevForm = kony.application.getPreviousForm().id ;
      if(prevForm != "nutriliteWow" && prevForm!="storelocatorpage" && prevForm!="storedetailpage" && prevForm!="searchresultspage")
        gblFormBack.push(prevForm);
    }catch(e){

    }
  },
  PostshowAnalytics :function(formName){
    var  additionalArg = ["SideDrawer","Popup"];
    //additionalArg.push(this.view.id);
    kony.print("Tealium form widgets json for storeLocator page :: "+JSON.stringify(additionalArg));
    callTealiumOnScreenLoad(this.view,additionalArg,gblVisitor_imcID);
  },
  navigateToWebapps: function() {
    //this.trackEventAnalytics("click_action", "navigate_webapppage",["btnWebpage"]);
    var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"navigate_webapppage",
        "click_category":"footer"
    	 };
     callTealiumOnClick(onClickDetails,["btnWebpage"], false);
    var ntf = new kony.mvc.Navigation("webapppage");
    ntf.navigate();

  },
  trackEventAnalytics : function(event_name,click_detail , pageComponents){
    var dataOnclickArray = {
      "app_type": getDevicePlatform() , //ios or android sent by OS of the device
      "app_country": "in",
      "app_language": getDeviceLanguage(),
      "app_digitalProperty": "Amway Business app",
      "app_region": "eia",
      "event_name": event_name, //"click_action",
      "click_detail": click_detail,//"header login",
      "click_category":"footer",
      "visitor_imcID":gblVisitor_imcID,
      "page_components": pageComponents
    };
    Tealium.trackEvent("click_action", JSON.stringify(dataOnclickArray), "eia-hub-app");
  },
  navigateToHome: function() {
    //this.trackEventAnalytics("click_action", "navigate_homepage",["btnHome"]);
    var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"navigate_homepage",
        "click_category":"footer"
    	 };
     callTealiumOnClick(onClickDetails,["btnHome"], false);
    var navObj = new kony.mvc.Navigation("homepage");
    navObj.navigate();

  },

  showNotification:function(){
    try{
      thisForm.view.Popup.isVisible=true;
    }catch(e){}
  },

  navigateToMyContent: function() {
    //this.trackEventAnalytics("click_action", "navigate_mycontent" , ["btnMyContent"]);
    var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"navigate_mycontent",
        "click_category":"footer"
    	 };
     callTealiumOnClick(onClickDetails,["btnMyContent"], false);
    var navObj = new kony.mvc.Navigation("mycontentpage");
    navObj.navigate();
  },

  navigateToSettings: function() {
    //this.trackEventAnalytics("click_action", "navigate_settingpage" , ["btnSettings"]);
    var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"navigate_settingpage",
        "click_category":"footer"
    	 };
     callTealiumOnClick(onClickDetails,["btnSettings"], false);
    var navObj = new kony.mvc.Navigation("settingpage");
    navObj.navigate();
  },


  openPhoneService: function(number) {
    try {
      //  var number="123456789";
      kony.phone.dial(number);
    } catch (err) {
      alert("error in dial:: " + err);
    }
  },

  sendEmail: function(email) {

    try {
      // Set the recipients.
      var to = [email];
      var cc = [];
      //var bcc = ["xyz@xyz.com"];

      // Set the subject.
      var sub = "Amway";

      // Message body.
      var msgbody = "";

      //       // Get an image from local storage.
      //       var imgobj1 = getImageFromLocalStorage("xui.png");

      //       // Cropt the image.
      //       imgobj1.cropToRect([10, 10, 100, 100]);

      //       // Attach the image to the message.
      //       var attach = [{
      //           mimetype: "image/png",
      //           attachment: imgobj1.getImageAsRawBytes(kony.image.ENCODE_JPEG),
      //           filename: "filepng"
      //       }];

      // Demonstrates how to print the attachment.
      //kony.print(attach);

      // Send the email.
      if(isIOS()){
        //Invokes function 'checkEmailJs'
        var isMailConfigured = com.checkEmail.checkEmailJs();
        kony.print("isMailConfigured "+isMailConfigured);
        if(!isMailConfigured){
          showInformationAlert("Info", "Mail not Configured");
          return;
        }
      }
      kony.phone.openEmail(to, cc, null, sub, msgbody, null, null);
    } catch (err) {
      alert("error in dial:: " + err);
    }
  },

  openMap: function(latitude, longitude,storename) {
    if(isIOS()){
      kony.application.openURL('https://maps.apple.com/?q='+storename +'&ll='+latitude+','+longitude);
    }else{
      // kony.application.openURL('https://maps.google.com/maps?q='+latitude+','+longitude+'&ll='+latitude+','+longitude);

      kony.application.openURL('https://maps.google.com/maps/?q=loc:'+ latitude +','+ longitude + ' ('+ storename +')');
    }

  },



  goToSearchPage: function() {
    var ntf = new kony.mvc.Navigation("searchresultspage");
    ntf.navigate();
  },

  goToStoreDetails: function() {
    thisForm.disableFlex();
    //callTealiumOnClick("click_action", "StoreLocator_SegmentClicked",["segStores"],gblVisitor_imcID);
     var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"StoreLocator_SegmentClicked"
    	 };
     callTealiumOnClick(onClickDetails,["segStores"], false);
    try{
      kony.timer.cancel("timerid");	
    }catch(e){

    }
    kony.print("row clicked");
    var data = this.view.segStores.selectedRowItems[0];
    kony.print("data : " + JSON.stringify(data));
    var ntf = new kony.mvc.Navigation("storedetailpage");
    ntf.navigate(data);

  },
  openSideDrawer: function() {

    /*
    if( this.view.SideDrawer.Accordion4.height == "84dp" ){

      this.view.SideDrawer.Accordion4.height="0dp";
      this.view.SideDrawer.flexToolsContainer.height = "162dp";
      this.view.SideDrawer.AccordionActive4.isVisible = false;



    }

    if( this.view.SideDrawer.Accordion6.height == "42dp" ){

      this.view.SideDrawer.Accordion6.height="0dp";
      this.view.SideDrawer.flexToolsContainer.height = "162dp";
      this.view.SideDrawer.AccordionActive6.isVisible = false;



    }

    if( this.view.SideDrawer.Accordion7.height == "42dp" ){
      this.view.SideDrawer.Accordion7.height="0dp";
      this.view.SideDrawer.flexToolsContainer.height = "162dp";
      this.view.SideDrawer.AccordionActive7.isVisible = false;



    }

    if( this.view.SideDrawer.Accordion8.height == "84dp" ){


      this.view.SideDrawer.Accordion8.height="0dp";
      this.view.SideDrawer.flexToolsContainer.height = "162dp";
      this.view.SideDrawer.AccordionActive8.isVisible = false;

    }

    */
    animate(this.view.flexSideDrawer, {
      "left": "0%"
    });
  },
  closeSideDrawer: function() {
    animateSideDrawer( controllerReference.view.flexSideDrawer, {"left":"-100%"} );

  },

  /* Custom Code -- Chinmaya */
  addSwipeGestureHandler: function() {
    // Gesture Listner
    try {
      this.view.setGestureRecognizer(2, {
        fingers: 1,
        swipedistance: 50,
        swipevelocity: 75
      }, onGestureFunction); // swipe with default parameters
    } catch (err) {
      kony.print("Error while regestering the gestures: " + err);
    }

    // Gesture Handler
    function onGestureFunction(commonWidget, gestureInfo) {
      try {
        var direction = "";
        var GesType = "" + gestureInfo.gestureType;
        var tapParams = gestureInfo.gesturesetUpParams.taps;
        if (GesType == "2") // Swipe gesture
        {
          var swipeDirection = "" + gestureInfo.swipeDirection;
          swipedStore = (swipeDirection == "1" || swipeDirection == "2") ? swipeDirection : "0";
        }
      } catch (err) {
        kony.print("Error in gesture call back: " + err);
      }
    }
  },
  populateRecentSearch: function() {
    // Handling RecentSearches
    //this.view.btnCancel.setEnabled(true);
    this.view.flxStoreLocatorRecentSearch.zIndex = 2;
    this.view.flxStoreLocatorSearchResult.opacity = 0.8;

    var recentStores = JSON.parse(kony.store.getItem("recentStores"));
    this.view.segStoreLocatorRecentSearch.removeAll();

    // No Recent Search
    if (recentStores === null || recentStores === []) {
      this.view.flxRecentSearch.height = "122dp";
      this.view.segStoreLocatorRecentSearch.height = "51dp";
      recentStores = {
        "lblRecentStores": "No Search History!",
        "imgRecentStores": ""
      };
      this.view.segStoreLocatorRecentSearch.addDataAt(recentStores, 0);
    }
    // Data found in Recent Search
    else {
      this.view.flxRecentSearch.height = (122 + (51 * (recentStores.length - 1))).toString() + "dp";
      this.view.segStoreLocatorRecentSearch.height = (51 * recentStores.length).toString() + "dp";
      for (var i = 0; i < recentStores.length; i++) {
        recentStores[i] = {
          "lblRecentStores": recentStores[i],
          "imgRecentStores": "icon_compass.png"
        };
        this.view.segStoreLocatorRecentSearch.addDataAt(recentStores[i], 0);
      }
    }
  },
  searchFor: function(keywords) {
    try {
      kony.print("jani >>> entered keywords : "+ keywords);
      this.view.tbxStoreLocatorSearch.text = keywords;
      this.view.segStores.removeAll();
      kony.print("jani >>> entered Text : "+ this.view.tbxStoreLocatorSearch.text);
      var recentStores = kony.store.getItem("recentStores");
      kony.print("jani >>> recentStores : "+ recentStores);
      var data = recentStores === null ? [keywords] : JSON.parse(recentStores);
      kony.print("jani >>> data : "+ data);
      if (recentStores !== null) {
        var itemIndex = data.indexOf(keywords); // find the index of current text
        kony.print("jani >>> itemIndex : "+ itemIndex);
        // Altering position in recent search
        if (itemIndex > -1) {
          data.splice(itemIndex, 1); // data is present, so remove it from the array
        }
        data.push(keywords);
      }
      if (data.length > 5) data.shift();

      kony.store.setItem("recentStores", JSON.stringify(data));

    } catch (e) {
      kony("Location Error: " + e);
    }


    if (isBlankOrNull(gblStoreData)) {
      showInformationAlert(getI18Value("StoreLocatorError"));
      return;
    }


    var contentData = gblStoreData;
    keywords = keywords.toLowerCase();
    storeSearchResult = [];
    storeSearchCount = 0;
    kony.print("searched text : " + keywords);

    for (var i = 0; i < contentData.length; i++) {
      var record = contentData[i];
      kony.print("Location is +"+record["lblLocation"]);

      if (record.hasOwnProperty("lblStoreName")) {
        if (record["lblStoreName"].toLowerCase().indexOf(keywords) > -1) {

          storeSearchResult.push(record);
          continue;
        }
      }
      if (record.hasOwnProperty("lblLocation")) {
        if (record["lblLocation"].toLowerCase().indexOf(keywords) > -1) {

          kony.print("Location is 1+"+record["lblLocation"]);
          storeSearchResult.push(record);
          continue;
        }
      }
      if (record.hasOwnProperty("rchAddress")) {
        if (record["rchAddress"].toLowerCase().indexOf(keywords) > -1) {

          storeSearchResult.push(record);
          continue;
        }
      }


    }


    this.view.flxStoreLocatorRecentSearch.zIndex = 1;
    this.view.flxStoreLocatorSearchResult.opacity = 1;
    //this.view.btnCancel.setEnabled(false);
    if (isBlankOrNull(storeSearchResult)) {
      showInformationAlert(getI18Value("StoreLocatorError"));
      return;
    }
    kony.print("Search result : " + storeSearchResult.length + " ::: data : " + JSON.stringify(storeSearchResult));
    storeSearchResult= kony.table.sort(storeSearchResult, "lblState", comparisonfunctionStore2);
    var sortedStoreList = kony.table.sort(storeSearchResult, "lblState",comparisionFunctionStore);
    kony.print("Sorted store list :: "+sortedStoreList);

    if(!isIOS()){
      sortedStoreList.reverse();
    }


    this.view.segStores.setData(sortedStoreList);
  },
  deleteRow: function(i, d) {
    // get text and index of selected row
    var storedData = JSON.parse(kony.store.getItem("recentStores"));
    var storedDataIndex = storedData.indexOf(d);

    if (storedDataIndex > -1) {
      storedData.splice(storedDataIndex, 1);

      if (storedData.length === 0) kony.store.removeItem("recentStores");
      else {
        kony.store.setItem("recentStores", JSON.stringify(storedData));

        this.view.segStoreLocatorRecentSearch.removeAt(i);

        this.view.flxRecentSearch.height = (parseInt(this.view.flxRecentSearch.height.split('d')[0]) - 51).toString() + "dp";
        this.view.segStoreLocatorRecentSearch.height = (parseInt(this.view.segStoreLocatorRecentSearch.height.split('d')[0]) - 51).toString() + "dp";
      }
    }
    if (kony.store.getItem("recentStores") === null) {
      this.populateRecentSearch();
    }
  },
  /* Custom Code End -- Chinmaya */

  getAllStoresList : function(){
    kony.print("Inside getAllStoresList function : ");
    if (isNetworkAvailable()) {
      kony.print("Network available for getAllStores : ");
      showLoading();
      if (mobileFabricConfiguration.isKonySDKObjectInitialized) {
        kony.print("Ïnside if condition");
        mobileFabricConfiguration.integrationObj = mobileFabricConfiguration.konysdkObject.getIntegrationService(mobileFabricConfiguration.integrationServices[4].service);
        var operationName = mobileFabricConfiguration.integrationServices[4].operations[4];
        var headers = {};
        var data = {};
        kony.print("Operation name : " + operationName);
        mobileFabricConfiguration.integrationObj.invokeOperation(operationName, headers, data, this.getAllStoresListSuccessCallBack, this.getAllStoresListErrorCallBack);
      } else {
        kony.print("Kony SDK obj is not initialized for getAllStores :");
        this.initializeMF("GET_STORELOCATOR_PAGE_DATA");
      }
    } else {
      //this.view.flxToast.isVisible true;
      kony.print("Network not available for getAllStores : ");

    }

  },

  getAllStoresListSuccessCallBack : function(getAllStoresListResponse) {
    if (getAllStoresListResponse["opstatus"] === 0) {
      kony.print("*************** Entering into getAllStoresListSuccessCallBack *************************");
      if (getAllStoresListResponse.storesList !== null && getAllStoresListResponse.storesList.length > 0) {
        var allStoresList = getAllStoresListResponse.storesList;
        kony.print("jani >>>>> Data is : " + JSON.stringify(allStoresList));
        var recordData = {};
        var storeSegment = [];
        this.view.segStores.removeAll();
        for(var i= 0;i< allStoresList.length;i++){

          var title = allStoresList[i]["title"];
          var addressLine1 = allStoresList[i]["addressLine1"];
          var addressLine2 = allStoresList[i]["addressLine2"];
          var addressLine3 = allStoresList[i]["addressLine3"];
          var city = allStoresList[i]["city"];
          var state = allStoresList[i]["state"];
          var address = addressLine1;

          if(!isBlankOrNull(addressLine2)){
            address+= ','+addressLine2;
          }
          if(!isBlankOrNull(addressLine3)){
            address+= '<br/>'+addressLine3;

          }
          address+= '<br/>' + city + '<br/>' + state;;

          var email = allStoresList[i]["email"];
          var contactNumber = allStoresList[i]["contactNumber"];
          var operatingHours = allStoresList[i]["operatingHours"];
          var longitude = allStoresList[i]["longitude"];
          var latitude = allStoresList[i]["latitude"];
          var storeImage = allStoresList[i]["storeImage"];

          kony.print(title + " address  "+address+" city "+city+" state "+state);
          kony.print("latitude value "+latitude+" longitude value "+longitude);
          recordData = {
            "lblLocation"	:city,
            "lblStoreName"	:title,
            "rchAddress"	:address,
            "lblOperatingHours":operatingHours,
            "imgStore"		:storeImage,
            "btnphoneCall"	: {
              "info"	: {
                "phone":contactNumber
              },
              onClick: function() {
                //callTealiumOnClick("click_action", "StoreLocator_Phone",["btnphoneCall"],gblVisitor_imcID);
                var onClickDetails = {
                    "event_name":"click_action",
                    "click_detail":"StoreLocator_Phone"
                     };
                 callTealiumOnClick(onClickDetails,["btnphoneCall"], false);
                thisForm.openPhoneService(this.info.phone);
              },
              isVisible:true
            },
            "btnphoneCallImage":{
              isVisible:true
            },
            "btnsendEmailImage":{
              isVisible:true
            },
            "btnmapOpenImage":{
              isVisible:true
            },
            "btnsendEmail"	: {
              "info"	: {
                "email": email
              },
              onClick: function() {
                //callTealiumOnClick("click_action", "StoreLocator_Email",["btnsendEmail"],gblVisitor_imcID);
                var onClickDetails = {
                    "event_name":"click_action",
                    "click_detail":"StoreLocator_Email"
                     };
                 callTealiumOnClick(onClickDetails,["btnsendEmail"], false);
                thisForm.sendEmail(this.info.email);
              },
              isVisible:true
            },
            "btnmapOpen"	: {
              "info"	: {
                "latitude": latitude,
                "longitude": longitude,
                "storeName":title
              },
              onClick: function() {
               // callTealiumOnClick("click_action", "StoreLocator_Map",["btnmapOpen"],gblVisitor_imcID);
                var onClickDetails = {
                    "event_name":"click_action",
                    "click_detail":"StoreLocator_Map"
                     };
                 callTealiumOnClick(onClickDetails,["btnmapOpen"], false);
                thisForm.openMap(this.info.latitude, this.info.longitude,this.info.storeName);
              },
              isVisible:true
            },
            "lblState": state
          };
          gblStoreData.push(recordData);

        }

        var sortedStoreList;
        if(isIOS()){
          gblStoreData= kony.table.sort(gblStoreData, "lblStoreName", comparisonfunctionStore2);
          sortedStoreList = kony.table.sort(gblStoreData, "lblState",comparisionFunctionStore);

        }else{

          // gblStoreData= kony.table.sort(gblStoreData, "lblStoreName", comparisonfunctionStore2);
          sortedStoreList = kony.table.sort(gblStoreData, "lblState",comparisionFunctionStore);      

          var temp={};
          for(var a=0;a<sortedStoreList.length;a++){
            if(temp.hasOwnProperty(sortedStoreList[a]["lblState"])){
              temp[sortedStoreList[a]["lblState"]].push(sortedStoreList[a]);
            }else{
              temp[sortedStoreList[a]["lblState"]]=[];
              temp[sortedStoreList[a]["lblState"]].push(sortedStoreList[a]);
            }
          }

          for(var _ in temp){
            var arr=temp[_];
            //arr= kony.table.sort(arr , "lblStoreName",comparisionFunctionStore2);            
            //sorting stores
            for(var j=0;j<arr.length;j++){
              for(var k=j+1;k<arr.length;k++){
                if(arr[j]["lblStoreName"]> arr[k]["lblStoreName"]){
                  var tmp=arr[j];
                  arr[j]=arr[k];
                  arr[k]=tmp;
                }
              }
            }
            temp[_]=arr;
          }

          sortedStoreList=[];
          for(var c in temp){
            for(var d=0;d<temp[c].length;d++){
              sortedStoreList.push(temp[c][d]);
            }
          }
          kony.print("stores are "+ JSON.stringify(temp));
        }

        kony.print("Sorted store list global :: "+JSON.stringify(sortedStoreList));

        this.view.segStores.setData(sortedStoreList);
      }
    }
    dismissLoading();
  },

  getAllStoresListErrorCallBack: function(errormsg) {
    dismissLoading();
    kony.print(" ********** Failure in getAllStoresListErrorCallBack: " + JSON.stringify(errormsg) + " ********** ");
  },

  initializeMF: function(context) {
    kony.print(" ********** Entering into initializeMF ********** ");
    if (isNetworkAvailable()) {
      showLoading();
      mobileFabricConfiguration.konysdkObject = new kony.sdk();
      mobileFabricConfiguration.konysdkObject.init(mobileFabricConfiguration.appKey, mobileFabricConfiguration.appSecret, mobileFabricConfiguration.serviceURL, function(response) {
        kony.print(" ********** Entering into initializeMFSuccess ********** ");
        kony.print(" ********** Success initializeMFSuccess response : " + JSON.stringify(response) + " ********** ");
        mobileFabricConfiguration.isKonySDKObjectInitialized = true;
        dismissLoading();
        kony.print("initialization successful");
        if (context == "GET_STORELOCATOR_PAGE_DATA") {
          thisForm.getAllStoresList();
        }
        kony.print(" ********** Exiting out of initializeMFSuccess ********** ");
      }, function(error) {
        kony.print(" ********** Entering into initializeMFFailure ********** ");
        kony.print(" ********** Failure in initializeMF: " + JSON.stringify(error) + " ********** ");
        dismissLoading();
        kony.print(" ********** Exiting out of initializeMFFailure ********** ");
      });
    } else {
      //this.view.flxToast.isVisible true;
      //       try{
      //         kony.timer.cancel("timerid");	
      //       }catch(e){}
      //       kony.timer.schedule("timerid", this.disableFlex.bind(this), 3, false);
    }
    kony.print(" ********** Exiting out of initializeMF ********** ");
  },


  storeLocatorList : function(){
    try{

      if(!storeLocatorHamburger){
        this.view.SideDrawerWC.createSideDrawer();
        storeLocatorHamburger=true;
      }

      this.view.flxToast.setVisibility(false);
      this.view.SideDrawerWC.flxClosePopupVisible=false;
      // this.view.SideDrawer.scrollSideDrawerContainer.contentOffset = {x:"0",y:"0"};
      // this.view.SideDrawer.scrollSideDrawerContainer.enableScrolling = true;
      gblCurrentForm = "storelocatorpage";
      controllerReference=this;


      if(!comingFromStoreDetail){
        thisForm.view.tbxStoreLocatorSearch.text="";
        this.view.segStores.removeAll();
        gblStoreData = [];

        if(isNetworkAvailable()){
          this.getAllStoresList();
        }else{
          this.view.flxToast.setVisibility(true);
          try{
            kony.timer.schedule("timerid", this.disableFlex.bind(this), 5, false);
          }catch(e){

          }

        }

      }else{
        comingFromStoreDetail=false;
      }
    }catch(e){
      kony.print("Exception occured in storeLocatorList ::"+e);
    }



  },

  disableFlex: function() {
    this.view.flxToast.setVisibility(false);
    try{
      kony.timer.cancel("timerid");	
    }catch(e){}
  },

  onNavigate: function() {
    showLoading("", "", "");
    this.applyBindings();
  },


  /*
  aboutPersonalCareData : function() {

    gblFilterCategory = gblPersonalCare;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },

  aboutNutriliteData : function() {

    gblFilterCategory = gblNutrilite;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },

  aboutBeautyData : function() {

    gblFilterCategory = gblBeauty;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },

  aboutAtHomeData : function() {

    gblFilterCategory = gblAtHome;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },

  aboutMoreProductsData : function() {

    gblFilterCategory = gblMoreProducts;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },

  aboutAmwayData : function() {

    gblFilterCategory = gblAboutAmway;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },

  aboutLearning : function() {

    gblFilterCategory = gblLearning;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutSeminars : function() {

    gblFilterCategory = gblSeminars;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutBrochures : function() {

    gblFilterCategory = gblBrochures;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutRecognition : function() {

    gblFilterCategory = gblRecognition;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutOppurtunity : function() {

    gblFilterCategory = gblOpportunity;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutCorporateSocial : function() {

    gblFilterCategory = gblCorporate;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutMedia : function() {

    gblFilterCategory = gblMedia;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutManufacturing : function() {

    gblFilterCategory = gblManufacturing;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutAwards : function() {

    gblFilterCategory = gblAwards;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutFacts : function() {

    gblFilterCategory = gblFactSheets;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },
  aboutHeritage : function() {

    gblFilterCategory = gblheritage;
    controllerReference.closeSideDrawer();
    this.navigateToHomePage();

  },

  */
  navigateToHomePage : function() {
    var navObj = new kony.mvc.Navigation("homepage");
    navObj.navigate();
  }



});