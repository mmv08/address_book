import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

const loggerMiddleware = createLogger();
const middleware = [thunkMiddleware];
if (process.env.NODE_ENV === 'development') {
  middleware.push(loggerMiddleware);
}

const configureStore = () => {
  return createStore(
    rootReducer,
    applyMiddleware(...middleware)
  );
};

export default configureStore;
