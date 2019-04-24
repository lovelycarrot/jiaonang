app.bgMusic = (function() {
  console.log('bgMusic');
  var ROOT = app.root;
  var audio;
  var opt = {
    'audio':'',
    'iOn': ROOT+'/img/musicOn.png',
    'iOff': ROOT+'/img/musicOn.png',
  };
  var $mIcon = $('<img id="bg-music">');

  $mIcon.css({
    'position': 'fixed',
    'left': '10px',
    'top': '15px',
    'width': '30px',
    'height': '30px',
    'z-index': '99999'
  });

  function play(){
    audio.play({
      loop: -1,
      volume:1
    });
    $mIcon[0].src =  opt.iOn;
    $mIcon.removeClass('tag-music-off');
    $mIcon.addClass('tag-music-on');
    $mIcon.addClass('play');
  }

  function pause(){
    audio.pause();
    $mIcon[0].src =  opt.iOff;
    $mIcon.removeClass('tag-music-on');
    $mIcon.removeClass('play');
    $mIcon.addClass('tag-music-off');
  }

  function initAudio() {
    $mIcon.appendTo($('body'));

    $mIcon.on('click', function() {
      if (audio.paused) {
        play();
      } else {
        pause();
      }
    });
    $(document).one("touchstart", function() {
       play();
    });
  }

  function init(options) {
    opt = $.extend(opt, options);
    audio = opt.audio;
    initAudio();
    play();
  }

  return {
    init: init,
    play:play,
    pause:pause
  };

}());
