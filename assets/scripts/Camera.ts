
import { _decorator, Component, systemEvent, SystemEventType, EventKeyboard, Vec3, EventMouse, geometry, PhysicsSystem, CameraComponent, Quat } from 'cc'
import { EDITOR } from 'cc/env'
import { FPSP, fpsPos } from './FPSP'
import { Action } from './Action'
import { MousePlayer } from './MousePlayer'
const { ccclass, property } = _decorator

/**
 * Predefined variables
 * Name = Camera
 * DateTime = Mon Apr 11 2022 11:09:32 GMT+0900 (대한민국 표준시)
 * Author = jacobkim9881
 * FileBasename = Camera.ts
 * FileBasenameNoExtension = Camera
 * URL = db://assets/scripts/Camera.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

export let rayRes: Array<any> = null!
export let rayPosX: number = null!
export let rayPosZ: number = null!
export let isRay: boolean = null!
export let RtsCamera: CameraComponent = null!
export let rayMovingRes: Array<any> = null!
export let targetRes: Array<any> = null!
export let targetDeg
export let targetPosX: number = null!
export let targetPosZ: number = null!

@ccclass('Camera')
export class Camera extends Component {
    @property({ type: CameraComponent })
      RtsCamera: CameraComponent = null as any

    private _ray: geometry.Ray = new geometry.Ray()
    private _isMPushed: number = 0
    private _button: number = null!
    private _Action
    private _MousePlayer = new MousePlayer()
    private _targetObj

    start () {
      RtsCamera = this.getComponent(CameraComponent)
      systemEvent.on(SystemEventType.MOUSE_DOWN, this.onMouseDown, this)
      systemEvent.on(SystemEventType.MOUSE_MOVE, this.onMouseMove, this)
    }
    
    onMouseMove(e) {
      RtsCamera.screenPointToRay(e.getLocationX(), e.getLocationY(), this._ray)      
      rayMovingRes = PhysicsSystem.instance.raycastResults
      //console.log(e.getLocationX(), e.getLocationY())
      //console.log(rayMovingRes)
    }

    onMouseDown (e: EventMouse) {
      RtsCamera.screenPointToRay(e.getLocationX(), e.getLocationY(), this._ray)
      isRay = PhysicsSystem.instance.raycast(this._ray, 0xffffffff, 100, true)
      this._button = e.getButton()
//console.log(e.getButton())
      if (this._button === 0) {
      
      rayRes = PhysicsSystem.instance.raycastResults
      rayPosX = PhysicsSystem.instance.raycastResults[0].hitPoint.x
      rayPosZ = PhysicsSystem.instance.raycastResults[0].hitPoint.z
      //console.log(PhysicsSystem.instance.raycastResults[0].collider._id)
      //console.log(PhysicsSystem.instance.raycastResults[0])
      let test7 = PhysicsSystem.instance.raycastResults[0].collider.node.uuid
      //console.log(this.node.parent)
      //console.log(this.node.parent.getComponent(test7))
      let targetObj = PhysicsSystem.instance.raycastResults[0].collider.node      
      this._targetObj = {
        x: targetObj.getPosition().x,
        z: targetObj.getPosition().z,
        deg: targetObj.eulerAngles.y
      } 
      //console.log(this._targetObj)
      //console.log(PhysicsSystem.instance.raycastResults[0].constructor.name)
      //PhysicsRayResult
      //console.log(this.constructor.name)
      // console.log('raycast get', isRay)
      // console.log(rayRes)
      // console.log(rayPosX, rayPosZ)
      
      } else if (this._button === 2) {
        //rayRes = PhysicsSystem.instance.raycastResults
        this._Action = new Action()
        targetRes = PhysicsSystem.instance.raycastResults        
        targetPosX = PhysicsSystem.instance.raycastResults[0].hitPoint.x
        targetPosZ = PhysicsSystem.instance.raycastResults[0].hitPoint.z
        let posX = targetRes[0].hitPoint.x
        let posZ = targetRes[0].hitPoint.z
        //console.log(this._targetObj)
        
        targetDeg = this._Action.calRotationValsByCollider(this._targetObj.x, this._targetObj.z, this._targetObj.deg, posX, posZ)        
        this._targetObj = {
          x: posX,
          z: posZ,
          deg: - targetDeg.ditn * targetDeg.deg
        } 
        
        //console.log(this._targetObj)
      }
      
      /*
      this._button = e.getButton();

      
      //if object selected
      if (this._button === 0) {
        this._MousePlayer.changeMenuReturnsVal()        
      } else if (isRay && this._button === 2 && this._isMPushed) {      
        //if right mouse button clicked and selected
        this._Action.calRotationVals(this, rayPosX, rayPosZ)
      }
      */

      /*
        let tarNode = rayRes[rayRes.length - 1];
        let pos2:Vec3= this.node.position;
        console.log(tarNode, pos2)
        let _quat = new Quat();
        let v1 = new Vec3();
        let v2 = new Vec3();
        let rad = 0.5 * Math.PI / 180;
        let axis = Vec3.UP
        //new Vec3(0, 0, 0);
        let pos = tarNode._hitPoint;
        Quat.fromAxisAngle(_quat, axis, rad);
        Vec3.subtract(v1, pos2, pos)
        Vec3.transformQuat(v2, v1, _quat)
        this.node.position = Vec3.add(v2, pos, v2);
        console.log(this.node.rotation)
        Quat.rotateAround(_quat, this.node.rotation, axis, rad)
        //Quat.rotateAroundLocal(tarNode._hitPoint, pos2, v1, 100);
        */
    }

    update (dt: number) {
      if (this._isMPushed && this._button === 0) {
      //this._Action.objSetPos(this, rayPosX, 0, rayPosZ)
      //console.log('pushed')
      }

    }
}
