// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appReducer from '../reducers/appReducer';

const enhancer = applyMiddleware(thunk);

export default function configureStore() {
  return createStore(appReducer, enhancer); // eslint-disable-line
}
