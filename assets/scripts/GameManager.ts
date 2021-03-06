
import { _decorator, Component, Prefab, instantiate, Director, Vec3, director, RigidBody, SphereCollider } from 'cc'
import { Camera } from './Camera'
const { ccclass, property } = _decorator

/**
 * Predefined variables
 * Name = GameManager
 * DateTime = Fri Mar 25 2022 15:04:30 GMT+0900 (대한민국 표준시)
 * Author = jacobkim9881
 * FileBasename = GameManager.ts
 * FileBasenameNoExtension = GameManager
 * URL = db://assets/scripts/GameManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
@ccclass('GameManager')
export class GameManager extends Component {
    @property(Prefab)

      curPrefab: Prefab = null!

      findNodeByUuid(targetId: string, parent, returns: Array<any>) {
        if (returns.length > 0) return
        const nodes = parent.children
        for (const node of nodes) {        
          if (node.uuid === targetId) return returns.push(node)//console.log(node) 
          else this.findNodeByUuid(targetId, node, returns)
        }
        //console.log('find id arguments: ', targetId, parent)
        //console.log(returns)
        return returns[0]
      }

    findNodesByUuid(targetId: string, parent, returns: Array<any>) {
      const nodes = parent.children
      for (const node of nodes) {        
        if (node.uuid === targetId) returns.push(node)//console.log(node) 
        else this.findNodesByUuid(targetId, node, returns)
      }
      //console.log('find id arguments: ', targetId, parent)
      //console.log(returns)
      return returns
    }

    createObject (n: number) {
      const child = instantiate(this.curPrefab)
      // child.getPosition(new Vec3())
      this.node.addChild(child)
      // let objColider = child.addComponent(SphereCollider)
      // let objRigid = child.addComponent(RigidBody)
      // objColider.enabled = true;
      // objRigid.wakeUp();
      // objRigid.node.
      child.setPosition(n, 0, n)
    }

    onClick (e: number) {
      console.log('hello', e)
    }

    start () {
      //let tarId = "d8H0tyl0dJL6B39kzbm5iN"
      //let parent = this.node.parent
      //this.findByUuid(tarId, parent)
      this.createObject(1)
      this.createObject(2)
      this.createObject(3)
      // console.log('prefab: ', this.curPrefab)
    }
}
