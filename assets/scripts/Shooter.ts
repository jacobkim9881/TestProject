
import { _decorator, Component, Node, Prefab, director, instantiate, resources, systemEvent, SystemEventType, SphereCollider, RigidBody, Vec3, Scene, Game, random } from 'cc'
import { targetDeg, targetId, targetRes } from './Camera'
import { clcikedNum } from './Menu'
import { GameManager } from './GameManager'
const { ccclass, property } = _decorator

/**
 * Predefined variables
 * Name = Shooter
 * DateTime = Wed May 04 2022 16:47:56 GMT+0900 (대한민국 표준시)
 * Author = jacobkim9881
 * FileBasename = Shooter.ts
 * FileBasenameNoExtension = Shooter
 * URL = db://assets/scripts/Shooter.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('Shooter')
export class Shooter extends Component {
    @property(Prefab)

  private callCannonBall: Prefab = null!

    private objRigid
    private _child
    private _collider
    private firedNum = 0    
    private _Manager = new GameManager()
    private _totalTime: number = 0 
    private _isFired:boolean = false
    private _round: number = 3

    update (dt) {
        this._totalTime = this._totalTime + dt
        //console.log(Math.trunc(this._totalTime) % 5)
        //console.log(Math.trunc(this._totalTime) % 5 === 4 && !this._isFired)
        if (Math.trunc(this._totalTime) % this._round === 0 && this._isFired) {
            //console.log('reset')
            this._isFired = false
        }
        if (Math.trunc(this._totalTime) % this._round === this._round - 1 && !this._isFired) {
            //console.log('fired')
            let ranDeg = Math.random() * 30
            this.shootObject(ranDeg, {x:0, y:0}, 10)
            this._isFired = true
        }
    }

    shootObject (objectRotDeg: number, hitPoint: any, power: number = 5) {
      this._child = instantiate(this.callCannonBall)
      this._collider = this._child.addComponent(SphereCollider)
      // console.log(typeof RigidBody)
      // console.log(typeof this.objRigid)
      this._collider.enabled = true
      this.objRigid = this._child.addComponent(RigidBody)
      this.node.addChild(this._child)
      // console.log(this._child)

      this._child.getPosition()
      // this.test1234.setLinearVelocity(new Vec3(100, 0, 0))
      // console.log(objectRotDeg)
      let editedRotDeg = -objectRotDeg + 90
      // objectRotDeg < 0 ? objectRotDeg + 360 : objectRotDeg
      // console.log(editedRotDeg)
      editedRotDeg = editedRotDeg * Math.PI / 180
      const forceAxisX = power * Math.sin(editedRotDeg)
      const forceAxisY = power * Math.cos(editedRotDeg)
      // console.log(forceAxisX, forceAxisY, objectRotDeg)
      // console.log(objectPos)
      const tempx = !hitPoint ? 1 : hitPoint.x
      const tempz = !hitPoint ? 1 : hitPoint.z
      this._child.setPosition(tempx, 2, tempz)
      // this._child.setPosition(0, 2, 0)
      this.objRigid.applyImpulse(new Vec3(forceAxisX, 10, forceAxisY))
      // this._child.setPosition(forceAxisX, 0, forceAxisY)

      // this.objRigid.setAngularVelocity(new Vec3(100, 0, 0))
    }
}
