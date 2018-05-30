define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      
      this.view.Button2.onClick = this.buttonClick2.bind( this );
      this.view.FlexContainer0deb7aec3405e43.onClick=function(){
        kony.print("");
      }
     
      try{
         messageCount = kony.store.getItem("messageCount") || 0;
        messageCount=parseInt(messageCount);
      }catch(e){
        
      }
    },

    buttonClick2: function(){
      controllerReference.view.flxMainPopup.isVisible=true;
    }
    
   
    
    
  };
});