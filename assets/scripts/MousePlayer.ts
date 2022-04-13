
import { _decorator, Component, systemEvent, SystemEventType, Vec3, EventMouse } from 'cc';
import { isRay, rayPosX, rayPosZ } from './Camera'
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = MousePlayer
 * DateTime = Mon Apr 11 2022 11:13:18 GMT+0900 (대한민국 표준시)
 * Author = jacobkim9881
 * FileBasename = MousePlayer.ts
 * FileBasenameNoExtension = MousePlayer
 * URL = db://assets/scripts/MousePlayer.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('MousePlayer')
export class MousePlayer extends Component {

    @property({
        type: Animation
    })

    private _curPos = new Vec3();
    private jumpHeight = 6;
    private jumpLimit = 0.2;
    private _isMPushed: number = 0;
    private _mPushingTime: number = 0;   
    private moveVal: object; 
    private c1val: number = 0;
    private x1val: number = 0;
    private z1val: number = 0;

    start () {        
        systemEvent.on(SystemEventType.MOUSE_DOWN, this.onMouseDown, this);
    }

    calMoveObj(isRay:boolean, curx: number, curz: number, moveLen: number ) {        
        if (isRay) {
            let xLen, zLen, cval, dt;
            dt = 0.015;
            //console.log('cur x, z', curx, curz)
            //console.log('ray x, z', rayPosX, rayPosZ)
            xLen = curx - rayPosX;
            zLen = curz - rayPosZ;
            cval = Math.sqrt(Math.pow(xLen, 2) + Math.pow(zLen, 2));
            return {             
            c1val: cval/(dt * moveLen),
            x1val: - xLen / cval/(dt * moveLen),
            z1val: - zLen / cval/(dt * moveLen),   
            }
            //console.log(this.x1val, this.z1val)

           }
    }

    onMouseDown(e: EventMouse) {     
        this.moveVal = this.calMoveObj(isRay, this.node.getPosition().x, this.node.getPosition().z, 3);
        //this.c1val = this.moveVal["c1val"];
        /*
        if (isRay) {
            let curx, curz, xLen, zLen, cval, dt, moveLen;
            curx = this.node.getPosition().x;
            curz = this.node.getPosition().z;
            dt = 0.015;
            moveLen = 3;
            console.log('cur x, z', curx, curz)
            console.log('ray x, z', rayPosX, rayPosZ)
            xLen = curx - rayPosX;
            zLen = curz - rayPosZ;
            cval = Math.sqrt(Math.pow(xLen, 2) + Math.pow(zLen, 2));
            this.c1val = cval/(dt * moveLen);
            this.x1val = - xLen / this.c1val;
            this.z1val = - zLen / this.c1val;
            console.log(this.x1val, this.z1val)
           }
           */
     //   xLen = 
    }

    calJumpTime(pushingTime: number, dt: number, pushed: number) {
        return pushingTime = pushingTime + dt * pushed;
    }

    isJumpStop(limit: number, dt: number) {
        return dt > limit ? 0 : 1
    }

    move1() {
        
    }

    moveObj(x: number, y: number, z: number) {                 
        //console.log(x !== 0 ? x : null + z !== 0 ? z :null)
        //console.log(x)
        //console.log(this.node.getPosition(this._curPos))       
        this.node.getPosition(this._curPos)
        Vec3.add(this._curPos, this._curPos, new Vec3(x, y, z));        
        this.node.setPosition(this._curPos);
        //console.log(this.node.getPosition(this._curPos))       
    }

    update(dt: number) {            
        if(this.moveVal["c1val"] > 0) {
            this.moveObj(this.moveVal["x1val"], 0, this.moveVal["z1val"])    
            this.moveVal["c1val"] = this.moveVal["c1val"] - 1;
            console.log(this.moveVal["c1val"])
        }else if(this.c1val === 0) {

        }       
        
    }
}
