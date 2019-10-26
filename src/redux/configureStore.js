
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './../reducers';
import rootSaga from './../sagas';

const composeEnhancers = process.env.NODE_ENV !== 'production' &&
typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      shouldHotReload: false,
    })
  : compose;

  const sagaMiddleware = createSagaMiddleware();
const configureStore = () => {
    const middleware = [
        thunk,
        sagaMiddleware
    ];
    const enhancers = [applyMiddleware(...middleware)];

    const store = createStore(rootReducer, composeEnhancers(...enhancers));
    sagaMiddleware.run(rootSaga);
    return store;
}
   //bat dau theo doi cac action
export default configureStore;