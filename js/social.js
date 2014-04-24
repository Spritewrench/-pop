(function() {
  'use strict';

  function Social() {

    this.startTxt = null;
    this.tweet = null;
    this.bg = null;
    this.nextAnime = false;
    this.scoreText= null;
  }

  Social.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;
      
      
      this.stage.backgroundColor = '#44ccf6';
      this.tweet = this.add.sprite(x,-100,'twitter');

      //this.logo.fixedToCamera = true;
      this.tweet.anchor.setTo(0.5, 0.5);
      this.tweet.inputEnabled = true;
      this.tweet.input.useHandCursor = true;
      this.tweet.events.onInputDown.add(this.sendTweet,this);
     // y = y + this.logo.height +50;
      //this.startTxt = this.add.bitmapText(x, y, 'TAP TO START', {font: '12px minecraftia', align: 'center'});
      //this.startTxt = this.game.add.text(x, y, 'text here', { font: '20px pecita', fill: '#fff', align: 'center' });
      this.startTxt = this.add.sprite(x,500,'retry');

      this.startTxt.anchor.setTo(0.5, 0.5);
      this.startTxt.inputEnabled = true;
      this.startTxt.input.useHandCursor = true;
      //this.startTxt.inputEnabled = true;
      //this.startTxt.input.useHandCursor = true;
      this.startTxt.events.onInputDown.add(this.reset,this);  
      //this.input.onDown.add(this.onDown, this);
      
      
      



      var scoreMsg = count+'!';
      var style = { font: '32px nunitolight', fill: '#fff', align: 'center' };   
      this.hscoreText = this.add.text(x+10, 40, "New High Score", style) ; 
      this.hscoreText.anchor.setTo(0.5, 0.5);
      this.hscoreText.visible = false;

      if(count > localStorage.getItem("highScore")){
        localStorage.setItem("highScore",count);
        this.hscoreText.visible = true;
         
      }

      style = { font: '100px nunitolight', fill: '#fff', align: 'center' };   
      this.scoreText = this.add.text(x+10, 110, scoreMsg, style) ;      
      this.scoreText.anchor.setTo(0.5, 0.5);
      
      style = { font: '24px nunitolight', fill: '#fff', align: 'center' };
      this.hscoreText2 = this.add.text(x, 400, "current high score: "+localStorage.getItem("highScore"), style) ;      
      this.hscoreText2.anchor.setTo(0.5, 0.5);      
    },

    update: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;    
      var tweety = y - 30;
      var texty = y + 70;
      this.tweet.y += (tweety - this.tweet.y)*0.1;
      this.startTxt.y += (texty - this.startTxt.y)*0.1;
      if(this.test == 0){
      }
      

        

    },
    reset: function () {
      //this.nextAnime = true;
      //alert();
      //window.location.href = "https://twitter.com/intent/tweet?text=I just popped "+count+" dots in !pop. Beat that: https://dl.dropboxusercontent.com/u/2302094/tapJuggler/index.html";
      this.game.state.start('game');
    },
    sendTweet: function () {
      //this.nextAnime = true;
      //alert();
      
      window.location.href = "https://twitter.com/intent/tweet?button_hashtag=popgame&text=I just popped "+count+" dots in !pop, a game where you create serene explosions of color!  http://spritewrench.itch.io/pop via @spritewrench";
    }
  };

  window['tapjuggler'] = window['tapjuggler'] || {};
  window['tapjuggler'].Social = Social;

}());
