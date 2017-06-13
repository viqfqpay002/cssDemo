var _appId, _timestamp, _nonceStr, _signature, _url;
$(function () {
    _url = location.href.split('#')[0];
    $.ajax({
        type: "POST",
       // url: "http://qipao.n3creative.cn/wxapi/api/Commom.aspx?ts=" + new Date().getTime(),
        data: {
            action: 'init',
            url: _url
        },
        dataType: "json",
        async: false,
        timeout: 60000,
        success: function (json) {
            _appId = json.appid;
            _timestamp = json.timestamp;
            _nonceStr = json.noncestr;
            _signature = json.signature;
            wxapi();
        }
    })
});



function wxapi() {
    wx.config({
        //debug: true,
        appId: _appId,
        timestamp: _timestamp,
        nonceStr: _nonceStr,
        signature: _signature,
        jsApiList: [
            'checkJsApi',
            'chooseImage',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo'
        ]
    });



    wx.ready(function () {
        wx.onMenuShareTimeline({
            title: _sharetitle, // 分享标题
            link: _sharelink, // 分享链接
            imgUrl: _shareimg, // 分享图标
            success: function () {
                shareinfo();
            },
            cancel: function () {
            }
        });

        //获取“分享给朋友”按钮点击状态及自定义分享内容接口
        wx.onMenuShareAppMessage({
            title: _sharetitle, // 分享标题
            desc: _sharedesc, // 分享描述
            link: _sharelink, // 分享链接
            imgUrl: _shareimg, // 分享图标
            type: '',
            dataUrl: '',
            success: function () {
                shareinfo();
            },
            cancel: function () {
            }
        });

        //获取“分享到QQ”按钮点击状态及自定义分享内容接口
        wx.onMenuShareQQ({
            title: _sharetitle, // 分享标题
            desc: _sharedesc, // 分享描述
            link: _sharelink, // 分享链接
            imgUrl: _shareimg, // 分享图标
            success: function () {
                shareinfo();
            },
            cancel: function () {
            }
        });

        //获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
        wx.onMenuShareWeibo({
            title: _sharetitle, // 分享标题
            desc: _sharedesc, // 分享描述
            link: _sharelink, // 分享链接
            imgUrl: _shareimg, // 分享图标
            success: function () {
                shareinfo();
            },
            cancel: function () {
            }
        });
        wx.error(function (res) {

        });
    });

}
