package com.konylabs.ffi;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Vector;
import com.konylabs.api.TableLib;
import com.konylabs.vm.LuaTable;



import com.kony.dpr1.DownloadWrapper;
import com.konylabs.libintf.Library;
import com.konylabs.libintf.JSLibrary;
import com.konylabs.vm.LuaError;
import com.konylabs.vm.LuaNil;


public class NDD_com_kony_download extends JSLibrary {

 
	String[] methods = { };


 Library libs[] = null;
 public Library[] getClasses() {
 libs = new Library[1];
 libs[0] = new DownloadManagerAnd();
 return libs;
 }



	public NDD_com_kony_download(){
	}

	public Object[] execute(int index, Object[] params) {
		// TODO Auto-generated method stub
		Object[] ret = null;
 
		int paramLen = params.length;
 int inc = 1;
		switch (index) {
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
		return "com.kony.download";
	}


	/*
	 * return should be status(0 and !0),address
	 */
 


class DownloadManagerAnd extends JSLibrary {

 
 
	public static final String startDownload = "startDownload";
 
 
	public static final String stopDownload = "stopDownload";
 
 
	public static final String startDownloadUsingDM = "startDownloadUsingDM";
 
	String[] methods = { startDownload, stopDownload, startDownloadUsingDM };

	public Object createInstance(final Object[] params) {
 return new com.kony.dpr1.DownloadWrapper(
 (java.lang.String)params[0] , (java.lang.String)params[1] , (com.konylabs.vm.Function)params[2] );
 }


	public Object[] execute(int index, Object[] params) {
		// TODO Auto-generated method stub
		Object[] ret = null;
 
		int paramLen = params.length;
 int inc = 1;
		switch (index) {
 		case 0:
 if (paramLen < 2 || paramLen > 3){ return new Object[] {new Double(100),"Invalid Params"};}
 inc = 1;
 
 java.lang.String url0 = null;
 if(params[0+inc] != null && params[0+inc] != LuaNil.nil) {
 url0 = (java.lang.String)params[0+inc];
 }
 java.lang.String fileName0 = null;
 if(params[1+inc] != null && params[1+inc] != LuaNil.nil) {
 fileName0 = (java.lang.String)params[1+inc];
 }
 ret = this.startDownload(params[0]
 ,url0
 ,fileName0
 );
 
 			break;
 		case 1:
 if (paramLen < 0 || paramLen > 1){ return new Object[] {new Double(100),"Invalid Params"};}
 inc = 1;
 
 ret = this.stopDownload(params[0]
 );
 
 			break;
 		case 2:
 if (paramLen < 2 || paramLen > 3){ return new Object[] {new Double(100),"Invalid Params"};}
 inc = 1;
 
 java.lang.String url2 = null;
 if(params[0+inc] != null && params[0+inc] != LuaNil.nil) {
 url2 = (java.lang.String)params[0+inc];
 }
 java.lang.String fileName2 = null;
 if(params[1+inc] != null && params[1+inc] != LuaNil.nil) {
 fileName2 = (java.lang.String)params[1+inc];
 }
 ret = this.startDownloadUsingDM(params[0]
 ,url2
 ,fileName2
 );
 
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
		return "DownloadManagerAnd";
	}

	/*
	 * return should be status(0 and !0),address
	 */
 
 
 	public final Object[] startDownload( Object self ,java.lang.String inputKey0
 ,java.lang.String inputKey1
 ){
 
		Object[] ret = null;
 ((com.kony.dpr1.DownloadWrapper)self).startDownload( inputKey0
 , inputKey1
 );
 
 ret = new Object[]{LuaNil.nil, new Double(0)};
 		return ret;
	}
 
 
 	public final Object[] stopDownload( Object self ){
 
		Object[] ret = null;
 ((com.kony.dpr1.DownloadWrapper)self).stopDownload( );
 
 ret = new Object[]{LuaNil.nil, new Double(0)};
 		return ret;
	}
 
 
 	public final Object[] startDownloadUsingDM( Object self ,java.lang.String inputKey0
 ,java.lang.String inputKey1
 ){
 
		Object[] ret = null;
 ((com.kony.dpr1.DownloadWrapper)self).startDownloadUsingDM( inputKey0
 , inputKey1
 );
 
 ret = new Object[]{LuaNil.nil, new Double(0)};
 		return ret;
	}
 
}

};
