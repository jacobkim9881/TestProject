
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
        let curx = this.node.getPosition().x
        let curz = this.node.getPosition().z         
        let curDeg = - this.node.eulerAngles.y;     
        //if right mouse button clicked and selected
        let betweenTwoObj = this.calRotationVals(curx, curz, curDeg, rayPosX, rayPosZ, this._rotLen, this._dt)        
      this.c1val = betweenTwoObj.c1val;
      this.x1val = betweenTwoObj.x1val;
      this.z1val = betweenTwoObj.z1val;
      this._ditn = betweenTwoObj.ditn
      this._deg = betweenTwoObj.deg
      }

      return
    }

    changeMenuReturnsVal() {
      let selectedUuid = rayRes[0]._collider.node._id
      mPlayerUuid = this.node.uuid
      this._isMPushed = this.findId(mPlayerUuid, selectedUuid);
      labels[5].string = this._isMPushed === 1 ? 'Mouse player clicked' : ''
    }

    calRotationVals(curx:number, curz:number, curDeg:number, rayPosX:number, rayPosZ:number, moveLen:number, dt:number) {
           
      let betweenTwoObj = this.betweenObjects(curx, curz, rayPosX, rayPosZ, moveLen, dt)      
      let rotateObj = this.rotateObj(curz, rayPosZ, curDeg, betweenTwoObj.xdeg)      
      return {
        c1val: betweenTwoObj.c1val,
        x1val: betweenTwoObj.x1val,
        z1val: betweenTwoObj.z1val,
        ditn: rotateObj.ditn,
        deg: rotateObj.deg        
      }
    }


    findId (uuid: string, targetUuid: string) {            
      if (uuid === targetUuid) return 1
      else return 0      
    }

    rotateObj(curz: number, rayPosZ: number, curDeg:number, xdeg:number) {
        let ditn, deg
        //console.log('--------------------------------------------')        
        //curDeg = - this.node.eulerAngles.y;
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

        //console.log('target deg : ', deg)
        ditn = curDeg - xdeg > 0 ? 1 : -1
        deg = curDeg - xdeg
        //console.log('before 360 q-t : ', deg)
        //console.log('before 360 ditn : ', ditn)
        ditn = deg > 180
          ? -1
          : deg < -180
            ? 1
            : ditn
        deg = deg > 180
          ? deg - 360
          : deg < -180
            ? deg + 360
            : deg
        //console.log('q - t : ', deg)
        //console.log('ditn: ', ditn)
        deg = Math.abs(deg)

        // console.log('quat deg: ',curDeg)
        // console.log('direction: ',ditn)
        // console.log('quat deg - tar deg : ', deg)
        return {ditn: ditn, deg: deg}
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
