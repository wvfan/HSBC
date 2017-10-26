import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import lsPersistState from 'redux-localstorage';
import { routerMiddleware } from 'react-router-redux';
import _ from 'lodash';
import rootReducer from '../reducers';

const persistPaths = [

]; // overwritten by lsConfig.slicer
const lsConfig = {
  serialize: (obj) => {
    const store = _.cloneDeep(obj);
    return JSON.stringify(store);
  },
  deserialize: (str) => {
    const store = JSON.parse(str);
    store.design.left = 0;
    store.design.top = 0;
    delete store.system;
    return store;
  },
};
export default function configureStore(history, initialState) {
  let finalCreateStore;
  if (DEBUGMODE) {
    const logger = createLogger({ collapsed: true });

    const createStoreWithMiddleware = applyMiddleware(
      thunkMiddleware,
      promiseMiddleware(),
      logger,
      routerMiddleware(history),
    );

    finalCreateStore = compose(
      createStoreWithMiddleware,
      lsPersistState(persistPaths, lsConfig),
    )(createStore);
  } else {
    finalCreateStore = compose(
      applyMiddleware(
        thunkMiddleware,
        promiseMiddleware(),
        routerMiddleware(history),
      ),
      lsPersistState(persistPaths, lsConfig),
    )(createStore);
  }

  const store = finalCreateStore(rootReducer, initialState,
       window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducerHot = require('../reducers/index').default;
      store.replaceReducer(nextRootReducerHot);
    });
  }

  return store;
}
