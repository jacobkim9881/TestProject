
import { _decorator, Component, Node, Prefab, director, instantiate, resources } from 'cc';
const { ccclass, property } = _decorator;

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

    start () {
        // [3]
    }

    shootObject() {
        
        const child = instantiate(this.callCannonBall)
        //child.parent = scene
        this.node.addChild(child)
        child.setPosition(4, 0, 4)
        /*
      let spherePath = 'Sphere'
      resources.load(spherePath, (err, data) =>{
          console.log(typeof data)
        this.callCannonBall = data
          return
      })  
      */      
        
    }
}