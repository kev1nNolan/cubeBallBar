// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var lastClick = 0;
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
        bulletPrefab: {
            default: null,
            type: cc.Prefab
        },
        canvas: cc.Node,
        follower: {
            default: null,
            type: cc.Node
        },
        followSpeed: 200
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.registerTouchMsg();
        this._pool = new cc.NodePool("Bullet");
    },

    start () {
        
    },
    
    onStartGame () {
        // 初始化计分
      cc.log("start game!!!");
        cc.director.loadScene('Game');
        

    },

    registerTouchMsg:function()
    {
        var self = this;
        self.moveToPos = cc.p(0, 0);
        self.isMoving = false;
        self.canvas.on(cc.Node.EventType.TOUCH_START, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            self.isMoving = true;
            self.moveToPos = self.follower.parent.convertToNodeSpaceAR(touchLoc);
            this.generatorBullet();
        }, self);
        self.canvas.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            self.moveToPos = self.follower.parent.convertToNodeSpaceAR(touchLoc);
            this.generatorBullet();

        }, self);
        self.canvas.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.isMoving = false; // when touch ended, stop moving
        }, self);


    },

    update (dt) {
        if (!this.isMoving) return;
        var oldPos = this.follower.position;
        // get move direction
        var direction = cc.pNormalize(cc.pSub(this.moveToPos, oldPos));
        // multiply direction with distance to get new position
        var newPos = cc.pAdd(oldPos, cc.pMult(direction, this.followSpeed * dt));
        // set new position
        this.follower.setPositionX(this.moveToPos.x);
        this.follower.setPositionY(this.follower.position.y);
        
    },
    generatorBullet:function()
    {
        while(this.isMoving)
        {
            var now = Date.now();
        if (now - lastClick < 80) {
            return;
        }
        var bullet = this._pool.get();
        if (!bullet) {
            bullet = cc.instantiate(this.bulletPrefab);
        
            // Add pool handler component which will control the touch event
            bullet.addComponent('Bullet');

            bullet.x = this.follower.position.x;
            bullet.y = this.follower.position.y + this.follower.height/2;
            
            var h =  cc.director.getScene().getChildByName('Canvas').height;
            cc.log("run bullet");
            const eachTime = 0.8;
            bullet.runAction(cc.sequence(
                cc.moveBy(eachTime, cc.p(bullet.x, bullet.y+h)),
                cc.callFunc(this.removeBullet, this, bullet)
            ));
            this.node.addChild(bullet);
        }
        lastClick = now;
        }
        
    },
    removeBullet: function (sender, bullet) {
        cc.log("remove bullet");
        this._pool.put(bullet);
        bullet.removeFromParent(true);
    }


    // update (dt) {},
});
