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
var speedRate = 3
var collideDistance = 10
var collideFloor = false
var lastMove = 0
var gameOver = false
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
        roundBall: [cc.node],

        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
    },
    init (){
        cc.log("npc init");
        var self = this;
        var loadCallBack = this._loadCallBack.bind(this);
        cc.loader.loadRes("atlas/ball_normal", cc.SpriteAtlas, loadCallBack);
        // cc.director.getCollisionManager().enabled = true;
        gameOver = false
        // 
    },

    _loadCallBack (err, res){
        cc.log(err)
        cc.log("this.node", this.node)
        this._res = res;
        // cc.loader.setAutoRelease(atlas, true);
        this.node = new cc.Node();
        // var randX = (Math.random() - 0.5) * 2 * cc.director.getScene().getChildByName('Canvas').width/2;
        var screenH = cc.winSize.height;
        var randY =  2 * screenH/3 + (Math.random() * screenH/4); 
        // node.setPosition(cc.director.getScene().getChildByName('Canvas').width, cc.director.getScene().getChildByName('Canvas').height);
        this.node.setPosition(0,randY);
        this.node.setScale(cc.v2(0.2,0.2))
        this.node.setRotation(0.5)
        var sprite = this.node.addComponent(cc.Sprite);

        sprite.trim = true;
        sprite.spriteFrame = this._res.getSpriteFrame('ball_0');
        // node.getComponent(cc.Sprite).spriteFrame.setRect(cc.rect(300, 500, 200, 200));
        // sprite.spriteFrame.setRect(cc.rect(0, 0, 200, 200));
        cc.log(sprite.spriteFrame.getRect().width.toString());
        cc.log(sprite.spriteFrame.getRect().height.toString());
        this.node.addComponent(cc.BoxCollider);
        this.node.addComponent("npc");
        // this._node = node;
        
        
        
        
        // mycollider.offset.x = this.node.x;
        // mycollider.offset.y = this.node.y;
        // mycollider.size.width = this.node.width;
        // mycollider.size.height = this.node.height;
        cc.director.getScene().addChild(this.node);
        cc.log("this.node111", this.node)
        // this._node.group = "ball";
        // this._node.groupIndex = 5;
        // this._node.addComponent("ColliderListener");

    },
    onCollisionEnter: function (other, self) {
        
        if(other.node.getComponent("Player"))
        {
            cc.log("shitshit");
            // other.node.removeFromParent(true);
            gameOver = 1;
            D.game.showGameOver();
        }
        if(other.node.getComponent("Bullet"))
        {
            cc.log("shitshit1111");
            // self.node.removeFromParent(true);
            other.node.removeFromParent(true);
            D.game.gainScore()
            cc.log("shitshit1111");
        }
        if(other.node.name == "floor")
        {
            collideFloor = true
            cc.log("shitshit11112222");
            // self.node.removeFromParent(true);
            // other.node.removeFromParent(true);
            // var screenH = cc.winSize.height;
            // var screenW = cc.winSize.width;
            // var randY =  this.node.getPosition().x + (Math.random() * screenH/6); 
            // var randX =  this.node.getPosition().x + (Math.random() - 0.5) * screenW/10;
            // this.node.runAction(cc.sequence(
            //     cc.moveTo(0.5, cc.p(randX, randY)),
            //     collideFloor = false
            // ));
        }
        // cc.log("shitshit11112222333",other.node.name);
    },
    


    onCollisionStay: function (other, self) {
        // cc.log("shitshit111")

    },
    // end 
 
    // 碰撞结束
    onCollisionExit: function (other, self) {
        // cc.log("shitshit2222")

    },

    getPlayerDistance(){
        // cc.log('getPlayerDistance')
        // var npcPos = this._node.getPosition();
        // // 根据两点位置计算两点之间距离
        
        // cc.log('player:', player.toString())
        // var playerPos = player.getPosition();
        // cc.log('playpos:', playerPos.toString())
        // cc.log('npcpos:', npcPos.toString())
        // var playermoveToPos = player.parent.convertToNodeSpaceAR(touchLoc);
        
        // cc.log('npcRect',npcRect.toString())
        
        // cc.log('playerRect',playerRect.toString())
        // var player = cc.find("Canvas/player");
        // var playerwpos = player.convertToWorldSpace(cc.v2(0,0));
        // var npcwPos = this._node.convertToWorldSpace(cc.v2(0,0));
        // var npcRect = cc.rect(npcwPos.x,npcwPos.y,this._node.width, this._node.height);
        // var playerRect = cc.rect(playerwpos.x,playerwpos.y,player.width,player.height)
        // // cc.log("playerwpos",playerwpos.toString());
        // cc.log('playerRect',playerRect.toString())
        // cc.log('npcRect',npcRect.toString())
        // // npcRect = cc.rect(20,20,100,100);
        // // playerRect = cc.rect(20,20,100,100);
        // if(npcRect.containsRect(playerRect))
        // {
        //     // this._node.removeFromParent(true);
        //     collide = true;
        //     cc.log('fuckfuck')
        // }
        // var dist = this.node.position.sub(playerPos).mag();
        // return dist;
    },


    update (dt) {
        if(!this.node || gameOver)
            return
        var now = Date.now();
        cc.log("nodenode222:",this.node, this._res)
        var oldP = this.node.getPosition();
        var oldx = oldP.x;
        var oldy = oldP.y;
        var newx,newy;
        if(oldx < cc.winSize.width)
        {
            newx = speedRate * Math.random() + oldx;
        }
        else
        {
            newx = -speedRate * Math.random() + oldx;
        }
        newy = -speedRate * Math.random() + oldy;

        this.node.setPosition(newx,newy)
    },
});
