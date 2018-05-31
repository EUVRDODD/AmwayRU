package com.konylabs.ffi;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Vector;
import com.konylabs.api.TableLib;
import com.konylabs.vm.LuaTable;



import com.kony.tealiumffi.TealiumFFIMain;
import com.konylabs.libintf.Library;
import com.konylabs.libintf.JSLibrary;
import com.konylabs.vm.LuaError;
import com.konylabs.vm.LuaNil;


public class N_Tealium extends JSLibrary {

 
 
	public static final String initSharedInstance = "initSharedInstance";
 
 
	public static final String trackEvent = "trackEvent";
 
 
	public static final String trackView = "trackView";
 
	String[] methods = { initSharedInstance, trackEvent, trackView };


 Library libs[] = null;
 public Library[] getClasses() {
 libs = new Library[0];
 return libs;
 }



	public N_Tealium(){
	}

	public Object[] execute(int index, Object[] params) {
		// TODO Auto-generated method stub
		Object[] ret = null;
 
		int paramLen = params.length;
 int inc = 1;
		switch (index) {
 		case 0:
 if (paramLen != 4){ return new Object[] {new Double(100),"Invalid Params"}; }
 java.lang.String accountName0 = null;
 if(params[0] != null && params[0] != LuaNil.nil) {
 accountName0 = (java.lang.String)params[0];
 }
 java.lang.String profileName0 = null;
 if(params[1] != null && params[1] != LuaNil.nil) {
 profileName0 = (java.lang.String)params[1];
 }
 java.lang.String environmentName0 = null;
 if(params[2] != null && params[2] != LuaNil.nil) {
 environmentName0 = (java.lang.String)params[2];
 }
 java.lang.String key0 = null;
 if(params[3] != null && params[3] != LuaNil.nil) {
 key0 = (java.lang.String)params[3];
 }
 ret = this.initSharedInstance( accountName0, profileName0, environmentName0, key0 );
 
 			break;
 		case 1:
 if (paramLen != 3){ return new Object[] {new Double(100),"Invalid Params"}; }
 java.lang.String callType1 = null;
 if(params[0] != null && params[0] != LuaNil.nil) {
 callType1 = (java.lang.String)params[0];
 }
 java.lang.String data1 = null;
 if(params[1] != null && params[1] != LuaNil.nil) {
 data1 = (java.lang.String)params[1];
 }
 java.lang.String key1 = null;
 if(params[2] != null && params[2] != LuaNil.nil) {
 key1 = (java.lang.String)params[2];
 }
 ret = this.trackEvent( callType1, data1, key1 );
 
 			break;
 		case 2:
 if (paramLen != 3){ return new Object[] {new Double(100),"Invalid Params"}; }
 java.lang.String screenName2 = null;
 if(params[0] != null && params[0] != LuaNil.nil) {
 screenName2 = (java.lang.String)params[0];
 }
 java.lang.String data2 = null;
 if(params[1] != null && params[1] != LuaNil.nil) {
 data2 = (java.lang.String)params[1];
 }
 java.lang.String key2 = null;
 if(params[2] != null && params[2] != LuaNil.nil) {
 key2 = (java.lang.String)params[2];
 }
 ret = this.trackView( screenName2, data2, key2 );
 
 			break;
 		default:
			break;
		}
 
		return ret;
	}

	public String[] getMethods() {
		// TODO Auto-generated method stub
		return methods;
	}
	public String getNameSpace() {
		// TODO Auto-generated method stub
		return "Tealium";
	}


	/*
	 * return should be status(0 and !0),address
	 */
 
 
 	public final Object[] initSharedInstance( java.lang.String inputKey0, java.lang.String inputKey1, java.lang.String inputKey2, java.lang.String inputKey3 ){
 
		Object[] ret = null;
 com.kony.tealiumffi.TealiumFFIMain.initialize( inputKey0
 , inputKey1
 , inputKey2
 , inputKey3
 );
 
 ret = new Object[]{LuaNil.nil, new Double(0)};
 		return ret;
	}
 
 
 	public final Object[] trackEvent( java.lang.String inputKey0, java.lang.String inputKey1, java.lang.String inputKey2 ){
 
		Object[] ret = null;
 com.kony.tealiumffi.TealiumFFIMain.trackEvent( inputKey0
 , inputKey1
 , inputKey2
 );
 
 ret = new Object[]{LuaNil.nil, new Double(0)};
 		return ret;
	}
 
 
 	public final Object[] trackView( java.lang.String inputKey0, java.lang.String inputKey1, java.lang.String inputKey2 ){
 
		Object[] ret = null;
 com.kony.tealiumffi.TealiumFFIMain.trackView( inputKey0
 , inputKey1
 , inputKey2
 );
 
 ret = new Object[]{LuaNil.nil, new Double(0)};
 		return ret;
	}
 
};
