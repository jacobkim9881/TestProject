
import { _decorator, Component, Node, systemEvent, SystemEvent, SystemEventType, EventKeyboard, Vec3, KeyCode } from 'cc';
import { OneAxis } from './OneAxis'
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
    private _keycode = 0;
    private moveLen = 3;

    private _x = new OneAxis();
    private _y = new OneAxis();
    private _z = new OneAxis();

    private sadis = {
        isPushed: 0,
        pushingTime: 0,
        pausedTime: 0,
        overedPushingTime: 0.1,
        overedPausedTime: 0.1,
        position: 0
    }
    private _isPushed = 0;
    private pushingTime = 0;
    private pausedTime = 0;
    private overedPushingTime = 0.1;
    private overedPausedTime = 0.1;
    private _xCode = 0;
    private _zCode = 0;
    private _yCode = 0;

    start () {        
      systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
      systemEvent.on(SystemEventType.KEY_UP, this.onKeyUP, this);        
        // [3]
    }

    aKeyDown(keycode: number, isPushed: number, puasedTime: number, moveLen: number, codeVal: number) {
        
    }

    onKeyDown(e: EventKeyboard) {
        console.log('key pushed: ', e.keyCode)
        this._keycode = e.keyCode;

        if (e.keyCode === 37 || e.keyCode === 39) {
            this._x.isPushed = 1;
            this._x.pausedTime = 0
            this._x.position = e.keyCode === 37 ? - this.moveLen 
        : e.keyCode === 39 ? this.moveLen 
        : this._x.position;
        } else if (e.keyCode === 38 || e.keyCode === 40) {
            this._z.isPushed = 1;
            this._z.pausedTime = 0
            this._z.position = e.keyCode === 38 ? - this.moveLen 
        : e.keyCode === 40 ? this.moveLen 
        : this._z.position;
        }
        
    }

    onKeyUP(e: EventKeyboard) {
        //console.log('key up: ', e.keyCode)
        if (e.keyCode === 37 || e.keyCode === 39) {               
            this._x.isPushed = 0;
            this._x.pushingTime = this._x.pausedTime <= 0.04 ? this._x.pushingTime : 0;
            this._x.position = 0;
        } else if (e.keyCode === 38 || e.keyCode === 40) {
            this._z.isPushed = 0;
            this._z.pushingTime = this._z.pausedTime <= 0.2 ? this._z.pushingTime : 0;
            this._z.position = 0;

        }
    }

    moveObj(x: number, y: number, z: number, xdt: number, ydt: number, zdt: number) {                 
        x = x * xdt;
        z = z * zdt;        
        //console.log(x !== 0 ? x : null + z !== 0 ? z :null)
        //console.log(x)
        //console.log(this.node.getPosition(this._curPos))       
        this.node.getPosition(this._curPos)
        Vec3.add(this._curPos, this._curPos, new Vec3(x, 0, z));        
        this.node.setPosition(this._curPos);
        //console.log(this.node.getPosition(this._curPos))       
    }

    calPushTime(pushingTime: number, overed: number, dt: number, pushed: number) {
        //return pushingTime = pushingTime + dt * 0.3 * pushed;
        return pushingTime = pushingTime <= overed ? pushingTime + dt * 0.3 * pushed : pushingTime;
    }

    calPausedTime(puasedTime: number, overed: number, dt: number, pushed: number) {
        return puasedTime = puasedTime <= overed ? puasedTime + dt * (1 - pushed) : puasedTime;
    }

    update(dt: number) {        
        this.moveObj(this._x.position, this._y.position, this._z.position, this._x.pushingTime, this._y.pushingTime, this._z.pushingTime);        
        this._x.pushingTime = this.calPushTime(this._x.pushingTime, this._x.overedPushingTime, dt, this._x.isPushed);
        this._x.pausedTime = this.calPausedTime(this._x.pausedTime, this._x.overedPausedTime, dt, this._x.isPushed);        
        console.log(this._x.pushingTime, this._x.pausedTime)
        //this._x.pushingTime = this.calPushTime(this._x.pushingTime, this._x.overedPushingTime, dt, this._x.isPushed);
        this._z.pushingTime = this.calPushTime(this._z.pushingTime, this._z.overedPushingTime, dt, this._z.isPushed);
        
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
