define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.OptionButton1.onClick = this.clickOption1.bind( this );
      this.view.OptionButton2.onClick = this.clickOption2.bind( this );
      this.view.OptionButton3.onClick = this.clickOption3.bind( this );
      this.view.OptionButton4.onClick = this.clickOption4.bind( this );
    },
    clickOption1: function(){
      if( this.view.OptionButtonActive1.isVisible !== true ) {
        this.view.OptionButtonActive1.isVisible = true;
      } else {
        this.view.OptionButtonActive1.isVisible = false;
      }
    },
    clickOption2: function(){
      if( this.view.OptionButtonActive2.isVisible !== true ) {
        this.view.OptionButtonActive2.isVisible = true;
      } else {
        this.view.OptionButtonActive2.isVisible = false;
      }
    },
    clickOption3: function(){
      if( this.view.OptionButtonActive3.isVisible !== true ) {
        this.view.OptionButtonActive3.isVisible = true;
      } else {
        this.view.OptionButtonActive3.isVisible = false;
      }
    },
    clickOption4: function(){
      if( this.view.OptionButtonActive4.isVisible !== true ) {
        this.view.OptionButtonActive4.isVisible = true;
      } else {
        this.view.OptionButtonActive4.isVisible = false;
      }
    },
  };
});