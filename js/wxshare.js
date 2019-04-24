/**
 * 微信分享工具库
 * 
 * 依赖: 
 * 1. http://res.wx.qq.com/open/js/jweixin-1.0.0.js
 * 2. jquery或zepto
 */
window.wxshare = (function() {
  var opts = {
    title: '微信分享标题',
    desc: '微信分享描述',
    link: '微信分享链接',
    imgUrl: '微信分享图片',
    onSuccess: null
  };
  var isReady = false;

  function config(options) {
    $.extend(opts, options);
    // console.log('[config] options:', options, ', opts:', opts);

    if (!isReady) {
      getSign();
      return;
    }

    if (!window.wx) return;
    var wx = window.wx;

    wx.onMenuShareTimeline({
      title: opts.desc, // 分享标题
      link: opts.link, // 分享链接
      imgUrl: opts.imgUrl, // 分享图标
      success: function() {
        // 用户确认分享后执行的回调函数
        window._hmt & window._hmt.push(['_trackEvent', 'share', 'Timeline', '分享到朋友圈成功']);
        if (opts.onSuccess) {
          opts.onSuccess();
        }
      },
      cancel: function() {
        // 用户取消分享后执行的回调函数
        window._hmt & window._hmt.push(['_trackEvent', 'share', 'Timeline', '分享到朋友圈取消']);
      }
    });

    wx.onMenuShareAppMessage({
      title: opts.title, // 分享标题
      desc: opts.desc, // 分享描述
      link: opts.link, // 分享链接
      imgUrl: opts.imgUrl, // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function() {
        // 用户确认分享后执行的回调函数
        window._hmt & window._hmt.push(['_trackEvent', 'share', 'AppMessage', '分享给好友成功']);
        if (opts.onSuccess) {
          opts.onSuccess();
        }
      },
      cancel: function() {
        // 用户取消分享后执行的回调函数
        window._hmt & window._hmt.push(['_trackEvent', 'share', 'AppMessage', '分享给好友取消']);
      }
    });
  }

  var isGetSignRunning = false;

  function getSign() {
    if (isGetSignRunning) return;
    isGetSignRunning = true;

    $.ajax({
      url: 'http://bdaladdin.duapp.com/wxshare/api/',
      data: {
        url: window.location.href
      },
      dataType: 'jsonp',
      success: function(data) {

        if (data.status != 'ok') {
          return;
        }

        if (!window.wx) return;
        var wx = window.wx;

        // console.log('[getSign]', data);
        var debug = (window.location.search.indexOf('__wxdebug__=1') !== -1);
        wx.config({
          debug: debug,
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: [
            // 所有要调用的 API 都要加到这个列表中
            'onMenuShareTimeline', 'onMenuShareAppMessage'
          ]
        });
        wx.ready(function() {
          isReady = true;
          config(opts);
        });
      },
      complete: function() {
        isGetSignRunning = false;
      }
    });
  }

  return {
    config: config
  };

})();
