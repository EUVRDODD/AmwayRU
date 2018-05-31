package com.konylabs.ffi;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Vector;
import com.konylabs.api.TableLib;
import com.konylabs.vm.LuaTable;



import kony.com.amwaylabelsize.KonyWrapper;
import com.konylabs.libintf.Library;
import com.konylabs.libintf.JSLibrary;
import com.konylabs.vm.LuaError;
import com.konylabs.vm.LuaNil;


public class N_FontSizeAnd extends JSLibrary {

 
 
	public static final String appServiceLabelSize = "appServiceLabelSize";
 
 
	public static final String preAppInitCal = "preAppInitCal";
 
	String[] methods = { appServiceLabelSize, preAppInitCal };


 Library libs[] = null;
 public Library[] getClasses() {
 libs = new Library[0];
 return libs;
 }



	public N_FontSizeAnd(){
	}

	public Object[] execute(int index, Object[] params) {
		// TODO Auto-generated method stub
		Object[] ret = null;
 
		int paramLen = params.length;
 int inc = 1;
		switch (index) {
 		case 0:
 if (paramLen != 0){ return new Object[] {new Double(100),"Invalid Params"}; }
 ret = this.appServiceLabelSize( );
 
 			break;
 		case 1:
 if (paramLen != 0){ return new Object[] {new Double(100),"Invalid Params"}; }
 ret = this.preAppInitCal( );
 
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
		return "FontSizeAnd";
	}


	/*
	 * return should be status(0 and !0),address
	 */
 
 
 	public final Object[] appServiceLabelSize( ){
 
		Object[] ret = null;
 kony.com.amwaylabelsize.KonyWrapper.setKonyActivityListener( );
 
 ret = new Object[]{LuaNil.nil, new Double(0)};
 		return ret;
	}
 
 
 	public final Object[] preAppInitCal( ){
 
		Object[] ret = null;
 kony.com.amwaylabelsize.KonyWrapper.adjustFontScale( );
 
 ret = new Object[]{LuaNil.nil, new Double(0)};
 		return ret;
	}
 
};
