var count = 0;
(function() {
  'use strict';

  function Game() {
    this.group = new Array();

    this.hp1 = null;
    this.hp2 = null;
    this.hp3 = null;
    this.score = null;
    this.count = 0;
    this.size = 64;
    this.prev = 0;
    this.textGroup = null;
    this.spriteGroup = null;
    this.scoreBar = null;
  }

  Game.prototype = {

    create: function () {
    
      
      
      this.spriteGroup = this.add.group();
      this.textGroup = this.add.group();
      this.stage.backgroundColor = '#476b76';
      this.group = new Array();
      this.hp1 = new Array();
      this.hp2 = new Array();
      this.hp3 = new Array();      
 
      this.addBall(60,50);
      this.addBall(160,50);
      this.addBall(260,50);
      this.physics.gravity.y = 300;
      var text = this.count+'';

      var style = { font: '48px pecitamedium', fill: '#fff', align: 'center' };
      
      this.scoreBar = this.add.sprite(0, 400, 'scoreBar');
      this.scoreBar.fixedToCamera = true;    

      this.score = this.add.text(160, 420, text, style) ;
      this.score.anchor.setTo(0.5, 0.5);
      this.textGroup.add(this.scoreBar);
      this.textGroup.add(this.score);
      
      
       
    },
    //custom functions
    tap: function (ball) {
      if(ball.hp > 1){
        ball.body.velocity.y =-300;
        //ball.body.velocity.x = Math.floor((Math.random()*200)-100);
        //this.count++;  
        ball.hp--;
      }
      else if(ball.hp === 1){
        this.count++; 
        this.addBall(ball.x,-10);
        ball.hp = 0;
      }


        

    },
    addBall: function (x,y) {
      var ball;
      var ballType = Math.floor((Math.random()*4)+1);
      var life;
      
   
      
      //no two colours side by side
      while(this.prev == ballType){
        ballType = Math.floor((Math.random()*4)+1);
      }      
      this.prev = ballType;      
      
      ball = this.add.sprite(x, y, 'ball'+ballType);
      ball.hp = 3; //Math.floor((Math.random()*8)+1);
      
      life = this.add.sprite(x, y, 'hpring3');
      life.width = 32;
      life.height = 32;
      life.anchor.setTo(0.5, 0.5);   
      this.hp3.push(life);
      
      life = this.add.sprite(x, y, 'hpring2');
      life.width = 32;
      life.height = 32;
      life.anchor.setTo(0.5, 0.5);   
      this.hp2.push(life);
      
      life = this.add.sprite(x, y, 'hpring1');
      life.width = 32;
      life.height = 32;
      life.anchor.setTo(0.5, 0.5);   
      this.hp1.push(life);      
      
      
      ball.width = this.size;
      ball.height = this.size;

      ball.anchor.setTo(0.5, 0.5);
      ball.inputEnabled = true;
      ball.input.useHandCursor = true;
      ball.events.onInputDown.add(this.tap,this);
      ball.body.maxVelocity.y = 150;
      this.group.push(ball);
      this.spriteGroup.add(ball);

    }, 
    reset: function () {
      this.physics.gravity.y = 0;
      for(var i = 0 ; i < this.group.length; i++){
        this.group[i].y = 50;
      }  
      count = this.count;
      this.count = 0;
      this.prev = 0;
      
 
      
      
      this.game.state.start('social');

    },
    update: function () {
      
      this.score.setText(this.count+'');
      


      
      for(var i = 0 ; i < this.group.length; i++){
        

        if(this.group[i].hp > 0){
          
          this.hp1[i].y = this.group[i].y;
          this.hp1[i].body.velocity = -1;      
          
          this.hp2[i].y = this.group[i].y;
          this.hp2[i].body.velocity = -1;      
          
          this.hp3[i].y = this.group[i].y;
          this.hp3[i].body.velocity = -1;                
          if( this.group[i].y >480){
            this.reset();
          }
          else if(this.group[i].y < 1){
            //this.group[i].y =1;
            //this.group[i].body.velocity.y = 0;
          }
          if(this.group[i].x > 320){
            this.group[i].x = 310;
            this.group[i].body.velocity.x = -1*this.group[i].body.velocity.x;
          }
          else if(this.group[i].x < 0){
            this.group[i].x = 10;
            this.group[i].body.velocity.x = -1*this.group[i].body.velocity.x;
          }    
          if(this.group[i].hp == 2){
            this.hp3[i].visible = false;
          }
          if(this.group[i].hp == 1){
            this.hp2[i].visible = false;
          }          
          
                    
        }
        else{
          this.hp1[i].visible = false;

          if(this.group[i].width <= 800){
            this.group[i].width++;
            this.group[i].height = this.group[i].width++;
            
          }
          this.group[i].body.velocity.y =-1;
        }
          
        

        

      }




    },
   
    

  };

  window['tapjuggler'] = window['tapjuggler'] || {};
  window['tapjuggler'].Game = Game;

}());

