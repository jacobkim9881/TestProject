
import { _decorator, Component, Node, Prefab, director, instantiate, resources, systemEvent, SystemEventType, SphereCollider, RigidBody, Vec3, Scene } from 'cc';
const { ccclass, property } = _decorator;
import { objectRotDeg, objectPos } from './MousePlayer';
import { rayRes } from './Camera';
import { labels } from './Menu';

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
    private child1
    private colider1
    private _selected;

    onLoad() {
    }

    start () {
      systemEvent.on(SystemEventType.MOUSE_DOWN, this.onMouseDown, this)
    }

    onMouseDown(e) {
      let selected = rayRes[0]._collider.node._id;
      if (labels[5].string === 'Mouse player clicked' && e.getButton() === 2) {
        this.shootObject();
      }
    }

    shootObject() {
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
        let editedRotDeg = objectRotDeg < 0 ? objectRotDeg + 360 : objectRotDeg
        editedRotDeg = editedRotDeg + 90
        editedRotDeg = editedRotDeg *  Math.PI / 180
        let forceAxisX = 30 * Math.sin(editedRotDeg);
        let forceAxisY = 30 * Math.cos(editedRotDeg);
        console.log(forceAxisX, forceAxisY, objectRotDeg)
        console.log(objectPos)
        this.child1.setPosition(objectPos.x, 2, objectPos.z)        
        this.objRigid.applyImpulse(new Vec3(forceAxisX, 10, forceAxisY))
        //this.child1.setPosition(forceAxisX, 0, forceAxisY)

        //this.objRigid.setAngularVelocity(new Vec3(100, 0, 0))
        
        
    }
}