
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
    private _betweenTwoObj: any = null!
    private _button: number = null!

    start () {
      systemEvent.on(SystemEventType.MOUSE_DOWN, this.onMouseDown, this)
      systemEvent.on(SystemEventType.MOUSE_UP, this.onMouseUp, this)
    }

    update (dt: number) {
      this._Action.executeMove(this)
      if (this._deg > 0) {
        let objectInfo = this._Action.excuteRotate(this, objectRotDeg, objectPos)
        objectRotDeg = objectInfo.objectRotDeg
        objectPos = objectInfo.objectPos
      }
      if (this._isMPushed && this._button === 0) console.log('pushed')
    }

    onMouseDown (e: EventMouse) {

      this._button = e.getButton();
      
      //if object selected
      if (this._button === 0) {
        this.changeMenuReturnsVal()        
      } else if (isRay && this._button === 2 && this._isMPushed) {      
        //if right mouse button clicked and selected
        this._Action.calRotationVals(this, rayPosX, rayPosZ)
      }
    }

    onMouseUp(e: EventMouse) {
      this._button = null
    }

    changeMenuReturnsVal() {
      let selectedUuid = rayRes[0]._collider.node._id
      mPlayerUuid = this.node.uuid
      this._isMPushed = this._Action.findId(mPlayerUuid, selectedUuid);
      //this.findId(mPlayerUuid, selectedUuid);
      labels[5].string = this._isMPushed === 1 ? 'Mouse player clicked' : ''
    }

}
