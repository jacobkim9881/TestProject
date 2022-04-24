
import { _decorator, Component, systemEvent, SystemEventType, Vec3, EventMouse, Label, Quat, quat, Prefab, instantiate, Director, director, resources } from 'cc'
import { isRay, rayPosX, rayPosZ, rayRes } from './Camera'
import { labels, Menu, curPage } from './Menu'
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
    pricurDeg: number = 0
    private _betweenTwoObj: any = null!

    start () {
      systemEvent.on(SystemEventType.MOUSE_DOWN, this.onMouseDown, this)
    }

    findId (uuid: string, selected: string) {            
      if (uuid === selected) return 1
      else return 0      
    }

    rotateObj(curx: number, curz: number, rayPosX:number, rayPosZ: number, moveLen: number, curDeg:number, xdeg:number) {

        //console.log('--------------------------------------------')        
        curDeg = - this.node.eulerAngles.y;
        //console.log('object cur deg: ', curDeg)
        curDeg = curDeg >= 0 ? curDeg : curDeg + 360;
        //if (curDeg < 0) {console.log('edited cur deg + 360: ', curDeg)}        
        if (xdeg > 0 && xdeg < 90) { 
          if (curz < rayPosZ) { // 90-180
            xdeg = xdeg + 90
          } else if (curz > rayPosZ) { // 180-270 
            xdeg = (90 - xdeg) + 180
          }
        } else if (xdeg < 0 && xdeg > -90) {
          if (curz < rayPosZ) { // 0-90
            xdeg = xdeg + 90
          } else if (curz > rayPosZ) { // 270-360 
            xdeg = -xdeg + 270
          }
        }

        //console.log('target deg : ', this._deg)
        this._ditn = curDeg - xdeg > 0 ? 1 : -1
        this._deg = curDeg - xdeg
        //console.log('before 360 q-t : ', this._deg)
        //console.log('before 360 ditn : ', this._ditn)
        this._ditn = this._deg > 180
          ? -1
          : this._deg < -180
            ? 1
            : this._ditn
        this._deg = this._deg > 180
          ? this._deg - 360
          : this._deg < -180
            ? this._deg + 360
            : this._deg
        //console.log('q - t : ', this._deg)
        //console.log('ditn: ', this._ditn)
        this._deg = Math.abs(this._deg)

        // console.log('quat deg: ',curDeg)
        // console.log('direction: ',this._ditn)
        // console.log('quat deg - tar deg : ', this._deg)
    }

    betweenObjects(curx:number, curz: number, rayPosX:number, rayPosZ: number, moveLen: number, dt: number) {
      let xLen, zLen, cval, c1val, x1val, z1val, sinx, xdeg
      //dt = 0.015
      // console.log('cur x, z', curx, curz)
      // console.log('ray x, z', rayPosX, rayPosZ)
      xLen = curx - rayPosX
      zLen = curz - rayPosZ
      cval = Math.sqrt(Math.pow(xLen, 2) + Math.pow(zLen, 2))
      // console.log(cval)
      c1val = cval / (dt * moveLen)
      x1val = -xLen / c1val
      z1val = -zLen / c1val
      sinx = xLen / cval
      // console.log(xLen, cval)
      // console.log(sinx)
      xdeg = Math.asin(sinx) * (180 / Math.PI)
      // console.log(xdeg)        
      //console.log('Euler angle y: ', this.node.eulerAngles.y)
      //console.log('curDeg: ', curDeg)
      return {
        c1val: c1val, x1val: x1val, z1val: z1val, sinx: sinx, xdeg: xdeg 
      }
    }

    onMouseDown (e: EventMouse) {
      const _quat = new Quat()      
      const rad = 100 * Math.PI / 180

      // this.node.rotation = Quat.fromEuler(new Quat(), 0, 20, 0);

      // Quat.rotateAround(_quat, this.node.rotation, Vec3.UP, rad);
      // console.log(test1)
      // console.log(test2 * 180 / Math.PI)      

      let button = e.getButton();
      let curx = this.node.getPosition().x
      let curz = this.node.getPosition().z
      let moveLen = 10
      let selectedUuid = rayRes[0]._collider.node._id
      mPlayerUuid = this.node.uuid
      
      //if object selected
      if (button === 0) {
        this._isMPushed = this.findId(mPlayerUuid, selectedUuid);
        labels[5].string = this._isMPushed === 1 ? 'Mouse player clicked' : ''
      } else if (isRay && button === 2 && this._isMPushed) {
        //if right mouse button clicked and selected
        let dt = 0.015
        let curDeg = - this.node.eulerAngles.y;
        this._betweenTwoObj = this.betweenObjects(curx, curz, rayPosX, rayPosZ, moveLen, dt)
        this.rotateObj(curx, curz, rayPosX, rayPosZ, moveLen, curDeg, this._betweenTwoObj.xdeg)
      }
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
    }

    update (dt: number) {
      if (this.c1val > 0) this.executeMove()
      if (this._deg > 0) this.excuteRotate()
    }

    executeMove() {
      this.moveObj(this.x1val, 0, this.z1val)
      this.c1val = this.c1val - 1
    }

    excuteRotate() {
      let move1 = this._ditn * 4;
      let moveLessThan1 = this._deg;        
      let moveDegree = this._deg < move1 && this._deg > 0 ? moveLessThan1 : move1;
      this.node.rotation = Quat.rotateY(new Quat(), this.node.rotation, moveDegree * Math.PI / 180)
      objectRotDeg = this.node.eulerAngles.y;
      objectPos = this.node.getPosition()
      this._deg = this._deg - Math.abs(move1)
    }
}
