import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducers/rootReducer";
import ReduxThunk from "redux-thunk";
import storeSynchronize from "redux-localstore";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(ReduxThunk));
const store = createStore(reducer, enhancer);
export default store;

storeSynchronize(store);
