import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { createPromise } from 'redux-promise-middleware';

import reducers from './reducers';

const logger = createLogger();
const customizedPromiseMiddleware = createPromise({
  promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'FAILURE'],
});

const store = createStore(reducers, applyMiddleware(logger, thunk, customizedPromiseMiddleware));

export default store;
