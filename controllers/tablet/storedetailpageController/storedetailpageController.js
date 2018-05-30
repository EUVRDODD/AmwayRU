define({
  applyBindings: function() {
    this.view.preShow = this.setStoreData.bind(this);
    this.view.backButton.onClick = this.goBackToLocatorPage.bind(this);
    this.view.btnNumber.onClick = this.openPhoneService.bind(this);
    this.view.btnEmailAdd.onClick = this.sendEmail.bind(this);
    this.view.btnOpenMaps.onClick = this.openMaps.bind(this);
    this.view.postShow = this.storeDetailPostshow.bind(this);
    this.view.onDeviceBack=this.goBackToLocatorPage.bind(this);
    pageComponents =[];


  },
  
  storeDetailPostshow : function(){
    try{
      this.PostshowAnalytics(this.view);
    }catch(e){
      
    }
    
  },
	
  PostshowAnalytics :function(formName){
  	 var  additionalArg = [];
  	 additionalArg.push(this.view.id);
  	 kony.print("Tealium form widgets json for StoreDetail page :: "+JSON.stringify(additionalArg));
     callTealiumOnScreenLoad(this.view,additionalArg,gblVisitor_imcID);
	},
  showNotification:function(){
    try{
      controllerReference.view.Popup.isVisible=true;
    }catch(e){}
  },


  setStoreData: function() {
    controllerReference=this;
    controllerReference.view.FlexScrollContainer0f7dc406ce30b48.contentOffset={x:"0%",y:"0%"};
    var latitude = storeData["btnmapOpen"]["info"]["latitude"];
    //kony.print("store detail page >>> latitude "+latitude);
    var longitude = storeData["btnmapOpen"]["info"]["longitude"];
    //kony.print("store detail page >>> longitude "+longitude);

	//this.view.mapStore.setCalloutVisibility(false, []);
    this.view.mapStore.locationData = [{
      lat: latitude,
      lon: longitude,
      //name: storeData["lblStoreName"],
     // desc:storeData["rchAddress"],
      showCallout:false
    }];

    
    if(isBlankOrNull( storeData["imgStore"])){
      this.view.imgStore.src = "store_locator_default.png";
    }else{
      this.view.imgStore.src = storeData["imgStore"];
    }

    this.view.lblStoreLocation.text = storeData["lblLocation"];
    this.view.lblStoreName.text = storeData["lblStoreName"];
    this.view.rchStoreLocation.text = storeData["rchAddress"];
    this.view.lblNumber.text = storeData["btnphoneCall"]["info"]["phone"];
    this.view.lblEmailAdd.text = storeData["btnsendEmail"]["info"]["email"];
    this.view.rchOpeningHours.text = storeData["lblOperatingHours"];
  },
  sendEmail: function() {
    callTealiumOnClick("click_action", "StoreDetail_Email",["btnEmailAdd"],gblVisitor_imcID);
    this.goToMailName(storeData["btnsendEmail"]["info"]["email"]);
  },

  openPhoneService: function() {
    try {
      callTealiumOnClick("click_action", "StoreDetail_Phone",["btnNumber"],gblVisitor_imcID);
      var number = this.view.lblNumber.text;
      kony.phone.dial(number);
    } catch (err) {
      alert("error in dial:: " + err);
    }
  },

  goBackToLocatorPage: function() {
    comingFromStoreDetail=true;
    var ntf = new kony.mvc.Navigation("storelocatorpage");
    ntf.navigate();
    
  },

  openMaps: function() {
    callTealiumOnClick("click_action", "StoreDetail_Map",["btnOpenMaps"],gblVisitor_imcID);
    var latitude = storeData["btnmapOpen"]["info"]["latitude"];
    var longitude = storeData["btnmapOpen"]["info"]["longitude"];
    var storename= storeData["lblStoreName"];
     if(isIOS()){
      kony.application.openURL('https://maps.apple.com/?q='+storename +'&ll='+latitude+','+longitude);
    }else{
       kony.application.openURL('https://maps.google.com/maps/?q=loc:'+ latitude +','+ longitude + ' ('+ storename +')');
    }
    
    
    
  },

  goToMailName : function(email){
    try {
      // Set the recipients.
      var to = [email];
      var cc = [];
      var bcc = [""];

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


  onNavigate: function(data) {
    storeData = data;
    this.applyBindings();
  },


});