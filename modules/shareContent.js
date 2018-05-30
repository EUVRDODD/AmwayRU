//#ifdef iphone
function shareContentiOS(url){
	com.kony.sharing(url);
}
//#endif

function shareContentAndroid(url){
  kony.print("Hi From shareContentAndroid ")
  var text = url;
  var KonyMain = java.import("com.konylabs.android.KonyMain"); 
  var Intent = java.import("android.content.Intent");
  var share = new Intent("android.intent.action.SEND");
  share.setType("text/plain");
  share.addFlags(524288);
  share.putExtra("android.intent.extra.TEXT", text);
  KonyMain.getActContext().startActivity(Intent.createChooser(share, "Share Text"));
}


