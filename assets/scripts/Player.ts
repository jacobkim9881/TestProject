import { _decorator, Component, systemEvent, SystemEventType, EventKeyboard, Vec3, AudioSource, AudioClip, Collider, ITriggerEvent, Quat } from 'cc'
import { OneAxis } from './OneAxis'
const { ccclass, property } = _decorator

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
    JUMP = 32,
    SOUND = 87
  }

@ccclass('Player')
export class Player extends Component {
    @property({
      type: Animation
    })

    @property(AudioSource)
  private _audioSource: AudioSource = null!

    private audio: AudioSource = null!

    @property(AudioClip)
    private _clip: AudioClip = null!

    private _curPos = new Vec3()
    private _tarPos = new Vec3()
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

    start () {
      const collider : Collider = this.getComponent(Collider)
      collider.on('onTriggerEnter', this.onTrigger, this)
      systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this)
      systemEvent.on(SystemEventType.KEY_UP, this.onKeyUP, this)
      // [3]
    }

    private onTrigger (event: ITriggerEvent) {
      // console.log(event.type, event);
    }

    onKeyDown (e: EventKeyboard) {
      // console.log('key pushed: ', e.keyCode)
      // console.log(this._jump.pushingTime)
      // console.log(this._jump.isPushed)
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
      case KeyVal.SOUND:
        this.playbackSound()
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

    makeSound () {
      this.audio = this.node.getComponent(AudioSource)!
      console.log(this.audio)
      this._audioSource = this.audio
      this._audioSource.play()
    }

    playbackSound () {
      this.audio = this.node.getComponent(AudioSource)!
      this._audioSource = this.audio
      console.log(this._audioSource)
      console.log(this.audio.clip)
      this._audioSource.playOneShot(this.audio.clip, 1)
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
      // this.node.setRotation()
      // console.log(this.node.getPosition(this._curPos))
    }

    update (dt: number) {
      this._jump.pushingTime = this.calJumpTime(this._jump.pushingTime, dt, this._jump.isPushed)
      this._xCode = this.moveLen * (this._left.isPushed * -1 + this._right.isPushed)
      this._zCode = this.moveLen * (this._up.isPushed * -1 + this._down.isPushed)
      this._yCode = this.jumpHeight * this._jump.pushingTime * this.isJumpStop(this.jumpLimit, this._jump.pushingTime)

      // console.log(this._x.pushingTime, this._x.pausedTime)

      this.moveObj(this._xCode, this._yCode, this._zCode)
    }
}
