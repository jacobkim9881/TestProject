
import { _decorator, Component, Quat, Vec3 } from 'cc'
const { ccclass, property } = _decorator

/**
 * Predefined variables
 * Name = Action
 * DateTime = Tue Apr 26 2022 09:11:28 GMT+0900 (대한민국 표준시)
 * Author = jacobkim9881
 * FileBasename = Action.ts
 * FileBasenameNoExtension = Action
 * URL = db://assets/scripts/Action.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('Action')
export class Action extends Component {

    findId (uuid: string, targetUuid: string) {            
      if (uuid === targetUuid) return 1
      else return 0      
    }

    calRotationVals(thisClass: any, rayPosX: number, rayPosZ: number) {
      let dt = 0.015
      let curx = thisClass.node.getPosition().x
      let curz = thisClass.node.getPosition().z            
      let moveLen = 10            
      let curDeg = - thisClass.node.eulerAngles.y;                
      thisClass._betweenTwoObj = thisClass._Action.betweenObjects(curx, curz, rayPosX, rayPosZ, moveLen, dt)
      let betweenTwoObj = thisClass._betweenTwoObj;        
      thisClass.c1val = betweenTwoObj.c1val;
      thisClass.x1val = betweenTwoObj.x1val;
      thisClass.z1val = betweenTwoObj.z1val;

      let rotateObj = thisClass._Action.rotateObj(curz, rayPosZ, curDeg, thisClass._betweenTwoObj.xdeg)
      thisClass._ditn = rotateObj.ditn
      thisClass._deg = rotateObj.deg
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

    excuteRotate(thisClass: any, objectRotDeg: number, objectPos: Vec3 ) {
      let move1 = thisClass._ditn * 4;
      let moveLessThan1 = thisClass._deg;        
      let moveDegree = thisClass._deg < move1 && thisClass._deg > 0 ? moveLessThan1 : move1;
      thisClass.node.rotation = Quat.rotateY(new Quat(), thisClass.node.rotation, moveDegree * Math.PI / 180)      
      //console.log(objectPos)
      thisClass._deg = thisClass._deg - Math.abs(move1)
      objectRotDeg = thisClass.node.eulerAngles.y;
      objectPos = thisClass.node.getPosition()
      return {objectRotDeg: objectRotDeg, objectPos: objectPos}      
    }

    moveObj (thisClass:any, x: number, y: number, z: number) {
      // console.log(x !== 0 ? x : null + z !== 0 ? z :null)
      // console.log(x)
      // console.log(thisClass.node.getPosition(thisClass._curPos))
      thisClass.node.getPosition(thisClass._curPos)
      Vec3.add(thisClass._curPos, thisClass._curPos, new Vec3(x, y, z))
      thisClass.node.setPosition(thisClass._curPos)
      // console.log(thisClass.node.getPosition(thisClass._curPos))
    }

    executeMove(thisClass:any) {
        if (thisClass.c1val < 0) return
        thisClass.moveObj(thisClass.x1val, 0, thisClass.z1val)
        thisClass.c1val = thisClass.c1val - 1
        return
      }
      
    calJumpTime (pushingTime: number, dt: number, pushed: number) {
        return pushingTime = pushingTime + dt * pushed
      }
  
      isJumpStop (limit: number, dt: number) {
        return dt > limit ? 0 : 1
      }

}
