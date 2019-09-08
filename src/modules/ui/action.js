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
