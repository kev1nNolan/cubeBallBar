// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

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
        oldposx : 0,
        oldposy : 0
    },
    init:function(director, x, y ,mySpriteFrame){

        this._director = director
        this.node.addComponent(cc.BoxCollider)
        this.node.setPosition(x,y);
        var sprite = this.node.addComponent(cc.Sprite);
        sprite.spriteFrame = mySpriteFrame
        cc.log("this._director:", this._director)
        this.oldposx = x 
        this.oldposy = y
        

        this.labelNode = new cc.Node()

        this.labelNode.width = this.node.width
        this.labelNode.height = this.node.height

        this.label = this.labelNode.addComponent(cc.Label); 
        this.label.string = 1
        this.labelNode.setContentSize(50, 50);
        this.label.fontSize  = 50
        this.label.lineHeight = 40;
        this.label.lineWidth = 40;
        this.label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        this.label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        this.label.overflow = cc.Label.Overflow.CLAMP;
        this.label.enableWrapText = false;
        this.label.isSystemFontUsed = true
        this.node.addChild(this.labelNode)

    },

    onCollisionEnter: function (other, self) {
        
        if(other.node.getComponent("Player"))
        {

            cc.log("onCollisionEnter:",other.node.getComponent("Player"));
            D.game.showGameOver();
        }
        if(other.node.getComponent("Bullet"))
        {
            D.game.gainScore()
            other.node.removeFromParent(true)
            D.npc.damageByBullet(this.node)

        }

        
    },
    setSpeedRate : function (speedx, speedy)
    {   
        this.speedRateX = speedx;
        this.speedRateY = speedy;
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        if(D.game.isGameover) return
        var oldP = this.node.getPosition();
        var oldx = oldP.x;
        var oldy = oldP.y;
        var newx = oldx;

        var screenH =  cc.winSize.height;
        var screenW =  cc.winSize.width;
        if(this._director == "right")
        {
            newx =  this.speedRateX + oldx;
            if(newx > screenW)
                this._director = "left"

        }
        if(this._director == "left")
        {
            newx =  -  this.speedRateX + oldx;
            if(newx < 0)
                this._director = "right"
        }
        this.speedRateY -= 10/oldy
        var floorposW = cc.find("Canvas/floor").convertToWorldSpace(cc.v2(0,0))
        var floorY = floorposW.y + this.node.height * this.node.scaleY/2 - 20
        cc.log("flooy:",floorY)
        this.node.setPosition(newx,((this.oldposy-floorY)/2)*Math.sin(this.speedRateY)+((this.oldposy-floorY)/2 + floorY ))
    
    },
});
