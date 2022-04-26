
import { _decorator, Component, systemEvent, SystemEventType, Vec3, EventMouse, Label, Quat, quat, Prefab, instantiate, Director, director, resources } from 'cc'
import { isRay, rayPosX, rayPosZ, rayRes } from './Camera'
import { labels, Menu, curPage } from './Menu'
import { Action } from './Action'
const { ccclass, property } = _decorator

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

  export let objectRotDeg: number = 0
  export let objectPos:Vec3 = null!
  export let mPlayerUuid:string = null!

@ccclass('MousePlayer')
export class MousePlayer extends Component {
    @property({
      type: Animation
    })
    
    @property({
      type: Label
    })
    
    private _Action = new Action();

  private _curPos = new Vec3()

    private jumpHeight = 6
    private jumpLimit = 0.2
    private _isMPushed: number = 0
    private _mPushingTime: number = 0
    private c1val: number = 0
    private x1val: number = 0
    private z1val: number = 0
    private _deg: number = 0
    private _ditn: number = 0
    private _aDeg: number = 4
    private _dt: number = 0.015
    private _rotLen: number = 10
    pricurDeg: number = 0
    private _betweenTwoObj: any = null!

    start () {
      systemEvent.on(SystemEventType.MOUSE_DOWN, this.onMouseDown, this)
    }

    update (dt: number) {
      this.executeMove(this.c1val, this.z1val, this.x1val)
      this.excuteRotate(this._aDeg)
    }

    onMouseDown (e: EventMouse) {

      let button = e.getButton();
      
      //if object selected
      if (button === 0) {
        this.changeMenuReturnsVal()
      } else if (isRay && button === 2 && this._isMPushed) {      
        //if right mouse button clicked and selected
        this.calRotationVals(rayPosX, rayPosZ, this._rotLen, this._dt)
      }
    }

    changeMenuReturnsVal() {
      let selectedUuid = rayRes[0]._collider.node._id
      mPlayerUuid = this.node.uuid
      this._isMPushed = this._Action.findId(mPlayerUuid, selectedUuid);
      //this.findId(mPlayerUuid, selectedUuid);
      labels[5].string = this._isMPushed === 1 ? 'Mouse player clicked' : ''
    }

    calRotationVals(rayPosX:number, rayPosZ:number, moveLen:number, dt:number) {
      let curx = this.node.getPosition().x
      let curz = this.node.getPosition().z         
      let curDeg = - this.node.eulerAngles.y;     

      this._betweenTwoObj = this._Action.betweenObjects(curx, curz, rayPosX, rayPosZ, moveLen, dt)
      let betweenTwoObj = this._betweenTwoObj;        
      this.c1val = betweenTwoObj.c1val;
      this.x1val = betweenTwoObj.x1val;
      this.z1val = betweenTwoObj.z1val;

      let rotateObj = this._Action.rotateObj(curz, rayPosZ, curDeg, this._betweenTwoObj.xdeg)
      //this.rotateObj(curz, rayPosZ, curDeg, this._betweenTwoObj.xdeg)
      this._ditn = rotateObj.ditn
      this._deg = rotateObj.deg
      
      return 
    }

    calJumpTime (pushingTime: number, dt: number, pushed: number) {
      return pushingTime = pushingTime + dt * pushed
    }

    isJumpStop (limit: number, dt: number) {
      return dt > limit ? 0 : 1
    }

    moveObj (x: number, y: number, z: number) {
      // console.log(x !== 0 ? x : null + z !== 0 ? z :null)
      // console.log(x)
      // console.log(this.node.getPosition(this._curPos))
      this.node.getPosition(this._curPos)
      Vec3.add(this._curPos, this._curPos, new Vec3(x, y, z))
      this.node.setPosition(this._curPos)
      // console.log(this.node.getPosition(this._curPos))
      return
    }

    executeMove(c1val: number, z1val: number, x1val: number) {
      if (c1val < 0) return
      this.moveObj(x1val, 0, z1val)
      c1val = c1val - 1
      return
    }

    excuteRotate(aDegree) {
      if (this._deg < 0) return
      aDegree = 4
      let move1 = this._ditn * aDegree;
      let moveLessThan1 = this._deg;        
      let moveDegree = this._deg < move1 && this._deg > 0 ? moveLessThan1 : move1;
      this.node.rotation = Quat.rotateY(new Quat(), this.node.rotation, moveDegree * Math.PI / 180)
      objectRotDeg = this.node.eulerAngles.y;
      objectPos = this.node.getPosition()
      this._deg = this._deg - Math.abs(move1)
      return      
    }
}
