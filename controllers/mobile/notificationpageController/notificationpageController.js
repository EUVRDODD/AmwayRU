define({ 
  _init : function () {
    this.applyBindings();
  },
  onNavigate : function () {
    kony.print("inside onNavigate notificationPage");
    segment="";
	curTab=0;
    this._init();
  },

  showNotification:function(){
    try{
      controllerReference.view.Popup.isVisible=true;
    }catch(e){}
  },

  applyBindings:function(){
    try{
      this.view.preShow = this.frmNotification_preShow.bind( this );
      this.view.postShow = this.frmNotificationPostShow.bind( this );

      controllerReference=this;
      try {
        notifications = JSON.parse(kony.store.getItem("notifications"));
        if (notifications === null) {
          kony.store.setItem("notifications", "{}");
          notifications = {};
        }
      } 
      catch (e) {
        kony.print("Error getting notifications interactions" + e);
      }

      try {
        notificationOfflineData = JSON.parse(kony.store.getItem("notificationOfflineData")) || [];
      } 
      catch (e) {
        kony.print("Error getting notifications interactions" + e);
      }



      this.resetToAllTab();



      this.view.flxClosePopup.onTouchStart=function(){
        kony.print("");
      };
      this.view.flxToast.isVisible=false;
      this.view.segNotifications.onRowClick=this.segmentOnRowClickAll.bind(this);
      this.view.segReadNotifications.onRowClick=this.segmentOnRowClickRead.bind(this);
      this.view.segUnReadNotifications.onRowClick=this.segmentOnRowClickUnread.bind(this);
      this.view.btnYes.onClick=this.HidePopUp.bind(this);
      this.view.NotifOptions.CancelButton.onClick = this.hideHiddenOptions.bind( this );
      this.view.TabButton2.onClick = this.frmNotification_TabButton2_onTouchEnd.bind( this );
      this.view.TabButton3.onClick = this.frmNotification_TabButton3_onTouchEnd.bind( this );
      this.view.TabButton1.onClick = this.frmNotification_TabButton1_onTouchEnd.bind( this ); 
      this.view.onDeviceBack=this._goBack.bind(this);
      controllerReference=this;


      controllerReference.view.btnYesDelete.onClick=this.deleteNotification.bind(this);
      controllerReference.view.btnNoDelete.onClick=this.dismiss.bind(this);

      this.view.flxOverlay.isVisible=false;
      this.view.flxOverlay.onTouchStart=function(){
        kony.print("");
      }

    }catch(e){
      kony.print("Exception is "+ e);
    }
  },


  deleteNotification:function(){

    if(curTab===0){
      selectedData = controllerReference.view.segNotifications.selectedItems[0];
      selectedIndex = controllerReference.view.segNotifications.selectedIndex[1];       
      controllerReference.view.segNotifications.removeAt(selectedIndex,0);
      // removeFromRead(selectedData);
      notificationData.splice(selectedIndex,1);

      controllerReference.hideHiddenOptions();

      var fetchId=selectedData["lblFetchId"]["text"];
      notifications[fetchId][1] = 1; //read delete
      kony.store.setItem("notifications", JSON.stringify(notifications));

      if(!notifications[fetchId][0]){
        messageCount--;
        kony.store.setItem("messageCount", messageCount+"");
      }

      if(notificationData.length==0){
        controllerReference.view.lblNoMessages.isVisible=true;
      }
    }
    else if(curTab===1){

      selectedData = controllerReference.view.segReadNotifications.selectedItems[0];
      selectedIndex = controllerReference.view.segReadNotifications.selectedIndex[1];       
      controllerReference.view.segReadNotifications.removeAt(selectedIndex,0);

      readMes.splice(selectedIndex,1);
      var allSegmentIndex=UpdateAll(selectedData);
      allSegmentIndex=parseInt(allSegmentIndex);
      notificationData.splice(allSegmentIndex,1);
      controllerReference.hideHiddenOptions();
      if(readMes.length==0){
        controllerReference.view.lblNoMessages.isVisible=true;
      }

      var fetchId=selectedData["lblFetchId"]["text"];
      notifications[fetchId][1] = 1; //read delete
      kony.store.setItem("notifications", JSON.stringify(notifications));

    }
    else{
      selectedData = controllerReference.view.segUnReadNotifications.selectedItems[0];
      selectedIndex = controllerReference.view.segUnReadNotifications.selectedIndex[1];       
      controllerReference.view.segUnReadNotifications.removeAt(selectedIndex,0);
      unReadMessages.splice(selectedIndex,1);
      var allSegmentIndex=UpdateAll(selectedData);
      allSegmentIndex=parseInt(allSegmentIndex);
      notificationData.splice(allSegmentIndex,1);
      controllerReference.hideHiddenOptions();

      if(unReadMessages.length==0){
        controllerReference.view.lblNoMessages.isVisible=true;
      }
      var fetchId=selectedData["lblFetchId"]["text"];
      notifications[fetchId][1] = 1; //read delete
      kony.store.setItem("notifications", JSON.stringify(notifications));
      messageCount--;
      kony.store.setItem("messageCount", messageCount+"");
    }

    controllerReference.view.flxMainPopup.isVisible=false;   

  },


  dismiss:function(){
    controllerReference.view.flxMainPopup.isVisible=false; 
    controllerReference.hideHiddenOptions();
  },


  _goBack:function(){

    if(this.view.flxClosePopup.isVisible){
      this.view.flxClosePopup.isVisible=false;
    }else if(this.view.flxMainPopup.isVisible){
      this.view.flxMainPopup.isVisible=false;
    }else{
      var ntf="";
      if(kony.application.getPreviousForm().id=="loadingscreenpage" || kony.application.getPreviousForm().id=="loginpage"){
        ntf=new kony.mvc.Navigation("homepage");
      }else{
        ntf=new kony.mvc.Navigation(this.getPreviousForm());
      }

      ntf.navigate();
    }
  },

  frmNotificationPostShow : function(){
    try{
    var  additionalArg = ["Notifications","NotifOptions","Popup"];
    kony.print("Tealium form widgets json for notification page :: "+JSON.stringify(additionalArg));
    callTealiumOnScreenLoad(this.view.id,additionalArg,null,false);
      
    }catch(ex){
      kony.print("Notification postShow Exeption "+ex);
    }
  },
  frmNotification_preShow: function(){
    try{
      //this.view.flxSliderTab1.isVisible=true;
       this.view.lblMessageContent.doLayout=this.onDoLayput;
      this.view.segNotifications.contentOffset={x:"0%",y:"0%"};
      this.view.segReadNotifications.contentOffset={x:"0%",y:"0%"};
      this.view.segUnReadNotifications.contentOffset={x:"0%",y:"0%"};
      this.view.flxMainPopup.onTouchStart=function(){
        kony.print("");
      }
      if(kony.os.deviceInfo().name=="iPad"){

        this.view.CopyflxMessagePage0b4bf8a6a795544.height="45%";
        this.view.flxMessagePage.height="55%";
      }

      showLoading("Getting Messages", false, false);
      kony.print("@@ frmNotification_preShow ");
      this.view.hiddenOptionsContainer.bottom="-105dp";

      notificationData = [];

      this.view.flxClosePopup.isVisible=false;
      this.view.segNotifications.isVisible=false;



      if(!isNetworkAvailable())
      {



        for(var i=0;i<notificationOfflineData.length;i++){

          var fetchId=notificationOfflineData[i]["lblFetchId"]["text"];
          if(!notifications[fetchId][1]){
            notificationOfflineData[i].MoreOptions.onClick=this.showHiddenOptions;

            notificationData.push(notificationOfflineData[i]);
          }

        }

        this.view.segNotifications.setData(notificationData);
        if(notificationData.length==0){
          this.view.lblNoMessages.isVisible=true;
        }else{
          this.view.lblNoMessages.isVisible=false;
          this.view.segNotifications.isVisible=true; 
        }
        dismissLoading();
      }
      else{

        var startIndex=0;
        var pageSize=50;    

        try{
          if(mobileFabricConfiguration.isKonySDKObjectInitialized){
            mobileFabricConfiguration.konysdkObject.getMessagingService().fetchAllMessages(startIndex,
                                                                                           pageSize,
                                                                                           function(response) {
              kony.print("Fetched all messages :" + JSON.stringify(response));
              controllerReference.populateSegment(response);
            },
                                                                                           function(error) {
              kony.print("Failed to fetch messages : " + JSON.stringify(error));
            }

                                                                                          );
          }else{
            controllerReference.initializeMobileFabric();
          }

        }catch(e){
          dismissLoading();
        }
      }




    }catch(e){
      kony.print("Exception in preshow is "+ e);
    }
  },
  initializeMobileFabric:function() {
    kony.print(" ********** Entering into initializeMobileFabric ********** ");
    try{
      if (isNetworkAvailable()) {
        // showLoading(" ", false, false);
        mobileFabricConfiguration.konysdkObject = new kony.sdk();
        mobileFabricConfiguration.konysdkObject.init(mobileFabricConfiguration.appKey, mobileFabricConfiguration.appSecret, mobileFabricConfiguration.serviceURL, function(response) {
          kony.print(" ********** Success initializeMobileFabricSuccess response : " + JSON.stringify(response) + " ********** ");
          mobileFabricConfiguration.isKonySDKObjectInitialized = true;
          kony.application.dismissLoadingScreen();

          if(segment=="all"){
            controllerReference.segmentOnRowClickAll();
          }else if(segment=="read"){
            controllerReference.segmentOnRowClickRead();
          }else if(segment=="unread"){
            controllerReference.segmentOnRowClickUnread();
          }else{
            controllerReference.fetchAll();
          }


          kony.print("initialization successful");
          kony.print(" ********** Exiting out of initializeMobileFabricSuccess ********** ");
        }, function(error) {
          kony.print(" ********** Entering into initializeMobileFabricFailure ********** ");
          kony.print(" ********** Failure in initializeMobileFabric: " + JSON.stringify(error) + " ********** ");
          kony.application.dismissLoadingScreen();
          status = {"statusCode" : 2, "statusMessage" : "Error in initializing mobile fabric"};
          kony.print(" ********** Exiting out of initializeMobileFabricFailure ********** ");
        });
      } else {
        kony.application.dismissLoadingScreen();
        status = {"statusCode" : 1, "statusMessage" : "Network Unavailable"};
        kony.print(" ********** Exiting out of initializeMobileFabric ********** ");
      }

    }catch(e){
      kony.print("Error occured while initializing the mobilefabric ");
    }

  },

  fetchAll:function(){
    kony.print("Inside ALl");
    var startIndex=0;
    var pageSize=50;  
    if(mobileFabricConfiguration.isKonySDKObjectInitialized){
      mobileFabricConfiguration.konysdkObject.getMessagingService().fetchAllMessages(startIndex,
                                                                                     pageSize,
                                                                                     function(response) {
        kony.print("Fetched all messages :" + JSON.stringify(response));
        controllerReference.populateSegment(response);
      },

                                                                                     function(error) {
        kony.print("Failed to fetch messages : " + JSON.stringify(error));
      }

                                                                                    );

    }else{
      controllerReference.initializeMobileFabric();
    }

  },

  populateSegment: function(response){
    kony.print("@@@ populateSegment");
    response=response["messages"];
    messageCount=0;
    var temp ={};
    kony.print("No of records are - "+response.length);

    for(var i=0;i<response.length;i++){
      if(response[i]["status"]=="Submitted"){
        if (!notifications.hasOwnProperty(response[i]["fetchId"])) {

          notifications[response[i]["fetchId"]] = [0, 0]; //read delete

          kony.store.setItem("notifications", JSON.stringify(notifications));
        }
        //          if( mid!= "" ){

        //           notifications[mid][0] = 1;

        //           kony.store.setItem("notifications", JSON.stringify(notifications));

        //     }

        kony.print("mid in notification page is- "+ mid);

        if(!notifications[response[i]["fetchId"]][1]){
          var text_message="";



          text_message=response[i]["content"].split("\n")[0];

          if(notifications[response[i]["fetchId"]][0] == 1){
            kony.print("notification time saved is "+ notifications[response[i]["fetchId"]][2]);
            /*  // var date=new Date();
            //var diff=Number(date.getTime())- Number(notifications[response[i]["fetchId"]][2]);
           // diff=parseInt(diff/60000);
          //  kony.print("Difference is "+ diff);
            var timeStamp="";
            if(diff <= 0){
              timeStamp="Just now";
            }else if(diff >0 && diff< 60){
              timeStamp= diff + " minute ago";
            }else if(diff >=60 && diff <1440){
              diff= parseInt(diff/60);
              timeStamp= diff + " hours ago";
            }else{
              diff= parseInt(diff/(60*24));
              timeStamp= diff + " days ago";
            }*/

            temp =
              {
              "imgNotifcation" : {"src":"icon_broadcast.png"},
              //"lblTitle" : {"text" : "Amway"},
              "lblUnreadMsg" : {"text": "Read Message"},
              //  "lblTimeStamp" : {isVisible:true , "text": timeStamp},
              "MoreOptions" : {"isVisible": true,onClick:this.showHiddenOptions},
              "imgMore":{"src":"icon_hellip.png"},
              "imgDot" : {"isVisible": true},    
              "rchTextHidden":{"text":text_message},
              "rchTxtMsg": {"text": text_message},
              "lblFetchId":{"text":response[i]["fetchId"]},
              template : "flxReadNotification"
            };
            //addToRead(temp);
            notificationData.push(temp);
          }
          else{
            temp =
              {
              "imgLogo" : {"src":"icon_amway.png"},
              //"lblTitle" : {"text" : "Amway"},
              "lblUnreadMsg" : {"text": "Unread Message"},
              // "lblTimeStamp" : {isVisible:false , "text": "Just now"},
              "MoreOptions" : {"isVisible": true,onClick:this.showHiddenOptions},
              "imgMore":{"src":"icon_hellip.png"},
              "imgDot" : {"isVisible": true},    
              "rchTextHidden":{"text":text_message},
              "rchTxtMsg": {"text": text_message},
              "lblFetchId":{"text":response[i]["fetchId"]},
              template : "flxUnreadNotification"
            };
            //addToUnRead(temp);
            messageCount++;
            notificationData.push(temp);
          }



        }

      }     
    }

    kony.store.setItem("notificationOfflineData", JSON.stringify(notificationData));
    kony.store.setItem("messageCount", messageCount+"");
    this.view.segNotifications.setData(notificationData);
    if(notificationData.length==0){
      this.view.lblNoMessages.isVisible=true;
    }else{
      this.view.lblNoMessages.isVisible=false;
      this.view.segNotifications.isVisible=true; 
    }

    try{
      kony.timer.cancel("loading");
    }catch(e){

    }
    dismissLoading();
  },
  showHiddenOptions: function(){
    controllerReference.view.flxToast.setVisibility(false);
    this.view.flxOverlay.isVisible=true;
    animate( this.view.hiddenOptionsContainer, {"bottom": "0dp"} );
  },
  hideHiddenOptions: function(){
    this.view.flxOverlay.isVisible=false;
    animate( this.view.hiddenOptionsContainer, {"bottom": "-105dp"} );
  },



  frmNotification_TabButton2_onTouchEnd : function(){
    //callTealiumOnClick("click_action","read",["TabButton2"],gblVisitor_imcID);
    var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"read"
    	 };
    callTealiumOnClick(onClickDetails,["TabButton2"], false);
    if(curTab!=1){
    //alert("@@ inside TabButton2"); 
    this.view.segReadNotifications.isVisible=false;
    showLoading("Getting Messages", false, false);
    
    if(curTab===0){
      animate2(this.view.flxSliderTab1,{centerX:"50%"},{centerX:"150%"},0.2);
      animate2(this.view.flxSliderTab2,{centerX:"-50%"},{centerX:"50%"},0.4);
    }else if(curTab==2){
      animate2(this.view.flxSliderTab3,{centerX:"50%"},{centerX:"-50%"},0.2);
      animate2(this.view.flxSliderTab2,{centerX:"150%"},{centerX:"50%"},0.4);
    }
    animate(this.view.flxAll,{"left":"-100%"},0.3);
   // this.view.flxSliderTab1.isVisible=false;

    animate(this.view.flxUnread,{"left":"100%"},0.3);
   // this.view.flxSliderTab3.isVisible=false;

    //animate(this.view.flxRead,{"left":"0%"},0.25);

    params={
      "left":"0%"
    }
    params.stepConfig = {
      "timingFunction": kony.anim.EASE
    };
    this.view.flxRead.animate(
      kony.ui.createAnimation({
        "100": params,
      }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.40
      }, {
        "animationEnd": this.setDataRead
      });

    
    
    //this.view.flxSliderTab2.isVisible=true;


    }

  },
  setDataRead:function(){
    curTab=1;
    controllerReference.setDataOnSegments("read");  
  },

  frmNotification_TabButton3_onTouchEnd : function(){
    //callTealiumOnClick("click_action","unread",["TabButton3"],gblVisitor_imcID);
    var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"unread"
    	 };
    callTealiumOnClick(onClickDetails,["TabButton3"], false);
    if(curTab!=2){
    //alert("@@ inside TabButton3");
    this.view.segUnReadNotifications.isVisible=false;
    showLoading("Getting Messages", false, false);
    
    if(curTab===0){
       animate2(this.view.flxSliderTab1,{centerX:"50%"},{centerX:"150%"},0.2);
      animate2(this.view.flxSliderTab3,{centerX:"-50%"},{centerX:"50%"},0.4);
    }
    else if(curTab==1){
       animate2(this.view.flxSliderTab2,{centerX:"50%"},{centerX:"150%"},0.2);
      animate2(this.view.flxSliderTab3,{centerX:"-50%"},{centerX:"50%"},0.4);
    }
    animate(this.view.flxAll,{"left":"-200%"},0.3);
   // this.view.flxSliderTab1.isVisible=false;

    // animate(this.view.flxUnread,{"left":"0%"},0.25);



    animate(this.view.flxRead,{"left":"-100%"},0.3);
    //this.view.flxSliderTab2.isVisible=false;

    params={
      "left":"0%"
    }
    params.stepConfig = {
      "timingFunction": kony.anim.EASE
    };
    this.view.flxUnread.animate(
      kony.ui.createAnimation({
        "100": params,
      }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.40
      }, {
        "animationEnd": this.setDataunRead
      });



  //  this.view.flxSliderTab3.isVisible=true;

    }

  },

  setDataunRead:function(){
    curTab=2;
    controllerReference.setDataOnSegments("unread");
  },
  frmNotification_TabButton1_onTouchEnd : function(){
    //alert("@@ inside TabButton1");
    //callTealiumOnClick("click_action","all",["TabButton1"],gblVisitor_imcID);
    var onClickDetails = {
        "event_name":"click_action",
        "click_detail":"all"
    	 };
    callTealiumOnClick(onClickDetails,["TabButton1"], false);
    if(curTab!=0){
    this.view.segNotifications.isVisible=false;
    showLoading("Getting Messages", false, false);
    
    if(curTab==1){
       animate2(this.view.flxSliderTab2,{centerX:"50%"},{centerX:"-50%"},0.2);
      animate2(this.view.flxSliderTab1,{centerX:"150%"},{centerX:"50%"},0.4);
    }
    else if(curTab==2){
       animate2(this.view.flxSliderTab3,{centerX:"50%"},{centerX:"-50%"},0.2);
      animate2(this.view.flxSliderTab1,{centerX:"150%"},{centerX:"50%"},0.4);
    }
    
    
    params={
      "left":"0%"
    }
    params.stepConfig = {
      "timingFunction": kony.anim.EASE
    };
    this.view.flxAll.animate(
      kony.ui.createAnimation({
        "100": params,
      }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.40
      }, {
        "animationEnd": this.setDataAll
      });


   // this.view.flxSliderTab1.isVisible=true;

    animate(this.view.flxUnread,{"left":"200%"},0.3);
  //  this.view.flxSliderTab3.isVisible=false;

    animate(this.view.flxRead,{"left":"100%"},0.3);
   // this.view.flxSliderTab2.isVisible=false;



    }
  },

  setDataAll:function(){
    curTab=0;
    controllerReference.setDataOnSegments("all");
  },

  resetToAllTab:function(){

	curTab=0;
    this.view.flxAll.left="0%"
    this.view.flxSliderTab1.centerX="50%";

    this.view.flxUnread.left="200%";
    this.view.flxSliderTab2.centerX="-50%";

    this.view.flxRead.left="100%"
    this.view.flxSliderTab3.centerX="-50%";
  },
  setDataOnSegments:function(tabName){

    notifications = JSON.parse(kony.store.getItem("notifications"));

    if(tabName=="all"){

      this.view.lblNoMessages.isVisible=false;    

      this.view.segNotifications.setData(notificationData);

      if(notificationData.length==0){
        this.view.lblNoMessages.isVisible=true;
      }else{
        this.view.lblNoMessages.isVisible=false;    

        this.view.segNotifications.isVisible=true; 
      }


    }
    else if(tabName=="read"){

      this.view.lblNoMessages.isVisible=false;  


      readMes=[];
      for(var i =0;i<notificationData.length;i++){
        var fetchId=notificationData[i]["lblFetchId"]["text"];
        if(notifications[fetchId][0]){
          readMes.push(notificationData[i]);
        }
      }
      this.view.segReadNotifications.setData(readMes);

      if(readMes.length==0){
        this.view.lblNoMessages.isVisible=true;
      }else{
        this.view.lblNoMessages.isVisible=false;    

        this.view.segReadNotifications.isVisible=true;
      }







    }
    else if(tabName=="unread"){

      this.view.lblNoMessages.isVisible=false;   
      unReadMessages = [];



      for(var i =0;i<notificationData.length;i++){
        var fetchId=notificationData[i]["lblFetchId"]["text"];
        if(!notifications[fetchId][0]){
          unReadMessages.push(notificationData[i]);
        }
      }

      this.view.segUnReadNotifications.setData(unReadMessages);
      if(unReadMessages.length==0){
        this.view.lblNoMessages.isVisible=true;
      }else{
        this.view.lblNoMessages.isVisible=false;    

        this.view.segUnReadNotifications.isVisible=true;
      }





    }



    dismissLoading();
  },

  segmentOnRowClickAll:function(){
    this.view.FlexScrollContainer0d61740b6c7624f.contentOffset={x:"0%", y:"0%"};

    if(isNetworkAvailable()){
      this.callMessageService("all");
    }else{

      controllerReference.view.flxToast.setVisibility(true);
      try{
        kony.timer.cancel("timerid");	
      }catch(e){}
      kony.timer.schedule("timerid", this.disableFlex.bind(this), 3, false);

    }




  },

  disableFlex: function(){
    controllerReference.view.flxToast.setVisibility(false);
    try{
      kony.timer.cancel("timerid");	
    }catch(e){}

  },

  segmentOnRowClickRead:function(){

    this.view.FlexScrollContainer0d61740b6c7624f.contentOffset={x:"0%", y:"0%"};

    if(isNetworkAvailable()){
      this.callMessageService("read");
    }else{

      controllerReference.view.flxToast.setVisibility(true);
      try{
        kony.timer.cancel("timerid");	
      }catch(e){}
      kony.timer.schedule("timerid", this.disableFlex.bind(this), 3, false);

    }

  },

  segmentOnRowClickUnread:function(){

    this.view.FlexScrollContainer0d61740b6c7624f.contentOffset={x:"0%", y:"0%"};
    if(isNetworkAvailable()){
      this.callMessageService("unread");
    }else{

      controllerReference.view.flxToast.setVisibility(true);
      try{
        kony.timer.cancel("timerid");	
      }catch(e){}
      kony.timer.schedule("timerid", this.disableFlex.bind(this), 3, false);

    }

  },

  callMessageService(data){

    showLoading(" ", false, false);
    status = {"statusCode" : 0, "statusMessage" : "Running"};
    segment=data;
    if(segment=="all"){
      selectedData = this.view.segNotifications.selectedItems[0];
      selectedIndex = this.view.segNotifications.selectedIndex[1];
    }else if(segment=="read"){
      selectedData = this.view.segReadNotifications.selectedItems[0];
      selectedIndex = this.view.segReadNotifications.selectedIndex[1];
    }else{
      selectedData = this.view.segUnReadNotifications.selectedItems[0];
      selectedIndex = this.view.segUnReadNotifications.selectedIndex[1];
    }
    var fetchId=selectedData["lblFetchId"]["text"];

    if (isNetworkAvailable()) {

      if(mobileFabricConfiguration.isKonySDKObjectInitialized){
        mobileFabricConfiguration.integrationObj = mobileFabricConfiguration.konysdkObject.getIntegrationService(mobileFabricConfiguration.integrationServices[6].service);
        var operationName = mobileFabricConfiguration.integrationServices[6].operations[0];
        var headers = {
          "Content-Type":"text/xml"
        };
        kony.print("fetch id is "+ fetchId);
        data = {
          "pushId":fetchId
        };
        mobileFabricConfiguration.integrationObj.invokeOperation(operationName, headers, data, this.messageSuccessCallback, this.messageErrorCallback);
      }else{
        controllerReference.initializeMobileFabric();
      }
    } else {
      status = {"statusCode" : 1, "statusMessage" : "Network Unavailable"};
    }
  },

  HidePopUp:function(){
    this.view.FlexScrollContainer0d61740b6c7624f.contentOffset={x:"0%",y:"0%"};
    this.view.flxClosePopup.isVisible=false;
    if(segment=="all"){
      if(selectedData["lblUnreadMsg"]["text"]=="Unread Message"){
        notificationData[selectedIndex].template="flxReadNotification";
        notificationData[selectedIndex]["lblUnreadMsg"]["text"]="Read Message";


        kony.store.setItem("notificationOfflineData", JSON.stringify(notificationData));
        var fetchId=selectedData["lblFetchId"]["text"];
        notifications[fetchId][0] =1; //read delete

        kony.store.setItem("notifications", JSON.stringify(notifications));

        try{
          messageCount = kony.store.getItem("messageCount") || 0;
          messageCount=parseInt(messageCount);
        }catch(e){

        }
        messageCount--;
        kony.store.setItem("messageCount", messageCount+"");

        this.view.segNotifications.setDataAt(notificationData[selectedIndex],selectedIndex,0);

      }

    }else if(segment=="unread"){

      try{
        kony.store.setItem("notificationOfflineData", JSON.stringify(notificationData));
      }catch(e){

      }
      var fetchId=selectedData["lblFetchId"]["text"];
      notifications[fetchId][0] =1; //read delete

      kony.store.setItem("notifications", JSON.stringify(notifications));
      try{
        messageCount = kony.store.getItem("messageCount") || 0;
        messageCount=parseInt(messageCount);
      }catch(e){

      }
      messageCount--;
      kony.store.setItem("messageCount", messageCount+"");

      this.view.segUnReadNotifications.removeAt(selectedIndex, 0);
    }
  },
  showMessage:function(){



    var title = response["title"].trim();
    if(title.length>25){
      title = title.substring(0, 28)+"...";
    }
    this.view.lblMessage.text=title;
    kony.print("Sreeni title is "+title);
    var timeStamp = response.time_stamp!==""?this.convertUTCToLocalTimeMS(response.time_stamp):"";
    kony.print("[Parthu]Popup Timestamp::"+timeStamp);
    var formatedDate = "";
    if(timeStamp !== ""){
      var time = timeStamp.substring(11,16);
      time = formatAMPM(time);
      var splitDateTime =  timeStamp.split("T");
      var splitDate = splitDateTime[0].split("-");
      var Date = splitDate[2];
      var Month = splitDate[1];
      var year = splitDate[0];
      formatedDate = Date+" "+this.getMonthStr(Month)+" "+year+", "+time;
    }else{
      formatedDate = "";
    }
    kony.print("@@@ Sreeni formatedDate is "+formatedDate);
    this.view.lblTimestamp.text = formatedDate+"";
    //     var displayTimeStamp = "";
    //     if(timeStamp !== ""){
    //       var notificationDate = this.convertUTCToLocalTimeMS(timeStamp);

    //       kony.print("[Parthu]Notification notificationDate::"+notificationDate);
    //       var notificationTime = notificationDate.getTime();
    //       kony.print("[Parthu]Notification notificationTime::"+notificationTime);
    //       var currentDate = new Date();
    //       kony.print("[Parthu]Notification currentDate::"+currentDate);
    //       var currentTime = currentDate.getTime();
    //       kony.print("[Parthu]Notification currentTime::"+currentTime);
    //       var notificationYear = notificationDate.getFullYear();
    //       kony.print("[Parthu]Notification notificationYear::"+notificationYear);
    //       var currentYear = currentDate.getFullYear();
    //       kony.print("[Parthu]Notification currentYear::"+currentYear);
    //       displayTimeStamp = this.getDaysBetween(notificationDate,currentDate);//getTimeDiff(currentTime,notificationTime,currentYear,notificationYear);
    //       kony.print("[Parthu]Notification displayTimeStamp::"+displayTimeStamp);
    //     }
    //kony.print("@@@ Sreeni displayTimeStamp is "+displayTimeStamp);
    //this.view.lblTimestamp.text= displayTimeStamp;


    if(segment=="all"){
      if(selectedData["lblUnreadMsg"]["text"]=="Unread Message"){

        notificationData[selectedIndex].template="flxReadNotification";
        /* notificationData[selectedIndex]["lblUnreadMsg"]["text"]="Read Message";

            this.view.segNotifications.setDataAt(notificationData[selectedIndex],selectedIndex,0);
            */
        //  this.view.segNotifications.selectedIndex=[0,selectedIndex];
        // notificationData[selectedIndex]["lblTimeStamp"].isVisible=true;
        // notificationData[selectedIndex]["lblTimeStamp"]["text"]="Just now";

      }
    }else if(segment=="read"){

    }else if(segment=="unread"){
      var allSegmentIndex=UpdateAll(selectedData);
      allSegmentIndex=parseInt(allSegmentIndex);


      notificationData[allSegmentIndex].template="flxReadNotification";
      notificationData[allSegmentIndex]["lblUnreadMsg"]["text"]="Read Message";
      // notificationData[allSegmentIndex]["lblTimeStamp"].isVisible=true;
      //  notificationData[allSegmentIndex]["lblTimeStamp"]["text"]="Just now";

      //  notificationData[selectedIndex]["lblTimeStamp"].isVisible=true;
      // notificationData[selectedIndex]["lblTimeStamp"]["text"]="Just now";

      // unReadMessages[selectedIndex].template="flxReadNotification";
      //unReadMessages[selectedIndex]["lblUnreadMsg"]["text"]="Read Message";

      // this.view.segUnReadNotifications.setDataAt(unReadMessages[selectedIndex],selectedIndex,0);
      //  this.view.segNotifications.selectedIndex=[0,selectedIndex];


    }



	// this.view.forceLayout();
    // alert(this.view.lblMessageContent.frame.height);
   this.view.flxClosePopup.isVisible=true;
    dismissLoading();
    try{
      kony.timer.cancel("mytimer");
    }catch(e){

    }

  },
  onDoLayput:function(){
    
    if(!isIOS()){
    if(parseInt(this.view.lblMessageContent.frame.height) > 120){
      this.view.FlexScrollContainer0d61740b6c7624f.height = 120+"dp"; 
    }else{
      this.view.FlexScrollContainer0d61740b6c7624f.height = parseInt(this.view.lblMessageContent.frame.height)+ "dp"; 
    }
    }else{
      this.view.FlexScrollContainer0d61740b6c7624f.height = 120+"dp"; 
    }
    
  },

  messageSuccessCallback:function(response1){
    try{
      response=response1;
      message=response1["body"];
      this.view.lblMessageContent.text=message;
      this.showMessage();
      //kony.timer.schedule("mytimer",this.showMessage.bind(this), 2, false);
    }catch(e){
      kony.print("Sree Exception in messageSuccessCallback::"+e);
    }

  },
  getMonthStr :function(month){
    kony.print("month: "+month);

    var monthtemp = month.toString();
    var monthlen = monthtemp.length;
    kony.print("monthlen: "+monthlen);

    if(monthlen == 2 && monthtemp.substring(0,1) === "0"){

      month = monthtemp.substring(1,2);
      month = Number(month);
      month = month-1;
      kony.print("month in if condition calendar: "+month);
    }
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[month];
  },
  messageErrorCallback:function(errormsg){
    dismissLoading();
    kony.print(" ********** Entering into messageErrorCallback ********** ");
    kony.print(" ********** Failure in messageErrorCallback: " + JSON.stringify(errormsg) + " ********** ");
    status = {"statusCode" : 2, "statusMessage" : "Error in messageErrorCallback"};
    kony.print(" ********** Exiting out of messageErrorCallback ********** ");
  },



  convertUTCToLocalTimeMS : function (UTCtimeStamp){
    //     if(!isBlankOrNull(UTCtimeStamp)){
    //       kony.print("UTCtimeStamp: "+UTCtimeStamp);

    //       var hour =  UTCtimeStamp.substring(11,13);

    //       var minutes =  UTCtimeStamp.substring(14,16);

    //       var seconds =  UTCtimeStamp.substring(17,19);

    //       var timeinAMPM = this.formatAMPM(hour+":"+minutes);


    //       var globalTimeStamp = UTCtimeStamp.substring(5,7) +"/"+ UTCtimeStamp.substring(8,10)  +"/"+ UTCtimeStamp.substring(0,4)+
    //           " "+timeinAMPM.substring(0,2)+":"+UTCtimeStamp.substring(14,16)+":"+UTCtimeStamp.substring(17,19)+
    //           " "+timeinAMPM.substring(6,8)+" UTC"; // mm/dd/yyyy:hh:mm:ss AM/PM UTC

    //       kony.print("globalTimeStamp: "+globalTimeStamp);

    //       var date = new Date(globalTimeStamp);
    //       //var dateTemp = date.toString();
    //       return date;
    //     }else{
    //       return undefined;
    //     }

    //      kony.print("localTimeStamp: "+localTimeStamp);
    //   var tempTimeStmp = localTimeStamp.split("T");
    //   var date = tempTimeStmp[1];
    //   var month = getMonthIntShort(tempTimeStmp[2]);
    //   month = month.toString();
    //   if(month.length < 2){
    //     month = "0"+month;
    //   }
    //   var year = tempTimeStmp[3];
    //   var hoursMin = tempTimeStmp[4];

    //   var UTCTimeformat = tempTimeStmp[3]+"-"+month+"-"+tempTimeStmp[1]+"T"+tempTimeStmp[4]+".000Z";
    //   kony.print("UTCTimeformat: "+UTCTimeformat);

    //   return UTCTimeformat;

    if(!isBlankOrNull(UTCtimeStamp)){
      kony.print("UTCtimeStamp: "+UTCtimeStamp);

      var hour =  UTCtimeStamp.substring(11,13);

      var minutes =  UTCtimeStamp.substring(14,16);

      var seconds =  UTCtimeStamp.substring(17,19);

      var timeinAMPM = formatAMPM(hour+":"+minutes);


      var globalTimeStamp = UTCtimeStamp.substring(5,7) +"/"+ UTCtimeStamp.substring(8,10)  +"/"+ UTCtimeStamp.substring(0,4)+
          " "+timeinAMPM.substring(0,2)+":"+UTCtimeStamp.substring(14,16)+":"+UTCtimeStamp.substring(17,19)+
          " "+timeinAMPM.substring(6,8)+" UTC"; // mm/dd/yyyy:hh:mm:ss AM/PM UTC

      kony.print("globalTimeStamp: "+globalTimeStamp);

      var date = new Date(globalTimeStamp);
      var dateTemp = date.toString();
      kony.print("dateTemp: "+dateTemp);
      var timestamp = dateTemp.split(" ");
      var month = getMonthIntShort(timestamp[1]);
      kony.print("month: "+month);
      month = month.toString();
      if(month.length < 2){
        month = "0"+month;
      }
      var finalTime = timestamp[3]+"-"+month+"-"+timestamp[2]+"T"+timestamp[4]+".000Z"; //yyyy-mm-ddThh:mm:ss:000Z
      kony.print("finalTime: "+finalTime);
      return finalTime;
    }else{
      return undefined;
    }
  },
  getDaysBetween : function( date1, date2 ) {//Notification Date - date1, Current Date - date2
    //Get 1 day in milliseconds
    var one_day=1000*60*60*24;

    var timeStamp = "";
    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;
    //take out milliseconds
    difference_ms = difference_ms/1000;
    var seconds = Math.floor(difference_ms % 60);
    difference_ms = difference_ms/60; 
    var minutes = Math.floor(difference_ms % 60);
    difference_ms = difference_ms/60; 
    var hours = Math.floor(difference_ms % 24);  
    var days = Math.floor(difference_ms/24);
    kony.print("Difference in days::"+days + ' days, ' + hours + ' hours, ' + minutes + ' minutes, and ' + seconds + ' seconds');
    if(days>365){
      var notifYear = date1.getFullYear();
      var currYear =  date2.getFullYear();
      var diffYear = currYear - notifYear;
      timeStamp = Math.round(diffYear);
      if(timeStamp === 1){
        timeStamp = timeStamp+" year ago";
      }else{
        timeStamp = timeStamp+" years ago";
      }
    }else if(days<366 && days>30){
      timeStamp = Math.round(days/30);
      if(timeStamp === 1){
        timeStamp = timeStamp+" month ago";
      }else{
        timeStamp = timeStamp+" months ago";
      }
    }else if(days<366 && days>0){
      if(days === 1){
        timeStamp = days+" day ago";
      }else{
        timeStamp = days+" days ago";
      }
    }else if(days === 0 && hours>0){
      if(hours === 1){
        timeStamp = hours+" hour ago";
      }else{
        timeStamp = hours+" hours ago";
      }
    }else if(hours === 0 && minutes > 1){
      if(minutes === 1){
        timeStamp = minutes+" minute ago";
      }else{
        timeStamp = minutes+" minutes ago";
      }
    }else if(seconds < 60 ){
      timeStamp = "Just now";
    }

    return timeStamp;
    //return days + ' days, ' + hours + ' hours, ' + minutes + ' minutes, and ' + seconds + ' seconds';
  },
  formatAMPM : function(time) {  
    kony.print("time: "+time);
    var hours = time.substring(0,2); 
    kony.print("hours: "+time);
    var minutes = time.substring(3,5); 
    kony.print("minutes: "+time);
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    hours = hours < 10 ? '0' + hours : hours;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    kony.print("strTime: "+strTime);
    return strTime;
  }


});