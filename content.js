//Xiami Music Download Extension content.js
//
//Author: gb_2312
//
//Date: 2013-10-10

(function appendEle(){
    var player = document.getElementById('xiami_player');
    var downloadButton = document.createElement('div');
    downloadButton.style.cssText = "position:absolute;right:144px;top:50px;width:50px;height:20px;border:1px solid #5e5e5e;background-color: #f0f0f0;text-align:center;color:#5e5e5e;font-size:12px;line-height:20px;cursor: default";
    downloadButton.innerText = '下载';
    downloadButton.href = 'javascript:;';
    downloadButton.id = 'my_download';


    var musicButton = document.createElement('a'),
        lrcButton = document.createElement('a');
    musicButton.style.cssText = lrcButton.style.cssText = "display:none;position:absolute;left:-1px;width:50px;height:20px;border:1px solid #5e5e5e;background-color: #f0f0f0;";
    musicButton.style.top = '20px';
    lrcButton.style.top = '40px';
    musicButton.innerText = '歌曲';
    lrcButton.innerText = '歌词';
    musicButton.id = 'my_music_download';
    lrcButton.id = 'my_lrc_download';

    downloadButton.appendChild(musicButton);
    downloadButton.appendChild(lrcButton);
    player.appendChild(downloadButton);

    downloadButton.onmouseover = function(){
        musicButton.style.display = 'block';
        lrcButton.style.display = 'block';
    };
    downloadButton.onmouseout = function(){
        musicButton.style.display = 'none';
        lrcButton.style.display = 'none';
    };

    chrome.runtime.onMessage.addListener(function(URL, sender){

        var suffix = URL.substr(-3, 3);

        switch (suffix) {
            case 'lrc':
                lrcButton.href = URL;
                lrcButton.download = getTitle()+'.lrc';
                break;

            case 'mp3':
                musicButton.href = URL;
                musicButton.download = getTitle()+'.mp3';
                //虾米不知道做了什么，链接后加了查询，后缀名只好自己加了
                break;
        }
    });

    function getTitle(){
        return document.title.slice(0, -10);
    }

})();

