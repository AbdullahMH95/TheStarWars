import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import ThunkRedux from "redux-thunk";
import userReducers from "./reducers/userReducers";

const reducers = combineReducers({
  user: userReducers
});

const enhancers = [];
const middlewares = [ThunkRedux];
enhancers.push(applyMiddleware(...middlewares));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, {}, composeEnhancers(...enhancers));
