define({ 

 //Type your controller code here 
	onNavigate:function(){
      controllerReference=this;
    },
  init : function() {
    this.applyBindings();

  },
  
  applyBindings : function(){
    this.view.postShow = this.termsConditionsPostshow.bind(this);
    this.view.preShow=this.termsConditionsPreshow.bind(this);
  },
  
  termsConditionsPreshow:function(){
    //this.view.flxScrollTermsOfUse.contentOffset={x:"0%", y:"0%"};
  },
  termsConditionsPostshow : function(){
   controllerReference.PostshowAnalytics(this.view);
  },
  PostshowAnalytics :function(formName){
  	 var  additionalArg = [];
  	 additionalArg.push(this.view.id);
  	 kony.print("Tealium form widgets json for TermsConditionspage :: "+JSON.stringify(additionalArg));
     callTealiumOnScreenLoad(this.view,additionalArg);
	},
    showNotification:function(){
    try{
      controllerReference.view.Popup.isVisible=true;
    }catch(e){}
  },
  

  
 });