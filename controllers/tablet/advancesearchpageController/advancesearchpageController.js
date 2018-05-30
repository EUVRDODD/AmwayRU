define({ 
  applyBindings: function(){
    this.view.backButton.onClick = this.returnToSearch.bind( this );
    this.view.ApplyFilter.ApplyFilterButton.onClick = this.returnToSearch.bind( this );
    this.view.resetButton.onClick = this.resetCategories.bind( this );
  },
  resetCategories: function(){
    this.view.Category.flexAdvanceSearchFilterCat1.skin = "inactiveFlexCheckboxSwitch";
    this.view.Category.LabelAdvanceSearchFilterCat1.skin = "inactiveLabelCheckboxSwitch";
    this.view.Category.ImageAdvanceSearchFilterCat1.src = "icon_checkbox.png";
    
    this.view.Category.flexAdvanceSearchFilterCat2.skin = "inactiveFlexCheckboxSwitch";
    this.view.Category.LabelAdvanceSearchFilterCat2.skin = "inactiveLabelCheckboxSwitch";
    this.view.Category.ImageAdvanceSearchFilterCat2.src = "icon_checkbox.png";
    
    this.view.Category.flexAdvanceSearchFilterCat3.skin = "inactiveFlexCheckboxSwitch";
    this.view.Category.LabelAdvanceSearchFilterCat3.skin = "inactiveLabelCheckboxSwitch";
    this.view.Category.ImageAdvanceSearchFilterCat3.src = "icon_checkbox.png";
    
    this.view.Category.flexAdvanceSearchFilterCat4.skin = "inactiveFlexCheckboxSwitch";
    this.view.Category.LabelAdvanceSearchFilterCat4.skin = "inactiveLabelCheckboxSwitch";
    this.view.Category.ImageAdvanceSearchFilterCat4.src = "icon_checkbox.png";

    this.view.Category.flexAdvanceSearchFilterCat5.skin = "inactiveFlexCheckboxSwitch";
    this.view.Category.LabelAdvanceSearchFilterCat5.skin = "inactiveLabelCheckboxSwitch";
    this.view.Category.ImageAdvanceSearchFilterCat5.src = "icon_checkbox.png";
    
    this.view.Category.flexAdvanceSearchFilterCat6.skin = "inactiveFlexCheckboxSwitch";
    this.view.Category.LabelAdvanceSearchFilterCat6.skin = "inactiveLabelCheckboxSwitch";
    this.view.Category.ImageAdvanceSearchFilterCat6.src = "icon_checkbox.png";

    this.view.Category.flexAdvanceSearchFilterCat7.skin = "inactiveFlexCheckboxSwitch";
    this.view.Category.LabelAdvanceSearchFilterCat7.skin = "inactiveLabelCheckboxSwitch";
    this.view.Category.ImageAdvanceSearchFilterCat7.src = "icon_checkbox.png";
    
    this.view.Category.flexAdvanceSearchFilterCat8.skin = "inactiveFlexCheckboxSwitch";
    this.view.Category.LabelAdvanceSearchFilterCat8.skin = "inactiveLabelCheckboxSwitch";
    this.view.Category.ImageAdvanceSearchFilterCat8.src = "icon_checkbox.png";

    this.view.Category.flexAdvanceSearchFilterCat9.skin = "inactiveFlexCheckboxSwitch";
    this.view.Category.LabelAdvanceSearchFilterCat9.skin = "inactiveLabelCheckboxSwitch";
    this.view.Category.ImageAdvanceSearchFilterCat9.src = "icon_checkbox.png";
    
    this.view.Category.flexAdvanceSearchFilterCat10.skin = "inactiveFlexCheckboxSwitch";
    this.view.Category.LabelAdvanceSearchFilterCat10.skin = "inactiveLabelCheckboxSwitch";
    this.view.Category.ImageAdvanceSearchFilterCat10.src = "icon_checkbox.png";


  },
  returnToSearch: function(){
    var ntf = new kony.mvc.Navigation("searchresultspagewithbadges");
    ntf.navigate();	
  }
});

