
import { _decorator, Component, Node, Label, assetManager, Button, JsonAsset, systemEvent, SystemEventType, EventMouse } from 'cc';
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

    private _guideCon = null!
    private _pageNum = null!
    private _prev_button = null!
    private _next_button = null!
    private _returns = null!

    async start () {
        //this.onStart();

        systemEvent.on(SystemEventType.MOUSE_DOWN, this.onMouseDown, this);
        
        let butts = this.getComponentsInChildren(Button);
            labels = this.getComponentsInChildren(Label);            
            this._guideCon = labels[4];
            this._pageNum = labels[1];
            this._prev_button = labels[2];
            this._next_button = labels[3];
            this._returns = labels[5];

            let gameGuide;
    console.log(butts)
    console.log(labels)
    console.log(this._guideCon)
        gameGuide = await assetManager.loadAny({uuid: '02eb9734-d497-423b-a150-618868fe8981'}, JsonAsset, (err, data) => {
            this._guideCon.string = data.json.page[0].guide;
            this._pageNum.string = `1/${data.json.page.length}`
            this._returns.string = data.json.page[0].returns
            this.menuButtonEvent(butts, data, 1);
            this.menuButtonEvent(butts, data, 0);
        
            
            console.log(data)
            if (err) console.log(err);
            return data.json    
        });        

        return;
    }

    menuButtonEvent(butts:Array<any>, data, pageNum) {        
    let next = pageNum === 1 ? -1 : 1;            
    let buttonNum = pageNum === 1 ? 0 : 1;            
    let getPage = pageNum === 1 ? -2 : -1;            
    butts[buttonNum].node.on('click', (e) =>{
        let curPage = parseInt(this._pageNum.string.split('/')[0]);
        if (curPage > pageNum && curPage < data.json.page.length && curPage !==1) {
            this._pageNum.string = `${curPage + next}/${data.json.page.length}`
            this._guideCon.string = data.json.page[curPage - getPage].guide;
            this._returns.string = data.json.page[curPage - getPage].returns
        }
        console.log('cliked')
    }, this)
    }

    onMouseDown(e: EventMouse) {
        console.log(e)
    }

}
