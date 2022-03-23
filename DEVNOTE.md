# Cocos creator 배움 일지

## Node 움직임 구현
Cocos creator에서 Node가 움직이는 것을 구현해보았다.

### 기타
Typescript는 함수를 코딩할 때 파라미터의 타입을 정해주여야 한다. 예를 들면

```js
function(parameter : type) {
return parameter;
};
```
이렇게 파라미터의 타입을 입력해주어야 나중에 함수를 사용할 때 에러 없이 작동한다.

### 입력을 감지하는 이벤트
패키지 는 `cc`에서 가져옴.

```js
import {systemEvent} from 'cc'

...

systemEvent.on(SystemEventType.KEY_DOWN, this.function, this)        
...
```

https://docs.cocos.com/creator/1.9/api/en/classes/SystemEvent.html

`systemEvent.on()`이 키보드나 마우스, 패드의 터치 등에서 보내는 입력 이벤트를 감지한다.

`SystemEventType.EVENT`에서 어떤 값을 입력할 것인지 정한다. 예를 들면 키를 누름, 땜, 마우스 누름, 땜, 터치 누름 등.

`this.function`에서 입력키를 받고 난 후 실행 시킬 함수의 이름을 넣는다.

`this`를 넣어주어 bind를 해야 이벤트가 작동함.

### Node의 벡터 좌표 이동

```js
import { Vec } from `cc`

private _curPos = new Vec3();
private num, num2, num3;

this.node.getPosition(this._curPos)
Vec3.add(this._curPos, this._curPos, new Vec3(num, num2, num3));  
this.node.setPosition(this._curPos);
```

`this.node.getPosition(Vec3())`로 Node의 저장되어있는 벡터 값을 불러와준다. 만약 불러와주지 않았을 때 키를 입력해 노드를 움직여보았는데 첫번째 한번 입력이 두번 입력되었다.

`Vec3.add(curPos, tarPos, addedPos)`로 이동시킬 좌표를 입력한다. 각 파라미터는 벡터를 넣어주어야 한다. 첫번째와 두번째 파라미터는 현재 좌표값을 넣었는데 두 개의 차이점을 아직 이해 못함. 3번째 파라미터 벡터의 x, y, z 값을 각각 입력해 얼마나 이동할지 정한다.

`this.node.setPosition(curPos)`로 최종적으로 이동할 벡터 값을 저장해준다.

### 움직임을 시행할 함수의 위치
움직이는 함수 `move()`가 있다고 하자. 움직임은 키보드의 입력을 감지하고 시간이 흐르는 동안 스크립트의 상태를 업데이트 해주는 `update()`에 의해 벡터의 좌표 값이 변한다. 즉,

1.  키 입력되어 함수 실행
2. `update()`함수에 의해 시간마다 함수 실행

이렇게 두 곳에서 함수가 실행되는데 함수가 시행되는 위치는 어느 곳을 해도 상관 없다. 

단, `systemEvent.on(SystemEventType.KEY_DOWN, this.function, this)` 이벤트 감지에서는 어떤 키가 입력되었는지를 파라미터로 받고

`update(deltaTime : number)`에서는 시간 흐름에 따른 델타 시간 값을 파라미터로 받는다.

그래서 어떤 키 값을 넣어 어느 시간 만큼 n만큼의 좌표가 이동이 되었다를 계산하려면 두 파라미터 모두를 값으로 가져가야 한다. 그러므로 미리 변수를 선언하여 이벤트가 실행되었을 때 저장한다.

```js
private _keycode;

onKeyup(e: EventKeyboard) {
  this._keycode = e.keyCode;
}

update(deltaTime: number) {
  // 키 값의 타입은 number지만 예를 들기 위해 string으로 함
  if (this._keycode = 'left') {
    movePostionBy(deltaTime);
  }
}
```

