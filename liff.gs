function doGet(e) {
  var params = e.parameter;
  var data = params.data;
  var sheetUrl = params.sheetUrl;
  var sheetTag = params.sheetTag;

  var SpreadSheet = SpreadsheetApp.openByUrl(sheetUrl);
  var Sheet = SpreadSheet.getSheetByName(sheetTag);
  //插入第一行空白
  Sheet.insertRowBefore(1);

  //寫入資料
  data = data.split(',');
  data.forEach(function(e,i){
   Sheet.getRange(1, i+1).setValue(e);
  });

  return ContentService.createTextOutput(true);
  return HtmlService.createHtmlOutputFromFile("index")
                    .addMetaTag("viewport", "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=10.0")
                    //頁面採用RWD設計，必須加上addMetaTag('viewport', 'width=device-width, initial-scale=1')才能讓手機上有RWD的效果
                    // https://developers.google.com/apps-script/reference/html/html-output#addMetaTag(String,String)
                    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
                    // 讓頂端灰色Warning Banner消失的解決方案 https://issuetracker.google.com/issues/63521070#comment33
                    // https://developers.google.com/apps-script/reference/html/html-output#setxframeoptionsmodemode
}
var CHANNEL_ACCESS_TOKEN = "0aHkJ2kipygc0B9Sdw3UzFR49kFRhUrAdIy6SfMdVurP9CoBAOTtUEZ7IDolAjsvQn9a4E2dsxBRA5AOU+S11hejAp47PzXwAi6N/nKZJzHUy1J7KjhAQVE03qWLHzcaZeYohqAplCnl6zIW3skkfAdB04t89/1O/w1cDnyilFU=";

//註冊LIFF app的設定方式 https://developers.line.biz/en/docs/liff/registering-liff-apps/
var appId = "line://app/1560251675-5vDjyRN0";

function doPost(e) {
  var contents = e.postData.contents;
  var obj = JSON.parse(contents)
  var events = obj["events"];
  for(var i = 0; i < events.length; i++){
    if(events[i].type == "message"){
      reply_message(events[i]);
    }
  }
}

function reply_message(e) {
  if (e.message.type == "text") {
    if (e.message.text == "order") {
  var postData = {
    "replyToken" : e.replyToken,
    "messages" : [
      {
        "type" : "text",
        "text" : appId
      }
    ]
  };
  }
  var options = {
    "method" : "post",
    "headers" : {
      "Content-Type" : "application/json",
      "Authorization" : "Bearer " + CHANNEL_ACCESS_TOKEN
    },
    "payload" : JSON.stringify(postData)
  };
  UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply", options);
  }
}