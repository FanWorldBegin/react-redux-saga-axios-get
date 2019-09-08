This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


# react-saga的一个例子
------------------------
## 1.包含
* 列表添加 addItem
* 通过axios 获取API按钮，可以输入事例网址 ：https://httpbin.org/get

## 2. 项目主体文件
项目主体文件存储在ReduxActions 下的index.js中，
### 完成的功能
1. 利用connect 包装组件
```
 ReduxActions = connect(mapStateToProps, mapDispachToProps)(ReduxActions);
 export default ReduxActions;
```

2. 获取redux中的state到组件的props中
```javascript
//获取state时候要加上reducer 前缀
function mapStateToProps(appState, ownProps) {
//  console.log(JSON.stringify(ownProps));
  return {
    ui: appState.ui,
    items: appState.ui.items,
    pageData: appState.ui.pageData
  }
}
```

3. 获取redux中的action 并包装dispach, 到props
```javascript
function mapDispachToProps(dispatch) {
  //dispatch(requestAddItem("balsddsn"))
  return {
    ...bindActionCreators({
     requestAddItem,
     requestPageData
    }, dispatch)
  }
}
```
也可以简写为
```javascript
const actionCreators = {requestAddItem,requestPageData }
```

## 3. rootSage rootReducer
这两个函数存储在module/index.js中
```javascript
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import { put, takeEvery, fork, all } from 'redux-saga/effects'
import { ui } from './ui/reducers.js';
import * as uiSagas from './ui/saga';


export const rootReducer = combineReducers({
  //all reducers
  ui
})

export function* rootSaga() {
  yield all([
    ...Object.values(uiSagas)
  ].map(fork))
  // 返回的每个函数都通过fork 执行
};

```
## 4. modules/ui
* action.js
* api.js
* reducer.js
* saga.js

## 5. action.js

用 reactAction 包装action,  当使用requestAddItem（'parameters'）, 返回格式化的数据。
```
{
  type:REQUEST_ADD_ITEM
  payload: 'parameters'
}
```

```
import { createAction } from 'redux-actions';
// action       type
// request*     REQUEST_*
// receive*     RECEIVE_*

export const REQUEST_ADD_ITEM = 'REQUEST_ADD_ITEM';
export const RECEIVE_ADD_ITEM = 'RECEIVE_ADD_ITEM';

export const REQUEST_PAGE_DATA = 'REQUEST_PAGE_DATA';
export const RECEIVE_PAGE_DATA = 'RECEIVE_PAGE_DATA';

export const requestAddItem = createAction(REQUEST_ADD_ITEM);
export const receiveAddItem = createAction(RECEIVE_ADD_ITEM);

export const requestPageData = createAction(REQUEST_PAGE_DATA);
export const receivePageData = createAction(RECEIVE_PAGE_DATA);

```
## 6. saga.js

```
import { put, takeEvery, call } from 'redux-saga/effects'
import {
 getPageData
} from './api'

import {
  REQUEST_ADD_ITEM,
  REQUEST_PAGE_DATA,
  receiveAddItem,
  receivePageData,
} from './action.js'

//receiveAddItem 为一个 createAction, 传入参数，变为action的 payload
//action is the request action
function* callReceiveAddItem(action) {
  yield put(receiveAddItem(action.payload))
}

//监听 ation 为 REQUEST_ADD_ITEM 收到请求则执行响应函数
export function* requestAddItemSaga() {
  yield takeEvery(REQUEST_ADD_ITEM, callReceiveAddItem)
}

//call(getPageData, action.payload) 将 action.payload传入getPageData
function* callRequestPageData(action) {
  var results = yield call(getPageData, action.payload)
  yield put(receivePageData(results))
}
//监听action为REQUEST_PAGE_DATA
export function* requestPageDataSaga() {
  yield takeEvery(REQUEST_PAGE_DATA, callRequestPageData)
```
function* 这种声明方式(function关键字后跟一个星号）会定义一个生成器函数 (generator function)，它返回一个  Generator  对象。

### 描述
1. 生成器函数在执行时能暂停，后面又能从暂停处继续执行。
2. 调用一个生成器函数并不会马上执行它里面的语句，而是返回一个这个生成器的 迭代器 （iterator ）对象。
3. 当这个迭代器的 next()方法被首次（后续）调用时，其内的语句会执行到第一个（后续）出现yield的位置为止，yield 后紧跟迭代器要返回的值。
4. yield*表示将执行权移交给另一个生成器函数（当前生成器暂停执行）。
```
function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function* generator(i){
  yield i;
  yield* anotherGenerator(i);// 移交执行权
  yield i + 10;
}

var gen = generator(10);

console.log(gen.next().value); // 10
console.log(gen.next().value); // 11
console.log(gen.next().value); // 12
console.log(gen.next().value); // 13
console.log(gen.next().value); // 20
```
5 . next()方法返回一个对象，这个对象包含两个属性：value 和 done，value 属性表示本次 yield 表达式的返回值，done 属性为布尔类型，表示生成器后续是否还有 yield 语句，即生成器函数是否已经执行完毕并返回。
```
function* generator(i) {
  yield i;
  yield i + 10;
}

var gen = generator(10);

console.log(gen.next().value);
// expected output: 10

console.log(gen.next().value);
// expected output: 20
```
6 .  当在生成器函数中显式 return 时，会导致生成器立即变为完成状态，即调用 next() 方法返回的对象的 done 为 true。如果 return 后面跟了一个值，那么这个值会作为当前调用 next() 方法返回的 value 值。
```
function* yieldAndReturn() {
  yield "Y";
  return "R";//显式返回处，可以观察到 done 也立即变为了 true
  yield "unreachable";// 不会被执行了
}

var gen = yieldAndReturn()
console.log(gen.next()); // { value: "Y", done: false }
console.log(gen.next()); // { value: "R", done: true }
console.log(gen.next()); // { value: undefined, done: true }
```
