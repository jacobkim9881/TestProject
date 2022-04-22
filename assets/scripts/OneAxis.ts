
import { _decorator, Component, Node } from 'cc'
const { ccclass, property } = _decorator

/**
 * Predefined variables
 * Name = OneAxis
 * DateTime = Fri Mar 25 2022 15:37:12 GMT+0900 (대한민국 표준시)
 * Author = jacobkim9881
 * FileBasename = OneAxis.ts
 * FileBasenameNoExtension = OneAxis
 * URL = db://assets/scripts/OneAxis.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('OneAxis')
export class OneAxis extends Component {
  isPushed = 0
  pushingTime = 0
  pausedTime = 0
}
