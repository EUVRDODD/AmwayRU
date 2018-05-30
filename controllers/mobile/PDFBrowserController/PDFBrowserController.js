define({ 

 //Type your controller code here 

  onNavigate:function(data){
    kony.application.showLoadingScreen(null,loadingText,"center",true,true,null);
    urlData=data;
    pdfBase64FromResponse="data:application/pdf;base64,";
    this.view.preShow=this.applyBindings.bind(this);
     
    
  },
  
    showNotification:function(){
    try{
      controllerReference.view.Popup.isVisible=true;
    }catch(e){}
  },
  

 
  applyBindings:function(){
    controllerReference=this;
     this.showPDF();
    this.view.onDeviceBack=this.goToContentDetailPage.bind(this);
  },
  goToContentDetailPage:function(){
    var ntf=new kony.mvc.Navigation("contentdetailpage");
    ntf.navigate(urlData);
  },
  showPDF:function(){
    this.view.brwForgotPassword.showProgressIndicator=false;
       fileName = urlData.lbltitle;
   fileName = fileName.replace(/ /g, "_");
    fileName+=".pdf";
    
     var myFile = new kony.io.File(kony.io.FileSystem.getDataDirectoryPath()+ "/" + fileName);
    
   
      pdfBase64FromResponse+= kony.convertToBase64(myFile.read());
    
    
    kony.timer.schedule("mytimer12",this.timerFunc,1, true);
  var loadingText = "Loading Pdf...";
  
    
  

},
  
  timerFunc:function(){
   
      
       this.view.brwPDFContent.evaluateJavaScript("var pdfAsArray = convertDataURIToBinary('" + pdfBase64FromResponse + "');  PDFViewerApplication.open(pdfAsArray);");

   kony.application.dismissLoadingScreen();
   kony.timer.cancel("mytimer12"); 
  }
  
 });