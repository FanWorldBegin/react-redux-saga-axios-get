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
