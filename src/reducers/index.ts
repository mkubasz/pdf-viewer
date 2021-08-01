import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { files } from './file.reducer';

const rootReducer = combineReducers({authentication, alert, files});

export default rootReducer;