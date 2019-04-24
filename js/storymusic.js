var bgMusic = (function() {
  var ROOT = app.root;
  var opt = {
    iOn: ROOT+'/img/musicOn.png',
    iOff: ROOT+'/img/musicOn.png',
    music:  ROOT+'/media/bgm.mp3',
    root: ''
  };

  var audio = new Audio();
  audio.volume = 1;
  audio.loop = true;
  audio.autoPlay = true;

  var $mIcon = $('<img id="bg-music">');

  $mIcon.css({
    'position': 'fixed',
    'left': '10px',
    'top': '15px',
    'width': '25px',
    'height': '25px',
    'z-index': '99999'
  });

  function play(){
    audio.play();
    $mIcon[0].src = opt.root + opt.iOn;
    // $mIcon.removeClass('bg-music-off');
    $mIcon.addClass('rotate-ani');
  }
  function pause(){
    audio.pause();
    $mIcon[0].src =opt.root +  opt.iOff;
    $mIcon.removeClass('rotate-ani');
    // $mIcon.addClass('bg-music-off');
  }

  function initAudio() {
    $mIcon.appendTo($('body'));
    audio.src =opt.root +  opt.music;

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
    initAudio();
    play();
  }

  return {
    init: init,
    audio: audio,
    play:play,
    pause:pause
  };

}());
