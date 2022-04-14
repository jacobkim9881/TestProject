
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
 
@ccclass('Menu')
export class Menu extends Component {
    private _label:Array<object> = null!
    private _label2:Array<object> = null!

    start () {
        this._label = this.node.getComponentsInChildren(Label);
        //this._label2 = this.node.getChildByName('guide');
    }

}
