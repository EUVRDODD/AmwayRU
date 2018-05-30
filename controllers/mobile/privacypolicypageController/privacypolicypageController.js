define({ 

  onNavigate: function() {
  this.init();
  },
  init : function(){
  this.applyBindings(); 
  },
  applyBindings : function(){
    this.view.postShow = this.policyPostshow.bind(this);
    this.view.preShow=this.policyPreshow.bind(this);
    this.view.btnMail.onClick = this.goToMail.bind(this);
    this.view.btnBack.onClick = this.goToLoginPage.bind(this);
  },
  
  policyPreshow:function(){
    
    this.view.onDeviceBack=this.goToLoginPage.bind(this);
    if(isIOS()){
      var policy1 = "<b>Privacy Policy for the users of Digital Tool Box</b><br>\n\nThis Privacy Policy describes how Amway India Enterprises Pvt. Ltd. (hereinafter to be referred as ‘<b>Amway</b>’) uses personal data collected or received from the users of Digital Tool Box (hereinafter to be referred as ‘Application’). It describes how we may collect or receive your personal data, the types of personal data we may collect, how we use, share and protect these data, your rights, and how you can contact us about our privacy practices.\n<br>\n\n<b>How We May Receive or Use Information from You</b><br>\n\n<b>Logged in as User.</b> If you are logged in on the Application as an Amway Distributor, we will use your Distributor ID only and keep you logged-in, till the time you logout from the application.\n<br>\n<b>Cookies.</b> If you are logged in on the Application, we may also use cookies or similar technologies that keeps your browser information on your device when you access, view and use the Application. A cookie is a data file placed on a mobile device when it is used to visit websites.\n<br>\nTo learn more about the cookies used by Amway, please read the \"<b>Website Privacy Notice</b>\".\nYou may disable cookies in your browser's settings (e.g., under the \"Preferences\" or \"Internet Options\" features of your browser). Note, however, that some features of the Website may not function properly if you disable the use of cookies. For detailed information on how to manage or delete cookies, visit <font color = \"#00275a\"> <a href =\"http://www.allaboutcookies.org/ \" >http://www.allaboutcookies.org/</a></font><br> ";
      this.view.richTxtPolicy1.text = policy1;
      var policy2 = "<b>The Types of Information We May Use</b><br>\nWe may use the following information from you:<br>\n•Amway Distributor Number Only\n<br>\n<b>The Types of Sensitive Personal Data We May Use</b><br>\nWe may use the following <b>Sensitive</b> personal data from you:<br>\n•Password for accessing our Application.\n<br>\n<b>How We Use the Information and Sensitive Personal Data</b><br>\nWe may use the information we obtain about you to:<br>\n•To manage your login information as an Amway Distributor.<br>\n•Evaluating your satisfaction with our current programs and modules on the app.<br>\n•Comply with applicable legal requirements, industry standards and our policies.<br>\n<br>\n\n\n<b>How We May Share Your Information and Sensitive Data</b><br>\nAmway does not sell, rent or trade or publish your personal and sensitive data except as required by law. Amway may share your personal and sensitive data only with:<br>\n•Entities within the Amway group to whom it is reasonably necessary or desirable for Amway to disclose personal and Sensitive data;<br>\n•Government authorities or other third parties, if required by law or reasonably necessary to protect the rights, property and safety of others or ourselves.\n<br>\n\n<b>International Data Transfers</b><br>\nWe may transfer the personal data we collect about you to other Amway affiliates or other entities of Amway's mother company Alticor Inc. Some of them may be in in countries other than the country in which the data were originally collected. When we transfer your personal data to Amway entities in other countries, we will protect that data as described in this Privacy Policy and in accordance with applicable law.\n<br>\n\n<b>How We Protect Personal Data</b><br>\nWe maintain appropriate technical and organizational security safeguards designed to protect the personal data you provide against accidental, unlawful or unauthorized destruction, loss, alteration, access, disclosure or use.\n<br>\n\n<b>How Long We Retain Your Information</b><br>\nWe store your sign-in information for 30 days to fulfil the purposes for which we use the data (see above under \"<b>How We Use the Personal Data We Collect</b>\"), except if required otherwise by law.\n<br>\n\n<b>Updates to this Privacy Policy</b><br>\nAmway may update this Privacy Policy from time to time. Please check back frequently, especially before you submit any Personal and/or Sensitive Information, to see if this Privacy Policy has changed. We will notify you of any significant changes to this Privacy Policy on the Application. All changes shall be effective from the date of notification on the Application, unless otherwise provided in the notification.\n<br>\n\n<b>Acceptance to this Privacy Policy</b><br>\nBy signing in the Application, you acknowledge acceptance of this Privacy Policy in effect at the time of use.\n<br>\n\n<b>Your Rights</b><br>\nYour rights under applicable law may include access to the personal data we process about you and the right to have such personal data corrected.\n<br>\n\n<b>How to Contact Us</b><br>\nIf you have any comments or inquiries about this Privacy Policy, if you would like to update information we have about you, or to exercise your rights, you may contact us at";
      this.view.richTxtPolicy2.text = policy2;
    }
    this.view.flxScrollPrivacyPolicy.contentOffset={x:"0%", y:"0%"};
  },
  policyPostshow : function(){
    try{
      //this.PostshowAnalytics(this.view);
      var  additionalArg = [""];
  	 kony.print("Tealium form widgets json for policypage :: "+JSON.stringify(additionalArg));
     callTealiumOnScreenLoad(this.view.id, additionalArg, null, false);
    }catch(ex){
      kony.print("jani exception :: "+ex);
    }
  },
  PostshowAnalytics :function(formName){
  	 var  additionalArg = [""];
  	 //additionalArg.push(this.view.id);
  	 kony.print("Tealium form widgets json for policypage :: "+JSON.stringify(additionalArg));
     callTealiumOnScreenLoad(this.view,additionalArg);
	},
  goToMail : function(){
    if(isIOS()){
            //Invokes function 'checkEmailJs'
            var isMailConfigured = com.checkEmail.checkEmailJs();
            kony.print("isMailConfigured "+isMailConfigured);
            if(!isMailConfigured){
              showInformationAlert("Info", "Mail not Configured");
              return;
            }
          }
    
    var to = ["care@amway.com"];
    kony.print("jani >>> to mail "+to);
    var cc = [];
    kony.phone.openEmail(to, cc, null, null, null, null, null);
  },
  goToLoginPage:function(){
    comingFromTerms=true;
    var ntf=new kony.mvc.Navigation("loginpage");
    ntf.navigate();
  }
  
 });