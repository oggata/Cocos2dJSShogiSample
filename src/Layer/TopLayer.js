
var TopLayer = cc.Layer.extend({

    pieces:[],
    savedPiecesDataArray:[
        ["p歩","9七"],
        ["p歩","8七"],
        ["p歩","7七"],
        ["p歩","6七"],
        ["p歩","5七"],
        ["p歩","4七"],
        ["p歩","3七"],
        ["p歩","2七"],
        ["p歩","1七"],
        ["p角","8八"],
        ["p車","2八"],
        ["p香","9九"],
        ["p馬","8九"],
        ["p銀","7九"],
        ["p金","6九"],
        ["p王","5九"],
        ["p金","4九"],
        ["p銀","3九"],
        ["p馬","2九"],
        ["p香","1九"],
        ["e歩","9三"],
        ["e歩","8三"],
        ["e歩","7三"],
        ["e歩","6三"],
        ["e歩","5三"],
        ["e歩","4三"],
        ["e歩","3三"],
        ["e歩","2三"],
        ["e歩","1三"],
        ["e角","8二"],
        ["e車","2二"],
        ["e香","9一"],
        ["e馬","8一"],
        ["e銀","7一"],
        ["e金","6一"],
        ["e王","5一"],
        ["e金","4一"],
        ["e銀","3一"],
        ["e馬","2一"],
        ["e香","1一"], 
    ],
    basePositions : [
        ["9九",23,23], 
        ["8九",51,23],
        ["7九",79,23],
        ["6九",107,23],
        ["5九",135,23],
        ["4九",163,23],
        ["3九",191,23],
        ["2九",219,23],
        ["1九",247,23],
        ["9八",23,51],
        ["8八",51,51],
        ["7八",79,51],
        ["6八",107,51],
        ["5八",135,51],
        ["4八",163,51],
        ["3八",191,51],
        ["2八",219,51],
        ["1八",247,51],
        ["9七",23,79], 
        ["8七",51,79],
        ["7七",79,79],
        ["6七",107,79],
        ["5七",135,79],
        ["4七",163,79],
        ["3七",191,79],
        ["2七",219,79],
        ["1七",247,79],
        ["9六",23,107], 
        ["8六",51,107],
        ["7六",79,107],
        ["6六",107,107],
        ["5六",135,107],
        ["4六",163,107],
        ["3六",191,107],
        ["2六",219,107],
        ["1六",247,107],
        ["9五",23,135],
        ["8五",51,135],
        ["7五",79,135],
        ["6五",107,135],
        ["5五",135,135],
        ["4五",163,135],
        ["3五",191,135],
        ["2五",219,135],
        ["1五",247,135],
        ["9四",23,163],
        ["8四",51,163],
        ["7四",79,163],
        ["6四",107,163],
        ["5四",135,163],
        ["4四",163,163],
        ["3四",191,163],
        ["2四",219,163],
        ["1四",247,163],
        ["9三",23,191],
        ["8三",51,191],
        ["7三",79,191],
        ["6三",107,191],
        ["5三",135,191],
        ["4三",163,191],
        ["3三",191,191],
        ["2三",219,191],
        ["1三",247,191],
        ["9二",23,219],
        ["8二",51,219],
        ["7二",79,219],
        ["6二",107,219],
        ["5二",135,219],
        ["4二",163,219],
        ["3二",191,219],
        ["2二",219,219],
        ["1二",247,219],
        ["9一",23,247],
        ["8一",51,247],
        ["7一",79,247],
        ["6一",107,247],
        ["5一",135,247],
        ["4一",163,247],
        ["3一",191,247],
        ["2一",219,247],
        ["1一",247,247]
    ],

    ctor:function () {
        this._super();
        var size = cc.winSize;

        //3:android 4:iphone 5:ipad 100:mobile_web 101:pc_web
        //var platform = cc.Application.getInstance().getTargetPlatform();
        //this.storage = new Storage();  
        //if(platform == 100 || platform == 101){
            //データのロード
            //var jsonFile = {author:"isaac","description":"fresheggs","rating":100,"saveData":false};
            //window.localStorage.setItem("gameStorage",JSON.stringify(jsonFile));
            if (!window.localStorage) {
                alert("このブラウザではゲーム状態の保存ができません。(ERR:localStorage)");
                return;
            }
            try{
                var storageData = JSON.parse(window.localStorage.getItem("shogiGameData"));
                if(storageData["isSaved"] == true){
                    cc.log("保存されたデータがあります");
                    cc.log(storageData["saveData"]);
                    this.savedPiecesDataArray = [];
                    this.savedPiecesDataArray = storageData["saveData"];
                }else{
                    cc.log("保存されたデータはありません");
                }
            }catch(e){
                cc.log("保存されたデータはありません");
            }
        //}

        this.rectBase = cc.LayerColor.create(cc.color(255,255,255),320,480);
        this.rectBase.setPosition(0,0);
        this.addChild(this.rectBase);

        //将棋盤を作成する
        this.board = new cc.Sprite(res.Base_png);
        this.board.setAnchorPoint(0,0);
        this.board.setPosition(10,100);
        this.addChild(this.board);

        for(var j=0;j<this.savedPiecesDataArray.length;j++){
            this.piece = new Piece(this,this.savedPiecesDataArray[j][0],this.savedPiecesDataArray[j][1]);
            this.board.addChild(this.piece);
            this.pieces.push(this.piece);
        }

        this.saveButton = new ButtonSprite("Save Game",18,cc.color(0,0,0),this.saveData,this);
        this.saveButton.setAnchorPoint(0,0);
        this.saveButton.setPosition(320/2,80);
        this.addChild(this.saveButton);

        this.refreshButton = new ButtonSprite("Reset Game",18,cc.color(0,0,0),this.resetData,this);
        this.refreshButton.setAnchorPoint(0,0);
        this.refreshButton.setPosition(320/2,50);
        this.addChild(this.refreshButton);


        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan : function(touches, event){
                event.getCurrentTarget().callBaseName(touches[0].getLocation().x,touches[0].getLocation().y);
            },
            onTouchesMoved : function(touches, event){},
            onTouchesEnded:function (touches, event) {
            }
        }),this);

        this.scheduleUpdate();
        return true;
    },

    update:function(dt){
        for(var j=0;j<this.pieces.length;j++){
            this.pieces[j].update();
        }
    },

    goToStageLayer:function () {
        cc.LoaderScene.preload(g_resources, function () {
            cc.director.runScene(new cc.TransitionFade(1.2,new StageLayerScene()));
        }, this);
    },

    callBaseName:function(pushX,pushY){
        for(var i=0;i<this.basePositions.length;i++){

            var boardPosX = this.board.getPosition().x;
            var boardPosY = this.board.getPosition().y;

            if(this.basePositions[i][1] + boardPosX <= pushX && pushX <= this.basePositions[i][1] + boardPosX + 27
                && this.basePositions[i][2] + boardPosY <= pushY && pushY <= this.basePositions[i][2] + boardPosY + 27){

                //handleしている駒がある場合は、その駒を動かす
                for(var j=0;j<this.pieces.length;j++){
                    if(this.pieces[j].isHandle()){

                        
                        //handleしている駒がある + 既に駒が存在する場合は何もせずにreturn
                        for(var k=0;k<this.pieces.length;k++){
                            if(this.pieces[k].positionName == this.basePositions[i][0]){
                                return;
                            }
                        }

                        this.pieces[j].setPos(this.basePositions[i][0]);
                        return;
                    }
                }

                //handleしている駒がない場合は、hitした駒をhandleする
                for(var j=0;j<this.pieces.length;j++){
                    if(this.pieces[j].positionName == this.basePositions[i][0]){
                        cc.log("hit!");
                        this.pieces[j].setHandle();
                    }
                }
            }
        }
    },

    getBasePositionFromName:function(name){
        var _posX = 0;
        var _posY = 0;
        for(var i=0;i<this.basePositions.length;i++){
            if(this.basePositions[i][0] == name){
                _posX = this.basePositions[i][1];
                _posY = this.basePositions[i][2];
            }   
        }
        return [_posX,_posY];
    },

    resetData:function(){
         window.localStorage.setItem("shogiGameData",null);
    },

    saveData:function(){
        //現在配置されているデータからsaveデータを作成する
        this.savedPiecesDataArray =[];
        for(var i=0;i<this.pieces.length;i++){
            var _data = [this.pieces[i].imageName,this.pieces[i].positionName];
            this.savedPiecesDataArray.push(_data);
        }
        //3:android 4:iphone 5:ipad 100:mobile_web 101:pc_web
        //var platform = cc.Application.getInstance().getTargetPlatform();
        //this.storage = new Storage();  
        //if(platform == 100 || platform == 101){
            var testData = {
                "isSaved":true,
                "vesion":'1.0.0',
                "saveData":this.savedPiecesDataArray
            };
            window.localStorage.setItem("shogiGameData",JSON.stringify(testData));
        //}

        cc.log("saved");
        cc.log(testData);
    }

});

var TopLayerScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new TopLayer();
        this.addChild(layer);
    }
});