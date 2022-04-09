
import { _decorator, Component, Node, systemEvent, SystemEvent, SystemEventType, EventKeyboard, Vec3, KeyCode, AudioSource, AudioClip } from 'cc';
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

 enum KeyVal {
    LEFT = 37,
    RIGHT = 39,
    UP = 38,
    DOWN = 40,
    SOUND = 87
  }

@ccclass('Player')
export class Player extends Component {
    @property({
        type: Animation
    })

    @property(AudioSource)    
    private _audioSource: AudioSource = null!

    @property(AudioClip)
    private _clip: AudioClip = null!

    private _curPos = new Vec3();
    private _tarPos = new Vec3();
    private moveLen = 3;

    private _left = new OneAxis();
    private _right = new OneAxis();
    private _up = new OneAxis();
    private _down = new OneAxis();

    private overedPushingTime = 0.05;
    private overedPausedTime = 0.04;
    private _xCode = 0;
    private _zCode = 0;
    private _yCode = 0;

    private Key = {
        LEFT : 37,
        RIGHT : 39,
        UP : 38,
        DOWN : 40
      }

    start () {        
        
      systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
      systemEvent.on(SystemEventType.KEY_UP, this.onKeyUP, this);        
        // [3]
    }


    onKeyDown(e: EventKeyboard) {
        console.log('key pushed: ', e.keyCode)
        let input: number = e.keyCode;
        switch(input) {
            case KeyVal.LEFT:                
            this._left.isPushed = 1;
            this._left.pausedTime = 0
            this._left.position = -this.moveLen       
            break;
            case KeyVal.RIGHT:                
            this._right.isPushed = 1;
            this._right.pausedTime = 0
            this._right.position = this.moveLen 
            break;
            case KeyVal.UP:                
            this._up.isPushed = 1;
            this._up.pausedTime = 0
            this._up.position = -this.moveLen   
            break;
            case KeyVal.DOWN:                
            this._down.isPushed = 1;
            this._down.pausedTime = 0
            this._down.position = this.moveLen 
            break;            
            case KeyVal.SOUND:                
            this.playbackSound();
            break;
        }
    }

    onKeyUP(e: EventKeyboard) {
        //console.log('key up: ', e.keyCode)
        if (e.keyCode === this.Key.LEFT) {               
            this._left.isPushed = 0;
            this._left.position = 0
        } else if (e.keyCode === this.Key.RIGHT) {               
            this._right.isPushed = 0;
            this._right.position = 0;
        } else if (e.keyCode === this.Key.UP) {               
            this._up.isPushed = 0;
            this._up.position = 0
        } else if (e.keyCode === this.Key.DOWN) {               
            this._down.isPushed = 0;
            this._down.position = 0
        } 
    }

    makeSound() {
        var audio = this.node.getComponent(AudioSource)!;
        console.log(audio)
        this._audioSource = audio;
        this._audioSource.play();
    }

    playbackSound() {
        var audio = this.node.getComponent(AudioSource)!;                
        this._audioSource = audio;
        console.log(this._audioSource)
        console.log(audio.clip)
        this._audioSource.playOneShot(audio.clip, 1);
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
//
    update(dt: number) {                
        this._left.pushingTime = this.calPushTime(this._left.pushingTime, this.overedPushingTime, dt, this._left.isPushed);
        this._left.pausedTime = this.calPausedTime(this._left.pausedTime, this.overedPausedTime, dt, this._left.isPushed);        
        this._right.pushingTime = this.calPushTime(this._right.pushingTime, this.overedPushingTime, dt, this._right.isPushed);
        this._right.pausedTime = this.calPausedTime(this._right.pausedTime, this.overedPausedTime, dt, this._right.isPushed);        
        this._up.pushingTime = this.calPushTime(this._up.pushingTime, this.overedPushingTime, dt, this._up.isPushed);
        this._up.pausedTime = this.calPausedTime(this._up.pausedTime, this.overedPausedTime, dt, this._up.isPushed);        
        this._down.pushingTime = this.calPushTime(this._down.pushingTime, this.overedPushingTime, dt, this._down.isPushed);
        this._down.pausedTime = this.calPausedTime(this._down.pausedTime, this.overedPausedTime, dt, this._down.isPushed);        

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
