define({
    AS_AppEvents_e057bd60ac6b440795f2e3e50d62c1ff: function AS_AppEvents_e057bd60ac6b440795f2e3e50d62c1ff(eventobject) {
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
    AS_AppEvents_b89f551703584694877eda7069ee405c: function AS_AppEvents_b89f551703584694877eda7069ee405c(eventobject) {
        var self = this;
        registerAppCallBacks();
        registerPushCallBacks();
        kony.lang.setUncaughtExceptionHandler(uncaughtExceptionHandler);
        //initTealium();
    }
});