import { handleAction, combineActions } from 'redux-actions';
import {
  RECEIVE_ADD_ITEM,
  RECEIVE_PAGE_DATA,

  receivePageData,
  receiveAddItem
} from './action.js'


var defaultState = {
  items:[],
}

// reducer 的名字为ui 所以对应的state的名字也为 ui
export const ui = handleAction(
  combineActions(
    receiveAddItem,
    receivePageData
  ),
  {
    //two functions next() throw() 在这里不同的action 传入state ,存储到state的不同对象中
    next(state, action) {
      //reducer
      switch (action.type) {
        case RECEIVE_ADD_ITEM:
          var newState = {
            ...state
          }
          newState.items = [].concat(newState.items);
          if(Array.isArray(action.payload)) {
            newState.items = newState.items.concat(action.payload)
          } else {
            newState.items = newState.items.push(action.payload)
          }
          return newState;

        case RECEIVE_PAGE_DATA:
          var newState = {
            ...state
          }
          newState.pageData = action.payload;
          return newState;

        default:
          return state;

      }
    },
    throw( state, action) {
      switch (action.type) {
        case RECEIVE_ADD_ITEM:
          var newState = {
            ...state
          };
          newState.itemsError = action.payload;

        case RECEIVE_PAGE_DATA:
          var newState = {
            ...state
          }
          newState.pageError = action.payload;
        return newState;
          default: state
      }
    }
  }, defaultState
)
