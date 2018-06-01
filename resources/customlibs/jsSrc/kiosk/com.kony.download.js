var com.kony.download={};
com.kony.download.DownloadManager=function(){}
com.kony.download.DownloadManager.prototype.setCallbacks= function(updateProgressCallback,finishDownloadCallBackObj){};
com.kony.download.DownloadManager.prototype.startDownloadJs= function(content){};
com.kony.download.DownloadManager.prototype.pauseDownloadJs= function(content){};
com.kony.download.DownloadManager.prototype.resumeDownloadJs= function(content){};
com.kony.download.DownloadManager.prototype.openPdfJs= function(path){};
com.kony.download.DownloadManager.prototype.playDownloadedVideoJs= function(uid){};
com.kony.download.DownloadManager.prototype.getDocumentDirectoryPath= function(content){};
com.kony.download.DownloadManager.prototype.cancelDownloadJs= function(content){};

com.kony.download.DownloadManagerAnd=function(){}
com.kony.download.DownloadManagerAnd.prototype.startDownload= function(url,fileName){};
com.kony.download.DownloadManagerAnd.prototype.stopDownload= function(){};
com.kony.download.DownloadManagerAnd.prototype.startDownloadUsingDM= function(url,fileName){};

