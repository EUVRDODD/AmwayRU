define(function() {
    var INACTIVE_LABEL_SKIN = "inactiveLabelNotificationFilter";
    var ACTIVE_LABEL_SKIN = "activeLabelNotificationFilter";
  
	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
          this.view.flexNotificationFilterAll.onClick = this.flexNotificationFilterAll.bind( this );
		  this.view.flexNotificationFilterRead.onClick = this.flexNotificationFilterRead.bind( this );
          this.view.flexNotificationFilterUnread.onClick = this.flexNotificationFilterUnread.bind( this );

      },
		flexNotificationFilterAll: function() {
          
          var label = this.view.LabelNotificationFilterAll;
          var toggle = this.view.flexNotificationToggleFilterAll;

          this.switchSkinAndChildVal(label, toggle);        
       
      },
		flexNotificationFilterRead: function() {
          
          var label = this.view.LabelNotificationFilterRead;
          var toggle = this.view.flexNotificationToggleFilterRead;

          this.switchSkinAndChildVal(label, toggle);        
       
      },
		flexNotificationFilterUnread: function() {
          
          var label = this.view.LabelNotificationFilterUnread;
          var toggle = this.view.flexNotificationToggleFilterUnread;

          this.switchSkinAndChildVal(label, toggle);      
       
      },
		switchSkinAndChildVal: function(labelObj, flexObj) {
          //switch all filters to inactive
 		  this.view.flexNotificationToggleFilterAll.visible = false;
          this.view.flexNotificationToggleFilterRead.visible = false;
          this.view.flexNotificationToggleFilterUnread.visible = false;
          this.view.LabelNotificationFilterAll.skin = INACTIVE_LABEL_SKIN;
          this.view.LabelNotificationFilterRead.skin = INACTIVE_LABEL_SKIN;
          this.view.LabelNotificationFilterUnread.skin = INACTIVE_LABEL_SKIN;
                    
          // set to active the selected filter
          flexObj.visible = true;
          labelObj.skin = ACTIVE_LABEL_SKIN;
          //notificationtestpage.visible = true;
          var currentForm = kony.application.getCurrentForm();
          // set form element
          //currentForm.FlexContainer0h328fb9f30424a.visible = true;
          
      }
	};
});