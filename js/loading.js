app.preload = (function() {
  var WW = $(window).width();
  var WH = $(window).height();
  var opt = {
    onFrontComplete:function(){},
    onTotalComplete:function(){}
  };
  var frameSpeed = 100;
  var frameStep = 25;
  monster_static1 = new MovieSprites($('.p2-monster')[0], {
    classAni: 'p2_monster_',
    classOrigin: 'p2-monster',
    frameLastTime: frameSpeed,
    step: frameStep,
    totalFrame: 30,
    loop: false,
    finishCallback:function(){
      monster_left_up1.play();
    }
  });
  monster_left_up1 = new MovieSprites($('.p2-monster')[0], {
    classAni: 'p2_monster_left_up_',
    classOrigin: 'p2-monster',
    frameLastTime: frameSpeed,
    step: frameStep,
    totalFrame: 46,
    loop: false,
    finishCallback:function(){
      monster_left_prize1.play();
    }
  });
  monster_left_prize1 = new MovieSprites($('.p2-monster')[0], {
    classAni: 'p2_monster_left_',
    classOrigin: 'p2-monster',
    frameLastTime: frameSpeed,
    step: frameStep,
    totalFrame: 95,
    loop: false,
    finishCallback:function(){
      monster_left_story1.play();
    }
  });
  monster_left_story1 = new MovieSprites($('.p2-monster')[0], {
    classAni: 'p2_monster_left_',
    classOrigin: 'p2-monster',
    frameLastTime: frameSpeed,
    step: frameStep,
    totalFrame: 95,
    loop: false,
    finishCallback:function(){
      monster_right_up1.play();
    }
  });
  monster_right_up1 = new MovieSprites($('.p2-monster')[0], {
    classAni: 'p2_monster_right_up_',
    classOrigin: 'p2-monster',
    frameLastTime: frameSpeed,
    step: frameStep,
    totalFrame: 46,
    loop: false,
    finishCallback:function(){
      monster_right_prize1.play();
    }
  });
  monster_right_prize1 = new MovieSprites($('.p2-monster')[0], {
    classAni: 'p2_monster_right_',
    classOrigin: 'p2-monster',
    frameLastTime: frameSpeed,
    step: frameStep,
    totalFrame: 95,
    loop: false,
    finishCallback:function(){
      monster_right_story1.play();
    }
  });
  monster_right_story1 = new MovieSprites($('.p2-monster')[0], {
    classAni: 'p2_monster_right_',
    classOrigin: 'p2-monster',
    frameLastTime: frameSpeed,
    step: frameStep,
    totalFrame: 95,
    loop: false,
    finishCallback:function(){
      left_egg_monster1.play();
    }
  });
  left_egg_monster1 = new MovieSprites($('.p2-monster')[0], {
    classAni: 'left_egg_monster_',
    classOrigin: 'p2-monster',
    frameLastTime: frameSpeed,
    step: frameStep,
    totalFrame: 57,
    loop: false,
    finishCallback:function(){
      right_egg_monster1.play();
    }
  });
  right_egg_monster1 = new MovieSprites($('.p2-monster')[0], {
    classAni: 'right_egg_dog_monster_',
    classOrigin: 'p2-monster',
    frameLastTime: frameSpeed,
    step: frameStep,
    totalFrame: 62,
    loop: false,
    finishCallback:function(){
      left_egg_finger_monster1.play();
    }
  });
  left_egg_finger_monster1 = new MovieSprites($('.p2-monster')[0], {
    classAni: 'left_egg_finger_monster_',
    classOrigin: 'p2-monster',
    frameLastTime: frameSpeed,
    step: frameStep,
    totalFrame: 63,
    loop: false,
    finishCallback:function(){
      right_egg_finger_monster1.play();
    }
  });
  right_egg_finger_monster1 = new MovieSprites($('.p2-monster')[0], {
    classAni: 'right_egg_finger_monster_',
    classOrigin: 'p2-monster',
    frameLastTime: frameSpeed,
    step: frameStep,
    totalFrame: 63,
    loop: false
  });

  left_egg_dog1 = new MovieSprites($('.p2-egg')[0], {
    classAni: 'left_egg_dog_',
    classOrigin: 'p2-egg',
    frameLastTime: frameSpeed,
    step: frameStep,
    totalFrame: 62,
    loop: false,
    finishCallback:function(){
      right_egg_dog1.play();
    }
  });
  right_egg_dog1 = new MovieSprites($('.p2-egg')[0], {
    classAni: 'right_egg_dog_',
    classOrigin: 'p2-egg',
    frameLastTime: frameSpeed,
    step: frameStep,
    totalFrame: 62,
    loop: false,
    finishCallback:function(){
      right_egg_finger1.play();
    }
  });
  right_egg_finger1 = new MovieSprites($('.p2-egg')[0], {
    classAni: 'right_egg_finger_',
    classOrigin: 'p2-egg',
    frameLastTime: frameSpeed,
    step: frameStep,
    totalFrame: 63,
    loop: false,
    finishCallback:function(){
      left_egg_finger1.play();
    }
  });
  left_egg_finger1 = new MovieSprites($('.p2-egg')[0], {
    classAni: 'left_egg_finger_',
    classOrigin: 'p2-egg',
    frameLastTime: frameSpeed,
    step: frameStep,
    totalFrame: 63,
    loop: false
  });

  loading = new MovieSprites($('.p0-monster')[0], {
    classAni: 'loading-monster-',
    classOrigin: 'p0-monster',
    frameLastTime: 50,
    step: 1,
    totalFrame: 16,
    loop: true
  });

  $('.p2-monster').css('opacity','0');
  $('.p2-egg').css('opacity','0');

  function loadFront() {
    console.log('loadFront');
    var $imgs = $('.p0-loading img');
    var files = [];
    files.push('../img/loading_monster.png');
    for (var i = 0; i < $imgs.length; ++i) {
      files.push($imgs[i]);
    }
    var queue = new createjs.LoadQueue();

    queue.loadManifest(files);

    queue.on('fileload', function(event) {
      // console.log('fileload', event.item.src);
    });

    queue.on('complete', function(event) {
      $('.p0').show();
      console.log('====================loadFront complete====================', event);
      opt.onFrontComplete();
      loadAll();
      loading.play();
      monster_static1.play();
      left_egg_dog1.play();
    });
  }

  function loadAll() {
    var flagLoadOk = 0;
    var $imgs = $('img');
    var files = [];

    var queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    // 设置并发数
    // queue.setMaxConnections(2);
    // queue.maintainScriptOrder = true;

    queue.loadManifest([
      {
        id: 'musicBg',
        src: '../media/bgm.mp3'
      }
    ]);
    files.push('../img/p1_topbg1.png');
    files.push('../img/p1_topbg2.png');
    files.push('../img/p1_bottombg.jpg');
    files.push('../img/p2_capsule.png');
    files.push('../img/p2_rule.png');
    files.push('../img/p2_center_bg.png');

    files.push('../img/monster_static.png');
    files.push('../img/monster_left_up.png');
    files.push('../img/monster_left.png');
    files.push('../img/monster_right_up.png');
    files.push('../img/monster_right.png');
    files.push('../img/left_egg_monster.png');
    files.push('../img/right_egg_dog_monster.png');
    files.push('../img/monster_right_fail.png');
    files.push('../img/monster_left_fail.png');
    files.push('../img/left_egg_finger_monster.png');
    files.push('../img/right_egg_finger_monster.png');
    files.push('../img/left_egg_dog.png');
    files.push('../img/right_egg_dog.png');
    files.push('../img/right_egg_finger.png');
    files.push('../img/left_egg_finger.png');

    for (var i = 0; i < $imgs.length; ++i) {
      files.push($imgs[i].src);
    }

    files.push('../img/p2_box_bg0.png');
    files.push('../img/p2_box_bg1.png');
    files.push('../img/p2_box_bg2.png');
    files.push('../img/page_alert_dot.png');
    files.push('../img/p7_file.png');
    files.push('../img/p7_reset.png');

    queue.loadManifest(files);

    queue.on('fileload', function(event) {
      // console.log('fileload', event.item.src);
    });

    queue.on('error', function(event) {
      // console.log('error', event);
    });

    // loading 进度
    queue.on('progress', function(event) {
      var num = event.progress * 100;
      // console.log('progress num',num);
      if(num<=52|| (num>=60 && num <61) ){
        $('.p0-center').width((60-num)*74/60  + '%');
      // $('.p0-center').width((74-num) + '%');
      }else if( num>=61 && flagLoadOk ===0 ){
        onComplete();
        flagLoadOk = 1;
      }
    });
    queue.on('complete', function(event){
      var musicClick = createjs.Sound.createInstance("musicClick");
      var musicBg = createjs.Sound.createInstance("musicBg");

      app.musicBg = musicBg;
      app.musicClick = musicClick;
      app.bgMusic.init({'audio':app.musicBg});

      // musicClick.on('complete', function(event) {
      //   console.log('musicClick complete musicBg.paused', musicBg.paused);
      //   // alert('musicBg.paused'+musicBg.paused);
      //   // alert('musicBg.playState'+musicBg.playState);
      //   console.log("musicBg.paused && $('#bg-music').hasClass('tag-music-on')",musicBg.paused && $('<img id=bg-music>').hasClass('tag-music-on'));
      //   if(musicBg.paused && $('#bg-music').hasClass('tag-music-on')  ){
      //     musicBg.play({
      //       loop: -1,
      //       volume:1
      //     });
      //   }
      // });
      // console.log('loadTotal complete', event);
    });
  }

  function onComplete(){
    loading.stop();
    opt.onTotalComplete();
  }

  function init(options) {
    opt = $.extend(opt, options);
    loadFront();
  }

  return {
    init:init
  };

})();
