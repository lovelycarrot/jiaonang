$(function() {
  console.log('storyArr', storyArr);

  var ROOT = app.root;
  var WW = $(window).width();
  var WH = $(window).height();
  // console.log('WW,WH', WW, WH);
  var tCap = 100;
  var currentPage = 0;
  var prizeId;
  var storyId = 0;
  var flagCapsuleAniing = 0;
  var prize_getId = -100;
  var flagIsFirstClick = 1;
  var flagMonsterWinReady = false;
  var p4flagAjax = true;
  var p7flagAjax = true;
  var storyTotalNum = storyArr.length;
  console.log('storyTotalNum:',storyTotalNum);

  var frameSpeed = 40;
  var frameStep = 1;
  var monster_static = new MovieSprites($('.p2-monster')[0], {
    classAni: 'p2_monster_',
    classOrigin: 'p2-monster',
    frameLastTime: 60,
    step: frameStep,
    totalFrame: 30,
    loop: true
  });
  var monster_left_up = new MovieSprites($('.p2-monster')[0], {
    classAni: 'p2_monster_left_up_',
    classOrigin: '.p2-monster',
    frameLastTime: 50,
    step: frameStep,
    totalFrame: 46,
    loop: true
  });
  var monster_left_fail = new MovieSprites($('.p2-monster')[0], {
    classAni: 'p2_monster_left_',
    classOrigin: 'p2-monster',
    frameLastTime: 40,
    step: frameStep,
    totalFrame: 53,
    loop: false,
    finishCallback: function() {
      showPage(7);
      resetCapsule();
    }
  });
  var monster_left_prize = new MovieSprites($('.p2-monster')[0], {
    classAni: 'p2_monster_left_',
    classOrigin: 'p2-monster',
    frameLastTime: 40,
    step: frameStep,
    totalFrame: 53,
    loop: false,
    finishCallback: function() {
      console.log(new Date().getTime() + ".......flagMonsterWinReady = true:");

      flagMonsterWinReady = true;
      if (prize_getId != -100) {
        console.log(new Date().getTime() + ".......flagMonsterWinReady = true: prize_getId != -100");
        getResult();
      }
      resetCapsule();
    }
  });
  var monster_left_story = new MovieSprites($('.p2-monster')[0], {
    classAni: 'p2_monster_left_',
    classOrigin: 'p2-monster',
    frameLastTime: 40,
    step: frameStep,
    totalFrame: 53,
    loop: false,
    finishCallback: function() {
      if (storyId > 19) {
        storyId = 0;
        shuffle(storyArr);
        console.log(storyArr);
        setStory(storyArr);
      } else {
        setStory(storyArr);
        console.log(storyArr);
      }
      resetCapsule();
      showPage(6);

      storyId++;
    }
  });
  var monster_right_up = new MovieSprites($('.p2-monster')[0], {
    classAni: 'p2_monster_right_up_',
    classOrigin: '.p2-monster',
    frameLastTime: 50,
    step: frameStep,
    totalFrame: 46,
    loop: true
  });
  var monster_right_fail = new MovieSprites($('.p2-monster')[0], {
    classAni: 'p2_monster_right_',
    classOrigin: 'p2-monster',
    frameLastTime: 40,
    step: frameStep,
    totalFrame: 53,
    loop: false,
    finishCallback: function() {
      showPage(7);
      resetCapsule();
    }
  });
  var monster_right_prize = new MovieSprites($('.p2-monster')[0], {
    classAni: 'p2_monster_right_',
    classOrigin: 'p2-monster',
    frameLastTime: 40,
    step: frameStep,
    totalFrame: 53,
    loop: false,
    finishCallback: function() {
      console.log(new Date().getTime() + ".......flagMonsterWinReady = true:");

      flagMonsterWinReady = true;
      if (prize_getId != -100) {
        getResult();
      }
      resetCapsule();
    }
  });
  var monster_right_story = new MovieSprites($('.p2-monster')[0], {
    classAni: 'p2_monster_right_',
    classOrigin: 'p2-monster',
    frameLastTime: 40,
    step: frameStep,
    totalFrame: 53,
    loop: false,
    finishCallback: function() {
      if (storyId > 19) {
        storyId = 0;
        shuffle(storyArr);
        console.log(storyArr);
        setStory(storyArr);
      } else {
        setStory(storyArr);
        console.log(storyArr);
      }
      resetCapsule();
      showPage(6);
      storyId++;
    }
  });
  var left_egg_monster = new MovieSprites($('.p2-monster')[0], {
    classAni: 'left_egg_monster_',
    classOrigin: 'p2-monster',
    frameLastTime: 50,
    step: frameStep,
    totalFrame: 57,
    loop: false
  });
  var right_egg_monster = new MovieSprites($('.p2-monster')[0], {
    classAni: 'right_egg_dog_monster_',
    classOrigin: 'p2-monster',
    frameLastTime: 50,
    step: frameStep,
    totalFrame: 62,
    loop: false
  });
  var left_egg_dog = new MovieSprites($('.p2-egg')[0], {
    classAni: 'left_egg_dog_',
    classOrigin: 'p2-egg',
    frameLastTime: 50,
    step: frameStep,
    totalFrame: 62,
    loop: false,
    finishCallback: function() {
      resetCapsule();
    }
  });
  var right_egg_dog = new MovieSprites($('.p2-egg')[0], {
    classAni: 'right_egg_dog_',
    classOrigin: 'p2-egg',
    frameLastTime: 50,
    step: frameStep,
    totalFrame: 62,
    loop: false,
    finishCallback: function() {
      resetCapsule();
    }
  });
  var right_egg_finger = new MovieSprites($('.p2-egg')[0], {
    classAni: 'right_egg_finger_',
    classOrigin: 'p2-egg',
    frameLastTime: 50,
    step: frameStep,
    totalFrame: 63,
    loop: false,
    finishCallback: function() {
      resetCapsule();
    }
  });
  var right_egg_finger_monster = new MovieSprites($('.p2-monster')[0], {
    classAni: 'right_egg_finger_monster_',
    classOrigin: '.p2-monster',
    frameLastTime: 50,
    step: frameStep,
    totalFrame: 63,
    loop: false
  });
  var left_egg_finger = new MovieSprites($('.p2-egg')[0], {
    classAni: 'left_egg_finger_',
    classOrigin: 'p2-egg',
    frameLastTime: 50,
    step: frameStep,
    totalFrame: 63,
    loop: false,
    finishCallback: function() {
      resetCapsule();
    }
  });
  var left_egg_finger_monster = new MovieSprites($('.p2-monster')[0], {
    classAni: 'left_egg_finger_monster_',
    classOrigin: '.p2-monster',
    frameLastTime: 50,
    step: frameStep,
    totalFrame: 63,
    loop: false
  });
  var monsterAni = {
    up: {
      left: monster_left_up,
      right: monster_right_up
    },
    getPrize: {
      left: monster_left_prize,
      right: monster_right_prize
    },
    getStory: {
      left: monster_left_story,
      right: monster_right_story
    },
    inFail: {
      left: monster_left_fail,
      right: monster_right_fail
    },
    monster: {
      left: left_egg_monster,
      right: right_egg_monster
    },
    dog: {
      left: left_egg_dog,
      right: right_egg_dog
    },
    finger: {
      left: left_egg_finger,
      right: right_egg_finger
    },
    finger_monster: {
      left: left_egg_finger_monster,
      right: right_egg_finger_monster
    },
    capsule: {
      left: '138%',
      right: '-40%'
    }
  };

  var prizeArr = [
    '../img/p3_prize_misfit.png',
    '../img/p3_prize_ecard.png',
    '../img/p3_prize_joy.png',
    '../img/p3_prize_minxinpian.png'
  ];

  function shuffle(o) { //v1.0
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }

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

  function configWxCommon() {
    window.wxshare.config({
      link: 'http://w.benbun.com/jingdong/zhiyu/'
    });
  }

  function configWxStory(id) {
    window.wxshare.config({
      link: window.location.origin + '../?a=story&id=' + id
    });
  }

  /******************************************************/
  function p1init() {}

  var p1topbgInterval;

  function p1enterEffect() {
    p1topbgInterval = setInterval(function() {
      $('.p1-top').toggleClass('anibg');
    }, 1000);
    $('.p1-rotate-img').addClass('ani');
  }

  function p1beforeLeave() {

  }

  function p1event() {
    $('.p1-start-btn').on('touchstart', function() {
      $('.p2').show();
      $('.p2-rule').show();
      $('.p1-top').addClass('to-top');
      $('.p1-bottom').addClass('to-bottom');
      setTimeout(function(){
        $('.p1').hide();
        clearInterval(p1topbgInterval);
      },2000);
      setMonsterScale();
      monster_static.play();
      setTimeout(function() {
        $('.p2-rule').fadeOut(800);
      }, 8000);
    });

    $('.static-holder').click(function() {
      console.log("$('.p2').is('visible')", $('.p2').is(':visible'));
      if ($('.p2').is(':visible')) {
        $('.p2-rule').trigger('click');
      }
    });
  }

  /******************************************************/
  var capsuleArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 24, 28, 29, 30];
  var appendFlag = 1;
  var capauleAni = ['dots', 'dots1'];

  function p2init() {
    setCapsuleScale();
    setMonsterScale();
    setItemHeight();
    shuffle(storyArr);
    $('#p2-scroll-wrapper').scroll(function() {
      if (($('#p2-scroll-wrapper').scrollTop() > ($('.p2-left-boxs').height() - $(window).height() - 30)) && appendFlag == 1) {
        console.log("$('#p2-scroll-wrapper').height() ", $('#p2-scroll-wrapper').height());
        console.log("$(window).height()", $(window).height());
        console.log("$('#p2-scroll-wrapper').scrollTop() ", $('#p2-scroll-wrapper').scrollTop());

        appendFlag = 0;
        appendCapsule();
        console.log('scroll');
      }
    });
  }

  function appendCapsule() {
    $('.p2-left-boxs').append(addCapsule('left'));
    $('.p2-right-boxs').append(addCapsule('right'));
    setCapsuleScale();
    setItemHeight();
    appendFlag = 1;
  }


  function setItemHeight() {
    $('.p2-capsule-item').height(WH * 0.2);
  }
  function setCapsuleScale() {
    var dw = WW * 0.125;
    var scale = dw / 93;
    $('.p2-capsule-item').find('.p2-capsule-wrapper').css({
      '-webkit-transform': 'scale(' + scale + ',' + scale + ') translate(-50%,-50%)',
      '-webkit-transform-origin': '0 0'
    });
    $('.p2-capsule-wrapper').find('.p2-capsule-left').css({
      '-webkit-transform': 'scale(1,1)',
      '-webkit-transform-origin': '100% 0'
    });
    $('.p2-capsule-wrapper').find('.p2-capsule-right').css({
      '-webkit-transform': 'scale(1,1)',
      '-webkit-transform-origin': '0 0'
    });
  }
  function setMonsterScale() {
    var dw = WW * 0.75;
    var dh = WH * 0.2;
    var scale = dw / 300;
    var scaleH = dh / 146;
    $('.p2-center-elevator').find('.p2-monster').css({
      '-webkit-transform': 'scale(' + scale + ',' + scaleH + ')',
      '-webkit-transform-origin': 'left bottom'
    });
    $('.p2-center-elevator').find('.p2-egg').css({
      '-webkit-transform': 'scale(' + scale + ',' + scaleH + ')',
      '-webkit-transform-origin': 'left bottom'
    });
  }

  function setCapsuleHtml(index, dire) {
    var html = '<li class="p2-capsule-item ' + dire + '">';
    html += '<div class="p2-capsule-box"><div class="p2-capsule-wrapper">';
    html += '<div class="p2_capsule' + index + '_left p2-capsule-left p2-shake"></div>';
    html += '<div class="p2_capsule' + index + '_right p2-capsule-right p2-shake"></div>';
    html += '</div></div>';
    html += '</li>';
    return html;
  }

  function addCapsule(dire) {
    var totalH = '';
    console.log('totalH', totalH);
    var newArr = myRand(capsuleArr, 4);
    console.log(newArr);
    for (var i = 0; i < 4; i++) {
      totalH += setCapsuleHtml(newArr[i], dire);
    }
    console.log('totalH', totalH);
    return totalH;
  }


  function myRand(arr, num) {
    var newArr = [];
    rand(num);

    function rand(k) {
      if (k === 0) {
        return;
      }
      var index = Math.floor(Math.random() * arr.length);
      var flag = true;
      $.each(newArr, function(v) {
        if (v == arr[index]) {
          flag = false;
        }
      });
      if (flag) {
        newArr.push(arr[index]);
        k--;
      }
      rand(k);
    }
    return newArr;
  }


  function resetCapsule() {
    $('.p2-capsule-wrapper').css({
      'left': '50%',
      '-webkit-transition': 'all 1s'
    });
    $('.right.open').find('.p2-capsule-box').addClass('reset-box');
    $('.right.open').find('.p2-capsule-right').addClass('p2-shake').css('right', '-3%');
    $('.right.open').find('.p2-capsule-left').addClass('p2-shake left-reset left-jiange');

    $('.left.open').find('.p2-capsule-box').addClass('reset-box');
    $('.left.open').find('.p2-capsule-left').addClass('p2-shake').css('left', '-3%');
    $('.left.open').find('.p2-capsule-right').addClass('p2-shake right-reset right-jiange');
    setTimeout(function(){
      $('.left.open').find('.p2-capsule-right').removeClass('right-reset');
      $('.right.open').find('.p2-capsule-left').removeClass('left-reset');
    },1100);
    resetSprites();
    monster_static.play();
    flagCapsuleAniing = 0;
  }

  function resetSprites() {
    monster_static.resume();
    monster_left_story.resume();
    monster_left_prize.resume();
    monster_right_story.resume();
    monster_right_prize.resume();
    monster_left_up.resume();
    monster_right_up.resume();
    monster_left_fail.resume();
    monster_right_fail.resume();
    left_egg_dog.resume();
    right_egg_dog.resume();
    left_egg_monster.resume();
    right_egg_monster.resume();
    right_egg_finger_monster.resume();
    right_egg_finger.resume();
    left_egg_finger_monster.resume();
    left_egg_finger.resume();
  }



  function p2enterEffect() {
    resetSprites();
  }

  function p2event() {
    $('#p2-scroll-wrapper').on('click', '.p2-capsule-item', function() {
      if ( !flagCapsuleAniing && !$(this).hasClass('open')  ) {
        console.log('flagCapsuleAniing');
        // app.musicClick.play();
        monster_static.stop();
        $(this).addClass('open');
        var top = $(this).offset().top + $(this).height() - 10;

        flagCapsuleAniing = 1;
        if (flagIsFirstClick) {
          prizeId = 1;
          flagIsFirstClick = 0;
        } else {
          prizeId = getPrizeID();
        }
        // prizeId = 0;
        console.log("-------prizeId",prizeId);
        capsuleEvent($(this), top, prizeId);
      }
    });

    $('#p2-scroll-wrapper').on('touchmove', function() {
      if (flagCapsuleAniing == 1) {
        // $('.p2-center-bottom').hide();
        return false;
      }
    });

    $('#p2-scroll-wrapper').on('touchend', function() {
      $('.p2-joy-wrapper').stop().velocity({
        top: $('#p2-scroll-wrapper').scrollTop() + 100
      }, 2000);
    });

    $('.p2-rule').click(function() {
      // app.musicClick.play();
      $('.p2-monster').css({
        'opacity': 1
      }).appendTo($('.p2-center-elevator'));
      $('.p2-egg').css({
        'opacity': 1
      }).appendTo($('.p2-center-elevator'));
      $('.static-holder').hide();
      $(this).fadeOut(800);
      setMonsterScale();
    });
    $('.p2-joy-wrapper').click(function() {
      // app.musicClick.play();
      if(!flagCapsuleAniing){
        showPage(7);
      }
    });
  }

  function getPrizeID() {
    //0获奖
    //1别人故事
    //2上传故事
    //3
    var i;
    var r = Math.random();
    if (r < 0.9) {
      i = 0;
    } else if (0.9 <= r && r < 0.925) {
      i = 1;
    } else if (0.925 <= r && r < 0.95) {
      i = 2;
    } else if (0.95 <= r && r < 0.975) {
      i = 3;
    } else {
      i = 4;
    }
    return i;
    // return 3;
  }

  function capsuleEvent(obj, top,prizeId) {
    // console.log(obj.parent());
    var flagClickDir = obj.hasClass('left') ? 'left' : 'right';
    // console.log('flagClickDir', flagClickDir);
    monsterAni.up[flagClickDir].play();

    flagMonsterWinReady = false;

    if(prizeId === 0){
      ajaxGetPrize(flagClickDir);
    }

    $('.p2-chilun1').addClass('p2-rotate1');
    $('.p2-chilun2').addClass('p2-rotate');
    $('.p2-center-elevator').velocity({
      top: top
    }, 1000, function() {
      $('.p2-chilun1').removeClass('p2-rotate1');
      $('.p2-chilun2').removeClass('p2-rotate');
      obj.find('.p2-capsule-wrapper').animate({
        left: monsterAni.capsule[flagClickDir]
      }, 600, function() {

        monsterAni.up[flagClickDir].stop();

        console.log(new Date().getTime()+'-----------start to move');

        if (prizeId === 0) {
          monsterAni.getPrize[flagClickDir].play();
        } else if (prizeId == 1) {
          monsterAni.getStory[flagClickDir].play();
        } else if (prizeId == 2) {
          monsterAni.inFail[flagClickDir].play();
        } else if (prizeId == 3) {
          monsterAni.finger_monster[flagClickDir].play();
          monsterAni.finger[flagClickDir].play();
        } else {
          monsterAni.monster[flagClickDir].play();
          monsterAni.dog[flagClickDir].play();
        }

        if (flagClickDir == 'left') {
          obj.find('.p2-capsule-left').removeClass('p2-shake p2-shake1 p2-shake2 p2-shake3');
          obj.find('.p2-capsule-right').removeClass('p2-shake p2-shake1 p2-shake2 p2-shake3').css({
            '-webkit-transform': 'rotate(-90deg)',
            '-webkit-transform-origin': 'top left',
            '-webkit-transition': 'all 1s'
          });
        } else {
          obj.find('.p2-capsule-right').removeClass('p2-shake p2-shake1 p2-shake2 p2-shake3');
          obj.find('.p2-capsule-left').removeClass('p2-shake p2-shake1 p2-shake2 p2-shake3').css({
            '-webkit-transform': 'rotate(90deg)',
            '-webkit-transform-origin': 'top right',
            '-webkit-transition': 'all 1s'
          });
        }
      });
    });
  }



  function ajaxGetPrize(flagClickDir) {
    console.log(new Date().getTime()+".......ajaxGetPrize start:" );

    $.ajax({
      url: '?c=api&a=lottery',
      type: 'GET',
      dataType: 'json',
      timeout: 2500,

      beforeSend: function(xhr, settings) {
        // 发送请求前
        // console.log('beforeSend ', xhr, settings);
      },
      success: function(data, status, xhr) {
        // 请求成功
        console.log('success', data, status, xhr);
        if (data.code === 0) {
          prize_getId = data.data.prizeId;
          console.log(new Date().getTime()+".......ajaxGetPrize success:data.code = 0",prize_getId);
        } else {
          prize_getId = -1;
          console.log(new Date().getTime()+".......ajaxGetPrize success:data.code ！= 0",prize_getId );
          console.log('success 失败');
        }

      },
      error: function(xhr, errorType, error) {
        prize_getId = -1;
          console.log(new Date().getTime()+".......ajaxGetPrize error",prize_getId );

        // 请求失败
        // console.log('error', xhr, errorType, error);
        // alert('error 请求失败');
      },
      complete: function(xhr, status) {
        // 请求成功或失败都执行
        // console.log('complete', xhr, status);
        if (flagMonsterWinReady) {
          getResult();
        }
      }
    });
  }


  function getResult() {
    console.log(new Date().getTime()+'-----getResult()');
    if (prize_getId != -1) {
      console.log('getResult() showpage 3');
      $('.p3-bottom-right-img').attr('src', prizeArr[prize_getId]);
      showPage(3);
    } else {
      console.log(new Date().getTime()+'-----getResult() showpage 6');

      if (storyId > 19) {
        storyId = 0;
        shuffle(storyArr);
        console.log(storyArr);
        setStory(storyArr);
      } else {
        setStory(storyArr);
        console.log(storyArr);
      }
      showPage(6);
      storyId++;
    }
    prize_getId = -100;
  }
  function setStory(storyArr) {
    console.log(storyArr[storyId]);
    configWxStory(storyArr[storyId].id);
    $('.p6-photo').attr('src', storyArr[storyId].headimgurl);
    $('.p6-weixin-name').html($.trim(storyArr[storyId].nickname));
    $('.p6-cont-img').attr('src', storyArr[storyId].img);
    $('.p6-cont-text').text($.trim(storyArr[storyId].info));
    // $('.p6-cont-box').html('<img src="' + storyArr[storyId]['img'] + '" class="story-img">' + storyArr[storyId]['info']);
  }

  /******************************************************/
  function p3init() {

  }

  function p3enterEffect() {

  }

  function p3event() {
    $('.p3-bottom-btn').click(function() {
      showPage(4);
    });
  }
  /******************************************************/
  function p4init() {
    $('.p4-bottom').height(WH * 0.44);

  }

  function p4enterEffect() {

  }

  function submitCheck() {
    var uname = $('.p4-bottom-name').val();
    var uphone = $('.p4-bottom-tel').val();
    var uaddress = $('.p4-bottom-address').val();
    if ($.trim(uname) === '') {
      sweetAlert('出错了', "请输入姓名!", "error");
      return false;
    } else if ($.trim(uphone) === '') {
      sweetAlert('出错了', "请输入手机号码!", "error");
      return false;
    } else if (!$.trim(uphone).match(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}|(17[0-9]{1})))+\d{8})$/)) {
      sweetAlert('出错了', "请填写正确格式的手机号码!", "error");
      return false;
    } else if ($.trim(uaddress) === '') {
      sweetAlert('出错了', "请输入地址!", "error");
      return false;
    }
    return true;
  }

  function p4event() {
    $('.p4-bottom-btn').click(function() {
      // sendUserInfoFailed();
      // sendUserInfoSuccess();
      if (submitCheck() && p4flagAjax) {
        p4flagAjax = false;
        $(this).html('<p class="p-alert-bottom-btn-text">提交中<span class="dotting"></span></p>');
        ajaxSendUserInfo();
      }
    });
  }



  function ajaxSendUserInfo() {
    var uname = $('.p4-bottom-name').val();
    var uphone = $('.p4-bottom-tel').val();
    var uaddress = $('.p4-bottom-address').val();
    $.ajax({
      url: '?c=api&a=ajaxAddUserInfo',
      type: 'POST',
      dataType: 'json',
      data: {
        phone: uphone,
        name: uname,
        address: uaddress
      },
      beforeSend: function(xhr, settings) {
        // 发送请求前
        console.log('beforeSend ', xhr, settings);
      },
      success: function(data, status, xhr) {
        // 请求成功
        console.log('success', data, status, xhr);
        if (data.code === 0) {
          sendUserInfoSuccess();
        } else {
          sendUserInfoFailed();
        }
      },
      error: function(xhr, errorType, error) {
        // 请求失败
        sendUserInfoFailed();
      },
      complete: function(xhr, status) {
        // 请求成功或失败都执行
        console.log('complete', xhr, status);
        $('.p4-bottom-btn').html('<p class="p-alert-bottom-btn-text">提交</p>');
        p4flagAjax = true;
      }
    });
  }


  function sendUserInfoFailed() {
    console.log('处理失败');
    $('.p5-bottom-prompt').html('&nbsp;&nbsp;提交失败！');
    $('.p5-bottom-false').show();
    $('.p5-bottom-true').hide();
    $('.p5 .p-alert-bottom-btn-text').text('重新提交');
    $('.p5-bottom-btn').addClass('p5-return-p4');
    showPage(5);
  }

  function sendUserInfoSuccess() {
    // alert('上传成功' );
    $('.p5-bottom-prompt').html('&nbsp;&nbsp;提交成功！');
    $('.p5-bottom-false').hide();
    $('.p5-bottom-true').show();
    $('.p5 .p-alert-bottom-btn-text').text('嘚瑟一下');
    showPage(5);
    $('.p4-bottom-name').val('');
    $('.p4-bottom-tel').val('');
    $('.p4-bottom-address').val('');
  }

  /******************************************************/
  function p5init() {
    $('.p5-bottom-false').hide();
  }

  function p5enterEffect() {

  }

  function p5event() {
    $('.p5-bottom-btn').click(function(){
      if($(this).hasClass('p5-return-p4')){
        showPage(4);
      }else{
        showPage(9);
      }
    });

  }

  /******************************************************/
  var p6_bottom = new MovieSprites($('.p6-bottom-animation')[0], {
    classAni: 'p6-sprite-',
    classOrigin: 'p6-bottom-animation',
    frameLastTime: 150,
    step: frameStep,
    totalFrame: 30,
    loop: true
  });

  function p6init() {
    setTimeout(function() {
      $('.p6-bottom-animation').css({
        'transform-origin': 'right bottom',
        'transform': 'scale(' + $('.p-cont').width() * 0.35 / 404 + ')'
      });
    }, 20);
  }

  function p6enterEffect() {
    console.log('p6enterEffect');
    $('.p6-bottom-animation').fadeIn(500);
    p6_bottom.play();
    // $('.p6-bottom-animation').css('bottom','-48%');
    // $('.p6-bottom-animation').velocity({
    //   bottom: '0%'
    // },3000);
  }

  function p6event() {
    $('.p6-bottom-btn').click(function() {
      showPage(9);
    });
    $('.p6 .p-alert-close').click(function() {
      p6_bottom.stop();
      configWxCommon();
    });
  }

  /******************************************************/
  function p7init() {
    var t = $.trim($('.p7-weixin-name').text());
    $('.p7-weixin-name').text(t);
    $('.p7-bottom-btn').find('.dotting').hide();
  }

  function p7enterEffect() {
    $('.p7-bottom-text').val('');
    $('.p7-placeholder').show();
    $('.p7-uptips').attr('src', ROOT + '/img/p7_up.png').show();
    $('.p7-bottom-img').attr('src', '').css('opacity', '0');
  }

  function toSizeString(size) {
    return (size / 1024).toFixed(2) + 'KB';
  }

  function p7event() {
    $('.p7-bottom-imgdiv').click(function() {
      $('.p7-file').trigger('click');
    });
    $('.p7-bottom-text').focus(function() {
      $(this).css('background', '#fff');
    });

    $('.p7-placeholder').click(function() {
      $(this).hide();
      $('.p7-bottom-text').focus();
    });
    $('.p7-bottom-text').blur(function() {
      if ($(this).val() === '') {
        $('.p7-placeholder').show();
      }
    });
    var imgData = null;
    $('.p7-file').change(function(e) {
      $('.p7-uptips').hide();
      $('.p7-bottom-img').css('opacity', 1);
      var files = e.target.files;
      if (files.length == 1) {
        lrz(files[0], {
          done: function(results) {
            console.log(results);
            imgData = results.base64;
            console.log('imgData', imgData);
            $('.p7-bottom-img').attr('src', imgData);

            var originSize = results.origin.size;
            var size = results.base64.length;
          },
          fail: function(err) {
            alert('Error: ' + err);
            console.error('Error:', err);
          }
        });
      }
    });

    $('.p7-bottom-btn').click(function(event) {
      // uploadStoryFailed();
      var info = $('.p7-bottom-text').val();
      if ($.trim(info) === '') {
        sweetAlert('出错了', "请输入故事内容!", "error");
      } else if ($('.p7-bottom-img').attr('src') === '') {
        sweetAlert('出错了', "请上传图片!", "error");
      } else if (!$(this).data("ajaxing")) {
        $(this).data("ajaxing", true).html('<p class="p-alert-bottom-btn-text">上传中<span class="dotting"></span></p>');
        ajaxUploadStory(info, imgData);
      }
    });
  }

  function ajaxUploadStory(info, imgData) {
    $.ajax({
      url: '?c=api&a=upload',
      type: 'POST',
      dataType: 'json',
      data: {
        imgData: imgData,
        info: info
      },
      beforeSend: function(xhr, settings) {
         // console.log('beforeSend ', xhr, settings);
        console.log('ajaxUploadStory beforeSend');
      },
      success: function(data, status, xhr) {
         console.log('success', data, status, xhr);
        $('.p7-placeholder').show();
        if (data.code === 0) {
          uploadStorySuccess(data);
        } else {
          uploadStoryFailed();
        }
      },
      error: function(xhr, errorType, error) {
        // console.log('error', xhr, errorType, error);
        uploadStoryFailed();
      },
      complete: function(xhr, status) {
        $('.p7-bottom-btn').data("ajaxing", false).html('<p class="p-alert-bottom-btn-text">上传故事</p>');
        // console.log('complete', xhr, status);
        console.log('ajaxUploadStory complete');
      }
    });
  }

  function uploadStorySuccess(data) {
    showPage(8);
    $('.p8').find('.p-alert-btns-left').html('<a class="p-alert-bottom-btn-text" href=' + window.location.origin + '../?a=story&id=' + data.data + '>我的故事</a>');
  }

  function uploadStoryFailed() {
    showPage(10);
  }
  /***********************************************/
  function p8event() {
    $('.p8 .p-alert-btns-right').click(function() {
      // $('.p8').hide();
      showPage(2);
    });
  }
  function p9event() {
    $('.p9').click(function() {
      $(this).hide();
      configWxCommon();
    });
  }
  function p10event() {
    $('.p10 .p-alert-btns-right').click(function() {
      // $('.p10').hide();
      showPage(2);
    });
    $('.p10 .p-alert-btns-left').click(function() {
      showPage(7);
    });
  }

  function closeAlert() {
    $('.p-alert-close').click(function() {
      $(this).parent().parent().parent().hide();
      $('.p-alert-star').removeClass('ani');
      $('.p4-bottom-name').val('');
      $('.p4-bottom-tel').val('');
      $('.p4-bottom-address').val('');
    });
  }

  function returnFalse() {
    return false;
  }

  function initPage() {
    initPcont(5, 3);
    p1init();
    p2init();
    p3init();
    p4init();
    p5init();
    p6init();
    p7init();
  }

  function eventCenter() {
    p1event();
    p2event();
    p3event();
    p4event();
    p5event();
    p6event();
    p7event();
    p8event();
    p9event();
    p10event();
    closeAlert();

    $('.btn-touchable').on('touchstart', function() {
      // app.musicClick.play();
      $(this).addClass('touched');
    });
    $('.btn-touchable').on('touchend', function() {
      $(this).removeClass('touched');
    });
  }

  function showPage(n) {
    $('.p-alert').removeClass('anibg');
    if ($('.p' + n).hasClass('p-alert')) {
      $('.p' + n).find('.p-alert-star').addClass('ani');
      // $('.p' + n).addClass('anibg');
      $('.p-alert').fadeOut(3 * tCap);
    } else {
      $('.p-alert-star').removeClass('ani');
      $('.page').fadeOut(3 * tCap);
      currentPage = n;
    }
    if (n != 6) {
      p6_bottom.stop();
      $('.p6-bottom-animation').fadeOut(300);
    }
    $('.p' + n).fadeIn(3 * tCap, function() {
      switch (n) {
        case 0:
          break;
        case 1:
          p1enterEffect();
          break;
        case 2:
          p2enterEffect();
          break;
        case 3:
          p3enterEffect();
          break;
        case 4:
          p4enterEffect();
          break;
        case 5:
          p5enterEffect();
          break;
        case 6:
          p6enterEffect();
          break;
        case 7:
          p7enterEffect();
          break;
      }
    });
  }

  function onTotalComplete(event) {
    showPage(1);
  }

  app.preload.init({
    'onTotalComplete': onTotalComplete
  });

  setTimeout(initPage, 0);

  eventCenter();

});
