define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
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
    }
  };
});