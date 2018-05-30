define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.flexOpenRecentSearch.onClick = this.openRecentSearch.bind( this );
    },
    openRecentSearch: function(){
      callTealiumOnClick("click_action","open_search",["flexOpenRecentSearch"],gblVisitor_imcID);
//       var ntf = new kony.mvc.Navigation("recentsearchpage");
      var ntf = new kony.mvc.Navigation("searchresultspage");
      ntf.navigate();	
    }
  };
});