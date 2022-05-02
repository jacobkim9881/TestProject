
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
    private _targetPos

    start () {
      RtsCamera = this.getComponent(CameraComponent)
      systemEvent.on(SystemEventType.MOUSE_DOWN, this.onMouseDown, this)
      systemEvent.on(SystemEventType.MOUSE_MOVE, this.onMouseMove, this)
    }

    onMouseMove (e) {
      RtsCamera.screenPointToRay(e.getLocationX(), e.getLocationY(), this._ray)
      rayMovingRes = PhysicsSystem.instance.raycastResults
      // console.log(e.getLocationX(), e.getLocationY())
      // console.log(rayMovingRes)
    }

    onMouseDown (e: EventMouse) {
      RtsCamera.screenPointToRay(e.getLocationX(), e.getLocationY(), this._ray)
      isRay = PhysicsSystem.instance.raycast(this._ray, 0xffffffff, 100, true)
      this._button = e.getButton()
      // console.log(e.getButton())
      if (this._button === 0) {
        rayRes = PhysicsSystem.instance.raycastResults
        rayPosX = PhysicsSystem.instance.raycastResults[0].hitPoint.x
        rayPosZ = PhysicsSystem.instance.raycastResults[0].hitPoint.z
        // console.log(PhysicsSystem.instance.raycastResults[0].collider._id)
        // console.log(PhysicsSystem.instance.raycastResults[0])
        const test7 = PhysicsSystem.instance.raycastResults[0].collider.node.uuid
        // console.log(this.node.parent)
        // console.log(this.node.parent.getComponent(test7))
        const targetPos = PhysicsSystem.instance.raycastResults[0].collider.node
        this._targetPos = {
          x: targetPos.getPosition().x,
          z: targetPos.getPosition().z,
          deg: targetPos.eulerAngles.y
        }
        // console.log(this._targetPos)
        // console.log(PhysicsSystem.instance.raycastResults[0].constructor.name)
        // PhysicsRayResult
        // console.log(this.constructor.name)
        // console.log('raycast get', isRay)
        // console.log(rayRes)
        // console.log(rayPosX, rayPosZ)
      } else if (this._button === 2) {
        // rayRes = PhysicsSystem.instance.raycastResults
        this._Action = new Action()
        targetRes = PhysicsSystem.instance.raycastResults
        targetPosX = PhysicsSystem.instance.raycastResults[0].hitPoint.x
        targetPosZ = PhysicsSystem.instance.raycastResults[0].hitPoint.z
        const posX = targetRes[0].hitPoint.x
        const posZ = targetRes[0].hitPoint.z
        // console.log(this._targetPos)

        targetDeg = this._Action.calRotationValsByCollider(this._targetPos.x, this._targetPos.z, posX, posZ)
        this._targetPos = {
          // x: 0,
          // z: 0,
          x: posX,
          z: posZ,
          deg: targetDeg
        }
      }
    }

    update (dt: number) {

    }
}
