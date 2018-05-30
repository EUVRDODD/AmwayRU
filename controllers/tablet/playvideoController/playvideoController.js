define({ 

  onNavigate: function(data)
  {
    gblData=data;
    this.view.videoDetails.isVisible = true;
    controllerReference = this;
    this.view.postShow=this.automaticallyPlayVideo.bind(this);
    this.view.imgBack.onTouchEnd = this.goToBackPage;
    this.view.onDeviceBack = this.goToBackPage;

    this.view.onOrientationChange = this.changeVideoWidgetProperties;
    //       kony.print("is downloaded : " + isDownloaded.isOffline);
    //       	if (isDownloaded.isOffline === undefined)
    //           	isDownloaded.isOffline= false;
    if(gblData.isDownloaded){
      kony.print("downloaded gblData");
      this.playDownloadedVideo();
    }else{


      //       	kony.print("is downloaded : " + isDownloaded.isOffline);
      if (!gblData.hasOwnProperty("isOffline"))
      {
        kony.print("Playing online video");
        this.view.videoDetails.source = {"mp4" : gblData.url};

        //this.view.videoDetails.play();
      }
      else
      {
        kony.print("playing downloaded video");
        this.playDownloadedVideo();
      }
    }


  },



  automaticallyPlayVideo:function(){
    this.view.videoDetails.onPrepared=function(){
      controllerReference.view.videoDetails.play();
    }
  },

  showNotification:function(){
    try{
      controllerReference.view.Popup.isVisible=true;
    }catch(e){}
  },
  playDownloadedVideo: function()
  {
    kony.print("Going to play");
    var docPath = kony.io.FileSystem.getDataDirectoryPath();
    kony.print("Kony doc directory path is:" + docPath);
    var path = docPath.replace("files", "");

    var filePath = path+"/"+gblData.UID+".mp4";
    var file = new kony.io.File(filePath);
    this.view.videoDetails.isVisible=true;
    this.view.videoDetails.setSource({"rawBytes": file.read()});
    this.view.videoDetails.play();

  },

  changeVideoWidgetProperties: function()
  {
    if (gblData.hasOwnProperty("isOffline"))
    {
      if (kony.os.getDeviceCurrentOrientation() === constants.DEVICE_ORIENTATION_LANDSCAPE)
      {
        controllerReference.view.video1.height = "100%";
        controllerReference.view.video1.top = "0%";
        this.view.FlexContainer0g56ebc595b9646.zIndex = 5;
        this.view.Popup.height="160%";
        this.view.Popup.width="60%";

      }
      else
      {
        controllerReference.view.video1.height = "40%";
        controllerReference.view.video1.top = "30%";
        this.view.Popup.height="100%";
        this.view.Popup.width="100%";
      }
    }
    if (kony.os.getDeviceCurrentOrientation() === constants.DEVICE_ORIENTATION_LANDSCAPE)
    {	

      controllerReference.view.videoDetails.height = "100%";
      this.view.Popup.height="160%";
      this.view.Popup.width="60%";
    }
    else
    {

      controllerReference.view.videoDetails.height = "40%";
      this.view.Popup.height="100%";
      this.view.Popup.width="100%";
    }
  },
  success: function()
  {

    this.view.videoDetails.play();
  },
  goToBackPage:function(){
    var ntf=new kony.mvc.Navigation("contentdetailpage");
    ntf.navigate(gblData);
  },


});