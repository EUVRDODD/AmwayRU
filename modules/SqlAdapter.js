// webSQLFlag = 0;
// var baseObjectId;
// contentListOfflineData=[];
// var sqlQuery="";


// function createDB() {
//   webSQLFlag = 1;
//   baseObjectId = kony.db.openDatabase("SqlDB",
//                                       "1.0",
//                                       "Sample SQL Database",
//                                       5 * 1024 * 1024); // 5MB database                            
//   kony.db.transaction(baseObjectId,
//                       createTable,
//                       commonErrorCallback,
//                       commonVoidcallback);

// }

// function success_dropTable(transactionId, resultset) {
//   kony.print("Table was dropped successfully");
// }



// function createTable(baseObjectId) {
//   try {

//     var sqlStatement = "DROP TABLE IF EXISTS homepageDetails";
//     kony.db.executeSql(baseObjectId,
//                        sqlStatement,
//                        null,
//                        success_dropTable,
//                        commonErrorCallback);

//     var  sqlStatement="CREATE TABLE IF NOT EXISTS homepageDetails(catName VARCHAR(25),catSubName VARCHAR(60),catImage VARCHAR(150),title VARCHAR(60),contentID VARCHAR(50),contentType TEXT,UID VARCHAR(50),contentImage VARCHAR(100),contentDesc VARCHAR(150),url VARCHAR(70),updatedTime VARCHAR(25),isLike TEXT,isShare TEXT,isBookmark TEXT, isDownload TEXT, isDownloadTurnedOn TEXT)";
//     kony.db.executeSql(baseObjectId,
//                        sqlStatement,
//                        null,
//                        success_createTable,
//                        commonErrorCallback);
//   } catch (Exception) {
//     kony.print("Exception" + Exception);
//   }


// }



// function commonErrorCallback(transactionId, error) {
//   kony.print(" Error code:: " + error);

// }



// function commonVoidcallback() {
//   kony.print("The transaction was executed successfully.");
// }



// function success_createTable(transactionId, resultset) {
//   kony.print("Homepage_details Table created Successfully");

// }


// function insertFirstData(baseObjectId) {
//   try {
//     var record = sortedContentList.pop();
//     kony.print("sortedContentList length : " + sortedContentList.length);
//     if (record !== null && record !== undefined) {
//       kony.print("RAmu >>>> record is : " + JSON.stringify(record));
//       var catName = record.profileName;
//       var catSubName = record.profileSub;
//       var catImage = record.profileImg;
//       var title = record.lbltitle;
//       var contentID = record.contentId;
//       var contentType = record.contentType;
//       var UID = record.UID;
//       var contentImage = record.imgContent;
//       var contentDesc = record.rchContentDesc;
//       var url = record.url;
//       var updatedTime = record.updatedDate;
//       var isLike = "false";
//       var isShare = "false";
//       var isBookmark = "false";
//       var isDownload = record.isDownload;
//       var isDownloadTurnedOn = record.isDownloadTurnedOn;
//       var itemAvailable = false;
      
//       for (var i=0; i<contentListUIDOfflineData.length; i++) {
//         var rowItem = contentListUIDOfflineData[i];
//         kony.print("rowItem : " + JSON.stringify(rowItem));
//         if (rowItem["UID"] === UID) {
//           itemAvailable = true;
//           kony.print("UID matching : " + UID);
//         }
//       }

//       if (itemAvailable === false) {
//         kony.print("Inserting now");
//         var sqlQueryStmt = "INSERT INTO homepageDetails VALUES ('" + catName + "','" + catSubName + "','"+ catImage + "','" + title + "','" + contentID + "','" + contentType + "','" + UID + "','" + contentImage + "','" + contentDesc + "','" + url + "','" + updatedTime + "','" + isLike + "','" + isShare + "','" + isBookmark + "','" + isDownload + "','" + isDownloadTurnedOn + "')";
//         kony.print("sqlQueryStmt : " + sqlQueryStmt);
//         kony.db.executeSql(baseObjectId,
//                            sqlQueryStmt,
//                            null,
//                            successInsertCallback,
//                            insertErrorCallback);
//       } else {
//         kony.print("Updating now");
//         var sqlQueryStmt = "UPDATE homepageDetails SET catName = '" + catName + "', catSubName = '" + catSubName + "', catImage = '" + catImage + "', title = '" + title + "', contentImage = '" + contentImage + "', contentDesc = '" + contentDesc + "', url = '" + url + "', updatedTime = '" + updatedTime + "' where UID = '" + UID + "'";
//         kony.print("sqlQueryStmt : " + sqlQueryStmt);
//         kony.db.executeSql(baseObjectId,
//                            sqlQueryStmt,
//                            null,
//                            successInsertCallback,
//                            insertErrorCallback);
// 	  }
//     }
//   } catch (Exception) {
//     kony.print("Error" + Exception);
//   }


