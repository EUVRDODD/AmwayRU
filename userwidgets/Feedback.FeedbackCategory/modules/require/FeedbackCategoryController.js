define(function() {
    var INACTIVE_FLEX_SKIN = "inactiveFlexCheckboxSwitch";
 	var ACTIVE_FLEX_SKIN   = "activeFlexCheckboxSwitch";
    var INACTIVE_LABEL_SKIN = "inactiveLabelCheckboxSwitch";
    var ACTIVE_LABEL_SKIN = "activeLabelCheckboxSwitch";
    var ACTIVE_IMAGE_ICON = "icon_checkbox_active.png";
    var INACTIVE_IMAGE_ICON = "icon_checkbox.png";
  
	return {
      	constructor: function(baseConfig, layoutConfig, pspConfig) {
          this.view.flexFeedbackCat1.onClick = this.flexFeedbackCat1.bind( this );
		  this.view.flexFeedbackCat2.onClick = this.flexFeedbackCat2.bind( this );
          this.view.flexFeedbackCat3.onClick = this.flexFeedbackCat3.bind( this );
          this.view.flexFeedbackCat4.onClick = this.flexFeedbackCat4.bind( this );
          this.view.flexFeedbackCat5.onClick = this.flexFeedbackCat5.bind( this );
          this.view.flexFeedbackCat6.onClick = this.flexFeedbackCat6.bind( this );

      },
		flexFeedbackCat1: function() {
          
          var catFlex = this.view.flexFeedbackCat1;
          var catLabel = this.view.LabelFeedbackCat1;
          var catImage = this.view.ImageFeedbackCat1;

          this.switchSkinAndChildVal(catFlex, catLabel, catImage);        
       
      },
		flexFeedbackCat2: function() {
          
          var catFlex = this.view.flexFeedbackCat2;
          var catLabel = this.view.LabelFeedbackCat2;
          var catImage = this.view.ImageFeedbackCat2;

          this.switchSkinAndChildVal(catFlex, catLabel, catImage);        
       
      },
		flexFeedbackCat3: function() {
          
          var catFlex = this.view.flexFeedbackCat3;
          var catLabel = this.view.LabelFeedbackCat3;
          var catImage = this.view.ImageFeedbackCat3;

          this.switchSkinAndChildVal(catFlex, catLabel, catImage);        
       
      },
		flexFeedbackCat4: function() {
          
          var catFlex = this.view.flexFeedbackCat4;
          var catLabel = this.view.LabelFeedbackCat4;
          var catImage = this.view.ImageFeedbackCat4;

          this.switchSkinAndChildVal(catFlex, catLabel, catImage);        
       
      },
		flexFeedbackCat5: function() {
          
          var catFlex = this.view.flexFeedbackCat5;
          var catLabel = this.view.LabelFeedbackCat5;
          var catImage = this.view.ImageFeedbackCat5;

          this.switchSkinAndChildVal(catFlex, catLabel, catImage);        
       
      },
		flexFeedbackCat6: function() {
          
          var catFlex = this.view.flexFeedbackCat6;
          var catLabel = this.view.LabelFeedbackCat6;
          var catImage = this.view.ImageFeedbackCat6;

          this.switchSkinAndChildVal(catFlex, catLabel, catImage);        
       
      },
		switchSkinAndChildVal: function(flexObj, labelObj, imageObj) {

          if(flexObj.skin != INACTIVE_FLEX_SKIN){
             flexObj.skin = INACTIVE_FLEX_SKIN;
             labelObj.skin = INACTIVE_LABEL_SKIN;
             imageObj.src = INACTIVE_IMAGE_ICON;
          }else{
             flexObj.skin = ACTIVE_FLEX_SKIN;
             labelObj.skin = ACTIVE_LABEL_SKIN;
             imageObj.src = ACTIVE_IMAGE_ICON;
          }
      }

	};
});