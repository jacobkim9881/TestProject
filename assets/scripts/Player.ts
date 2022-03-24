
import { _decorator, Component, Node, systemEvent, SystemEvent, SystemEventType, EventKeyboard, Vec3, KeyCode } from 'cc';
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
    private _tarPos = new Vec3();
    private _isPushed = false;
    private pushingTime = 0;
    private pausedTime = 0;
    private _xPushed = false;
    private _zPushed = false;
    private _xCode = 0;
    private _zCode = 0;
    //private _isPushing = false;
    private _keycode = 0;

    start () {
      systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
      systemEvent.on(SystemEventType.KEY_UP, this.onKeyUP, this);        
        // [3]
    }

    onKeyDown(e: EventKeyboard) {
        console.log('key: ', e.keyCode)
        this._keycode = e.keyCode;
        this._isPushed = true;        
        if (this._keycode === 37 || this._keycode === 39) this._xPushed = true;
        if (this._keycode === 38 || this._keycode === 40) this._zPushed = true;
    }

    onKeyUP(e: EventKeyboard) {
        //console.log('key: ', e.keyCode)
        this._keycode = e.keyCode;
        this._isPushed = false;        
        if (this._keycode === 37 || this._keycode === 39) {
            this._xCode = 0;
            this._xPushed = false;
        }
        if (this._keycode === 38 || this._keycode === 40) {
            this._zCode = 0;
            this._zPushed = false;
        }
    }

    moveObj(key: number, dt: number) {         
        let x, y, z;
        x = key === 37 ? -3 : key === 39 ? 3 : 0;
        z = key === 38 ? -3 : key === 40 ? 3 : 0;         
        x = x * dt;
        z = z * dt;
        //console.log(x !== 0 ? x : null + z !== 0 ? z :null)
        //console.log(x)
        //console.log(this.node.getPosition(this._curPos))       
        this.node.getPosition(this._curPos)
        Vec3.add(this._curPos, this._curPos, new Vec3(x, 0, z));        
        this.node.setPosition(this._curPos);
        //this.node.getPosition(this._curPos)
        //console.log(this.node.getPosition(this._curPos))       
    }

    update(dt: number) {
        if (this._isPushed) {
            //console.log(dt)
            //console.log('pushed')
            this.pausedTime = 0;
            this.pushingTime = this.pushingTime <= 0.1 ? this.pushingTime + dt * 0.3 : this.pushingTime;
            //console.log(this.pushingTime)
            if (this._keycode === 37 || this._keycode === 39) this._xCode = this._keycode;
            if (this._xPushed) this.moveObj(this._xCode, this.pushingTime);
            if (this._keycode === 38 || this._keycode === 40) this._zCode = this._keycode;
            if (this._zPushed) this.moveObj(this._zCode, this.pushingTime);
            //this.moveObj(this._keycode, this.pushingTime);
            //this._isPushed = false;
        } else {
            //console.log(dt)
            this.pausedTime = this.pausedTime <= 0.2 ? this.pausedTime + dt : this.pausedTime;            
            this.pushingTime = this.pausedTime <= 0.2 ? this.pushingTime : 0;
            //this._isPushing = false;
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
