(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
    this.music = null;
  }

  Preloader.prototype = {

    preload: function () {
      this.asset = this.add.sprite(160, 240, 'preloader');
      this.asset.anchor.setTo(0.5, 0.5);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);

      this.load.image('twitter', 'assets/twitter.png');

      

      
      
      this.load.image('ball1', 'assets/bigBall1.png');
      this.load.image('ball2', 'assets/bigBall2.png');
      this.load.image('ball3', 'assets/bigBall3.png');
      this.load.image('ball4', 'assets/bigBall4.png');
      
      this.load.image('hpring1', 'assets/hpRing1.png');
      this.load.image('hpring2', 'assets/hpRing2.png');
      this.load.image('hpring3', 'assets/hpRing3.png');
      
      this.load.image('retry', 'assets/retry.png');
      this.load.image('play', 'assets/play.png');
      this.load.image('pause', 'assets/pause.png');

      
      
      
      this.load.image('musicOnw', 'assets/musicOnw.png');
      this.load.image('musicOffw', 'assets/musicOffw.png');
      
      
      this.load.image('musicOn', 'assets/musicOn.png');
      this.load.image('musicOff', 'assets/musicOff.png');
      
      

      this.load.image('logoBall', 'assets/logoBall.png');
      
      this.load.image('background', 'assets/bg.png');
      this.load.image('background2', 'assets/bg1.png');
      
      //music from @LimeFaceX
      this.load.audio('someChords', ['assets/Gold.m4a']);   
      this.ready=false;
      
    },

    create: function () {
      this.asset.cropEnabled = false;
    },

    update: function () {
      if (this.ready===true && this.cache.isSoundDecoded('someChords') ) {
        //this.ready=true;
        //hide loading css
        document.getElementById('ball').style.display = 'none';
        //show game
        document.getElementById('tapjuggler-game').style.display = 'block';
        this.game.state.start('menu');
        
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['tapjuggler'] = window['tapjuggler'] || {};
  window['tapjuggler'].Preloader = Preloader;

}());
