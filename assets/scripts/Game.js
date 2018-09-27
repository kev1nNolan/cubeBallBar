// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
const npc = require("npc");

var lastClick = 0;
var bulletfrequency = 300; //1分钟发射子弹的频率
var bulletSpeed = 1200; //发射速率
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
        scoreText: cc.Label,
        bulletPrefab: {
            default: null,
            type: cc.Prefab
        },
        canvas: cc.Node,
        follower: {
            default: null,
            type: cc.Node
        },
        
        gameOver: {
            default: null,
            type: cc.Node
        },
        followSpeed: 200,
        isGameover : false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.registerTouchMsg();
        this._pool = new cc.NodePool("Bullet");
        this._npc = new npc();
        this._npc.init();
        D.game = this;
        this.score = 0;
        this.scoreText.string = this.score;
        // this.gameOver.active = false;
        this.gameOver.removeFromParent(true)
    },
    
    start () {
        cc.director.getCollisionManager().enabled = true;
        // this._npc.loadball()


        // cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabled = true;
    },
    
    

    registerTouchMsg()
    {

        this.moveToPos = cc.p(0, 0);
        this.isMoving = false;
        this.canvas.on(cc.Node.EventType.TOUCH_START, this.touch_start, this);
        this.canvas.on(cc.Node.EventType.TOUCH_MOVE, this.touch_move, this);
        this.canvas.on(cc.Node.EventType.TOUCH_END, this.touch_end, this);


    },

   
    touch_start(event){
        var touches = event.getTouches();
        var touchLoc = touches[0].getLocation();
        this.isMoving = true;
        this.follower.setRotation(180)
        this.moveToPos = this.follower.parent.convertToNodeSpaceAR(touchLoc);
        this.generatorBullet();
    },
    touch_move(event){
        var touches = event.getTouches();
        var touchLoc = touches[0].getLocation();
        this.moveToPos = this.follower.parent.convertToNodeSpaceAR(touchLoc);
        this.generatorBullet();
    },
    touch_end(event){
        this.follower.setRotation(0)
        this.isMoving = false;
    },


    gainScore () {
        //-- 分数+1
        // cc.log("gainScoregainScore")
        this.score++;
        this.scoreText.string = this.score;
        //-- 分数增加音效
        // cc.audioEngine.playEffect(this.scoreAudio);
    },
    showGameOver(){
        this.isGameover = true
        var pos0 = this.gameOver.getPosition(pos)
        cc.log("pos0", pos0.toString())
        var pos = this.gameOver.convertToWorldSpaceAR(this.node.getPosition())
        cc.log("pos01", pos.toString())
        cc.director.getScene().addChild(this.gameOver);
        this.gameOver.setPosition(pos)
        this.gameOver.getComponent('GameOver').score.string = this.score;

        this.onDestroy()
    },
    isGameOver()
    {
        return this.isGameover;
    },


    onDestroy () {
        // 取消键盘输入监听
        this.canvas.off(cc.Node.EventType.TOUCH_START, this.touch_start, this);
        this.canvas.off(cc.Node.EventType.TOUCH_MOVE, this.touch_move, this);
        this.canvas.off(cc.Node.EventType.TOUCH_END, this.touch_end, this);
        cc.director.getCollisionManager().enabled = false;
    },

    update (dt) {
        // if(this._npc.gameOver) 
        // {
        //     cc.log("gameover")
        //     return
        // }
        // this.generatorBullet()
        this._npc.update();
        if (!this.isMoving) return;
        // var oldPos = this.follower.position;
        // get move direction
        // var direction = cc.pNormalize(cc.pSub(this.moveToPos, oldPos));
        // multiply direction with distance to get new position
        // var newPos = cc.pAdd(oldPos, cc.pMult(direction, this.followSpeed * dt));
        // set new position
        this.follower.setPositionX(this.moveToPos.x);
        this.follower.setPositionY(this.follower.position.y);
        this.generatorBullet()
        // this.schedule();
        
        
        
    },
    generatorBullet:function()
    {


        var now = Date.now(); //毫秒

        if ((now - lastClick)/1000 < 60/bulletfrequency) {
            return;
        }
        var bullet = this._pool.get();
        if (!bullet) {
            bullet = cc.instantiate(this.bulletPrefab);
            bullet.setScale(0.2)
            // Add pool handler component which will control the touch event
            bullet.addComponent('Bullet');

            bullet.x = this.follower.position.x;
            bullet.y = this.follower.position.y + this.follower.height/2;
            
            var h =  cc.winSize.height;
            const eachTime = (bullet.y+h)/bulletSpeed;
//    
            // cc.log('xxxxx',bullet.x);
            // cc.log('yyyy',bullet.y)
            // cc.log('y=+++',bullet.y+h)

            // bullet.runAction(cc.sequence(
            //     cc.moveTo(0.02, cc.p(bullet.x, bullet.y+h)),
            //     cc.callFunc(this.removeBullet, this, bullet)
            // ));
            this.node.addChild(bullet);
        }
        lastClick = now;
        
    },
    removeBullet: function (sender, bullet) {
        this._pool.put(bullet);
        bullet.removeFromParent(true);
    },


    // update (dt) {
        
    // },
});
