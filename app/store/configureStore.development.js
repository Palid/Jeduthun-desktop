import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import appReducer from '../reducers/appReducer';

const logger = createLogger({
  level: 'info',
  collapsed: true
});

export default function configureStore() {
  const store = createStore(
    appReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk, logger)
  )

  if (module.hot) {
    module.hot.accept('../reducers/appReducer', () =>
      store.replaceReducer(require('../reducers/appReducer')) // eslint-disable-line global-require
    );
  }

  return store;
}
