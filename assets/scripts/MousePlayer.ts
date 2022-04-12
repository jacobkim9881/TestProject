
import { _decorator, Component, Node, systemEvent, SystemEvent, SystemEventType, EventKeyboard, Vec3, KeyCode, AudioSource, AudioClip, Collider, ITriggerEvent, EventMouse } from 'cc';
import { Camera, rayRes, isRay, rayPosX, rayPosZ } from './Camera'
import { OneAxis } from './OneAxis'
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = MousePlayer
 * DateTime = Mon Apr 11 2022 11:13:18 GMT+0900 (대한민국 표준시)
 * Author = jacobkim9881
 * FileBasename = MousePlayer.ts
 * FileBasenameNoExtension = MousePlayer
 * URL = db://assets/scripts/MousePlayer.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('MousePlayer')
export class MousePlayer extends Component {

    @property({
        type: Animation
    })

    private _curPos = new Vec3();
    private _tarPos = new Vec3();
    private moveLen = 0.15;
    private jumpHeight = 6;
    private jumpLimit = 0.2;
    private input: number = null!;
    private _isMPushed: number = 0;
    private _mPushingTime: number = 0;    
    private _xLen: number = 0;
    private _zLen: number = 0;
    private _curx: number = 0;
    private _curz: number = 0;

    private _left = new OneAxis();
    private _right = new OneAxis();
    private _xCode = 0;
    private _zCode = 0;

    start () {        
        systemEvent.on(SystemEventType.MOUSE_DOWN, this.onMouseDown, this);
    }

    onMouseDown(e: EventMouse) {     
        this._curx = this.node.getPosition().x;
        this._curz = this.node.getPosition().z;
        if (isRay) {
            this._xLen = Math.abs(this._curx - rayPosX)/(0.015 * this.moveLen);
            this._zLen = Math.abs(this._curz - rayPosX)/(0.015 * this.moveLen);
           }
     //   this._xLen = 
    }

    calJumpTime(pushingTime: number, dt: number, pushed: number) {
        return pushingTime = pushingTime + dt * pushed;
    }

    isJumpStop(limit: number, dt: number) {
        return dt > limit ? 0 : 1
    }

    moveObj(x: number, y: number, z: number) {                 
        //console.log(x !== 0 ? x : null + z !== 0 ? z :null)
        //console.log(x)
        //console.log(this.node.getPosition(this._curPos))       
        this.node.getPosition(this._curPos)
        Vec3.add(this._curPos, this._curPos, new Vec3(x, y, z));        
        this.node.setPosition(this._curPos);
        //console.log(this.node.getPosition(this._curPos))       
    }

    update(dt: number) {    

                 
        //console.log(this._x.pushingTime, this._x.pausedTime)
        
        this.moveObj(this._xLen, 0, this._zLen)
        
    }
}