// }

// function insertData() {

//   try {
// showLoading();
//     if (webSQLFlag === 0) {
//       kony.print("Please create the database and then try inserting data");
//       return;
//     }
//     //sqlQuery=query;
//     kony.db.transaction(baseObjectId, insertFirstData, insertDataSuccessCallback, insertDataErrorCallback);

//   } catch (Exception) {
//     kony.print("Exception" + Exception);
//   }
// }

// function insertDataSuccessCallback(result) {
//   kony.print("Inside insertSuccessCallback");
//   //insertData();
// }

// function insertDataErrorCallback(error) {
//   kony.print("Inside insertDataErrorCallback" + JSON.stringify(error));
//   //insertData();
// }

// function successInsertCallback(result) {
//   kony.print("Record  inserted successfully"+JSON.stringify(result));
  
//   insertData();
// }

// function insertErrorCallback(transactionId, error) {
//   kony.print("Insert Error code:: " + error);
//   kony.print(" Error message:: " + error.message);
//   insertData();
// }


// function getHomepageDetails(baseObjectId) {
//   try {
//     //var sqlStatement = "SELECT * FROM homepageDetails";
// 	var sqlQuery = "SELECT * from homepageDetails";
//     kony.db.executeSql(baseObjectId,
//                        sqlQuery,
//                        null,
//                        success_sqlSelect,
//                        commonErrorCallback);

//   } catch (err) {
//     kony.print("error while selecting " + err);
//   }
// }

// function getHomepageUIDDetails(baseObjectId) {
//   try {
//     //var sqlStatement = "SELECT * FROM homepageDetails";
// 	var sqlQuery = "SELECT UID from homepageDetails";
//     kony.db.executeSql(baseObjectId,
//                        sqlQuery,
//                        null,
//                        success_sqlSelect_UID,
//                        commonErrorCallback);

//   } catch (err) {
//     kony.print("error while selecting " + err);
//   }
// }


// /*function doTransactionsqlSelect(query) {
//   try {
//     if (webSQLFlag === 0) {
//       kony.print("Please create the database and then try show data");
//       return;
//     }
//     sqlQuery=query;
//     kony.db.transaction(baseObjectId,
//                         getHomepageDetails,
//                         commonErrorCallback,
//                         commonVoidcallback);
//   } catch (err) {
//     kony.print("error in  select transaction" + err);
//     kony.print("Please create the database and then try show data");
//   }
// }*/

// function getOfflineHomePageData() {
//   try {
//     contentListOfflineData = [];
//     if (webSQLFlag === 0) {
//       kony.print("Please create the database and then try show data");
//       return;
//     }
//     kony.print("Inside getOfflineHomePageData");
//     kony.db.transaction(baseObjectId,
//                         getHomepageDetails,
//                         commonErrorCallback,
//                         commonVoidcallback);
//   } catch (err) {
//     kony.print("error in  select transaction" + err);
//     kony.print("Please create the database and then try show data");
//   }
// }

// function getOfflineHomePageDataUID() {
//   try {
//     contentListUIDOfflineData = [];
//     if (webSQLFlag === 0) {
//       kony.print("Please create the database and then try show data");
//       return;
//     }
//     kony.db.transaction(baseObjectId,
//                         getHomepageUIDDetails,
//                         commonErrorCallback,
//                         commonVoidcallback);
//   } catch (err) {
//     kony.print("error in  select transaction" + err);
//     kony.print("Please create the database and then try show data");
//   }
// }

// function getOfflineMyContentData(query) {
//   try {
//     mycontentListOfflineData = [];
//     if (webSQLFlag === 0) {
//       kony.print("Please create the database and then try show data");
//       return;
//     }
//     sqlQuery=query;
//     kony.print("query : "+sqlQuery);
//     kony.print("Inside getOfflineMyContentData");
//     kony.db.transaction(baseObjectId,
//                         getMyContentDetails,
//                         commonErrorCallback,
//                         commonVoidcallback);
//   } catch (err) {
//     kony.print("error in  select transaction" + err);
//     kony.print("Please create the database and then try show data");
//   }
// }

// function getMyContentDetails(baseObjectId) {
//   try {
//     kony.print("query : "+sqlQuery);
//     kony.db.executeSql(baseObjectId,
//                        sqlQuery,
//                        null,
//                        success_sqlSelect_myContent,
//                        commonErrorCallback);

