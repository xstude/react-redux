import { combineReducers } from 'redux';
import log from './reducer/log.js';

const rootReducer = combineReducers({
    log
});

export default rootReducer;