/*

define(function() {
    var INACTIVE_FLEX_SKIN = "inactiveFlexCheckboxSwitch";
 	var ACTIVE_FLEX_SKIN   = "activeFlexCheckboxSwitch";
    var INACTIVE_LABEL_SKIN = "inactiveLabelCheckboxSwitch";
    var ACTIVE_LABEL_SKIN = "activeLabelCheckboxSwitch";
    var ACTIVE_IMAGE_ICON = "icon_checkbox_active.png";
    var INACTIVE_IMAGE_ICON = "icon_checkbox.png";
  
	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
          this.view.flexAdvanceSearchFilterCat1.onClick = this.flexAdvanceSearchFilterCat1.bind( this );
		  this.view.flexAdvanceSearchFilterCat2.onClick = this.flexAdvanceSearchFilterCat2.bind( this );
          this.view.flexAdvanceSearchFilterCat3.onClick = this.flexAdvanceSearchFilterCat3.bind( this );
          this.view.flexAdvanceSearchFilterCat4.onClick = this.flexAdvanceSearchFilterCat4.bind( this );
          this.view.flexAdvanceSearchFilterCat5.onClick = this.flexAdvanceSearchFilterCat5.bind( this );
          this.view.flexAdvanceSearchFilterCat6.onClick = this.flexAdvanceSearchFilterCat6.bind( this );
          this.view.flexAdvanceSearchFilterCat7.onClick = this.flexAdvanceSearchFilterCat7.bind( this );
          this.view.flexAdvanceSearchFilterCat8.onClick = this.flexAdvanceSearchFilterCat8.bind( this );
          this.view.flexAdvanceSearchFilterCat9.onClick = this.flexAdvanceSearchFilterCat9.bind( this );
          this.view.flexAdvanceSearchFilterCat10.onClick = this.flexAdvanceSearchFilterCat10.bind( this );
      },
		flexAdvanceSearchFilterCat1: function() {
          
          var catFlex = this.view.flexAdvanceSearchFilterCat1;
          var catLabel = this.view.LabelAdvanceSearchFilterCat1;
          var catImage = this.view.ImageAdvanceSearchFilterCat1;

          this.switchSkinAndChildVal(catFlex, catLabel, catImage);        
       
      },
		flexAdvanceSearchFilterCat2: function() {
          
          var catFlex = this.view.flexAdvanceSearchFilterCat2;
          var catLabel = this.view.LabelAdvanceSearchFilterCat2;
          var catImage = this.view.ImageAdvanceSearchFilterCat2;

          this.switchSkinAndChildVal(catFlex, catLabel, catImage);        
       
      },
		flexAdvanceSearchFilterCat3: function() {
          
          var catFlex = this.view.flexAdvanceSearchFilterCat3;
          var catLabel = this.view.LabelAdvanceSearchFilterCat3;
          var catImage = this.view.ImageAdvanceSearchFilterCat3;

          this.switchSkinAndChildVal(catFlex, catLabel, catImage);        
       
      },
		flexAdvanceSearchFilterCat4: function() {
          
          var catFlex = this.view.flexAdvanceSearchFilterCat4;
          var catLabel = this.view.LabelAdvanceSearchFilterCat4;
          var catImage = this.view.ImageAdvanceSearchFilterCat4;

          this.switchSkinAndChildVal(catFlex, catLabel, catImage);        
       
      },
		flexAdvanceSearchFilterCat5: function() {
          
          var catFlex = this.view.flexAdvanceSearchFilterCat5;
          var catLabel = this.view.LabelAdvanceSearchFilterCat5;
          var catImage = this.view.ImageAdvanceSearchFilterCat5;

          this.switchSkinAndChildVal(catFlex, catLabel, catImage);        
       
      },
		flexAdvanceSearchFilterCat6: function() {
          
          var catFlex = this.view.flexAdvanceSearchFilterCat6;
          var catLabel = this.view.LabelAdvanceSearchFilterCat6;
          var catImage = this.view.ImageAdvanceSearchFilterCat6;

          this.switchSkinAndChildVal(catFlex, catLabel, catImage);        
       
      },
		flexAdvanceSearchFilterCat7: function() {
          
          var catFlex = this.view.flexAdvanceSearchFilterCat7;
          var catLabel = this.view.LabelAdvanceSearchFilterCat7;
          var catImage = this.view.ImageAdvanceSearchFilterCat7;

          this.switchSkinAndChildVal(catFlex, catLabel, catImage);        
       
      },
		flexAdvanceSearchFilterCat8: function() {
          
          var catFlex = this.view.flexAdvanceSearchFilterCat8;
          var catLabel = this.view.LabelAdvanceSearchFilterCat8;
          var catImage = this.view.ImageAdvanceSearchFilterCat8;

          this.switchSkinAndChildVal(catFlex, catLabel, catImage);        
       
      },
		flexAdvanceSearchFilterCat9: function() {
          
          var catFlex = this.view.flexAdvanceSearchFilterCat9;
          var catLabel = this.view.LabelAdvanceSearchFilterCat9;
          var catImage = this.view.ImageAdvanceSearchFilterCat9;

          this.switchSkinAndChildVal(catFlex, catLabel, catImage);        
       
      },
		flexAdvanceSearchFilterCat10: function() {
          
          var catFlex = this.view.flexAdvanceSearchFilterCat10;
          var catLabel = this.view.LabelAdvanceSearchFilterCat10;
          var catImage = this.view.ImageAdvanceSearchFilterCat10;

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
    */