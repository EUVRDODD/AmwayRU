define({ 
  applyBindings: function() {
    controllerReference=this;
    this.view.Buttons.showOptions.onClick = this._showOptions.bind( this );
    this.view.MoreOptions.OptionCancel.onClick = this._hideOptions.bind( this );
    this.view.backButton.onClick = this._goBack.bind( this );
  },
  _showOptions: function(){
    animate( this.view.hiddenOptionsContainer, { "bottom": "0dp" } );
  },
  _hideOptions: function() {
    animate( this.view.hiddenOptionsContainer, { "bottom": "-285dp" } );
  },
  _goBack: function() {
    var ntf = new kony.mvc.Navigation("homepage");
    ntf.navigate();	
  },
    showNotification:function(){
    try{
      controllerReference.view.Popup.isVisible=true;
    }catch(e){}
  },
  

 });