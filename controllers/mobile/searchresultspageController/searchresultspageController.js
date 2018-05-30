define({
  currentForm: this,


  applyBindings: function(){
      
    thisForm = this;
    searchFlag=false;
    this.view.flxToast.isVisible=false;
    segmentSearchData = null;
    termSearchValue = "";
    pageComponents = ["Popup"];
    if(!isNetworkAvailable()){
      kony.print("rahul >>> enter into offline mode in homepage : ");
      var offlineContentList = [];
      var offlineContent = retrieveJson("offlineContent");
      kony.print("rahul >>> offlineContent data : " +JSON.stringify(offlineContent));
      for (var key in offlineContent) {
         var expr =  !isBlankOrNull(offlineContent[key]["otherLanguageDownload"]) && offlineContent[key]["otherLanguageDownload"];
     		  kony.print("NSR@@ other language download "+expr);
        if(offlineContent[key]["isDownloaded"] || expr  ){
          offlineContentList.push(offlineContent[key]);
        }
//         else{
          
//           if(!offlineContent[key]["isBookmarked"]){
//             offlineContentList.push(offlineContent[key]);
//           }
//         }
      }
      var offlineImageContent = retrieveJsonForImages("offlineImageContent");
         var base64_ = null;
      for(var i=0;i<offlineContentList.length;i++){
           if(!isNetworkAvailable() && isIOS()){
                  var fileName = offlineContentList[i].fileName;
                 if(!isBlankOrNull(offlineImageContent)){
                   base64_ = offlineImageContent[fileName];
                   if(!isBlankOrNull(base64_))
                   {
                     offlineContentList[i].imgContent = {base64 :base64_};
                   }
                 }
             }
		}
      
      var sortedOfflineContentList = kony.table.sort(offlineContentList, "updatedDate",comparisionFunction);
      kony.print("Sreeni after offlinecontentlist length is ::"+sortedOfflineContentList.length);
      //kony.print("jani >>> sortedOfflineContentList :"+JSON.stringify(sortedOfflineContentList));
      kony.print("jani >>> sortedOfflineContentList length : "+sortedOfflineContentList.length);
      segmentData = sortedOfflineContentList;
      gblContentList = sortedOfflineContentList;

    }
   
    
    
    segmentSearchData =segmentData.concat(staticSearchData);

    if(!comingFromContent){
      this.view.segSearchResult.removeAll();
      this.view.tbxSearchResult.text = "";
      this.view.flxRecentSearchWraper.zIndex = 2;
      this.view.flxSearchResultOutputWraper.opacity = 1;
      //By default show the recent search items
      thisForm.populateRecentSearch();

    }else{
      comingFromContent=false;
    }

    

    var textChanged = false;
    swipedSearch="0";
    // Add gesture handler for row swipe
    this.addSwipeGestureHandler();
   

    /* App Menu */
    // this.view.goToAdvancedSearch.onClick = this.goToAdvancedSearch.bind( this );
    this.view.goToHome.onClick = this.goToHome.bind( this );
    this.view.goToSettings.onClick = this.goToSettings.bind( this );
    this.view.goToMyContent.onClick = this.goToMyContent.bind( this );
    this.view.goToAppsWeb.onClick = this.goToAppsWeb.bind( this );
    //this.view.onDeviceBack=this.checkGoBack.bind(this);
    this.view.segSearchResult.onRowClick = this.segmentRowClicked.bind(this);
    this.view.postShow = this.goToPostShow.bind(this);
    this.view.backButton.onClick = this.checkGoBack.bind(this);

    //this.view.segSearchResult.isVisible =false;
    //      this.view.segSearchResult.onReachingEnd =function()
    // 	{
    //      	kony.print("on reaching end called ") ;
    //         this.scrollToSearchListEnd();
    //      } ; 
    
    /* Search Text Box */
    this.view.tbxSearchResult.onTouchStart = function() {
      // this.text = "";
      this.placeholder = "Enter search keywords";
      thisForm.populateRecentSearch();
    };
   

    this.view.tbxSearchResult.onTextChange = function() { 
      if(this.text.trim()!=""){
        if(!textChanged) {
          thisForm.view.flxRecentSearchWraper.height = (parseInt(thisForm.view.flxRecentSearchWraper.height.split('d')[0])+50).toString() + "dp";     
          thisForm.view.flxSearchKeywords.height = "50dp";
          textChanged = true;
        }
        else if(this.text == "") {
          thisForm.view.flxRecentSearchWraper.height = (parseInt(thisForm.view.flxRecentSearchWraper.height.split('d')[0])-50).toString() + "dp";     
          thisForm.view.flxSearchKeywords.height = "0dp";
          textChanged = false;
        }
        thisForm.view.lblSearchKeywords.text = this.text;
      }else{
        textChanged = false;
        thisForm.view.flxSearchKeywords.height = "0dp";
        this.text = "";
        thisForm.view.lblSearchKeywords.text = "";
      }

    };
    this.view.tbxSearchResult.onDone = function(){
      if( this.text.length > 2 && this.text.length < 36) {
        thisForm.view.flxRecentSearchWraper.zIndex = 1;
        thisForm.view.flxSearchResultOutputWraper.opacity = 1;
        thisForm.view.segSearchResult.setData([]);
        thisForm.searchFor(this.text);
      }else{
        this.setFocus(true);
      }
    };

    /* Clear Label */
    this.view.lblClearSearches.onTouchStart = function() {
      kony.store.removeItem("recentSearches");
      thisForm.populateRecentSearch();
    };

    /* Back Button */
    //     this.view.backButton.onClick = function() {
    //       var ntf;
    //       kony.print("Sreeni previousform is "+ thisForm.getPreviousForm()  );
    //       if(isNetworkAvailable()){
    //         if(thisForm.getPreviousForm()== "feedbackpage"){
    //           kony.print("Sreeni previousform is feedbackpage page only");
    //           ntf = new kony.mvc.Navigation( "feedbackpage");
    //         }else if(thisForm.getPreviousForm()== "mycontentpage"){
    //           ntf = new kony.mvc.Navigation( "mycontentpage");
    //         }
    //         else{
    //           ntf = new kony.mvc.Navigation( "homepage");
    //         }
    //       }else{
    //         ntf=new kony.mvc.Navigation("mycontentpage"); 
    //       }

    //       ntf.navigate();
    //     };

    // back button by janibasha for experiment 
    /*    this.view.backButton.onClick = function() {
      var ntf;
      //kony.print("Sreeni previousform is "+ thisForm.getPreviousForm()  );
      if(isNetworkAvailable()){
        var prevForm = gblFormBack.pop();
        kony.print("jani >>> onback button prev form"+prevForm);
        ntf = new kony.mvc.Navigation(prevForm); 
        //ntf.navigate();
      }else{
        ntf=new kony.mvc.Navigation("mycontentpage"); 
      }

      ntf.navigate();
    };		*/
    /* Recent Search Segment */
    this.view.segRecentSearch.onRowClick = function() {
      var index = this.selectedRowIndex[1];
      var rowData = this.selectedRowItems[0];
      if(rowData.lblRecentSearch=="No Search History!"){
        return;
      }
      // Delete the Row
      if( swipedSearch=="0" && rowData.imgRecentSearch == "icon_cross1.png" ) {
        if( kony.store.getItem("recentSearches") !== null)
          thisForm.deleteRow(index, rowData.lblRecentSearch);
        else
          rowData.imgRecentSearch = "icon_arrow.png";
      }
      // Toggle Action
      else if(swipedSearch!="0"){
        thisForm.view.flxRecentSearchWraper.zIndex=2;
        rowData.imgRecentSearch =  swipedSearch=="1" ? "icon_cross1.png" : "icon_arrow.png";          
        swipedSearch = "0";
        this.setDataAt(rowData, index);
      }
      // Search
      else {
        if( kony.store.getItem("recentSearches") !== null )
          thisForm.searchFor(rowData.lblRecentSearch);
        else thisForm.populateRecentSearch();
      }
    };

    /* Result Flex */
    this.view.flxSearchResultOutputWraper.onTouchStart = function() {

    };

  },


  checkGoBack:function(){
    //       if(!isNetworkAvailable() && this.getPreviousForm()=="homepage"){
    //          var navObj = new kony.mvc.Navigation("mycontentpage");
    //       	navObj.navigate();
    //       }else{
    //         var navObj = new kony.mvc.Navigation(this.getPreviousForm());
    //       	navObj.navigate();
    //       }

    var ntf;
    //kony.print("Sreeni previousform is "+ thisForm.getPreviousForm()  );
    
      var prevForm = gblFormBack.pop();
      kony.print("jani >>> onback button prev form"+prevForm);
      ntf = new kony.mvc.Navigation(prevForm); 
      //ntf.navigate();
    
    ntf.navigate();

  },

  showNotification:function(){
    try{
      thisForm.view.Popup.isVisible=true;
    }catch(e){}
  },


  goToHome: function(){

    var ntf = new kony.mvc.Navigation("homepage");
    ntf.navigate();	



  },
  goToMyContent: function(){
    var ntf = new kony.mvc.Navigation("mycontentpage");
    ntf.navigate();	
  },
  goToSettings: function(){
    var ntf = new kony.mvc.Navigation("settingpage");
    ntf.navigate();	
  },
  goToAppsWeb: function(){
    var ntf = new kony.mvc.Navigation("webapppage");
    ntf.navigate();	
  },
  goToAdvancedSearch: function(){
    var ntf = new kony.mvc.Navigation("advancesearchpage");
    ntf.navigate();	
  },


  addSwipeGestureHandler: function() {
    // Gesture Listner
    try {
      this.view.setGestureRecognizer(2, {fingers:1,swipedistance:50,swipevelocity:75}, onGestureFunction); // swipe with default parameters
    }
    catch(err) {
      kony.print("Error while regestering the gestures: "+err);
    }

    // Gesture Handler
    function onGestureFunction(commonWidget,gestureInfo) {
      try {
        var direction = "";
        var GesType = ""+gestureInfo.gestureType;
        var tapParams = gestureInfo.gesturesetUpParams.taps;
        if (GesType == "2") // Swipe gesture
        { 
          var swipeDirection = ""+gestureInfo.swipeDirection;
          swipedSearch = (swipeDirection=="1" || swipeDirection=="2") ? swipeDirection : "0";
        }
      }
      catch(err) {
        kony.print("Error in gesture call back: "+err);
      }
    }
  },
  populateRecentSearch: function() {
    // Clearing any previous search input
    //this.view.tbxSearchResult.text = "";
    this.view.lblSearchKeywords.text = "";
    this.view.lblSearchKeywords.placeholder = "Enter search keywords";
    this.view.flxSearchKeywords.height = "0dp";

    // Handling RecentSearches
    this.view.flxRecentSearchWraper.zIndex = 2;
    //this.view.flxSearchResultOutputWraper.opacity = 0.8;

    var recentSearches = JSON.parse(kony.store.getItem("recentSearches"));
    this.view.segRecentSearch.removeAll();

    // No Recent Search
    if( recentSearches === null || recentSearches === [] ) {      
      this.view.flxRecentSearchWraper.height = "150dp";
      this.view.segRecentSearch.height = "51dp";
      recentSearches = {"lblRecentSearch":"No Search History!","imgRecentSearch":""};
      var noSearchHistory=[];
      noSearchHistory.push(recentSearches);
      this.view.segRecentSearch.setData(noSearchHistory);      
    }
    // Data found in Recent Search
    else {
      this.view.flxRecentSearchWraper.height = (150+( 51*(recentSearches.length-1) )).toString() + "dp";
      this.view.segRecentSearch.height = (51*recentSearches.length).toString() + "dp";
      var SearchHistory=[];
      for(var i=recentSearches.length-1; i>=0; i--) {
        recentSearches[i] = {"lblRecentSearch": recentSearches[i], "imgRecentSearch": "icon_arrow.png"};
        //this.view.segRecentSearch.addDataAt(recentSearches[i], 0);
        SearchHistory.push(recentSearches[i]);
      }
      this.view.segRecentSearch.setData(SearchHistory); 
    }
  },
 
  searchFor: function(keywords) {
    try {
      showLoading();
      kony.print("Searching for: " + keywords);
      this.view.tbxSearchResult.text =keywords;
      this.view.segSearchResult.removeAll();
      var recentSearches = kony.store.getItem("recentSearches");

      var data = recentSearches === null ? [keywords] : JSON.parse(recentSearches);
      if( recentSearches !== null ) {
        var itemIndex = data.indexOf(keywords); // find the index of current text
        // Altering position in recent search
        if( itemIndex > -1 ) {              
          data.splice(itemIndex, 1); // data is present, so remove it from the array
        }
        data.push(keywords);
      }          
      if(data.length>7) data.shift();

      kony.store.setItem("recentSearches", JSON.stringify(data) );

      if(isBlankOrNull(segmentSearchData)){
        dismissLoading();
        showInformationAlert(getI18Value("StoreLocatorError"));
        return;
      }
      
      if(!isNetworkAvailable()){
      kony.print("rahul >>> enter into offline mode in homepage : ");
      var offlineContentList = [];
      var offlineContent = retrieveJson("offlineContent");
      kony.print("rahul >>> offlineContent data : " +JSON.stringify(offlineContent));
      for (var key in offlineContent) {
        var expr =  !isBlankOrNull(offlineContent[key]["otherLanguageDownload"]) && offlineContent[key]["otherLanguageDownload"];
    	kony.print("NSR@@ other language download "+expr);
        if(offlineContent[key]["isDownloaded"] || expr  ){
          offlineContentList.push(offlineContent[key]);
        }
//         else{
          
//           if(!offlineContent[key]["isBookmarked"]){
//             offlineContentList.push(offlineContent[key]);
//           }
//         }
      }
        var offlineImageContent = retrieveJsonForImages("offlineImageContent");
         var base64_ = null;
        for(var i=0;i<offlineContentList.length;i++){
           if(!isNetworkAvailable()&& isIOS()){
                  var fileName = offlineContentList[i].fileName;
                 if(!isBlankOrNull(offlineImageContent)){
                   base64_ = offlineImageContent[fileName];
                   if(!isBlankOrNull(base64_))
                   {
                     offlineContentList[i].imgContent = {base64 :base64_};
                   }
                 }
             }
		}
      var sortedOfflineContentList = kony.table.sort(offlineContentList, "updatedDate",comparisionFunction);
      kony.print("Sreeni after offlinecontentlist length is ::"+sortedOfflineContentList.length);
      //kony.print("jani >>> sortedOfflineContentList :"+JSON.stringify(sortedOfflineContentList));
      kony.print("jani >>> sortedOfflineContentList length : "+sortedOfflineContentList.length);
      segmentData = sortedOfflineContentList;
      gblContentList = sortedOfflineContentList;
	  segmentSearchData = segmentData.concat(staticSearchData);
    }
      
      
      var contentData = segmentSearchData;
      //       if(isNetworkAvailable()){
      //          contentData = segmentSearchData;
      //       }else{
      //          contentData = staticSearchData;
      //       }


      keywords = keywords.toLowerCase();
      searchResult = [];
      searchCount = 0;
      termSearchValue = keywords;
      kony.print("search text : " + keywords);
	  //this.trackEventAnalytics("search_result_click", keywords);
      for(var i=0; i<contentData.length; i++) {
        var record = contentData[i];

        if(undefined != record["lbltitle"]){
          if (record["lbltitle"].toLowerCase().indexOf(keywords) > -1 ) {
            searchResult.push(record);
            continue;
          }
        }

        if(undefined != record["rchContentDesc"]){
          if (record["rchContentDesc"].toLowerCase().indexOf(keywords) > -1 ) {
            searchResult.push(record);
            continue;
          }
        }

        if(undefined != record["profileName"]){
          if (record["profileName"].toLowerCase().indexOf(keywords) > -1 ) {
            searchResult.push(record);
            continue;
          }
        }

        if(undefined != record["profileSub"]){
          if (record["profileSub"].toLowerCase().indexOf(keywords) > -1 ) {
            searchResult.push(record);
          }
        }
      }
      this.view.flxRecentSearchWraper.zIndex = 1;
      this.view.flxSearchResultOutputWraper.opacity = 1;
      var searchcountFlag = true;
      if(isBlankOrNull(searchResult)){
        searchcountFlag = false;
        //kony.print("jani >>> search result length "+searchResult.length);
        dismissLoading();
        thisForm.trackViewAnalytics(this.view, keywords, "zero");
        showInformationAlert(getI18Value("StoreLocatorError"));
        return;
      }
      kony.print("Search result : " + searchResult.length);
      if(searchcountFlag){
      var searchResultCount = searchResult.length;
      thisForm.trackViewAnalytics(this.view, keywords, searchResultCount);
      }
      // this.scrollToSearchListEnd();
      var currentFormVal = kony.application.getCurrentForm();
      kony.print("currentFormVal "+currentFormVal);
      this.view.flxSearchResultOutputWraper.contentOffset={x:"0%",y:"0%"};
      this.view.segSearchResult.setData(searchResult);
      dismissLoading();
    } catch(e) {
      dismissLoading();
      showInformationAlert(getI18Value("StoreLocatorError")); 
    }


  },
  trackViewAnalytics : function(formName, keywords, searchResultCount){
    
    var platform = getDevicePlatform();
      var argumentsArray = {
        "app_type": platform,
        "app_country": "in",
        "app_language": getDeviceLanguage(),
        "app_digitalProperty": "Amway Business app",
        "app_region": "eia",
        "event_name": "onsite_search",
        "page_detail": formName.id, //PAGE NAME, eg: Form1
        "page_section": "search",
        "search_keyword": keywords,
        "search_results": searchResultCount,  //if zero results, pass "zero"
        "visitor_imcID":gblVisitor_imcID,
        "page_components": pageComponents //Names of components in the form/page sent as an array. Example: ["slider","doclist","segTemplate"]
      };
    	Tealium.trackView(this.view.id,JSON.stringify(argumentsArray),"eia-hub-app");
    
  },
  scrollToSearchListEnd:function()
  {
    kony.print("on scrolling end");
    var displayData = searchResult;
    if(searchCount < displayData.length)
    {
      var max = 0;
      if(searchCount+10 < displayData.length)
      {
        max = searchCount+10;
      }
      else
      {
        max = displayData.length;
      }
      var currentData = new Array();
      for(var i=searchCount; i<max; i++)
      {
        currentData.push(displayData[i]);
      }
      this.view.segSearchResult.addAll(currentData);
      searchCount = max;
    }
  },
  deleteRow: function(i, d) {
    // get text and index of selected row
    var storedData = JSON.parse(kony.store.getItem("recentSearches"));
    var storedDataIndex = storedData.indexOf(d);
    if(storedDataIndex > -1) {
      storedData.splice(storedDataIndex, 1);
      if(storedData.length===0) kony.store.removeItem("recentSearches");
      else {
        kony.store.setItem("recentSearches", JSON.stringify(storedData));
        this.view.segRecentSearch.removeAt(i);
        this.view.flxRecentSearchWraper.height = (parseInt(this.view.flxRecentSearchWraper.height.split('d')[0])-51).toString() + "dp"; 
        this.view.segRecentSearch.height = (parseInt(this.view.segRecentSearch.height.split('d')[0])-51).toString() + "dp"; 
      }
    }
    if(kony.store.getItem("recentSearches")===null ) {      
      this.populateRecentSearch();
    }
  },  
  disableFlex: function()
  {
    this.view.flxToast.isVisible=false;
    try{
      kony.timer.cancel("timerid");	
    }catch(e){
      kony.print(e);
    }			
  },
   searchTrackEventAnalytics : function(event_name,termSearchValue){
    var dataOnclickArray = {
      "app_type": getDevicePlatform() , //ios or android sent by OS of the device
      "app_country": "in",
      "app_language": getDeviceLanguage(),
      "app_digitalProperty": "Amway Business app",
      "app_region": "eia",
      "event_name": event_name, //"click_action",
      //"click_detail": "",//"header login",
      //"click_category":"",
      "search_keyword":termSearchValue,
      //"search_results": searchResult.length,
      "visitor_imcID":gblVisitor_imcID,
      "page_components": ["segSearchResult"]
    };
      Tealium.trackEvent("click_action", JSON.stringify(dataOnclickArray), "eia-hub-app");
    kony.print("jani >>> searchresult trackevents "+JSON.stringify(dataOnclickArray));
  },
  segmentRowClicked: function()
  {
    kony.print("jani >>> termSearchValue "+termSearchValue);
    thisForm.searchTrackEventAnalytics("search_result_click", termSearchValue);
    kony.print("jani >>> tersSearch Value END ");
    kony.print("row clicked");
    var data = this.view.segSearchResult.selectedRowItems[0];
    kony.print("row data : " + JSON.stringify(data));
    if(data["contentType"] == "TOOL"){
      if(data["contentId"] == "SHOP ONLINE"){
        //kony.application.openURL("https://www.amway.in");
        //Write code here
        if (!isNetworkAvailable())
        {
          this.view.flxToast.isVisible=true;
          try{
            kony.timer.cancel("timerid");	
          }catch(e){
            kony.print(e);
          }	
          
          try{
             kony.timer.schedule("timerid", this.disableFlex.bind(this), 5, false);
          }catch(e){
            kony.print("exception came");
          }
         
        }else{
          	 title="Shop Online";
             var ntf=new kony.mvc.Navigation("nutriliteWow");
             ntf.navigate(title);
        }
      }
      else if(data["contentId"] == "Income Simulator"){
        var ntf=new kony.mvc.Navigation("incomeSimulatorHome");
        ntf.navigate();
      }
      else if(data["contentId"] == "GIP Simulator"){
        var ntf=new kony.mvc.Navigation("GIPSimulatorHome");
        ntf.navigate();
      }
      else if(data["contentId"] == "Nutrilite W.O.W. Program"){
        if (!isNetworkAvailable())
        {
           this.view.flxToast.isVisible=true;
          try{
            kony.timer.cancel("timerid");	
          }catch(e){}			
          kony.timer.schedule("timerid", this.disableFlex.bind(this), 5, false);
        }
        else
        {
          var ntf=new kony.mvc.Navigation("nutriliteWow");
          ntf.navigate(null);
        }
      }
      else if(data["contentId"] == "Artistry Skincare Recommender"){
        if (!isNetworkAvailable())
        {
           this.view.flxToast.isVisible=true;
          try{
            kony.timer.cancel("timerid");	
          }catch(e){}			
          kony.timer.schedule("timerid", this.disableFlex.bind(this), 5, false);
        }
        else
        {
          var ntf=new kony.mvc.Navigation("nutriliteWow");
          ntf.navigate("Artistry Skincare Recommender");
        }
      }
      else if(data["contentId"] == "Nutrilite Product Recommender"){
        if (!isNetworkAvailable())
        {
           this.view.flxToast.isVisible=true;
          try{
            kony.timer.cancel("timerid");	
          }catch(e){}			
          kony.timer.schedule("timerid", this.disableFlex.bind(this), 5, false);
        }
        else
        {
          var ntf=new kony.mvc.Navigation("nutriliteWow");
          ntf.navigate("Nutrilite Product Recommender");
        }
      }
      else if(data["contentId"] == "Skincare Recommender"){
        if (!isNetworkAvailable())
        {
          this.view.flxToast.isVisible=true;
          try{
            kony.timer.cancel("timerid");	
          }catch(e){}			
          kony.timer.schedule("timerid", this.disableFlex.bind(this), 5, false);
        }else{
          kony.application.openURL("http://artistryrecommender.amway.in/");
        }
      }else if(data["contentId"] == "Nutrilite Recommender"){
        if (!isNetworkAvailable())
        {
           this.view.flxToast.isVisible=true;
          try{
            kony.timer.cancel("timerid");	
          }catch(e){}			
          kony.timer.schedule("timerid", this.disableFlex.bind(this), 5, false);
        }else{
          kony.application.openURL("http://nutriliterecommender.amway.in/");
        }
      }else if(data["contentId"] == "Product Catalogue"){
        
         if (!isNetworkAvailable())
        {
           this.view.flxToast.isVisible=true;
          try{
            kony.timer.cancel("timerid");	
          }catch(e){}			
          kony.timer.schedule("timerid", this.disableFlex.bind(this), 5, false);
        }
        else
        {
          comingFromContent=true;
           kony.application.openURL("http://www.amway.in/store/amway/en/INR/lmsSearch/lmsHandler?LMSURL=https%3a%2f%2findia.amwayuniversity.com%2fcourses%2fapp%2fmanagement%2fLMS_CNT_SilentLaunch.aspx%3fUserMode%3d0%26ActivityId%3d2555%26lang%3den-US");
// 		title="Product Catalogue";      
//         var ntf=new kony.mvc.Navigation("nutriliteWow");
//         ntf.navigate(title);
        }
        
        //kony.application.openURL("http://www.amway.in/store/amway/en/INR/lmsSearch/lmsHandler?LMSURL=https%3a%2f%2findia.amwayuniversity.com%2fcourses%2fapp%2fmanagement%2fLMS_CNT_SilentLaunch.aspx%3fUserMode%3d0%26ActivityId%3d2555%26lang%3den-US/");
      }else if(data["contentId"] == "MyBiz"){
        //kony.application.openURL("https://mybiz.amway.com/");
        if (!isNetworkAvailable())
        {
           this.view.flxToast.isVisible=true;
          try{
            kony.timer.cancel("timerid");	
          }catch(e){}			
          kony.timer.schedule("timerid", this.disableFlex.bind(this), 5, false);
        }
        else
        {
          var ntf=new kony.mvc.Navigation("nutriliteWow");
          ntf.navigate("MyBiz");
        }
      }
      return;
    }

    else{
      var expr1 =  !isBlankOrNull(data["otherLanguageDownload"]) && data["otherLanguageDownload"];
     		  kony.print("NSR@@ other language download "+expr1);
      if (!isNetworkAvailable() && !(data.isDownloaded) && !expr1 ){

        this.view.flxToast.isVisible=true;
        try{
          kony.timer.cancel("timerid");	
        }catch(e){}			
        kony.timer.schedule("timerid", this.disableFlex.bind(this), 5, false);
        return;
      }
    }
    
    searchFlag=true;
    var nav = new kony.mvc.Navigation("contentdetailpage");
    nav.navigate(data);
    
  }, 
  // Custom Controller Code End -- 
//   PostshowAnalytics :function(formName){
//   	 var  additionalArg = ["Popup"];
//   	 //additionalArg.push(this.view.id);
//   	 kony.print("Tealium form widgets json for searchresultpage :: "+JSON.stringify(additionalArg));
//      callTealiumOnScreenLoad(this.view,additionalArg,gblVisitor_imcID);
// 	},
  goToPostShow : function(){
	
    try{
     //this.PostshowAnalytics(this.view);
      	var prevForm = kony.application.getPreviousForm().id ;
        if(prevForm == "mycontentpage"){
          kony.print("jani >>> mycontent page pushing");
          gblFormBack.push(prevForm);
        }else if(prevForm == "homepage"){
          kony.print("jani >>> homepage page pushing");
          gblFormBack.push(prevForm);
        }else if(prevForm == "feedbackpage"){
          kony.print("jani >>> feedbackpage page pushing");
          gblFormBack.push(prevForm);
        }
        //kony.print(" jani >>> gblFormback list length searchresultspage :"+gblFormBack.length);
        kony.print(" jani >>> searchresultspage previous form " +prevForm);
    }catch(e){
      kony.print("Exception in goToPostShow ::"+e);
    }
    
  },

  onNavigate: function() {

    this.view.preShow = this.applyBindings.bind(this);
  }
});