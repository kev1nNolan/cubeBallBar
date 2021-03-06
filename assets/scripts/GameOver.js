// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var GameOverMenu = cc.Class({
    //-- 继承
    extends: cc.Component,
    //-- 属性
    properties: {
        btn_play: cc.Button,
        score: cc.Label
    },
    // 加载Game场景(重新开始游戏)
    restart: function () {
        cc.director.loadScene('Game');
    },
    share: function () {
        // cc.director.loadScene('Game');
        wx.shareAppMessage({
            title: '学校小霸王，快来找回当年的自尊。',
            imageUrl: 'image/share/share1.png',
            success: function (res) {
              // 转发成功
              console.log("shareMenu000", type);
              console.log(res);
            },
            fail: function (res) {
              // 转发失败
              console.log("shareMenu111");
              console.log(res);
            }
          })
    },
});
