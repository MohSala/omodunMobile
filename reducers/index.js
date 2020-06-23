import { combineReducers } from "redux";

import authReducer from './auth';
// import dashReducer from './dashboard';
// import configReducer from './config';

export default combineReducers({
    auth: authReducer,
    // dash: dashReducer,
    // config: configReducer,
})