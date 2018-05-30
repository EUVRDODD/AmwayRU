define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
          this.view.btnClose.onClick = this.btnClose_onClick.bind( this );	
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		},
      	showPopup : function(){
          this.view.flxPopup.isVisible = true;
        },
      
      	btnClose_onClick : function(){
      		//doNothing
  		},
        storeLocatorMessageDisplay : function(data){
          this.view.Label0d9ac6796040244.text = data;
        }
	};
});