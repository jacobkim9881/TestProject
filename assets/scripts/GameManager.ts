
import { _decorator, Component, Node, Prefab, instantiate, director, Director } from 'cc';
import { Camera } from './Camera'
const { ccclass, property } = _decorator;

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
    @property(NodeList)
    private nodes: any = null!

    @property(Prefab)

    curPrefab: Prefab = null!;
   
    @property(Director)

    getNodes() {
        console.log(NodeList)
        for (let i = 0; i < NodeList.length; i++) {
            console.log(NodeList[i]);
        }
    }

    test(n: number) {
        let child = instantiate(this.curPrefab);
        this.node.addChild(child);
        child.setPosition(n, 0, n)
        
    }

    onClick(e: number) {

        console.log('hello', e)
    }

    start () {
        this.getNodes();
        this.test(1)
        this.test(2)
        this.test(3)
        this.nodes = this.node
        console.log('prefab: ', this.curPrefab)
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
