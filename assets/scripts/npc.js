// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
// const g = require("Globals");
let ball = require("ball")
// var speedRate = 1
// var collideDistance = 10
// var collideFloor = false




cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        roundballResAry : [],
        normalballResAry : [],
        boomPaintResAry : [],
        appearSide: 1,
        curballCount : 0,


        // circleNode:{
        //     default:null,
        //     type:cc.Graphics,
        //     }, 
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
    },
    init (){
        D.npc = this;
        var self = this;


        var urls = ['level-item-0', 'level-item-1', 'level-item-2', 'level-item-3', 'level-item-4'];
        cc.loader.loadResArray(urls, cc.SpriteFrame, function (err, assets) {
            cc.log("1111111")
            if (err) {
                cc.log("11111112222")
                cc.error(err.message || err);
                cc.error(err);
                return;
            }


            for(i = 0; i < assets.length; i++)
            {
                self.roundballResAry.push(assets[i])
            }


            // cc.log("spriteFrames:", spriteFrames.length)
            cc.log("self.roundballResAry:", self.roundballResAry)
            self.loadball();
            // ...
        });

        urls = ['level-item-5', 'level-item-6', 'level-item-7', 'level-item-8'];
        cc.loader.loadResArray(urls, cc.SpriteFrame, function (err, assets) {
            cc.log("1111111222233333")
            if (err) {
                cc.log("11111112222333334444")
                cc.error(err.message || err);
                cc.error(err);
                return;
            }
            // spriteFrames = assets;

            for(i = 0; i < assets.length; i++)
            {
                self.normalballResAry.push(assets[i])
            }


            // cc.log("spriteFrames:", spriteFrames.length)
            cc.log("self.roundballResAry:", self.roundballResAry)
            self.loadball();
            // ...
        });



        // cc.loader.loadRes("atlas/ball_round", cc.SpriteAtlas, function (err, atlas) {
          
        //     for(i = 0; i < 10; i++)
        //     {
        //         var ball = "ball_" + i;
        //         var spriteFrame = atlas.getSpriteFrame(ball);                
        //         self.roundballResAry.push(spriteFrame)
        //     }
            
           
           

        // });

        // cc.loader.loadRes("atlas/ball_normal", cc.SpriteAtlas, function (err, atlas) {
        //     self._normalRes = atlas;

        //     for(i = 0; i < 10; i++)
        //     {
        //         var ball = "ball_" + i;
        //         var spriteFrame = atlas.getSpriteFrame(ball);             
        //         self.normalballResAry.push(spriteFrame)
        //     }

            
        //     self.loadball();
            
            
        // });
        
        cc.loader.loadRes("atlas/death_animation", cc.SpriteAtlas, function (err, atlas) {
            // self._normalRes = atlas;
            cc.log("11111112222333334444")
            for(i = 1; i < 5; i++)
            {
                var ball = "death_animation" + i;
                var spriteFrame = atlas.getSpriteFrame(ball);             
                self.boomPaintResAry.push(spriteFrame)
            }

            // for(i = 1; i < 6; i++)
            // {
            //     var ball = "paint-" + i + "-" + i
            //     var spriteFrame = atlas.getSpriteFrame(ball);             
            //     self.boomPaintResAry.push(spriteFrame)
            // }
            
            // self.loadboom(cc.v2(200,200))
            // self.loadball();
            
        });
        
        

    },
    drawCircle(ballnode)
    {
        var circleNode = new cc.Node()
        circleNode.addComponent(cc.Graphics);
        var ctx = circleNode.getComponent(cc.Graphics);
        cc.log("ctx111:", ctx)
        var pos = ballnode.getPosition()
        var r = ballnode.width * ballnode.scale + 30//Math.floor(Math.random() * 30) + 10
        ctx.circle(pos.x,pos.y, r);
        var colorAry = [cc.Color.RED,cc.Color.WHITE ,cc.Color.BLACK ,cc.Color.GRAY,cc.Color.GREEN, cc.Color.YELLOW, cc.Color.ORANGE, cc.Color.CYAN, cc.Color.MAGENTA]
        var index = Math.floor(Math.random()*colorAry.length)
        ctx.strokeColor = colorAry[index];
        ctx.stroke();
        cc.director.getScene().addChild(circleNode);
        this.scheduleOnce(function(){
            // this.student_state2 = 0;
            circleNode.destroy()
         }, 2);
    },
    loadboom (pos){
        if(this.boomPaintResAry.length > 0)
        {
            cc.log("this.boomPaintResAry.length", this.boomPaintResAry.length)
            var boomNode = new cc.Node()
            cc.director.getScene().addChild(boomNode);

            var index = Math.floor(Math.random()*this.boomPaintResAry.length)
            var sprite = boomNode.addComponent(cc.Sprite);
            sprite.spriteFrame = this.boomPaintResAry[index]
            boomNode.setPosition(pos)
            // boomNode.setScale(0.7)
            this.scheduleOnce(function(){
                // this.student_state2 = 0;
                boomNode.destroy()
             }, 2);



        }

    },

    loadball (){
        if(this.normalballResAry.length > 0)
        {
            this.ballNode = new cc.Node()
            cc.director.getScene().addChild(this.ballNode);
            // this.node.parent.addChild(this.ballNode);
            // cc.find("Canvas").addChild(this.ballNode);
            this.ballNode.addComponent("ball");
           
    
            var screenH = cc.winSize.height;
            var screenW = cc.winSize.width;
            
            this.appearSide = -this.appearSide;//每次反向出现
            var x = this.appearSide>0?0:screenW;
            var randY =  2 * screenH/3 + (Math.random() * screenH/3);
            var director = x===0?"right":"left";
            var index = Math.floor(Math.random()*this.normalballResAry.length)
            var spriteFrame = Math.random() > 0.5? this.normalballResAry[index]:this.roundballResAry[index]
            this.ballNode.getComponent("ball").init(director, x, randY,(index+1)*3, spriteFrame)
            this.ballNode.getComponent("ball").setSpeedRate(Math.random() * 5, 1000);
            // this.ballNode.setScale(0.7)
            this.ballNode.name = "normalball"
            this.curballCount++;
            cc.log("loadballloadballloadballloadball")
        }

    },
    newSmallBall(pos, num){
        if(this.roundballResAry.length > 0)
        {
            this.smallballNode = new cc.Node()
            
            this.smallballNode.addComponent("smallBall");
 
            var director = pos.x<cc.winSize.width/2?"right":"left";
            var index = Math.floor(Math.random()*this.roundballResAry.length)

            var addp = 80
            var director = "right"
            if(num%2 == 1)
            {
                addp = -addp;
                director = "left"
            }
            cc.log("pos.y:::", num%2, num, director)
            this.smallballNode.getComponent("smallBall").init(director, pos.x + addp , pos.y, this.roundballResAry[index])
            this.smallballNode.getComponent("smallBall").setSpeedRate(Math.random() * 5 , 1000);
            cc.director.getScene().addChild(this.smallballNode);
            // this.smallballNode.setScale(0.3)
            this.ballNode.name = "roundball"
            cc.log("newSmallBall ")
            this.curballCount++;
        }

    },
    damageByBullet(ballNode){
        
        // 
        
        cc.log("111111111")
        var pos = ballNode.getPosition()
        if(ballNode.name == "normalball")
        {
            cc.log("111111111222")
            var string = ballNode.getComponent("ball").getString()
            if(string > 1)
            {
                cc.log("1111111112223333")
                string -= 1;
                ballNode.getComponent("ball").setString(string) //大球数字减1
                // ballNode.getComponent("ball").setString(string)
                //20%概率爆炸生成对应数量小球
                if( Math.random() < 0.2)
                {
                    // cc.log("11111111122233334444")
                    this.curballCount--;
                    ballNode.removeFromParent(true); 
                
                    for(i = 0;i< 2; i ++)
                    {
                        cc.log("111111111222333344445555666")
                        cc.log("pospos:", i)
                        // if(i < 2)
                        this.newSmallBall(pos, i)
                    }
                    if(Math.random() < 0.5)
                        this.loadball();

                    ballNode.destroy()
                        
                }
                // cc.log("111111111222333344445555")
                 
                

            }
            else{
                cc.log("1111111112223333444455556667777")
                this.curballCount--;
                ballNode.removeFromParent(true);    //大球最后移除 再生成新的大球
                ballNode.destroy()
                this.loadball();
            }
        }
        else
        {
            

            cc.log("1111111112223333444455556667777888")
            ballNode.removeFromParent(true); //小球直接移除
            this.loadboom(pos)
            this.curballCount--;
            for(i = 0; i < 2; i ++)
            {
                if(Math.random() < 0.5)
                    this.drawCircle(ballNode)
                
            }
            ballNode.destroy()
        }


      
    },


   






    update (dt) {
        
      cc.log('curballCountcurballCount:', this.curballCount)
      if(this.curballCount < 2)
      {
          this.loadball()
      }
        
    },
});
