// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var collideDistance = 10
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
        // player: cc.Node,
        // followSpeed: 200
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    //     this.node.group = "player";
    //     this.node.groupIndex = 1;
    //      cc.log("group:", this.node.group) ;
    //    cc.log("index:",this.node.groupIndex);
    //    var self = this;
    //     self.moveToPos = cc.p(0, 0);
    //     self.isMoving = false;
    //     self.canvas.on(cc.Node.EventType.TOUCH_START, function (event) {
    //         var touches = event.getTouches();
    //         var touchLoc = touches[0].getLocation();
    //         self.isMoving = true;
    //         self.moveToPos = self.follower.parent.convertToNodeSpaceAR(touchLoc);
    //         self.touchLocationDisplay.textKey = i18n.t("cases/03_gameplay/01_player_control/On/OnTouchCtrl.js.1") + Math.floor(touchLoc.x) + ', ' + Math.floor(touchLoc.y) + ')';
    //     }, self.node);
    //     self.canvas.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
    //         var touches = event.getTouches();
    //         var touchLoc = touches[0].getLocation();
    //         self.moveToPos = self.follower.parent.convertToNodeSpaceAR(touchLoc);
    //         self.touchLocationDisplay.textKey = i18n.t("cases/03_gameplay/01_player_control/On/OnTouchCtrl.js.1") + Math.floor(touchLoc.x) + ', ' + Math.floor(touchLoc.y) + ')';
    //     }, self.node);
    //     self.canvas.on(cc.Node.EventType.TOUCH_END, function (event) {
    //         self.isMoving = false; // when touch ended, stop moving
    //     }, self.node);

    },

    start () {

        // this.circleNode = new cc.Node()
        // this.circleNode.setPosition(200,200)
        // cc.director.getScene().addChild(this.circleNode);

        // var collider = cc.director.getCollisionManager();
        // collider.enabled =true;
        // collider.enabledDebugDraw =true;
        // var collider = cc.director.getCollisionManager();
        // collider.enabled =true;
        // // collider.enabledDebugDraw =true;
        // let mycollider = this.node.addComponent(cc.BoxCollider);
        // mycollider.offset.x = this.node.x;
        // mycollider.offset.y = this.node.y;
        // mycollider.size.width = this.node.width;
        // mycollider.size.height = this.node.height;


        // collider.enabledDebugDraw =true;
    },
    // getPlayerDistance(){
    //     // var playerPos = this.node.getCenterPos();
    //     // // 根据两点位置计算两点之间距离
    //     // var npcPos = cc.find("ball_0")
    //     // var dist = this.node.position.sub(playerPos).mag();
    //     // return dist;
    // },
    update (dt) {
            
        // if (!this.isMoving) return;
        // var oldPos = this.player.position;
        // this.player.setPosition(this.moveToPos.x, this.player.position.y);
        // if (this.getPlayerDistance() < collideDistance) {
        //     // 调用收集行为
        //     cc.log("game over");
        //     return;
        // }

    },


    // onCollisionEnter: function (other, self) {
    //     cc.log("fuckfuck333")
    //     var group = cc.game.groupList[other.node.groupIndex];
    //     cc.log("group:", group);
    //     this.node.removeFromParent(true);
    // },
    


    // onCollisionStay: function (other, self) {
    //     cc.log("fuckfuck444")
    //     this.node.removeFromParent(true);
    // },
    // // end 
 
    // // 碰撞结束
    // onCollisionExit: function (other, self) {
    //     cc.log("fuckfuck5555")
    //     this.node.removeFromParent(true);
    // },
});
