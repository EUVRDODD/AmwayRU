package com.konylabs.customwidget;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Vector;
import com.konylabs.api.TableLib;
import com.konylabs.vm.LuaTable;

import com.konylabs.libintf.Library;
import com.konylabs.libintf.JSLibrary;
import com.konylabs.vm.LuaError;
import com.konylabs.vm.LuaNil;
import com.konylabs.api.ui.KonyCustomWidget;

public class N_PDFViewer extends JSLibrary {

 Library libs[] = null;
 public Library[] getClasses() {
 libs = new Library[1];
 libs[0] = new PdfCustomWidget();
 return libs;
 }
		
		public N_PDFViewer(){
	}
	public String getNameSpace() {
		return "PDFViewer";
	}

static class PdfCustomWidget extends JSLibrary {
 
 
	public static final String setPdfURL = "setPdfURL";
 
	String[] methods = { setPdfURL };
 String[] props = { };
 private static Hashtable<String, Integer> propertyTypeMappings = null;
 public Object createInstance(final Object[] properties, long jsobject) {
 if(propertyTypeMappings == null) {
 propertyTypeMappings = new Hashtable<String, Integer>();
 
 }

 KonyCustomWidget widget = new com.cpcg.pdfviewer.PdfViewerWidget();
 widget.initProperties(properties,jsobject,propertyTypeMappings);
 return widget;
 }


	public Object[] execute(int index, Object[] params) {
		// TODO Auto-generated method stub
		Object[] ret = null;
 try {
		int paramLen = params.length;
 int inc = 1;
		switch (index) {
 		case 0:
 if (paramLen < 1 || paramLen > 2){ return new Object[] {new Double(100),"Invalid Params"};}
 inc = 1;
 
 java.lang.String url0 = null;
 if(params[0+inc] != null && params[0+inc] != LuaNil.nil) {
 url0 = (java.lang.String)params[0+inc];
 }
 ret = this.setPdfURL(params[0]
 ,url0
 );
 
 			break;
 		default:
			break;
		}
 }catch (Exception e){
			ret = new Object[]{e.getMessage(), new Double(101), e.getMessage()};
		}
		return ret;
	}

	public String[] getMethods() {
		// TODO Auto-generated method stub
		return methods;
	}
	public String getNameSpace() {
		// TODO Auto-generated method stub
		return "PdfCustomWidget";
	}
	public String[] getProperties() {
		// TODO Auto-generated method stub
		return props;
	}
	/*
	 * return should be status(0 and !0),address
	 */
 
 
 	public final Object[] setPdfURL( Object self ,java.lang.String inputKey0
 ){
 
		Object[] ret = null;
 ((com.cpcg.pdfviewer.PdfViewerWidget)self).setPdfURL( inputKey0
 );
 
 ret = new Object[]{LuaNil.nil, new Double(0)};
 		return ret;
	}
 
}

};