//   } catch (err) {
//     kony.print("error while selecting " + err);
//   }
// }

// function success_sqlSelect_myContent(baseObjectId, resultset) {
//   var numResults = resultset.rows.length;
//   kony.print("numResults my content : " + numResults);
//   kony.print("============= Actual result in  mycontent sql select::"+JSON.stringify(resultset));
//   for (var i = 0; i < numResults; i++) {

//     var rowItem = kony.db.sqlResultsetRowItem(baseObjectId, resultset, i);
//     kony.print("inside sql success"+JSON.stringify(rowItem));
//     mycontentListOfflineData.push(rowItem);

//   }
//   if (myContentListReference !== null && myContentListReference !== undefined) {
//     myContentListReference.addMycontentListToSegment();
//   }
// }

// function success_sqlSelect(baseObjectId, resultset) {
//   var numResults = resultset.rows.length;
//   kony.print("numResults" + numResults);
//   kony.print("============= Actual result is::"+JSON.stringify(resultset));
//   for (var i = 0; i < numResults; i++) {

//     var rowItem = kony.db.sqlResultsetRowItem(baseObjectId, resultset, i);
//     kony.print("inside sql success"+JSON.stringify(rowItem));
//     contentListOfflineData.push(rowItem);

//   }

//   if (controllerReference !== null && controllerReference !== undefined) {
//     controllerReference.addOfflineDataToSegment();
//   }
//   if (myContentListReference !== null && myContentListReference !== undefined) {
//     myContentListReference.addMycontentListToSegment();
//   }
// }

// function success_sqlSelect_UID(baseObjectId, resultset) {
//   var numResults = resultset.rows.length;
//   kony.print("numResults" + numResults);
//   kony.print("============= Actual result is::"+JSON.stringify(resultset));
//   for (var i = 0; i < numResults; i++) {

//     var rowItem = kony.db.sqlResultsetRowItem(baseObjectId, resultset, i);
//     kony.print("inside sql success UID : "+JSON.stringify(rowItem));
//     contentListUIDOfflineData.push(rowItem);

//   }
	
//   if (controllerReference !== null && controllerReference !== undefined) {
//     controllerReference.addOfflineDataToSegment();
//   }
//   if (myContentListReference !== null && myContentListReference !== undefined) {
//     myContentListReference.addMycontentListToSegment();
//   }
// }

// function updateDBColumn() {
//   try {
//     if (webSQLFlag === 0) {
//       kony.print("Please create the database and then try to update data");
//       return;
//     }
    
//     kony.db.transaction(baseObjectId,
//                         updateDBData,
//                         commonErrorCallback,
//                         commonVoidcallback);
//   } catch (err) {
//     kony.print("error in  select transaction" + err);
//     kony.print("Please create the database and then try show data");
//   }
// }

// function updateDBData(baseObjectId) {
//   try {
//     //var sqlStatement = "SELECT * FROM homepageDetails";
// 	kony.print("gblHomePageUpdateOption : " + gblHomePageUpdateOption + " ::: gblIsDownloadOn : " + gblIsDownloadOn + " ::: gblHomePageUID : " + gblHomePageUID);
//     var sqlQuery = "";
//     if (gblHomePageUpdateOption === "Download") {
//       var flag = "";
//       if (gblIsDownloadOn === true) {
//         flag = "true";
//       } else {
//         flag = "false";
//       }
//       sqlQuery = "UPDATE homepageDetails set isDownloadTurnedOn = '" + flag + "' WHERE UID = '" + gblHomePageUID + "'";
//     } else if (gblHomePageUpdateOption === "Share") {
//       var flag = "";
//       if (gblIsShareOn === true) {
//         flag = "true";
//       } else {
//         flag = "false";
//       }
//       sqlQuery = "UPDATE homepageDetails set isShare = '" + flag + "' WHERE UID = '" + gblHomePageUID + "'";
//     } else if (gblHomePageUpdateOption === "Bookmark") {
//       var flag = "";
//       if (gblIsBookmarkOn === true) {
//         flag = "true";
//       } else {
//         flag = "false";
//       }
//       sqlQuery = "UPDATE homepageDetails set isBookmark = '" + flag + "' WHERE UID = '" + gblHomePageUID + "'";
//     }
//     kony.db.executeSql(baseObjectId,
//                        sqlQuery,
//                        null,
//                        success_updateData,
//                        commonErrorCallback);

//   } catch (err) {
//     kony.print("error while selecting " + err);
//   }
// }

// function success_updateData(result) {
//   kony.print("record update is successful");
// }