define({
    AS_AppEvents_i48fbc0c859547549842f1b3fbd4ed2f: function AS_AppEvents_i48fbc0c859547549842f1b3fbd4ed2f(eventobject) {
        var self = this;
        checkTokenExist();
        //createDB();
        // getCategoriesList();
        if (isIOS()) {
            initDownloadManager();
        }
        kony.application.setApplicationBehaviors({
            "hideDefaultLoadingIndicator": true
        });
        //kony.lang.setUncaughtExceptionHandler(uncaughtExceptionHandler);
    },
    AS_AppEvents_cf9d2f55ee2a4081ac15cc1a93c35157: function AS_AppEvents_cf9d2f55ee2a4081ac15cc1a93c35157(eventobject) {
        var self = this;
        registerAppCallBacks();
        registerPushCallBacks();
        //initTealium();
    }
});