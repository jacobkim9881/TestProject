
import { _decorator, Component, Node, Prefab, instantiate, director, Director, Button, Label, Asset, CCClass } from 'cc';
import { Camera } from './Camera';
import * as guideScript from './in-game-guide.json'
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
        let butts = this.getComponentsInChildren(Button);
        let labels = this.getComponentsInChildren(Label);
console.log(butts)
console.log(labels)
//console.log(guideScript)
        this.getNodes();
        this.test(1)
        this.test(2)
        this.test(3)
        this.nodes = this.node
        console.log('prefab: ', this.curPrefab)
    }

}
