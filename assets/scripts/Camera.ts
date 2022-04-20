
import { _decorator, Component, systemEvent, SystemEventType, EventKeyboard, Vec3, EventMouse, geometry, PhysicsSystem, CameraComponent, Quat } from 'cc';
import { EDITOR } from 'cc/env';
const { ccclass, property } = _decorator;
import { FPSP, fpsPos } from './FPSP'

/**
 * Predefined variables
 * Name = Camera
 * DateTime = Mon Apr 11 2022 11:09:32 GMT+0900 (대한민국 표준시)
 * Author = jacobkim9881
 * FileBasename = Camera.ts
 * FileBasenameNoExtension = Camera
 * URL = db://assets/scripts/Camera.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
export let rayRes: Array<any> = null!
export let rayPosX: number = null!;
export let rayPosZ: number = null!;
export let isRay: boolean = null!;
export let RtsCamera: CameraComponent = null!;

@ccclass('Camera')
export class Camera extends Component {

    @property({ type: CameraComponent })
    RtsCamera: CameraComponent = null as any;

    private _ray: geometry.Ray = new geometry.Ray();
    

    start () {        
      RtsCamera = this.getComponent(CameraComponent);
      systemEvent.on(SystemEventType.MOUSE_DOWN, this.onMouseDown, this);
    }

    onMouseDown(e: EventMouse) {    
        let player = fpsPos;
        //console.log(player)
        let cur_position = this.node.getPosition();
        //console.log(player, cur_position)
        //this.node.getPosition(cur_position)
        //Vec3.lerp(cur_position, cur_position, player, 0.1)
        //this.node.setPosition(cur_position);     
        
        
        RtsCamera.screenPointToRay(e.getLocationX(), e.getLocationY(), this._ray);
        isRay = PhysicsSystem.instance.raycast(this._ray, 0xffffffff, 100, true);
        rayRes = PhysicsSystem.instance.raycastResults;
        rayPosX = PhysicsSystem.instance.raycastResults[0].hitPoint.x;
        rayPosZ = PhysicsSystem.instance.raycastResults[0].hitPoint.z;
        //console.log('raycast get', isRay)
        //console.log(rayRes)
        //console.log(rayPosX, rayPosZ)

        
/*
        let tarNode = rayRes[rayRes.length - 1];
        let pos2:Vec3= this.node.position;
        console.log(tarNode, pos2)
        let _quat = new Quat();
        let v1 = new Vec3();
        let v2 = new Vec3();
        let rad = 0.5 * Math.PI / 180;
        let axis = Vec3.UP
        //new Vec3(0, 0, 0);
        let pos = tarNode._hitPoint;
        Quat.fromAxisAngle(_quat, axis, rad);
        Vec3.subtract(v1, pos2, pos)
        Vec3.transformQuat(v2, v1, _quat)
        this.node.position = Vec3.add(v2, pos, v2);
        console.log(this.node.rotation)
        Quat.rotateAround(_quat, this.node.rotation, axis, rad)
        //Quat.rotateAroundLocal(tarNode._hitPoint, pos2, v1, 100);
        */
        
    }


    update(dt: number) {          
        
    }

}
