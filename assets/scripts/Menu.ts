
import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Menu
 * DateTime = Thu Apr 14 2022 10:00:05 GMT+0900 (대한민국 표준시)
 * Author = jacobkim9881
 * FileBasename = Menu.ts
 * FileBasenameNoExtension = Menu
 * URL = db://assets/scripts/Menu.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

export let labels:Array<any> = null!

@ccclass('Menu')
export class Menu extends Component {    
    private _label2:Array<object> = null!

    start () {
        labels = this.node.getComponentsInChildren(Label);        
        console.log(labels)
        //this._label2 = this.node.getChildByName('guide');
    }

}
