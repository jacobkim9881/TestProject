
import { _decorator, Component, Node, Prefab, director, instantiate, resources, systemEvent, SystemEventType, SphereCollider, RigidBody, Vec3, Scene } from 'cc';
const { ccclass, property } = _decorator;
import { objectRotDeg, objectPos } from './MousePlayer';
import { rayPosX, rayPosZ, rayRes, targetDeg, targetRes } from './Camera' 
import { Action } from './Action'
import { button1Clicked, clcikedNum, clickerStr, labels } from './Menu';

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

export let test6 
 
@ccclass('Cannonball')
export class Cannonball extends Component {

    @property(Prefab)

    private callCannonBall: Prefab = null!
    private objRigid
    private child1
    private colider1
    private _selected;
    private firedNum = 0

    private _Action = new Action()

    onLoad() {
    }

    start () {
      systemEvent.on(SystemEventType.MOUSE_DOWN, this.onMouseDown, this)
      test6 = this.callCannonBall
    }

    update() {
      if (clcikedNum - this.firedNum === 1) {
        this.firedNum = clcikedNum;
      //this.shootObject(objectRotDeg);
      //console.log(targetRes)
      //console.log(targetRes[0]._collider.node._euler.y)
      //console.log(targetDeg)
      let rotate = targetDeg.ditn * targetDeg.deg
      this.shootObject(rotate, targetRes[0]._hitPoint);
      let clickedId = targetRes[0]._collider._id
      //console.log(clickerStr)
      // euler angle
      //console.log(rayRes[0]._collider.node._euler.y)
      console.log(rayRes[0]._hitPoint)
      console.log(rayRes)
      }
    }

    onMouseDown(e) {
      let selected = rayRes[0]._collider.node._id;
      /*
      if (labels[5].string === 'Mouse player clicked' && e.getButton() === 2) {
        this.shootObject();
      }
      */
      //console.log(e)
     //console.log(test6)
     if (clickerStr === 'Fire an obj' && button1Clicked) {
      //this.shootObject(objectRotDeg);
      
     }
    }

    shootObject(objectRotDeg: number, hitPoint: any) {
      let power = 5
      this.child1 = instantiate(this.callCannonBall)
      this.colider1 = this.child1.addComponent(SphereCollider)
      //console.log(typeof RigidBody)
      //console.log(typeof this.objRigid)
      this.colider1.enabled = true;
      this.objRigid = this.child1.addComponent(RigidBody)
      this.node.addChild(this.child1)
      //console.log(this.child1)
      
        this.child1.getPosition()        
        //this.test1234.setLinearVelocity(new Vec3(100, 0, 0))        
        console.log(objectRotDeg)
        let editedRotDeg = objectRotDeg < 0 ? objectRotDeg + 360 : objectRotDeg
        console.log(editedRotDeg)
        editedRotDeg = editedRotDeg + 90
        editedRotDeg = editedRotDeg *  Math.PI / 180
        let forceAxisX = power * Math.sin(editedRotDeg);
        let forceAxisY = power * Math.cos(editedRotDeg);
        //console.log(forceAxisX, forceAxisY, objectRotDeg)
        //console.log(objectPos)
        let tempx = !hitPoint ? 1 : hitPoint.x;
        let tempz = !hitPoint ? 1 : hitPoint.z;
        this.child1.setPosition(tempx, 2, tempz)        
        this.objRigid.applyImpulse(new Vec3(forceAxisX, 10, forceAxisY))
        //this.child1.setPosition(forceAxisX, 0, forceAxisY)

        //this.objRigid.setAngularVelocity(new Vec3(100, 0, 0))
        
        
    }
}
