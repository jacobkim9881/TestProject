
import { _decorator, Component, Node, Label, assetManager, Button, JsonAsset, systemEvent, SystemEventType, EventMouse } from 'cc';
import { FpsCamera } from './FPSP';
import { RtsCamera } from './Camera';
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
    private _clicker = null!

    private _curPage: number = 0;

    async start () {
        //this.onStart();

        systemEvent.on(SystemEventType.MOUSE_DOWN, this.onMouseDown, this);
        
        let butts = this.getComponentsInChildren(Button);
            labels = this.getComponentsInChildren(Label);            
            this._guideCon = labels[4];
            this._pageNum = labels[1];
            this._prev_button = labels[2];
            this._next_button = labels[3];
            this._clicker = labels[6]
            this._returns = labels[5];

            let gameGuide;
    console.log(butts)
    console.log(labels)
    console.log(this._guideCon)
        gameGuide = await assetManager.loadAny({uuid: 'c2d8785f-ab37-4e17-b91d-f717afff41fa'}, JsonAsset, (err, data) => {
            this._guideCon.string = data.json.page[0].guide;
            this._pageNum.string = `1/${data.json.page.length}`
            this._returns.string = data.json.page[0].returns
            butts[2].node.active = false;
            this.menuButtonEvent(butts, data, 1);
            this.menuButtonEvent(butts, data, 0);       
            this.clcikerEvent(butts);
            console.log(data)
            if (err) console.log(err);
            return data.json    
        });        

        return;
    }

    prevEvent(curPage: number, pageNum: number, data, next:number, getPage:number) {
        if (curPage > pageNum) {
            this._pageNum.string = `${curPage + next}/${data.json.page.length}`
            this._guideCon.string = data.json.page[getPage].guide;
            this._returns.string = data.json.page[getPage].returns
        }
    }

    nextEvent(curPage: number, data, next:number, getPage:number) {
        if (curPage < data.json.page.length ) {
            this._pageNum.string = `${curPage + next}/${data.json.page.length}`
            this._guideCon.string = data.json.page[getPage].guide;
            this._returns.string = data.json.page[getPage].returns
        }
    }

    menuButtonEvent(butts:Array<any>, data, isPrev) {        
    let next = isPrev === 1 ? -1 : 1;            
    let buttonNum = isPrev === 1 ? 0 : 1;            
    
    butts[buttonNum].node.on('click', (e) =>{
        this._curPage = parseInt(this._pageNum.string.split('/')[0]);
        let getPage = isPrev === 1 ? this._curPage - 2 : this._curPage;            
        isPrev === 1? this.prevEvent(this._curPage, isPrev, data, next, getPage)
        : this.nextEvent(this._curPage, data, next, getPage);
console.log(this._curPage, isPrev)
        if (this._curPage === 1 && isPrev === 0 || this._curPage === 3 && isPrev === 1) {
            console.log('p2')
            butts[2].node.active = true;
            labels[6].string = data.json.page[1].button1
        } else {
        butts[2].node.active = false;
        }
        //console.log('cliked')
    }, this)
    }


    clcikerEvent(butts) {
        return butts[2].node.on('click', (e) => {
            //console.log(this._curPage)
            //console.log(clicker.string)
            console.log(e)
            console.log(FpsCamera)
            console.log(this._clicker.string)
            
            if (this._clicker.string === 'FPS click') {
                //console.log('fps')
                FpsCamera.enabled = true;
                RtsCamera.enabled = false;
                this._clicker.string = 'RTS click'
                console.log(this._clicker.string)
            } else if (this._clicker.string === 'RTS click') {
                FpsCamera.enabled = false;
                RtsCamera.enabled = true;
                this._clicker.string = 'FPS click'
            } 
            
        }, this)
        
    }

    onMouseDown(e: EventMouse) {
        console.log(e)
    }

}
