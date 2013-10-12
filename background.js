//Xiami Music Download Extension background.js
//
//Author: gb_2312
//
//Date: 2013-10-10

var tabID;

chrome.webNavigation.onDOMContentLoaded.addListener(function(details){
    tabID = details.tabId;
    chrome.pageAction.show(tabID);
    bind();
},{url:[
    {hostSuffix: 'xiami.com' ,pathPrefix: '/song/play'}
]});

function bind(){
    chrome.webRequest.onResponseStarted.addListener(function(request){
        var message = {url: request.url, status: request.statusCode};
        sendMessage(tabID, message);
    },{urls:["http://m1.file.xiami.com/*.mp3", "http://img.xiami.com/*.lrc", "http://www.xiami.com/song/lyrictxt/id/*"]});
    // 目测都是mp3格式
}

function sendMessage(tabID, message){
    chrome.tabs.sendMessage(tabID, message);
}