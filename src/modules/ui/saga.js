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
}
