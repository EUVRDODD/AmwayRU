define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.btnClose.onClick = this.btnClose_onClick.bind( this );
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    showPopup : function(){
      this.view.flxPopup.setVisibility(true);
    },

    btnClose_onClick : function(){
      //doNothing
    },
    setDisplayMessage : function(data){
      this.view.lblMessage.text = data;
    }
  };
});