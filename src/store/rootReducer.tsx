import { combineReducers } from '@reduxjs/toolkit';
import dataReducer from '../features/data/dataSlice';

const rootReducer = combineReducers({
  data: dataReducer,
});

export default rootReducer;
