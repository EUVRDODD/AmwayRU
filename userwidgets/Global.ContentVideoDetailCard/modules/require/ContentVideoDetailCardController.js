define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.customSwitch.onClick = this.downloadButtonToggle.bind( this );
      this.view.closeOverlay.onClick = this.downloadButtonToggle.bind( this );
      this.view.btnPauseDownload.onClick = this.pauseDownload.bind( this );
      this.view.btnPlayDownload.onClick = this.playDownload.bind( this );
    },
    downloadButtonToggle: function() {
      if (this.view.toggleSwitch.left == "5dp") {
        animate( 
          this.view.toggleSwitch, { "left": "15dp" }
        );
        this.view.bodySwitch.skin = "activeBodySwitch";
        this.view.toggleSwitch.skin = "activeToggleSwitch";
        this.view.downloadOverlay.isVisible = true;
      } else {
        animate( 
          this.view.toggleSwitch, { "left": "5dp" }
        );
        this.view.bodySwitch.skin = "inactiveBodySwitch";
        this.view.toggleSwitch.skin = "inactiveToggleSwitch";
        this.view.downloadOverlay.isVisible = false;
      }
    },
    pauseDownload: function() {
      this.view.btnPauseDownload.isVisible = false;      
      this.view.loaderActive.isVisible = false;

      this.view.btnPlayDownload.isVisible = true;      
      this.view.loaderInactive.isVisible = true;
    },
    playDownload: function() {
      this.view.btnPauseDownload.isVisible = true;      
      this.view.loaderActive.isVisible = true;

      this.view.btnPlayDownload.isVisible = false;      
      this.view.loaderInactive.isVisible = false;
    }
  };
});