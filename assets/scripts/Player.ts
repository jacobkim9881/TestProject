
import { _decorator, Component, Node, systemEvent, SystemEvent, SystemEventType, EventKeyboard, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Player
 * DateTime = Wed Mar 23 2022 11:46:14 GMT+0900 (대한민국 표준시)
 * Author = jacobkim9881
 * FileBasename = Player.ts
 * FileBasenameNoExtension = Player
 * URL = db://assets/scripts/Player.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('Player')
export class Player extends Component {
    @property({
        type: Animation
    })

    private _curPos = new Vec3();
    private _isPushed = false;
    private _keycode = 0;

    start () {
      systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyUP, this)        
        // [3]
    }

    onKeyUP(e: EventKeyboard) {
        //console.log('key: ', e.keyCode)
        this._keycode = e.keyCode;
        this._isPushed = true;        
    }

    moveObj(num: number, dt: number) {         
        num = num === 38 ? -3 : num === 40 ? 3 : 0;
        num = num * dt;
        console.log(num)
        //console.log(this.node.getPosition(this._curPos))       
        this.node.getPosition(this._curPos)
        Vec3.add(this._curPos, this._curPos, new Vec3(num, 0, 0));        
        this.node.setPosition(this._curPos);
        //this.node.getPosition(this._curPos)
        //console.log(this.node.getPosition(this._curPos))       
    }

    update(dt: number) {
        if (this._isPushed) {
            //console.log(dt)
            //console.log('pushed')
            this.moveObj(this._keycode, dt);
            this._isPushed = false;
        } else {
            //console.log('not pushed')
        }
    }

}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
