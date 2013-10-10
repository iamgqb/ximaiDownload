//Xiami Music Download Extension background.js
//
//Author: gb_2312
//
//Date: 2013-10-10

var tabID;

chrome.webNavigation.onCommitted.addListener(function(details){
    tabID = details.tabId;
    chrome.pageAction.show(tabID);
    bind();
},{url:[
    {hostSuffix: 'xiami.com' ,pathPrefix: '/song/play'}
]});

function bind(){
    chrome.webRequest.onResponseStarted.addListener(function(request){
        var url = request.url;
        chrome.tabs.sendMessage(tabID, url);
    },{urls:["http://m1.file.xiami.com/*.mp3", "http://img.xiami.com/*.lrc"]});
    // 目测都是mp3格式
}
