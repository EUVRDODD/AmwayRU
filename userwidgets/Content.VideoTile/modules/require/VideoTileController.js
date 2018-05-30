define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.customSwitch.onClick = this.downloadButtonToggle.bind( this );
      this.view.closeOverlay.onClick = this.downloadButtonToggle.bind( this );
      this.view.btnPauseDownload.onClick = this.pauseDownload.bind( this );
      this.view.btnPlayDownload.onClick = this.playDownload.bind( this );        
      this.view.flxContent.onClick = this.goToDetailsPage.bind( this );
      this.view.LikeButton.onClick = this.like.bind( this );
      this.view.ShareButton.onClick = this.share.bind( this );
      this.view.BookmarkButton.onClick = this.bookmark.bind( this );
    },
    like: function() {
      if( this.view.IconLikeActive.isVisible ) {
        this.view.IconLikeActive.isVisible = false;
      } else {
        this.view.IconLikeActive.isVisible = true;
      }
    },
    share: function(){
      if( this.view.IconShareActive.isVisible ) {
        this.view.IconShareActive.isVisible = false;
      } else {
        this.view.IconShareActive.isVisible = true;
      }
    },
    bookmark: function(){
      if( this.view.IconBookmarkActive.isVisible ) {
        this.view.IconBookmarkActive.isVisible = false;
      } else {
        this.view.IconBookmarkActive.isVisible = true;
      }
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
    },
    goToDetailsPage: function(){
      var ntf = new kony.mvc.Navigation("contentvideodetailpage");
      ntf.navigate();	
    }

  };
});