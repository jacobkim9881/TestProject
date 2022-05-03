
import { _decorator, Component, Node, Prefab, director, instantiate, resources, systemEvent, SystemEventType, SphereCollider, RigidBody, Vec3, Scene, Game } from 'cc'
import { targetDeg, targetId, targetRes } from './Camera'
import { clcikedNum } from './Menu'
import { GameManager } from './GameManager'
const { ccclass, property } = _decorator

/**
 * Predefined variables
 * Name = Cannonball
 * DateTime = Sat Apr 23 2022 07:36:21 GMT+0900 (대한민국 표준시)
 * Author = jacobkim9881
 * FileBasename = Cannonball.ts
 * FileBasenameNoExtension = Cannonball
 * URL = db://assets/scripts/Cannonball.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('Cannonball')
export class Cannonball extends Component {
    @property(Prefab)

  private callCannonBall: Prefab = null!

    private objRigid
    private _child
    private _collider
    private firedNum = 0    
    private _Manager = new GameManager()
    //private 

    update () {
      if (clcikedNum - this.firedNum !== 1) return
      this.firedNum = clcikedNum
      //console.log('target id: ', targetId)
      let objPos = this._Manager.findNodeByUuid(targetId, this.node.parent, []).getPosition()
      //console.log(objPos)
      this.shootObject(targetDeg, objPos)
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
