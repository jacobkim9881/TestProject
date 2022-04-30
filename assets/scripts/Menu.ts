
import { _decorator, Component, Node, Label, assetManager, Button, JsonAsset, systemEvent, SystemEventType, EventMouse, absMax, js, CCClass } from 'cc'
import { FpsCamera } from './FPSP'
import { RtsCamera } from './Camera'
import { MousePlayer } from './MousePlayer'
import { Cannonball, test6 } from './Cannonball' 

const { ccclass, property } = _decorator

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
export let curPage: number = 0
export let clickerStr: string = null!
export let button1Clicked;
export let clcikedNum: number = 0

export enum clickerVal {
  DEF,
  FIRE
}

@ccclass('Menu')
export class Menu extends Component {
  private _label2:Array<object> = null!

  private _guideCon = null!
  private _pageNum = null!
  private _prev_button = null!
  private _next_button = null!
  private _returns = null!
  private _clicker = null!
  private _CannonBall = new Cannonball()

  async start () {
    // this.onStart();

    // systemEvent.on(SystemEventType.MOUSE_DOWN, this.onMouseDown, this);
    const butts = this.getComponentsInChildren(Button)
    labels = this.getComponentsInChildren(Label)
    this._guideCon = labels[4]
    this._pageNum = labels[1]
    this._prev_button = labels[2]
    this._next_button = labels[3]
    this._clicker = labels[6]
    this._returns = labels[5]

    let gameGuide
    // console.log(butts)
    // console.log(labels)
    // console.log(this._guideCon)
    gameGuide = await assetManager.loadAny({ uuid: 'c2d8785f-ab37-4e17-b91d-f717afff41fa' }, JsonAsset, (err, data) => {
      this._guideCon.string = data.json.page[0].guide
      this._pageNum.string = `1/${data.json.page.length}`
      this._returns.string = data.json.page[0].returns
      butts[2].node.active = false
      this.menuButtonEvent(butts, data, 1)
      this.menuButtonEvent(butts, data, 0)
      this.clcikerEvent(butts)
      // console.log(data)
      if (err) console.log(err)
      return data.json
    })
  }

  prevEvent (curPage: number, pageNum: number, data, next:number, getPage:number) {
    if (curPage > pageNum) {
      this._pageNum.string = `${curPage + next}/${data.json.page.length}`
      this._guideCon.string = data.json.page[getPage].guide
      this._returns.string = data.json.page[getPage].returns
    }
  }

  nextEvent (curPage: number, data, next:number, getPage:number) {
    if (curPage < data.json.page.length) {
      this._pageNum.string = `${curPage + next}/${data.json.page.length}`
      this._guideCon.string = data.json.page[getPage].guide
      this._returns.string = data.json.page[getPage].returns
    }
  }

  menuButtonEvent (butts:Array<any>, data, isPrev) {
    const next = isPrev === 1 ? -1 : 1
    const buttonNum = isPrev === 1 ? 0 : 1

    butts[buttonNum].node.on('click', (e) => {
      curPage = parseInt(this._pageNum.string.split('/')[0])
      const getPage = isPrev === 1 ? curPage - 2 : curPage
      
      isPrev === 1
        ? this.prevEvent(curPage, isPrev, data, next, getPage)
        : this.nextEvent(curPage, data, next, getPage)
        
      console.log(curPage, isPrev)
      //butts[2].node.emit('change', 'hi')

        labels[6].string = data.json.page[getPage].button1;
        butts[2].node.active = data.json.page[getPage].button1On        
      // console.log('cliked')
    }, this)
  }

  clcikerEvent (butts) {
    butts[2].node.on('mouseleave', (e) => {
      
      clickerStr = 'off'
      console.log('mouse up')
      button1Clicked = false;
    })

    return butts[2].node.on('click', (e) => {
      // console.log(this._curPage)
      // console.log(clicker.string)
      // console.log(e)
      // console.log(FpsCamera)
      // console.log(this._clicker.string)

      if (this._clicker.string === 'FPS click') {
        // console.log('fps')
        FpsCamera.enabled = true
        RtsCamera.enabled = false
        this._clicker.string = 'RTS click'
        clickerStr= 'RTS click'
        // console.log(this._clicker.string)
      } else if (this._clicker.string === 'RTS click') {
        FpsCamera.enabled = false
        RtsCamera.enabled = true
        this._clicker.string = 'FPS click'
        clickerStr= 'FPS click'
      } else if (this._clicker.string === 'Fire an obj') {        
        //fire 
        //clickerStr = clickerVal.FIRE;
        //test3.shootObj();
        //console.log(this)
        //clickerStr = 'on'
        clcikedNum++
        //this._CannonBall.shootObject1(this._CannonBall)

        
        //console.log(test6)
        //console.log()
        button1Clicked = true;
      }
    }, this)
  }

  onMouseDown (e: EventMouse) {
    //console.log(e)
  }
}
