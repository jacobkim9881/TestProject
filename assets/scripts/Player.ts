
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
    private _isPushed = 0;
    private pushingTime = 0;
    private pausedTime = 0;
    private overedPushingTime = 0.1;
    private overedPausedTime = 0.1;
    private _xCode = 0;
    private _zCode = 0;
    private _yCode = 0;
    private _keycode = 0;
    private moveLen = 3;

    start () {
      systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
      systemEvent.on(SystemEventType.KEY_UP, this.onKeyUP, this);        
        // [3]
    }

    onKeyDown(e: EventKeyboard) {
        console.log('key pushed: ', e.keyCode)
        this._keycode = e.keyCode;
        this._isPushed = 1;      
        this.pausedTime = 0;

        this._xCode = this._keycode === 37 ? - this.moveLen 
        : this._keycode === 39 ? this.moveLen 
        : this._xCode;

        this._zCode = this._keycode === 38 ? - this.moveLen 
        : this._keycode === 40 ? this.moveLen 
        : this._zCode;
        
    }

    onKeyUP(e: EventKeyboard) {
        //console.log('key up: ', e.keyCode)
        this._keycode = e.keyCode;
        this._isPushed = 0;                
        this.pushingTime = this.pausedTime <= 0.2 ? this.pushingTime : 0;

        if (this._keycode === 37 || this._keycode === 39) this._xCode = 0;        
        if (this._keycode === 38 || this._keycode === 40) this._zCode = 0;
    }

    moveObj(x: number, y: number, z: number, dt: number) {                 
        x = x * dt;
        z = z * dt;        
        //console.log(x !== 0 ? x : null + z !== 0 ? z :null)
        //console.log(x)
        //console.log(this.node.getPosition(this._curPos))       
        this.node.getPosition(this._curPos)
        Vec3.add(this._curPos, this._curPos, new Vec3(x, 0, z));        
        this.node.setPosition(this._curPos);
        //console.log(this.node.getPosition(this._curPos))       
    }

    calPushTime(pushingTime: number, overed: number, dt: number, pushed: number) {
        return pushingTime = pushingTime <= overed ? pushingTime + dt * 0.3 * pushed : pushingTime;
    }

    calPausedTime(puasedTime: number, overed: number, dt: number, pushed: number) {
        return puasedTime = puasedTime <= overed ? puasedTime + dt * (1 - pushed) : puasedTime;
    }

    update(dt: number) {        
        this.moveObj(this._xCode, this._yCode, this._zCode, this.pushingTime);        
        this.pushingTime = this.calPushTime(this.pushingTime, this.overedPushingTime, dt, this._isPushed);
        this.pausedTime = this.calPausedTime(this.pausedTime, this.overedPausedTime, dt, this._isPushed);
        
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
