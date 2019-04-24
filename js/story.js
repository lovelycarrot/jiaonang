  
$(function(){
    var app = app || {};
    
    var WW = $(window).width();
    var WH = $(window).height();
    var frameStep = 1;
    var alertBgInterval;
    var p6_bottom = new MovieSprites($('.p6-bottom-animation')[0], {
      classAni: 'p6-sprite-',
      classOrigin: 'p6-bottom-animation',
      frameLastTime: 150,
      step: frameStep,
      totalFrame: 30,
      loop: true
    });
  
  function initPcont(inH, inW) {
    var pcw, pch;
    if (WH / WW >= inH / inW) {
      pcw = WW;
      pch = WW * inH / inW;
    } else {
      pcw = WH * inW / inH;
      pch = WH;
    }
    $('.p-cont').css({
      'width': pcw,
      'height': pch
    });
  }

  function init() {

    setTimeout(function() {
      $('.p6-bottom-animation').css({
        'transform-origin': 'right bottom',
        'transform': 'scale(' + $('.p-cont').width() * 0.35 / 460 + ')'
      });
    }, 20);

    $('.p6-bottom-animation').fadeIn(500);
    p6_bottom.play();

    // alertBgInterval = setInterval(function() {
    //    $('.page').toggleClass('page2');
    // }, 100);

    $('.btn-touchable').on('touchstart',function() {
      // app.musicClick.play();
      $(this).addClass('touched');
    });
    $('.btn-touchable').on('touchend',function() {
      $(this).removeClass('touched');
    });

    $('.p-alert-star').addClass('ani');
    $('.p-alert-music').addClass('rotate-ani');
  }

  function clickevent() {
      // clearInterval(alertBgInterval);
    $('.p-alert-bottom-btn1').click(function(){
      $('.p9').show();
    });
    $('.p9').click(function(){
      $(this).hide();
    });
    // var flagPlayed=1;
    // $('.p-alert-music').click(function(){
    //   console.log('1');
    //   if(flagPlayed){
    //     $(this).removeClass('rotate-ani');
    //     flagPlayed=0;
    //   }else{
    //     $(this).addClass('rotate-ani');
    //     flagPlayed=1;
    //   }
    // });
  }
  bgMusic.init();
  
  init();
  clickevent();
  initPcont(5, 3);
});
  