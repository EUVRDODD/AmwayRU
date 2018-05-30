define({ 

  //Type your controller code here 
  onNavigate : function(currentData) {
    data = currentData;
    isOnlineVal = data.isOnline;
    kony.print("isOnlineVal : " + isOnlineVal);
    this.applyBindings();
  },

  applyBindings : function() {
    this.view.preShow = this.pdfViewerPreShow.bind(this);
    this.view.postShow = this.pdfViewerPostShow.bind(this);
    this.view.onDeviceBack = this.goBack.bind(this);
  },
  dismiss:function(){
    dismissLoading();
  },
  
  pdfViewerPostShow:function(){
    
    if(!data.isDownloaded){
    try{
      kony.timer.cancel("pdfTimer");
    }catch(e){

    }
    showLoading();
    try{
      kony.timer.schedule("pdfTimer", this.dismiss.bind(this), 2, false);
    }catch(e){

    }
    }
  },

  pdfViewerPreShow : function() {
    var docPath = kony.io.FileSystem.getDataDirectoryPath();
    kony.print("Kony doc directory path is:" + docPath);
    var path = docPath.replace("files", "");
    kony.print("final path is:" + path);
    if (data.contentType === "pdf") {

      var filePath = path + "/" + data.UID + ".pdf";
      var file = new kony.io.File(filePath);
      if (isOnlineVal) {
        this.view.pdfViewerWidget.setPdfURL(data.url);
      } else {
        if (file.exists()) {
          kony.print("pdfdownloaded");
          kony.print("pdf file exists in the path")
          //          var nav = new kony.mvc.Navigation("pdfViewer");
          this.view.pdfViewerWidget.setPdfURL(filePath);
        }else{
          this.view.pdfViewerWidget.setPdfURL(data.url);
        }
      }

    } 
  },

  goBack:function(){
    var nav=new kony.mvc.Navigation("contentdetailpage");
    nav.navigate(data);
    kony.application.destroyForm("customPdfViewer");
  }

});