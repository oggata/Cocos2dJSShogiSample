//
//  Player.js
//  Territory
//
//  Created by Fumitoshi Ogata on 5/30/14.
//  Copyright (c) 2014 http://oggata.github.io All rights reserved.
//

var Piece = cc.Node.extend({

    ctor:function (game,imgName,posName) {
        this._super();
        this.game = game;
        this.imageName = imgName;
        this.isHandled = false;

        if(imgName == "p歩"){
            this.sprite = new cc.Sprite(res.P_fu_png);
        }else if(imgName == "p角"){
            this.sprite = new cc.Sprite(res.P_kaku_png);
        }else if(imgName == "p車"){
            this.sprite = new cc.Sprite(res.P_hisya_png);
        }else if(imgName == "p香"){
            this.sprite = new cc.Sprite(res.P_kou_png);
        }else if(imgName == "p馬"){
            this.sprite = new cc.Sprite(res.P_keima_png);
        }else if(imgName == "p銀"){
            this.sprite = new cc.Sprite(res.P_gin_png);
        }else if(imgName == "p金"){
            this.sprite = new cc.Sprite(res.P_kin_png);
        }else if(imgName == "p王"){
            this.sprite = new cc.Sprite(res.P_gyoku_png);
        }else if(imgName == "e歩"){
            this.sprite = new cc.Sprite(res.E_fu_png);
        }else if(imgName == "e角"){
            this.sprite = new cc.Sprite(res.E_kaku_png);
        }else if(imgName == "e車"){
            this.sprite = new cc.Sprite(res.E_hisya_png);
        }else if(imgName == "e香"){
            this.sprite = new cc.Sprite(res.E_kou_png);
        }else if(imgName == "e馬"){
            this.sprite = new cc.Sprite(res.E_keima_png);
        }else if(imgName == "e銀"){
            this.sprite = new cc.Sprite(res.E_gin_png);
        }else if(imgName == "e金"){
            this.sprite = new cc.Sprite(res.E_kin_png);
        }else if(imgName == "e王"){
            this.sprite = new cc.Sprite(res.E_gyoku_png);
        }else{
            this.sprite = new cc.Sprite(res.P_fu_png);
        }

        this.positionName = posName;
        this.addChild(this.sprite);
        this.setPos(posName);
    },
    
    init:function () {
    },

    update:function() {
        if(this.isHandled){
            this.setScale(1.3,1.3);
        }else{
            this.setScale(1,1);
        }
    },

    setPos:function(posName){
        this.isHandled = false;
        this.positionName = posName;
        this.spritePos = this.game.getBasePositionFromName(this.positionName);
        this.setPosition(this.spritePos[0] + 26/2,this.spritePos[1] + 26/2);
    },

    setHandle:function(){
        if(this.isHandled){
            this.isHandled = false;
        }else{
            this.isHandled = true;
        }
    },

    isHandle:function(){
        return this.isHandled;
    }
});