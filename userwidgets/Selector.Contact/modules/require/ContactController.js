define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.flxCall.onClick = this.openPhoneService.bind( this );
      this.view.flxEmail.onClick = this.sendEmail.bind( this );
      this.view.flxLocator.onClick = this.openMap.bind( this );
    },
    openPhoneService: function CallTheNumber() {
      try
      {
        var number="123456789";
        kony.phone.dial(number);
      } 
      catch(err)
      {
        alert("error in dial:: "+err);
      }
    },
    
    sendEmail: function SendtheMail(){
      
      try
      {
      // Set the recipients.
      var to = ["support@amway.com"];
      var cc=["abc@abc.com"];
      var bcc = ["xyz@xyz.com"];

      // Set the subject.
      var sub = "Hello";

      // Message body.
      var msgbody = "Testing openEmail";

//       // Get an image from local storage.
//       var imgobj1 = getImageFromLocalStorage("xui.png");

//       // Cropt the image.
//       imgobj1.cropToRect([10, 10, 100, 100]);

//       // Attach the image to the message.
//       var attach = [{
//           mimetype: "image/png",
//           attachment: imgobj1.getImageAsRawBytes(kony.image.ENCODE_JPEG),
//           filename: "filepng"
//       }];

      // Demonstrates how to print the attachment.
      //kony.print(attach);

      // Send the email.
      kony.phone.openEmail(to, cc, bcc, sub, msgbody, null, null);
      }
      catch(err) {
        alert("error in dial:: "+err);
       }
    },
    
    openMap: function (){
      kony.application.openURL('https://maps.google.com/?q=term 1 Jalan Kilang Timor, #01-02 Pacific Tech Centre, Singapore 159303');
    }

  };
});