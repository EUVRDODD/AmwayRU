define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.clearButton.onClick = this.moveToClearSearch.bind( this );
    },
    moveToClearSearch: function(){
      kony.store.removeItem("recentSearches");
      var ntf = new kony.mvc.Navigation("searchresultspage");
      ntf.navigate();	
    }

  };
});