import { _decorator, Component, systemEvent, SystemEventType, EventKeyboard, Vec3, AudioSource, AudioClip, Collider, ITriggerEvent, Quat, EventMouse, quat, Camera, CameraComponent, Prefab, instantiate } from 'cc'
import { OneAxis } from './OneAxis'
const { ccclass, property } = _decorator

 enum KeyVal {
    LEFT = 37,
    RIGHT = 39,
    UP = 38,
    DOWN = 40,
    JUMP = 32,
    SOUND = 87
  }

/**
 * Predefined variables
 * Name = FPSP
 * DateTime = Sat Apr 16 2022 08:18:09 GMT+0900 (대한민국 표준시)
 * Author = jacobkim9881
 * FileBasename = FPSP.ts
 * FileBasenameNoExtension = FPSP
 * URL = db://assets/scripts/FPSP.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
export let fpsPos
export let FpsCamera:CameraComponent = null!

@ccclass('FPSP')
export class FPSP extends Component {
    @property({
      type: Animation
    })

    @property(AudioSource)

    @property(Prefab)

      curPrefabff: Prefab = null!

    @property(AudioClip)

    private _curPos = new Vec3()
    private moveLen = 0.15
    private jumpHeight = 6
    private jumpLimit = 0.2
    private input: number = null!

    private _left = new OneAxis()
    private _right = new OneAxis()
    private _up = new OneAxis()
    private _down = new OneAxis()
    private _jump = new OneAxis()

    private _xCode = 0
    private _zCode = 0
    private _yCode = 0

    test (n: number) {
      const child = instantiate(this.curPrefabff)
      this.node.addChild(child)
      child.setPosition(n, 0, n)
    }

    start () {
      fpsPos = this.node.getPosition()
      FpsCamera = this.getComponentInChildren(CameraComponent)
      console.log('dd')
      const collider : Collider = this.getComponent(Collider)
      collider.on('onTriggerEnter', this.onTrigger, this)
      systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this)
      systemEvent.on(SystemEventType.KEY_UP, this.onKeyUP, this)
      //systemEvent.on(SystemEventType.MOUSE_DOWN, this.onMouseDown, this)

      FpsCamera.enabled = false
      // [3]
    }

    onMouseDown (e: EventMouse) {
    }

    private onTrigger (event: ITriggerEvent) {
      console.log(event.type, event)
    }

    onKeyDown (e: EventKeyboard) {
      console.log('key pushed: ', e.keyCode)
      console.log(this._jump.pushingTime)
      console.log(this._jump.isPushed)
      this.input = e.keyCode
      switch (this.input) {
      case KeyVal.LEFT:
        this._left.isPushed = 1
        break
      case KeyVal.RIGHT:
        this._right.isPushed = 1
        break
      case KeyVal.UP:
        this._up.isPushed = 1
        break
      case KeyVal.DOWN:
        this._down.isPushed = 1
        break
      case KeyVal.JUMP:
        console.log('pushed')
        this._jump.isPushed = 1
        break
      default:
        break
      }
    }

    onKeyUP (e: EventKeyboard) {
      // console.log('key up: ', e.keyCode)
      this.input = e.keyCode
      switch (this.input) {
      case KeyVal.LEFT:
        this._left.isPushed = 0
        break
      case KeyVal.RIGHT:
        this._right.isPushed = 0
        break
      case KeyVal.UP:
        this._up.isPushed = 0
        break
      case KeyVal.DOWN:
        this._down.isPushed = 0
        break
      case KeyVal.JUMP:
        this._jump.isPushed = 0
        this._jump.pushingTime = 0
        break
      default:
        break
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
      const rotx = new Quat(0, 0, 0)

      this.node.getPosition(this._curPos)
      Vec3.add(this._curPos, this._curPos, new Vec3(x, y, z))
      this.node.setPosition(this._curPos)
      /*
        this.node.getRotation(rotx)
        Quat.rotateX(rotx, Quat.IDENTITY, 0.2)
        this.node.setRotation(rotx);
        */
      // this.node.setRotation()
      // console.log(this.node.getPosition(this._curPos))
    }

    update (dt: number) {
      // console.log(this._eMouse)
      // console.log(this._eMouse)
      this._jump.pushingTime = this.calJumpTime(this._jump.pushingTime, dt, this._jump.isPushed)
      this._xCode = this.moveLen * (this._left.isPushed * -1 + this._right.isPushed)
      this._zCode = this.moveLen * (this._up.isPushed * -1 + this._down.isPushed)
      this._yCode = this.jumpHeight * this._jump.pushingTime * this.isJumpStop(this.jumpLimit, this._jump.pushingTime)

      // console.log(this._x.pushingTime, this._x.pausedTime)

      this.moveObj(this._xCode, this._yCode, this._zCode)
    }
}
