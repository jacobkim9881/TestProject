
import { _decorator, Component, systemEvent, SystemEventType, EventKeyboard, Vec3, EventMouse, geometry, PhysicsSystem, CameraComponent } from 'cc';
const { ccclass, property } = _decorator;

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
 
export let rayRes: Array<object> = null!
export let rayPosX: number = null!;
export let rayPosZ: number = null!;
export let isRay: boolean = null!;

@ccclass('Camera')
export class Camera extends Component {

    @property({ type: CameraComponent })
    private camera: CameraComponent = null as any;

    private _ray: geometry.Ray = new geometry.Ray();
    

    start () {        
      systemEvent.on(SystemEventType.MOUSE_DOWN, this.onMouseDown, this);
    }

    onMouseDown(e: EventMouse) {        
        this.camera = this.getComponent(CameraComponent)
        
        this.camera.screenPointToRay(e.getLocationX(), e.getLocationY(), this._ray);
        isRay = PhysicsSystem.instance.raycast(this._ray, 0xffffffff, 100, true);
        rayRes = PhysicsSystem.instance.raycastResults;
        rayPosX = PhysicsSystem.instance.raycastResults[0].hitPoint.x;
        rayPosZ = PhysicsSystem.instance.raycastResults[0].hitPoint.z;
        console.log('raycast get', isRay)
        console.log(rayRes)
    }


    update(dt: number) {          
        
    }

}
