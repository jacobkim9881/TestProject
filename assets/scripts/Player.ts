
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

    private _left = new OneAxis();
    private _right = new OneAxis();
    private _up = new OneAxis();
    private _down = new OneAxis();

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


        if (e.keyCode === 37) {
            this._left.isPushed = 1;
            this._left.pausedTime = 0
            this._left.position = -this.moveLen         
        } else if (e.keyCode === 39) {
            this._right.isPushed = 1;
            this._right.pausedTime = 0
            this._right.position = this.moveLen 
        } else if (e.keyCode === 38) {
            this._up.isPushed = 1;
            this._up.pausedTime = 0
            this._up.position = -this.moveLen 
        } else if (e.keyCode === 40) {
            this._down.isPushed = 1;
            this._down.pausedTime = 0
            this._down.position = this.moveLen 
        } 
    }

    onKeyUP(e: EventKeyboard) {
        //console.log('key up: ', e.keyCode)
        if (e.keyCode === 37) {               
            this._left.isPushed = 0;
            this._left.position = this.pushingTime <= 0 ? 0 : this._left.position;
        } else if (e.keyCode === 39) {               
            this._right.isPushed = 0;
            this._right.position = this.pushingTime <= 0 ? 0 : this._right.position;
        } else if (e.keyCode === 38) {               
            this._up.isPushed = 0;
            this._up.position = this.pushingTime <= 0 ? 0 : this._up.position;
        } else if (e.keyCode === 40) {               
            this._down.isPushed = 0;
            this._down.position = this.pushingTime <= 0 ? 0 : this._down.position;
        }  
    }

    moveObj(x: number, y: number, z: number) {                 
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
        this._left.pushingTime = this.calPushTime(this._left.pushingTime, this._left.overedPushingTime, dt, this._left.isPushed);
        this._left.pausedTime = this.calPausedTime(this._left.pausedTime, this._left.overedPausedTime, dt, this._left.isPushed);        
        this._right.pushingTime = this.calPushTime(this._right.pushingTime, this._right.overedPushingTime, dt, this._right.isPushed);
        this._right.pausedTime = this.calPausedTime(this._right.pausedTime, this._right.overedPausedTime, dt, this._right.isPushed);        
        this._up.pushingTime = this.calPushTime(this._up.pushingTime, this._up.overedPushingTime, dt, this._up.isPushed);
        this._up.pausedTime = this.calPausedTime(this._up.pausedTime, this._up.overedPausedTime, dt, this._up.isPushed);        
        this._down.pushingTime = this.calPushTime(this._down.pushingTime, this._down.overedPushingTime, dt, this._down.isPushed);
        this._down.pausedTime = this.calPausedTime(this._down.pausedTime, this._down.overedPausedTime, dt, this._down.isPushed);        

        this._xCode = this._left.pushingTime * this._left.position + this._right.pushingTime * this._right.position;       
        this._zCode = this._up.pushingTime * this._up.position + this._down.pushingTime * this._down.position;       
        //console.log(this._x.pushingTime, this._x.pausedTime)
        
        this.moveObj(this._xCode, this._yCode, this._zCode)
        
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
