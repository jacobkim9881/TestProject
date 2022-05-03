
import { _decorator, Component, Node, CapsuleCollider, SphereCollider } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Ball
 * DateTime = Mon May 02 2022 21:09:38 GMT+0900 (대한민국 표준시)
 * Author = jacobkim9881
 * FileBasename = Ball.ts
 * FileBasenameNoExtension = Ball
 * URL = db://assets/scripts/Ball.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

export let isContacted
 
@ccclass('Ball')
export class Ball extends Component {

    start () {
let _collider = this.getComponent(SphereCollider)
    console.log(_collider)
    _collider.on('onCollisionEnter', this.collisionEnter, this)
    }
    
    collisionEnter(e) {
        console.log('collided: ',e)
        console.log(e.otherCollider)
        console.log(e.otherCollider.node.name)
        return
      }

}
