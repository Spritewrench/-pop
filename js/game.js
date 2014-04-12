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

    this.ballCount = 0;
    this.ballNum = 0;
    this.ballx = 60;
    this.alphaCounter = 0;
    this.scoreTar = 500;
  }

  Game.prototype = {

    create: function () {
    
      this.ballCount = 0;
      this.ballNum = 0;      
      this.alphaCounter = 0;
      this.scoreTar = 500;
      
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

      var style = { font: '48px nunitolight', fill: '#fff', align: 'center' };
      
  

      this.score = this.add.text(160, 500, text, style) ;
      this.score.anchor.setTo(0.5, 0.5);

      this.textGroup.add(this.score);
      this.count = 0;
      this.prev = 0;
    
        
      
       
    },
    //custom functions
    tap: function (ball) {
      if(ball.hp > 1){
        ball.body.velocity.y =-300;
        //ball.body.velocity.x = Math.floor((Math.random()*200)-100);
        //this.count++;  
        ball.hp--;
        ball.width += 30/ball.hp;
        ball.height += 30/ball.hp;
      }
      else if(ball.hp === 1){
        this.count++; 
        this.alphaCounter = 100;
        this.addBall(ball.x,-10);
        ball.hp = 0;
      }


        

    },
    addBall: function (x,y) {
      var ball;
      var ballType = Math.floor((Math.random()*4)+1);
      var life;
      
      //recycle
      if(this.group.length > 10){
        this.group[this.ballNum].bringToTop();
        this.group[this.ballNum].hp = 3;
        this.group[this.ballNum].width = 64;
        this.group[this.ballNum].height = 64;
        this.group[this.ballNum].y = -10;
        this.group[this.ballNum].x = this.ballx;
        this.hp1[this.ballNum].visible = true;
        this.hp2[this.ballNum].visible = true;
        this.hp3[this.ballNum].visible = true; 

        this.hp1[this.ballNum].x = this.ballx;
        this.hp2[this.ballNum].x = this.ballx;
        this.hp3[this.ballNum].x = this.ballx;         
        
        this.hp1[this.ballNum].bringToTop();
        this.hp2[this.ballNum].bringToTop();
        this.hp3[this.ballNum].bringToTop();
        this.ballNum++;
        this.ballx += 100;
        if(this.ballx > 260){
          this.ballx = 60;
        }
        if(this.ballNum > 10){
          this.ballNum = 0;
        }
        
      }
      else{
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
        this.ballCount++;
        this.spriteGroup.add(ball);        
      }
        

    }, 
    reset: function () {
      this.physics.gravity.y = 0;
      for(var i = 0 ; i < this.group.length; i++){
        this.group[i].y = 50;
      }  
      count = this.count;
      this.count = 0;
      this.prev = 0;
      
 
      
      //localStorage.setItem("highScore",count)
      this.game.state.start('social');

    },
    update: function () {
      
      this.score.setText(this.count+'');
      //position of text
      this.score.y += (this.scoreTar - this.score.y)*0.1;
      
      if(this.alphaCounter > 0){
        this.scoreTar = 420
        this.alphaCounter--;
        if(this.alphaCounter < 0){
          this.alphaCounter = 0;
        }
      }
      else{
        this.scoreTar = 500;
      }




      
      for(var i = 0 ; i < this.group.length; i++){
        

        if(this.group[i].hp > 0){
          
          if(this.group[i].width > 64){
            this.group[i].width--;
            this.group[i].height = this.group[i].width;
          }
          
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

