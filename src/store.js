import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer, rootSaga } from './modules/index.js';
console.log(rootSaga);
const sagaMiddleware = createSagaMiddleware();
// 可以使用saga
var middleware = applyMiddleware(sagaMiddleware);

//使用浏览器redux工具
var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, {}, composeEnhancers(
  middleware
))
sagaMiddleware.run(rootSaga)
export default store;
